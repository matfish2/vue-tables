describe('Determine the current chunk index', function() {

  var currentChunk = require('../../../lib/computed/current-chunk');

   var context = {
      page:15,
      options: {
        pagination: {
          chunk: 10
        }
      }
    };

  it('should return the current chunk', function() {
    var chunk = currentChunk.get.call(context);
    expect(chunk).toBe(2);

    context.page = 5;
    context.options.pagination.chunk = 2;
    chunk = currentChunk.get.call(context);
    expect(chunk).toBe(3);

  });

});

