var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, options) {

	var server = {
		template:require('./server-table.html'),
		props: {
			url: {
				type: String,
				required: true
			},
			options: {
				type: Object,
				required:false,
				default: defaults
			}
		},
		ready: function() {

			this.source = 'server';
			this.defaults = defaults();

			this.options = $.extend(true, this.defaults, this.options);

			this.countTemplate = this.options.texts.count;
 			if (this.lengths.indexOf(this.options.perPage)>-1)
 				this.limit = this.options.perPage;

			this.getData().done(function(data) {

					    this.allColumns = object_keys(data.data[0]);
							this.columns = this.options.columns.length?
							this.options.columns:
							this.allColumns;

							this.templatesKeys = object_keys(this.options.templates);
							this.extras = this.templatesKeys.diff(this.allColumns);
							this.columns = this.columns.concat(this.extras);
							this.orderBy = this.columns[0];

							this.setData(data);

			}.bind(this));

		},

		data: function() {
      return {
      data:[],
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
      lastKeyStrokeAt:false
    }
  },

		computed: {
			totalPages: require('./computed/total-pages'),
			paginationStart: require('./computed/pagination-start'),
			totalChunks: require('./computed/total-chunks'),
			currentChunk: require('./computed/current-chunk')

		},

		filters: {
			render: require('./filters/render')
		},

		methods: {
			active: require('./methods/active'),
			orderClass: require('./methods/order-class'),
			display:require('./methods/display'),
			orderByColumn:require('./methods/order-by-column'),
			getHeading: require('./methods/get-heading'),
			setPage: require('./methods/set-page'),
			addExtras: require('./methods/add-extras'),
			sortable: require('./methods/sortable'),
			chunk: require('./methods/chunk'),
			disabled: require('./methods/disabled'),
			search: function() {
				var elapsed;
				this.lastKeyStrokeAt = new Date();

				setTimeout(function() {
					elapsed = new Date() - this.lastKeyStrokeAt;

					if (elapsed>=this.options.delay) {
						this.page = 1;
						this.getData().done(function(data) {
							this.setData(data);
						}.bind(this));
					}
				}.bind(this),this.options.delay);

			},
			getData: function() {
				return $.ajax({
					url: this.url,
					dataType: "json",
					data: {
						query:this.query.trim(),
						limit:this.limit,
						orderBy:this.orderBy,
						ascending: this.ascending,
						page:this.page
					}
					});
			},
			setData: function(data) {
					this.data = data.data;
					this.count = data.count;

					this.addExtras();
			}

		}

	}

	Vue.component('v-server-table', server);

}
