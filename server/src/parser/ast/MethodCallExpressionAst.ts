import { Token } from "../Token";
import { AstType, BaseAst } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class MethodCallExpressionAst extends BaseExpressionAst {
  nameToken: Token;
  parameters: BaseAst[];
  left: BaseExpressionAst | null;

  constructor(nameToken: Token, token: Token) {
    super(AstType.MethodCallExpression, token);
    this.nameToken = nameToken;
    this.parameters = [];
    this.left = null;
  }
}
