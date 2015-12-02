module.exports = function() {
        var tbody = this.$el.children[1].children[1];
        this.$compile(tbody);
}
