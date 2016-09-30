module.exports = function() {

 this.setPage(1);

 if (this.source=='server' && this.options.pagination.dropdown) {
   this.getData();
}

}
