import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class ReturnExpressionAst extends BaseExpressionAst {
  returnValue: BaseExpressionAst;

  constructor(returnValue: BaseExpressionAst, token: Token) {
    super(AstType.ReturnExpression, token);
    this.returnValue = returnValue;
  }
}
