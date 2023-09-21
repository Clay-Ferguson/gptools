import * as vscode from "vscode";
import axios from "axios";

const SECRETS_STORE_KEY = "openai-api-key";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-3.5-turbo";

class ChatMessage {
	role: string = "";
	content: string = "";
}

class ChatGPTRequest {
	user: string = "";
	model: string = OPENAI_MODEL;
	messages: ChatMessage[] = [];
	temperature: number = 0.7;
}

export async function activate(context: vscode.ExtensionContext) {
	let apiKey = await context.secrets.get(SECRETS_STORE_KEY);

	if (!apiKey) {
		apiKey = await vscode.window.showInputBox({ prompt: "Enter your OpenAI API Key" });
		if (apiKey) {
			await context.secrets.store(SECRETS_STORE_KEY, apiKey);
		} else {
			vscode.window.showErrorMessage("API Key is required to use this extension.");
			return;
		}
	}

	addMenuCommand(context, "gptools.genJavaDocs", () => {
		executeWithProgress(() => generateJavaDocs(context));
	});

	addMenuCommand(context, "gptools.generalPrompt", () => {
		executeWithProgress(() => generalPrompt(context));
	});
}

function executeWithProgress(callback: () => void) {
	vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: "Processing. Do not edit file now. Please wait...",
		cancellable: true
	}, async (progress, token) => {
		progress.report({ increment: 0 });
		await callback();
		progress.report({ increment: 100 });
	});
}

function addMenuCommand(context: vscode.ExtensionContext, command: string, callback: () => void) {
	let disposable = vscode.commands.registerCommand(command, callback);
	context.subscriptions.push(disposable);
}

async function generateJavaDocs(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const selection = editor.selection;
		const selText = editor.document.getText(selection);

		const req = new ChatGPTRequest();
		req.messages.push({ role: "system", content: "You are an experienced Java developer" });
		req.messages.push({ role: "user", content: `Generate the Javadoc for the following Java method below. Only provide the Javadoc comment itself:\n ${selText}` });

		const answer = await askGpt(context, req);

		// Insert above selected text
		const edit = new vscode.TextEdit(
			new vscode.Range(selection.start, selection.start),
			answer + "\n"
		);
		const workspaceEdit = new vscode.WorkspaceEdit();
		workspaceEdit.set(editor.document.uri, [edit]);
		vscode.workspace.applyEdit(workspaceEdit);
	}
}

async function generalPrompt(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const selection = editor.selection;
		const selText = editor.document.getText(selection);

		const req = new ChatGPTRequest();
		// Note: We intentionally don't provide a system prompt here
		req.messages.push({ role: "user", content: selText });

		const answer = await askGpt(context, req);
		const position = editor.selection.end.translate(1, 0);

		// Insesrt below selected text
		editor.edit(editBuilder => {
			editBuilder.insert(position, "\n\nGPT: " + answer + "\n");
		});
	}
}

async function askGpt(context: vscode.ExtensionContext, req: ChatGPTRequest) {
	const apiKey = await context.secrets.get(SECRETS_STORE_KEY);
	if (!apiKey) {
		vscode.window.showInformationMessage("API Key not found");
		return;
	}

	const response: any = await axios.post(OPENAI_ENDPOINT, req, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${apiKey}`,
		},
	});

	return response.data.choices[0].message.content;
}

export function deactivate() { }
