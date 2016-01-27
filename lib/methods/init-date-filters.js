var merge = require('merge');

module.exports = function() {

  var el;
  var datepickerOptions = merge.recursive(this.options.datepickerOptions, {
    autoUpdateInput:false,
    singleDatePicker:false
  });

  var that = this;

  setTimeout(function() {
    that.options.dateColumns.forEach(function(column) {
     el =  $(that.$el).find("input[name=" + column + "]");

     el.daterangepicker(datepickerOptions);
     el.on('apply.daterangepicker', function(ev, picker) {

      that.query[column] = {start:picker.startDate.format('YYYY-MM-DD'),
      end: picker.endDate.format('YYYY-MM-DD')};
      el.val(picker.startDate.format(that.options.dateFormat) + " - " + picker.endDate.format(that.options.dateFormat));
      if (that.source=='server') that.search();
    });
   });
  },100);

}
