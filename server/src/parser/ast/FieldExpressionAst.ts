import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class FieldExpressionAst extends BaseExpressionAst {
  fieldName: string;
  left: BaseExpressionAst | undefined;

  constructor(name: string, token: Token) {
    super(AstType.FieldExpression, token);
    this.fieldName = name;
  }
}
