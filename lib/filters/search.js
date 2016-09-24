var object_filled_keys_count = require('../helpers/object-filled-keys-count');
var is_valid_moment_object = require('../helpers/is-valid-moment-object');

module.exports = function(data, query) {

  var totalQueries = !query?0:1;

  if (this.options.filterByColumn)  {
    query = JSON.parse(query);
    totalQueries = object_filled_keys_count(query);
  }

  if (!totalQueries) {
    this.$dispatch('vue-tables.filtered', data);
    return data;
  }

  var value;
  var found;
  var currentQuery;
  var dateFormat = this.options.dateFormat;
  var filterByDate;
  var isListFilter;
  var filterable = this.options.filterable && typeof this.options.filterable=='object'?
                    this.options.filterable:
                    this.columns;

  var filteredData =  data.filter(function(row, index) {

    found = 0;

    filterable.forEach(function(column) {

      filterByDate = this.options.dateColumns.indexOf(column)>-1 && this.options.filterByColumn;
      isListFilter = this.isListFilter(column) && this.options.filterByColumn;

      value = getValue(row[column], filterByDate, dateFormat);

      currentQuery = this.options.filterByColumn?query[column]:query;

      currentQuery = setCurrentQuery(currentQuery);

      if (currentQuery && foundMatch(currentQuery, value, isListFilter)) found++;

    }.bind(this));

    return found>=totalQueries;

  }.bind(this));

  this.$dispatch('vue-tables.filtered', filteredData);

  return filteredData;
}

function setCurrentQuery(query) {

  if (!query) return '';

  if (typeof query=='string')
    return query.toLowerCase();

  // Date Range

  return query;
}

function foundMatch(query, value, isListFilter) {

  // List Filter
  if (isListFilter)
    return value==query;

  //Text Filter
  if (typeof value=='string')
    return value.indexOf(query)>-1;

  // Date range
  var start = moment(query.start,'YYYY-MM-DD');
  var end = moment(query.end,'YYYY-MM-DD');

  return (value>=start && value<=end);
}

function getValue(val, filterByDate, dateFormat) {

  if (is_valid_moment_object(val)) {
    if (filterByDate) return val;
    return val.format(dateFormat);
  }

  return String(val).toLowerCase();
}
