import { CompletionItemKind } from "vscode-languageserver";
import { gameSymbols } from "./built-in/game";
import { networkSymbols } from "./built-in/network";
import { mapSymbols } from "./built-in/map";
import { uiSymbols } from "./built-in/ui";
import { timeSymbols } from "./built-in/time";
import { convertSymbols } from "./built-in/convert";
import { stringSymbols } from "./built-in/string";
import { inputSymbols } from "./built-in/input";
import { mathSymbols } from "./built-in/math";
import { randomSymbols } from "./built-in/random";
import { cutsceneSymbols } from "./built-in/cutscene";
import { vector3Symbols } from "./built-in/vector3";
import { colorSymbols } from "./built-in/color";

export type SubSymbolType = {
  name: string;
  kind: CompletionItemKind;
  detail: string;
  description: string;
};

export type BaseSymbolType = {
  name: string;
  kind: CompletionItemKind;
  detail: string;
  description: string;
  subSymbols: SubSymbolType[];
};

export const symbols: BaseSymbolType[] = [
  gameSymbols,
  mapSymbols,
  networkSymbols,
  uiSymbols,
  timeSymbols,
  convertSymbols,
  stringSymbols,
  inputSymbols,
  mathSymbols,
  randomSymbols,
  cutsceneSymbols,
  vector3Symbols,
  colorSymbols,
];
