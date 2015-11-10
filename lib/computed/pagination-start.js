module.exports = {
    get: function() {
     return ((this.currentChunk-1) * this.options.pagination.chunk) +1;
    }
  }
