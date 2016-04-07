module.exports = function() {
  this.data.forEach(function(row, index) {
    this.options.dateColumns.forEach(function(column) {
      row[column] = moment(row[column], this.options.toMomentFormat);
    }.bind(this));
  }.bind(this));
}
