"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Symbols_1 = require("./Symbols");
const Token_1 = require("./Token");
const AssignmentExpressionAst_1 = require("./ast/AssignmentExpressionAst");
const BaseAst_1 = require("./ast/BaseAst");
const BinopExpressionAst_1 = require("./ast/BinopExpressionAst");
const ClassDefinitionAst_1 = require("./ast/ClassDefinitionAst");
const ClassInstantiateExpressionAst_1 = require("./ast/ClassInstantiateExpressionAst");
const ConditionalExpressionAst_1 = require("./ast/ConditionalExpressionAst");
const FieldExpressionAst_1 = require("./ast/FieldExpressionAst");
const ForBlockAst_1 = require("./ast/ForBlockAst");
const MethodCallExpressionAst_1 = require("./ast/MethodCallExpressionAst");
const MethodDefinitionAst_1 = require("./ast/MethodDefinitionAst");
const NotExpressionAst_1 = require("./ast/NotExpressionAst");
const PrimitiveExpressionAst_1 = require("./ast/PrimitiveExpressionAst");
const ReturnExpressionAst_1 = require("./ast/ReturnExpressionAst");
const StartAst_1 = require("./ast/StartAst");
const VariableExpressionAst_1 = require("./ast/VariableExpressionAst");
const WaitExpressionAst_1 = require("./ast/WaitExpressionAst");
class Parser {
    constructor(tokens, symbols) {
        this._tokens = tokens;
        this._symbols = symbols;
    }
    getStartAst() {
        let start = new StartAst_1.StartAst();
        try {
            this.parseAst(0, start);
            return start;
        }
        catch (error) {
            return new StartAst_1.StartAst();
        }
    }
    parseExpression(prev, startIndex, endIndex) {
        let currToken = this._tokens[startIndex];
        let nextToken = null;
        if (startIndex > endIndex)
            return prev;
        if (startIndex < this._tokens.length - 1)
            nextToken = this._tokens[startIndex + 1];
        let lowestBinopIndex = this._findLowestBinop(startIndex, endIndex);
        if (lowestBinopIndex > 0) {
            let binopToken = this._tokens[lowestBinopIndex];
            let left = this.parseExpression(null, startIndex, lowestBinopIndex - 1);
            let right = this.parseExpression(null, lowestBinopIndex + 1, endIndex);
            if (this._isSymbolValue(binopToken, Symbols_1.Symbol.SetEquals)) {
                let assignmentAst = new AssignmentExpressionAst_1.AssignmentExpressionAst(left, currToken);
                assignmentAst.right = right;
                return assignmentAst;
            }
            else {
                let binopAst = new BinopExpressionAst_1.BinopExpressionAst(binopToken);
                binopAst.left = left;
                binopAst.right = right;
                return binopAst;
            }
        }
        else if (this._isSymbolValue(currToken, Symbols_1.Symbol.LeftParen)) {
            let end = this._findClosingParen(startIndex);
            let expression = this.parseExpression(null, startIndex + 1, end - 1);
            return this.parseExpression(expression, end + 1, endIndex);
        }
        else if (currToken.tokenType === Token_1.TokenType.Primitive) {
            let primitiveExpressionAst = new PrimitiveExpressionAst_1.PrimitiveExpressionAst(null, currToken);
            return this.parseExpression(primitiveExpressionAst, startIndex + 1, endIndex);
        }
        else if (this._isSymbolValue(currToken, Symbols_1.Symbol.Not)) {
            let notExpressionAst = new NotExpressionAst_1.NotExpressionAst(nextToken);
            let right = this.parseExpression(notExpressionAst, startIndex + 1, endIndex);
            notExpressionAst.next = right;
            return notExpressionAst;
        }
        else if (this._isSymbolValue(currToken, Symbols_1.Symbol.Dot)) {
            // assertTokenType(nextToken, TokenType.Name);
            let peekToken = this._tokens[startIndex + 2];
            if (this._isSymbolValue(peekToken, Symbols_1.Symbol.LeftParen)) {
                let methodCallExpressionAst = new MethodCallExpressionAst_1.MethodCallExpressionAst(nextToken, currToken);
                methodCallExpressionAst.left = prev;
                let start = startIndex + 2;
                let end = this._findClosingParen(start);
                let commas = this._findCommas(start + 1, end);
                let startParam = start + 1;
                if (commas.length > 0) {
                    commas.forEach((comma) => {
                        let commaExpression = this.parseExpression(null, startParam, comma - 1);
                        methodCallExpressionAst.parameters.push(commaExpression);
                        startParam = comma + 1;
                    });
                }
                let lastExpression = this.parseExpression(null, start, end - 1);
                if (lastExpression !== null)
                    methodCallExpressionAst.parameters.push(lastExpression);
                return this.parseExpression(methodCallExpressionAst, end + 1, endIndex);
            }
            else {
                let fieldExpressionAst = new FieldExpressionAst_1.FieldExpressionAst(nextToken.value, currToken);
                fieldExpressionAst.left = prev;
                return this.parseExpression(fieldExpressionAst, startIndex + 2, endIndex);
            }
        }
        else if (currToken.tokenType === Token_1.TokenType.Name) {
            if (this._isSymbolValue(nextToken, Symbols_1.Symbol.LeftParen)) {
                let classExpressionAst = new ClassInstantiateExpressionAst_1.ClassInstantiateExpressionAst(currToken.value, currToken);
                classExpressionAst.left = prev;
                let start = startIndex + 1;
                let end = this._findClosingParen(start);
                let commas = this._findCommas(start + 1, end);
                let startParam = start + 1;
                if (commas.length > 0) {
                    commas.forEach((comma) => {
                        let commaExpression = this.parseExpression(null, startParam, comma - 1);
                        classExpressionAst.parameters.push(commaExpression);
                        startParam = comma + 1;
                    });
                }
                let lastExpression = this.parseExpression(null, startParam, end - 1);
                if (lastExpression !== null)
                    classExpressionAst.parameters.push(lastExpression);
                return this.parseExpression(classExpressionAst, end + 1, endIndex);
            }
            else {
                let variableExpressionAst = new VariableExpressionAst_1.VariableExpressionAst(currToken.value, currToken);
                return this.parseExpression(variableExpressionAst, startIndex + 1, endIndex);
            }
        }
        return null;
    }
    parseExpressionAst(startIndex) {
        const end = this._findSemicolon(startIndex);
        return [end + 1, this.parseExpression(null, startIndex, end - 1)];
    }
    parseAst(startIndex, prev) {
        let lastIndex = startIndex;
        if (startIndex >= this._tokens.length) {
            return startIndex;
        }
        const currToken = this._tokens[startIndex];
        let nextToken = null;
        if (startIndex < this._tokens.length - 1) {
            nextToken = this._tokens[startIndex + 1];
        }
        if (prev.type === BaseAst_1.AstType.Start) {
            if (this._isSymbolIn(currToken, this._symbols.classSymbols)) {
                const classAst = new ClassDefinitionAst_1.ClassDefinitionAst(currToken);
                // this.AssertSymbolValue(this._tokens[startIndex + 2], Symbol.LeftCurly);
                startIndex = this.parseAst(startIndex + 3, classAst);
                prev.addClass(nextToken, classAst);
            }
            else {
                // this.AssertFalse(currToken);
            }
        }
        else if (prev.type === BaseAst_1.AstType.ClassDefinition) {
            if (this._isSymbolValue(currToken, Symbols_1.Symbol.Function) ||
                this._isSymbolValue(currToken, Symbols_1.Symbol.Coroutine)) {
                // this.AssertTokenType(nextToken, TokenType.Name);
                const coroutine = this._isSymbolValue(currToken, Symbols_1.Symbol.Coroutine);
                const methodAst = new MethodDefinitionAst_1.MethodDefinitionAst(currToken, coroutine);
                let scanIndex = startIndex + 2;
                let scanToken = this._tokens[scanIndex];
                // this.AssertSymbolValue(scanToken, Symbol.LeftParen);
                scanIndex += 1;
                scanToken = this._tokens[scanIndex];
                while (!(scanToken.tokenType === Token_1.TokenType.Symbol &&
                    this._symbols.symbols.get(scanToken.value) === Symbols_1.Symbol.RightParen)) {
                    if (scanToken.tokenType === Token_1.TokenType.Name) {
                        methodAst.parameterNames.push(scanToken.value);
                    }
                    else {
                        // this.AssertSymbolValue(scanToken, Symbol.Comma);
                    }
                    scanIndex += 1;
                    scanToken = this._tokens[scanIndex];
                }
                // this.AssertSymbolValue(this._tokens[scanIndex + 1], Symbol.LeftCurly);
                startIndex = this.parseAst(scanIndex + 2, methodAst);
                prev.addMethod(nextToken, methodAst);
            }
            else if (currToken.tokenType === Token_1.TokenType.Name) {
                // this.AssertSymbolValue(nextToken, Symbol.SetEquals);
                const variableAst = new VariableExpressionAst_1.VariableExpressionAst(currToken.value, currToken);
                const assignmentAst = new AssignmentExpressionAst_1.AssignmentExpressionAst(variableAst, currToken);
                const end = this._findSemicolon(startIndex);
                const expression = this.parseExpression(null, startIndex + 2, end - 1);
                assignmentAst.right = expression;
                startIndex = end + 1;
                prev.assignments.push(assignmentAst);
            }
            else if (this._isSymbolValue(currToken, Symbols_1.Symbol.RightCurly)) {
                return startIndex + 1;
            }
            else {
                // this.AssertFalse(currToken);
            }
        }
        else if (prev.type === BaseAst_1.AstType.MethodDefinition ||
            prev.type === BaseAst_1.AstType.ConditionalExpression ||
            prev.type === BaseAst_1.AstType.ForExpression) {
            if (this._isSymbolValue(currToken, Symbols_1.Symbol.Return)) {
                let expressionAst;
                if (this._isSymbolValue(nextToken, Symbols_1.Symbol.Semicolon)) {
                    expressionAst = new PrimitiveExpressionAst_1.PrimitiveExpressionAst(null, currToken);
                    startIndex = startIndex + 2;
                }
                else {
                    const expression = this.parseExpressionAst(startIndex + 1);
                    startIndex = expression[0];
                    expressionAst = expression[1];
                }
                const returnExpression = new ReturnExpressionAst_1.ReturnExpressionAst(expressionAst, currToken);
                prev.statements.push(returnExpression);
            }
            else if (this._isSymbolValue(currToken, Symbols_1.Symbol.Wait)) {
                const expression = this.parseExpressionAst(startIndex + 1);
                startIndex = expression[0];
                const returnExpression = new WaitExpressionAst_1.WaitExpressionAst(expression[1], currToken);
                prev.statements.push(returnExpression);
            }
            else if (currToken.tokenType === Token_1.TokenType.Name) {
                const expression = this.parseExpressionAst(startIndex);
                startIndex = expression[0];
                prev.statements.push(expression[1]);
            }
            else if (this._isSymbolIn(currToken, this._symbols.conditionalSymbols)) {
                const conditionalAst = new ConditionalExpressionAst_1.ConditionalExpressionAst(currToken);
                if (this._isSymbolValue(currToken, Symbols_1.Symbol.Else)) {
                    // this.AssertSymbolValue(
                    //   this._tokens[startIndex + 1],
                    //   Symbol.LeftCurly
                    // );
                    startIndex = this.parseAst(startIndex + 2, conditionalAst);
                }
                else {
                    // this.AssertSymbolValue(nextToken, Symbol.LeftParen);
                    const end = this._findClosingParen(startIndex + 1);
                    conditionalAst.condition = this.parseExpression(null, startIndex + 2, end - 1);
                    // this.AssertSymbolValue(this._tokens[end + 1], Symbol.LeftCurly);
                    startIndex = this.parseAst(end + 2, conditionalAst);
                }
                prev.statements.push(conditionalAst);
            }
            else if (this._isSymbolValue(currToken, Symbols_1.Symbol.For)) {
                // this.AssertSymbolValue(nextToken, Symbol.LeftParen);
                const end = this._findClosingParen(startIndex);
                const foreachAst = new ForBlockAst_1.ForBlockAst(currToken);
                let scanIndex = startIndex + 2;
                // this.AssertTokenType(this._tokens[scanIndex], TokenType.Name);
                const variableAst = new VariableExpressionAst_1.VariableExpressionAst(this._tokens[scanIndex].value, this._tokens[scanIndex]);
                foreachAst.variable = variableAst;
                // this.AssertSymbolValue(this._tokens[scanIndex + 1], Symbol.In);
                const expression = this.parseExpression(null, scanIndex + 2, end - 1);
                foreachAst.iterable = expression;
                // this.AssertSymbolValue(this._tokens[end + 1], Symbol.LeftCurly);
                startIndex = this.parseAst(end + 2, foreachAst);
                prev.statements.push(foreachAst);
            }
            else if (this._isSymbolValue(currToken, Symbols_1.Symbol.RightCurly)) {
                return startIndex + 1;
            }
            else {
                // this.AssertFalse(currToken);
            }
        }
        if (startIndex === lastIndex) {
            // this.AssertFalse(currToken);
        }
        return this.parseAst(startIndex, prev);
    }
    _findLowestBinop(startIndex, endIndex) {
        let lowestBinopIndex = -1;
        let lowestBinopValue = Number.MAX_VALUE;
        let parenCount = 0;
        for (let i = startIndex; i < endIndex; i++) {
            let token = this._tokens[i];
            if (this._isSymbolValue(token, Symbols_1.Symbol.LeftParen))
                parenCount++;
            else if (this._isSymbolValue(token, Symbols_1.Symbol.RightParen))
                parenCount--;
            if (parenCount > 0)
                continue;
            if (this._isSymbolIn(token, this._symbols.binopSymbols) ||
                this._isSymbolValue(token, Symbols_1.Symbol.SetEquals)) {
                const value = this._symbols.symbols.get(token.value);
                if (value < lowestBinopValue) {
                    lowestBinopIndex = i;
                    lowestBinopValue = value;
                }
            }
        }
        return lowestBinopIndex;
    }
    _findCommas(startIndex, endIndex) {
        const ints = [];
        let parenCount = 0;
        for (let i = startIndex; i < endIndex; i++) {
            const token = this._tokens[i];
            if (this._isSymbolValue(token, Symbols_1.Symbol.LeftParen))
                parenCount++;
            if (this._isSymbolValue(token, Symbols_1.Symbol.RightParen))
                parenCount--;
            if (this._isSymbolValue(token, Symbols_1.Symbol.Comma) && parenCount === 0)
                ints.push(i);
        }
        return ints;
    }
    _findClosingParen(startIndex) {
        let parenCount = 0;
        for (let i = startIndex; i < this._tokens.length; i++) {
            const token = this._tokens[i];
            if (this._isSymbolValue(token, Symbols_1.Symbol.LeftParen))
                parenCount++;
            else if (this._isSymbolValue(token, Symbols_1.Symbol.RightParen)) {
                parenCount--;
                if (parenCount === 0)
                    return i;
            }
        }
        return -1;
    }
    _findSemicolon(startIndex) {
        for (let i = startIndex; i < this._tokens.length; i++) {
            const token = this._tokens[i];
            if (this._isSymbolValue(token, Symbols_1.Symbol.Semicolon))
                return i;
        }
        return -1;
    }
    _isSymbolIn(token, symbols) {
        const value = this._symbols.symbols.get(token.value);
        return (token !== null &&
            token.tokenType === Token_1.TokenType.Symbol &&
            symbols.has(value));
    }
    _isSymbolValue(token, symbolValue) {
        const value = this._symbols.symbols.get(token.value);
        return (token !== null &&
            token.tokenType === Token_1.TokenType.Symbol &&
            token &&
            value === symbolValue);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map