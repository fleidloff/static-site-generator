const Delegator = require("./delegator");

class DocType extends Delegator {
	onprocessinginstruction(name, data) {
        return `<${data}>\n`;
    }	
}

module.exports = DocType;
