function wrapTemplate(tpl) {
  return "<span class='VueTables__template'>" +  tpl + "</span>";
}

function getMatches(template) {
  var matches = template.match(/{.+?}/g);

  if (!matches) return false;

  return matches.map(function(match) {
    return match.slice(1,-1);
  });
}

module.exports = function(value, row, column) {

  if (this.templatesKeys.indexOf(column)==-1)
    return value;

  var regex;

  if (typeof this.options.templates[column]=='function') {
    var tpl = this.options.templates[column].bind(this.$root);
    return wrapTemplate(tpl(row));
  }

  console.warn("vue-tables: using strings as templates is deprecated and will be removed in an upcoming release. Please use a function instead.");

  var template = wrapTemplate(this.options.templates[column]);
  var matches = getMatches(this.options.templates[column]);

  if (!matches) return template;

  matches.forEach(function(match) {

    if (row.hasOwnProperty(match)) {

    regex = new RegExp("{"+ match + "}","g");
    template = template.replace(regex,String(row[match]));

  }
  }.bind(this));

  return template;

}

