module.exports = function() {
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
      count:0,
      currentRecordsCount:null,
      texts:{
      count:"{count} Records",
      filter:"Filter Results:",
      filterPlaceholder:"Search query",
      limit:"Records:",
      sortable:[]
    }
  }
}

