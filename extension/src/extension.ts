import * as vscode from "vscode";
import Lexer from "./lexer/Lexer";
import { ContextBuilder } from "./context/ContextBuilder";
import { provideSemanticTokens } from "./providers/SemanticTokensProvider";
import {
  handleDocumentChange,
  handleDocumentOpen,
  handleDocumentSave,
  handleExtensionActive,
  typeDeclarationsMap,
} from "./context/TokenCache";
import { provideCodeCompletion } from "./providers/CompletionProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension is now active!");

  handleExtensionActive();

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(handleDocumentChange),
    vscode.workspace.onDidSaveTextDocument(handleDocumentSave),
    vscode.workspace.onDidOpenTextDocument(handleDocumentOpen),
    provideSemanticTokens(typeDeclarationsMap),
    provideCodeCompletion(typeDeclarationsMap)
  );

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
