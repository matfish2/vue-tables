var merge = require('merge');

module.exports = function() {

  var data =  {
    query:removeEmptyFilters(this.query),
    limit:this.limit,
    orderBy:this.orderBy.column,
    ascending: this.orderBy.ascending,
    page:this.page,
    byColumn:this.options.filterByColumn?1:0
  };

data = merge(data, this.options.params, this.customQueries);

  this.$dispatch('vue-tables.loading', data);

   var promise = this.$http.get(this.url, {params:data}).then(function(data) {
    return data.json();
  }.bind(this),  function(e) {
    this.$dispatch('vue-tables.error', e);
  }.bind(this));

  return promise.then(function(data) {
    this.loading = false;
    return this.setData(data);
  });

}

function removeEmptyFilters(query) {

  if (typeof query=='string')
    return query;
  
  var res = {};

  for (var q in query) {
    if (query[q]) res[q] = query[q];
  }

  return res;
}