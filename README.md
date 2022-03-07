# Project Outline

This project

- Uses Python and Robot Framework for navigating through login screens and authentication.
- Uses BeautifulSoup and Pandas for fetching and storing data
- Runs a Node.js server that calls the Python script and handles data in JSON from the script
- Uses docxtemplater to generate the .docx files

# How to use:

- Copy this repository
- make a new folder called /input
- add your cover letter template under /input folder and edit the variable 'templateName' in task.js (mine is cover-letter-template.docx)
- in your template word doc, use the variables {JOB_TITLE}, {ORGANIZATION}, {LOCATION}. {DATE}.
- add file: input/user.txt that includes your UBC CWL login in this format (I have removed this from .gitignore so that you can't see mine).

####user.txt

####/////////////////////

####CWLusername

####CWLpassword

##### Kyle Mackenzie 2022
