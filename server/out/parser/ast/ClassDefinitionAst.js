"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassDefinitionAst = void 0;
const BaseAst_1 = require("./BaseAst");
class ClassDefinitionAst extends BaseAst_1.BaseAst {
    constructor(token) {
        super(BaseAst_1.AstType.ClassDefinition, token);
        this.assignments = [];
        this.methods = new Map();
        // this.methods.set("Init", new MethodDefinitionAst(0));
    }
    // getInit(): MethodDefinitionAst | undefined {
    //   return this.methods.get("Init");
    // }
    addMethod(methodName, methodAst) {
        this.methods.set(methodName, methodAst);
    }
}
exports.ClassDefinitionAst = ClassDefinitionAst;
//# sourceMappingURL=ClassDefinitionAst.js.map