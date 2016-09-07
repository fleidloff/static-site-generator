const Delegator = require("./delegator");
const path = require("path");
const fs = require("fs");
const addHash = require("../helper/addHash");

const spawn = require("child_process").spawnSync;


class Css extends Delegator {
    onopentag(name, attrs){
        if (name === "less" && attrs && typeof attrs.src === "string") {
            const { source, destination } = this.config;
            const file = attrs.src.replace(".less", ".css");
            if (!fs.existsSync(destination.path + file)) {
                const less = spawn("./node_modules/.bin/lessc", [source.path + attrs.src, destination.path + file]);
                const fileNames = addHash({ files: file, source, destination });
                const fileName = fileNames.join(",");
                return `<link rel="stylesheet" href="${fileName}" />\n`;
            } else {
                return `<link rel="stylesheet" href="${file}" />\n`;
            }
        } else {
            throw new Error("<less> tag must have a src attribute.");
        }
    }
}

module.exports = Css;
