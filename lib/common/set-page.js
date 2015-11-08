module.exports = function(page, source) {

    this.page = page;

     if (source=='server')
      this.getDataFromServer();
}
