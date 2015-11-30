module.exports = {
  data: function() {
      return {
        columns:[],
        allColumns:false,
        totalPages:null,
        lengths: [10,25,50,100],
        query:null,
        page:1,
        count:0,
        limit:10,
        queryable:[],
         orderBy: {
          column:'id',
          ascending:1
        }
      }
}

}


