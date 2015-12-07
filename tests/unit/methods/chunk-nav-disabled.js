// TEST ME
// module.exports = function(direction) {
//     return (direction==1 && this.currentChunk==this.totalChunks)
//     ||  (direction==-1 && this.currentChunk==1)
//   }

describe('determine if the chunk nav link is disabled', function() {

  var chunkNavDisabled = require('../../../lib/methods/chunk-nav-disabled');


  it('should allows navigating to the next chunk if there is one', function() {

  var context = {
    currentChunk:4,
    totalChunks:5
  }

    expect(chunkNavDisabled.call(context, 1)).toBe(false);

  });

  it('should not allow navigating to the next chunk if there isn\'t one', function() {

  var context = {
    currentChunk:4,
    totalChunks:4
  }

    expect(chunkNavDisabled.call(context, 1)).toBe(true);

  });

  it('should allow navigating to the prev chunk if there is one', function() {

  var context = {
    currentChunk:4,
    totalChunks:4
  }

    expect(chunkNavDisabled.call(context, -1)).toBe(false);

  });

    it('should not allow navigating to the prev chunk if there isn\'t one', function() {

  var context = {
    currentChunk:1,
    totalChunks:3
  }

    expect(chunkNavDisabled.call(context, -1)).toBe(true);

  });

});

