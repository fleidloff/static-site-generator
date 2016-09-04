const fs = require("fs");


function handle({ handlers, path }) {
    return {
        onopentag: function(name, attrs){
            if (attrs && typeof attrs.src === "string") {
                // todo: copy css files / create new combined css file
                return `<link rel="stylesheet" href="${attrs.src}" />`;
            } else {
                throw new Error("<css> tag must have a src attribute.");
            }
        }
    };
}

module.exports = handle;
