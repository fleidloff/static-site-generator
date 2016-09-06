const fs = require("fs");
const copyFiles = require("./helper/copyFiles");

function handle({ source, destination }) {
    return {
        onopentag: function(name, attrs){
            if (attrs && typeof attrs.src === "string") {
                return copyFiles({ files: attrs.src, source, destination }).map(file => `<link rel="stylesheet" href="${file}" />`).join("\n");
            } else {
                throw new Error("<css> tag must have a src attribute.");
            }
        }
    };
}

module.exports = handle;
