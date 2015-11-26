var object_keys = require('./helpers/object-keys');
var defaults = require('./config/defaults')();
var methods = require('./mixins/methods');
var computed = require('./mixins/computed');
var filters = require('./mixins/filters');

exports.install = function(Vue, globalOptions) {

	var server = {
    template:'<div class="VueTables VueTables--server"> <div class="row"> <div class="col-md-6"> <div v-if="!options.filterByColumn" class="form-group form-inline pull-left VueTables__search"> <label>{{display(\'filter\')}}</label> <input class="form-control" type="text" placeholder="{{display(\'filterPlaceholder\')}}" @keyup="search()" v-model="query"/> </div></div><div class="col-md-6"> <div v-if="options.pagination && options.pagination.dropdown && totalPages>0" class="form-group form-inline pull-right VueTables__dropdown-pagination"> <label>{{display(\'page\')}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select></div><div class="form-group form-inline pull-right VueTables__limit"> <label>{{display(\'limit\')}}</label> <select class="form-control" v-model="limit" name="{{filterPlaceholder}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option></select></div></div></div><table class="VueTables__table table table-striped"> <thead> <tr> <th @click="orderByColumn(column)" v-for="column in columns"><span class="VueTables__heading">{{getHeading(column)}}</span> <span class="VueTables__sort-icon glyphicon" v-bind:class="orderClass(column)"></span></th> </tr><tr v-if="options.filterByColumn" class="VueTables__filters-row"> <th v-for="column in columns"> <input v-if="extras.indexOf(column)==-1" class="form-control" type="text" placeholder="{{display(\'filterBy\',getHeading(column))}}" v-model="query[column]" @keyup="search(true)"> </th> </tr></thead> <tbody> <tr v-for="row in data"> <td v-for="column in columns" v-html="row[column] | render row column"></td></tr><tr v-if="count==0"> <td class="VueTables__no-results text-center" colspan="{{columns.length}}">{{display(\'noResults\')}}</td></tr></tbody></table><ul v-show="totalPages>1" v-if="options.pagination && !options.pagination.dropdown" class="pagination VueTables__pagination"> <li class="VueTables__pagination-item VueTables__pagination-item-prev-chunk" v-bind:class="chunkNavDisabled(-1)?\'disabled\':\'\'"> <a href="javascript:void(0);" @click="!chunkNavDisabled(-1) && chunk(-1)"><<</a></li><li class="VueTables__pagination-item VueTables__pagination-item-prev-page" v-bind:class="pageNavDisabled(-1)?\'disabled\':\'\'"> <a href="javascript:void(0);" @click="!pageNavDisabled(-1) && setPage(page-1)"><</a></li><li class="VueTables__pagination-item"v-for="page in options.pagination.chunk"v-if="paginationStart + $index <=totalPages"v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);"@click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li class="VueTables__pagination-item VueTables__pagination-item-next-page"v-bind:class="pageNavDisabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);"@click="!pageNavDisabled(1) && setPage(page+1)">></a></li><li class="VueTables__pagination-item VueTables__pagination-item-next-chunk"v-bind:class="chunkNavDisabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);"@click="!chunkNavDisabled(1) && chunk(1)">>></a></li></ul><p v-if="count!=0"class="VueTables__count">{{display(\'count\', count)}}</p></div>',
		mixins:[methods, computed, filters],
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

		methods: {
      search: require('./methods/search'),
			refresh: require('./methods/refresh'),
			getQuery: require('./methods/get-query'),
			getData:require('./methods/get-data'),
			setData:require('./methods/set-data')
		}

	}

	Vue.component('v-server-table', server);

}


