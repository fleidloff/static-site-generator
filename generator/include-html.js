const fs = require("fs");
const parse = require("./parser");


function handle(config) {
    return {
        onopentag: function(name, attrs){
            if (attrs && typeof attrs.src === "string") {
                const file = fs.readFileSync(config.source.path + attrs.src);
                return parse(file, Object.assign({}, config, { delegates: ["html"] }));
            } else {
                throw new Error("<include-html> element must have a src attribute.");
            }
        }
    };
}

module.exports = handle;
