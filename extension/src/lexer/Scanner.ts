import { Token, createToken } from "./Token";
import { TokenType } from "./TokenType";
import keywords from "./keywords";
import { isCharacterAlpha, isCharacterDigit, isCharacterAlphaNumeric } from "./lexer";

/**
 * Tokenizes the given source code and returns an array of tokens.
 *
 * @param {string} source - The source code to tokenize.
 * @return {Token[]} An array of tokens representing the source code.
 */
function tokenize(source: string): Token[] {
    const tokens: Token[] = [];
    var start = 0;
    var current = 0;
    var line = 0;

    const isAtEnd = () => current >= source.length;
    const advance = () => source[current++];
    const peek = () => (isAtEnd() ? "\0" : source[current]);
    const peekNext = () => (current + 1 >= source.length ? "\0" : source[current + 1]);
    const addToken = (type: TokenType, length: number | null = null) => {
        length ??= current - start;
        tokens.push(createToken(type, source.substring(start, current), line, start, length));
    };
    const addSingleCharToken = (type: TokenType, value: string) => tokens.push(createToken(type, value, line, start, 1));

    while (!isAtEnd()) {
        start = current;
        const c = advance();
        switch (c) {
            case "(":
                addSingleCharToken(TokenType.LeftParen, "(");
                break;
            case ")":
                addSingleCharToken(TokenType.RightParen, ")");
                break;
            case "{":
                addSingleCharToken(TokenType.LeftCurly, "{");
                break;
            case "}":
                addSingleCharToken(TokenType.RightCurly, "}");
                break;
            case ";":
                addSingleCharToken(TokenType.Semicolon, ";");
                break;
            case ",":
                addSingleCharToken(TokenType.Comma, ",");
                break;
            case ".":
                addSingleCharToken(TokenType.Dot, ".");
                break;
            case "-":
                addToken(match("=") ? TokenType.MinusEqual : TokenType.Minus);
                break;
            case "+":
                addToken(match("=") ? TokenType.PlusEqual : TokenType.Plus);
                break;
            case "*":
                addToken(match("=") ? TokenType.StarEqual : TokenType.Star);
                break;
            case "/":
                if (peek() == "*") {
                    scanBlockComment();
                } else addToken(match("=") ? TokenType.SlashEqual : TokenType.Slash);
                break;
            case "!":
                addToken(match("=") ? TokenType.BangEqual : TokenType.Bang);
                break;
            case "&":
                addToken(match("&") ? TokenType.AmpersandAmpersand : TokenType.Ampersand);
                break;
            case "|":
                addToken(match("|") ? TokenType.PipePipe : TokenType.Pipe);
                break;
            case "=":
                addToken(match("=") ? TokenType.EqualEqual : TokenType.Equal);
                break;
            case "<":
                addToken(match("=") ? TokenType.LessEqual : TokenType.Less);
                break;
            case ">":
                addToken(match("=") ? TokenType.GreaterEqual : TokenType.Greater);
                break;
            case "#":
                scanComment();
                break;
            case " ":
            case "\r":
            case "\t":
                // Ignore whitespace.
                break;
            case "\n":
                line++;
                break;
            case '"':
                scanString();
                break;
            default: {
                if (isCharacterDigit(c)) scanNumber();
                else if (isCharacterAlpha(c)) scanIdentifier();
                else console.log(`[${line}]: Unexpected character ${c}.`);
                break;
            }
        }
    }

    tokens.push(createToken(TokenType.Eof, "", line, source.length - 2, 1));

    return tokens;

    function scanComment() {
        while (peek() !== "\n" && !isAtEnd()) {
            advance();
        }
    }

    function scanBlockComment() {
        while (!isAtEnd()) {
            if (peek() === "\n") line++;
            if (peek() === "*" && peekNext() === "/") {
                advance();
                advance();
                break;
            }
            advance();
        }
        if (isAtEnd()) console.log(`${line} Unclosed block comment`);
    }

    function scanIdentifier() {
        while (isCharacterAlphaNumeric(peek())) {
            advance();
        }
        const text = source.substring(start, current);

        var type: TokenType = keywords.has(text) ? keywords.get(text) ?? TokenType.Identifier : TokenType.Identifier;

        addToken(type);
    }

    function scanNumber() {
        while (isCharacterDigit(peek())) advance();
        if (peek() === "." && isCharacterDigit(peekNext())) {
            // Consume '.'
            advance();
            while (isCharacterDigit(peek())) advance();
        }
        addToken(TokenType.Number);
    }

    function scanString() {
        while (peek() !== '"' && !isAtEnd()) {
            if (peek() === "\n") line++;
            advance();
        }
        // Unterminated string.
        if (isAtEnd()) {
            console.log(`[${line}]: Unterminated string.`);
            return;
        }
        // The closing ".
        advance();
        // Trim the surrounding quotes.
        addToken(TokenType.String, current - 1 - (start + 1));
    }

    function match(expectedChar: string): boolean {
        if (isAtEnd()) return false;
        if (source[current] !== expectedChar) return false;
        current++;
        return true;
    }
}

export default tokenize;
