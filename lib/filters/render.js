module.exports = function(value, row, column) {

if (!this.templatesKeys || this.templatesKeys.indexOf(column) == -1 )
return value;

var regex;
var template = this.templates[column];

   this.cols.forEach(function(col) {

      regex = new RegExp("{"+ col + "}","g");
      template = template.replace(regex,String(row[col]));

    }.bind(this));

 return template;

}
