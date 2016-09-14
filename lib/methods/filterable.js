module.exports = function(column) {

  if (!this.options.filterable) return false;

  return this.customColumns.indexOf(column)==-1 &&
  ((typeof this.options.filterable=='boolean' && this.options.filterable) || this.options.filterable.indexOf(column)>-1);
}
