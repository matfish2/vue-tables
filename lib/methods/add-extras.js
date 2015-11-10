module.exports = function() {

    this.data.forEach(function(row,index) {

      this.extras.forEach(function(extra) {

      this.$set('data['+index+'].' + extra, this.options.templates[extra]);
      }.bind(this));

  }.bind(this));

return this.data;
}
