"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class AssignmentExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(left, token) {
        super(BaseAst_1.AstType.AssignmentExpression, token);
        this.left = left;
        this.right = null;
    }
}
exports.AssignmentExpressionAst = AssignmentExpressionAst;
//# sourceMappingURL=AssignmentExpressionAst.js.map