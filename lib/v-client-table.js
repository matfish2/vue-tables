var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, globalOptions) {

  var client = {

    template: require('./client-table.html'),
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
      totalPages: require('./computed/total-pages'),
      paginationStart: require('./computed/pagination-start'),
      totalChunks: require('./computed/total-chunks'),
      currentChunk: require('./computed/current-chunk'),
        q: function() {
        return this.options.filterByColumn?JSON.stringify(this.query):this.query;
      }
    },

    filters: {
      page:require('./filters/page'),
      setCount:require('./filters/set-count'),
      date: require('./filters/date'),
      render: require('./filters/render'),
      search: require('./filters/search')
    },

    methods: {
      initQuery: require('./methods/init-query'),
      active: require('./methods/active'),
      orderClass: require('./methods/order-class'),
      orderByColumn: require('./methods/order-by-column'),
      getHeading: require('./methods/get-heading'),
      setPage: require('./methods/set-page'),
      addExtras: require('./methods/add-extras'),
      sortable: require('./methods/sortable'),
      chunk: require('./methods/chunk'),
      pageNavDisabled: require('./methods/page-nav-disabled'),
      chunkNavDisabled: require('./methods/chunk-nav-disabled'),
      display: require('./methods/display'),
        getQueryableColumns: function() {

 if (!this.options.columns.length)
  return this.allColumns;

var queryable =  this.allColumns.filter(function(n) {
  return this.options.columns.indexOf(n) != -1
}.bind(this));

return queryable.length?queryable:this.allColumns;

}

}

}

Vue.component('v-client-table',client);

}
