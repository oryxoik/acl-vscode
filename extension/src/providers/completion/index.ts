import * as vscode from "vscode";
import * as parser from "../../parser/index";
import * as builtinConstants from "../../builtin-constants";
import { TokenType } from "../../lexer/TokenType";
import { Token } from "../../lexer/Token";
import {
    findNearestLeftCurly,
    findNearestLine,
    findNearestPreviousToken,
    findTypeIdentifier,
    getNextToken,
    getPreviousToken,
    isInsideFunctionScope,
} from "./utils";
import { builtinCallbacks } from "../../builtin-callbacks";

export function provideCodeCompletion(): vscode.Disposable {
    return vscode.languages.registerCompletionItemProvider(
        { language: "acl" },
        {
            provideCompletionItems(document, position, token, context) {
                var lineTokens = parser.tokensMap.get(findNearestLine(position.line));
                var lastTokenInLine = lineTokens[lineTokens.length - 1];
                const LeftCurlyIndex = findNearestLeftCurly(lastTokenInLine);
                const funcScopeInfo = isInsideFunctionScope(LeftCurlyIndex);

                let items: vscode.CompletionItem[] = [
                    new vscode.CompletionItem("null", vscode.CompletionItemKind.Keyword),
                    new vscode.CompletionItem("true", vscode.CompletionItemKind.Keyword),
                    new vscode.CompletionItem("false", vscode.CompletionItemKind.Keyword),
                    new vscode.CompletionItem("Color", vscode.CompletionItemKind.Class),
                    new vscode.CompletionItem("Vector3", vscode.CompletionItemKind.Class),
                    new vscode.CompletionItem("Quaternion", vscode.CompletionItemKind.Class),
                ];

                if (!funcScopeInfo.isFunc) {
                    items.push(
                        new vscode.CompletionItem("function", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("coroutine", vscode.CompletionItemKind.Keyword)
                    );
                } else {
                    const typeIdentifier = findTypeIdentifier(LeftCurlyIndex);
                    items.push(
                        new vscode.CompletionItem("self", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("elif", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("else", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("for", vscode.CompletionItemKind.Keyword),

                        new vscode.CompletionItem("in", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("while", vscode.CompletionItemKind.Keyword),
                        new vscode.CompletionItem("return", vscode.CompletionItemKind.Keyword)
                    );

                    const nearestToken = findNearestPreviousToken(position.line, document.offsetAt(position));

                    let found = false;
                    if (nearestToken.type === TokenType.Dot) {
                        const prev = getPreviousToken(nearestToken);
                        const next = getNextToken(nearestToken);
                        if (prev.type === TokenType.Self) {
                            parser.typeDefinitions.forEach((types) => {
                                types.forEach((type) => {
                                    if (type.identifierToken === typeIdentifier) {
                                        found = true;
                                        items = [];
                                        type.variables.forEach((variable) => {
                                            const item = new vscode.CompletionItem(variable.lexeme, vscode.CompletionItemKind.Field);
                                            items.push(item);
                                        });
                                        type.functions.forEach((func) => {
                                            const item = new vscode.CompletionItem(func.identifierToken.lexeme, vscode.CompletionItemKind.Function);
                                            item.insertText = getFunctionInsertText(next, func.identifierToken.lexeme);
                                            items.push(item);
                                        });
                                    }
                                });
                            });
                        }
                        if (prev.type === TokenType.Identifier) {
                            const start = document.positionAt(prev.startIndex);
                            const end = document.positionAt(prev.endIndex);
                            const typeName = document.getText(new vscode.Range(start, end));

                            parser.typeDefinitions.forEach((types) => {
                                types.forEach((type) => {
                                    if (type.typeToken.type === TokenType.Extension && type.identifierToken.lexeme === typeName) {
                                        found = true;
                                        items = [];
                                        type.variables.forEach((variable) => {
                                            const item = new vscode.CompletionItem(variable.lexeme, vscode.CompletionItemKind.Field);
                                            items.push(item);
                                        });
                                        type.functions.forEach((func) => {
                                            if (typeName === "Main" && builtinCallbacks.includes(func.identifierToken.lexeme)) {
                                                return;
                                            }
                                            const item = new vscode.CompletionItem(func.identifierToken.lexeme, vscode.CompletionItemKind.Function);
                                            item.insertText = getFunctionInsertText(next, func.identifierToken.lexeme);
                                            items.push(item);
                                        });
                                    }
                                });
                            });

                            if (!found) {
                                builtinConstants.stringConstants.forEach((constant) => {
                                    if (constant.key === typeName) {
                                        found = true;
                                        items = [];

                                        const sPos = document.positionAt(nearestToken.endIndex - typeName.length - 1);
                                        const ePos = document.positionAt(nearestToken.endIndex + 1);
                                        constant.values.forEach((value) => {
                                            const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.EnumMember);
                                            item.insertText = `"${value}"`;
                                            item.additionalTextEdits = [vscode.TextEdit.replace(new vscode.Range(sPos, ePos), "")];
                                            items.push(item);
                                        });
                                    }
                                });
                            }

                            if (!found) {
                                return [];
                            }
                        }
                    }

                    if (!found) {
                        parser.typeDefinitions.forEach((types) => {
                            types.forEach((type) => {
                                if (
                                    type.typeToken.type !== TokenType.Component &&
                                    type.typeToken.type !== TokenType.Cutscene &&
                                    type.identifierToken.lexeme !== typeIdentifier.lexeme &&
                                    type.identifierToken.lexeme !== "Vector3" &&
                                    type.identifierToken.lexeme !== "Quaternion"
                                ) {
                                    items.push(new vscode.CompletionItem(type.identifierToken.lexeme, vscode.CompletionItemKind.Class));
                                }

                                if (type.identifierToken === typeIdentifier) {
                                    if (type.typeToken.type === TokenType.Component) {
                                        const mo = new vscode.CompletionItem("MapObject", vscode.CompletionItemKind.Field);
                                        mo.insertText = `self.MapObject`;
                                        const nv = new vscode.CompletionItem("NetworkView", vscode.CompletionItemKind.Field);
                                        nv.insertText = `self.NetworkView`;
                                        items.push(mo);
                                        items.push(nv);
                                    }
                                    type.variables.forEach((variable) => {
                                        const item = new vscode.CompletionItem(variable.lexeme, vscode.CompletionItemKind.Field);
                                        item.insertText = `self.${variable.lexeme}`;
                                        items.push(item);
                                    });
                                    type.functions.forEach((func) => {
                                        const item = new vscode.CompletionItem(func.identifierToken.lexeme, vscode.CompletionItemKind.Function);
                                        item.insertText = new vscode.SnippetString(`self.${func.identifierToken.lexeme}($0);`);
                                        items.push(item);

                                        if (func.identifierToken === funcScopeInfo.idToken) {
                                            func.variables.forEach((arg) => {
                                                items.push(new vscode.CompletionItem(arg.lexeme, vscode.CompletionItemKind.Variable));
                                            });
                                        }
                                    });
                                }
                            });
                        });

                        builtinConstants.stringConstants.forEach((constant) => {
                            items.push(new vscode.CompletionItem(constant.key, vscode.CompletionItemKind.Enum));
                        });
                    }
                }

                return items;
            },
        },
        "."
    );
}

function getFunctionInsertText(nextToken: Token, name: string) {
    if (nextToken !== null && nextToken.type === TokenType.LeftParen) {
        return name;
    }

    return new vscode.SnippetString(`${name}($0);`);
}
