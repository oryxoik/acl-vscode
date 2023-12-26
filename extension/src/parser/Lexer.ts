import { Token } from "./Token";
import { TokenType } from "./TokenType";

export default class Lexer {
  private readonly _source: string;
  private readonly _tokens: Token[];
  private readonly _keywords: Map<string, TokenType>;

  private _start: number = 0;
  private _current: number = 0;
  private _line: number = 0;

  constructor(source: string) {
    this._source = source;
    this._tokens = [];
    this._keywords = new Map();
    this._keywords.set("class", TokenType.Class);
    this._keywords.set("cutscene", TokenType.Cutscene);
    this._keywords.set("component", TokenType.Component);
    this._keywords.set("extension", TokenType.Extension);
    this._keywords.set("function", TokenType.Function);
    this._keywords.set("coroutine", TokenType.Coroutine);
    this._keywords.set("wait", TokenType.Wait);
    this._keywords.set("null", TokenType.Null);
    this._keywords.set("return", TokenType.Return);
    this._keywords.set("if", TokenType.If);
    this._keywords.set("else", TokenType.Else);
    this._keywords.set("elif", TokenType.ElseIf);
    this._keywords.set("for", TokenType.For);
    this._keywords.set("while", TokenType.While);
    this._keywords.set("in", TokenType.In);
    this._keywords.set("true", TokenType.True);
    this._keywords.set("false", TokenType.False);
  }

  Scan(): Token[] {
    while (!this.isAtEnd()) {
      this._start = this._current;
      this.scanToken();
    }
    this._tokens.push(
      new Token(TokenType.Eof, "", null, this._line, this._source.length - 2, 1)
    );
    return this._tokens;
  }

  private scanToken() {
    const c = this.advance();

    switch (c) {
      case "(":
        this.addEmptyToken(TokenType.LeftParen);
        break;
      case ")":
        this.addEmptyToken(TokenType.RightParen);
        break;
      case "{":
        this.addEmptyToken(TokenType.LeftCurly);
        break;
      case "}":
        this.addEmptyToken(TokenType.RightCurly);
        break;
      case ";":
        this.addEmptyToken(TokenType.Semicolon);
        break;
      case ",":
        this.addEmptyToken(TokenType.Comma);
        break;
      case ".":
        this.addEmptyToken(TokenType.Dot);
        break;
      case "-":
        this.addEmptyToken(TokenType.Minus);
        break;
      case "+":
        this.addEmptyToken(TokenType.Plus);
        break;
      case "*":
        this.addEmptyToken(TokenType.Star);
        break;
      case "#":
        this.addEmptyToken(TokenType.Hashtag);
        break;
      case "!":
        this.addEmptyToken(
          this.match("=") ? TokenType.BangEqual : TokenType.Bang
        );
        break;
        case "&":
          this.addEmptyToken(this.match("&") ? TokenType.AmpersandAmpersand : TokenType.Ampersand);
          break;
          case "|":
          this.addEmptyToken(this.match("|") ? TokenType.PipePipe : TokenType.Pipe);
          break;
      case "=":
        this.addEmptyToken(
          this.match("=") ? TokenType.EqualEqual : TokenType.Equal
        );
        break;
      case "<":
        this.addEmptyToken(
          this.match("=") ? TokenType.LessEqual : TokenType.Less
        );
        break;
      case ">":
        this.addEmptyToken(
          this.match("=") ? TokenType.GreaterEqual : TokenType.Greater
        );
        break;
      case "/":
        if (this.match("/")) {
          // A comment goes until the end of the line.
          while (this.peek() != "\n" && !this.isAtEnd()) this.advance();
          this.addEmptyToken(TokenType.Comment);
        } else {
          this.addEmptyToken(TokenType.Slash);
        }
        break;

      case " ":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;

      case "\n":
        this._line++;
        break;

      case '"':
        this.string();
        break;

      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          console.log(`[${this._line}]: Unexpected character ${c}.`);
        }
        break;
    }
  }

  private identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    let tokenType: TokenType | undefined;
    const text = this._source.substring(this._start, this._current);
    if (this._keywords.has(text)) {
      tokenType = this._keywords.get(text);
    }

    if (tokenType === undefined) {
      tokenType = TokenType.Identifier;
    }

    this.addEmptyToken(tokenType);
  }

  private number() {
    while (this.isDigit(this.peek())) this.advance();

    if (this.peek() == "." && this.isDigit(this.peekNext())) {
      //consume '.'
      this.advance();
      while (this.isDigit(this.peek())) this.advance();
    }

    this.addToken(
      TokenType.Number,
      Number.parseFloat(this._source.substring(this._start, this._current))
    );
  }

  private string() {
    while (this.peek() != '"' && !this.isAtEnd()) {
      if (this.peek() == "\n") this._line++;
      this.advance();
    }

    // Unterminated string.
    if (this.isAtEnd()) {
      console.log(`[${this._line}]: Unterminated string.`);
      return;
    }

    // The closing ".
    this.advance();

    // Trim the surrounding quotes.
    const value = this._source.substring(this._start + 1, this._current - 1);

    this.addToken(TokenType.String, value);
  }

  private match(expectedChar: string): boolean {
    if (this.isAtEnd()) return false;
    if (this._source.charAt(this._current) !== expectedChar) return false;

    this._current++;
    return true;
  }

  private advance(): string {
    this._current++;
    return this._source.charAt(this._current - 1);
  }

  private peek(): string {
    if (this.isAtEnd()) return "\0";
    return this._source.charAt(this._current);
  }

  private peekNext(): string {
    if (this._current + 1 >= this._source.length) return "\0";
    return this._source.charAt(this._current + 1);
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  isAlpha(char: string): boolean {
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      char == "_"
    );
  }

  isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  private isAtEnd(): boolean {
    return this._current >= this._source.length;
  }

  private addEmptyToken(type: TokenType) {
    this.addToken(type, null);
  }

  private addToken(type: TokenType, literal: any) {
    const text = this._source.substring(this._start, this._current);
    const length = this._current - this._start;
    this._tokens.push(
      new Token(type, text, literal, this._line, this._start, length)
    );
  }
}
