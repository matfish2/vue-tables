module.exports = function(property) {

    if (!(property instanceof Date))
      return property;

   var formatter = require('dateformat');

   return formatter(property, this.options.dateFormat);

}
