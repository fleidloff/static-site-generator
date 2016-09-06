const fs = require("fs");
const copyFiles = require("../helper/copyFiles");
const Html = require("./html");


class Script extends Html {
	onopentag(name, attrs) {
        if (name === "link" && attrs && typeof attrs.href === "string") {
        	const { source, destination } = this.config;
            copyFiles({ files: attrs.href, source, destination });
        }
        return super.onopentag(name, attrs);
    }
}

module.exports = Script;
