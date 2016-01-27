module.exports = function(val) {
  return typeof val.isValid=='function' && val.isValid();
}
