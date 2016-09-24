module.exports = function(page, initPagination) {

  this.page = page;

  if (initPagination && !this.options.pagination.dropdown)
   this.$children[0].setPage(1);

 if (this.source=='server' && this.options.pagination.dropdown)
    this.getData()
}
