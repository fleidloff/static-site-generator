const fs = require("fs");
const parse = require("../parser");
const Delegator = require("./delegator");


class IncludeHtml extends Delegator {
    onopentag(name, attrs){
        if (name === "include-html" && attrs && typeof attrs.src === "string") {
            const file = fs.readFileSync(this.config.source.path + attrs.src);
            return parse(file, Object.assign({}, this.config, { delegates: ["html"] }));
        } else {
            throw new Error("<include-html> element must have a src attribute.");
        }
    }
}

module.exports = IncludeHtml;
