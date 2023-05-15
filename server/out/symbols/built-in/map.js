"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSymbols = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
exports.mapSymbols = {
    name: "Map",
    kind: vscode_languageserver_1.CompletionItemKind.Class,
    detail: "extension Map",
    description: "Finding, creating, and destroying map objects.",
    subSymbols: [
        (0, utils_1.getSubSymbolFunction)("FindMapObjectByName(name: string)", "MapObject", "Returns the first map object matching the given name"),
        (0, utils_1.getSubSymbolFunction)("FindMapObjectsByName(name: string)", "List(MapObject)", "Returns a list of map objects matching the given name"),
        (0, utils_1.getSubSymbolFunction)("FindMapObjectByTag(tag: string)", "MapObject", "Returns the first map object that has a tag component matching the given name"),
        (0, utils_1.getSubSymbolFunction)("FindMapObjectsByTag(tag: string)", "List(MapObject)", "Returns a list of map objects matching the given tag"),
        (0, utils_1.getSubSymbolFunction)("CreateMapObjectRaw(data: string)", "MapObject", "Creates a map object given the raw data string, which corresponds to a map file CSV row"),
        (0, utils_1.getSubSymbolFunction)("DestroyMapObject(obj: MapObject)", "null", "Destroys the given map object"),
        (0, utils_1.getSubSymbolFunction)("CopyMapObject(obj: MapObject)", "MapObject", "Creates a copy of the given map object"),
    ],
};
//# sourceMappingURL=map.js.map