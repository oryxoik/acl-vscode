import { Symbol, Symbols } from "./Symbols";
import { Token, TokenType } from "./Token";
import { AssignmentExpressionAst } from "./ast/AssignmentExpressionAst";
import { AstType, BaseAst } from "./ast/BaseAst";
import { BaseExpressionAst } from "./ast/BaseExpressionAst";
import { BinopExpressionAst } from "./ast/BinopExpressionAst";
import { BlockAst } from "./ast/BlockAst";
import { ClassDefinitionAst } from "./ast/ClassDefinitionAst";
import { ClassInstantiateExpressionAst } from "./ast/ClassInstantiateExpressionAst";
import { ConditionalExpressionAst } from "./ast/ConditionalExpressionAst";
import { FieldExpressionAst } from "./ast/FieldExpressionAst";
import { ForBlockAst } from "./ast/ForBlockAst";
import { MethodCallExpressionAst } from "./ast/MethodCallExpressionAst";
import { MethodDefinitionAst } from "./ast/MethodDefinitionAst";
import { NotExpressionAst } from "./ast/NotExpressionAst";
import { PrimitiveExpressionAst } from "./ast/PrimitiveExpressionAst";
import { ReturnExpressionAst } from "./ast/ReturnExpressionAst";
import { StartAst } from "./ast/StartAst";
import { VariableExpressionAst } from "./ast/VariableExpressionAst";
import { WaitExpressionAst } from "./ast/WaitExpressionAst";

export class Parser {
  private _tokens: Token[];
  private _symbols: Symbols;

  constructor(tokens: Token[], symbols: Symbols) {
    this._tokens = tokens;
    this._symbols = symbols;
  }

  getStartAst(): StartAst {
    let start = new StartAst();
    try {
      this.parseAst(0, start);
      return start;
    } catch (error) {
      return new StartAst();
    }
  }

