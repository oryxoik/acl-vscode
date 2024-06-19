import * as vscode from "vscode";
import { provideSemanticTokens } from "./providers/semantic-token";
import { provideCodeCompletion } from "./providers/completion";
import * as parser from "./parser/index";

export function activate(context: vscode.ExtensionContext) {
    console.log("extension activated 2");
    onExtentionActive();

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(onDocumentOpen),
        vscode.workspace.onDidChangeTextDocument(onDocumentChange),
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
