module.exports = function() {

  this.options.customFilters.forEach(function(filter) {
        this.$on('vue-tables.filter::' + filter, function(value) {
          this.customQueries[filter] = value;
          this.refresh();
        }.bind(this));
  }.bind(this));
}
