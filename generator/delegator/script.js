const fs = require("fs");
const copyFiles = require("../helper/copyFiles");
const addHash = require("../helper/addHash");
const Html = require("./html");


class Script extends Html {
	onopentag(name, attrs) {
        if (name === "script" && attrs && typeof attrs.src === "string" && attrs.src.indexOf("http") !== 0) {
        	const { source, destination } = this.config;
            copyFiles({ files: attrs.src, source, destination });
            const fileNames = addHash({ files: attrs.src, source, destination });
            attrs.src = fileNames.join(",");
        }
        return super.onopentag(name, attrs);
    }
}

module.exports = Script;
