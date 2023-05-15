"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodDefinitionAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BlockAst_1 = require("./BlockAst");
class MethodDefinitionAst extends BlockAst_1.BlockAst {
    constructor(token, coroutine = false) {
        super(BaseAst_1.AstType.MethodDefinition, token);
        this.parameterNames = [];
        this.coroutine = coroutine;
    }
}
exports.MethodDefinitionAst = MethodDefinitionAst;
//# sourceMappingURL=MethodDefinitionAst.js.map