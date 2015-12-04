var object_keys = require('./helpers/object-keys');
var methods = require('./mixins/methods');
var computed = require('./mixins/computed');
var filters = require('./mixins/filters');
var data = require('./mixins/data');
var template = require('./helpers/generate-table-html');

exports.install = function(Vue, globalOptions) {

  var client = {

    template: template({
      source:'Client',
      rowFilters:'| search q | orderBy orderBy.column orderBy.ascending | setCount | page',
      trackBy:'track-by="id"',
      columnFilters:'| date | highlightMatches column'
    }),
    mixins:[data, methods, computed, filters],
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

      if (!this.data.length) {
          console.error("v-client-table: the data array must have at least one row object.");
          return;
      }

      // merge options (pre-defined defaults, global and local)
      var defaults = require('./config/defaults')();
      this.options = this.initOptions(defaults, globalOptions, this.options);

      if (this.options.compileTemplates)
        this.setClientWatchers();

        this.limit = this.options.perPage;

      // columns are gleaned from the first row
      this.allColumns = object_keys(this.data[0]);

      // then specified columns and templates are intergrated to override the initial input
      this.queryable = this.getQueryableColumns(this.allColumns);
      this.templatesKeys = object_keys(this.options.templates);
      this.customColumns = this.templatesKeys.diff(this.allColumns);
      this.columns = this.queryable.concat(this.customColumns);
      this.addCustomColumns();

      this.initOrderBy(this.columns[0]);

      // initialize query as a string or an object depending on options.filterByColumn
      this.query = this.initQuery(this.queryable);

      this.count = this.data.length;


    },

    data: function() {
      return {
        source:'client'
      }
    },
    computed: {
      q:require('./computed/q')
    },

    filters: {
      page:require('./filters/page'),
      setCount:require('./filters/set-count'),
      date: require('./filters/date'),
      search: require('./filters/search')
    },

    methods: {
      getQueryableColumns: require('./methods/get-queryable-columns'),
      setClientWatchers: require('./methods/set-client-watchers')
}

}

Vue.component('v-client-table',client);

}


