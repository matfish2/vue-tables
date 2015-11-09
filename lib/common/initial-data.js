module.exports = function() {
    return {
      tableData:[],
      source:null,
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
      templates:null,
      templatesKeys:null,
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
  }
}

