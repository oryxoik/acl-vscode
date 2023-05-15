"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassInstantiateExpressionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BaseExpressionAst_1 = require("./BaseExpressionAst");
class ClassInstantiateExpressionAst extends BaseExpressionAst_1.BaseExpressionAst {
    constructor(name, token) {
        super(BaseAst_1.AstType.ClassInstantiateExpression, token);
        this.name = name;
        this.parameters = [];
    }
}
exports.ClassInstantiateExpressionAst = ClassInstantiateExpressionAst;
//# sourceMappingURL=ClassInstantiateExpressionAst.js.map