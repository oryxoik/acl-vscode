import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class PrimitiveExpressionAst extends BaseExpressionAst {
  value: any;

  constructor(value: any, token: Token) {
    super(AstType.PrimitiveExpression, token);
    this.value = value;
  }
}
