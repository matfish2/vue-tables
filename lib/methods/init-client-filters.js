module.exports = function() {

  var customQueries = {};

  this.options.customFilters.forEach(function(filter) {
    customQueries[filter.name] = '';
  });

  return customQueries;
}
