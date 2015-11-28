module.exports = function(property, format) {

    if (!(property instanceof Date))
      return property;

   var formatter = require('dateformat');
   var format = typeof format!='undefined'?format:this.options.dateFormat;
   return formatter(property, format);

}
