"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.stringSymbols = {
    name: "String",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension String",
    description: "String manipulation functions.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("FormatFloat(num: float, decimals: int)", "string", "Format the float to decimal places."),
        (0, utils_1.getSubSymbolFunction)("Split(value: string, separator: string)", "List(string)", "Split the string into a list."),
        (0, utils_1.getSubSymbolFunction)("Join(value: List, separator: string)", "string", "Join the list into a string."),
        (0, utils_1.getSubSymbolFunction)("Substring(value: string, startIndex: int)", "string", "Substring of string from startIndex."),
        (0, utils_1.getSubSymbolFunction)("SubstringWithLength(value: string, startIndex: int, length: int)", "string", "Substring of string from startIndex and with given length."),
        (0, utils_1.getSubSymbolFunction)("Length(value: string)", "int", "Length of the string."),
        (0, utils_1.getSubSymbolFunction)("Replace(value: string, match: string, with: string)", "string", "Replace all matches in the string with the replacement."),
        (0, utils_1.getSubSymbolFunction)("Contains(value: string, match: string)", "bool", "If the string contains match."),
        (0, utils_1.getSubSymbolFunction)("StartsWith(value: string, match: string)", "bool", "If the string starts with match."),
        (0, utils_1.getSubSymbolFunction)("EndsWith(value: string, match: string)", "bool", "If the string ends with match."),
        (0, utils_1.getSubSymbolFunction)("Trim(value: string)", "string", "Trim all whitespace from start and end of string."),
        (0, utils_1.getSubSymbolFunction)("Insert(value: string, insert: string, index: int)", "string", "Insert a string at given index."),
    ],
};
//# sourceMappingURL=string.js.map