function wrapTemplate(tpl) {
  return "<span class='VueTables__template'>" +  tpl + "</span>";
}

module.exports = function(value, row, column) {

  if ($.inArray(column, this.templatesKeys)==-1)
    return value;

  var regex;

  if (typeof this.options.templates[column]=='function') {
    var tpl = this.options.templates[column](row);
    return wrapTemplate(tpl);
  }

  var template = wrapTemplate(this.options.templates[column]);

  this.allColumns.forEach(function(col) {

    regex = new RegExp("{"+ col + "}","g");
    template = template.replace(regex,String(row[col]));

  }.bind(this));

  return template;

}
