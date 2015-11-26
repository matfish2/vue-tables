module.exports = function() {
  return this.options.filterByColumn?JSON.stringify(this.query):this.query;
}
