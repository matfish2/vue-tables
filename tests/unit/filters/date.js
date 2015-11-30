describe('Date format', function() {

  var dateFormatter = require('../../../lib/filters/date');
   var context = {
      options: {
      dateFormat:"dd-mm-yyyy"
      }
    };

  it('should format the date correctly', function() {
    expect(dateFormatter.call(context, new Date(2015,11,31))).toBe('31-12-2015');
  });

  it('should return the property unchanged if it is not a date object', function() {
    expect(dateFormatter.call(context,'Ivan Handler')).toBe('Ivan Handler');
  });

});
