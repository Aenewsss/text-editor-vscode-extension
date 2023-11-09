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
							const textSplitted = highlighted.split(" ")
							const textSplittedCapitalized = textSplitted.map(el => el[0].toUpperCase() + el.slice(1, el.length))
							const textCapitalized = textSplittedCapitalized.toString().replaceAll(",", " ")

							editor.edit(selection => selection.replace(selectionRange, textCapitalized))
							vscode.window.showInformationMessage('Text changed!')
							break;
						case 'First letter capitalize':
							const lowerCaseText = highlighted.toLocaleLowerCase()
							const firstLetterCapitalized = lowerCaseText[0].toUpperCase()
							const formattedText = firstLetterCapitalized + lowerCaseText.slice(1, lowerCaseText.length)

							editor.edit(selection => selection.replace(selectionRange, formattedText))
							vscode.window.showInformationMessage('Text changed!')
							break;
						case 'CAPS LOCK':
							editor.edit(selection => selection.replace(selectionRange, highlighted.toUpperCase()))
							vscode.window.showInformationMessage('Text changed!')
							break;
						case 'Lowercase':
							editor.edit(selection => selection.replace(selectionRange, highlighted.toLocaleLowerCase()))
							vscode.window.showInformationMessage('Text changed!')
							break;
					}
				})
			} else vscode.window.showErrorMessage('You must select a text')
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
