describe('it filters down the data according to the query', function() {

  var search = require('../../../lib/filters/search');
  var data = require('../../helpers/people')();

  var context = {
    isListFilter:require('../../../lib/methods/is-list-filter'),
    $dispatch: function() {},
    initPagination: function() {},
    options: {
      listColumns:{},
      filterByColumn:false,
      dateColumns:[],
    },
    columns: ['id','age','name']
  }
  it('should return a filtered set of results when using a generic filter', function() {

     var filtered = search.call(context, data, "da");
     expect(filtered.length).toBe(8);
  });

    it('should return a filtered set of results when using a per column filter', function() {

      context.options.filterByColumn = true;

      // the query is passed as a string rather than an object so that vue can detect changes. See the "q" computed property.
      // If you know a better way please let me know, or simply send a pull request

      var filtered = search.call(context, data, '{"id":"","name":"ad","age":"3","date":""}');
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(52);
      expect(filtered[1].id).toBe(94);

  });

});

