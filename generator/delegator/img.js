const copyFiles = require("../helper/copyFiles");
const Html = require("./html");


class Img extends Html {
	onopentag(name, attrs) {
        if (name === "img" && attrs && typeof attrs.src === "string") {
        	const { source, destination } = this.config;
        	copyFiles({ files: attrs.src, source, destination });
        }
        if (attrs.copyonly === "yes") {
			return "";
		} else {
			return super.onopentag(name, attrs);
		}
    }
}

module.exports = Img;
