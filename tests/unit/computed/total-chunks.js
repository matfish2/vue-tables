describe('calulates the total chunks for a given set of data', function() {

  var totalChunks = require('../../../lib/computed/total-chunks');

  var context = {
    options: {
      pagination: {
        chunk: 10
      }
    },
    totalPages:64
  };

  it('should return the correct number of chunks', function() {
    var chunks = totalChunks.get.call(context);
    expect(chunks).toBe(7);
  });


});

