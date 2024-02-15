import { FunctionDefinition, TypeDefinition } from "../definitions";
import { TokenType } from "../lexer/TokenType";
import { Token, createToken } from "../lexer/token";

export const GameBuiltin = createBuiltinExtension(
  "Game",
  ["IsEnding", "PVP"],
  ["Print", "Debug"]
);
export const MathBuiltin = createBuiltinExtension("Math", [], ["Sin", "Cos"]);

function createBuiltinExtension(
  id: string,
  variables: string[],
  functions: string[]
) {
  return createBuiltinType(TokenType.Extension, id, variables, functions);
}
function createBuiltinType(
  type: TokenType,
  identifier: string,
  variables: string[],
  functions: string[]
): TypeDefinition {
  const variablesMap = new Map<string, Token>();
  const functionsMap = new Map<string, FunctionDefinition>();
  variables.forEach((v) => {
    variablesMap.set(v, createToken(TokenType.Identifier, v, -1, -1, -1));
  });
  functions.forEach((f) => {
    functionsMap.set(f, {
      typeToken: createToken(TokenType.Function, "", -1, -1, -1),
      identifierToken: createToken(TokenType.Identifier, f, -1, -1, -1),
      variables: new Map<string, Token>(),
    });
  });
  return {
    typeToken: createToken(type, "", -1, -1, -1),
    identifierToken: createToken(TokenType.Identifier, identifier, -1, -1, -1),
    callExpressions: [],
    memberAccesss: [],
    variableAssignment: [],
    variables: variablesMap,
    functions: functionsMap,
  };
}

export default [GameBuiltin, MathBuiltin];
