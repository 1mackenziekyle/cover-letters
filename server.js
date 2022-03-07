// modules
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const { exec } = require("child_process");

// Constants
const PORT = 3000;
const content = fs.readFileSync(
  path.resolve(__dirname, "input/cover-letter-template.docx")
);
const zip = new PizZip(content);

// App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get data from server
app.get("/", (req, res) => {
  console.log("GET Method");
  var pythonData;

  // run python script
  exec(
    'cd c:\\Users\\1mack\\projects\\python\\job_app_tool_rf ; /usr/bin/env C:\\Users\\1mack\\AppData\\Local\\robocorp\\temp\\4d65822107fca24e\\rf-ls-run\\run_env_00_3e\\extensions\\robocorp.robocorp-code-0.27.1\\bin\\rcc.exe task run --robot c:\\Users\\1mack\\projects\\python\\job_app_tool_rf\\robot.yaml --space vscode-05 --taskode n Python" --controller RobocorpCo',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
});

// Send data to server
app.post("/", (req, res) => {
  console.log("POST Method");
  const jsonData = req.body.toString();
  for (const [key, value] of Object.entries(jsonData)) {
    console.log(key, value);
    generate_doc(value);
  }
});

// on startup
app.listen(PORT, () => {
  console.log("LISTEN method");
  console.log("Server is running on", PORT, "\n");
});

//////////////////////////

function generate_doc(json) {
  const data = JSON.parse(json);
  // load input doc as binary
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Replace words in doccument
  doc.render({
    ORGANIZATION: data.ORGANIZATION,
    JOB_TITLE: data.JOB_TITLE,
    LOCATION: data.LOCATION,
    DATE: Date.now(),
  });

  // generate file
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  fs.writeFileSync(
    path.resolve(
      __dirname,
      "output/cover-letter-" + json.ORGANIZATION.toString() + ".docx"
    ),
    buf
  );
}
