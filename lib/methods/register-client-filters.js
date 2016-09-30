module.exports = function() {

  this.options.customFilters.forEach(function(filter) {

    this.$on('vue-tables.filter::' + filter.name, function(value) {
      this.setPage(1);
       this.customQueries[filter.name] = value;
    }.bind(this));

  }.bind(this))




}
