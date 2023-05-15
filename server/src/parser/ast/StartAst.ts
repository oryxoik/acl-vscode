import { Symbol } from "../Symbols";
import { Token, TokenType } from "../Token";
import { AstType, BaseAst } from "./BaseAst";
import { ClassDefinitionAst } from "./ClassDefinitionAst";

export class StartAst extends BaseAst {
  classes: Map<Token, ClassDefinitionAst>;

  constructor() {
    super(AstType.Start, new Token(TokenType.Name, 0, "", 0, 0));
    this.classes = new Map<Token, ClassDefinitionAst>();
    // this.addClass(
    //   "Main",
    //   new ClassDefinitionAst(new Token(TokenType.Symbol, 0, "Main", ), 0)
    // );
  }

  addClass(className: Token, classAst: ClassDefinitionAst) {
    this.classes.set(className, classAst);
  }
}
