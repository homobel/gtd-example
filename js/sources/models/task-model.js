
var TaskModel = Backbone.Model.extend({

	defaults: {
		id: 0,
		index: 0,
		name: '',
		type: 'task'
	},

	initialize: function() {
		this.on('change', function() {
			this.save();
		});
	}

});
