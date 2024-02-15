import { TokenType } from "./TokenType";

interface Token {
  type: TokenType;
  lexeme: string;
  line: number;
  startIndex: number;
  length: number;
}

function createToken(
  type: TokenType,
  lexeme: string,
  line: number,
  startIndex: number,
  length: number
): Token {
  return {
    type,
    lexeme,
    line,
    startIndex,
    length,
  };
}

function tokenToString(token: Token) {
  const tokenType = TokenType[token.type];
  return `[${token.line}] ${token.startIndex}:${token.length} ${tokenType}`;
}

export { Token, createToken, tokenToString };
