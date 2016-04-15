var object_filled_keys_count = require('../helpers/object-filled-keys-count');
var is_valid_moment_object = require('../helpers/is-valid-moment-object');

module.exports = function(data, query) {

  var totalQueries = !query?0:1;

  if (this.options.filterByColumn)  {
    query = JSON.parse(query);
    totalQueries = object_filled_keys_count(query);
  }

  if (!totalQueries) return data;

  var value;
  var found;
  var currentQuery;
  var dateFormat = this.options.dateFormat;
  var filterByDate;

  return data.filter(function(row, index) {

    found = 0;

    this.columns.forEach(function(column) {

      filterByDate = this.options.dateColumns.indexOf(column)>-1 && this.options.filterByColumn;

      value = getValue(row[column], filterByDate, dateFormat);

      currentQuery = this.options.filterByColumn?query[column]:query;

      currentQuery = setCurrentQuery(currentQuery);

      if (currentQuery && foundMatch(currentQuery, value)) found++;

    }.bind(this));

    return found>=totalQueries;

  }.bind(this));
}

function setCurrentQuery(query) {

  if (!query) return '';

  if (typeof query=='string')
    return query.toLowerCase();

  // Date Range

  return query;
}

function foundMatch(query, value) {

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
