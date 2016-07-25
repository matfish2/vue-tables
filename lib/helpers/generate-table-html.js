module.exports = function(replacements, template) {
  template = template || require('../table-template.html');

  for (var replacement in replacements) {
    template = template.replace("[[" + replacement + "]]", replacements[replacement]);
  }

return template;

}
