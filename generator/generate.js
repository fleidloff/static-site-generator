/* global require */
const includeHtml = require( "./delegator/include-html");
const html = require( "./delegator/html");
const doctype = require("./delegator/doctype");
const less = require("./delegator/less");
const script = require("./delegator/script");
const img = require("./delegator/img");
const link = require("./delegator/link");
const markdown = require("./delegator/markdown");
const fs = require("fs");
const parse = require("./parser");
const path = require("path");
const mkdirp = require("mkdirp");

mkdirp("./docs");
mkdirp("./docs/generated");

mkdirp("./docs/esquina");
mkdirp("./docs/esquina/generated");


const handlers = {
    "include-html": includeHtml,
    html,
    "!doctype": doctype,
    less,
    script,
    img,
    link,
    markdown
};

const inputFile = process.argv[2] || "./site/demo.html";
const outputFile = process.argv[3] || "./docs/demo.html";

console.log(inputFile, outputFile);

// todo: get files from console parameters
const output = fs.createWriteStream(outputFile);
const demoFile = fs.readFileSync(inputFile);

output.write(parse(demoFile, { 
	handlers, 
	source: { path: path.dirname(inputFile) + "/" }, 
	destination: { path: path.dirname(outputFile) + "/" } 
}));
output.end();
