export enum TokenType {
  LeftCurly,
  RightCurly,
  LeftParen,
  RightParen,

  Semicolon,
  Comma,
  Dot,
  Ampersand,
  AmpersandAmpersand,
  Pipe,
  PipePipe,

  Minus,
  MinusEqual,
  Plus,
  PlusEqual,
  Star,
  StarEqual,
  Slash,
  SlashEqual,

  Bang,
  BangEqual,
  Equal,
  EqualEqual,
  Greater,
  GreaterEqual,
  Less,
  LessEqual,

  Identifier,
  String,
  Number,
  Comment,

  Class,
  Cutscene,
  Component,
  Extension,

  Self,

  Function,
  Coroutine,

  Wait,
  Null,
  Return,
  If,
  Else,
  ElseIf,
  For,
  While,
  In,
  True,
  False,

  Eof,
}
