exports.install = function(Vue, opts) {

  var merge_options = require('./helpers/merge-options');

  var client = {
    template:require('./client-table.html'),
    ready: function() {

      this.dateFormatter = require('./helpers/date-formatter').get(this.$parent.dateFormat);

      var data = JSON.parse(JSON.stringify(this.$parent.tableData));

      if (this.$parent.hasOwnProperty('texts'))
       this.texts = merge_options(this.texts, this.$parent.texts);

      if (this.$parent.hasOwnProperty('limit')
        && this.lengths.indexOf(this.$parent.limit)>-1)
      this.limit = this.$parent.limit;

     this.cols = this.getColumns('client');
     this.orderBy = this.cols[0];

     if (this.$parent.hasOwnProperty('templates'))
      this.renderTemplates(this.$parent.templates, data, 'client');

    if (this.$parent.hasOwnProperty('extras'))
      this.renderTemplates(this.$parent.extras, data, 'client');

    this.count = this.$parent.tableData.length;


  },

  data: require('./common/initial-data.js'),

  computed: {
    totalPages: require('./common/total-pages')
  },

  filters: {
    page:require('./filters/page'),
    setCount:require('./filters/set-count'),
    date: require('./filters/date')
  },

  methods: {
    active: require('./common/active'),
    orderClass: require('./common/order-class'),
    displayText:require('./common/display-text'),
    orderByColumn: require('./common/order-by-column'),
    getHeading: require('./common/get-heading'),
    setPage: require('./common/set-page'),
    renderTemplates: require('./common/render-templates'),
    getColumns: require('./common/get-columns'),
    sortable: require('./common/sortable')
  }

}

Vue.component('v-client-table',client);

}
