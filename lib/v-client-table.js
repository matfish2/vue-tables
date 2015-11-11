var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, opts) {

  var client = {

    template:"<div class=\"vue-table-wrapper\">\n<div class=\"row\">\n<div class=\"col-md-6\">\n<div class=\"form-group form-inline pull-left vue-table-search\">\n<label>{{options.texts?options.texts.filter:''}}</label>\n\t<input class=\"form-control\" type=\"text\" name=\"vue-search\" placeholder=\"{{options.texts?options.texts.filterPlaceholder:''}}\" @keyup=\"setPage(1)\" v-model=\"query\">\n</div>\n</div>\n<div class=\"col-md-6\">\n\n<div v-if=\"options.pagination && options.pagination.dropdown\" class=\"form-group form-inline pull-right vue-select-pagination\">\n <label>{{options.texts?options.texts.page:''}}</label>\n  <select class=\"form-control\" v-model=\"page\" @change=\"setPage(page)\">\n \t\t<option v-for=\"page in totalPages\">{{page+1}}</option>\n </select>\n </div>\n\n<div class=\"form-group form-inline pull-right vue-limit\">\n <label>{{options.texts?options.texts.limit:''}}</label>\n <select class=\"form-control\" v-model=\"limit\" @change=\"setPage(1)\" >\n \t<option v-for=\"length in lengths\">{{length}}</option>\n </select>\n </div>\n\n</div>\n</div>\n\t<table class=\"vue-table table table-striped\">\n\t\t\t\t<thead>\n\t\t\t\t\t<th @click=\"orderByColumn(column)\" v-for=\"column in columns\"><span class=\"vue-table-heading\">{{getHeading(column)}}</span><i class=\"vue-table-sort-icon text-muted fa\" v-bind:class=\"orderClass(column)\"></i></th>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for=\"row in data | filterBy query | orderBy orderBy ascending | setCount |  page \" track-by=\"id\">\n\t\t\t\t\t\t\t<td v-for=\"column in columns\" v-html=\"row[column] | render row column | date\"></td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\n\t</table>\n<ul v-show=\"totalPages>1\" v-if=\"options.pagination && !options.pagination.dropdown\" class=\"pagination vue-table-pagination\">\n  <li v-bind:class=\"disabled(-1)?'disabled':''\"><a href=\"javascript:void(0);\"  @click=\"!disabled(-1) && chunk(-1)\"><<</a></li>\n  <li v-for=\"page in options.pagination.chunk\"\n       v-if=\"paginationStart + $index <= totalPages\"\n       v-bind:class=\"active(paginationStart + $index - 1)\">\n      <a href=\"javascript:void(0);\" @click=\"setPage(paginationStart + $index)\">{{paginationStart + $index}}</a></li>\n  <li v-bind:class=\"disabled(1)?'disabled':''\"><a href=\"javascript:void(0);\" @click=\"!disabled(1) && chunk(1)\">>></a></li>\n</ul>\n\n<p>{{display(countTemplate, count)}}</p>\n</div>\n\n",
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
