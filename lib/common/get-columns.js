module.exports =  function(source) {

    var columns = [];
    var userColumns = this.$parent.columns;
    var extras = typeof this.$parent.extras=='undefined'?false:this.$parent.extras;
    var data = source=='client'?this.$parent.tableData:this.tableData;

    for (var x in data[0]) {
      if (!userColumns || $.inArray(x,userColumns)>-1)
        columns.push(x);
    }

    if (extras) {
      for (var column in extras) {
        columns.push(column);
      }
    }

    return columns;

  }
