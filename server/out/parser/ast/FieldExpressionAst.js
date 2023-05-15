"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class FieldExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(name, token) {
        super(BaseAst_1.AstType.FieldExpression, token);
        this.fieldName = name;
    }
}
exports.FieldExpressionAst = FieldExpressionAst;
//# sourceMappingURL=FieldExpressionAst.js.map