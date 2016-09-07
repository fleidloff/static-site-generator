const Delegator = require("./delegator");
const markdown = require("markdown").markdown;

class Markdown extends Delegator {
    ontext(text) {
        console.log("MD");
        console.log(text);
        console.log("/MD");
        return markdown.toHTML(text.trim());
    }
}

module.exports = Markdown;
