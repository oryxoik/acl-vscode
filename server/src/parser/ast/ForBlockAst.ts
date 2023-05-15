import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";
import { BlockAst } from "./BlockAst";
import { VariableExpressionAst } from "./VariableExpressionAst";

export class ForBlockAst extends BlockAst {
  variable: VariableExpressionAst | undefined;
  iterable: BaseExpressionAst | undefined;

  constructor(token: Token) {
    super(AstType.ForExpression, token);
  }
}
