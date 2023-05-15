import { Token } from "../Token";
import { AstType } from "./BaseAst";
import { BlockAst } from "./BlockAst";

export class MethodDefinitionAst extends BlockAst {
  parameterNames: string[];
  coroutine: boolean;

  constructor(token: Token, coroutine: boolean = false) {
    super(AstType.MethodDefinition, token);
    this.parameterNames = [];
    this.coroutine = coroutine;
  }
}
