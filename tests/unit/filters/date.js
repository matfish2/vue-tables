describe('Date format', function() {

  var moment = require('moment');
  var dateFormatter = require('../../../lib/filters/date');
   var context = {
      options: {
      dateFormat:"DD-MM"
      }
    };

  it('should format the date correctly', function() {
    expect(dateFormatter.call(context, moment('2000 12 31','YYYY MM DD'))).toBe('31-12');
  });

  it('should return the property unchanged if it is not a date object', function() {
    expect(dateFormatter.call(context,'Ivan Handler')).toBe('Ivan Handler');
  });

});
