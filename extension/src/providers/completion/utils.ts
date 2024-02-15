import { allTokens, tokensMap } from ".";
import { TokenType } from "../../lexer/TokenType";
import { Token } from "../../lexer/token";

export function getPreviousToken(currentToken: Token): Token {
  const i = allTokens.indexOf(currentToken);
  if (i - 1 < 0) return null;
  return allTokens[i - 1];
}

export function findNearestLeftCurly(currentToken: Token): number {
  let currentIndex = allTokens.indexOf(currentToken);
  let ignoreCount = 0;

  while (currentIndex >= 0) {
    if (allTokens[currentIndex].type === TokenType.RightCurly) ignoreCount++;

    if (allTokens[currentIndex].type === TokenType.LeftCurly) {
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
      (allTokens[currentIndex].type === TokenType.Class ||
        allTokens[currentIndex].type === TokenType.Component ||
        allTokens[currentIndex].type === TokenType.Extension ||
        allTokens[currentIndex].type === TokenType.Cutscene) &&
      allTokens[currentIndex + 1].type === TokenType.Identifier
    )
      return allTokens[currentIndex + 1];

    currentIndex--;
  }

  return null;
}

export function isInsideFunctionScope(currentIndex: number) {
  while (currentIndex >= 0) {
    if (
      allTokens[currentIndex].type === TokenType.Class ||
      allTokens[currentIndex].type === TokenType.Component ||
      allTokens[currentIndex].type === TokenType.Extension ||
      allTokens[currentIndex].type === TokenType.Cutscene
    )
      return { isFunc: false, idToken: null };

    if (
      allTokens[currentIndex].type === TokenType.Function &&
      allTokens[currentIndex + 1].type === TokenType.Identifier
    ) {
      const identifierToken = allTokens[currentIndex + 1];
      return { isFunc: true, idToken: identifierToken };
    }

    currentIndex--;
  }

  return { isFunc: false, idToken: null };
}

export function findNearestLine(line: number): number {
  while (line >= 0) {
    if (tokensMap.has(line)) return line;
    line--;
  }

  return tokensMap.keys()[tokensMap.size - 1];
}

export function findNearestPreviousToken(line: number, offset: number): Token {
  const currentLine = findNearestLine(line);
  const currentTokens = tokensMap.get(currentLine);

  let nearest: Token | null = null;
  let minOffset = Number.MAX_SAFE_INTEGER;
  currentTokens.forEach((token) => {
    const dist = Math.abs(offset - token.startIndex);
    if (dist < minOffset) {
      nearest = token;
      minOffset = dist;
    }
  });

  return nearest;
}
