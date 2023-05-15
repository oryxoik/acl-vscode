import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class AssignmentExpressionAst extends BaseExpressionAst {
  left: BaseExpressionAst;
  right: BaseExpressionAst | null;

  constructor(left: BaseExpressionAst, token: Token) {
    super(AstType.AssignmentExpression, token);
    this.left = left;
    this.right = null;
  }
}
