// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "edit-text-aenewsss" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('edit-text-aenewsss.helloWorld', () => {

		// vscode.window.showInputBox()
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			let { selection } = editor;

			if (selection && !selection.isEmpty) {
				const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
				const highlighted = editor.document.getText(selectionRange);

				const quickPick = vscode.window.createQuickPick()

				quickPick.items = [{
					label: 'Capitalize',
				},
				{
					label: 'First letter capitalize',
				},
				{
					label: 'CAPS LOCK',
				},
				{
					label: 'Lowercase',
				}]

				quickPick.show()
				quickPick.onDidChangeSelection(item => {
					const operator = item[0].label

					switch (operator) {
						case 'Capitalize':
							editor.edit(test => test.replace(selectionRange, highlighted.toLocaleLowerCase()))
							break;
						case 'First letter capitalize':
							editor.edit(test => test.replace(selectionRange, highlighted.toLocaleLowerCase()))
							break;
						case 'CAPS LOCK':
							editor.edit(test => test.replace(selectionRange, highlighted.toUpperCase()))
							break;
						case 'Lowercase':
							editor.edit(test => test.replace(selectionRange, highlighted.toLocaleLowerCase()))
							break;
					}
				})
				vscode.window.showInformationMessage('Text changed!')
			} else vscode.window.showErrorMessage('You must select a text')
		}

		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
