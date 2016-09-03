const handler = {
    // todo: real include file and run generator on that file with html
    // or: get next generator?
    onopentag: function(name, attrs){
        return "(" + name + attrs;
    },
    ontext: function(text){
        return "--)" + text;
    },
    onclosetag: function(name){
        return ")" + name;
    }
};

module.exports = handler;