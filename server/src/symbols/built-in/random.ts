import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const randomSymbols: BaseSymbolType = {
  name: "Random",
  kind: CompletionItemKind.Class,
  detail: "extension Random",
  description: "Randomization functions.",
  subSymbols: [
    getSubSymbolFunction(
      "RandomInt(min: int, max: int)",
      "int",
      "Returns random integer between min and max (exclusive)."
    ),
    getSubSymbolFunction(
      "RandomFloat(min: float, max: float)",
      "float",
      "Returns random float between min and max."
    ),
    getSubSymbolFunction("RandomBool()", "bool", "Returns random boolean."),
    getSubSymbolFunction(
      "RandomDirection()",
      "Vector3",
      "Returns random normalized Vector3."
    ),
    getSubSymbolFunction("RandomSign()", "int", "Returns either -1 or 1."),
    getSubSymbolFunction(
      "RandomVector3(min: Vector3, max: Vector3)",
      "Vector3",
      "Returns a random Vector3 between min and max."
    ),
  ],
};
