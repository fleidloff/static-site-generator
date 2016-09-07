const Delegator = require("./delegator");
const markdown = require("markdown").markdown;

class Markdown extends Delegator {
    ontext(text) {
        return markdown.toHTML(text.split("\n").map(line => line.trim()).join("\n"));
    }
}

module.exports = Markdown;
