import { Token } from "./parser/Token";

export class IdentifierToken
{
    readonly Text: string;
    readonly Token: Token;

    constructor(text: string, token: Token)
    {
        this.Text = text;
        this.Token = token;
    }
}