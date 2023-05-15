import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const mathSymbols: BaseSymbolType = {
  name: "Math",
  kind: CompletionItemKind.Class,
  detail: "extension Math",
  description:
    "Math functions. Note that parameter types can be either int or float unless otherwise specified. Functions may return int or float depending on the parameter types given.",
  subSymbols: [
    getSubSymbolFunction(
      "Clamp(value, min, max)",
      "int/float",
      "Clamps the value between min and max."
    ),
    getSubSymbolFunction("Max(a, b)", "int/float", "Maximum of a and b."),
    getSubSymbolFunction("Min(a, b)", "int/float", "Minimum of a and b."),
    getSubSymbolFunction("Pow(a, b)", "float", "a to the power of b."),
    getSubSymbolFunction("Abs(a)", "int/float", "Absolute value of a."),
    getSubSymbolFunction("Sqrt(a)", "float", "Square root of a."),
    getSubSymbolFunction("Mod(a, b)", "int", "Modulo of a % b"),
    getSubSymbolFunction("Ceil(a)", "int", "Rounds to higher int."),
    getSubSymbolFunction("Floor(a)", "int", "Rounds to lower int."),
    getSubSymbolFunction("Round(a)", "int", "Rounds to nearest int."),
    getSubSymbolFunction("Sin(a)", "float", "Sin of a, in degrees."),
    getSubSymbolFunction("Cos(a)", "float", "Cosine of a."),
    getSubSymbolFunction("Tan(a)", "float", "Tan of a."),
    getSubSymbolFunction("Asin(a)", "float", "Arcsin of a, in degrees."),
    getSubSymbolFunction("Acos(a)", "float", "Arccos of a."),
    getSubSymbolFunction("Atan(a)", "float", "Arctan of a."),
  ],
};
