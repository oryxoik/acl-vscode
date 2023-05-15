"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLetterOrDigit = exports.isDigit = exports.isLetter = void 0;
function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}
exports.isLetter = isLetter;
function isDigit(char) {
    return /^\d$/.test(char);
}
exports.isDigit = isDigit;
function isLetterOrDigit(character) {
    return /^[a-zA-Z0-9]$/.test(character);
}
exports.isLetterOrDigit = isLetterOrDigit;
//# sourceMappingURL=utils.js.map