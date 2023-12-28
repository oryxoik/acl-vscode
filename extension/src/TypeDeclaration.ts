import { FunctionDeclaration } from "./FunctionDeclaration";
import { IdentifierToken } from "./IdentifierToken";
import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

export class TypeDeclaration {
  readonly Type: TokenType;
  readonly Identifier: IdentifierToken;

  readonly Variables: Map<string, IdentifierToken>;
  readonly Functions: Map<string, FunctionDeclaration>;

  constructor(type: TokenType, id: IdentifierToken) {
    this.Type = type;
    this.Identifier = id;
    this.Variables = new Map<string, IdentifierToken>();
    this.Functions = new Map<string, FunctionDeclaration>();
  }

  addVariable(name: string, token: Token) {
    if (this.Variables.has(name)) return;
    this.Variables.set(name, new IdentifierToken(name, token));
  }

  addFunction(name: string, func: FunctionDeclaration) {
    if (this.Functions.has(name)) return;
    this.Functions.set(name, func);
  }
}
