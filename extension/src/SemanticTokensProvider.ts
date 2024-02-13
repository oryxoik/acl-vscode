import * as vscode from "vscode";
import { TypeDeclaration } from "./TypeDeclaration";
import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

const tokenTypes = ["class", "function", "parameter", "variable", "property"];
const tokenModifiers = ["declaration", "modification", "readonly", "static"];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export function provideSemanticTokens(
  typeDeclarationsMap: Map<string, TypeDeclaration[]>
): vscode.Disposable {
  const selector = { language: "acl", scheme: "file" };

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
      const tokensBuilder = new vscode.SemanticTokensBuilder(legend);

      if (typeDeclarationsMap.has(document.uri.toString())) {
        const typeDeclarations = typeDeclarationsMap.get(
          document.uri.toString()
        );
        typeDeclarations.forEach((type) => {
          tokensBuilder.push(
            getTokenRange(document, type.Identifier.Token),
            "class",
            ["declaration"]
          );

          type.Variables.forEach(variable => {
            tokensBuilder.push(
              getTokenRange(document, variable.Token),
              "variable",
              ["declaration"]
            );
          });

          type.CallExpressionIdentifiers.forEach(callId => {
            let isTypeCreation = false;
            for (let i = 0; i < typeDeclarations.length; i++) {
              const tdm = typeDeclarations[i];
              if ((tdm.Type === TokenType.Class || tdm.Type === TokenType.Extension) && callId.Text === tdm.Identifier.Text)
              {
                isTypeCreation = true;
                break;
              }
            }

            tokensBuilder.push(
              getTokenRange(document, callId.Token),
              isTypeCreation ? "class" : "function",
              ["readonly"]
            );
          });

          type.VariableAssignments.forEach(variable => {
            tokensBuilder.push(
              getTokenRange(document, variable.Identifier.Token),
              "variable",
              ["modification"]
            );
          });

          type.MemberAccess.forEach(m => {

            let isExtension = false;
            for (let i = 0; i < typeDeclarations.length; i++) {
              const tdm = typeDeclarations[i];
              if (tdm.Type === TokenType.Extension && m.Parent.Text === tdm.Identifier.Text)
              {
                isExtension = true;
                break;
              }
            }

            tokensBuilder.push(
              getTokenRange(document, m.Parent.Token),
              isExtension ? "class" : "property",
              ["static"]
            );
          });

          type.Functions.forEach((func) => {
            tokensBuilder.push(
              getTokenRange(document, func.Identifier.Token),
              "function",
              ["declaration"]
            );

            func.Variables.forEach(variable => {
              tokensBuilder.push(
                getTokenRange(document, variable.Token),
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
