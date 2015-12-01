describe('determine if a given page is active', function() {
    var active = require('../../../lib/methods/active');
     var context = {
        page: 4
      };

    it("returns 'active' if the given page is not the current one", function() {
      var activeClass = active.call(context, 3); // the page is given as a position in a zero-based array, so the actual page is +1
      expect(activeClass).toBe('active');
    });

    it("returns an empty string if the given page is not the current one", function() {
      var activeClass = active.call(context, 5);
      expect(activeClass).toBe('');
    });

});

