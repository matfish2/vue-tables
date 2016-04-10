module.exports = function(data, filters) {

var passing;
var filters = JSON.parse(filters);

 return data.filter(function(row) {

  passing = true;

  this.options.customFilters.forEach(function(filter) {
    var value = this.customQueries[filter.name];
    if (value && !filter.callback(row, value))
      passing = false;
  }.bind(this));

  return passing;

}.bind(this));
}
