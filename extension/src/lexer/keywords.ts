import { TokenType } from "./TokenType";

const keywords = new Map<string, TokenType>();
keywords.set("class", TokenType.Class);
keywords.set("cutscene", TokenType.Cutscene);
keywords.set("component", TokenType.Component);
keywords.set("extension", TokenType.Extension);
keywords.set("function", TokenType.Function);
keywords.set("coroutine", TokenType.Coroutine);
keywords.set("self", TokenType.Self);
keywords.set("wait", TokenType.Wait);
keywords.set("null", TokenType.Null);
keywords.set("return", TokenType.Return);
keywords.set("if", TokenType.If);
keywords.set("else", TokenType.Else);
keywords.set("elif", TokenType.ElseIf);
keywords.set("for", TokenType.For);
keywords.set("while", TokenType.While);
keywords.set("in", TokenType.In);
keywords.set("true", TokenType.True);
keywords.set("false", TokenType.False);

export default keywords;
