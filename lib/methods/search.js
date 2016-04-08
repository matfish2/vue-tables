module.exports = function() {

        if (this.source=='client') {
         this.initPagination();
          return;
        }

        var elapsed;

        this.lastKeyStrokeAt = new Date();

        setTimeout(function() {
          elapsed = new Date() - this.lastKeyStrokeAt;

          if (elapsed>=this.options.delay) {

              this.initPagination();
          }

        }.bind(this),this.options.delay);

}
