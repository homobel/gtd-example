
var TaskList = Backbone.Collection.extend({

	model: TaskModel,

	initialize: function(models, options) {
		this.localStorage = new Store(options.key);
		this.fetch();
		this.on('add', function(task) {
			task.save();
			this.normalizeIndexes();
		});
		this.on('remove', function(task) {
			task.destroy();
			this.normalizeIndexes();
		});
	},

	moveTo: function(oldIndex, index) {
		if(oldIndex !== index) {
			this.models.splice(index, 0, this.models.splice(oldIndex, 1)[0]);
			this.normalizeIndexes();
		}
	},

	normalizeIndexes: function() {
		this.each(function(model, i) {
			model.set('index', i);
		});
	},

	comparator: function(model) {
		return model.get('index');
	}

});