  parseExpression(
    prev: BaseExpressionAst | null,
    startIndex: number,
    endIndex: number
  ): BaseExpressionAst | null {
    let currToken = this._tokens[startIndex];
    let nextToken: Token | null = null;
    if (startIndex > endIndex) return prev;
    if (startIndex < this._tokens.length - 1)
      nextToken = this._tokens[startIndex + 1];
    let lowestBinopIndex: number = this._findLowestBinop(startIndex, endIndex);
    if (lowestBinopIndex > 0) {
      let binopToken = this._tokens[lowestBinopIndex];
      let left = this.parseExpression(null, startIndex, lowestBinopIndex - 1);
      let right = this.parseExpression(null, lowestBinopIndex + 1, endIndex);
      if (this._isSymbolValue(binopToken, Symbol.SetEquals)) {
        let assignmentAst = new AssignmentExpressionAst(left!, currToken);
        assignmentAst.right = right;
        return assignmentAst;
      } else {
        let binopAst = new BinopExpressionAst(binopToken);
        binopAst.left = left!;
        binopAst.right = right!;
        return binopAst;
      }
    } else if (this._isSymbolValue(currToken, Symbol.LeftParen)) {
      let end: number = this._findClosingParen(startIndex);
      let expression = this.parseExpression(null, startIndex + 1, end - 1);
      return this.parseExpression(expression, end + 1, endIndex);
    } else if (currToken.tokenType === TokenType.Primitive) {
      let primitiveExpressionAst = new PrimitiveExpressionAst(null, currToken);
      return this.parseExpression(
        primitiveExpressionAst,
        startIndex + 1,
        endIndex
      );
    } else if (this._isSymbolValue(currToken, Symbol.Not)) {
      let notExpressionAst = new NotExpressionAst(nextToken!);
      let right = this.parseExpression(
        notExpressionAst,
        startIndex + 1,
        endIndex
      );
      notExpressionAst.next = right!;
      return notExpressionAst;
    } else if (this._isSymbolValue(currToken, Symbol.Dot)) {
      // assertTokenType(nextToken, TokenType.Name);
      let peekToken = this._tokens[startIndex + 2];
      if (this._isSymbolValue(peekToken, Symbol.LeftParen)) {
        let methodCallExpressionAst = new MethodCallExpressionAst(
          nextToken!,
          currToken
        );
        methodCallExpressionAst.left = prev!;
        let start = startIndex + 2;
        let end = this._findClosingParen(start);
        let commas = this._findCommas(start + 1, end);
        let startParam = start + 1;
        if (commas.length > 0) {
          commas.forEach((comma) => {
            let commaExpression = this.parseExpression(
              null,
              startParam,
              comma - 1
            );
            methodCallExpressionAst.parameters.push(commaExpression!);
            startParam = comma + 1;
          });
        }
        let lastExpression = this.parseExpression(null, start, end - 1);
        if (lastExpression !== null)
          methodCallExpressionAst.parameters.push(lastExpression);

        return this.parseExpression(methodCallExpressionAst, end + 1, endIndex);
      } else {
        let fieldExpressionAst = new FieldExpressionAst(
          nextToken!.value,
          currToken
        );
        fieldExpressionAst.left = prev!;
        return this.parseExpression(
          fieldExpressionAst,
          startIndex + 2,
          endIndex
        );
      }
    } else if (currToken.tokenType === TokenType.Name) {
      if (this._isSymbolValue(nextToken!, Symbol.LeftParen)) {
        let classExpressionAst = new ClassInstantiateExpressionAst(
          currToken.value,
          currToken
        );
        classExpressionAst.left = prev!;
        let start = startIndex + 1;
        let end = this._findClosingParen(start);
        let commas = this._findCommas(start + 1, end);
        let startParam = start + 1;
        if (commas.length > 0) {
          commas.forEach((comma) => {
            let commaExpression = this.parseExpression(
              null,
              startParam,
              comma - 1
            );
            classExpressionAst.parameters.push(commaExpression!);
            startParam = comma + 1;
          });
        }
        let lastExpression = this.parseExpression(null, startParam, end - 1);
        if (lastExpression !== null)
          classExpressionAst.parameters.push(lastExpression);
        return this.parseExpression(classExpressionAst, end + 1, endIndex);
      } else {
        let variableExpressionAst = new VariableExpressionAst(
          currToken.value,
          currToken
        );
        return this.parseExpression(
          variableExpressionAst,
          startIndex + 1,
          endIndex
        );
      }
    }

    return null;
  }

  parseExpressionAst(startIndex: number): [number, any] {
    const end = this._findSemicolon(startIndex);
    return [end + 1, this.parseExpression(null, startIndex, end - 1)];
  }

