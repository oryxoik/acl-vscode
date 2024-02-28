import { Token, createToken } from "./token";
import { TokenType } from "./TokenType";
import keywords from "./keywords";

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  var start = 0;
  var current = 0;
  var line = 0;

  while (!isAtEnd()) {
    start = current;
    scanToken();
  }
  tokens.push(createToken(TokenType.Eof, "", line, source.length - 2, 1));

  return tokens;

  function scanToken(): void {
    const c = advance();
    switch (c) {
      case "(":
        addSingleCharToken(TokenType.LeftParen, "(");
        break;
      case ")":
        addSingleCharToken(TokenType.RightParen, ")");
        break;
      case "{":
        addSingleCharToken(TokenType.LeftCurly, "{");
        break;
      case "}":
        addSingleCharToken(TokenType.RightCurly, "}");
        break;
      case ";":
        addSingleCharToken(TokenType.Semicolon, ";");
        break;
      case ",":
        addSingleCharToken(TokenType.Comma, ",");
        break;
      case ".":
        addSingleCharToken(TokenType.Dot, ".");
        break;
      case "-":
        addSingleCharToken(TokenType.Minus, "-");
        break;
      case "+":
        addSingleCharToken(TokenType.Plus, "+");
        break;
      case "*":
        addSingleCharToken(TokenType.Star, "*");
        break;
      case "/":
        if (peek() == "*") {
          blockComment();
        } else addSingleCharToken(TokenType.Slash, "/");
        break;
      case "!":
        addToken(match("=") ? TokenType.BangEqual : TokenType.Bang);
        break;
      case "&":
        addToken(
          match("&") ? TokenType.AmpersandAmpersand : TokenType.Ampersand
        );
        break;
      case "|":
        addToken(match("|") ? TokenType.PipePipe : TokenType.Pipe);
        break;
      case "=":
        addToken(match("=") ? TokenType.EqualEqual : TokenType.Equal);
        break;
      case "<":
        addToken(match("=") ? TokenType.LessEqual : TokenType.Less);
        break;
      case ">":
        addToken(match("=") ? TokenType.GreaterEqual : TokenType.Greater);
        break;
      case "#":
        comment();
        break;
      case " ":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;
      case "\n":
        line++;
        break;
      case '"':
        string();
        break;
      default: {
        if (isDigit(c)) number();
        else if (isAlpha(c)) identifier();
        else console.log(`[${line}]: Unexpected character ${c}.`);
        break;
      }
    }
  }
  function comment(): void {
    while (peek() !== "\n" && !isAtEnd()) {
      advance();
    }
  }
  function blockComment(): void {
    while (!isAtEnd()) {
      if (peek() === "\n") line++;
      if (peek() === "*" && peekNext() === "/") {
        advance();
        advance();
        break;
      }
      advance();
    }
    if (isAtEnd()) console.log(`${line} unclosed block comment`);
  }
  function identifier(): void {
    while (isAlphaNumeric(peek())) {
      advance();
    }
    const text = source.substring(start, current);

    var type: TokenType = keywords.has(text)
      ? keywords.get(text) ?? TokenType.Identifier
      : TokenType.Identifier;

    addToken(type);
  }
  function number(): void {
    while (isDigit(peek())) advance();
    if (peek() === "." && isDigit(peekNext())) {
      // Consume '.'
      advance();
      while (isDigit(peek())) advance();
    }
    addToken(TokenType.Number);
  }
  function string(): void {
    while (peek() !== '"' && !isAtEnd()) {
      if (peek() === "\n") line++;
      advance();
    }
    // Unterminated string.
    if (isAtEnd()) {
      console.log(`[${line}]: Unterminated string.`);
      return;
    }
    // The closing ".
    advance();
    // Trim the surrounding quotes.
    addToken(TokenType.String, current - 1 - (start + 1));
  }
  function match(expectedChar: string): boolean {
    if (isAtEnd()) return false;
    if (source[current] !== expectedChar) return false;
    current++;
    return true;
  }
  function advance(): string {
    current++;
    return source[current - 1];
  }
  function peek(): string {
    if (isAtEnd()) return "\0";
    return source[current];
  }
  function peekNext(): string {
    if (current + 1 >= source.length) return "\0";
    return source[current + 1];
  }
  function isAtEnd(): boolean {
    return current >= source.length;
  }
  function addSingleCharToken(type: TokenType, char: string): void {
    tokens.push(createToken(type, char, line, start, 1));
  }
  function addToken(type: TokenType, length: number | null = null): void {
    length ??= current - start;
    tokens.push(
      createToken(type, source.substring(start, current), line, start, length)
    );
  }
}

function isAlphaNumeric(c: string): boolean {
  return isAlpha(c) || isDigit(c);
}
function isAlpha(c: string): boolean {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_";
}
function isDigit(c: string): boolean {
  return c >= "0" && c <= "9";
}

export default tokenize;
