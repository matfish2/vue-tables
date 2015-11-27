module.exports = function(colName) {

    if (!this.sortable(colName))
      return;

        if (colName==this.orderBy) {
          this.ascending = this.ascending==1?-1:1;
        }

        this.orderBy = colName;

        if (this.source=='server') {

          this.getData().done(function(data) {
            this.setData(data);
          }.bind(this));
        }


}
