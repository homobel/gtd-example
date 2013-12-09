
var ColumnView = Backbone.View.extend({

	render: function() {
		this.setElement(this.options.templates.column(this.model.attributes));

		this.content = this.$('.content').sortable({
			connectWith: '.column .content',
			cancel: '.unsortable'
		});

		this.editorWrap = this.$('.editor-wrap');
		this.btnNew = this.editorWrap.find('.btn-new');
		this.editor = this.editorWrap.find('.editor');

		this.type = this.editor
							.find('.extra-selector-wrap')
							.html(this.options.templates.extraSelector())
							.find('.extra-selector')
							.extraSelector();

		this.textarea = this.editor.find('textarea').autosize();
		this.btnOk = this.editor.find('.editor .btn-ok');

		this.collection.each(function(task){
			this.addTaskToView(task);
		}, this);

		return this.$el;
	},

	events: {
		'click .btn-new': 'openNewTaskForm',
		'click .btn-ok': 'tryNewTaskBySubmit',

		'blur .editor textarea': 'tryFinishNewTask',
		'keydown .editor textarea': 'tryNewTask',

		'sortstart': 'sortStart',
		'sortstop': 'sortStop',
		'sortremove': 'sortRemove',
		'sortreceive': 'sortReceive',
		'sortupdate': 'sortUpdate'
	},

	initialize: function(props, options) {
		this.options = options;
	},

	openNewTaskForm: function() {
		this.editor.removeClass('hidden');
		this.btnNew.addClass('hidden');
		this.textarea.focus();
	},

	tryFinishNewTask: function() {
		if(this.textarea.val().length) {
			return;
		}
		this.editor.addClass('hidden');
		this.btnNew.removeClass('hidden');
	},

	tryNewTaskBySubmit: function() {
		var value = this.textarea.val();
		if(value.length) {
			this.editor.addClass('hidden');
			this.btnNew.removeClass('hidden');
			this.addTaskToModel(_.escape(value));
			this.textarea.val('');
		}
	},

	tryNewTask: function(e) {
		if (e.keyCode === 13 && e.shiftKey) {
			this.tryNewTaskBySubmit();
		}
	},

	addTaskToModel: function(name) {
		var id = this.options.taskIndexer.next();
		var task = new TaskModel({
			id: id,
			index: this.collection.models.length,
			name: name,
			type: this.type.extraSelector('value')
		});
		this.addTaskToView(task);
		this.collection.add(task);
	},

	addTaskToView: function(model) {
		this.options.taskIndexer.insert(model.get('id'));
		this.content.append(new TaskView({model: model}, this.options).render());
	},

	sortStart: function(e, ui) {
		var index = ui.item.index();
 		ui.item.data('sortable-prev-index', {
 			index: index,
 			model: this.collection.at(index),
 			update: 0
 		});
	},

	sortStop: function(e, ui) {
		var data = ui.item.data('sortable-prev-index');
		// task moved in the same list
		if (data.update === 1) {
			this.collection.moveTo(data.index, ui.item.index());
		}
		ui.item.removeData('sortable-prev-index');
	},

	sortRemove: function(e, ui) {
		var data = ui.item.data('sortable-prev-index');
		this.collection.remove(data.model);
	},

	sortReceive: function(e, ui) {
		var data = ui.item.data('sortable-prev-index');
		this.collection.add(data.model, {at: ui.item.index()});
	},

	sortUpdate: function(e, ui) {
		var data = ui.item.data('sortable-prev-index');
		data.update++;
	}

});
