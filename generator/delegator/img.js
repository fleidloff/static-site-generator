const fs = require("fs");
const copyFiles = require("../helper/copyFiles");
const Html = require("./html");
const lwip = require("lwip");


class Script extends Html {
	onopentag(name, attrs) {
        if (name === "img" && attrs && typeof attrs.src === "string") {
        	const { source, destination } = this.config;
        	if (typeof attrs.resize === "string") {
        		const file = attrs.src.trim();
        		const resize = attrs.resize.split(",").map(numberString => parseInt(numberString.trim(), 10));
				let fileName = file.split(".");
				fileName[fileName.length] = fileName[fileName.length - 1];
				fileName[fileName.length - 2] = resize[0] + "x" + resize[1];
				fileName = fileName.join(".");
				attrs.src = fileName;
				delete attrs.resize;

    			lwip.open(source.path + file, (err, image) => {
    				if (err) {
    					console.error("something went wrong while opening the image");
    				}	
    				image.batch()
    					.resize(resize[0], resize[1])
    					.writeFile(destination.path + fileName, err => {
    						if (err) {
    							console.error(err);
    						}
    					});

    			});

        	} else {
            	copyFiles({ files: attrs.src, source, destination });
        	}
        }
        return super.onopentag(name, attrs);
    }
}

module.exports = Script;
