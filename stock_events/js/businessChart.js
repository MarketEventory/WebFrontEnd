var BusinessChart = function() {
    this.ticker = request.getQuerystring('ticker', 'AAPL').toUpperCase();
    this.jsSrc = '/js/MockData/' + this.ticker + '.js';
    this.jsSignSrc = '/js/MockData/' + this.ticker + '_signs.js';
    this.cvsSrc = '/js/MockData/' + this.ticker + '.csv';
};
BusinessChart.prototype = {
    render: function(id, ticker) {
        var _this = this,
            data = [];
        $('#' + id).empty();
        if(ticker) {
            this.ticker = ticker;
            this.jsSrc = '/js/MockData/' + this.ticker + '.js';
            this.jsSignSrc = '/js/MockData/' + this.ticker + '_signs.js';
        }
        $.when(
            $.getScript(_this.jsSrc),
            $.getScript(_this.jsSignSrc)
        ).done(function () {
            if(chartData && singsData) {
                chartData = chartData.sort(function (a, b) {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                });

                singsData = singsData.sort(function (a, b) {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                });

                // var firstDate = new Date(2017, 2, 1);
                // firstDate.setDate(firstDate.getDate() - 500);
                // firstDate.setHours(0, 0, 0, 0);
                // chartData = [];
                // for (var i = 0; i < 500; i++) {
                //     var newDate = new Date(firstDate);
                //     newDate.setDate(newDate.getDate() + i);

                //     var a = Math.round(Math.random() * (40 + i)) + 100 + i;
                //     var b = Math.round(Math.random() * 100000000);

                //     chartData.push({
                //         "date": newDate,
                //         "open": a - 1,
                //         "high": a + 10,
                //         "low": a - 5,
                //         "close": a + 1,
                //         "volume": b                        
                //     });
                // }
                _this.createChart(id);
            }            
        });
    },
    loadCVSFile: function() {
        var _this = this;
        AmCharts.loadFile(_this.cvsSrc, {}, function(response) {

        });
    },
    createChart: function(id, data) {
        var chart = {};

        window.chart = AmCharts.makeChart(id, {
            "type": "stock",
            "theme": "light",
            "dataSets": [{
                //"color": "#b0de09",
                color: "#000",
                "fieldMappings": [{
                    "fromField": "open",
                    "toField": "open"
                }, {
                    "fromField": "close",
                    "toField": "close"
                }, {
                    "fromField": "high",
                    "toField": "high"
                }, {
                    "fromField": "low",
                    "toField": "low"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                }],
                //openField, closeField, highField and lowField
                //"dataProvider": cvsData,
                "dataProvider": chartData,
                "categoryField": "date",
                // // EVENTS
                "stockEvents": singsData
                // "stockEvents": [
                // {
                //     "date": new Date(2017,1,13),
                //     "type": "sign",
                //     "text": "K",
                //     "backgroundColor": "#85CDE6",
                //     "graph": "g1",
                //     "description": "test Shone \r\n",
                //     "showOnAxis": true
                // }
                // ]
            }],
            "panels": [{
                    "title": this.ticker,
                    "backgroundColor": "#333333",
                    "plotAreaFillColors": "#334455",
                    "backgroundAlpha": 0.5,

                    "stockGraphs": [{
                        "type": "candlestick",
                        "id": "g1",
                        "openField": "open",
                        "closeField": "close",
                        "highField": "high",
                        "lowField": "low",
                        "valueField": "close",
                        "lineColor": "#008000",
                        "fillColors": "#008000",
                        "negativeLineColor": "#db4c3c",
                        "negativeFillColors": "#db4c3c",
                        "fillAlphas": 1,
                        "comparedGraphLineThickness": 2,
                        "columnWidth": 0.7,
                        "useDataSetColors": false,
                        "comparable": true,
                        "compareField": "close",
                        "showBalloon": false,
                        "proCandlesticks": true
                    }],
                    "stockLegend": {
                        "valueTextRegular": " ",
                        "markerType": "none"
                    }
                },
                {
                    "title": "Volume",
                    "percentHeight": 30,
                    "marginTop": 1,
                    "columnWidth": 0.6,
                    "showCategoryAxis": false,
                    backgroundColor: "#333333",
                    backgroundAlpha: 0.5,

                    "stockGraphs": [{
                        "valueField": "volume",
                        "openField": "open",
                        "type": "column",
                        "showBalloon": false,
                        "fillAlphas": 1,
                        "lineColor": "#008000",
                        "fillColors": "#008000",
                        "negativeLineColor": "#db4c3c",
                        "negativeFillColors": "#db4c3c",
                        "useDataSetColors": false
                    }],

                    "stockLegend": {
                        "markerType": "none",
                        "markerSize": 0,
                        "labelText": "",
                        "periodValueTextRegular": "[[value.close]]"
                    },

                    "valueAxes": [{
                        "usePrefixes": true
                    }]
                }
            ],
            "chartScrollbarSettings": {
                "graph": "g1"
            },

            "chartCursorSettings": {
                "valueBalloonsEnabled": true,
                "graphBulletSize": 1,
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true,
                "valueLineAlpha": 0.5
            },
            "periodSelector": {
                "periods": [{
                    "period": "DD",
                    "count": 10,
                    "label": "10 days"
            }, {
                    "period": "MM",
                    "count": 1,
                    "label": "1 month"
            }, {
                    "period": "YYYY",
                    "count": 1,
                    "label": "1 year"
            }, {
                    "period": "YTD",
                    "label": "YTD"
            }, {
                    "period": "MAX",
                    "label": "MAX"
            }]
            },

            // "periodSelector": {
            //     inputFieldsEnabled: false,
            //     "periods": [{
            //         "period": "DD",
            //         "count": 10,
            //         "label": "10 days",
            //     }, {
            //         "period": "MM",
            //         "count": 1,
            //         "selected": true,
            //         "label": "1 month",
            //     }, {
            //         "period": "YYYY",
            //         "count": 1,                   
            //         "label": "1 year"
            //     }, {
            //         "period": "YYYY",
            //         "count": 2,
            //         "label": "2 year"
            //     },{
            //         "period": "YTD",
            //         "label": "YTD",
            //         count: 1
            //     }]
            // },

            "panelsSettings": {
                "usePrefixes": true,
                "plotAreaFillColors": "#333",
            },
            "export": {
                "enabled": true
            }
        });
    }
};