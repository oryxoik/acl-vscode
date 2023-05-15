import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const inputSymbols: BaseSymbolType = {
  name: "Input",
  kind: CompletionItemKind.Class,
  detail: "extension Input",
  description:
    "Reading player key inputs. Note that inputs are best handled in OnFrame rather than OnTick, due to being updated every frame and not every physics tick.",
  subSymbols: [
    getSubSymbolFunction(
      "GetKeyName(key: string)",
      "string",
      'Gets the key name the player assigned to the key setting. Example: GetKeyName("General/Forward") will return the keybind at that setting.'
    ),
    getSubSymbolFunction(
      "GetKeyHold(key: string)",
      "bool",
      'Whether or not the key is being held down. Example: GetKey("Human/HookLeft")'
    ),
    getSubSymbolFunction(
      "GetKeyDown(key: string)",
      "bool",
      "Whether or not the key is first pressed this frame."
    ),
    getSubSymbolFunction(
      "GetKeyUp(key: string)",
      "bool",
      "Whether or not the key is first released this frame."
    ),
    getSubSymbolFunction(
      "GetMouseAim()",
      "Vector3",
      "Gets a Vector3 that represents the direction the mouse pointer is aiming at."
    ),
  ],
};
