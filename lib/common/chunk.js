module.exports = function(direction) {
    var page = (((this.currentChunk -1) + direction) * this.pagination.chunk) + 1;
    this.setPage(page);
  }
