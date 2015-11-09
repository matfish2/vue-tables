module.exports =  function(all) {

    var columns = [];
    var userColumns = this.$parent.columns;
    var data = this.tableData;

    for (var x in this.tableData[0]) {
      if (all || !userColumns
       || $.inArray(x,userColumns)>-1
       || this.extrasKeys.indexOf(x)>-1)
        columns.push(x);
    }

    // if (this.extras) {
    //   for (var column in this.extras) {
    //     columns.push(column);
    //   }
    // }

    return columns;

  }
