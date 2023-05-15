"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class NotExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(token) {
        super(BaseAst_1.AstType.NotExpression, token);
    }
}
exports.NotExpressionAst = NotExpressionAst;
//# sourceMappingURL=NotExpressionAst.js.map