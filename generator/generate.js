/* global require */
const includeHtml = require( "./include-html");
const html = require( "./html");
const doctype = require("./doctype");
const css = require("./css");
const script = require("./script");
const fs = require("fs");
const parse = require("./parser");
const path = require("path");
const mkdirp = require("mkdirp");

mkdirp("docs");

const handlers = {
    "include-html": includeHtml,
    html,
    "!doctype": doctype,
    css,
    script
};

const inputFile = "./site/demo.html";
const outputFile = "./docs/demo.html";

// todo: get files from console parameters
const output = fs.createWriteStream(outputFile);
const demoFile = fs.readFileSync(inputFile);

output.write(parse(demoFile, { 
	handlers, 
	source: { path: path.dirname(inputFile) + "/" }, 
	destination: { path: path.dirname(outputFile) + "/" } 
}));
output.end();
