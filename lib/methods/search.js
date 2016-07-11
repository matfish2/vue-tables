module.exports = function() {

        if (this.source=='client') {
         this.initPagination();
          return;
        }

              this.initPagination();

            if (this.options.pagination.dropdown)
            this.getData().then(function(data) {
              var data = data.json();

              this.setData(data);
            }.bind(this));

}
