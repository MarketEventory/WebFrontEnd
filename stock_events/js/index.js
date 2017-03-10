$(document).ready(function () {
    var ticker = request.getQuerystring('ticker', '').toUpperCase(),
        chart = new BusinessChart(),
        businessTable = new BusinessTable($('#talbe-one-container')),
        // tickerList = new TickerList('.left-ticker-panel'),
        searchBox = new SearchBox('.header-bar .search-container');

    if(ticker === '' && window.localStorage) {
        ticker = localStorage.getItem('active-ticker');
    }

    chart.render('chartdiv');
    // tickerList.render(ticker);
    businessTable.render(ticker);
    searchBox.render();

    // $('.left-ticker-panel').on('change-ticker', function () {
    //     ticker = $('.left-ticker-panel').find('.active-ticker').data('ticker');
    //     chart.render('chartdiv', ticker);
    //     businessTable = new BusinessTable($('#talbe-one-container'));
    //     businessTable.render(ticker);
    // });

    $('.header-bar .search-container').on('active-ticker', function (e, data) {
        ticker = data.ticker;
        chart.render('chartdiv', ticker);
        businessTable = new BusinessTable($('#talbe-one-container'));
        businessTable.render(ticker);
    });
})