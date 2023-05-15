import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const uiSymbols: BaseSymbolType = {
  name: "UI",
  kind: CompletionItemKind.Class,
  detail: "extension UI",
  description: "UI label functions.",
  subSymbols: [
    getSubSymbolFunction(
      "SetLabel(type: string, label: string)",
      "null",
      'Sets the label at a certain location. Valid types: "TopCenter", "TopLeft", "TopRight", "MiddleCenter", "BottomLeft", "BottomRight".'
    ),
    getSubSymbolFunction(
      "SetLabelForTime(type: string, label: string, time: float)",
      "null",
      "Sets the label for a certain time, after which it will be cleared."
    ),
    getSubSymbolFunction(
      "SetLabelAll(type: string, label: string)",
      "null",
      "Sets the label for all players. Master client only. Be careful not to call this often."
    ),
    getSubSymbolFunction(
      "SetLabelForTimeAll(type: string, label: string, time: float)",
      "null",
      "Sets the label for all players for a certain time. Master client only."
    ),
  ],
};
