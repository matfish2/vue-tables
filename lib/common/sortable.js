var object_keys = require('../helpers/object-keys');

module.exports = function(column, source) {

    var userDefaults = !this.$parent.hasOwnProperty('sortable');
    var isExtra = this.$parent.hasOwnProperty('extras')
                  && column.indexOf(object_keys(this.$parent.extras))>-1;

    if ((userDefaults || source=='server') && isExtra) return false;
    if (userDefaults && !isExtra) return true;

    return this.$parent.sortable.indexOf(column)>-1;

}
