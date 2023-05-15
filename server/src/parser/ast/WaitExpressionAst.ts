import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class WaitExpressionAst extends BaseExpressionAst {
  waitTime: BaseExpressionAst;

  constructor(waitTime: BaseExpressionAst, token: Token) {
    super(AstType.WaitExpression, token);
    this.waitTime = waitTime;
  }
}
