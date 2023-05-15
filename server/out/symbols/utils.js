"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubSymbolFunction = exports.getSubSymbolField = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const getSubSymbolField = (name, type, isReadOnly, description) => {
    const output = {
        name,
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: `${isReadOnly ? "(Readonly)" : ""} ${name}: ${type}`,
        description,
    };
    return output;
};
exports.getSubSymbolField = getSubSymbolField;
const getSubSymbolFunction = (name, type, description) => {
    const output = {
        name: name.split("(")[0],
        kind: vscode_languageserver_1.CompletionItemKind.Method,
        detail: `function ${name}${type !== "null" ? `: ${type}` : ""}`,
        description,
    };
    return output;
};
exports.getSubSymbolFunction = getSubSymbolFunction;
//# sourceMappingURL=utils.js.map