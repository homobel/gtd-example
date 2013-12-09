
function provideTestData(types) {

	var d = $.Deferred(),
		storages = {};

	var dataEmpty = types.map(convertToStorageName).every(function(name) {
		storages[name] = new Store(name);
		return !storages[name].findAll().length;
	});

	if (dataEmpty) {
		$.getJSON('./primary-data.json').done(function(data) {

			_.each(data, function(list, name) {
				_.each(list, function(task, i) {

					var model = new TaskModel({
						id: task.id,
						index: i,
						type: task.type,
						name: task.name
					});
					
					storages[name].create(model);

				});
			});

			d.resolve();

		}).fail(function() {
			d.reject();
		});

		return d;
	}
	return d.resolve();

}
