"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.inputSymbols = {
    name: "Input",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Input",
    description: "Reading player key inputs. Note that inputs are best handled in OnFrame rather than OnTick, due to being updated every frame and not every physics tick.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("GetKeyName(key: string)", "string", 'Gets the key name the player assigned to the key setting. Example: GetKeyName("General/Forward") will return the keybind at that setting.'),
        (0, utils_1.getSubSymbolFunction)("GetKeyHold(key: string)", "bool", 'Whether or not the key is being held down. Example: GetKey("Human/HookLeft")'),
        (0, utils_1.getSubSymbolFunction)("GetKeyDown(key: string)", "bool", "Whether or not the key is first pressed this frame."),
        (0, utils_1.getSubSymbolFunction)("GetKeyUp(key: string)", "bool", "Whether or not the key is first released this frame."),
        (0, utils_1.getSubSymbolFunction)("GetMouseAim()", "Vector3", "Gets a Vector3 that represents the direction the mouse pointer is aiming at."),
    ],
};
//# sourceMappingURL=input.js.map