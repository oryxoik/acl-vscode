"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.networkSymbols = {
    name: "Network",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Network",
    description: "Networking functions.",
    subSymbols: [
        (0, utils_1.getSubSymbolField)("IsMasterClient", "bool", true, "Is current player the master client."),
        (0, utils_1.getSubSymbolField)("Players", "List(Player)", true, "List of all players in the room."),
        (0, utils_1.getSubSymbolField)("MasterClient", "Player", true, "The current master client."),
        (0, utils_1.getSubSymbolField)("MyPlayer", "Player", true, "My player."),
        (0, utils_1.getSubSymbolFunction)("SendMesssage(target: Player, message: string)", "null", "Send a network message to the target player. This will be received in the OnNetworkMessage callback in Main."),
        (0, utils_1.getSubSymbolFunction)("SendMessageAll(message: string)", "null", "Send a network message to all players including yourself."),
        (0, utils_1.getSubSymbolFunction)("SendMessageOthers(message: string)", "null", "Send a network message to all players excluding yourself."),
    ],
};
//# sourceMappingURL=network.js.map