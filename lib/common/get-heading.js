module.exports = function(value) {
    return typeof this.$parent.headings!='undefined' && this.$parent.headings.hasOwnProperty(value)?
    this.$parent.headings[value]:
    value.split("_").join(" ");
  }
