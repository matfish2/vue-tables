exports.install = function(Vue, options) {

	var merge_options = require('./helpers/merge-options');

	var server = {
		template:'<div class="vue-table-wrapper"><div class="row"><div class="col-md-6"><div class="form-group form-inline pull-left vue-table-search"><label>{{texts.filter}}</label><input class="form-control" type="text" name="vue-search" placeholder="{{texts.filterPlaceholder}}" @keyup="setPage(1)" v-model="query"></div></div><div class="col-md-6"><div v-if="pagination.dropdown" class="form-group form-inline pull-right vue-table-select-pagination"> <label>{{texts.page}}</label> <select class="form-control" v-model="page" @change="setPage(page)"> <option v-for="page in totalPages">{{page+1}}</option> </select> </div><div class="form-group form-inline pull-right vue-limit"> <label>{{texts.limit}}</label> <select class="form-control" v-model="limit" name="{{filterPlaceholder}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option> </select> </div></div></div><table class="vue-table table table-striped"><thead><th @click="orderByColumn(cols[$index])" v-for="col in cols"><span class="vue-table-heading">{{getHeading(col)}}</span><i class="vue-table-sort-icon text-muted fa" v-bind:class="orderClass($index)"></i></th></thead><tbody><tr v-for="row in tableData"><td v-for="column in cols" v-html="row[column]"></td></tr></tbody></table><ul v-show="totalPages>1" v-if="!pagination.dropdown" class="pagination vue-table-pagination"> <li v-bind:class="disabled(-1)?\'disabled\':\'\'"><a href="javascript:void(0);" @click="!disabled(-1) && chunk(-1)"><<</a></li><li v-for="page in pagination.chunk" v-if="paginationStart + $index <=totalPages" v-bind:class="active(paginationStart + $index - 1)"><a href="javascript:void(0);" @click="setPage(paginationStart + $index)">{{paginationStart + $index}}</a></li><li v-bind:class="disabled(1)?\'disabled\':\'\'"><a href="javascript:void(0);" @click="!disabled(1) && chunk(1)">>></a></li></ul><p>{{displayText(texts.count, count)}}</p></div>',
		ready: function() {

      this.source = 'server';

			if (this.$parent.hasOwnProperty('texts'))
				this.texts = merge_options(this.texts, this.$parent.texts);

			if (this.$parent.hasOwnProperty('pagination'))
				this.pagination = merge_options(this.pagination, this.$parent.pagination);

      if (this.$parent.hasOwnProperty('limit')
        && this.lengths.indexOf(this.$parent.limit)>-1)
        this.limit = this.$parent.limit;

			this.getDataFromServer(true);

		},

		data: require('./common/initial-data'),

		computed: {
			totalPages: require('./common/total-pages'),
			paginationStart: require('./common/pagination-start'),
			totalChunks: require('./common/total-chunks'),
			currentChunk: require('./common/current-chunk')

		},

		methods: {
			active: require('./common/active'),
			orderClass: require('./common/order-class'),
			displayText:require('./common/display-text'),
			orderByColumn:require('./common/order-by-column'),
			getHeading: require('./common/get-heading'),
			setPage: require('./common/set-page'),
			renderTemplates: require('./common/render-templates'),
			getColumns: require('./common/get-columns'),
   	  sortable: require('./common/sortable'),
      chunk: require('./common/chunk'),
      disabled: require('./common/disabled'),

			getDataFromServer: function(first) {

				var that = this;

				var promise = $.ajax({
					url: this.$parent.url,
					dataType: "json",
					data: {
						query:this.query.trim(),
						limit:this.limit,
						orderBy:this.orderBy,
						ascending: this.ascending,
						page:this.page
					},
					success: function(data) {

						var tdata = JSON.parse(JSON.stringify(data.data));

						that.tableData = data.data;
						that.count = data.count;

						if (first) {

							that.cols = that.getColumns('server');
							that.orderBy = that.cols[0];
						}

						if (that.$parent.hasOwnProperty('templates'))
							that.renderTemplates(that.$parent.templates, tdata);

						if (typeof that.$parent.extras!=='undefined')
							that.renderTemplates(that.$parent.extras, tdata);

					}
				});

				return promise;
			}

		}

	}

	Vue.component('v-server-table', server);

}
