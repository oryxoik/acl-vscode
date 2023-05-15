"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const fs = require("fs");
function log(message) {
    fs.appendFileSync("E:/Code/VsCode Extensions/aottg-custom-logic/logs.txt", `${message}\n`);
}
exports.log = log;
//# sourceMappingURL=log.js.map