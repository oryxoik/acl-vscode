"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.convertSymbols = {
    name: "Convert",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Convert",
    description: "Converting objects to different types.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("ToFloat(value: object)", "float", "Convert the value to floating type"),
        (0, utils_1.getSubSymbolFunction)("ToInt(value: object)", "int", "Convert the value to integer type"),
        (0, utils_1.getSubSymbolFunction)("ToBool(value: object)", "bool", "Convert the value to boolean type"),
        (0, utils_1.getSubSymbolFunction)("ToString(value: object)", "string", "Convert the value to string type"),
        (0, utils_1.getSubSymbolFunction)("IsFloat(value: object)", "bool", "Returns true if the object is a float."),
        (0, utils_1.getSubSymbolFunction)("IsInt(value: object)", "bool", "Returns true if the object is an int."),
        (0, utils_1.getSubSymbolFunction)("IsBool(value: object)", "bool", "Returns true if the object is a bool."),
        (0, utils_1.getSubSymbolFunction)("IsString(value: object)", "bool", "Returns true if the object is a string."),
        (0, utils_1.getSubSymbolFunction)("IsObject(value: object)", "bool", "Returns true if the object is an Object. You can use value.Type for further type checking."),
    ],
};
//# sourceMappingURL=convert.js.map