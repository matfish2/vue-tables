  var object_keys = require('../helpers/object-keys');

module.exports = function(cols, data, source) {

    var regex;
    var field;
    var columns = object_keys(data[0]);
    var tableData = source=='client'?
                    this.$parent.tableData:
                    this.tableData;

    data.forEach(function(row, index){

      for (var col in cols) {

        field = cols[col];

        columns.forEach(function(column) {

          regex = new RegExp("{"+ column + "}","g");
          field = field.replace(regex,row[column]);
        });


        tableData[index][col] = field;
      }

    }.bind(this));
  }
