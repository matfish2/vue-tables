var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();
var methods = require('./mixins/methods');
var computed = require('./mixins/computed');
var filters = require('./mixins/filters');
var template = require('./helpers/generate-table-html');

exports.install = function(Vue, globalOptions) {

  var client = {

    template: template({
      source:'client',
      rowFilters:'| search q | orderBy orderBy ascending | setCount | page',
      trackBy:'track-by="id"',
      columnFilters:'| date | highlightMatches column'
    }),
    mixins:[methods, computed, filters],
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

    ready: function() {

      this.source = 'client';

      this.defaults = defaults();

      if (globalOptions)
        this.defaults = $.extend(true, this.defaults, globalOptions);

      this.options = $.extend(true, this.defaults, this.options);

      if (this.lengths.indexOf(this.options.perPage)>-1)
        this.limit = this.options.perPage;

      this.dateFormatter = require('./helpers/date-formatter').get(this.options.dateFormat);

      this.allColumns = object_keys(this.data[0]);

      this.queryable = this.getQueryableColumns();

      this.query = this.initQuery(this.queryable);

      this.templatesKeys = object_keys(this.options.templates);

      this.extras = this.templatesKeys.diff(this.allColumns);

      this.columns = this.queryable.concat(this.extras);

      this.data = this.addExtras();

      this.orderBy = this.columns[0];

      this.count = this.data.length;


    },

    data: function() {
      return {
        source:null,
        columns:[],
        allColumns:false,
        totalPages:null,
        lengths: [5,10,20,50],
        ascending:1,
        orderBy:null,
        query:null,
        page:1,
        count:0,
        limit:10,
        queryable:[]
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
      getQueryableColumns: require('./methods/get-queryable-columns')
}

}

Vue.component('v-client-table',client);

}


