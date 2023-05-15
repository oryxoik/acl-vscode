"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector3Symbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.vector3Symbols = {
    name: "Vector3",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "class Vector3",
    description: "Inherits from Object. Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.",
    subSymbols: [
        (0, utils_1.getSubSymbolField)("Up", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Down", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Left", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Right", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Forward", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Back", "Vector3", true, ""),
        (0, utils_1.getSubSymbolField)("Zero", "Vector3", true, ""),
        (0, utils_1.getSubSymbolFunction)("Lerp(a: Vector3, b: Vector3, t: float)", "Vector3", "Returns a Vector3 lerped between a and b using scale t. T must be between 0 and 1."),
        (0, utils_1.getSubSymbolFunction)("GetRotationDirection(a: Vector3, b: Vector3)", "Vector3", "Gets the relational Vector3 b using a as a reference. This is equivalent to setting MapObject.Forward to Vector a, and finding the relative b vector."),
        (0, utils_1.getSubSymbolFunction)("Distance(a: Vector3, b: Vector3)", "float", "Returns the distance between two Vector3s."),
    ],
};
//# sourceMappingURL=vector3.js.map