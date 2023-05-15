"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinopExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class BinopExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(token) {
        super(BaseAst_1.AstType.BinopExpression, token);
    }
}
exports.BinopExpressionAst = BinopExpressionAst;
//# sourceMappingURL=BinopExpressionAst.js.map