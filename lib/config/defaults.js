 module.exports = function()  {
  return function(){
    return {
   columns:[],
   perPage:10,
   sortable:[],
   templates:{},
   dateFormat:"",
   texts:{
    count:"{count} Records",
    filter:"Filter Results:",
    filterPlaceholder:"Search query",
    limit:"Records:",
    page:"Page:",
    noResults:"No matching records"
  },
  headings:{},
  pagination: {
    dropdown:false,
    chunk:10
  }
}
}

}
