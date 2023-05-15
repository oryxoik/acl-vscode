import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";

export const colorSymbols: BaseSymbolType = {
  name: "Color",
  kind: CompletionItemKind.Class,
  detail: "class Color",
  description:
    "Inherits from Object. Is a struct, meaning that assignments will create copies and comparisons will return true if all fields are equivalent.",
  subSymbols: [],
};
