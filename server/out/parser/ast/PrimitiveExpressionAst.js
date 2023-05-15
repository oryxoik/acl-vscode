"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class PrimitiveExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(value, token) {
        super(BaseAst_1.AstType.PrimitiveExpression, token);
        this.value = value;
    }
}
exports.PrimitiveExpressionAst = PrimitiveExpressionAst;
//# sourceMappingURL=PrimitiveExpressionAst.js.map