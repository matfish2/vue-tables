module.exports = function(column) {
  return this.options.dateColumns.indexOf(column)==-1 &&
         !this.options.listColumns.hasOwnProperty(column);
}
