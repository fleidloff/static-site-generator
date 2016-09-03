const fs = require("fs");
const parse = require("./parser");


function handle({ handlers, path }) {
    return {
        onopentag: function(name, attrs){
            if (attrs && typeof attrs.src === "string") {
                const file = fs.readFileSync(path + attrs.src);
                return parse(file, { handlers, delegates: ["html"] });
            }
        }
    };
}

module.exports = handle;
