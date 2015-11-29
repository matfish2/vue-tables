describe('Draws a client-side table', function(){

  var draw_table = require('../helpers/draw-table');
  var data = require('../helpers/people.js');
  var entity = "people";

  beforeAll(function(done){
    draw_table(entity, data, {});
    setTimeout(function(){
      done();
    },1000);
});

it('counts the columns', function(){
  var count = $(".VueTables__count").eq(0).text();
  expect(count).toBe("100 Records");
})

it('displays the columns names', function() {
 var headings = $(".VueTables__heading");
 expect(headings.eq(0).text()).toBe('Id');
 expect(headings.eq(1).text()).toBe('Name');
 expect(headings.eq(2).text()).toBe('Age');

});

it('displays all default texts', function() {
 var search = $(".VueTables__search");
 var searchText = search.find("label").text();
 var searchPlaceholder = search.find("input").prop("placeholder");

 var limit = $(".VueTables__limit label").text();

 expect(searchText).toBe("Filter Results:");
 expect(searchPlaceholder).toBe("Search query");
 expect(limit).toBe("Records:");

});

it('applys the correct skin', function() {
  var table = $(".VueTables__table");
  expect(table.hasClass("table-striped")).toBe(true);
  expect(table.hasClass("table-bordered")).toBe(true);
  expect(table.hasClass("table-hover")).toBe(true);
  expect(table.hasClass("table-condensed")).toBe(false);

});

  afterAll(function(){
   $("#" + entity).remove();
  });
});
