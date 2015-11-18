 module.exports = function()  {
  return function(){
    return {
   columns:[],
   perPage:10,
   sortable:[],
   templates:{},
   delay:300,
   dateFormat:"",
   texts:{
    count:"{count} Records",
    filter:"Filter Results:",
    filterPlaceholder:"Search query",
    limit:"Records:",
    page:"Page:",
    noResults:"No matching records",
    filterBy:"Filter by {column}"
  },
  filterByColumn:true,
  headings:{},
  pagination: {
    dropdown:false,
    chunk:10
  }
}
}

}
