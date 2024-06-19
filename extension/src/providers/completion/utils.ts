import { TokenType } from "../../lexer/TokenType";
import { Token } from "../../lexer/Token";
import * as parser from "../../parser";

export function getPreviousToken(currentToken: Token): Token {
    const i = parser.allTokens.indexOf(currentToken);
    if (i - 1 < 0) return null;
    return parser.allTokens[i - 1];
}

export function findNearestLeftCurly(currentToken: Token): number {
    let currentIndex = parser.allTokens.indexOf(currentToken);
    let ignoreCount = 0;

    while (currentIndex >= 0) {
        if (parser.allTokens[currentIndex].type === TokenType.RightCurly) ignoreCount++;

        if (parser.allTokens[currentIndex].type === TokenType.LeftCurly) {
            if (ignoreCount == 0) return currentIndex;
            ignoreCount--;
        }

        currentIndex--;
    }

    return -1;
}

export function findTypeIdentifier(currentIndex: number): Token {
    while (currentIndex >= 0) {
        if (
            (parser.allTokens[currentIndex].type === TokenType.Class ||
                parser.allTokens[currentIndex].type === TokenType.Component ||
                parser.allTokens[currentIndex].type === TokenType.Extension ||
                parser.allTokens[currentIndex].type === TokenType.Cutscene) &&
            parser.allTokens[currentIndex + 1].type === TokenType.Identifier
        )
            return parser.allTokens[currentIndex + 1];

        currentIndex--;
    }

    return null;
}

export function isInsideFunctionScope(currentIndex: number) {
    while (currentIndex >= 0) {
        if (
            parser.allTokens[currentIndex].type === TokenType.Class ||
            parser.allTokens[currentIndex].type === TokenType.Component ||
            parser.allTokens[currentIndex].type === TokenType.Extension ||
            parser.allTokens[currentIndex].type === TokenType.Cutscene
        )
            return { isFunc: false, idToken: null };

        if (parser.allTokens[currentIndex].type === TokenType.Function && parser.allTokens[currentIndex + 1].type === TokenType.Identifier) {
            const identifierToken = parser.allTokens[currentIndex + 1];
            return { isFunc: true, idToken: identifierToken };
        }

        currentIndex--;
    }

    return { isFunc: false, idToken: null };
}

export function findNearestLine(line: number): number {
    while (line >= 0) {
        if (parser.tokensMap.has(line)) return line;
        line--;
    }

    return parser.tokensMap.keys()[parser.tokensMap.size - 1];
}

export function findNearestPreviousToken(line: number, offset: number): Token {
    const currentLine = findNearestLine(line);
    const currentTokens = parser.tokensMap.get(currentLine);

    let nearest: Token | null = null;
    let minOffset = Number.MAX_SAFE_INTEGER;
    currentTokens.forEach((token) => {
        const dist = Math.abs(offset - (token.startIndex + 1));
        if (dist < minOffset) {
            nearest = token;
            minOffset = dist;
        }
    });

    return nearest;
}
