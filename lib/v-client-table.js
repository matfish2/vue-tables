var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, opts) {

  var client = {

    template:require('./client-table.html'),
    props: {
      data: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        required:false,
        default: defaults
      }
    },

    ready: function() {

      this.source = 'client';
      this.defaults = defaults();

      this.options = $.extend(true, this.defaults, this.options);

      this.countTemplate = this.options.texts.count;

      if (this.lengths.indexOf(this.options.perPage)>-1)
      this.limit = this.options.perPage;

      this.dateFormatter = require('./helpers/date-formatter').get(this.options.dateFormat);

      this.allColumns = object_keys(this.data[0]);

      this.columns = this.options.columns.length?
                     this.options.columns:
                     this.allColumns;

      this.templatesKeys = object_keys(this.options.templates);

      this.extras = this.templatesKeys.diff(this.allColumns);

      this.columns = this.columns.concat(this.extras);

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
      query:'',
      page:1,
      count:0,
      limit:10,
      countTemplate:'{count} Records'
    }
  },
  computed: {
    totalPages: require('./computed/total-pages'),
    paginationStart: require('./computed/pagination-start'),
    totalChunks: require('./computed/total-chunks'),
    currentChunk: require('./computed/current-chunk')
  },

  filters: {
    page:require('./filters/page'),
    setCount:require('./filters/set-count'),
    date: require('./filters/date'),
    render: require('./filters/render')
  },

  methods: {
    active: require('./methods/active'),
    orderClass: require('./methods/order-class'),
    orderByColumn: require('./methods/order-by-column'),
    getHeading: require('./methods/get-heading'),
    setPage: require('./methods/set-page'),
    addExtras: require('./methods/add-extras'),
    getColumns: require('./methods/get-columns'),
    sortable: require('./methods/sortable'),
    chunk: require('./methods/chunk'),
    disabled: require('./methods/disabled'),
    display: require('./methods/display')

  }

}

Vue.component('v-client-table',client);

}
