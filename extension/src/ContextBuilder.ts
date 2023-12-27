import { FunctionDeclaration } from "./FunctionDeclaration";
import { TypeDeclaration } from "./TypeDeclaration";
import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

export class ContextBuilder {
  private readonly _source: string;
  private readonly _tokens: Token[];

  constructor(source: string, tokens: Token[]) {
    this._source = source;
    this._tokens = tokens;
  }

  build(): TypeDeclaration[] {
    const types: TypeDeclaration[] = [];
    let currentType: TypeDeclaration | null = null;
    let currentFunction: FunctionDeclaration | null = null;
    let scopeDepth: number = 0;

    for (let i = 0; i < this._tokens.length; i++) {
      const currentToken = this._tokens[i];
      if (
        (currentToken.type === TokenType.Class ||
          currentToken.type === TokenType.Component ||
          currentToken.type === TokenType.Extension ||
          currentToken.type === TokenType.Cutscene) &&
        this.match(i, 1, TokenType.Identifier)
      ) {
        const idToken = this._tokens[i + 1];
        currentType = new TypeDeclaration(
          currentToken.type,
          this.getLexeme(idToken),
          idToken
        );
        types.push(currentType);
      }

      if (
        currentToken.type === TokenType.Function &&
        this.match(i, 1, TokenType.Identifier)
      ) {
        const idToken = this._tokens[i + 1];
        currentFunction = new FunctionDeclaration(
          currentToken.type,
          this.getLexeme(idToken),
          idToken
        );
        if (
          i + 2 < this._tokens.length &&
          this._tokens[i + 2].type === TokenType.LeftParen
        ) {
          let next = i + 3;
          while (
            next < this._tokens.length &&
            this._tokens[next].type === TokenType.Identifier
          ) {
            currentFunction.addVariable(this.getLexeme(this._tokens[next]));
            next += 2;
          }
        }
        if (currentType !== null) currentType.Functions.add(currentFunction);
      }

      if (currentToken.type === TokenType.LeftCurly) {
        scopeDepth++;
      } else if (currentToken.type === TokenType.RightCurly) {
        scopeDepth--;
        if (scopeDepth == 0) {
          currentType = null;
          currentFunction = null;
        }
      }
    }
    return types;
  }

  private getLexeme(token: Token): string {
    return this._source.substring(token.startIndex, token.endIndex);
  }

  private match(
    i: number,
    offset: number,
    ...tokenTypes: TokenType[]
  ): boolean {
    if (i + offset >= this._tokens.length) return false;
    for (let index = 0; index < tokenTypes.length; index++) {
      const element = tokenTypes[index];
      if (this._tokens[i + offset].type === element) return true;
    }
    return false;
  }
}
