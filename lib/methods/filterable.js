module.exports = function(column) {
  return this.customColumns.indexOf(column)==-1 &&
  (!this.options.filterable || this.options.filterable.indexOf(column)>-1);
}
