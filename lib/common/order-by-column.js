module.exports = function(colName, source) {

    if (!this.sortable(colName, source))
      return;

        if (colName==this.orderBy) {
          this.ascending = this.ascending==1?-1:1;
        }

        this.orderBy = colName;

        if (source=='server')
          this.getDataFromServer();

}
