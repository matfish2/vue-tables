describe('Draws a client-side table', function(){

  var draw_table = require('../helpers/draw-table');
  var data = require('../helpers/people.js');
  var entity = "people";
  var defaults = require('../../lib/config/defaults')();

  beforeAll(function(done){
    vm = draw_table(entity, data, {});
    setTimeout(function(){
      table = $(".VueTables__table");
      paginationLinks = $(".VueTables__pagination li");
      search = $(".VueTables__search").eq(0);
      headings = $(".VueTables__heading");
      ths = $(".VueTables__table thead th");
      rows = $(".VueTables__table tbody tr");
      done();
    },1000);
});

it('counts the columns', function(){
  var countText = $(".VueTables__count").eq(0).text();
  expect(countText).toBe("100 Records");
})

it('displays the columns names', function() {

 expect(headings.eq(0).text()).toBe('Id');
 expect(headings.eq(1).text()).toBe('Name');
 expect(headings.eq(2).text()).toBe('Age');

});

it('displays all default texts', function() {

  var searchText = search.find("label").text();
  var searchPlaceholder = search.find("input").prop("placeholder");
  var limitText = $(".VueTables__limit label").text();

 expect(searchText).toBe("Filter Results:");
 expect(searchPlaceholder).toBe("Search query");
 expect(limitText).toBe("Records:");

});

it('applys the correct skin', function() {
  expect(table.hasClass("table-striped")).toBe(true);
  expect(table.hasClass("table-bordered")).toBe(true);
  expect(table.hasClass("table-hover")).toBe(true);
  expect(table.hasClass("table-condensed")).toBe(false);

});

it('adds a sortable class to the applicable th\'s', function() {

    expect(ths.eq(0).hasClass("VueTables__sortable")).toBe(true);
    expect(ths.eq(1).hasClass("VueTables__sortable")).toBe(true);
    expect(ths.eq(2).hasClass("VueTables__sortable")).toBe(true);

});

it('sorts by the first column in ascending order', function() {

  var sortIcon = $(".VueTables__table thead th").eq(0).find('.glyphicon-chevron-up');
  var firstRowId = rows.eq(0).find("td").eq(0).text();
  var lastRowId = rows.last().find("td").eq(0).text();

  expect(sortIcon.length).toBe(1);
  expect(firstRowId).toBe('1');
  expect(lastRowId).toBe(String(defaults.perPage));

});

it('shows the default rows per page', function() {

  expect(rows.length).toBe(defaults.perPage);

});

it('display the correct number of pages', function() {
  expect(paginationLinks.length).toBe(14); // 10 + 2 prev + 2 next
});

it('filters the records', function(done) {
    vm.query = "carol";
    promise = $.Deferred();

    setTimeout(function() {
      promise.resolve();
    },0);

    promise.then(function() {
      var rows = $(".VueTables__table tbody tr");
      var name = rows.eq(0).find("td").eq(1).text();
      expect(rows.length).toBe(1);
      expect(name).toBe("Carolina Fahey");
    }).always(done);

});
  afterAll(function(){
   $("#" + entity).remove();
  });
});
