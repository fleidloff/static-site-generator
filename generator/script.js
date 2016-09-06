const fs = require("fs");
const copyFiles = require("./helper/copyFiles");
const handleHtml = require("./html")();

function handle({ source, destination }) {
    return {
        onopentag: function(name, attrs){
            if (name === "script" && attrs && typeof attrs.src === "string") {
                copyFiles({ files: attrs.src, source, destination });
            }
            return handleHtml.onopentag(name, attrs);
        },
        ontext: handleHtml.ontext,
        onclosetag: handleHtml.onclosetag
    };
}

module.exports = handle;
