module.exports = function(data) {

	var limit = parseInt(this.limit);
	var page = parseInt(this.page);
	var offset = limit * (page-1);

	return data.slice(offset, limit + offset);
};
