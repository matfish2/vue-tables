module.exports = function(column) {

    if (!this.sortable(column))
    return;

    if (column!=this.orderBy) return '';

    return this.ascending==1?'fa-sort-asc':'fa-sort-desc';

  }
