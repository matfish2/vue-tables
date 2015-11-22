var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, globalOptions) {

	var server = {
		template:'<div class="VueTables VueTables--server"> <div class="row"> <div class="col-md-6"> <div v-if="!options.filterByColumn" class="form-group form-inline pull-left VueTables__search"> <label>{{display(\'filter\')}}</label> <input class="form-control" type="text" placeholder="{{display(\'filterPlaceholder\')}}" @keyup="search()" v-model="query"/> </div></div><div class="col-md-6"> <div v-if="options.pagination && options.pagination.dropdown && totalPages>0" class="form-group form-inline pull-right VueTables__dropdown-pagination"> <label>{{display(\'page\')}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select></div><div class="form-group form-inline pull-right VueTables__limit"> <label>{{display(\'limit\')}}</label> <select class="form-control" v-model="limit" name="{{filterPlaceholder}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option></select></div></div></div><table class="VueTables__table table table-striped"> <thead> <tr> <th @click="orderByColumn(column)" v-for="column in columns"><span class="VueTables__heading">{{getHeading(column)}}</span> <span class="VueTables__sort-icon glyphicon" v-bind:class="orderClass(column)"></span></th> </tr><tr v-if="options.filterByColumn" class="VueTables__filters-row"> <th v-for="column in columns"> <input v-if="extras.indexOf(column)==-1" class="form-control" type="text" placeholder="{{display(\'filterBy\',getHeading(column))}}" v-model="query[column]" @keyup="search(true)"> </th> </tr></thead> <tbody> <tr v-for="row in data"> <td v-for="column in columns" v-html="row[column] | render row column"></td></tr><tr v-if="count==0"> <td class="VueTables__no-results text-center" colspan="{{columns.length}}">{{display(\'noResults\')}}</td></tr></tbody></table><ul v-show="totalPages>1" v-if="options.pagination && !options.pagination.dropdown" class="pagination VueTables__pagination"> <li class="VueTables__pagination-item VueTables__pagination-item-prev" v-bind:class="disabled(-1)?\'disabled\':\'\'"> <a href="javascript:void(0);" @click="!disabled(-1) && chunk(-1)"><<</a></li><li class="VueTables__pagination-item"v-for="page in options.pagination.chunk"v-if="paginationStart + $index <=totalPages"v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);"@click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li class="VueTables__pagination-item VueTables__pagination-item-next"v-bind:class="disabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);"@click="!disabled(1) && chunk(1)">>></a></li></ul><p v-if="count!=0"class="VueTables__count">{{display(\'count\', count)}}</p></div>',
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

			this.source = 'server';
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
      data:[],
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
      countTemplate:'{count} Records',
      lastKeyStrokeAt:false,
      loading:false
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
      initQuery: require('./methods/init-query'),
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
			search: function(byColumn) {
				var elapsed;
				var query = this.getQuery(byColumn);

				this.lastKeyStrokeAt = new Date();

				setTimeout(function() {
					elapsed = new Date() - this.lastKeyStrokeAt;

					if (elapsed>=this.options.delay) {
						this.page = 1;
						this.loading = true;
						this.getData(query, byColumn).done(function(data) {
							this.setData(data);
							this.loading = false;
						}.bind(this));
					}
				}.bind(this),this.options.delay);

			},
			refresh: function() {
				this.search(this.byColumn);
			},
			getQuery: function(byColumn) {

				return byColumn?
								$.param(this.query):
								this.query.trim();

			},
			getData: function(query, byColumn) {

				this.$dispatch('vue-tables.loading');

				var data =  {
						query:query,
						limit:this.limit,
						orderBy:this.orderBy,
						ascending: this.ascending,
						page:this.page,
						byColumn:byColumn?1:0
					};

					var data = $.param(data);

				return $.ajax({
					url: this.url,
					dataType: "json",
					data: data
					});
			},
			setData: function(data) {
					this.data = data.data;
					this.count = data.count;

					this.addExtras();

					this.$dispatch('vue-tables.loaded');
			}

		}

	}

	Vue.component('v-server-table', server);

}
