"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartAst = void 0;
const Token_1 = require("../Token");
const BaseAst_1 = require("./BaseAst");
class StartAst extends BaseAst_1.BaseAst {
    constructor() {
        super(BaseAst_1.AstType.Start, new Token_1.Token(Token_1.TokenType.Name, 0, "", 0, 0));
        this.classes = new Map();
        // this.addClass(
        //   "Main",
        //   new ClassDefinitionAst(new Token(TokenType.Symbol, 0, "Main", ), 0)
        // );
    }
    addClass(className, classAst) {
        this.classes.set(className, classAst);
    }
}
exports.StartAst = StartAst;
//# sourceMappingURL=StartAst.js.map