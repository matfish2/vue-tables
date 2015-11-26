module.exports =  function() {

 if (!this.options.columns.length)
  return this.allColumns;

var queryable =  this.allColumns.filter(function(n) {
  return this.options.columns.indexOf(n) != -1
}.bind(this));

return queryable.length?queryable:this.allColumns;

}
