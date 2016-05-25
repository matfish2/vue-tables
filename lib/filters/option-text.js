module.exports = function(value, column) {
  if (!this.isListFilter(column) || !this.listColumnsObject[column].hasOwnProperty(value))
    return value;

  return this.listColumnsObject[column][value];
}
