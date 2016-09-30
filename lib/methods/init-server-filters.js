module.exports = function() {

  var customQueries = {};
  var init = this.options.filtersInitialValues;

  this.options.customFilters.forEach(function(filter) {
    customQueries[filter] = init.hasOwnProperty(filter)?init[filter]:'';
  });

  return customQueries;
}
