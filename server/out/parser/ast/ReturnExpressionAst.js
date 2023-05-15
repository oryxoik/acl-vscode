"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class ReturnExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(returnValue, token) {
        super(BaseAst_1.AstType.ReturnExpression, token);
        this.returnValue = returnValue;
    }
}
exports.ReturnExpressionAst = ReturnExpressionAst;
//# sourceMappingURL=ReturnExpressionAst.js.map