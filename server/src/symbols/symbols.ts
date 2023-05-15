import { CompletionItemKind } from "vscode-languageserver-types";
import { gameSymbols } from "./built-in/game";

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

export const symbols: BaseSymbolType[] = [gameSymbols];
