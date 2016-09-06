const htmlparser = require("htmlparser2");


function parse(content, config) {
    const { handlers, delegates = [], source, destination } = config;
    let result = "";

    const delegate = {
        delegates: [],
        has() {
            return this.delegates.length > 0;
        },
        getCurrent(n = 0) {
            return this.delegates[this.delegates.length - 1 -n];
        },
        add(Delegator) {
            this.delegates.push(new Delegator(config));
        },
        remove() {
            this.delegates.pop();
        }
    };

    delegates.reverse().forEach(delegator => delegate.add(handlers[delegator]));

    const parser = new htmlparser.Parser({
        onprocessinginstruction(name, data) {
            if (name in handlers) {
                delegate.add(handlers[name]);

                if (typeof delegate.getCurrent().onprocessinginstruction === "function") {
                    result += delegate.getCurrent().onprocessinginstruction(name, data);
                }

                delegate.remove();
            } else {
                console.log("< no handler onprocessinginstruction:", name, data);
            }
        },
        onopentag: function(name, attrs){
            if (name in handlers) {
                delegate.add(handlers[name]);
            }
            if (delegate.has() && typeof delegate.getCurrent().onopentag === "function") {
                result += delegate.getCurrent().onopentag(name, attrs);
            } else {
                console.log("< no handler:", name, attrs);
            }
        },
        ontext: function(text){
            if (delegate.has() && typeof delegate.getCurrent().ontext === "function") {
                result += delegate.getCurrent().ontext(text);
            } else {
                console.log("--> no handler", text);
            }
        },
        onclosetag: function(name){
            if (delegate.has() && typeof delegate.getCurrent().onclosetag === "function") {
                result += delegate.getCurrent().onclosetag(name);
            } else {
                console.log("> no handler", name);
            }
            if (name in handlers) {
                delegate.remove();
            }
        }
    }, {decodeEntities: true});

    parser.write(content);
    parser.end();

    return result;
}

module.exports = parse;
