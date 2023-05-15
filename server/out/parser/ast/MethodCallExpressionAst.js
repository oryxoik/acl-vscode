"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodCallExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class MethodCallExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(nameToken, token) {
        super(BaseAst_1.AstType.MethodCallExpression, token);
        this.nameToken = nameToken;
        this.parameters = [];
        this.left = null;
    }
}
exports.MethodCallExpressionAst = MethodCallExpressionAst;
//# sourceMappingURL=MethodCallExpressionAst.js.map