module.exports = function() {

  var customQueries = {};

  var init = this.options.filtersInitialValues;

  this.options.customFilters.forEach(function(filter) {
    customQueries[filter.name] = init.hasOwnProperty(filter.name)?init[filter.name]:'';
  });

  return customQueries;
}
