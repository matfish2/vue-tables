module.exports = function() {

 this.initPagination();

 if (this.source=='server' && this.options.pagination.dropdown) {
   this.getData();
}

}
