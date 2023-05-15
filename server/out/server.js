"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const settings_1 = require("./settings");
const analyzer_1 = require("./analysis/analyzer");
const symbols_1 = require("./symbols/symbols");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["."],
            },
        },
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true,
            },
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log("Workspace folder change event received.");
        });
    }
});
let settings = new settings_1.DocumentSettings(hasConfigurationCapability);
connection.onDidChangeConfiguration((change) => {
    settings.onDidChangeConfiguration(change);
    documents.all().forEach(() => analyzer_1.validateTextDocument);
});
// Only keep settings for open documents
documents.onDidClose((e) => {
    settings.removeSettings(e);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
    (0, analyzer_1.validateTextDocument)(connection, settings, change.document, hasDiagnosticRelatedInformationCapability);
});
// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition) => {
    // Get the text document and position information from the parameters
    const { textDocument, position } = _textDocumentPosition;
    const { line, character } = position;
    // Split the document into lines
    const text = documents.get(textDocument.uri)?.getText() ?? "";
    const lines = text.split("\n");
    // Analyze the code around the cursor position
    const currentLine = lines[line];
    const lineBeforeCursor = currentLine.substring(0, character);
    let completionItems = [];
    let subSymbols = false;
    let currentSymbol = [];
    symbols_1.symbols.forEach((symbol) => {
        if (lineBeforeCursor.endsWith(`${symbol.name}.`)) {
            subSymbols = true;
            currentSymbol = symbol.subSymbols;
        }
    });
    if (subSymbols) {
        completionItems = [];
        currentSymbol.forEach((symbol) => {
            completionItems.push({
                label: symbol.name,
                kind: symbol.kind,
                detail: symbol.detail,
                documentation: symbol.description,
            });
        });
    }
    else {
        completionItems = [];
        symbols_1.symbols.forEach((symbol) => {
            completionItems.push({
                label: symbol.name,
                kind: symbol.kind,
                detail: symbol.detail,
                documentation: symbol.description,
                commitCharacters: ["."],
            });
        });
    }
    return completionItems;
});
connection.onCompletionResolve((item) => {
    return item;
});
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map