"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.timeSymbols = {
    name: "Time",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Time",
    description: "Time functions",
    subSymbols: [
        (0, utils_1.getSubSymbolField)("TickTime", "float", true, "Time between each tick (0.02 seconds)"),
        (0, utils_1.getSubSymbolField)("GameTime", "float", true, "Time since start of the round."),
        (0, utils_1.getSubSymbolField)("FrameTime", "float", true, "Time between each frame."),
    ],
};
//# sourceMappingURL=time.js.map