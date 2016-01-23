module.exports = function(page) {

    this.page = page;

     if (this.source=='server')
      this.getData().then(function(data) {
          this.setData(data.data);
        }.bind(this));
}
