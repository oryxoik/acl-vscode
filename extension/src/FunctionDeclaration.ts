import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

export class FunctionDeclaration {
  readonly Type: TokenType;
  readonly FunctionName: string;
  readonly FunctionNameToken: Token;

  readonly Variables: Set<string>;

  constructor(type: TokenType, name: string, nameToken: Token) {
    this.Type = type;
    this.FunctionName = name;
    this.FunctionNameToken = nameToken;
    this.Variables = new Set<string>();
  }

  addVariable(name: string) {
    if (this.Variables.has(name)) return;
    this.Variables.add(name);
  }
}
