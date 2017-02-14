var chart = AmCharts.makeChart( "chartdiv", {
  "type": "stock",
"theme": "light",

  //"color": "#fff",
  "dataSets": [ {
    "title": "MSFT",
    "fieldMappings": [ {
      "fromField": "open",
      "toField": "open"
    }, {
      "fromField": "high",
      "toField": "high"
    }, {
      "fromField": "low",
      "toField": "low"
    }, {
      "fromField": "close",
      "toField": "close"
    }, {
      "fromField": "volume",
      "toField": "volume"
    } ],
    "compared": false,
    "dataProvider": chartData,
    "categoryField": "Date",

    /**
     * data loader for data set data
     */

    /**
     * data loader for events data
     */
    "stockEvents": [ {
      "date": new Date( 2015, 8, 19 ),
      "type": "sign",
      "backgroundColor": "#85CDE6",
      "graph": "g1",
      "text": "S",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2015, 10, 19 ),
      "type": "flag",
      "backgroundColor": "#FFFFFF",
      "backgroundAlpha": 0.5,
      "graph": "g1",
      "text": "F",
      "description": "Some longer\ntext can also\n be added"
    }, {
      "date": new Date( 2015, 11, 10 ),
      "showOnAxis": true,
      "backgroundColor": "#85CDE6",
      "type": "pin",
      "text": "X",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2015, 11, 26 ),
      "showOnAxis": true,
      "backgroundColor": "#85CDE6",
      "type": "pin",
      "text": "Z",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 0, 3 ),
      "type": "sign",
      "backgroundColor": "#85CDE6",
      "graph": "g1",
      "text": "U",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 1, 6 ),
      "type": "sign",
      "graph": "g1",
      "text": "D",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 3, 5 ),
      "type": "sign",
      "graph": "g1",
      "text": "L",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 3, 5 ),
      "type": "sign",
      "graph": "g1",
      "text": "R",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 5, 15 ),
      "type": "arrowUp",
      "backgroundColor": "#00CC00",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 6, 25 ),
      "type": "arrowDown",
      "backgroundColor": "#CC0000",
      "graph": "g1",
      "description": "This is description of an event"
    }, {
      "date": new Date( 2016, 8, 1 ),
      "type": "text",
      "graph": "g1",
      "text": "Longer text can\nalso be displayed",
      "description": "This is description of an event"
    } ]
  } ],
  "dataDateFormat": "YYYY-MM-DD",

  "panels": [ {
      "title": "Value",
      "percentHeight": 70,

      "stockGraphs": [ {
        "type": "candlestick",
        "id": "g1",
        "openField": "open",
        "closeField": "close",
        "highField": "high",
        "lowField": "low",
        "valueField": "close",
        "lineColor": "#fff",
        "fillColors": "#fff",
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
      } ],

      "stockLegend": {
        "valueTextRegular": undefined,
        "periodValueTextComparing": "[[percents.value.close]]%"
      }

    },

    {
      "title": "Volume",
      "percentHeight": 30,
      "marginTop": 1,
      "columnWidth": 0.6,
      "showCategoryAxis": false,

      "stockGraphs": [ {
        "valueField": "volume",
        "openField": "open",
        "type": "column",
        "showBalloon": false,
        "fillAlphas": 1,
        "lineColor": "#fff",
        "fillColors": "#fff",
        "negativeLineColor": "#db4c3c",
        "negativeFillColors": "#db4c3c",
        "useDataSetColors": false
      } ],

      "stockLegend": {
        "markerType": "none",
        "markerSize": 0,
        "labelText": "",
        "periodValueTextRegular": "[[value.close]]"
      },

      "valueAxes": [ {
        "usePrefixes": true
      } ]
    }
  ],

  "panelsSettings": {
    //    "color": "#fff",
    "plotAreaFillColors": "#333",
    "plotAreaFillAlphas": 1,
    "marginLeft": 60,
    "marginTop": 5,
    "marginBottom": 5
  },

  "chartScrollbarSettings": {
    "graph": "g1",
    "graphType": "line",
    "usePeriod": "WW",
    "backgroundColor": "#333",
    "graphFillColor": "#666",
    "graphFillAlpha": 0.5,
    "gridColor": "#555",
    "gridAlpha": 1,
    "selectedBackgroundColor": "#444",
    "selectedGraphFillAlpha": 1
  },

  "categoryAxesSettings": {
    "equalSpacing": true,
    "gridColor": "#555",
    "gridAlpha": 1
  },

  "valueAxesSettings": {
    "gridColor": "#555",
    "gridAlpha": 1,
    "inside": false,
    "showLastLabel": true
  },

  "chartCursorSettings": {
    "pan": true,
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true
  },

  "legendSettings": {
    //"color": "#fff"
  },

  "stockEventsSettings": {
    "showAt": "high",
    "type": "pin"
  },

  "balloon": {
    "textAlign": "left",
    "offsetY": 10
  },

  "periodSelector": {
    "position": "bottom",
    "periods": [ {
        "period": "DD",
        "count": 10,
        "label": "10D"
      }, {
        "period": "MM",
        "count": 1,
        "label": "1M"
      }, {
        "period": "MM",
        "count": 6,
        "label": "6M"
      }, {
        "period": "YYYY",
        "count": 1,
        "label": "1Y"
      }, {
        "period": "YYYY",
        "count": 2,
        "selected": true,
        "label": "2Y"
      },
      /* {
           "period": "YTD",
           "label": "YTD"
         },*/
      {
        "period": "MAX",
        "label": "MAX"
      }
    ]
  }
} );