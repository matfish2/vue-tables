var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, globalOptions) {

	var server = {
		template:'<div class="VueTables VueTables--server"> <div class="row"> <div class="col-md-6"> <div class="form-group form-inline pull-left VueTables__search"> <label>{{display(\'filter\')}}</label> <span class="VueTables__search__input"> <input class="form-control" type="text" placeholder="{{display(\'filterPlaceholder\')}}" @keyup="search()" v-model="query"/> <span v-if="loading" class="VueTables__loading-icon"></span> </span> </div></div><div class="col-md-6"> <div v-if="options.pagination && options.pagination.dropdown" class="form-group form-inline pull-right VueTables__dropdown-pagination"> <label>{{display(\'page\')}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select></div><div class="form-group form-inline pull-right VueTables__limit"> <label>{{display(\'limit\')}}</label> <select class="form-control" v-model="limit" name="{{filterPlaceholder}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option></select></div></div></div><table class="VueTables__table table table-striped"> <thead> <th @click="orderByColumn(column)" v-for="column in columns"><span class="VueTables__heading">{{getHeading(column)}}</span> <span class="VueTables__sort-icon glyphicon" v-bind:class="orderClass(column)"></span></th> </thead> <tbody> <tr v-for="row in data"> <td v-for="column in columns" v-html="row[column] | render row column"></td></tr><tr v-if="count==0"> <td class="VueTables__no-results text-center" colspan="{{columns.length}}">{{display(\'noResults\')}}</td></tr></tbody></table><ul v-show="totalPages>1" v-if="options.pagination && !options.pagination.dropdown" class="pagination VueTables__pagination"> <li class="VueTables__pagination-item VueTables__pagination-item-prev" v-bind:class="disabled(-1)?\'disabled\':\'\'"> <a href="javascript:void(0);" @click="!disabled(-1) && chunk(-1)"><<</a></li><li class="VueTables__pagination-item"v-for="page in options.pagination.chunk"v-if="paginationStart + $index <=totalPages"v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);"@click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li class="VueTables__pagination-item VueTables__pagination-item-next"v-bind:class="disabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);"@click="!disabled(1) && chunk(1)">>></a></li></ul><p v-if="count!=0"class="VueTables__count">{{display(\'count\', count)}}</p></div>',
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
						this.loading = true;
						this.getData().done(function(data) {
							this.setData(data);
							this.loading = false;
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
