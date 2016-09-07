module.exports = function(row) {
  this.$dispatch('vue-tables.row-click', row);
}
