
function Indexer() {
	this.index = [0];
}

Indexer.prototype = {
	insert: function(n) {
		this.index[n] = true;
	},
	remove: function(n) {
		this.index[n] = false;
		for(var i = this.index.length - 1; i && !this.index[i]; i--) {
			this.index.pop();
		}
	},
	next: function() {
		return this.index.length;
	}
};
