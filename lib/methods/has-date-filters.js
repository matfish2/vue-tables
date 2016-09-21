var intersection = require('../helpers/array-intersection');

module.exports = function() {

  var opts = this.options;

  return opts.dateColumns.length &&
         opts.filterByColumn &&
         (opts.filterable || intersection(opts.filterable, opts.dateColumns).length)
}
