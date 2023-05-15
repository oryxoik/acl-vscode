"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutsceneSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.cutsceneSymbols = {
    name: "Cutscene",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Cutscene",
    description: "Cutscene functions.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("Start(name: string, full: bool)", "null", "Starts cutscene with name. If full is true, will enter cinematic mode. Otherwise will only show dialogue while still allowing gameplay."),
        (0, utils_1.getSubSymbolFunction)("SetCameraPosition(position: Vector3)", "null", "Sets camera position."),
        (0, utils_1.getSubSymbolFunction)("SetCameraRotation(rotation: Vector3)", "null", "Sets camera rotation."),
        (0, utils_1.getSubSymbolFunction)("SetCameraVelocity(velocity: Vector3)", "null", "Sets camera velocity."),
        (0, utils_1.getSubSymbolFunction)("ShowDialogue(icon: string, title: string, content: string)", "null", "Show dialogue screen with given icon, title, and content. Available icons are the same as profile icon names."),
        (0, utils_1.getSubSymbolFunction)("HideDialogue()", "null", "Hides the dialogue screen."),
    ],
};
//# sourceMappingURL=cutscene.js.map