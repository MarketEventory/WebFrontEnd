var TickerList = function (el) {
	this.$el = $(el);
	this.ticker = request.getQuerystring('ticker', 'IBM').toUpperCase();
	this.tickerListSrc = '/js/MockData/SP500.js',
	this.securityList = [];
}
TickerList.prototype = {
	render: function (filter) {
		var _this = this;
		$.getScript(this.tickerListSrc, function(data, textStatus, jqxhr) {
            if (textStatus === 'success' && SP500List) {
            	_this.securityList = SP500List;                
                _this.generateTickerHTMLContent( );
                _this.addActiveClass();
                _this.bindEvent();
            }
        });
	},
	generateTickerHTMLContent: function (filter) {
		var _this = this,
			len = _this.securityList.length,
			item = {},
			tickerContent = '',
			i = 0;

		for (i = 0; i < len; i++) {
			item = _this.securityList[i];
			if(filter && item.Ticker.toLowerCase().indexOf(filter.toLowerCase()) === -1) {	
				continue;			
			}
			tickerContent += '<button type="button" class="ticker-item" data-ticker="';

			// Ticker
			tickerContent += item.Ticker;

			tickerContent += '">' + item.Name + '</button>';
		}

		if(tickerContent === '') {
			tickerContent = '<p class="left-ticker-panel-no-ticker">Ticker is not available right now, please try it again later!</p>'
		}

		this.$el.find('.left-ticker-panel-securities').empty().html(tickerContent)
	},
	addActiveClass: function () {
		$('[data-ticker="' + this.ticker + '"]', this.$el).addClass('active-ticker')
	},
	bindEvent: function () {
		var _this = this,
			$filter = _this.$el.find('.ticker-filter'),
			filterCharacters = '',
			$buttonItem = null;
		_this.$el.on('click', function (e) {
			$buttonItem = $(e.target);
			if($buttonItem.hasClass('ticker-item')){
				if ($buttonItem.data('ticker') !== _this.ticker) {
					_this.$el.find('.active-ticker').removeClass('active-ticker');
					$buttonItem.addClass('active-ticker');
					_this.$el.trigger('change-ticker');
				}
			}			
		});

		$filter.on('keyup', function () {
			filterCharacters = $filter.val();
			if(filterCharacters === '') {
				return;
			}
			_this.generateTickerHTMLContent(filterCharacters)
		});
	}
}