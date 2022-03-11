# Cover Letter Generator Bot

#### Kyle Mackenzie - March 10, 2022

###### [GitHub Repo](github.com/1mackenziekyle/cover-letters)

###### [Demo Video](https://youtu.be/ru7St3sewZM)

###### [Contact Me](https://1mackenziekyle.github.io/personal-website/#/contact)

## Project Outline

Ever feel like a robot applying to dozens of software jobs using the same templates and changing the company name, job title, etc.?

Ever wish you could get someone else to do it? Look no further.

This tool will take cover letter templates made by you, get all the job board data inside of your shortlist, and generate cover letters for each and every one of them. The program is calibrated to produce cover letters of 3 types:

- Full-stack software jobs
- Front-end software jobs
- Back-end software jobs

This project is made to customize, so I have made the parameters clear in the code for you to fiddle around with. Please feel free to give me any sort of feedback under my [Contact Form](https://1mackenziekyle.github.io/personal-website/#/contact)

## How to use:

Requires that you have Python, Node.js, Robocorp VS Code Extension, Bash installed.

- Copy this repository
- copy from **input/template.json** and enter your info into a new file called **input/userinfo.json**
- add your cover letter templates for front-end, back-end, and full-stack jobs under /input folder and edit the template name variables at the top of **task.js**
- in your template word docs, use any or all of the variables:

  - {FULLNAME}
  - {PROGRAM}
  - {EMAIL}
  - {CELL_NUMBER}
  - {JOB_TITLE}
  - {ORGANIZATION}
  - {LOCATION}
  - {DATE}

  to replace the information you would usually write in your cover letter. Of course, you can leave some blank for security reasons, and manually enter, but the bot will need your UBC credentials to run.

- once you have Robocorp extension on VS Code, open this project, open the Command Palette (Ctrl+Shift+P) and execute the 'Robocorp: Run Robot' command 
- once you run it, copy the initial command and replace the first command under 'Run python' on GenerateCoverLetters.sh. It should look similar.
- Run the run.sh file from your file explorer or use command "./run.sh" or "Bash run.sh" in your Bash terminal or VS Code integrated terminal.

## How it Works:

This project:

- Uses Python and Robot Framework for navigating through login screens and authentication.
- Uses Pandas for fetching and storing data from the Job Board
- Runs a Node.js program that calls the Python script and handles data in JSON from the python script
- Uses docxtemplater to generate the .docx files from a template

## Important:

If you are using this program, make sure you **_do not upload any of your UBC login information to GitHub_**. Pay close attention to the .gitignore files in the _input_ and _output/cover-letters/\*_ folders.

##### Kyle Mackenzie 2022
