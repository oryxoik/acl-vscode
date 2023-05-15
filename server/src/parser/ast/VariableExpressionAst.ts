import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class VariableExpressionAst extends BaseExpressionAst {
  name: string;

  constructor(name: string, token: Token) {
    super(AstType.VariableExpression, token);
    this.name = name;
  }
}
