module.exports = function() {
 this.page = 1;
 if (!this.options.pagination.dropdown)
   this.$children[0].setPage(1);
}
