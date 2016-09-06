const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");


function copyFiles({ files, source, destination }) {
	const result = files.split(",").map(file => file.trim()).filter(file => file.substr(0, 4) !== "http");
    result.forEach(file => {
        mkdirp(path.dirname(destination.path + file));
        if (!fs.existsSync(destination.path + file)) {
            fs.createReadStream(source.path + file).pipe(fs.createWriteStream(destination.path + file));
        }
    });
    return result;
}

module.exports = copyFiles;
