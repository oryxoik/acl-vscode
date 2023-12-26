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
    this._keywords.set("self", TokenType.Self);
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
      new Token(TokenType.Eof, this._line, this._source.length - 2, 1)
    );
    return this._tokens;
  }

  private scanToken() {
    const c = this.advance();

    switch (c) {
      case "(":
        this.addToken(TokenType.LeftParen);
        break;
      case ")":
        this.addToken(TokenType.RightParen);
        break;
      case "{":
        this.addToken(TokenType.LeftCurly);
        break;
      case "}":
        this.addToken(TokenType.RightCurly);
        break;
      case ";":
        this.addToken(TokenType.Semicolon);
        break;
      case ",":
        this.addToken(TokenType.Comma);
        break;
      case ".":
        this.addToken(TokenType.Dot);
        break;
      case "-":
        this.addToken(TokenType.Minus);
        break;
      case "+":
        this.addToken(TokenType.Plus);
        break;
      case "*":
        this.addToken(TokenType.Star);
        break;
      case "/":
        this.addToken(TokenType.Slash);
        break;
      case "!":
        this.addToken(this.match("=") ? TokenType.BangEqual : TokenType.Bang);
        break;
      case "&":
        this.addToken(
          this.match("&") ? TokenType.AmpersandAmpersand : TokenType.Ampersand
        );
        break;
      case "|":
        this.addToken(this.match("|") ? TokenType.PipePipe : TokenType.Pipe);
        break;
      case "=":
        this.addToken(this.match("=") ? TokenType.EqualEqual : TokenType.Equal);
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LessEqual : TokenType.Less);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GreaterEqual : TokenType.Greater
        );
        break;
      case "#":
        this.comment();
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

  private comment() {
    while (this.peek() != "#" && !this.isAtEnd()) {
      if (this.peek() == "\n") this._line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      console.log(`[${this._line}]: Unterminated comment.`);
      return;
    }

    // The closing #.
    this.advance();
    this.addToken(TokenType.Comment);
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

    this.addToken(tokenType);
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
    this.addToken(TokenType.String, this._current - 1 - (this._start + 1));
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

  private addToken(type: TokenType, length: number | null = null) {
    if (length === null) length = this._current - this._start;
    this._tokens.push(new Token(type, this._line, this._start, length));
  }
}
