module.exports = function(query, byColumn) {

        this.$dispatch('vue-tables.loading');

        var data =  {
            query:query,
            limit:this.limit,
            orderBy:this.orderBy,
            ascending: this.ascending,
            page:this.page,
            byColumn:byColumn?1:0
          };

          var data = $.param(data);

        return $.ajax({
          url: this.url,
          dataType: "json",
          data: data
          });
      }
