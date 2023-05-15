"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Symbol"] = 0] = "Symbol";
    TokenType[TokenType["Primitive"] = 1] = "Primitive";
    TokenType[TokenType["Name"] = 2] = "Name";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class Token {
    constructor(tokenType, line, value, startIndex, length) {
        this.tokenType = tokenType;
        this.line = line;
        this.value = value;
        this.startIndex = startIndex;
        this.length = length;
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map