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
const web_json_data = require("./generated_data.json");
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

// Setup doc

/* Function
 * Generate Document based on JSON date
 *
 */

function generate_doc(data) {
  var template_doc_contents = fs.readFileSync(
    path.resolve(__dirname, "input/" + templateName + ".docx")
  );
  var zip = new PizZip(template_doc_contents);

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
        (data.organization + data.job_title + ".docx")
          .toString()
          .replace(/\//g, "-")
          .replace(/ /g, "_")
    ),
    buf
  );
}

/* ======== MAIN METHOD ======= */
var count = 1;
for (const job of Object.keys(web_json_data)) {
  console.log(
    "\nGenerating cover letter #",
    count,
    " with data: ",
    web_json_data[job]
  );
  generate_doc(web_json_data[job]);
  count++;
}
