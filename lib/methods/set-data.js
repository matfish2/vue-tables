module.exports =  function(data) {
  this.data = data.data;
  this.count = data.count;

  this.addExtras();

  setTimeout(function(){
    this.$dispatch('vue-tables.loaded',data);
  }.bind(this),0);

}
