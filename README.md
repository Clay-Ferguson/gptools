# GPTools - VSCode Extension for ChatGPT

This is a VSCode extension for making calls to OpenAI GPT to get information related to the selected text in the editor. The extension adds menu items to the right-click menu on the editor, which can do GPT-related queries.

You will be prompted to enter an OpenAI API Key, to use the plugin, which is stored securely in your VSCode.

There are currently two menu items 1) JavaDocs and 2) General Questions. See usage below.

## Note:

This extension is not yet available in the `VSCode Extension Marketplace`, because it is in pre-alpha stage developmen, but it does work perfectly and is already in a near-production ready state. 

## Usage

### JavaDocs Generation

Select an entire method in a java file including method name, arguments, all the way down to the final closing brace, and right click on it, and select "Generate JavaDocs" from the popup menu. This will then query OpenAI to generate JavaDocs, and then inserts the JavaDocs directly above the method

### General Prompt

Select any text in your editor and right-click on it and choose "General Prompt" from the popup menu. This will get the answer to that question from GPT and insert the answer below the selected text in the editor.

## Resources

[Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Development Tips

* To run use "Menu -> Run -> Start Debugging". This opens up a separate VSCode window to test the extension in.

* Press "CTRL-R" in the extension test window to reload. It recompiles and re-runs your new extension code automatically.

## Creating in Installable Extension (VSIX file)

To create an installable extension (vsix file), first install the VSCode Extensions Command line tool like this:

    npm install -g @vscode/vsce

which you of course only have to do once.

Then you can generate the install file like this:

    vsce package

Those commands should be run in the root of the project.

After you run those commands you will have a file named gptools-0.0.1.vsix file in your root folder, and you can run this to install it into your VSCode

    code --install-extension gptools-0.0.1.vsix

