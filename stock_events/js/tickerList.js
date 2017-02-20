var TickerList = function (el) {
	this.$el = $(el);
	this.ticker = request.getQuerystring('ticker', 'IBM').toUpperCase();
	this.tickerListSrc = '/js/MockData/SP500.js';
}
TickerList.prototype = {
	render: function (filter) {
		var _this = this;
		$.getScript(this.tickerListSrc, function(data, textStatus, jqxhr) {
            if (textStatus === 'success' && SP500List) {                
                _this.generateTickerHTMLContent(SP500List, filter);
                _this.addActiveClass();
                _this.bindEvent();
            }
        });
	},
	generateTickerHTMLContent: function (data, filter) {
		var len = data.length,
			item = {},
			tickerContent = '',
			i = 0;

		for (i = 0; i < len; i++) {
			item = data[i];

			tickerContent += '<button type="button" class="ticker-item" data-ticker="';

			// Ticker
			tickerContent += item.Ticker;

			tickerContent += '">' + item.Name + '</button>';;
		}

		this.$el.empty().html(tickerContent)
	},
	addActiveClass: function () {
		$('[data-ticker="' + this.ticker + '"]', this.$el).addClass('active-ticker')
	},
	bindEvent: function () {
		var _this = this;
		_this.$el.find('button').on('click', function () {
			if($(this).data('ticker') !== _this.ticker) {
				_this.$el.find('.active-ticker').removeClass('active-ticker');
				$(this).addClass('active-ticker');
				_this.$el.trigger('change-ticker');
			}
		});
	}
}