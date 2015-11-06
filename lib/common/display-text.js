module.exports = function(text, param) {
    return text.replace(/{.+}/,param);
}
