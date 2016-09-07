const fs = require("fs");
const path = require("path");
const md5File = require('md5-file')


function addHash({ files, source, destination }) {
    const result = files.split(",").map(file => file.trim()).filter(file => file.substr(0, 4) !== "http");
    return result.map(file => {
        if (fs.existsSync(destination.path + file)) {
            const hash = md5File.sync(destination.path + file);

            let fileName = file.split(".");
            fileName[fileName.length] = fileName[fileName.length - 1];
            fileName[fileName.length - 2] = hash;
            fileName = fileName.join(".");

            fs.renameSync(destination.path + file, destination.path + fileName);

            return fileName;
        }
    });
}

module.exports = addHash;
