"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.randomSymbols = {
    name: "Random",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Random",
    description: "Randomization functions.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("RandomInt(min: int, max: int)", "int", "Returns random integer between min and max (exclusive)."),
        (0, utils_1.getSubSymbolFunction)("RandomFloat(min: float, max: float)", "float", "Returns random float between min and max."),
        (0, utils_1.getSubSymbolFunction)("RandomBool()", "bool", "Returns random boolean."),
        (0, utils_1.getSubSymbolFunction)("RandomDirection()", "Vector3", "Returns random normalized Vector3."),
        (0, utils_1.getSubSymbolFunction)("RandomSign()", "int", "Returns either -1 or 1."),
        (0, utils_1.getSubSymbolFunction)("RandomVector3(min: Vector3, max: Vector3)", "Vector3", "Returns a random Vector3 between min and max."),
    ],
};
//# sourceMappingURL=random.js.map