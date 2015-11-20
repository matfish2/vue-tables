module.exports = function(obj) {
  var count = 0;
  for (var prop in obj) {
    if (obj[prop].trim()) count++;
  }
  return count;
}
