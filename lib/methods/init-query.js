module.exports = function() {

  if (!this.options.filterByColumn) return '';

  var query = {};

  this.columns.forEach(function(column) {
     query[column] = '';
    }.bind(this));

  return query;
}
