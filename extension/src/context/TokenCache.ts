import * as vscode from "vscode";
import { TypeDeclaration } from "./TypeDeclaration";
import { ContextBuilder } from "./ContextBuilder";
import { mapTokensByLine } from "../providers/CompletionProvider";

export let allTypeDeclarations: TypeDeclaration[] = [];
export const typeDeclarationsMap: Map<string, TypeDeclaration[]> = new Map<
  string,
  TypeDeclaration[]
>();

export function handleExtensionActive() {
  allTypeDeclarations = [];
  vscode.workspace.textDocuments.forEach((document) => {
    if (document.languageId === "acl") {
      var typeDeclarations = buildContext(document.getText());
      typeDeclarationsMap.set(document.uri.toString(), typeDeclarations);
      typeDeclarations.forEach((td) => {
        allTypeDeclarations.push(td);
      });
    }
  });
}

export function handleDocumentOpen(document: vscode.TextDocument) {
  if (document.languageId !== "acl") return;
  typeDeclarationsMap.set(
    document.uri.toString(),
    buildContext(document.getText())
  );
}

export function handleDocumentChange(e: vscode.TextDocumentChangeEvent) {
  if (e.document.languageId !== "acl") return;
  typeDeclarationsMap.set(
    e.document.uri.toString(),
    buildContext(e.document.getText())
  );
}

export function handleDocumentSave(document: vscode.TextDocument) {
  if (document.languageId !== "acl") return;
  typeDeclarationsMap.set(
    document.uri.toString(),
    buildContext(document.getText())
  );
}

function buildContext(source: string): TypeDeclaration[] {
  // const lexer = new Scanner();
  // const tokens = lexer.scan(source);
  // const typeDeclarations = new ContextBuilder(source, tokens).build();
  // mapTokensByLine(tokens);
  const typeDeclarations = [];

  return typeDeclarations;
}
