module.exports = function(column) {

   var isCustomColumn = this.customColumns.indexOf(column)>-1;

    if (isCustomColumn) return false;

    var sortAll = typeof this.options.sortable === 'boolean' &&  this.options.sortable;

    if (sortAll) return true;

    return this.options.sortable.indexOf(column)>-1;

}
