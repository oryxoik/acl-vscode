import { Token } from "../Token";

export class BaseAst {
  type: AstType;
  token: Token;

  constructor(type: AstType, token: Token) {
    this.type = type;
    this.token = token;
  }
}

export enum AstType {
  Start,
  ClassDefinition,
  MethodDefinition,
  AssignmentExpression,
  MethodCallExpression,
  ClassInstantiateExpression,
  FieldExpression,
  PrimitiveExpression,
  BinopExpression,
  NotExpression,
  VariableExpression,
  ReturnExpression,
  WaitExpression,
  ConditionalExpression,
  ForExpression,
}
