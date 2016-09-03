/* global require */
const htmlparser = require("htmlparser2");
const includeHtml = require( "./include-html");
const html = require( "./html");
const fs = require("fs");


const output = fs.createWriteStream("./dist/demo.html");
const demoFile = fs.readFileSync("./site/demo.html");


const handlers = {
    "include-html": includeHtml,
    "html": html
};

const delegate = {
    delegates: [],
    has() {
        return this.delegates.length > 0;
    },
    getCurrent() {
        return this.delegates[this.delegates.length - 1]
    },
    add(delegator) {
        this.delegates.push(delegator);
    },
    remove() {
        this.delegates.pop();
    }
};


const parser = new htmlparser.Parser({
    onopentag: function(name, attrs){
        if (name in handlers) {
            delegate.add(handlers[name]);
        }
        if (delegate.has()) {
            return output.write(delegate.getCurrent().onopentag(name, attrs));
        }
        console.log("< no handler:", name, attrs);
    },
    ontext: function(text){
        if (delegate.has()) {
            return output.write(delegate.getCurrent().ontext(text));
        }
        console.log("--> no handler", text);
    },
    onclosetag: function(name){
        if (delegate.has()) {
            output.write(delegate.getCurrent().onclosetag(name));
        } else {
            console.log("> no handler", name);
        }
        if (name in handlers) {
            delegate.remove();
            return;
        }
    }
}, {decodeEntities: true});


parser.write(demoFile);
parser.end();
output.end();
