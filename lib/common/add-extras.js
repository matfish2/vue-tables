module.exports = function(data, extras) {

    data.forEach(function(row,index) {
    for (var extra in extras) {
      this.$set('tableData['+index+'].' + extra,extras[extra]);
    }
  }.bind(this));

}
