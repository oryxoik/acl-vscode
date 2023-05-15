import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { DocumentSettings } from "./settings";
import { validateTextDocument } from "./analysis/analyzer";
import { SubSymbolType, symbols } from "./symbols/symbols";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
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
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});

let settings = new DocumentSettings(hasConfigurationCapability);

connection.onDidChangeConfiguration((change) => {
  settings.onDidChangeConfiguration(change);
  documents.all().forEach(() => validateTextDocument);
});

// Only keep settings for open documents
documents.onDidClose((e) => {
  settings.removeSettings(e);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(
    connection,
    settings,
    change.document,
    hasDiagnosticRelatedInformationCapability
  );
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
  (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    // Get the text document and position information from the parameters
    const { textDocument, position } = _textDocumentPosition;
    const { line, character } = position;

    // Split the document into lines
    const text = documents.get(textDocument.uri)?.getText() ?? "";
    const lines = text.split("\n");

    // Analyze the code around the cursor position
    const currentLine = lines[line];
    const lineBeforeCursor = currentLine.substring(0, character);

    let completionItems: CompletionItem[] = [];

    let subSymbols = false;
    let currentSymbol: SubSymbolType[] = [];
    symbols.forEach((symbol) => {
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
    } else {
      completionItems = [];
      symbols.forEach((symbol) => {
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
  }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  return item;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
