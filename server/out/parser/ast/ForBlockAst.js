"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForBlockAst = void 0;
const BaseAst_1 = require("./BaseAst");
const BlockAst_1 = require("./BlockAst");
class ForBlockAst extends BlockAst_1.BlockAst {
    constructor(token) {
        super(BaseAst_1.AstType.ForExpression, token);
    }
}
exports.ForBlockAst = ForBlockAst;
//# sourceMappingURL=ForBlockAst.js.map