module.exports = {
  data: function() {
      return {
        columns:[],
        allColumns:false,
        totalPages:null,
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


