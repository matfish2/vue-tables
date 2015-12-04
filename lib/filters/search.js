var object_filled_keys_count = require('../helpers/object-filled-keys-count');

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

  return data.filter(function(row, index) {

    found = 0;

    this.queryable.forEach(function(column) {

      value = String(row[column]).toLowerCase();

      currentQuery = this.options.filterByColumn?query[column]:query;
      currentQuery = currentQuery.toLowerCase();

      if (currentQuery && value.indexOf(currentQuery)>-1) found++;

    }.bind(this));

    return found>=totalQueries;

  }.bind(this));
}
