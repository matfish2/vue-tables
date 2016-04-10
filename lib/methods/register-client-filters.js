module.exports = function() {

  this.options.customFilters.forEach(function(filter) {
 // if (typeof this.options.customFilters[filter]=='string') {
 //      var column = this.options.customFilters[filter];
 //      this.options.customFilters[filter] = function(row, value) {
 //        return row[column] == value;
 //      }
 //    }

    this.$on('vue-tables.filter::' + filter.name, function(value) {
      this.initPagination();
       this.customQueries[filter.name] = value;
    }.bind(this));

  }.bind(this))




}
