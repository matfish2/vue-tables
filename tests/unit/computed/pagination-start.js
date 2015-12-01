describe('Compute the first page of the current chunk', function() {

  var paginationStart = require('../../../lib/computed/pagination-start');

   var context = {
      currentChunk:3,
      options: {
        pagination: {
          chunk: 10
        }
      }
    };

  it('should return first page of the current chunk', function() {
    var page = paginationStart.get.call(context);
    expect(page).toBe(21);

    context.currentChunk = 5;
    context.options.pagination.chunk = 2;
    page = paginationStart.get.call(context);
    expect(page).toBe(9);

  });

});

