import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class NotExpressionAst extends BaseExpressionAst {
  next: BaseExpressionAst | undefined;

  constructor(token: Token) {
    super(AstType.NotExpression, token);
  }
}
