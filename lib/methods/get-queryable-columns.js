module.exports =  function(columns) {

 if (!this.options.columns.length)
  return columns;

var queryable = columns.filter(function(n) {
  return this.options.columns.indexOf(n) != -1
}.bind(this));

return queryable.length?queryable:columns;

}
