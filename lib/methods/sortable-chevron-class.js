module.exports = function(column) {

    if (!this.sortable(column))
    return;

    if (column!=this.orderBy.column) return '';

    return this.orderBy.ascending==1?
          this.options.sortIcon.up:
          this.options.sortIcon.down;
  }
