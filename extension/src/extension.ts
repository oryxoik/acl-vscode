import * as vscode from "vscode";
import { provideSemanticTokens } from "./providers/semantic-token";
import { provideCodeCompletion } from "./providers/completion";
import { handleDocumentChange, handleDocumentOpen, handleExtensionActive } from "./token-mapper";
import * as parser from "./parser/index";

export function activate(context: vscode.ExtensionContext) {
    console.log("extension activated");
    // handleExtensionActive();
    onExtentionActive();

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(onDocumentOpen),
        vscode.workspace.onDidChangeTextDocument(handleDocumentChange),
        provideSemanticTokens(),
        provideCodeCompletion()
    );
}

async function onExtentionActive() {
    const uriArray = await vscode.workspace.findFiles("**/*.acl");
    uriArray.forEach(async (uri) => {
        const src = await vscode.workspace.fs.readFile(uri);
        parser.updateTokens(uri, src.toString());
    });
}

function onDocumentOpen(doc: vscode.TextDocument) {
    if (doc.languageId != "acl") return;
    if (parser.tokens.has(doc.uri)) return;
    parser.updateTokens(doc.uri, doc.getText());
}

function onDocumentChange(e: vscode.TextDocumentChangeEvent) {
    if (e.document.languageId != "acl") return;
    parser.updateTokens(e.document.uri, e.document.getText());
    // Todo: no need to parse the whole file one every key press
}
