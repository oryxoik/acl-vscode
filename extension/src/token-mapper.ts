import * as vscdoe from "vscode";
import { Token } from "./lexer/Token";
import { typeDefinitions, updateContextForDocument } from "./context-builder";
import { mapTokensByLine } from "./providers/completion";
import tokenize from "./lexer/scanner";

/**
 * Map of document URI to list of tokens
 */
const docUriToTokensMap = new Map<vscdoe.Uri, Token[]>();

const updateDocTokens = (uri: vscdoe.Uri, source: string) => {
    docUriToTokensMap.delete(uri);
    const tokens = tokenize(source);
    docUriToTokensMap.set(uri, tokens);
    updateContextForDocument(uri);

    docUriToTokensMap.forEach((ts) => {
        mapTokensByLine(ts);
    });
};

export function handleExtensionActive() {
    vscdoe.workspace.findFiles("**/*.acl").then((uriArray) => {
        uriArray.forEach((uri) => {
            vscdoe.workspace.fs.readFile(uri).then((src) => updateDocTokens(uri, src.toString()));
        });
    });

    console.log(typeDefinitions);
}

export function handleDocumentOpen(doc: vscdoe.TextDocument) {
    if (doc.languageId != "acl") return;
    if (docUriToTokensMap.has(doc.uri)) return;
    updateDocTokens(doc.uri, doc.getText());
}

export function handleDocumentChange(e: vscdoe.TextDocumentChangeEvent) {
    if (e.document.languageId != "acl") return;
    updateDocTokens(e.document.uri, e.document.getText());
    // Todo: no need to parse the whole file one every key press
}

export { docUriToTokensMap };
