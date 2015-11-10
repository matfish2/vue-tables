module.exports = function(page) {

    this.page = page;

     if (this.source=='server')
      this.getDataFromServer();
}
