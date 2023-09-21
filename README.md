# GPTools - VSCode Extension for ChatGPT

This is a VSCode extension for making calls to OpenAI GPT to get information related based on the selected text in the editor. The extension adds menu items to the right-click menu on the editor, which can do GPT-related queries.

You will be prompted to enter an OpenAI API Key, to use the plugin, which is stored securely in your VSCode plugin.

There are currently two menu items 1) JavaDocs and 2) General Questions. See usage below.

## Usage

### JavaDocs Generation

Select an entire method in a java file including method name, arguments, all the way down to the final closing brace, and right click on it, and select "Generate JavaDocs" from the popup menu. This will then query OpenAI to generate JavaDocs, adn then inserts the JavaDocs directly above the method

### General Prompt

Select any text in your editor and do a right-click on it and choose "General Prompt" from the popup menu. This will get the answer to that question from GPT and insert it below the selected text in the editor.

## Development Tips

* To run use "Menu -> Run -> Start Debugging". This opens up a separate VSCode window to test the extension in.

* Press "CTRL-R" in the extension test window to reload. It recompiles and re-runs your new extension code.