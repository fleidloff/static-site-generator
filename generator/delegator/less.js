const Delegator = require("./delegator");
const path = require("path");

const spawn = require('child_process').spawn;


class Css extends Delegator {
    onopentag(name, attrs){
        if (name === "less" && attrs && typeof attrs.src === "string") {
            const { source, destination } = this.config;
            const file = attrs.src.replace(".less", ".css");

            const less = spawn("./node_modules/.bin/lessc", [source.path + attrs.src, destination.path + file]);

            return `<link rel="stylesheet" href="${file}" />\n`;
        } else {
            throw new Error("<css> tag must have a src attribute.");
        }
    }
}

module.exports = Css;
