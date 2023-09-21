# GPTools - VSCode Extension for ChatGPT

This is a VSCode extension for making calls to OpenAI GPT to get information related to the selected text in the editor. The extension adds menu items to the right-click menu on the editor, which can do GPT-related queries.

You will be prompted to enter an OpenAI API Key, to use the plugin, which is stored securely in your VSCode.

There are currently two menu items 1) JavaDocs and 2) General Questions. See usage below.

## Usage

### JavaDocs Generation

Select an entire method in a java file including method name, arguments, all the way down to the final closing brace, and right click on it, and select "Generate JavaDocs" from the popup menu. This will then query OpenAI to generate JavaDocs, and then inserts the JavaDocs directly above the method

### General Prompt

Select any text in your editor and right-click on it and choose "General Prompt" from the popup menu. This will get the answer to that question from GPT and insert the answer below the selected text in the editor.

## Development Tips

* To run use "Menu -> Run -> Start Debugging". This opens up a separate VSCode window to test the extension in.

* Press "CTRL-R" in the extension test window to reload. It recompiles and re-runs your new extension code automatically.

## About

I wrote this plugin for several reasons. Firstly the Github Copilot Plugin is great, and I use it constantly during development, but I was not satisfied with their design for performing certain refactorings (namely the compile one line at a time approach to JavaDocs). I think the GPTools is just a better way to generate JavaDocs, than what Copilot currently does. Also GPTools will offer a different set of capabilities than Copilot.

However, the larger objective of GPTools is to be a generalized query interface for OpenAI (and other AI LLMs) where prompt engineering, and advanced prompting, can be specified in various ways in various different kinds of files that VSCode can edit, so GPTools will be useful for allowing custom prompting right from inside VSCode. I plan to allow various Prompt Templates to be user definable, etc.

## Future Features: Chat in VSCode

I also plan to have a standard "Chat" capability implemented as a text file that contains the conversation, such that the entire file is used as the "context" for the conversation, and each paragrah starting with "me:" will be the person asking a question; and responses from gpt will start with "gpt:". Using that simple syntax we can easily have long chat conversations right inside the VSCode editor. 




