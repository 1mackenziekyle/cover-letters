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
const fileData = require("./json_data.json");

const zip = new PizZip(content);
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

////////////////////////// USER INPUT ///////////////////////////////
const templateName = "cover-letter-template"; // ENTER YOUR COVER LETTER TEMPLATE NAME AFTER ADDING UNDER /input

/////////////////////////////////////////////////////////////////////

const content = fs.readFileSync(
  path.resolve(__dirname, "input/cover-letter-template.docx")
);

/* Function
 * Generate Document based on JSON date
 *
 */
function generate_doc(data) {
  // load input doc as binary
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  const date = new Date();
  // Replace words in doccument
  doc.render({
    ORGANIZATION: data.organization,
    JOB_TITLE: data.job_title,
    LOCATION: data.location,
    DATE:
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear(),
  });
  // generate file
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  fs.writeFileSync(
    path.resolve(
      __dirname,
      "output/cover-letters/cover-letter-" +
        (data.organization + data.job_title + "version" + ".docx")
          .toString()
          .replace(/\//g, "-")
          .replace(/ /g, "_")
    ),
    buf
  );
}

/* ======== MAIN METHOD ======= */
console.log("STARTING task.js");
const jobs = Object.keys(fileData);
for (const jobKey of jobs) {
  console.log("\nCreating word doc: ", fileData[jobKey]);
  generate_doc(fileData[jobKey]);
}
