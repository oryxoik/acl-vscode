import { FunctionDeclaration } from "./FunctionDeclaration";
import { Token } from "./parser/Token";
import { TokenType } from "./parser/TokenType";

export class TypeDeclaration {
  readonly Type: TokenType;
  readonly TypeName: string;
  readonly TypeNameToken: Token;

  readonly Variables: Set<string>;
  readonly Functions: Set<FunctionDeclaration>;

  constructor(type: TokenType, typeName: string, typeNameToken: Token) {
    this.Type = type;
    this.TypeName = typeName;
    this.TypeNameToken = typeNameToken;
    this.Variables = new Set<string>();
    this.Functions = new Set<FunctionDeclaration>();
  }

  addVariable(name: string) {
    if (this.Variables.has(name)) return;
    this.Variables.add(name);
  }
}
