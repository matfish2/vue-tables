var methods = require('./mixins/methods');
var filters = require('./mixins/filters');
var computed = require('./mixins/computed');
var data = require('./mixins/data');
var created = require('./mixins/created');
var ready = require('./mixins/ready');
var template = require('./helpers/generate-table-html');
var VuePagination = require('v-pagination');

exports.install = function(Vue, globalOptions, customOptions) {

  Vue.use(VuePagination);

  var customTemplate = customOptions && customOptions.template
    ? customOptions.template
    : undefined;

  var client = {

    template: template({
      source:'Client',
      rowFilters:'| customFilters customQ | search q | orderBy orderBy.column orderBy.ascending | setCount | page',
      trackBy:':track-by="options.trackBy"',
      columnFilters:'| date | optionText column | highlightMatches column',
      loading:''
    }, customTemplate),
    mixins:[data, methods, filters, computed, created, ready],
    props: {
      columns:{
        type: Array,
        required:true
      },
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

      this.addCustomColumns();

      this.initOrderBy(this.columns[0]);

      // initialize query as a string or an object depending on options.filterByColumn
      this.query = this.initQuery();
      this.customQueries = this.initClientFilters();

      this.count = this.data.length;

    },

    ready: function() {

     this.$watch('query',function() {
      this.setPage(1);
     }.bind(this), {deep:true});

       this.registerClientFilters();

       if (this.hasDateFilters())
        this.initDateFilters();

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


