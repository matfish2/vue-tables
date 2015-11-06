exports.install = function(Vue, opts) {

  var merge_options = require('./helpers/merge-options');

  var client = {
    template:'<div class="vue-table-wrapper"><div class="row"><div class="col-md-6"><div class="form-group form-inline pull-left vue-table-search"><label>{{texts.filter}}</label><input class="form-control" type="text" name="vue-search" placeholder="{{texts.filterPlaceholder}}" @keyup="setPage(1,\'client\')" v-model="query"></div></div><div class="col-md-6"><div class="form-group form-inline pull-right vue-limit"> <label>{{texts.limit}}</label> <select class="form-control" v-model="limit" name="{{filterPH}}" @change="setPage(1,\'client\')" > <option v-for="length in lengths">{{length}}</option> </select> </div></div></div><table class="vue-table table table-striped"><thead><th @click="orderByColumn(cols[$index],\'client\')" v-for="col in cols"><span class="vue-table-heading">{{getHeading(col)}}</span><i class="vue-table-sort-icon text-muted fa" v-bind:class="orderClass($index)"></i></th></thead><tbody><tr v-for="row in $parent.tableData | filterBy query | orderBy orderBy ascending | setCount | page " track-by="id"><td v-for="column in cols" v-html="row[column]"></td></tr></tbody></table><ul class="pagination vue-table-pagination" v-show="totalPages>1"> <li v-for="page in totalPages" v-bind:class="active($index)"><a href="javascript:void(0);" @click="setPage($index+1, \'client\')">{{$index +1}}</a></li></ul><p>{{displayText(texts.count, count)}}</p></div>',

    ready: function() {

      var data = JSON.parse(JSON.stringify(this.$parent.tableData));

      if (this.$parent.hasOwnProperty('texts'))
       this.texts = merge_options(this.texts, this.$parent.texts);

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
    setCount:require('./filters/set-count')
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
