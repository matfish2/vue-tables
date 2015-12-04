module.exports = function(replacements) {

  var template = require('../table-template.html');

  for (var replacement in replacements) {
    template = template.replace("[[" + replacement + "]]", replacements[replacement]);
  }

return template;

}
