describe('calulates the total number of pages for a given set of data', function() {

  var totalPages = require('../../../lib/computed/total-pages');

  var context = {
    count:345,
    limit:25
  }

  it('should return the correct number of pages', function() {
    var pages = totalPages.get.call(context);
    expect(pages).toBe(14);
  });


});

