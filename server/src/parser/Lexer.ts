import { isDigit, isLetter, isLetterOrDigit } from "./utils/utils";
import { Symbols } from "./Symbols";
import { Token, TokenType } from "./Token";

export class Lexer {
  private _source: string;
  private _tokens: Token[];
  private _lineOffset: number;

  private _symbols: Symbols;

  constructor(source: string, lineOffset: number, symbols: Symbols) {
    this._source = source;
    this._lineOffset = lineOffset;
    this._tokens = [];
    this._symbols = symbols;
  }

  getTokens(): Token[] {
    this._tokens.length = 0;
    const sourceArr = this._source.split("\n");
    let chars: string[] = [];
    let lines: number[] = [];
    for (let i = 0; i < sourceArr.length; i++) {
      const line = sourceArr[i];
      for (let j = 0; j < line.length; j++) {
        chars.push(line[j]);
        lines.push(i);
      }
    }

    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      let line = lines[i];
      try {
        let twoCharToken = c;
        if (i < chars.length - 1) twoCharToken += chars[i + 1];
        if (isLetter(c) || c === "_") {
          let boolStr = this._scanBool(i, chars);
          if (boolStr !== "") {
            this._addToken(
              TokenType.Primitive,
              boolStr,
              sourceArr[line].indexOf(c),
              boolStr.length,
              line
            );
            i += boolStr.length - 1;
          } else {
            let alphaSymbol = this._scanAlphaSymbol(i, chars);
            if (alphaSymbol !== "") {
              if (alphaSymbol === "null")
                this._addToken(
                  TokenType.Primitive,
                  alphaSymbol,
                  sourceArr[line].indexOf(c),
                  alphaSymbol.length,
                  line
                );
              else
                this._addToken(
                  TokenType.Symbol,
                  alphaSymbol,
                  sourceArr[line].indexOf(c),
                  alphaSymbol.length,
                  line
                );
              i += alphaSymbol.length - 1;
            } else {
              let name = this._scanName(i, chars);
              this._addToken(
                TokenType.Name,
                name,
                sourceArr[line].indexOf(c),
                name.length,
                line
              );
              i += name.length - 1;
            }
          }
        } else if (
          isDigit(c) ||
          (c === "-" && i < chars.length - 1 && isDigit(chars[i + 1]))
        ) {
          let numberStr = this._scanNumber(i, chars);
          if (numberStr.includes("."))
            this._addToken(
              TokenType.Primitive,
              numberStr,
              sourceArr[line].indexOf(c),
              numberStr.length,
              line
            );
          else
            this._addToken(
              TokenType.Primitive,
              numberStr,
              sourceArr[line].indexOf(c),
              numberStr.length,
              line
            );
          i += numberStr.length - 1;
        } else if (c === '"') {
          let strLiteral = this._scanStringLiteral(i, chars);
          this._addToken(
            TokenType.Primitive,
            strLiteral,
            sourceArr[line].indexOf(c),
            strLiteral.length + 1,
            line
          );
          i += strLiteral.length + 1;
        } else if (this._symbols.specialSymbolNames.has(twoCharToken)) {
          this._addToken(
            TokenType.Symbol,
            twoCharToken,
            sourceArr[line].indexOf(c),
            1,
            line
          );
          i += 1;
        } else if (this._symbols.specialSymbolNames.has(c)) {
          this._addToken(
            TokenType.Symbol,
            c,
            sourceArr[line].indexOf(c),
            0,
            line
          );
        }
      } catch (error) {
        line = line + 1 + this._lineOffset;
        return [];
      }
    }

    return this._tokens;
  }

  private _addToken(
    type: TokenType,
    value: string,
    startIndex: number,
    length: number,
    line: number
  ) {
    // const lineStartIndex = this._source.lastIndexOf("\n", startIndex) + 1;
    // const tokenStartIndex = lineStartIndex + startIndex - line;
    this._tokens.push(
      new Token(type, line - this._lineOffset, value, startIndex, length)
    );
  }

  private _scanAlphaSymbol(startIndex: number, chars: string[]): string {
    let currentLexeme: string = "";
    for (let i = startIndex; i < chars.length; i++) {
      if (!isLetter(chars[i]) && chars[i] !== "_") {
        if (this._symbols.alphaSymbolNames.has(currentLexeme))
          return currentLexeme;
        return "";
      }
      currentLexeme += chars[i];
    }

    return "";
  }

  private _scanBool(startIndex: number, chars: string[]): string {
    let currentLexeme: string = "";
    for (let i = startIndex; i < chars.length; i++) {
      if (!isLetter(chars[i])) {
        if (currentLexeme === "true" || currentLexeme === "false")
          return currentLexeme;
        return "";
      }
      currentLexeme += chars[i];
    }

    return "";
  }

  private _scanNumber(startIndex: number, chars: string[]): string {
    let currentLexeme: string = "";
    for (let i = startIndex; i < chars.length; i++) {
      if (
        !isDigit(chars[i]) &&
        chars[i] !== "." &&
        !(i === startIndex && chars[i] === "-")
      ) {
        return currentLexeme;
      }
      currentLexeme += chars[i];
    }

    return currentLexeme;
  }

  private _scanName(startIndex: number, chars: string[]): string {
    let currentLexeme: string = "";
    for (let i = startIndex; i < chars.length; i++) {
      if (!isLetterOrDigit(chars[i]) && chars[i] !== "_") {
        return currentLexeme;
      }
      currentLexeme += chars[i];
    }

    return currentLexeme;
  }

  private _scanStringLiteral(startIndex: number, chars: string[]): string {
    let currentLexeme: string = "";
    for (let i = startIndex + 1; i < chars.length; i++) {
      if (chars[i] === '"') {
        return currentLexeme;
      }
      currentLexeme += chars[i];
    }

    console.log("Unclosed string literal");

    return "";

    // throw new Error("Unclosed string literal");
  }
}
