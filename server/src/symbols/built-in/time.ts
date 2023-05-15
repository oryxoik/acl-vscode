import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolField } from "../utils";

export const timeSymbols: BaseSymbolType = {
  name: "Time",
  kind: CompletionItemKind.Class,
  detail: "extension Time",
  description: "Time functions",
  subSymbols: [
    getSubSymbolField(
      "TickTime",
      "float",
      true,
      "Time between each tick (0.02 seconds)"
    ),
    getSubSymbolField(
      "GameTime",
      "float",
      true,
      "Time since start of the round."
    ),
    getSubSymbolField("FrameTime", "float", true, "Time between each frame."),
  ],
};
