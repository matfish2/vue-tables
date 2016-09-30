module.exports = function(page) {

  this.page = page;

  if (!this.options.pagination.dropdown) {
   this.$refs.pagination.page = page;
 }

 if (this.source=='server') {
   this.getData();
 }

}
