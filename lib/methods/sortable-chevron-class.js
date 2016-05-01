module.exports = function(column) {

    var cls = this.options.sortIcon.base + ' ';

    if (!this.sortable(column))
    return;

    if (column!=this.orderBy.column) return cls;

    cls+= this.orderBy.ascending==1?
          this.options.sortIcon.up:
          this.options.sortIcon.down;

    return cls;
  }
