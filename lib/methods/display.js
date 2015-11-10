module.exports = function(text, value) {
    return text.replace(/{.+}/,value);
}

