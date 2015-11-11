module.exports = function(source) {

  var initData = {
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

  if (source=='server') initData.data = [];

  return function() {
    return initData;
 }

}

