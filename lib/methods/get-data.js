var merge = require('merge');

module.exports = function(promiseOnly) {

  var data =  {
    query:this.query,
    limit:this.limit,
    orderBy:this.orderBy.column,
    ascending: this.orderBy.ascending,
    page:this.page,
    byColumn:this.options.filterByColumn?1:0
  };

  data = merge(data, this.options.params, this.customQueries);

  this.$dispatch('vue-tables.loading', data);

  if (promiseOnly) {
    return this.$http.get(this.url, {params:data});
  }

  return this.$http.get(this.url, {params:data}).then(function(data) {
    this.setData(data.json());
  }.bind(this), function(e) {
    this.$dispatch('vue-tables.error', e);
  }.bind(this));

}
