export class Symbols {
  symbols: Map<string, number>;
  specialSymbolNames: Set<string>;
  alphaSymbolNames: Set<string>;
  binopSymbols: Set<number>;
  classSymbols: Set<number>;
  conditionalSymbols: Set<number>;

  constructor() {
    this.symbols = new Map<string, number>();
    this.specialSymbolNames = new Set<string>();
    this.alphaSymbolNames = new Set<string>();
    this.binopSymbols = new Set<number>();
    this.classSymbols = new Set<number>();
    this.conditionalSymbols = new Set<number>();
  }

  init() {
    this.addSymbols();
    this.categorizeSymbols();
  }

  addSymbols() {
    this.symbols.set("class", Symbol.Class);
    this.symbols.set("extension", Symbol.Extension);
    this.symbols.set("component", Symbol.Component);
    this.symbols.set("cutscene", Symbol.Cutscene);
    this.symbols.set("function", Symbol.Function);
    this.symbols.set("coroutine", Symbol.Coroutine);
    this.symbols.set("wait", Symbol.Wait);
    this.symbols.set("null", Symbol.Null);
    this.symbols.set("return", Symbol.Return);
    this.symbols.set("if", Symbol.If);
    this.symbols.set("else", Symbol.Else);
    this.symbols.set("elif", Symbol.ElseIf);
    this.symbols.set("for", Symbol.For);
    this.symbols.set("while", Symbol.While);
    this.symbols.set("in", Symbol.In);
    this.symbols.set("{", Symbol.LeftCurly);
    this.symbols.set("}", Symbol.RightCurly);
    this.symbols.set("(", Symbol.LeftParen);
    this.symbols.set(")", Symbol.RightParen);
    this.symbols.set(";", Symbol.Semicolon);
    this.symbols.set('"', Symbol.DoubleQuote);
    this.symbols.set("=", Symbol.SetEquals);
    this.symbols.set(",", Symbol.Comma);
    this.symbols.set(".", Symbol.Dot);
    this.symbols.set("||", Symbol.Or);
    this.symbols.set("&&", Symbol.And);
    this.symbols.set("+", Symbol.Plus);
    this.symbols.set("-", Symbol.Minus);
    this.symbols.set("*", Symbol.Times);
    this.symbols.set("/", Symbol.Divide);
    this.symbols.set("==", Symbol.Equals);
    this.symbols.set("!=", Symbol.NotEquals);
    this.symbols.set("<", Symbol.LessThan);
    this.symbols.set(">", Symbol.GreaterThan);
    this.symbols.set("<=", Symbol.LessThanOrEquals);
    this.symbols.set(">=", Symbol.GreaterThanOrEquals);
    this.symbols.set("!", Symbol.Not);
  }

  categorizeSymbols() {
    const keywords = [
      "class",
      "component",
      "extension",
      "cutscene",
      "function",
      "coroutine",
      "wait",
      "null",
      "return",
      "if",
      "else",
      "for",
      "while",
      "elif",
      "in",
    ];
    const binopSymbols = [
      Symbol.Or,
      Symbol.And,
      Symbol.Plus,
      Symbol.Minus,
      Symbol.Times,
      Symbol.Divide,
      Symbol.Equals,
      Symbol.NotEquals,
      Symbol.LessThan,
      Symbol.GreaterThan,
      Symbol.LessThanOrEquals,
      Symbol.GreaterThanOrEquals,
    ];
    const classSymbols = [
      Symbol.Class,
      Symbol.Component,
      Symbol.Extension,
      Symbol.Cutscene,
    ];
    const conditionalSymbols = [
      Symbol.If,
      Symbol.While,
      Symbol.Else,
      Symbol.ElseIf,
    ];

    keywords.forEach((symbolName) => {
      this.alphaSymbolNames.add(symbolName);
    });
    this.symbols.forEach((value, symbolName) => {
      if (!this.alphaSymbolNames.has(symbolName))
        this.specialSymbolNames.add(symbolName);
    });
    binopSymbols.forEach((symbol) => {
      this.binopSymbols.add(<number>symbol);
    });
    classSymbols.forEach((symbol) => {
      this.classSymbols.add(<number>symbol);
    });
    conditionalSymbols.forEach((symbol) => {
      this.conditionalSymbols.add(<number>symbol);
    });
  }
}
export enum Symbol {
  Component,
  Class,
  Extension,
  Cutscene,
  Function,
  Coroutine,
  Wait,
  Null,
  LeftCurly,
  RightCurly,
  LeftParen,
  RightParen,
  Return,
  Not,
  SetEquals,
  And,
  Or,
  LessThan,
  GreaterThan,
  LessThanOrEquals,
  GreaterThanOrEquals,
  Equals,
  NotEquals,
  Plus,
  Minus,
  Times,
  Divide,
  Semicolon,
  DoubleQuote,
  Comma,
  Dot,
  If,
  Else,
  ElseIf,
  While,
  For,
  In,
}
