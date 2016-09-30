module.exports = function() {

  var init = this.options.filtersInitialValues;

  if (!this.options.filterByColumn)
    return init.hasOwnProperty('GENERIC')?init.GENERIC:'';

  var query = {};

  var filterable = this.options.filterable && typeof this.options.filterable=='object'?
                   this.options.filterable:
                   this.columns;

  filterable.forEach(function(column) {
     query[column] = getInitialValue(init, column);
    }.bind(this));

  return query;
}

function getInitialValue(init, column) {

  if (!init.hasOwnProperty(column)) return '';

  if (typeof init[column].start == 'undefined') return init[column];

  return {
    start: init[column].start.format('YYYY-MM-DD'),
    end: init[column].end.format('YYYY-MM-DD')
  }

}
