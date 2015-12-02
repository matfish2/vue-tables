module.exports = function(value, row, column) {

if ($.inArray(column, this.templatesKeys)==-1)
return value;

var regex;
var template = "<span class='VueTables__template'>" +  this.options.templates[column] + "</span>";

   this.allColumns.forEach(function(col) {

      regex = new RegExp("{"+ col + "}","g");
      template = template.replace(regex,String(row[col]));

    }.bind(this));

 return template;

}
