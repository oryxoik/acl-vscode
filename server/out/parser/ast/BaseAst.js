"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstType = exports.BaseAst = void 0;
class BaseAst {
    constructor(type, token) {
        this.type = type;
        this.token = token;
    }
}
exports.BaseAst = BaseAst;
var AstType;
(function (AstType) {
    AstType[AstType["Start"] = 0] = "Start";
    AstType[AstType["ClassDefinition"] = 1] = "ClassDefinition";
    AstType[AstType["MethodDefinition"] = 2] = "MethodDefinition";
    AstType[AstType["AssignmentExpression"] = 3] = "AssignmentExpression";
    AstType[AstType["MethodCallExpression"] = 4] = "MethodCallExpression";
    AstType[AstType["ClassInstantiateExpression"] = 5] = "ClassInstantiateExpression";
    AstType[AstType["FieldExpression"] = 6] = "FieldExpression";
    AstType[AstType["PrimitiveExpression"] = 7] = "PrimitiveExpression";
    AstType[AstType["BinopExpression"] = 8] = "BinopExpression";
    AstType[AstType["NotExpression"] = 9] = "NotExpression";
    AstType[AstType["VariableExpression"] = 10] = "VariableExpression";
    AstType[AstType["ReturnExpression"] = 11] = "ReturnExpression";
    AstType[AstType["WaitExpression"] = 12] = "WaitExpression";
    AstType[AstType["ConditionalExpression"] = 13] = "ConditionalExpression";
    AstType[AstType["ForExpression"] = 14] = "ForExpression";
})(AstType = exports.AstType || (exports.AstType = {}));
//# sourceMappingURL=BaseAst.js.map