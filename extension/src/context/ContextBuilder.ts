import { FunctionDeclaration } from "./FunctionDeclaration";
import { IdentifierToken } from "./IdentifierToken";
import { MemberAccessExoression, TypeDeclaration } from "./TypeDeclaration";
import { VariableAssignment } from "./VariableAssignment";
import { Token } from "../lexer/token";
import { TokenType } from "../lexer/TokenType";

export class ContextBuilder {
  private readonly _source: string;
  private readonly _tokens: Token[];

  constructor(source: string, tokens: Token[]) {
    this._source = source;
    this._tokens = tokens;
  }

  build(): TypeDeclaration[] {
    const types: TypeDeclaration[] = [];
    let currentType: TypeDeclaration | null = null;
    let currentFunction: FunctionDeclaration | null = null;
    let scopeDepth: number = 0;

    for (let i = 0; i < this._tokens.length; i++) {
      const currentToken = this._tokens[i];
      if (
        (currentToken.type === TokenType.Class ||
          currentToken.type === TokenType.Component ||
          currentToken.type === TokenType.Extension ||
          currentToken.type === TokenType.Cutscene) &&
        this.match(i, 1, TokenType.Identifier)
      ) {
        const idToken = this._tokens[i + 1];
        currentType = new TypeDeclaration(
          currentToken.type,
          new IdentifierToken(this.getLexeme(idToken), idToken)
        );
        types.push(currentType);
      }

      if (
        currentToken.type === TokenType.Function &&
        this.match(i, 1, TokenType.Identifier)
      ) {
        const idToken = this._tokens[i + 1];
        const funcLexeme = this.getLexeme(idToken);
        currentFunction = new FunctionDeclaration(
          currentToken.type,
          new IdentifierToken(funcLexeme, idToken)
        );
        if (
          i + 2 < this._tokens.length &&
          this._tokens[i + 2].type === TokenType.LeftParen
        ) {
          let next = i + 3;
          while (
            next < this._tokens.length &&
            this._tokens[next].type === TokenType.Identifier
          ) {
            currentFunction.addVariable(
              this.getLexeme(this._tokens[next]),
              this._tokens[next]
            );
            next += 2;
          }
        }
        if (currentType !== null)
          currentType.addFunction(funcLexeme, currentFunction);
      }

      if (
        currentToken.type === TokenType.Identifier &&
        this.match(i, 1, TokenType.Dot) &&
        this.match(i, 2, TokenType.Identifier)
      ) {
        currentType.MemberAccess.push(
          new MemberAccessExoression(
            new IdentifierToken(this.getLexeme(currentToken), currentToken),
            new IdentifierToken(
              this.getLexeme(this._tokens[i + 2]),
              this._tokens[i + 2]
            )
          )
        );
      }

      if (
        currentToken.type === TokenType.Identifier &&
        this.match(i, 1, TokenType.LeftParen) &&
        i - 1 >= 0 &&
        this._tokens[i - 1].type !== TokenType.Function
      ) {
        currentType.CallExpressionIdentifiers.push(
          new IdentifierToken(this.getLexeme(currentToken), currentToken)
        );
      }

      if (
        currentToken.type === TokenType.Identifier &&
        this.match(i, 1, TokenType.Equal)
      ) {
        const varLexeme = this.getLexeme(currentToken);
        if (currentFunction !== null) {
          if (!currentType.Variables.has(varLexeme)) {
            if (
              i - 1 >= 0 &&
              this._tokens[i - 1].type === TokenType.Dot &&
              i - 2 >= 0 &&
              this._tokens[i - 2].type === TokenType.Self
            ) {
              currentType.addVariable(varLexeme, currentToken);
            } else {
              const variableAdded = currentFunction.addVariable(
                varLexeme,
                currentToken
              );
              if (!variableAdded) {
                let value = "null";
                if (this.match(i, 2, TokenType.Identifier))
                  value = this.getLexeme(this._tokens[i + 2]);
                currentType.VariableAssignments.push(
                  new VariableAssignment(
                    new IdentifierToken(varLexeme, currentToken),
                    value
                  )
                );
              }
            }
          } else {
            let value = "null";
            if (this.match(i, 2, TokenType.Identifier))
              value = this.getLexeme(this._tokens[i + 2]);
            currentType.VariableAssignments.push(
              new VariableAssignment(
                new IdentifierToken(varLexeme, currentToken),
                value
              )
            );
          }
        } else {
          currentType.addVariable(varLexeme, currentToken);
        }
      }

      if (currentToken.type === TokenType.LeftCurly) {
        scopeDepth++;
      } else if (currentToken.type === TokenType.RightCurly) {
        scopeDepth--;
        if (scopeDepth == 0) {
          currentType = null;
          currentFunction = null;
        }
      }
    }
    return types;
  }

  private getLexeme(token: Token): string {
    return this._source.substring(token.startIndex, token.endIndex);
  }

  private match(
    i: number,
    offset: number,
    ...tokenTypes: TokenType[]
  ): boolean {
    if (i + offset >= this._tokens.length) return false;
    for (let index = 0; index < tokenTypes.length; index++) {
      const element = tokenTypes[index];
      if (this._tokens[i + offset].type === element) return true;
    }
    return false;
  }
}
