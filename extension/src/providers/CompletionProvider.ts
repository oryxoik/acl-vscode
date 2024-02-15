import * as vscode from "vscode";
import { TokenType } from "../lexer/TokenType";
import { TypeDeclaration } from "../context/TypeDeclaration";
import { Token } from "../lexer/token";
import { typeDefinitions } from "../context-builder";

let allTokens: Token[] = [];
let tokensMap: Map<number, Token[]> = new Map<number, Token[]>();

// TODO: cleanup this and add the builtin types

export function provideCodeCompletion(): vscode.Disposable {
  return vscode.languages.registerCompletionItemProvider(
    { language: "acl" },
    {
      provideCompletionItems(document, position, token, context) {
        var lineTokens = tokensMap.get(findNearestLine(position.line));
        var lastTokenInLine = lineTokens[lineTokens.length - 1];
        const LeftCurlyIndex = findNearestLeftCurly(lastTokenInLine);
        const funcScopeInfo = isInsideFunctionScope(LeftCurlyIndex);

        let items: vscode.CompletionItem[] = [
          new vscode.CompletionItem("null", vscode.CompletionItemKind.Keyword),

          new vscode.CompletionItem("true", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("false", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("Color", vscode.CompletionItemKind.Class),
          new vscode.CompletionItem("Vector3", vscode.CompletionItemKind.Class),
        ];

        if (!funcScopeInfo.isFunc) {
          items.push(
            new vscode.CompletionItem(
              "function",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem(
              "coroutine",
              vscode.CompletionItemKind.Keyword
            )
          );
        } else {
          const typeIdentifier = findTypeIdentifier(LeftCurlyIndex);
          items.push(
            new vscode.CompletionItem(
              "self",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword),
            new vscode.CompletionItem(
              "elif",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem(
              "else",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem("for", vscode.CompletionItemKind.Keyword),

            new vscode.CompletionItem("in", vscode.CompletionItemKind.Keyword),
            new vscode.CompletionItem(
              "while",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem(
              "return",
              vscode.CompletionItemKind.Keyword
            )
          );

          const nearestToken = findNearestPreviousToken(
            position.line,
            document.offsetAt(position)
          );

          let found = false;
          if (nearestToken.type === TokenType.Dot) {
            const prev = getPreviousToken(nearestToken);
            if (prev.type === TokenType.Self) {
              typeDefinitions.forEach((types) => {
                types.forEach((type) => {
                  if (type.identifierToken === typeIdentifier) {
                    found = true;
                    items = [];
                    type.variables.forEach((variable) => {
                      const item = new vscode.CompletionItem(
                        variable.lexeme,
                        vscode.CompletionItemKind.Field
                      );
                      items.push(item);
                    });
                    type.functions.forEach((func) => {
                      const item = new vscode.CompletionItem(
                        func.identifierToken.lexeme,
                        vscode.CompletionItemKind.Function
                      );
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

              typeDefinitions.forEach((types) => {
                types.forEach((type) => {
                  if (
                    type.typeToken.type === TokenType.Extension &&
                    type.identifierToken.lexeme === typeName
                  ) {
                    found = true;
                    items = [];
                    type.variables.forEach((variable) => {
                      const item = new vscode.CompletionItem(
                        variable.lexeme,
                        vscode.CompletionItemKind.Field
                      );
                      items.push(item);
                    });
                    type.functions.forEach((func) => {
                      const item = new vscode.CompletionItem(
                        func.identifierToken.lexeme,
                        vscode.CompletionItemKind.Function
                      );
                      items.push(item);
                    });
                  }
                });
              });
            }
          }

          if (!found) {
            typeDefinitions.forEach((types) => {
              types.forEach((type) => {
                items.push(
                  new vscode.CompletionItem(
                    type.identifierToken.lexeme,
                    vscode.CompletionItemKind.Class
                  )
                );

                if (type.identifierToken === typeIdentifier) {
                  type.variables.forEach((variable) => {
                    const item = new vscode.CompletionItem(
                      variable.lexeme,
                      vscode.CompletionItemKind.Field
                    );
                    item.insertText = `self.${variable.lexeme}`;
                    items.push(item);
                  });
                  type.functions.forEach((func) => {
                    const item = new vscode.CompletionItem(
                      func.identifierToken.lexeme,
                      vscode.CompletionItemKind.Function
                    );
                    item.insertText = `self.${func.identifierToken.lexeme}`;
                    items.push(item);

                    if (func.identifierToken === funcScopeInfo.idToken) {
                      func.variables.forEach((arg) => {
                        items.push(
                          new vscode.CompletionItem(
                            arg.lexeme,
                            vscode.CompletionItemKind.Variable
                          )
                        );
                      });
                    }
                  });
                }
              });
            });
          }
        }

        return items;
      },
    },
    "."
  );
}

function getPreviousToken(currentToken: Token): Token {
  const i = allTokens.indexOf(currentToken);
  if (i - 1 < 0) return null;
  return allTokens[i - 1];
}

function findNearestLeftCurly(currentToken: Token): number {
  let currentIndex = allTokens.indexOf(currentToken);
  let ignoreCount = 0;

  while (currentIndex >= 0) {
    if (allTokens[currentIndex].type === TokenType.RightCurly) ignoreCount++;

    if (allTokens[currentIndex].type === TokenType.LeftCurly) {
      if (ignoreCount == 0) return currentIndex;
      ignoreCount--;
    }

    currentIndex--;
  }

  return -1;
}

function findTypeIdentifier(currentIndex: number): Token {
  while (currentIndex >= 0) {
    if (
      (allTokens[currentIndex].type === TokenType.Class ||
        allTokens[currentIndex].type === TokenType.Component ||
        allTokens[currentIndex].type === TokenType.Extension ||
        allTokens[currentIndex].type === TokenType.Cutscene) &&
      allTokens[currentIndex + 1].type === TokenType.Identifier
    )
      return allTokens[currentIndex + 1];

    currentIndex--;
  }

  return null;
}

function isInsideFunctionScope(currentIndex: number) {
  while (currentIndex >= 0) {
    if (
      allTokens[currentIndex].type === TokenType.Class ||
      allTokens[currentIndex].type === TokenType.Component ||
      allTokens[currentIndex].type === TokenType.Extension ||
      allTokens[currentIndex].type === TokenType.Cutscene
    )
      return { isFunc: false, idToken: null };

    if (
      allTokens[currentIndex].type === TokenType.Function &&
      allTokens[currentIndex + 1].type === TokenType.Identifier
    ) {
      const identifierToken = allTokens[currentIndex + 1];
      return { isFunc: true, idToken: identifierToken };
    }

    currentIndex--;
  }

  return { isFunc: false, idToken: null };
}

function findNearestLine(line: number): number {
  while (line >= 0) {
    if (tokensMap.has(line)) return line;
    line--;
  }

  return tokensMap.keys()[tokensMap.size - 1];
}

function findNearestPreviousToken(line: number, offset: number): Token {
  const currentLine = findNearestLine(line);
  const currentTokens = tokensMap.get(currentLine);

  let nearest: Token | null = null;
  let minOffset = Number.MAX_SAFE_INTEGER;
  currentTokens.forEach((token) => {
    const dist = Math.abs(offset - token.startIndex);
    if (dist < minOffset) {
      nearest = token;
      minOffset = dist;
    }
  });

  return nearest;
}

export function mapTokensByLine(tokens: Token[]) {
  allTokens = tokens;
  tokensMap = new Map<number, Token[]>();

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
