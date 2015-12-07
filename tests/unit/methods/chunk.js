describe('set the page to the beginning of the requested chunk', function() {
    var chunk = require('../../../lib/methods/chunk');
     var context = {
         page:null,
          setPage:function(page) {
            this.page = page;
          },
        currentChunk:4,
        options:{
          pagination:{
            chunk: 5
          }
        }
      };

    it("next chunk first page", function() {

      var page = chunk.call(context, 1);
         expect(context.page).toBe(21);
         context.page = null;
    });

    it("prev chunk first page", function() {
      var page = chunk.call(context, -1);
         expect(context.page).toBe(11);
    });

});

