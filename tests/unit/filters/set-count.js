describe('it sets the current number of records', function() {

  var setCount = require('../../../lib/filters/set-count');
  var data = require('../../helpers/people');

   var context = {
    count:0
    };

  it('should set the count to match the data array length', function() {
    var count = setCount.call(context,data);
    expect(context.count).toBe(data.length);
  });

});

