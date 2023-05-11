"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSettings = void 0;
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = { maxNumberOfProblems: 1000 };
let globalSettings = defaultSettings;
// Cache the settings of all open documents
const documentSettings = new Map();
class DocumentSettings {
    constructor(hasConfigurationCapability) {
        this._hasConfigurationCapability = hasConfigurationCapability;
    }
    onDidChangeConfiguration(change) {
        if (this._hasConfigurationCapability) {
            documentSettings.clear();
        }
        else {
            globalSettings = ((change.settings.languageServerExample || defaultSettings));
        }
    }
    getDocumentSettings(connection, resource) {
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
    removeSettings(e) {
        documentSettings.delete(e.document.uri);
    }
}
exports.DocumentSettings = DocumentSettings;
//# sourceMappingURL=settings.js.map