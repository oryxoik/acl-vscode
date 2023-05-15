import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolField, getSubSymbolFunction } from "../utils";

export const vector3Symbols: BaseSymbolType = {
  name: "Vector3",
  kind: CompletionItemKind.Class,
  detail: "class Vector3",
  description:
    "Inherits from Object. Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.",
  subSymbols: [
    getSubSymbolField("Up", "Vector3", true, ""),
    getSubSymbolField("Down", "Vector3", true, ""),
    getSubSymbolField("Left", "Vector3", true, ""),
    getSubSymbolField("Right", "Vector3", true, ""),
    getSubSymbolField("Forward", "Vector3", true, ""),
    getSubSymbolField("Back", "Vector3", true, ""),
    getSubSymbolField("Zero", "Vector3", true, ""),
    getSubSymbolFunction(
      "Lerp(a: Vector3, b: Vector3, t: float)",
      "Vector3",
      "Returns a Vector3 lerped between a and b using scale t. T must be between 0 and 1."
    ),
    getSubSymbolFunction(
      "GetRotationDirection(a: Vector3, b: Vector3)",
      "Vector3",
      "Gets the relational Vector3 b using a as a reference. This is equivalent to setting MapObject.Forward to Vector a, and finding the relative b vector."
    ),
    getSubSymbolFunction(
      "Distance(a: Vector3, b: Vector3)",
      "float",
      "Returns the distance between two Vector3s."
    ),
  ],
};
