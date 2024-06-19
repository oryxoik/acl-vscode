import { Token } from "../lexer/Token";
import { TokenType } from "../lexer/TokenType";

export function isTokenType(token: Token, ...types: TokenType[]) {
    return types.includes(token.type);
}

export function isTokenNotOfType(token: Token, ...types: TokenType[]) {
    return !isTokenType(token, ...types);
}

export function isNextTokenOfType(tokens: Token[], i: number, offset: number, ...tokenTypes: TokenType[]): boolean {
    if (i + offset >= tokens.length) return false;
    return isTokenType(tokens[i + offset], ...tokenTypes);
}

export function isPreviousTokenOfType(tokens: Token[], i: number, offset: number, ...tokenTypes: TokenType[]): boolean {
    if (i - offset < 0) return false;
    return isTokenType(tokens[i - offset], ...tokenTypes);
}

export function isPreviousTokenNotOfType(tokens: Token[], i: number, offset: number, ...tokenTypes: TokenType[]): boolean {
    if (i - offset < 0) return false;
    return isTokenNotOfType(tokens[i - offset], ...tokenTypes);
}
