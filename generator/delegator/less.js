const fs = require("fs");
const Delegator = require("./delegator");
const less = require("less");
const mkdirp = require("mkdirp");
const path = require("path");


class Css extends Delegator {
    onopentag(name, attrs){
        if (name === "less" && attrs && typeof attrs.src === "string") {
            const { source, destination } = this.config;
            const file = attrs.src.replace(".less", ".css");

            mkdirp(path.dirname(destination.path + file));
            less.render(fs.readFileSync(source.path + attrs.src))
                .then((output) => {
                    console.log(output);
                    fs.writeFileSync(destination.path + file, output.css);
            }).catch(console.error);

            return `<link rel="stylesheet" href="${file}" />`;
        } else {
            throw new Error("<css> tag must have a src attribute.");
        }
    }
}

module.exports = Css;
