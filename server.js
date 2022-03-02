// modules
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const { spawn } = require("child_process");

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

var server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end("Hello world\n");
});

// Get data from server
app.get("/", (req, res) => {
  res.status(200).send("Hello world.\n");
  // run robot script
  const python = spawn(
    'cd c:\\Users\\1mack\\projects\\python\\job_app_tool_rf ; /usr/bin/env C:\\Users\\1mack\\AppData\\Local\\robocorp\\temp\\4d65822107fca24e\\rf-ls-run\\run_env_00_gvfdxkn0.bat c:\\Users\\1mack\\.vscode\\extensions\\robocorp.robocorp-code-0.27.1\\bin\\rcc.exe task run --robot c:\\Users\\1mack\\projects\\python\\job_app_tool_rf\\robot.yaml --space vscode-05 --task "Run Python" --controller RobocorpCode',
    ["task.py"]
  );
  python.stdout.on("data", (data) => {
    console.log("Data from python script: ");
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    python.on("close", (code) => {
      console.log("script closed all stdio with ", code);
    });
  });
});

// Send data to server
app.post("/postdata", (req, res) => {
  const jsonData = req.body;
  for (const [key, value] of Object.entries(jsonData)) {
    console.log(key, value);
    generate_doc(value);
  }
});

// on startup
server.listen(PORT, () => {
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
