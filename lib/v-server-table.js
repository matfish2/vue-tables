var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();

exports.install = function(Vue, options) {

	var server = {
		template:'<div class="vue-table-wrapper"><div class="row"><div class="col-md-6"><div class="form-group form-inline pull-left vue-table-search"><label>{{display(\'filter\')}}</label><input class="form-control" type="text" name="vue-search" placeholder="{{display(\'filterPlaceholder\')}}" @keyup="setPage(1)" v-model="query"></div></div><div class="col-md-6"><div v-if="options.pagination && options.pagination.dropdown" class="form-group form-inline pull-right vue-table-select-pagination"> <label>{{display(\'page\')}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select> </div><div class="form-group form-inline pull-right vue-limit"> <label>{{display(\'limit\')}}</label> <select class="form-control" v-model="limit" name="{{filterPlaceholder}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option> </select> </div></div></div><table class="vue-table table table-striped"><thead><th @click="orderByColumn(column)" v-for="column in columns"><span class="vue-table-heading">{{getHeading(column)}}</span><i class="vue-table-sort-icon text-muted fa" v-bind:class="orderClass(column)"></i></th></thead><tbody><tr v-for="row in data"><td v-for="column in columns" v-html="row[column] | render row column"></td></tr><tr v-if="!count"> <td class="text-center" colspan="{{columns.length}}">{{display(\'noResults\')}}</td></tr></tbody></table><ul v-show="totalPages>1" v-if="options.pagination && !options.pagination.dropdown" class="pagination vue-table-pagination"> <li v-bind:class="disabled(-1)?\'disabled\':\'\'"><a href="javascript:void(0);" @click="!disabled(-1) && chunk(-1)"><<</a></li><li v-for="page in options.pagination.chunk" v-if="paginationStart + $index <=totalPages" v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);" @click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li v-bind:class="disabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);" @click="!disabled(1) && chunk(1)">>></a></li></ul><p v-if="count">{{display(\'count\', count)}}</p></div>',
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

			this.getDataFromServer(true);

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

			getDataFromServer: function(first) {

				var that = this;

				var promise = $.ajax({
					url: this.url,
					dataType: "json",
					data: {
						query:this.query.trim(),
						limit:this.limit,
						orderBy:this.orderBy,
						ascending: this.ascending,
						page:this.page
					},
					success: function(data) {

						that.data = data.data;
						that.count = data.count;

						if (first) {
							that.allColumns = object_keys(data.data[0]);
							that.columns = that.options.columns.length?
							that.options.columns:
							that.allColumns;

							that.templatesKeys = object_keys(that.options.templates);
							that.extras = that.templatesKeys.diff(that.allColumns);
							that.columns = that.columns.concat(that.extras);
							that.orderBy = that.columns[0];
						}

						that.addExtras();

					}

				});

				return promise;
			}

		}

	}

	Vue.component('v-server-table', server);

}
