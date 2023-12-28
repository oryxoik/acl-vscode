import { IdentifierToken } from "./IdentifierToken";
import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

export class FunctionDeclaration {
  readonly Type: TokenType;
  readonly Identifier: IdentifierToken;

  readonly Variables: Map<string, IdentifierToken>;
  readonly Assignments: IdentifierToken[];

  constructor(type: TokenType, id: IdentifierToken) {
    this.Type = type;
    this.Identifier = id;
    this.Variables = new Map<string, IdentifierToken>();
    this.Assignments = [];
  }

  addVariable(name: string, token: Token) {
    if (this.Variables.has(name)) {
      this.Assignments.push(new IdentifierToken(name, token));
      return;
    }
    this.Variables.set(name, new IdentifierToken(name, token));
  }
}
