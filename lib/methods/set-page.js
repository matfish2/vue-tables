module.exports = function(page, initPagination) {

  this.page = page;

   if (initPagination && !this.options.pagination.dropdown)
   this.$refs.pagination.setPage(1);

  if (this.source=='server' && this.options.pagination.dropdown)
   this.getData().then(function(data) {
          this.setData(data.data);
        }.bind(this));
}
