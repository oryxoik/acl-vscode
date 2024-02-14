import { TokenType } from "./TokenType";

export class Token {
  public readonly type: TokenType;
  public readonly line: number;
  public readonly startIndex: number;
  public readonly endIndex: number;
  public readonly length: number;
  public readonly lexeme: string;

  constructor(
    type: TokenType,
    lexeme: string,
    line: number,
    startIndex: number,
    length: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.line = line;
    this.startIndex = startIndex;
    this.length = length;
    this.endIndex = startIndex + length;
  }

  toString(): string {
    const tokenType = TokenType[this.type];
    return `[${this.line}] ${this.startIndex}:${this.length} ${tokenType}`;
  }
}
