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
const fullstackJson = require("./output/json/fullstack.json");
const frontendJson = require("./output/json/frontend.json");
const backendJson = require("./output/json/backend.json");
const userinfoJson = require("./input/userinfo.json");

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
const fullstack_template_name = "fullstack-template"; // ENTER YOUR COVER LETTER TEMPLATE NAME AFTER ADDING UNDER /input
const frontend_template_name = "frontend-template";
const backend_template_name = "backend-template";
/////////////////////////////////////////////////////////////////////

// Setup doc

/* Function
 * Generate Document based on JSON date
 *
 */

function generate_doc(data, templateName) {
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
    FULLNAME: userinfoJson["fullname"],
    PROGRAM: userinfoJson["program"],
    EMAIL: userinfoJson["email"],
    CELL_NUMBER: userinfoJson["cell_number"],
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
      "output/cover-letters/" +
        data.type +
        "/cover-letter-" +
        (data.organization + "--" + data.job_title + ".docx")
          .toString()
          .replace(/\//g, "-")
          .replace(/ /g, "_")
    ),
    buf
  );
}

/* ======== MAIN METHOD ======= */
var count = 1;
for (const job of Object.keys(fullstackJson)) {
  console.log(
    "\nGenerating cover letter #",
    count,
    " with data: ",
    fullstackJson[job]
  );
  generate_doc(fullstackJson[job], fullstack_template_name);
  count++;
}

for (const job of Object.keys(frontendJson)) {
  console.log(
    "\nGenerating cover letter #",
    count,
    " with data: ",
    frontendJson[job]
  );
  generate_doc(frontendJson[job], frontend_template_name);
  count++;
}

for (const job of Object.keys(backendJson)) {
  console.log(
    "\nGenerating cover letter #",
    count,
    " with data: ",
    backendJson[job]
  );
  generate_doc(backendJson[job], backend_template_name);
  count++;
}
