import { Token } from "../Token";
import { AstType, BaseAst } from "./BaseAst";
import { BaseExpressionAst } from "./BaseExpressionAst";

export class ClassInstantiateExpressionAst extends BaseExpressionAst {
  name: string;
  parameters: BaseAst[];
  left: BaseExpressionAst | undefined;

  constructor(name: string, token: Token) {
    super(AstType.ClassInstantiateExpression, token);
    this.name = name;
    this.parameters = [];
  }
}
