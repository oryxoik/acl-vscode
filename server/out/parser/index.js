"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_1 = require("./Lexer");
const Parser_1 = require("./Parser");
const Symbols_1 = require("./Symbols");
const source = `class Game
{
    IsEnding = null;
    PVP = null;
    EndTimeLeft = null;
    Titans = null;
    Shifters = null;
    Humans = null;
    AIShifters = null;
    PlayerShifters = null;
    TestNum = 77;
    _privateNum = 43.225;

    function Debug(message){
        frameTime = Time.FrameTime;
    }
}`;
const symbols = new Symbols_1.Symbols();
symbols.init();
const lexer = new Lexer_1.Lexer(source, 0, symbols);
const parser = new Parser_1.Parser(lexer.getTokens(), symbols);
const startAst = parser.getStartAst();
// const tokens = new Lexer(source, 0, symbols).getTokens();
let output = "";
startAst.classes.forEach((classDef, key) => {
    classDef.assignments.forEach((assignmentAst) => {
        console.log(assignmentAst.left.token);
    });
});
// tokens.forEach((token) => {
//   output += `${token.line} | [${token.startIndex}]${token.value}(${token.tokenType})[${token.length}]\n`;
// });
// console.log(output);
//# sourceMappingURL=index.js.map