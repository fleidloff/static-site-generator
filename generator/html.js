function handle() {
    return {
        onopentag: function(name, attrs){
            return `<${name}${attrs.length > 0 ? " " + Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(" ") : ""}>`;
        },
        ontext: function(text){
            return text;
        },
        onclosetag: function(name){
            return `</${name}>`;
        }
    };
}

module.exports = handle;