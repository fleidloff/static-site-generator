/* global require */
const includeHtml = require( "./include-html");
const html = require( "./html");
const doctype = require("./doctype");
const css = require("./css");
const fs = require("fs");
const parse = require("./parser");

const handlers = {
    "include-html": includeHtml,
    "html": html,
    "!doctype": doctype,
    "css": css
};

const output = fs.createWriteStream("./dist/demo.html");
const demoFile = fs.readFileSync("./site/demo.html");

output.write(parse(demoFile, { handlers, source: { path: "./site/" }, destination: { path: "./dist/" } }));
output.end();
