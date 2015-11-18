var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, globalOptions) {

  var client = {

    template:'<div class="VueTables VueTables--client"> <div class="row"> <div class="col-md-6"> <div class="form-group form-inline pull-left VueTables__search"> <label>{{display(\'filter\')}}</label><input class="form-control" type="text" placeholder="{{display(\'filterPlaceholder\')}}" @keyup="setPage(1)" v-model="query"> </div></div><div class="col-md-6"> <div v-if="options.pagination && options.pagination.dropdown" class="form-group form-inline pull-right VueTables__dropdown-pagination"> <label>{{display(\'page\')}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select> </div><div class="form-group form-inline pull-right VueTables__limit"> <label>{{display(\'limit\')}}</label> <select class="form-control" v-model="limit" @change="setPage(1)" ><option v-for="length in lengths">{{length}}</option> </select></div></div></div><table class="VueTables__table table table-striped"><thead><th @click="orderByColumn(column)" v-for="column in columns"><span class="VueTables__heading">{{getHeading(column)}}</span> <span class="VueTables__sort-icon glyphicon" v-bind:class="orderClass(column)"></span> </th> </thead> <tbody> <tr v-for="row in data | filterBy query in queryable | orderBy orderBy ascending | setCount | page " track-by="id"> <td v-for="column in columns" v-html="row[column] | render row column | date"> </td></tr><tr v-if="count==0" class="VueTables__no-results"> <td class="text-center" colspan="{{columns.length}}">{{display(\'noResults\')}}</td></tr></tbody></table><ul v-show="totalPages>1" v-if="options.pagination && !options.pagination.dropdown" class="pagination VueTables__pagination"> <li class="VueTables__pagination-item VueTables__pagination-item-prev" v-bind:class="disabled(-1)?\'disabled\':\'\'"><a href="javascript:void(0);" @click="!disabled(-1) && chunk(-1)"><<</a></li><li class="VueTables__pagination-item"v-for="page in options.pagination.chunk"v-if="paginationStart + $index <=totalPages"v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);"@click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li class="VueTables__pagination-item VueTables__pagination-item-next"v-bind:class="disabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);"@click="!disabled(1) && chunk(1)">>></a></li></ul><p v-if="count!=0"class="VueTables__count">{{display(\'count\', count)}}</p></div>',
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

      this.countTemplate = this.options.texts.count;

      if (this.lengths.indexOf(this.options.perPage)>-1)
      this.limit = this.options.perPage;

      this.dateFormatter = require('./helpers/date-formatter').get(this.options.dateFormat);

      this.allColumns = object_keys(this.data[0]);

      this.queryable = this.getqueryableColumns();

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
      query:'',
      page:1,
      count:0,
      limit:10,
      countTemplate:'{count} Records',
      queryable:[]
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
    render: require('./filters/render'),
  },

  methods: {
    active: require('./methods/active'),
    orderClass: require('./methods/order-class'),
    orderByColumn: require('./methods/order-by-column'),
    getHeading: require('./methods/get-heading'),
    setPage: require('./methods/set-page'),
    addExtras: require('./methods/add-extras'),
    sortable: require('./methods/sortable'),
    chunk: require('./methods/chunk'),
    disabled: require('./methods/disabled'),
    display: require('./methods/display'),
    getqueryableColumns: function() {

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
