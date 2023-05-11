import {
  Connection,
  DidChangeConfigurationParams,
  TextDocumentChangeEvent,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

interface ExtentionSettings {
  maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExtentionSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExtentionSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExtentionSettings>> = new Map();

export class DocumentSettings {
  private _hasConfigurationCapability: boolean;

  constructor(hasConfigurationCapability: boolean) {
    this._hasConfigurationCapability = hasConfigurationCapability;
  }

  onDidChangeConfiguration(change: DidChangeConfigurationParams) {
    if (this._hasConfigurationCapability) {
      documentSettings.clear();
    } else {
      globalSettings = <ExtentionSettings>(
        (change.settings.languageServerExample || defaultSettings)
      );
    }
  }

  getDocumentSettings(
    connection: Connection,
    resource: string
  ): Thenable<ExtentionSettings> {
    if (!this._hasConfigurationCapability) {
      return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
      result = connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "aclLanguageServer",
      });
      documentSettings.set(resource, result);
    }
    return result;
  }

  removeSettings(e: TextDocumentChangeEvent<TextDocument>) {
    documentSettings.delete(e.document.uri);
  }
}
