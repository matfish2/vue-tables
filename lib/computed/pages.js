module.exports = function() {
  return range(1,this.options.pagination.chunk);
}

function range(start, count) {
  return Array.apply(0, Array(count))
  .map(function (element, index) {
   return index + start;
 });
}
