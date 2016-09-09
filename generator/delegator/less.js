const Link = require("./link");
const path = require("path");
const fs = require("fs");

const spawn = require("child_process").spawnSync;


class Css extends Link {
    onopentag(name, attrs){
        if (name === "less" && attrs && typeof attrs.src === "string") {
            const { source, destination } = this.config;
            const file = attrs.src.replace(".less", ".css");
            if (!fs.existsSync(source.path + "generated/" + file)) {
                const less = spawn("./node_modules/.bin/lessc", [source.path + attrs.src, source.path + "generated/" + file]);
            }
            return super.onopentag("link", { rel: "stylesheet", href: "generated/" + file });
        } else {
            throw new Error("<less> tag must have a src attribute.");
        }
    }
}

module.exports = Css;
