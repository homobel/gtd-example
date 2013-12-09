//~ name: App
//~ info: GTD by Archy Sharp
//~ copyright: copyright.txt

//~ require: plugins

(function($) {

	//~ require: models
	//~ require: views
	//~ require: collections
	//~ require: helpers

	$(function() {

		var wrap = $('.main-wrap'),
			types = ['To Do', 'In Progress', 'Done'],
			options = {
				taskIndexer: new Indexer(),
				templates: {
					column: _.template($('#column-template').html()),
					item: _.template($('#item-template').html()),
					extraSelector: _.template($('#extra-selector-template').html())
				}
			};

		provideTestData(types).done(function() {

			$.each(types, function(i, name) {

				var list = new TaskList(null, {key: convertToStorageName(name)}),
					columnModel = new ColumnModel({title: name}),
					columnView = new ColumnView({model: columnModel, collection: list}, options);

				wrap.append(columnView.render());

			});

		}).fail(function() {
			alert('Unable to load initial data! Please check the connection.');
		});

	});

})(jQuery);
