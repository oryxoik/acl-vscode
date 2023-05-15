import { CompletionItemKind } from "vscode-languageserver";
import { SubSymbolType } from "./symbols";

export const getSubSymbolField = (
  name: string,
  type: string,
  isReadOnly: boolean,
  description: string
): SubSymbolType => {
  const output: SubSymbolType = {
    name,
    kind: CompletionItemKind.Property,
    detail: `${isReadOnly ? "(Readonly)" : ""} ${name}: ${type}`,
    description,
  };
  return output;
};

export const getSubSymbolFunction = (
  name: string,
  type: string,
  description: string
): SubSymbolType => {
  const output: SubSymbolType = {
    name: name.split("(")[0],
    kind: CompletionItemKind.Method,
    detail: `function ${name}${type !== "null" ? `: ${type}` : ""}`,
    description,
  };
  return output;
};
