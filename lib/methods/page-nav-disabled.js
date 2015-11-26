module.exports = function(direction) {
    return (direction==1 && this.page==this.totalPages)
    ||  (direction==-1 && this.page==1)
  }
