module.exports = function(unit) {
    switch (unit) {
    case 'd': // Day of month without leading zeros
    return function(date){
      return date.getDate();
    }
    case 'm': // Month without leading zeros
    return function (date) {
      return date.getMonth() + 1;
    }
    case 'D': // Day of month with leading zeros
    return function(date) {
      return ("0" + date.getDate()).slice(-2);
    }
    case 'M': // Month with leading zeros
    return function(date) {
      return ("0" + (date.getMonth() + 1)).slice(-2);
    }
    case 'Y': // Full year
    case 'y':
    return function(date) {
      return date.getFullYear();
    }
   case 'g': // 12-hour format of an hour without leading zeros
   return function(date) {
    var hours = date.getHours();
    return hours>12?hours-12:hours;
   }
  case 'G': // 24-hour format of an hour without leading zeros
  return function(date) {
    return date.getHours();
  }
  case 'h': // 12-hour format of an hour with leading zeros 01 through 12
  return function(date) {
    hours = date.getHours();
    hours = hours>12?hours-12:hours;
    return ("0" + hours).slice(-2);
  }
  case 'H': // 24-hour format of an hour with leading zeros 00 through 23
  return function(date) {
    return ("0" + date.getHours()).slice(-2);
  }
  case 'i': //  Minutes with leading zeros
  return function(date) {
    return ("0" + date.getMinutes()).slice(-2);
  }

case 's': // Seconds, with leading zeros
return function(date) {
  return ("0" + date.getSeconds()).slice(-2);
}
}

throw "vue-tables: invalid date format. Resorting to Date.toLocaleDateString()";

}
