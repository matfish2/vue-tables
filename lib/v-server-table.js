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

  var server = {
    template: template({
      source:'Server',
      rowFilters:'',
      trackBy:'',
      columnFilters:'| optionText column | highlightMatches column',
      loading:"loading?'loading':"
    }, customTemplate),
    mixins:[data, methods, filters,computed, created, ready],
    props: {
     columns:{
      type: Array,
      required:true
    },
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
      var defaults = require('./config/defaults')('server');
      this.options = this.initOptions(defaults, globalOptions, this.options);
      this.query = this.initQuery();

      if (this.options.compileTemplates)
        this.$on('vue-tables.loaded', function() {
          this.compileTemplates();
        });

      this.initOrderBy(this.columns[0]);

      // set initial records per page
      this.limit = this.options.perPage;

      // initialize query as a string or an object depending on options.filterByColumn
      this.customQueries = this.initServerFilters();

      if (this.hasDateFilters()) {
       setTimeout(function() {
        this.initDateFilters();
      }.bind(this),0);
     }
      // request data for the first time
      this.getData();

    },
    ready: function() {

      this.registerServerFilters();
    },
    data: function() {
      return {
        source:'server',
        data:[],
        loading:true,
        lastKeyStrokeAt:false
      }
    },

    methods: {
     refresh: require('./methods/refresh'),
     getData:require('./methods/get-data'),
     setData:require('./methods/set-data'),
     registerServerFilters: require('./methods/register-server-filters'),
     initServerFilters: require('./methods/init-server-filters')
   },
   computed: {
    totalPages: require('./computed/total-pages')
  }

}

Vue.component('v-server-table', server);

}


