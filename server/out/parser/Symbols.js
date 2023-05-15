"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = exports.Symbols = void 0;
class Symbols {
    constructor() {
        this.symbols = new Map();
        this.specialSymbolNames = new Set();
        this.alphaSymbolNames = new Set();
        this.binopSymbols = new Set();
        this.classSymbols = new Set();
        this.conditionalSymbols = new Set();
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
            this.binopSymbols.add(symbol);
        });
        classSymbols.forEach((symbol) => {
            this.classSymbols.add(symbol);
        });
        conditionalSymbols.forEach((symbol) => {
            this.conditionalSymbols.add(symbol);
        });
    }
}
exports.Symbols = Symbols;
var Symbol;
(function (Symbol) {
    Symbol[Symbol["Component"] = 0] = "Component";
    Symbol[Symbol["Class"] = 1] = "Class";
    Symbol[Symbol["Extension"] = 2] = "Extension";
    Symbol[Symbol["Cutscene"] = 3] = "Cutscene";
    Symbol[Symbol["Function"] = 4] = "Function";
    Symbol[Symbol["Coroutine"] = 5] = "Coroutine";
    Symbol[Symbol["Wait"] = 6] = "Wait";
    Symbol[Symbol["Null"] = 7] = "Null";
    Symbol[Symbol["LeftCurly"] = 8] = "LeftCurly";
    Symbol[Symbol["RightCurly"] = 9] = "RightCurly";
    Symbol[Symbol["LeftParen"] = 10] = "LeftParen";
    Symbol[Symbol["RightParen"] = 11] = "RightParen";
    Symbol[Symbol["Return"] = 12] = "Return";
    Symbol[Symbol["Not"] = 13] = "Not";
    Symbol[Symbol["SetEquals"] = 14] = "SetEquals";
    Symbol[Symbol["And"] = 15] = "And";
    Symbol[Symbol["Or"] = 16] = "Or";
    Symbol[Symbol["LessThan"] = 17] = "LessThan";
    Symbol[Symbol["GreaterThan"] = 18] = "GreaterThan";
    Symbol[Symbol["LessThanOrEquals"] = 19] = "LessThanOrEquals";
    Symbol[Symbol["GreaterThanOrEquals"] = 20] = "GreaterThanOrEquals";
    Symbol[Symbol["Equals"] = 21] = "Equals";
    Symbol[Symbol["NotEquals"] = 22] = "NotEquals";
    Symbol[Symbol["Plus"] = 23] = "Plus";
    Symbol[Symbol["Minus"] = 24] = "Minus";
    Symbol[Symbol["Times"] = 25] = "Times";
    Symbol[Symbol["Divide"] = 26] = "Divide";
    Symbol[Symbol["Semicolon"] = 27] = "Semicolon";
    Symbol[Symbol["DoubleQuote"] = 28] = "DoubleQuote";
    Symbol[Symbol["Comma"] = 29] = "Comma";
    Symbol[Symbol["Dot"] = 30] = "Dot";
    Symbol[Symbol["If"] = 31] = "If";
    Symbol[Symbol["Else"] = 32] = "Else";
    Symbol[Symbol["ElseIf"] = 33] = "ElseIf";
    Symbol[Symbol["While"] = 34] = "While";
    Symbol[Symbol["For"] = 35] = "For";
    Symbol[Symbol["In"] = 36] = "In";
})(Symbol = exports.Symbol || (exports.Symbol = {}));
//# sourceMappingURL=Symbols.js.map