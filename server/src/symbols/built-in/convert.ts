import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const convertSymbols: BaseSymbolType = {
  name: "Convert",
  kind: CompletionItemKind.Class,
  detail: "extension Convert",
  description: "Converting objects to different types.",
  subSymbols: [
    getSubSymbolFunction(
      "ToFloat(value: object)",
      "float",
      "Convert the value to floating type"
    ),
    getSubSymbolFunction(
      "ToInt(value: object)",
      "int",
      "Convert the value to integer type"
    ),
    getSubSymbolFunction(
      "ToBool(value: object)",
      "bool",
      "Convert the value to boolean type"
    ),
    getSubSymbolFunction(
      "ToString(value: object)",
      "string",
      "Convert the value to string type"
    ),
    getSubSymbolFunction(
      "IsFloat(value: object)",
      "bool",
      "Returns true if the object is a float."
    ),
    getSubSymbolFunction(
      "IsInt(value: object)",
      "bool",
      "Returns true if the object is an int."
    ),
    getSubSymbolFunction(
      "IsBool(value: object)",
      "bool",
      "Returns true if the object is a bool."
    ),
    getSubSymbolFunction(
      "IsString(value: object)",
      "bool",
      "Returns true if the object is a string."
    ),
    getSubSymbolFunction(
      "IsObject(value: object)",
      "bool",
      "Returns true if the object is an Object. You can use value.Type for further type checking."
    ),
  ],
};
