// var source = $('#table-one').html(),
// 	template = Handlebars.compile(source);

// html = template(chartData);
// $('body').empty().html(html);


var len = chartData.length,
	item = {},
	tableContent = '',
	i = 0;

for( i = 0; i < len; i++) {
	item = chartData[i];
	
	tableContent +=	'<tr>';

	// Date
	tableContent += '<td>' + item.Date + '</td>';
	// Open
	tableContent += '<td>' + item.open + '</td>';
	// High
	tableContent += '<td>' + item.high + '</td>';
	// Low
	tableContent += '<td>' + item.low + '</td>';
	// Close
	tableContent += '<td>' + item.close + '</td>';
	// Volume
	tableContent += '<td>' + item.volume + '</td>';

	tableContent += '</tr>';
}

$('tbody', '#table-one').html(tableContent);
$(document).ready(function() {
    $('#table-one').DataTable();
} );
