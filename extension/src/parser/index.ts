import * as vscode from "vscode";
import { Token } from "../lexer/Token";
import { createFunctionDefinition, createTypeDefinition, FunctionDefinition, tryAddVariableToDefinition, TypeDefinition } from "./definitions";
import tokenize from "../lexer/scanner";
import { isNextTokenOfType, isPreviousTokenNotOfType, isPreviousTokenOfType, isTokenType } from "./utils";
import { TokenType } from "../lexer/TokenType";

/**
 * List of tokens in a document.
 * Get a document's tokens using its URI.
 * Updated when a document is opened or changed
 */
const tokens = new Map<vscode.Uri, Token[]>();

/**
 * Map of tokens grouped by line number
 * Key is the line number
 * Value is an array of tokens in that line
 */
const tokensMap = new Map<number, Token[]>();

/**
 * Map of all the type definitions in the workspace (project)
 * Key is the URI (as string) of the document that the type definition is in
 * Value is an array of type definitions, so each document can have multiple type definitions
 */
const typeDefinitions = new Map<string, TypeDefinition[]>();

/**
 * List of all the type definitions in the workspace (project)
 * It's the same as the value of the typeDefinitions map, but it's a list
 * for easier iteration
 */
var allTypeDefinitions: TypeDefinition[] = [];

/**
 * Reads the tokens and updates the type definitions
 * based on meaningful sequences of tokens.
 * (i.e. a (class, component, extension, or cutscene) keyword followed by an identifier token is a type definition which will be added to the typeDefinitions map,
 * or a function keyword followed by an identifier token is a function definition which will be added to the list of function definitions for that type, etc.)
 */
const updateTypeDefinitionsForDocument = (uri: vscode.Uri) => {
    const documentTokens = tokens.get(uri);
    const definitions: TypeDefinition[] = [];

    var currentDef: TypeDefinition | null = null;
    var currentFunc: FunctionDefinition | null = null;
    var scopeDepth = 0;

    for (let i = 0; i < documentTokens.length; i++) {
        const token = tokens[i];

        // type definition
        if (
            isTokenType(token, TokenType.Class, TokenType.Component, TokenType.Extension, TokenType.Cutscene) &&
            isNextTokenOfType(documentTokens, i, 1, TokenType.Identifier)
        ) {
            const idToken = documentTokens[i + 1];
            currentDef = createTypeDefinition(token, idToken);
            definitions.push(currentDef);
        }

        // function definition
        if (isTokenType(token, TokenType.Function) && isNextTokenOfType(documentTokens, i, 1, TokenType.Identifier)) {
            const idToken = documentTokens[i + 1];
            currentFunc = createFunctionDefinition(token, idToken);
            if (isNextTokenOfType(documentTokens, i, 2, TokenType.LeftParen)) {
                var next = i + 3;
                while (isNextTokenOfType(documentTokens, next, 0, TokenType.Identifier)) {
                    tryAddVariableToDefinition(currentFunc, documentTokens[next]);
                    next += 2; // skip comma
                }
            }
            if (currentDef != null) currentDef.functions.set(idToken.lexeme, currentFunc);
        }

        // member access
        if (
            isTokenType(token, TokenType.Identifier) &&
            isNextTokenOfType(documentTokens, i, 1, TokenType.Dot) &&
            isNextTokenOfType(documentTokens, i, 2, TokenType.Identifier)
        ) {
            if (currentDef != null) {
                currentDef.memberAccesss.push({
                    parent: token,
                    member: documentTokens[i + 2],
                });
            }
        }

        // call expression
        if (
            isTokenType(token, TokenType.Identifier) &&
            isNextTokenOfType(documentTokens, i, 1, TokenType.LeftParen) &&
            isPreviousTokenNotOfType(documentTokens, i, 1, TokenType.Function)
        ) {
            if (currentDef != null) {
                currentDef.callExpressions.push(token);
            }
        }

        // variable assignment
        if (isTokenType(token, TokenType.Identifier) && isNextTokenOfType(documentTokens, i, 1, TokenType.Equal)) {
            if (currentFunc != null) {
                if (!currentFunc.variables.has(token.lexeme)) {
                    if (isPreviousTokenOfType(documentTokens, i, 1, TokenType.Dot) && isPreviousTokenOfType(documentTokens, i, 2, TokenType.Self)) {
                        if (currentDef != null && !tryAddVariableToDefinition(currentDef, token)) {
                            var value = "null";
                            currentDef.variableAssignment.push({
                                identifierToken: token,
                                knownValue: value,
                            });
                        }
                    } else {
                        const added = tryAddVariableToDefinition(currentFunc, token);
                        if (!added) {
                            var value = "null";
                            currentDef.variableAssignment.push({
                                identifierToken: token,
                                knownValue: value,
                            });
                        }
                    }
                } else {
                    var value = "null";
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
            if (scopeDepth < 2) {
                currentFunc = null;
            }
            if (scopeDepth == 0) {
                currentDef = null;
                currentFunc = null;
            }
        }
    }

    typeDefinitions.set(uri.toString(), definitions);

    allTypeDefinitions = [];
    typeDefinitions.forEach((ts) => {
        allTypeDefinitions = allTypeDefinitions.concat(ts);
    });
};

const updateTokens = (uri: vscode.Uri, source: string) => {
    tokens.delete(uri);
    tokens.set(uri, tokenize(source));
    updateTypeDefinitionsForDocument(uri);

    tokens.forEach((ts) => {
        mapTokensByLine(ts);
    });
};

function mapTokensByLine(tokens: Token[]) {
    tokensMap.clear();

    let lastLine = -1;
    let currentTokens: Token[] = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (lastLine != token.line) {
            currentTokens = [];
            lastLine = token.line;
        }

        currentTokens.push(token);
        tokensMap.set(lastLine, currentTokens);
    }
}

export { tokens, updateTokens };
