module.exports = function(byColumn) {
        return byColumn?
                $.param(this.query):
                this.query;
}
