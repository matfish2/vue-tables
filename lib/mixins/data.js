module.exports = {
  data: function() {
      return {
        id: makeId(),
        customColumns:[],
        allColumns:[],
        customQueries:{},
        totalPages:null,
        query:null,
        page:1,
        count:0,
        limit:10,
        windowWidth:window.innerWidth,
         orderBy: {
          column:'id',
          ascending:1
        }
      }
}
}

function makeId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
