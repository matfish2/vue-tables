exports.install = function(Vue, options) {

	var server = {

	template:'<div class="vue-table-wrapper"><div class="row"><div class="col-md-6"><div class="form-group form-inline pull-left vue-table-search"><label>{{texts.filter}}</label><input class="form-control" type="text" name="vue-search" placeholder="{{texts.filterPH}}" @keyup="setPage(1)" v-model="query"></div></div><div class="col-md-6"><div class="form-group form-inline pull-right vue-limit"> <label>{{texts.limit}}</label> <select class="form-control" v-model="limit" name="{{filterPH}}" @change="setPage(1)" > <option v-for="length in lengths">{{length}}</option> </select> </div></div></div><table class="vue-table table table-striped"><thead><th @click="orderByColumn(cols[$index]);" v-for="col in cols"><span class="vue-table-heading">{{getHeading(col)}}</span><i class="vue-table-sort-icon text-muted fa" v-bind:class="orderClass($index)"></i></th></thead><tbody><tr v-for="row in tableData"><td v-for="column in cols" v-html="row[column]"></td></tr></tbody></table><ul class="pagination vue-table-pagination"> <li v-show="totalPages>1" v-for="page in totalPages" v-bind:class="active($index)"><a href="#" @click="setPage($index+1)">{{$index +1}}</a></li></ul><p>{{displayText(texts.count, count)}}</p></div>',

	ready: function() {

		var that = this;

		this.getDataFromServer(true);

	},


	data:function() {
		return {
			tableData:[],
			cols:false,
			totalPages:null,
			currentRecordsCount:null,
			lengths: [5,10,20,50],
			ascending:true,
			orderBy:null,
			query:'',
			page:1,
			limit:5,
			currentRecordsCount:null,
			texts:{count:"{count} Records",
			filter:"Filter Results:",
			filterPH:"Search query",
			limit:"Records:"
		}

	}


},

computed: {
	totalPages: {
		get: function() {
			return Math.ceil(this.currentRecordsCount / this.limit);
		}
	},
	count: {
		get:function() {
			return this.currentRecordsCount;
		}
	}

},


filters: {
	page:require('./filters/page'),
	setCount:require('./filters/set-count')

},


methods: {

	getObjectKeys: function(obj) {
		var keys = [];

		for (var prop in obj) {
			keys.push(prop);
		}

		return keys;
	},


  renderTemplates: function(cols, data) {

    var regex;
    var currentColumn;
    var newRow;
    var field;
    var columns = this.getObjectKeys(data[0])

    data.forEach(function(row, index){

      for (var col in cols) {

        field = cols[col];

        columns.forEach(function(column) {

          regex = new RegExp("{"+ column + "}","g");
          field = field.replace(regex,row[column]);
        });

        this.tableData[index][col] = field;
      }

    }.bind(this));
  },

	orderClass: function(index) {
		if (this.cols[index]!=this.orderBy) return '';

		return this.ascending==1?'fa-sort-asc':'fa-sort-desc';
	},

	active: function(index) {
		return this.page==(index+1)?'active':'';
	},

	displayText: function(text, param) {

		return text.replace(/{.+}/,param);
	},

	orderByColumn: function(colName) {

		if (colName==this.orderBy) {
			this.ascending = this.ascending==1?-1:1;
		}

		this.orderBy = colName;

		this.getDataFromServer();

	},
	getHeading: function(value) {

		return typeof this.$parent.headings!='undefined' && this.$parent.headings.hasOwnProperty(value)?
		this.$parent.headings[value]:
		value.split("_").join(" ");

	},

	getDataFromServer: function(first) {

		var that = this;

		var promise = $.ajax({
			url: this.$parent.url,
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

				if (first) {

					that.cols = that.getColumns();
					that.orderBy = that.cols[0];
				}

      if (that.$parent.hasOwnProperty('templates'))
				that.renderTemplates(that.$parent.templates, tdata);

				if (typeof that.$parent.extras!=='undefined')
					that.renderTemplates(that.$parent.extras, tdata);

				that.currentRecordsCount = data.count;
			},

			dataType: "json"
		});

		return promise;
	},

	setPage: function(page) {

		this.page = page;

		this.getDataFromServer();
	},


	getColumns: function() {

		var columns = [];
		var userColumns = this.$parent.columns;
		var extras = typeof this.$parent.extras=='undefined'?false:this.$parent.extras;


		for (var x in this.tableData[0]) {
			if (!userColumns || $.inArray(x,userColumns)>-1)
				columns.push(x);
		}

		if (extras) {
			for (var column in extras) {
				columns.push(column);
			}
		}

		return columns;

	}

}

}

Vue.component('v-server-table', server);

}









