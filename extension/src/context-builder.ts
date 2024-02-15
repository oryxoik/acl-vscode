import * as vscode from "vscode";
import { mappedTokens } from "./token-mapper";
import {
  FunctionDefinition,
  TypeDefinition,
  createFunctionDefinition,
  createTypeDefinition,
  tryAddVariableToDefinition,
} from "./definitions";
import { TokenType } from "./lexer/TokenType";

export const typeDefinitions: Map<string, TypeDefinition[]> = new Map<
  string,
  TypeDefinition[]
>();

export function updateContextForDocument(uri: vscode.Uri) {
  const tokens = mappedTokens.get(uri);
  const definitions: TypeDefinition[] = [];

  var currentDef: TypeDefinition | null = null;
  var currentFunc: FunctionDefinition | null = null;
  var scopeDepth = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (
      (token.type === TokenType.Class ||
        token.type === TokenType.Component ||
        token.type === TokenType.Extension ||
        token.type === TokenType.Cutscene) &&
      match(i, 1, TokenType.Identifier)
    ) {
      const idToken = tokens[i + 1];
      currentDef = createTypeDefinition(token, idToken);
      definitions.push(currentDef);
    }

    if (
      token.type === TokenType.Function &&
      match(i, 1, TokenType.Identifier)
    ) {
      const idToken = tokens[i + 1];
      currentFunc = createFunctionDefinition(token, idToken);
      if (i + 2 < tokens.length && tokens[i + 2].type === TokenType.LeftParen) {
        let next = i + 3;
        while (
          next < tokens.length &&
          tokens[next].type === TokenType.Identifier
        ) {
          tryAddVariableToDefinition(currentFunc, tokens[next]);
          next += 2; // skip comma
        }
      }
      if (currentDef != null)
        currentDef.functions.set(idToken.lexeme, currentFunc);
    }

    if (
      token.type === TokenType.Identifier &&
      match(i, 1, TokenType.Dot) &&
      match(i, 2, TokenType.Identifier)
    ) {
      if (currentDef != null) {
        currentDef.memberAccesss.push({
          parent: token,
          member: tokens[i + 2],
        });
      }
    }

    if (
      token.type === TokenType.Identifier &&
      match(i, 1, TokenType.LeftParen) &&
      i - 1 >= 0 &&
      tokens[i - 1].type !== TokenType.Function
    ) {
      if (currentDef != null) {
        currentDef.callExpressions.push(token);
      }
    }

    if (token.type === TokenType.Identifier && match(i, 1, TokenType.Equal)) {
      if (currentFunc != null) {
        if (!currentFunc.variables.has(token.lexeme)) {
          if (
            i - 1 >= 0 &&
            tokens[i - 1].type === TokenType.Dot &&
            i - 2 >= 0 &&
            tokens[i - 2].type === TokenType.Self
          ) {
            if (
              currentDef != null &&
              !tryAddVariableToDefinition(currentDef, token)
            ) {
              var value = "null";
              if (match(i, 2, TokenType.Identifier))
                value = tokens[i + 2].lexeme;
              currentDef.variableAssignment.push({
                identifierToken: token,
                knownValue: value,
              });
            }
          } else {
            const added = tryAddVariableToDefinition(currentFunc, token);
            if (!added) {
              var value = "null";
              if (match(i, 2, TokenType.Identifier))
                value = tokens[i + 2].lexeme;
              currentDef.variableAssignment.push({
                identifierToken: token,
                knownValue: value,
              });
            }
          }
        } else {
          var value = "null";
          if (match(i, 2, TokenType.Identifier)) value = tokens[i + 2].lexeme;
          currentDef.variableAssignment.push({
            identifierToken: token,
            knownValue: value,
          });
        }
      } else {
        tryAddVariableToDefinition(currentDef, token);
      }
    }

    if (token.type === TokenType.LeftCurly) {
      scopeDepth++;
    } else if (token.type === TokenType.RightCurly) {
      scopeDepth--;
      if (scopeDepth == 0) {
        currentDef = null;
        currentFunc = null;
      }
    }
  }

  typeDefinitions.set(uri.toString(), definitions);

  function match(
    i: number,
    offset: number,
    ...tokenTypes: TokenType[]
  ): boolean {
    if (i + offset >= tokens.length) return false;
    for (let index = 0; index < tokenTypes.length; index++) {
      const element = tokenTypes[index];
      if (tokens[i + offset].type === element) return true;
    }
    return false;
  }
}
