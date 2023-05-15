"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class VariableExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(name, token) {
        super(BaseAst_1.AstType.VariableExpression, token);
        this.name = name;
    }
}
exports.VariableExpressionAst = VariableExpressionAst;
//# sourceMappingURL=VariableExpressionAst.js.map