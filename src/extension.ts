import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "experiment" is now active!');

  let disposable = vscode.commands.registerCommand(
    "experiment.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from experiment!");
      vscode.window.showErrorMessage("Hello World from experiment!");
    }
  );

  context.subscriptions.push(disposable);
}
