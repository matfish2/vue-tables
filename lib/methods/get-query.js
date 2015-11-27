module.exports = function() {
        return this.byColumn?
                $.param(this.query):
                this.query;
}
