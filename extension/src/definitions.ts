import { Token } from "./lexer/token";

interface BaseDefinition {
  typeToken: Token;
  identifierToken: Token;
  variables: Map<string, Token>;
}
export interface TypeDefinition extends BaseDefinition {
  functions: Map<string, FunctionDefinition>;
  callExpressions: Token[];
  memberAccesss: MemberAccessExpression[];
  variableAssignment: VariableAssignmentExpression[];
}

interface MemberAccessExpression {
  parent: Token;
  member: Token;
}

interface VariableAssignmentExpression {
  identifierToken: Token;
  knownValue: string;
}

export interface FunctionDefinition extends BaseDefinition {}

export function createTypeDefinition(
  typeToken: Token,
  identifierToken: Token
): TypeDefinition {
  return {
    typeToken,
    identifierToken,
    variables: new Map<string, Token>(),
    functions: new Map<string, FunctionDefinition>(),
    callExpressions: [],
    memberAccesss: [],
    variableAssignment: [],
  };
}

export function createFunctionDefinition(
  typeToken: Token,
  identifierToken: Token
): FunctionDefinition {
  return {
    typeToken,
    identifierToken,
    variables: new Map<string, Token>(),
  };
}

export function tryAddVariableToDefinition(def: BaseDefinition, token: Token) {
  if (def.variables.has(token.lexeme)) return false;
  def.variables.set(token.lexeme, token);
  return true;
}
