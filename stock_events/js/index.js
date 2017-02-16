var ticketName = request.getQuerystring('ticker', 'IBM').toUpperCase(),
    dataSrc = '/stock_events/js/MockData/' + ticketName + '.csv',
    cvsData = {},
    chart = {};

AmCharts.loadFile(dataSrc, {}, function(response) {
    cvsData = AmCharts.parseCSV(response, {
        "useColumnNames": true
    });

    chart = AmCharts.makeChart("chartdiv", {
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
            "categoryField": "Date",
            // // EVENTS
            "stockEvents": [{
                "date": new Date(2015, 8, 19),
                "type": "sign",
                "backgroundColor": "#85CDE6",
                "graph": "g1",
                "text": "S",
                "description": "This is description of an event"
            }, {
                "date": new Date(2015, 10, 19),
                "type": "flag",
                "backgroundColor": "#FFFFFF",
                "backgroundAlpha": 0.5,
                "graph": "g1",
                "text": "F",
                "description": "Some longer\ntext can also\n be added"
            }, {
                "date": new Date(2015, 11, 10),
                "showOnAxis": true,
                "backgroundColor": "#85CDE6",
                "type": "pin",
                "text": "X",
                "graph": "g1",
                "description": "This is description of an event"
            }, {
                "date": new Date(2015, 11, 26),
                "showOnAxis": true,
                "backgroundColor": "#85CDE6",
                "type": "pin",
                "text": "Z",
                "graph": "g1",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 0, 3),
                "type": "sign",
                "backgroundColor": "#85CDE6",
                "graph": "g1",
                "text": "U",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 1, 6),
                "type": "sign",
                "graph": "g1",
                "text": "D",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 3, 5),
                "type": "sign",
                "graph": "g1",
                "text": "L",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 3, 5),
                "type": "sign",
                "graph": "g1",
                "text": "R",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 5, 15),
                "type": "arrowUp",
                "backgroundColor": "#00CC00",
                "graph": "g1",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 6, 25),
                "type": "arrowDown",
                "backgroundColor": "#CC0000",
                "graph": "g1",
                "description": "This is description of an event"
            }, {
                "date": new Date(2016, 8, 1),
                "type": "text",
                "graph": "g1",
                "text": "Longer text can\nalso be displayed",
                "description": "This is description of an event"
            }]
        }],

        "panels": [{
                "title": ticketName,
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
            inputFieldsEnabled: false,
            "periods": [{
                "period": "DD",
                "count": 10,
                "label": "10 days",
                selected: true
            }, {
                "period": "MM",
                "count": 1,
                "label": "1 month",
                selected: true
            }, {
                "period": "YYYY",
                "count": 1,
                "selected": true,
                "label": "1 year"
            }, {
                "period": "YTD",
                "label": "YTD",
                count: 1,
                selected: true
            }]
        },

        "panelsSettings": {
            "usePrefixes": true,
            "plotAreaFillColors": "#333",
        },
        "export": {
            "enabled": true
        }
    });
})