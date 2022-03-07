# Project Outline

This project

- Uses Python and Robot Framework for navigating through login screens and authentication.
- Uses BeautifulSoup and Pandas for fetching and storing data
- Runs a Node.js server that calls the Python script and handles data in JSON from the script
- Uses docxtemplater to generate the .docx files

# How to use:

Requires: Python, Node.js, Robocorp VS Code Extension

- Copy this repository
- make a new folder called /input
- add your cover letter template under /input folder and edit the variable 'templateName' in task.js (mine is cover-letter-template.docx)
- in your template word doc, use the variables {JOB_TITLE}, {ORGANIZATION}, {LOCATION}. {DATE}.
- add file: input/user.txt that includes your UBC CWL login, followed by the password on the line below (no quotes, just what you would type in the box)
- once you have Robocorp extension on VS Code, open this project and use 'Robocorp: Run Robot' command from VS Code's Command Palette (Ctrl+Shift+P)
- once you run it, copy the initial command and replace the first command under 'Run python' on GenerateCoverLetters.sh, which can be done easily through VS Code. It should look similar.
- run GenerateCoverLetters.sh from your file explorer

##### Kyle Mackenzie 2022
