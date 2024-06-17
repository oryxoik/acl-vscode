import * as vscode from "vscode";
import { Token } from "../lexer/token";
import { TokenType } from "../lexer/TokenType";
import { allTypeDefinitions, typeDefinitions } from "../context-builder";
import types from "../builtin-types";

const tokenTypes = ["class", "function", "parameter", "variable", "property"];
const tokenModifiers = ["declaration", "modification", "readonly", "static"];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export function provideSemanticTokens(): vscode.Disposable {
    const selector = { language: "acl" };

    const provider: vscode.DocumentSemanticTokensProvider = {
        provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
            if (!typeDefinitions.has(document.uri.toString())) return;

            const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
            const definitions = typeDefinitions.get(document.uri.toString());

            definitions.forEach((type) => {
                if (types.includes(type)) return;

                tokensBuilder.push(getTokenRange(document, type.identifierToken), "class", ["declaration"]);

                type.variables.forEach((variable) => {
                    tokensBuilder.push(getTokenRange(document, variable), "variable", ["declaration"]);
                });

                type.callExpressions.forEach((callId) => {
                    var isTypeCreation = false;
                    for (var i = 0; i < allTypeDefinitions.length; i++) {
                        const tdm = allTypeDefinitions[i];
                        if (
                            (tdm.typeToken.type === TokenType.Class || tdm.typeToken.type === TokenType.Extension) &&
                            callId.lexeme === tdm.identifierToken.lexeme
                        ) {
                            isTypeCreation = true;
                            break;
                        }
                    }

                    tokensBuilder.push(getTokenRange(document, callId), isTypeCreation ? "class" : "function", ["readonly"]);
                });

                type.variableAssignment.forEach((variable) => {
                    tokensBuilder.push(getTokenRange(document, variable.identifierToken), "variable", ["modification"]);
                });

                type.memberAccesss.forEach((m) => {
                    var isExtension = false;
                    for (var i = 0; i < allTypeDefinitions.length; i++) {
                        const tdm = allTypeDefinitions[i];
                        if (tdm.typeToken.type === TokenType.Extension && m.parent.lexeme === tdm.identifierToken.lexeme) {
                            isExtension = true;
                            break;
                        }
                    }

                    tokensBuilder.push(getTokenRange(document, m.parent), isExtension ? "class" : "property", ["static"]);
                });

                type.functions.forEach((func) => {
                    tokensBuilder.push(getTokenRange(document, func.identifierToken), "function", ["declaration"]);

                    func.variables.forEach((variable) => {
                        tokensBuilder.push(getTokenRange(document, variable), "parameter", ["declaration"]);
                    });
                });
            });

            return tokensBuilder.build();
        },
    };

    return vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend);
}

function getTokenRange(document: vscode.TextDocument, token: Token): vscode.Range {
    const start = document.positionAt(token.startIndex);
    const end = document.positionAt(token.endIndex);
    return new vscode.Range(start, end);
}
