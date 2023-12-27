import * as vscode from "vscode";
import { TypeDeclaration } from "./TypeDeclaration";
import { Token } from "./parser/Token";

const tokenTypes = ["class", "interface", "enum", "function", "variable"];
const tokenModifiers = ["declaration", "modification"];
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
            getTokenRange(document, type.TypeNameToken),
            "class",
            ["declaration"]
          );

          type.Functions.forEach((func) => {
            tokensBuilder.push(
              getTokenRange(document, func.FunctionNameToken),
              "function",
              ["declaration"]
            );
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
