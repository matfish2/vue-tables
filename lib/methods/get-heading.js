module.exports = function(value) {
    return this.options.headings.hasOwnProperty(value)?
    this.options.headings[value]:
    value.split("_").join(" ").ucfirst();
  }
