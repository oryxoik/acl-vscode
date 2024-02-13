import { IdentifierToken } from "./IdentifierToken";

export class VariableAssignment {
    readonly Identifier: IdentifierToken;
    readonly KnownValue: string;

    constructor(id: IdentifierToken, value: string) {
        this.Identifier = id;
        this.KnownValue = value;
    }
}