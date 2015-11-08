module.exports = {
    get: function() {
      return Math.ceil(this.totalPages / this.pagination.chunk);
    }
  }
