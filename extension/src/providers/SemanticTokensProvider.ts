import * as vscode from "vscode";
import { TypeDeclaration } from "../context/TypeDeclaration";
import { Token } from "../lexer/token";
import { TokenType } from "../lexer/TokenType";
import { typeDefinitions } from "../context-builder";

const tokenTypes = ["class", "function", "parameter", "variable", "property"];
const tokenModifiers = ["declaration", "modification", "readonly", "static"];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export function provideSemanticTokens(): vscode.Disposable {
  const selector = { language: "acl" };

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      const tokensBuilder = new vscode.SemanticTokensBuilder(legend);

      console.log(document.uri.toString());
      console.log(typeDefinitions.has(document.uri.toString()));
      if (typeDefinitions.has(document.uri.toString())) {
        const definitions = typeDefinitions.get(document.uri.toString());
        definitions.forEach((type) => {
          tokensBuilder.push(
            getTokenRange(document, type.identifierToken),
            "class",
            ["declaration"]
          );

          type.variables.forEach((variable) => {
            tokensBuilder.push(getTokenRange(document, variable), "variable", [
              "declaration",
            ]);
          });

          type.callExpressions.forEach((callId) => {
            let isTypeCreation = false;
            for (let i = 0; i < definitions.length; i++) {
              const tdm = definitions[i];
              if (
                (tdm.typeToken.type === TokenType.Class ||
                  tdm.typeToken.type === TokenType.Extension) &&
                callId.lexeme === tdm.identifierToken.lexeme
              ) {
                isTypeCreation = true;
                break;
              }
            }

            tokensBuilder.push(
              getTokenRange(document, callId),
              isTypeCreation ? "class" : "function",
              ["readonly"]
            );
          });

          type.variableAssignment.forEach((variable) => {
            tokensBuilder.push(
              getTokenRange(document, variable.identifierToken),
              "variable",
              ["modification"]
            );
          });

          type.memberAccesss.forEach((m) => {
            let isExtension = false;
            for (let i = 0; i < definitions.length; i++) {
              const tdm = definitions[i];
              if (
                tdm.typeToken.type === TokenType.Extension &&
                m.parent.lexeme === tdm.identifierToken.lexeme
              ) {
                isExtension = true;
                break;
              }
            }

            tokensBuilder.push(
              getTokenRange(document, m.parent),
              isExtension ? "class" : "property",
              ["static"]
            );
          });

          type.functions.forEach((func) => {
            tokensBuilder.push(
              getTokenRange(document, func.identifierToken),
              "function",
              ["declaration"]
            );

            func.variables.forEach((variable) => {
              tokensBuilder.push(
                getTokenRange(document, variable),
                "parameter",
                ["declaration"]
              );
            });
          });
        });
      }

      return tokensBuilder.build();
    },
  };

  return vscode.languages.registerDocumentSemanticTokensProvider(
    selector,
    provider,
    legend
  );
}

function getTokenRange(
  document: vscode.TextDocument,
  token: Token
): vscode.Range {
  const start = document.positionAt(token.startIndex);
  const end = document.positionAt(token.endIndex);
  return new vscode.Range(start, end);
}
