module.exports = {
    get: function() {
      return Math.ceil(this.page / this.pagination.chunk);
    }
  }
