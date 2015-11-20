module.exports = function(text, value) {

   if (!this.options.texts) return '';

   var text = this.options.texts[text];

   if (text && value)
     text = text.replace(/{.+}/,value);

    return text;
}

