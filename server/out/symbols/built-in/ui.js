"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.uiSymbols = {
    name: "UI",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension UI",
    description: "UI label functions.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("SetLabel(type: string, label: string)", "null", 'Sets the label at a certain location. Valid types: "TopCenter", "TopLeft", "TopRight", "MiddleCenter", "BottomLeft", "BottomRight".'),
        (0, utils_1.getSubSymbolFunction)("SetLabelForTime(type: string, label: string, time: float)", "null", "Sets the label for a certain time, after which it will be cleared."),
        (0, utils_1.getSubSymbolFunction)("SetLabelAll(type: string, label: string)", "null", "Sets the label for all players. Master client only. Be careful not to call this often."),
        (0, utils_1.getSubSymbolFunction)("SetLabelForTimeAll(type: string, label: string, time: float)", "null", "Sets the label for all players for a certain time. Master client only."),
    ],
};
//# sourceMappingURL=ui.js.map