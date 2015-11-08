module.exports = function() {
    return {
      tableData:[],
      cols:false,
      totalPages:null,
      currentRecordsCount:null,
      lengths: [5,10,20,50],
      ascending:1,
      orderBy:null,
      query:'',
      page:1,
      limit:10,
      count:0,
      currentRecordsCount:null,
      texts:{
        count:"{count} Records",
        filter:"Filter Results:",
        filterPlaceholder:"Search query",
        limit:"Records:",
        page:"Page:"
      },
       pagination: {
        dropdown:false,
        chunk:10
      }
    //dropdownPagination:false, DEPRECATED
  }
}

