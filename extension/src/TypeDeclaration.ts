import { FunctionDeclaration } from "./FunctionDeclaration";
import { IdentifierToken } from "./IdentifierToken";
import { VariableAssignment } from "./VariableAssignment";
import { Token } from "./lexer/Token";
import { TokenType } from "./lexer/TokenType";

export class TypeDeclaration {
  readonly Type: TokenType;
  readonly Identifier: IdentifierToken;

  readonly Variables: Map<string, IdentifierToken>;
  readonly Functions: Map<string, FunctionDeclaration>;

  readonly CallExpressionIdentifiers: IdentifierToken[];
  readonly VariableAssignments: VariableAssignment[];
  readonly MemberAccess: MemberAccessExoression[];

  constructor(type: TokenType, id: IdentifierToken) {
    this.Type = type;
    this.Identifier = id;
    this.Variables = new Map<string, IdentifierToken>();
    this.Functions = new Map<string, FunctionDeclaration>();
    this.CallExpressionIdentifiers = [];
    this.VariableAssignments = [];
    this.MemberAccess = [];
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

export class MemberAccessExoression {
  readonly Parent: IdentifierToken;
  readonly Member: IdentifierToken;

  constructor(parent: IdentifierToken, member: IdentifierToken) {
    this.Parent = parent;
    this.Member = member;
  }
}
