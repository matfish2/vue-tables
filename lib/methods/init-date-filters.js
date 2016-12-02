var merge = require('merge');

module.exports = function() {

  var el;
  var init = this.options.filtersInitialValues;
  var initialValues ;

  var options = {
    autoUpdateInput:false,
    singleDatePicker:false,
    locale: {
      format: this.options.dateFormat
    }
  };

  var datepickerOptions = merge.recursive(this.options.datepickerOptions, options);

  var that = this;

    that.options.dateColumns.forEach(function(column) {
     el =  $(that.$el).find("#VueTables__" + column + "-filter");

      initialValues = {};

      if (init.hasOwnProperty(column)) {

        initialValues = {
          startDate:init[column].start.format(that.options.dateFormat),
          endDate:init[column].end.format(that.options.dateFormat)
        }

       el.text(initialValues.startDate + " - " + initialValues.endDate);
      }
     
     if (that.options.perColumnDatepickerOptions && that.options.perColumnDatepickerOptions[column]) {
       var datepickerOptions = merge.recursive(datepickerOptions,that.options.perColumnDatepickerOptions[column]);
     }

     el.daterangepicker(merge.recursive(datepickerOptions, initialValues));
     el.on('apply.daterangepicker', function(ev, picker) {

      that.query[column] = {
        start:picker.startDate.format('YYYY-MM-DD'),
        end: picker.endDate.format('YYYY-MM-DD')
      };

      $(this).text(picker.startDate.format(that.options.dateFormat) + " - " + picker.endDate.format(that.options.dateFormat));

      that.search();
    });

     el.on('cancel.daterangepicker', function(ev, picker) {
      that.query[column] = '';
      $(this).html("<span class='VueTables__filter-placeholder'>" + that.display('filterBy',that.getHeading(column) + "</span>"));

      that.search();
      });

   });


}
