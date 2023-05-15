import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class BinopExpressionAst extends BaseExpressionAst {
  left: BaseExpressionAst | undefined;
  right: BaseExpressionAst | undefined;

  constructor(token: Token) {
    super(AstType.BinopExpression, token);
  }
}
