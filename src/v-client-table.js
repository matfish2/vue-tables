var ClientTable = {

  template:require('./client-table.html'),

  ready: function() {

    var that = this;
    var data = JSON.parse(JSON.stringify(this.$parent.tableData));

   this.cols = this.getColumns();
   this.orderBy = this.cols[0];

      if (this.$parent.hasOwnProperty('templates'))

      that.renderTemplates(this.$parent.templates, data);

      if (this.$parent.hasOwnProperty('extras'))
      this.renderTemplates(this.$parent.extras, data);

    this.currentRecordsCount = this.$parent.tableData.length;


  },


  data:function() {
    return {
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

  active: function(index) {

    return this.page==(index+1)?'active':'';
  },

  orderClass: function(index) {
    if (this.cols[index]!=this.orderBy) return '';
    return this.ascending==1?'fa-sort-asc':'fa-sort-desc';
  },

  getCellView: function(index, prop) {

    var match;
    var data = this.$parent.tableData[index];

      if (typeof this.$parent.templates=='undefined'
      || !this.$parent.templates.hasOwnProperty(prop)
      || !this.$parent.templates[prop].hasOwnProperty("html"))
      return data[prop];

    var template = this.$parent.templates[prop];
    var html = this.$parent.templates[prop].html;

    template.params.forEach(function(param){

      match = new RegExp("{" +param + "}");
      html = html.replace(match, data[param]);

    });

    return html;

  },

  displayText: function(text, param) {

    return text.replace(/{.+}/,param);
  },

  orderByColumn: function(colName) {

    if (colName==this.orderBy)
      this.ascending= this.ascending==1?-1:1;

    this.orderBy = colName;

  },
  getHeading: function(value) {

    return this.$parent.hasOwnProperty("headings") && this.$parent.headings.hasOwnProperty(value)?
    this.$parent.headings[value]:
    value.split("_").join(" ");

  },

  setPage: function(page) {

    this.page = page;

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

        this.$parent.tableData[index][col] = field;
      }

    }.bind(this));
  },

  getColumns: function() {

    var columns = [];
    var userColumns = this.$parent.columns;
    var extras = typeof this.$parent.extras=='undefined'?false:this.$parent.extras;

    for (var x in this.$parent.tableData[0]) {
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

Vue.component("v-client-table",ClientTable);
