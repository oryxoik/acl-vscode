import { Token } from "../lexer/Token";

interface BaseDefinition {
    typeToken: Token;
    identifierToken: Token;
    variables: Map<string, Token>;
}

/**
 * Type definition is the definition of a class, component, extension, or cutscene
 * Each document can have multiple type definitions
 */
export interface TypeDefinition extends BaseDefinition {
    /**
     * Map of function name to function definition
     */
    functions: Map<string, FunctionDefinition>;

    /**
     * List of call expressions in this type
     */
    callExpressions: Token[];

    /**
     * List of member access expressions in this type
     */
    memberAccesss: MemberAccessExpression[];

    /**
     * List of variable assignment expressions in this type
     */
    variableAssignment: VariableAssignmentExpression[];
}

interface MemberAccessExpression {
    parent: Token;
    member: Token;
}

interface VariableAssignmentExpression {
    identifierToken: Token;
    knownValue: string;
}

export interface FunctionDefinition extends BaseDefinition {}

export function createTypeDefinition(typeToken: Token, identifierToken: Token): TypeDefinition {
    return {
        typeToken,
        identifierToken,
        variables: new Map<string, Token>(),
        functions: new Map<string, FunctionDefinition>(),
        callExpressions: [],
        memberAccesss: [],
        variableAssignment: [],
    };
}

export function createFunctionDefinition(typeToken: Token, identifierToken: Token): FunctionDefinition {
    return {
        typeToken,
        identifierToken,
        variables: new Map<string, Token>(),
    };
}

export function tryAddVariableToDefinition(def: BaseDefinition, token: Token) {
    if (def.variables.has(token.lexeme)) return false;
    def.variables.set(token.lexeme, token);
    return true;
}
