 // Defaults are returned from a function to overcome caching issues which might cause data leakage between instances

 module.exports = function() {
  return {
   columns:[],
   perPage:10,
   sortable:[],
   templates:{},
   delay:500,
   dateFormat:"",
   skin:"table-striped table-bordered table-hover",
   texts:{
    count:"{count} Records",
    filter:"Filter Results:",
    filterPlaceholder:"Search query",
    limit:"Records:",
    page:"Page:",
    noResults:"No matching records",
    filterBy:"Filter by {column}"
  },
  filterByColumn:false,
  highlightMatches:false,
  headings:{},
  pagination: {
    dropdown:false,
    chunk:10
  }
}
}


