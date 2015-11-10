module.exports = function(column) {

   var isExtra = this.extras.indexOf(column)>-1;

    if (isExtra) return false;

    var sortAll = !this.options.sortable.length;

    if (sortAll) return true;

    return this.options.sortable.indexOf(column)>-1;

}