  parseAst(startIndex: number, prev: BaseAst): number {
    let lastIndex: number = startIndex;
    if (startIndex >= this._tokens.length) {
      return startIndex;
    }
    const currToken: Token = this._tokens[startIndex];
    let nextToken: Token | null = null;
    if (startIndex < this._tokens.length - 1) {
      nextToken = this._tokens[startIndex + 1];
    }

    if (prev.type === AstType.Start) {
      if (this._isSymbolIn(currToken, this._symbols.classSymbols)) {
        const classAst = new ClassDefinitionAst(currToken);
        // this.AssertSymbolValue(this._tokens[startIndex + 2], Symbol.LeftCurly);
        startIndex = this.parseAst(startIndex + 3, classAst);
        (prev as StartAst).addClass(nextToken!, classAst);
      } else {
        // this.AssertFalse(currToken);
      }
    } else if (prev.type === AstType.ClassDefinition) {
      if (
        this._isSymbolValue(currToken, Symbol.Function) ||
        this._isSymbolValue(currToken, Symbol.Coroutine)
      ) {
        // this.AssertTokenType(nextToken, TokenType.Name);
        const coroutine: boolean = this._isSymbolValue(
          currToken,
          Symbol.Coroutine
        );
        const methodAst = new MethodDefinitionAst(currToken, coroutine);
        let scanIndex: number = startIndex + 2;
        let scanToken: Token = this._tokens[scanIndex];
        // this.AssertSymbolValue(scanToken, Symbol.LeftParen);
        scanIndex += 1;
        scanToken = this._tokens[scanIndex];
        while (
          !(
            scanToken.tokenType === TokenType.Symbol &&
            this._symbols.symbols.get(scanToken.value) === Symbol.RightParen
          )
        ) {
          if (scanToken.tokenType === TokenType.Name) {
            methodAst.parameterNames.push(scanToken.value);
          } else {
            // this.AssertSymbolValue(scanToken, Symbol.Comma);
          }
          scanIndex += 1;
          scanToken = this._tokens[scanIndex];
        }
        // this.AssertSymbolValue(this._tokens[scanIndex + 1], Symbol.LeftCurly);
        startIndex = this.parseAst(scanIndex + 2, methodAst);
        (prev as ClassDefinitionAst).addMethod(nextToken!, methodAst);
      } else if (currToken.tokenType === TokenType.Name) {
        // this.AssertSymbolValue(nextToken, Symbol.SetEquals);
        const variableAst = new VariableExpressionAst(
          currToken.value,
          currToken
        );
        const assignmentAst = new AssignmentExpressionAst(
          variableAst,
          currToken
        );
        const end: number = this._findSemicolon(startIndex);
        const expression = this.parseExpression(null, startIndex + 2, end - 1);
        assignmentAst.right = expression;
        startIndex = end + 1;
        (prev as ClassDefinitionAst).assignments.push(assignmentAst);
      } else if (this._isSymbolValue(currToken, Symbol.RightCurly)) {
        return startIndex + 1;
      } else {
        // this.AssertFalse(currToken);
      }
    } else if (
      prev.type === AstType.MethodDefinition ||
      prev.type === AstType.ConditionalExpression ||
      prev.type === AstType.ForExpression
    ) {
      if (this._isSymbolValue(currToken, Symbol.Return)) {
        let expressionAst: BaseExpressionAst;
        if (this._isSymbolValue(nextToken!, Symbol.Semicolon)) {
          expressionAst = new PrimitiveExpressionAst(null, currToken);
          startIndex = startIndex + 2;
        } else {
          const expression = this.parseExpressionAst(startIndex + 1);
          startIndex = expression[0] as number;
          expressionAst = expression[1] as BaseExpressionAst;
        }
        const returnExpression = new ReturnExpressionAst(
          expressionAst,
          currToken
        );
        (prev as BlockAst).statements.push(returnExpression);
      } else if (this._isSymbolValue(currToken, Symbol.Wait)) {
        const expression = this.parseExpressionAst(startIndex + 1);
        startIndex = expression[0] as number;
        const returnExpression = new WaitExpressionAst(
          expression[1] as BaseExpressionAst,
          currToken
        );
        (prev as BlockAst).statements.push(returnExpression);
      } else if (currToken.tokenType === TokenType.Name) {
        const expression = this.parseExpressionAst(startIndex);
        startIndex = expression[0] as number;
        (prev as BlockAst).statements.push(expression[1] as BaseExpressionAst);
      } else if (
        this._isSymbolIn(currToken, this._symbols.conditionalSymbols)
      ) {
        const conditionalAst = new ConditionalExpressionAst(currToken);
        if (this._isSymbolValue(currToken, Symbol.Else)) {
          // this.AssertSymbolValue(
          //   this._tokens[startIndex + 1],
          //   Symbol.LeftCurly
          // );
          startIndex = this.parseAst(startIndex + 2, conditionalAst);
        } else {
          // this.AssertSymbolValue(nextToken, Symbol.LeftParen);
          const end = this._findClosingParen(startIndex + 1);
          conditionalAst.condition = this.parseExpression(
            null,
            startIndex + 2,
            end - 1
          )!;
          // this.AssertSymbolValue(this._tokens[end + 1], Symbol.LeftCurly);
          startIndex = this.parseAst(end + 2, conditionalAst);
        }
        (prev as BlockAst).statements.push(conditionalAst);
      } else if (this._isSymbolValue(currToken, Symbol.For)) {
        // this.AssertSymbolValue(nextToken, Symbol.LeftParen);
        const end = this._findClosingParen(startIndex);
        const foreachAst = new ForBlockAst(currToken);
        let scanIndex = startIndex + 2;
        // this.AssertTokenType(this._tokens[scanIndex], TokenType.Name);
        const variableAst = new VariableExpressionAst(
          this._tokens[scanIndex].value,
          this._tokens[scanIndex]
        );
        foreachAst.variable = variableAst;
        // this.AssertSymbolValue(this._tokens[scanIndex + 1], Symbol.In);
        const expression = this.parseExpression(null, scanIndex + 2, end - 1);
        foreachAst.iterable = expression!;
        // this.AssertSymbolValue(this._tokens[end + 1], Symbol.LeftCurly);
        startIndex = this.parseAst(end + 2, foreachAst);
        (prev as BlockAst).statements.push(foreachAst);
      } else if (this._isSymbolValue(currToken, Symbol.RightCurly)) {
        return startIndex + 1;
      } else {
        // this.AssertFalse(currToken);
      }
    }

    if (startIndex === lastIndex) {
      // this.AssertFalse(currToken);
    }

    return this.parseAst(startIndex, prev);
  }

