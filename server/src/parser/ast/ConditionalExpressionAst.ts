import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";
import { BlockAst } from "./BlockAst";

export class ConditionalExpressionAst extends BlockAst {
  condition: BaseExpressionAst | undefined;

  constructor(token: Token) {
    super(AstType.ConditionalExpression, token);
  }
}
