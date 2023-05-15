import { Token } from "../Token";
import { AstType, BaseAst } from "./BaseAst";

export class BlockAst extends BaseAst {
  statements: BaseAst[];

  constructor(type: AstType, token: Token) {
    super(type, token);
    this.statements = [];
  }
}
