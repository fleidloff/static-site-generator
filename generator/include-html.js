const handler = {
    onopentag: function(name, attribs){
        console.log("(", name, attribs);
    },
    ontext: function(text){
        console.log("--)", text);
    },
    onclosetag: function(name){
        console.log(")", name);
    }
};

module.exports = handler;