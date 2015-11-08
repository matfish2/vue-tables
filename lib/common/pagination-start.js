module.exports = {
    get: function() {

     return ((this.currentChunk-1) * this.pagination.chunk) +1 ;

    }
  }
