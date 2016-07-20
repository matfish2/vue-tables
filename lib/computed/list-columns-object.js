module.exports = function() {
  var columns = Object.keys(this.options.listColumns);
  var res = {};

  columns.forEach(function(column) {
    res[column] = {};

    this.options.listColumns[column].forEach(function(item) {
      res[column][item.id] = item.text;
    });
  }.bind(this));

  return res;
}
