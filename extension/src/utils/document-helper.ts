import * as vscode from "vscode";

function getCustomLogicTextDocumentsInWorkspace() {
  const documents: vscode.TextDocument[] = [];
  vscode.workspace.textDocuments.forEach((x) => {
    /* if (x.languageId === "acl") */ documents.push(x);
  });
  return documents;
}

export { getCustomLogicTextDocumentsInWorkspace };
