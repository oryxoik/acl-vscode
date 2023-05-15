import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolField, getSubSymbolFunction } from "../utils";

export const networkSymbols: BaseSymbolType = {
  name: "Network",
  kind: CompletionItemKind.Class,
  detail: "extension Network",
  description: "Networking functions.",
  subSymbols: [
    getSubSymbolField(
      "IsMasterClient",
      "bool",
      true,
      "Is current player the master client."
    ),
    getSubSymbolField(
      "Players",
      "List(Player)",
      true,
      "List of all players in the room."
    ),
    getSubSymbolField(
      "MasterClient",
      "Player",
      true,
      "The current master client."
    ),
    getSubSymbolField("MyPlayer", "Player", true, "My player."),
    getSubSymbolFunction(
      "SendMesssage(target: Player, message: string)",
      "null",
      "Send a network message to the target player. This will be received in the OnNetworkMessage callback in Main."
    ),
    getSubSymbolFunction(
      "SendMessageAll(message: string)",
      "null",
      "Send a network message to all players including yourself."
    ),
    getSubSymbolFunction(
      "SendMessageOthers(message: string)",
      "null",
      "Send a network message to all players excluding yourself."
    ),
  ],
};
