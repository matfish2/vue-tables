module.exports = function(index) {

    if (!this.sortable(this.cols[index]))
    return;

    if (this.cols[index]!=this.orderBy) return '';
    return this.ascending==1?'fa-sort-asc':'fa-sort-desc';
  }
