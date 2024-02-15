import * as vscdoe from "vscode";
import { Token } from "./lexer/token";
import { typeDefinitions, updateContextForDocument } from "./context-builder";
import { mapTokensByLine } from "./providers/CompletionProvider";
import tokenize from "./lexer/Scanner";

const mappedTokens: Map<vscdoe.Uri, Token[]> = new Map<vscdoe.Uri, Token[]>();
const processSource = (uri: vscdoe.Uri, source: string) => {
  mappedTokens.delete(uri);
  const tokens = tokenize(source);
  mappedTokens.set(uri, tokens);
  updateContextForDocument(uri);

  mappedTokens.forEach((ts) => {
    mapTokensByLine(ts);
  });
};

export function handleExtensionActive() {
  vscdoe.workspace.findFiles("**/*.acl").then((uriArray) => {
    uriArray.forEach((uri) => {
      vscdoe.workspace.fs
        .readFile(uri)
        .then((src) => processSource(uri, src.toString()));
    });
  });

  console.log(typeDefinitions);
}

export function handleDocumentOpen(doc: vscdoe.TextDocument) {
  if (doc.languageId != "acl") return;
  if (mappedTokens.has(doc.uri)) return;
  processSource(doc.uri, doc.getText());
}

export function handleDocumentChange(e: vscdoe.TextDocumentChangeEvent) {
  if (e.document.languageId != "acl") return;
  processSource(e.document.uri, e.document.getText());
  console.log("changed");
  // Todo: no need to parse the whole file one every key press
}

export { mappedTokens };
