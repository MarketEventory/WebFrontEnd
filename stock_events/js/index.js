$(document).ready(function () {
    var ticker = request.getQuerystring('ticker', 'AAPL').toUpperCase(),
        chart = new BusinessChart(),
        businessTable = new BusinessTable($('#talbe-one-container')),
        tickerList = new TickerList('.left-ticker-panel');

        chart.render('chartdiv');  
        tickerList.render(ticker);
        businessTable.render(ticker)

        $('.left-ticker-panel').on('change-ticker', function () {
            ticker = $('.left-ticker-panel').find('.active-ticker').data('ticker');
            chart.render('chartdiv', ticker);
            businessTable = new BusinessTable($('#talbe-one-container'));
            businessTable.render(ticker);
        })
})