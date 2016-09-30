module.exports = {
  ready: function() {

    this.$on('vue-pagination::' + this.id, function(page) {
     this.setPage(page);
   }.bind(this));

    this.$compile(this.$els.headings);
  }
}
