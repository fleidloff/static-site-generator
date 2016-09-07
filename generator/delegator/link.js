const fs = require("fs");
const copyFiles = require("../helper/copyFiles");
const addHash = require("../helper/addHash");
const Html = require("./html");


class Script extends Html {
	onopentag(name, attrs) {
        if (name === "link" && attrs && typeof attrs.href === "string") {
        	const { source, destination } = this.config;
            copyFiles({ files: attrs.href, source, destination });
            const fileNames = addHash({ files: attrs.href, source, destination });
            attrs.href = fileNames.join(",");
        }
        return super.onopentag(name, attrs);
    }
}

module.exports = Script;
