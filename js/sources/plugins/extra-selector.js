(function() {

	var defaults = {
			selected: 0
		},
		currentClass = 'current';

	function ExtraSelectorController(container, options) {

		var that = this;

		this.container = container;
		this.items = container
				.find('>*')
				.on('click', function() {
					var item = $(this);
					if(!item.hasClass(currentClass)) {
						var current = that.items.filter('.' + currentClass).removeClass(currentClass),
							prevValue = current.attr('data-type');

						item.addClass(currentClass);
						that.container.trigger('change', {prev: prevValue, next: item.attr('data-type')});
					}
				});

		if (typeof options.selected === 'number') {
			this.items
					.eq(options.selected)
					.addClass(currentClass);
		}
		else if(typeof options.selected === 'string') {
			this.items
					.filter('[data-type=' + options.selected + ']')
					.addClass(currentClass);
		}


	}

	ExtraSelectorController.prototype.val = function(value) {
		if (value !== undefined) {
			if (typeof value === 'string') {
				this.items.filter('[data-type=' + value + ']').click();
			}
			else if (typeof value === 'number') {
				this.items.eq(value).click();
			}
			return;
		}
		return this.items.filter('.' + currentClass).attr('data-type');
	};

	$.fn.extraSelector = function(options, value) {

		if (options === 'value' || options === 'selected') {

			var first = this.eq(0).data('extra-selector');

			if (!first) {
				return;
			}

			if (value !== undefined) {
				first.val(value);
				return;
			}
			return first.val();

		}

		options = $.extend({}, defaults, options);

		return this.each(function(i, c) {

			var selector = $(c),
				controller = selector.data('extra-selector');

			if (!controller) {
				var controller = new ExtraSelectorController(selector, options);
				selector.data('extra-selector', controller);
			}

		});

	};

})(jQuery);