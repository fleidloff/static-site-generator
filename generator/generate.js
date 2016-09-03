/* global require */
const includeHtml = require( "./include-html");
const html = require( "./html");
const doctype = require("./doctype");
const fs = require("fs");
const parse = require("./parser");

const handlers = {
    "include-html": includeHtml,
    "html": html,
    "!doctype": doctype
};

const output = fs.createWriteStream("./dist/demo.html");
const demoFile = fs.readFileSync("./site/demo.html");

output.write(parse(demoFile, { handlers, path: "./site/" }));
output.end();
