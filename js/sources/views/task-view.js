
var TaskView = Backbone.View.extend({

	render: function() {
		this.setElement(this.options.templates.item(this.model.attributes));
		this.name = this.$('.name');
		this.textarea = this.$('textarea').autosize();
		this.type = this.$('.extra-selector-wrap')
							.html(this.options.templates.extraSelector())
							.find('.extra-selector')
							.extraSelector({selected: this.model.get('type')});
		return this.$el;
	},

	initialize: function(props, options) {
		this.options = options;
	},

	events: {
		'click .remove': 'removeTask',
		'dblclick .name': 'editName',
		'blur textarea': 'saveName',
		'change .extra-selector': 'typeUpdate',
		'keydown textarea': 'trySaveName'
	},

	trySaveName: function(e) {
		if (e.keyCode === 13 && e.shiftKey) {
			this.saveName();
		}
	},

	removeTask: function() {
		this.options.taskIndexer.remove(this.model.id);
		this.model.destroy();
		this.remove();
	},

	typeUpdate: function(e, type) {
		this.model.set('type', type.next);
		this.$el.removeClass(type.prev).addClass(type.next);
	},

	editName: function() {
		this.name.addClass('hidden');
		
		this.textarea
				.removeClass('hidden')
				.focus()
				.val(_.unescape(this.name.html()))
				.trigger('autosize.resize');

		this.$el.addClass('unsortable');
	},

	saveName: function() {
		this.$el.removeClass('unsortable');
		var text = _.escape(this.textarea.val());
		if (!text.length) {
			this.removeTask();
			return;
		}
		this.name.html(text).removeClass('hidden');
		this.textarea.addClass('hidden');
		this.model.set('name', text);
	}

});
