/* global require */
const includeHtml = require( "./delegator/include-html");
const html = require( "./delegator/html");
const doctype = require("./delegator/doctype");
const css = require("./delegator/css");
const script = require("./delegator/script");
const img = require("./delegator/img");
const link = require("./delegator/link");
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
    script,
    img,
    link
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
