import { IdentifierToken } from "./IdentifierToken";
import { Token } from "../lexer/Token";
import { TokenType } from "../lexer/TokenType";

export class FunctionDeclaration {
  readonly Type: TokenType;
  readonly Identifier: IdentifierToken;

  readonly Variables: Map<string, IdentifierToken>;

  constructor(type: TokenType, id: IdentifierToken) {
    this.Type = type;
    this.Identifier = id;
    this.Variables = new Map<string, IdentifierToken>();
  }

  addVariable(name: string, token: Token): boolean {
    if (this.Variables.has(name)) return false;
    this.Variables.set(name, new IdentifierToken(name, token));
    return true;
  }
}
