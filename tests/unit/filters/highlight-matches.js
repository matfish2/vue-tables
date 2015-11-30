describe('Highlight matches', function() {

 var highlight = require('../../../lib/filters/highlight-matches');

    var context = {
      options: {
        highlightMatches:true,
        filterByColumn:false
      },
      query:'light',
      templatesKeys:[]
    };

  it("highlights matches", function() {
    var highlighted = highlight.call(context, "Highlight me","currentColumn");
    expect(highlighted).toBe("High<b class='VueTables__highlight'>light</b> me");
  });

  it("does not highlights non-matches", function() {
    var highlighted = highlight.call(context, "All darkness","currentColumn");
    expect(highlighted).toBe("All darkness");
  });
});
