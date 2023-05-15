"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BlockAst_1 = require("./BlockAst");
class ConditionalExpressionAst extends BlockAst_1.BlockAst {
    constructor(token) {
        super(BaseAst_1.AstType.ConditionalExpression, token);
    }
}
exports.ConditionalExpressionAst = ConditionalExpressionAst;
//# sourceMappingURL=ConditionalExpressionAst.js.map