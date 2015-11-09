var object_keys = require('./helpers/object-keys');

exports.install = function(Vue, options) {

	var merge_options = require('./helpers/merge-options');

	var server = {
		template: "<div class=\"vue-table-wrapper\">\n<div class=\"row\">\n<div class=\"col-md-6\">\n<div class=\"form-group form-inline pull-left vue-table-search\">\n<label>{{texts.filter}}</label>\n\t<input class=\"form-control\" type=\"text\" name=\"vue-search\" placeholder=\"{{texts.filterPlaceholder}}\" @keyup=\"setPage(1)\" v-model=\"query\">\n</div>\n</div>\n<div class=\"col-md-6\">\n\n<div v-if=\"pagination.dropdown\" class=\"form-group form-inline pull-right vue-table-select-pagination\">\n <label>{{texts.page}}</label>\n  <select class=\"form-control\" v-model=\"page\" @change=\"setPage(page)\">\n \t\t<option v-for=\"page in totalPages\">{{page+1}}</option>\n </select>\n </div>\n\n<div class=\"form-group form-inline pull-right vue-limit\">\n <label>{{texts.limit}}</label>\n <select class=\"form-control\" v-model=\"limit\" name=\"{{filterPlaceholder}}\" @change=\"setPage(1)\" >\n \t<option v-for=\"length in lengths\">{{length}}</option>\n </select>\n </div>\n</div>\n</div>\n\n\t<table class=\"vue-table table table-striped\">\n\t\t\t\t<thead>\n\t\t\t\t\t<th @click=\"orderByColumn(cols[$index])\"  v-for=\"col in cols\"><span class=\"vue-table-heading\">{{getHeading(col)}}</span><i class=\"vue-table-sort-icon text-muted fa\" v-bind:class=\"orderClass($index)\"></i></th>\n\t\t\t\t</thead>\n\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for=\"row in tableData\">\n\t\t\t\t\t\t\t<td v-for=\"column in cols\" v-html=\"row[column] | render row column\"></td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\n\t</table>\n\n<ul v-show=\"totalPages>1\" v-if=\"!pagination.dropdown\" class=\"pagination vue-table-pagination\">\n  <li v-bind:class=\"disabled(-1)?'disabled':''\"><a href=\"javascript:void(0);\"  @click=\"!disabled(-1) && chunk(-1)\"><<</a></li>\n  <li v-for=\"page in pagination.chunk\" v-if=\"paginationStart + $index <= totalPages\" v-bind:class=\"active(paginationStart + $index - 1)\"><a href=\"javascript:void(0);\" @click=\"setPage(paginationStart + $index)\">{{paginationStart + $index}}</a></li>\n  <li v-bind:class=\"disabled(1)?'disabled':''\"><a href=\"javascript:void(0);\" @click=\"!disabled(1) && chunk(1)\">>></a></li>\n</ul>\n\n<p>{{displayText(texts.count, count)}}</p>\n</div>\n",

		ready: function() {

      this.source = 'server';

			if (this.$parent.hasOwnProperty('texts'))
				this.texts = merge_options(this.texts, this.$parent.texts);

			if (this.$parent.hasOwnProperty('pagination'))
				this.pagination = merge_options(this.pagination, this.$parent.pagination);

      if (this.$parent.hasOwnProperty('limit')
        && this.lengths.indexOf(this.$parent.limit)>-1)
        this.limit = this.$parent.limit;

    if (this.$parent.hasOwnProperty('templates')) {
		    this.templates = this.$parent.templates;
		     this.templatesKeys = object_keys(this.templates);

     }
			this.getDataFromServer(true);

		},

		data: require('./common/initial-data'),

		computed: {
			totalPages: require('./common/total-pages'),
			paginationStart: require('./common/pagination-start'),
			totalChunks: require('./common/total-chunks'),
			currentChunk: require('./common/current-chunk')

		},

		filters: {
			  render: require('./filters/render')
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
