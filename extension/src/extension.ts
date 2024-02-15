import * as vscode from "vscode";
import { provideSemanticTokens } from "./providers/semantic-token";
import { provideCodeCompletion } from "./providers/completion";
import {
  handleDocumentChange,
  handleDocumentOpen,
  handleExtensionActive,
} from "./token-mapper";

export function activate(context: vscode.ExtensionContext) {
  console.log("extension activated");
  handleExtensionActive();

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(handleDocumentOpen),
    vscode.workspace.onDidChangeTextDocument(handleDocumentChange),
    provideSemanticTokens(),
    provideCodeCompletion()
  );
}
