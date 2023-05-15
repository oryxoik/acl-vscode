import { Lexer } from "./Lexer";
import { Parser } from "./Parser";
import { Symbols } from "./Symbols";

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

const symbols = new Symbols();
symbols.init();
const lexer = new Lexer(source, 0, symbols);
const parser = new Parser(lexer.getTokens(), symbols);
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
