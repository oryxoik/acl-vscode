import * as vscode from "vscode";
import Lexer from "./parser/Lexer";
import { ContextBuilder } from "./ContextBuilder";
import { provideSemanticTokens } from "./SemanticTokensProvider";
import {
  handleDocumentChange,
  handleDocumentOpen,
  handleDocumentSave,
  handleExtensionActive,
  typeDeclarationsMap,
} from "./TokenCache";
import { provideCodeCompletion } from "./CompletionProvider";

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
