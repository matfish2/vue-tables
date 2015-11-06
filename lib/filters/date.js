module.exports = function(property) {
    if (!(property instanceof Date))
      return property;

   return this.dateFormatter(property);

}
