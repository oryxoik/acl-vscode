const isCharacterAlphaNumeric = (c: string): boolean => isCharacterAlpha(c) || isCharacterDigit(c);
const isCharacterDigit = (c: string): boolean => c >= "0" && c <= "9";
const isCharacterAlpha = (c: string): boolean => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_";
