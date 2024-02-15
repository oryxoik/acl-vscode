import * as vscode from "vscode";
import { ContextBuilder } from "./context/ContextBuilder";
import { provideSemanticTokens } from "./providers/semantic-token";
import { provideCodeCompletion } from "./providers/CompletionProvider";
import { getCustomLogicTextDocumentsInWorkspace } from "./utils/document-helper";
import {
  handleDocumentChange,
  handleDocumentOpen,
  handleExtensionActive,
} from "./token-mapper";
// import TokenMapper from "./context/TokenMapper";

export function activate(context: vscode.ExtensionContext) {
  console.log("extension activated");
  handleExtensionActive();

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(handleDocumentOpen),
    vscode.workspace.onDidChangeTextDocument(handleDocumentChange),
    provideSemanticTokens(),
    provideCodeCompletion()
  );

  // vscode.workspace.on
  // handleExtensionActive();

  // context.subscriptions.push(
  //   vscode.workspace.onDidChangeTextDocument(handleDocumentChange),
  //   vscode.workspace.onDidSaveTextDocument(handleDocumentSave),
  //   vscode.workspace.onDidOpenTextDocument(handleDocumentOpen),
  //   provideCodeCompletion(typeDeclarationsMap)
  // );

  // const start = performance.now();
  // const lexer = new Lexer(source);
  // const tokens = lexer.Scan();
  // const builder = new ContextBuilder(source, tokens);
  // const types = builder.build();
  // const end = performance.now();

  // tokens.forEach((token) => {
  //   console.log(token.toString());
  // });

  // types.forEach((type) => {
  //   console.log(`${type.Type} ${type.TypeName}`);
  // });

  // console.log(`Took ${end - start}`);
}
