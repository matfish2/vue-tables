describe('Page filter', function() {

  var page = require('../../../lib/filters/page');
  var data = require('../../helpers/people')();

   var context = {
      limit:50,
      page:2
    };

  it('should return the records for the given page', function() {
    var currentPageData = page.call(context, data);
    expect(currentPageData.length).toBe(50);
    expect(currentPageData[0].id).toBe(51);
  });


});

