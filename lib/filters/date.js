module.exports = function(property, format) {

    if (!(property instanceof Date))
      return property;

   var formatter = require('dateformat');

   format = format?format:this.options.dateFormat;

   return formatter(property, format);

}
