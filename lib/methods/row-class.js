module.exports = function(row) {
  var cb = this.options.rowClassCallback;

  if (!cb) return '';

  return cb(row);
}