  private _findLowestBinop(startIndex: number, endIndex: number): number {
    let lowestBinopIndex = -1;
    let lowestBinopValue = Number.MAX_VALUE;
    let parenCount = 0;
    for (let i = startIndex; i < endIndex; i++) {
      let token = this._tokens[i];
      if (this._isSymbolValue(token, Symbol.LeftParen)) parenCount++;
      else if (this._isSymbolValue(token, Symbol.RightParen)) parenCount--;
      if (parenCount > 0) continue;
      if (
        this._isSymbolIn(token, this._symbols.binopSymbols) ||
        this._isSymbolValue(token, Symbol.SetEquals)
      ) {
        const value = this._symbols.symbols.get(token.value)!;
        if (value < lowestBinopValue) {
          lowestBinopIndex = i;
          lowestBinopValue = value;
        }
      }
    }
    return lowestBinopIndex;
  }

  private _findCommas(startIndex: number, endIndex: number): number[] {
    const ints: number[] = [];
    let parenCount = 0;
    for (let i = startIndex; i < endIndex; i++) {
      const token = this._tokens[i];
      if (this._isSymbolValue(token, Symbol.LeftParen)) parenCount++;
      if (this._isSymbolValue(token, Symbol.RightParen)) parenCount--;
      if (this._isSymbolValue(token, Symbol.Comma) && parenCount === 0)
        ints.push(i);
    }

    return ints;
  }

  private _findClosingParen(startIndex: number): number {
    let parenCount = 0;
    for (let i = startIndex; i < this._tokens.length; i++) {
      const token = this._tokens[i];
      if (this._isSymbolValue(token, Symbol.LeftParen)) parenCount++;
      else if (this._isSymbolValue(token, Symbol.RightParen)) {
        parenCount--;
        if (parenCount === 0) return i;
      }
    }

    return -1;
  }

  private _findSemicolon(startIndex: number): number {
    for (let i = startIndex; i < this._tokens.length; i++) {
      const token = this._tokens[i];
      if (this._isSymbolValue(token, Symbol.Semicolon)) return i;
    }

    return -1;
  }

  private _isSymbolIn(token: Token, symbols: Set<number>): boolean {
    const value = this._symbols.symbols.get(token.value);
    return (
      token !== null &&
      token.tokenType === TokenType.Symbol &&
      symbols.has(value!)
    );
  }

  private _isSymbolValue(token: Token, symbolValue: number): boolean {
    const value = this._symbols.symbols.get(token.value);
    return (
      token !== null &&
      token.tokenType === TokenType.Symbol &&
      token &&
      value === symbolValue
    );
  }

  // private _assertSymbolValue(token: Token, symbolValue: Symbol) {
  //   if (token === null || token. tokenType !== TokenType.Symbol || token.value)
  // }
}
