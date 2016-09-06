const fs = require("fs");
const copyFiles = require("./helper/copyFiles");
const Delegator = require("./delegator");


class Css extends Delegator {
    onopentag(name, attrs){
        if (name === "css" && attrs && typeof attrs.src === "string") {
            const { source, destination } = this.config;
            return copyFiles({ files: attrs.src, source, destination })
                .map(file => `<link rel="stylesheet" href="${file}" />`)
                .join("\n");
        } else {
            throw new Error("<css> tag must have a src attribute.");
        }
    }
}

module.exports = Css;
