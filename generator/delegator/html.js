const Delegator = require("./delegator");
const isSelfClosing = require("../helper/isSelfClosing");

class Html extends Delegator {
    onopentag(name, attrs){
        return `<${name}${Object.keys(attrs).length > 0 ? " " + Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(" ") : ""}${isSelfClosing(name) ? " />" : ">"}`;
    }
    ontext(text){
        return text;
    }
    onclosetag(name){
        console.log("close", name);
        if (!isSelfClosing(name)) {
            return `</${name}>`;
        } else {
            return "";
        }
    }
}

module.exports = Html;
