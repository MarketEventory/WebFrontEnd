var SearchBox = function (el) {
	this.$el = $(el);
	this.securityList = [];
	this.activeTicker = request.getQuerystring('ticker', 'IBM').toUpperCase();
	this.tickerListSrc = '/js/MockData/SP500.js';
	this.searchComplete = false;
	this.showSearchResultNumber = 10;
};

SearchBox.prototype = {
	render: function () {
		this.getData();
		this.bindEvent();
	},
	getData: function (callback) {
		var _this = this;

		$.getScript(this.tickerListSrc, function(data, textStatus, jqxhr) {
            if (textStatus === 'success' && SP500List) {
            	_this.securityList = SP500List; 

            	if (typeof callback === 'function') {
            		callback();
            	}                               
            }
        });
	},
	bindEvent: function () {
		var _this = this,
			$searchInput = _this.$el.find('input'),
			$searchResultContainer = $('.search-result-container', _this.$el);
			queryString = '',
			selectTicker = '',
			selectName = '',
			$searchResultItem = null;

		$searchInput.on('keyup', function () {
			queryString = $searchInput.val();

			if(queryString === '') {
				return;
			}
			// If last active search not complete yet, just return			
			// if (!_this.searchComplete){
			// 	return;
			// }

			// start a new search, set search complete as false
			_this.searchComplete = false;

			_this.parseResult(queryString);

		});
		
		$searchResultContainer.on('click', '.search-result-item', function (e) {
			$searchResultItem = $(e.target).parents('.search-result-item');
			selectTicker = $searchResultItem.data('ticker');
			selectName = $searchResultItem.data('name');
			$searchInput.val(selectTicker);
			_this.$el.trigger('active-ticker',{ticker: selectTicker});

			$searchResultContainer.hide();
			if (window.localStorage) {
				localStorage.setItem('active-ticker', selectTicker);
			}
		});
	},
	parseResult: function (queryString) {
		var _this = this,
			len = _this.securityList.length,
			item = {},
			resultContent = '',
			i = 0,
			resultNum = 0;

		for (i = 0; i < len; i++) {
			item = _this.securityList[i];

			// Only get the latest 10 result
			if (resultNum === _this.showSearchResultNumber) {
				break;
			}

			if(queryString === '' || 
				item.Ticker.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 ||
				item.Name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {					
				resultContent += '<div class="search-result-item" data-item="' + resultNum + '" data-ticker="' + item.Ticker + '" data-name="'+ item.Name+'">';
				
				resultContent += '<span class="search-result-item-ticker">' + item.Ticker + '</span>';
				resultContent += '<span class="search-result-item-name">' + item.Name + '</span>';
				
				resultContent += '</div>';

				resultNum++;
			}					
		}

		_this.$el.find('.search-result-container').empty().html(resultContent);
		$('.search-result-container', _this.$el).show();
		_this.searchComplete = true;
	}
}