import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const stringSymbols: BaseSymbolType = {
  name: "String",
  kind: CompletionItemKind.Class,
  detail: "extension String",
  description: "String manipulation functions.",
  subSymbols: [
    getSubSymbolFunction(
      "FormatFloat(num: float, decimals: int)",
      "string",
      "Format the float to decimal places."
    ),
    getSubSymbolFunction(
      "Split(value: string, separator: string)",
      "List(string)",
      "Split the string into a list."
    ),
    getSubSymbolFunction(
      "Join(value: List, separator: string)",
      "string",
      "Join the list into a string."
    ),
    getSubSymbolFunction(
      "Substring(value: string, startIndex: int)",
      "string",
      "Substring of string from startIndex."
    ),
    getSubSymbolFunction(
      "SubstringWithLength(value: string, startIndex: int, length: int)",
      "string",
      "Substring of string from startIndex and with given length."
    ),
    getSubSymbolFunction(
      "Length(value: string)",
      "int",
      "Length of the string."
    ),
    getSubSymbolFunction(
      "Replace(value: string, match: string, with: string)",
      "string",
      "Replace all matches in the string with the replacement."
    ),
    getSubSymbolFunction(
      "Contains(value: string, match: string)",
      "bool",
      "If the string contains match."
    ),
    getSubSymbolFunction(
      "StartsWith(value: string, match: string)",
      "bool",
      "If the string starts with match."
    ),
    getSubSymbolFunction(
      "EndsWith(value: string, match: string)",
      "bool",
      "If the string ends with match."
    ),
    getSubSymbolFunction(
      "Trim(value: string)",
      "string",
      "Trim all whitespace from start and end of string."
    ),
    getSubSymbolFunction(
      "Insert(value: string, insert: string, index: int)",
      "string",
      "Insert a string at given index."
    ),
  ],
};
