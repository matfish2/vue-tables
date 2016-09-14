module.exports = function() {

  if (!this.options.filterByColumn) return '';

  var query = {};

  var filterable = this.options.filterable && typeof this.options.filterable=='object'?
                   this.options.filterable:
                   this.columns;

  filterable.forEach(function(column) {
     query[column] = '';
    }.bind(this));

  return query;
}
