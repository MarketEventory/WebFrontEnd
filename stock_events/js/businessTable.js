// var source = $('#table-one').html(),
// 	template = Handlebars.compile(source);

// html = template(chartData);
// $('body').empty().html(html);
var BusinessTable = function (dom) {
    this.ticker = request.getQuerystring('ticker', 'IBM').toUpperCase();
    this.eventSrc = '';
    this.tableHtml = '<table id="table-one" class="display" cellspacing="0" width="100%"><thead><tr><th>Ticker</th><th>Title</th><th>Effective Date</th><th>Type</th><th>Daily Return</th><th>Five Days Return Before</th><th>Five Days Return After</th></tr></thead><tbody>';
    this.$el = $(this.tableHtml);
    this.dom = dom;    
};
BusinessTable.prototype = {
	render: function (ticker) {
		var html = '', 
			data = [];

		if(ticker) {
			this.ticker = ticker;
			this.eventSrc = '/js/MockData/' + this.ticker + '_events.js';
		}
		this.getData(data)
	},
	getData: function () {
		var _this = this;

		$.getScript(_this.eventSrc, function(data, textStatus, jqxhr) {
            if (textStatus === 'success' && eventsData) {                
                _this.generateTableHTMLContent(eventsData);                
            }
        });
	},	
	generateTableHTMLContent: function (data) {
		var len = data.length,
			item = {},
			tableContent = '',
			i = 0;

		for (i = 0; i < len; i++) {
			item = data[i];

			tableContent += '<tr>';

			// Ticker
			tableContent += '<td>' + item.Ticker + '</td>';
			// Title
			tableContent += '<td>' + item.Title + '</td>';
			// EffectiveDate
			tableContent += '<td>' + item.EffectiveDate + '</td>';
			// Type
			tableContent += '<td>' + item.Type + '</td>';
			// DailyReturn
			tableContent += '<td>' + item.DailyReturn + '</td>';
			// FiveDayReturnAfter
			tableContent += '<td>' + item.FiveDayReturnAfter + '</td>';
			// FiveDayReturnBefore
			tableContent += '<td>' + item.FiveDayReturnBefore + '</td>';

			tableContent += '</tr>';
		}

		this.$el.find('tbody').empty().html(tableContent);
		this.dom.empty().append(this.$el);
		this.$el.DataTable();

		// TOOD 
		var height = $('.right-chart-table-panel').height() + 'px';
		$('.left-ticker-panel').css({height: height});
		return tableContent;
	}
}