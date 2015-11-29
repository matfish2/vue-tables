var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();
var methods = require('./mixins/methods');
var computed = require('./mixins/computed');
var filters = require('./mixins/filters');
var data = require('./mixins/data');
var template = require('./helpers/generate-table-html');

exports.install = function(Vue, globalOptions) {

	var server = {
      template: template({
      source:'server',
      rowFilters:'',
      trackBy:'',
      columnFilters:'| highlightMatches column'
    }),
		mixins:[methods, computed, filters, data],
		props: {
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
		ready: function() {

			this.defaults = defaults();

			 if (globalOptions) {
      this.defaults = $.extend(true, this.defaults, globalOptions);
      }

			this.options = $.extend(true, this.defaults, this.options);

 			if (this.lengths.indexOf(this.options.perPage)>-1)
 				this.limit = this.options.perPage;

			this.getData().done(function(data) {

							if (!data.count && !this.options.columns.length) {
								console.error("vue-tables: unable to set column names. No results returned from server upon first request. Please declare the columns excplicitly.");
								return;
							}

					    this.allColumns = object_keys(data.data[0]);

							this.columns = this.options.columns.length?
							this.options.columns:
							this.allColumns;

      				this.query = this.initQuery(this.columns);

							this.templatesKeys = object_keys(this.options.templates);
							this.extras = this.templatesKeys?this.templatesKeys.diff(this.columns):[];
							this.columns = this.columns.concat(this.extras);

							this.orderBy = this.columns[0];

							this.setData(data);

			}.bind(this));

		},

		data: function() {
      return {
      source:'server',
      data:[],
      lastKeyStrokeAt:false
    }
  },

		methods: {
			refresh: require('./methods/refresh'),
			getData:require('./methods/get-data'),
			setData:require('./methods/set-data')
		}

	}

	Vue.component('v-server-table', server);

}


