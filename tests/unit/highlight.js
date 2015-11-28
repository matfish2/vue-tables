describe('Highlight matches', function() {

  var dateFormatter = require('../../lib/filters/date');

  it('should format the date correctly', function() {

    expect(dateFormatter(new Date(2015,11,31),'dd-mm-yyyy')).toBe('31-12-2015');
  });

  it('should return the property unchaged if it is not a date object', function() {
    expect(dateFormatter('Ivan Handler')).toBe('Ivan Handler');
  });

});
