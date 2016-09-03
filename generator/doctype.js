function handle() {
    return {
        onprocessinginstruction: function(name, data){
            return `<${data}>\n`;
        },
    };
}

module.exports = handle;