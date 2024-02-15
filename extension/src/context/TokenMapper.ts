// import {
//   FileCreateEvent,
//   TextDocument,
//   TextDocumentChangeEvent,
//   Uri,
// } from "vscode";
// import Scanner from "../lexer/Scanner";
// import { Token } from "../lexer/Token";

// export default class TokenMapper {
//   private readonly _scanner: Scanner;
//   public readonly tokens: Map<Uri, Token[]>;

//   constructor() {
//     this._scanner = new Scanner();
//     this.tokens = new Map<Uri, Token[]>();
//   }

//   onDocumentOpen(textDocument: TextDocument) {
//     if (textDocument.languageId != "acl") return;
//     if (this.tokens.has(textDocument.uri)) return;

//     this.scanDocument(textDocument);
//     console.log("open");
//     console.log(this.tokens);
//   }

//   onDocumentChanged(e: TextDocumentChangeEvent) {
//     if (e.document.languageId != "acl") return;
//     console.log("changed before");
//     this.scanDocument(e.document);
//     console.log("changed");
//   }

//   scanDocument(textDocument: TextDocument) {
//     const scannedTokens = this._scanner.scan(textDocument.getText());
//     this.tokens.set(textDocument.uri, scannedTokens);
//   }
//   isCustomLogicDocument(textDocument: TextDocument): boolean {
//     console.log(textDocument.languageId);
//     return textDocument.languageId === "acl";
//   }
// }
