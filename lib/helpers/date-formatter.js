module.exports =  {
  units : [],
  separator: null,
  get: function(format) {

    if (typeof format=='undefined') {

      return function(date) {
        return date.toLocaleDateString();
      }
    }

    var regex = new RegExp("[-\.\/]");

    var separator = format.match(regex);

    this.separator = separator?separator[0]:'-';

    var units = format.split(regex);
    var unit;

    var str = "";

    units.every(function(unit, index) {
      unit = this._getUnitFunction(unit);

      if (!unit) {
        return false;
      }

      this.units.push(unit);
      return true;
    }.bind(this));

    if (this.units.length<1 || this.units.length>3) {
     console.warn("Invalid Date Format:" + format);
     return function(date) {
      return date.toLocaleDateString();
    }
  }

  return function(date) {
    var formattedDate = '';

    this.units.forEach(function(unit) {
        formattedDate+= unit(date) + this.separator;
    }.bind(this));

    return formattedDate.slice(0,-1);

  }.bind(this)
},

_getUnitFunction: function(unit) {
 switch (unit) {
  case 'd':
  return function(date){ return date.getDate() };
  case 'm':
  return function (date) { return date.getMonth() + 1};
  case 'D':
  return function(date) {return ("0" + date.getDate()).slice(-2);}
  case 'M':
  return function(date) {return ("0" + (date.getMonth() + 1)).slice(-2);}
  case 'Y':
  case 'y':
  return function(date) {return date.getFullYear();}
}

return false;

}
}
