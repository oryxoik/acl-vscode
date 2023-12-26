import { TokenType } from "./TokenType";

export class Token {
  public readonly type: TokenType;
  public readonly lexeme: string;
  public readonly literal: any;
  public readonly line: number;
  public readonly startIndex: number;
  public readonly length: number;

  constructor(
    type: TokenType,
    lexeme: string,
    literal: any,
    line: number,
    startIndex: number,
    length: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.startIndex = startIndex;
    this.length = length;
  }

  toString(): string {
    const tokenType = TokenType[this.type];
    return `[${this.line}] ${this.startIndex}:${this.length} ${tokenType} ${this.lexeme} ${this.literal}`;
  }
}
