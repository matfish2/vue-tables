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

            if (this.options.pagination.dropdown)
            this.getData().then(function(data) {
              var data = data.data;

              this.setData(data);
            }.bind(this));
          }
        }.bind(this),this.options.delay);

}
