// var source = $('#table-one').html(),
// 	template = Handlebars.compile(source);

// html = template(chartData);
// $('body').empty().html(html);




$(document).ready(function() {
    var businessTable = new BusinessTable();
} );

var BusinessTable = function () {
    this.ticker = request.getQuerystring('ticker', 'IBM').toUpperCase();
    this.eventSrc = '/js/MockData/' + this.ticker + '_events.js';

    this.render();
};
BusinessTable.prototype = {
	render: function () {
		var html = '', 
			data = [];

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

		$('tbody', '#table-one').html(tableContent);
		$('#table-one').DataTable();
		return tableContent;
	}
}