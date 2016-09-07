const Delegator = require("./delegator");

class Html extends Delegator {
    onopentag(name, attrs){
        return `<${name}${Object.keys(attrs).length > 0 ? " " + Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(" ") : ""}>`;
    }
    ontext(text){
        return text;
    }
    onclosetag(name){
        console.log("close", name);
        return `</${name}>`;
    }  
}

module.exports = Html;
