module.exports = function() {

  var expressions = ['count','limit','page','orderBy.column','orderBy.ascending'];

  expressions.forEach(function(expression) {
       this.$watch(expression, function(){
        this.compileTemplates();
      });
     }.bind(this));

}
