module.exports = function(column) {

   var isExtra = this.extrasKeys.indexOf(column)>-1;

    if (isExtra) return false;

    var sortAll = !this.$parent.hasOwnProperty('sortable');

    if (sortAll) return true;

    return this.$parent.sortable.indexOf(column)>-1;

}
