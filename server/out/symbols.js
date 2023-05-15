"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbols = void 0;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
exports.symbols = [
    {
        name: "Game",
        kind: vscode_languageserver_types_1.CompletionItemKind.Class,
        description: "None",
        subSymbols: [
            {
                name: "IsEnding",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Is the game currently ending.",
            },
            {
                name: "EndTimeLeft",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Time left before game restarts.",
            },
            {
                name: "Print",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints in the chat",
            },
            {
                name: "Debug",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Logs the text in the debug console",
            },
            {
                name: "PrintAll",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints a message to all players chat window.",
            },
        ],
    },
    {
        name: "Titan",
        kind: vscode_languageserver_types_1.CompletionItemKind.Class,
        description: "None",
        subSymbols: [
            {
                name: "IsEnding",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Is the game currently ending.",
            },
            {
                name: "EndTimeLeft",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Time left before game restarts.",
            },
            {
                name: "Print",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints in the chat",
            },
            {
                name: "Debug",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Logs the text in the debug console",
            },
            {
                name: "PrintAll",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints a message to all players chat window.",
            },
        ],
    },
    {
        name: "UI",
        kind: vscode_languageserver_types_1.CompletionItemKind.Class,
        description: "None",
        subSymbols: [
            {
                name: "IsEnding",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Is the game currently ending.",
            },
            {
                name: "EndTimeLeft",
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                description: "(Readonly) Time left before game restarts.",
            },
            {
                name: "Print",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints in the chat",
            },
            {
                name: "Debug",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Logs the text in the debug console",
            },
            {
                name: "PrintAll",
                kind: vscode_languageserver_types_1.CompletionItemKind.Method,
                description: "Prints a message to all players chat window.",
            },
        ],
    },
];
//# sourceMappingURL=symbols.js.map