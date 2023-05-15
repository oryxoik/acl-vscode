import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const cutsceneSymbols: BaseSymbolType = {
  name: "Cutscene",
  kind: CompletionItemKind.Class,
  detail: "extension Cutscene",
  description: "Cutscene functions.",
  subSymbols: [
    getSubSymbolFunction(
      "Start(name: string, full: bool)",
      "null",
      "Starts cutscene with name. If full is true, will enter cinematic mode. Otherwise will only show dialogue while still allowing gameplay."
    ),
    getSubSymbolFunction(
      "SetCameraPosition(position: Vector3)",
      "null",
      "Sets camera position."
    ),
    getSubSymbolFunction(
      "SetCameraRotation(rotation: Vector3)",
      "null",
      "Sets camera rotation."
    ),
    getSubSymbolFunction(
      "SetCameraVelocity(velocity: Vector3)",
      "null",
      "Sets camera velocity."
    ),
    getSubSymbolFunction(
      "ShowDialogue(icon: string, title: string, content: string)",
      "null",
      "Show dialogue screen with given icon, title, and content. Available icons are the same as profile icon names."
    ),
    getSubSymbolFunction(
      "HideDialogue()",
      "null",
      "Hides the dialogue screen."
    ),
  ],
};
