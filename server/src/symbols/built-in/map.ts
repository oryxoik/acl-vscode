import { CompletionItemKind } from "vscode-languageserver";
import { BaseSymbolType } from "../symbols";
import { getSubSymbolFunction } from "../utils";

export const mapSymbols: BaseSymbolType = {
  name: "Map",
  kind: CompletionItemKind.Class,
  detail: "extension Map",
  description: "Finding, creating, and destroying map objects.",
  subSymbols: [
    getSubSymbolFunction(
      "FindMapObjectByName(name: string)",
      "MapObject",
      "Returns the first map object matching the given name"
    ),
    getSubSymbolFunction(
      "FindMapObjectsByName(name: string)",
      "List(MapObject)",
      "Returns a list of map objects matching the given name"
    ),
    getSubSymbolFunction(
      "FindMapObjectByTag(tag: string)",
      "MapObject",
      "Returns the first map object that has a tag component matching the given name"
    ),
    getSubSymbolFunction(
      "FindMapObjectsByTag(tag: string)",
      "List(MapObject)",
      "Returns a list of map objects matching the given tag"
    ),
    getSubSymbolFunction(
      "CreateMapObjectRaw(data: string)",
      "MapObject",
      "Creates a map object given the raw data string, which corresponds to a map file CSV row"
    ),
    getSubSymbolFunction(
      "DestroyMapObject(obj: MapObject)",
      "null",
      "Destroys the given map object"
    ),
    getSubSymbolFunction(
      "CopyMapObject(obj: MapObject)",
      "MapObject",
      "Creates a copy of the given map object"
    ),
  ],
};
