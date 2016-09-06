const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");


function handle({ source, destination }) {
    console.log(source, destination);
    return {
        onopentag: function(name, attrs){
            if (attrs && typeof attrs.src === "string") {
                const files = attrs.src.split(",").map(file => file.trim());
                files.forEach(file => {
                    mkdirp(path.dirname(destination.path + file));
                    if (!fs.existsSync(destination.path + file)) {
                        fs.createReadStream(source.path + file).pipe(fs.createWriteStream(destination.path + file));
                    }
                });
                return files.map(file => `<link rel="stylesheet" href="${file}" />`).join("\n");
            } else {
                throw new Error("<css> tag must have a src attribute.");
            }
        }
    };
}

module.exports = handle;
