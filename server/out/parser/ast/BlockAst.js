"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockAst = void 0;
const BaseAst_1 = require("./BaseAst");
class BlockAst extends BaseAst_1.BaseAst {
    constructor(type, token) {
        super(type, token);
        this.statements = [];
    }
}
exports.BlockAst = BlockAst;
//# sourceMappingURL=BlockAst.js.map