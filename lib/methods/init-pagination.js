module.exports = function() {

 this.page = 1;

 if (!this.options.pagination.dropdown)
   this.$refs.pagination.setPage(1);
}
