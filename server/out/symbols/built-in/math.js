"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.mathSymbols = {
    name: "Math",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Math",
    description: "Math functions. Note that parameter types can be either int or float unless otherwise specified. Functions may return int or float depending on the parameter types given.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("Clamp(value, min, max)", "int/float", "Clamps the value between min and max."),
        (0, utils_1.getSubSymbolFunction)("Max(a, b)", "int/float", "Maximum of a and b."),
        (0, utils_1.getSubSymbolFunction)("Min(a, b)", "int/float", "Minimum of a and b."),
        (0, utils_1.getSubSymbolFunction)("Pow(a, b)", "float", "a to the power of b."),
        (0, utils_1.getSubSymbolFunction)("Abs(a)", "int/float", "Absolute value of a."),
        (0, utils_1.getSubSymbolFunction)("Sqrt(a)", "float", "Square root of a."),
        (0, utils_1.getSubSymbolFunction)("Mod(a, b)", "int", "Modulo of a % b"),
        (0, utils_1.getSubSymbolFunction)("Ceil(a)", "int", "Rounds to higher int."),
        (0, utils_1.getSubSymbolFunction)("Floor(a)", "int", "Rounds to lower int."),
        (0, utils_1.getSubSymbolFunction)("Round(a)", "int", "Rounds to nearest int."),
        (0, utils_1.getSubSymbolFunction)("Sin(a)", "float", "Sin of a, in degrees."),
        (0, utils_1.getSubSymbolFunction)("Cos(a)", "float", "Cosine of a."),
        (0, utils_1.getSubSymbolFunction)("Tan(a)", "float", "Tan of a."),
        (0, utils_1.getSubSymbolFunction)("Asin(a)", "float", "Arcsin of a, in degrees."),
        (0, utils_1.getSubSymbolFunction)("Acos(a)", "float", "Arccos of a."),
        (0, utils_1.getSubSymbolFunction)("Atan(a)", "float", "Arctan of a."),
    ],
};
//# sourceMappingURL=math.js.map