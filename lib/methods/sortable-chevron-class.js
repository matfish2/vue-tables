module.exports = function(column) {

    if (!this.sortable(column))
    return;

    if (column!=this.orderBy) return '';

    return this.ascending==1?'glyphicon-chevron-up':'glyphicon-chevron-down';

  }
