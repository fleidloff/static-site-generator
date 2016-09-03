const htmlparser = require("htmlparser2");
const includeHtml = require( "./include-html");
const fs = require("fs");

const handlers = {
    "include-html": includeHtml
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
            return delegate.getCurrent().onopentag(name, attrs);
        }
        console.log("<", name, attrs);
    },
    ontext: function(text){
        if (delegate.has()) {
            return delegate.getCurrent().ontext(text);
        }
        console.log("-->", text);
    },
    onclosetag: function(name){
        if (delegate.has()) {
            delegate.getCurrent().onclosetag(name);
        }
        if (name in handlers) {
            delegate.remove();
            return;
        }
        console.log(">", name);
    }
}, {decodeEntities: true});

const html = fs.readFileSync("./site/demo.html");

parser.write(html);
parser.end();
