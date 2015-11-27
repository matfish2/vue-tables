module.exports = function() {

  var data =  {
    query:this.query,
    limit:this.limit,
    orderBy:this.orderBy,
    ascending: this.ascending,
    page:this.page,
    byColumn:this.options.filterByColumn?1:0
  };

  this.$dispatch('vue-tables.loading', data);

  var data = $.param(data);

  return $.ajax({
    url: this.url,
    dataType: "json",
    data: data
  });
}
