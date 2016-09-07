const selfClosingTags =  ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

function isSelfClosing(tagName) {
    return selfClosingTags.indexOf(tagName) !== -1;
}

module.exports = isSelfClosing;
