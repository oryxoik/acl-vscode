"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class WaitExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(waitTime, token) {
        super(BaseAst_1.AstType.WaitExpression, token);
        this.waitTime = waitTime;
    }
}
exports.WaitExpressionAst = WaitExpressionAst;
//# sourceMappingURL=WaitExpressionAst.js.map