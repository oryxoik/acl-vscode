export enum TokenType {
  Symbol,
  Primitive,
  Name,
}

export class Token {
  tokenType: TokenType;
  value: string;
  startIndex: number;
  length: number;
  line: number;

  constructor(
    tokenType: TokenType,
    line: number,
    value: string,
    startIndex: number,
    length: number
  ) {
    this.tokenType = tokenType;
    this.line = line;
    this.value = value;
    this.startIndex = startIndex;
    this.length = length;
  }
}
