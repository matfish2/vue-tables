exports.install = function(Vue, options) {

	var merge_options = require('./helpers/merge-options');

	var server = {
		template:require('./server-table.html'),
		ready: function() {

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
