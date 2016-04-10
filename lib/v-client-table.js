var object_keys = require('./helpers/object-keys');
var methods = require('./mixins/methods');
var filters = require('./mixins/filters');
var data = require('./mixins/data');

var template = require('./helpers/generate-table-html');
var VuePagination = require('v-pagination');

exports.install = function(Vue, globalOptions) {

  Vue.use(VuePagination);

  var client = {

    template: template({
      source:'Client',
      rowFilters:'| customFilters customQ | search q | orderBy orderBy.column orderBy.ascending | setCount | page',
      trackBy:'track-by="id"',
      columnFilters:'| date | highlightMatches column'
    }),
    mixins:[data, methods, filters],
    props: {
      data: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        required:false,
        default: function() {
          return {}
        }
      }
    },

    created: function() {

      // merge options (pre-defined defaults, global and local)
      var defaults = require('./config/defaults')('client');
      this.options = this.initOptions(defaults, globalOptions, this.options);

      if (this.options.compileTemplates)
        this.setClientWatchers();

      this.limit = this.options.perPage;

      // columns are gleaned from the first row
      this.allColumns = object_keys(this.data[0]);

      // then specified columns and templates are intergrated to override the initial input
      this.queryable = this.options.columns.length?this.options.columns:this.allColumns;
      this.templatesKeys = object_keys(this.options.templates);
      this.customColumns = this.templatesKeys.diff(this.allColumns);
      this.columns = this.queryable.concat(this.customColumns);
      this.addCustomColumns();

      this.initOrderBy(this.columns[0]);

      // initialize query as a string or an object depending on options.filterByColumn
      this.query = this.initQuery(this.queryable);
      this.customQueries = this.initClientFilters();

      this.count = this.data.length;


    },

    ready: function() {

      this.registerClientFilters();

       // initalize date filters
       if (this.options.dateColumns.length)
        this.initDateFilters();

      this.$on('vue-pagination::' + this.id, function(page) {
        this.setPage(page);
      });

      if (this.options.dateColumns.length && this.options.toMomentFormat) {
        this.transformDateStringsToMoment();
      }
    },

    data: function() {
      return {
        source:'client'
      }
    },
    computed: {
      q:require('./computed/q'),
      customQ: require('./computed/custom-q'),
      totalPages: require('./computed/total-pages')
    },

    filters: {
      page:require('./filters/page'),
      setCount:require('./filters/set-count'),
      date: require('./filters/date'),
      search: require('./filters/search'),
      customFilters: require('./filters/custom-filters')
    },

    methods: {
      setClientWatchers: require('./methods/set-client-watchers'),
      transformDateStringsToMoment: require('./methods/transform-date-strings-to-moment'),
      registerClientFilters: require('./methods/register-client-filters'),
      initClientFilters: require('./methods/init-client-filters')
    }

  }

  Vue.component('v-client-table',client);

}


