module.exports = function(page, initPagination) {

  this.page = page;

  if (!this.options.pagination.dropdown) {
    this.$refs.pagination.page = page;

    if (initPagination) {
       this.$refs.pagination.setPage(1);
    }

  }

 if (this.source=='server' && this.options.pagination.dropdown)
    this.getData()
}
