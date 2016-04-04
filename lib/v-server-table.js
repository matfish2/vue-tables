var object_keys = require('./helpers/object-keys');
var methods = require('./mixins/methods');
var filters = require('./mixins/filters');
var data = require('./mixins/data');
var template = require('./helpers/generate-table-html');
var VuePagination = require('v-pagination');

exports.install = function(Vue, globalOptions) {

  Vue.use(VuePagination);

  var server = {
    template: template({
      source:'Server',
      rowFilters:'',
      trackBy:'',
      columnFilters:'| highlightMatches column'
    }),
    mixins:[data, methods, filters],
    props: {
     url: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required:false,
      default: function()
      {
        return {}
      }
    }
  },
  created: function() {

      // merge options (pre-defined defaults, global and local)
      var defaults = require('./config/defaults')();
      this.options = this.initOptions(defaults, globalOptions, this.options);

      if (this.options.compileTemplates)
        this.$on('vue-tables.loaded', function() {
          this.compileTemplates();
        });

      this.initOrderBy('id');

      // set initial records per page
      this.limit = this.options.perPage;

      // request data for the first time
      this.getData().then(function(data) {

        var data = data.data;

        if (!data.count && !this.options.columns.length) {
          console.error("v-server-table: unable to set column names. No results returned from server upon first request. Please declare the columns excplicitly.");
          return;
        }

              // get all returned columns based on the first object
              this.allColumns = object_keys(data.data[0]);

              // determine displayable columns
              this.columns = this.options.columns.length?
              this.options.columns:
              this.allColumns;

              // initialize query as a string or an object depending on options.filterByColumn
              this.query = this.initQuery(this.columns);

              // add custom templates
              this.templatesKeys = object_keys(this.options.templates);
              this.customColumns = this.templatesKeys?this.templatesKeys.diff(this.columns):[];
              this.columns = this.columns.concat(this.customColumns);

              this.setData(data);

               if (this.options.dateColumns.length) {
               setTimeout(function() {
                this.initDateFilters();
               }.bind(this),0);
              }

            }.bind(this));

    },
    ready: function() {
      this.$on('vue-pagination::' + this.id, function(page) {
     this.setPage(page);
      });
    },

    data: function() {
      return {
        source:'server',
        data:[],
        lastKeyStrokeAt:false
      }
    },

    methods: {
     refresh: require('./methods/refresh'),
     getData:require('./methods/get-data'),
     setData:require('./methods/set-data')
   },
   computed: {
      totalPages: require('./computed/total-pages')
   }

 }

 Vue.component('v-server-table', server);

}


