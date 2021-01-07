define([
    "angular", 
    "js/qlik", 
    "homeCtrl", 
    "headerCtrl", 
    "searchBarCtrl",
    "filtersCtrl", 
    "launchExecutionCtrl", 
    "operationalExecutionCtrl", 
    "inMarketPerformanceCtrl",
    "teamEngagementCtrl",
    "singleKPICtrl"], function (
        angular, 
        qlik,
        homeCtrl, 
        headerCtrl, 
        searchBarCtrl,
        filtersCtrl, 
        launchExecutionCtrl, 
        operationalExecutionCtrl, 
        inMarketPerformanceCtrl,
        teamEngagementCtrl,
        singleKPICtrl) {

  // defines controller class
  function AppCtrl($rootScope) {
    var qvf = qlik.openApp(appID, config);
    $rootScope.color = {};
    this.name = "App List";
    this.apps = [];
    this.setupErrorHandling();
    this.populateAppList();

    $rootScope.getScoreColor = function(section, kpi, sectionLabel = null, kpiLabel = null, country = null, brand = null){
        var color = '';
        var KPIKey = "S_KPI_" + section + (kpi ? "_" + kpi : '') + (country || brand ? "_" + (country !== null ? country : '') + (brand !== null ? brand : '') : "");
        
        if(sectionLabel && kpiLabel && country && brand){

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 6
                    }
                ],
                "qDimensions": [
                    {
                        "qLabel": "Country",
                        "qLibraryId": "sLrxhpA",
                        "qNullSuppression": true,
                        "qOtherTotalSpec": {
                            "qOtherMode": "OTHER_OFF",
                            "qSuppressOther": true,
                            "qOtherSortMode": "OTHER_SORT_DESCENDING",
                            "qOtherCounted": {
                                "qv": "5"
                            },
                            "qOtherLimitMode": "OTHER_GE_LIMIT"
                        }
                    },
                    {
                        qDef: {  
                            qFieldDefs: ["[Novartis Brand]"] 
                        }
                    },
                    {
                        //"qDef": {
                        //    "qFieldDefs": [
                        //        " =if('SKpet'='In-Market Performance', 'SKpet')"
                        //    ]
                        //},
                        "qLabel": "Level 1 Score",
                        "qLibraryId": "SKpet",
                        "qNullSuppression": true,
                        "qOtherTotalSpec": {
                            "qOtherMode": "OTHER_OFF",
                            "qSuppressOther": true,
                            "qOtherSortMode": "OTHER_SORT_DESCENDING",
                            "qOtherCounted": {
                                "qv": "5"
                            },
                            "qOtherLimitMode": "OTHER_GE_LIMIT"
                        }
                    },
                    {
                        "qLabel": "Level 2 Score",
                        "qLibraryId": "UPCjjBg",
                        "qNullSuppression": true,
                        "qOtherTotalSpec": {
                            "qOtherMode": "OTHER_OFF",
                            "qSuppressOther": true,
                            "qOtherSortMode": "OTHER_SORT_DESCENDING",
                            "qOtherCounted": {
                                "qv": "5"
                            },
                            "qOtherLimitMode": "OTHER_GE_LIMIT"
                        }
                    }
                ],
                "qMeasures": [
                    {
                        "qLabel": "Score",
                        "qLibraryId": "fSUQmje",
                        "qSortBy": {
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 0,
                            "qSortByAscii": 1,
                            "qSortByLoadOrder": 0,
                            "qSortByExpression": 0,
                            "qExpression": {
                                "qv": " "
                            }
                        }
                    },
                    {
                        "qLabel": "Co lour Internal Page",
                        "qLibraryId": "udcqBY",
                        "qSortBy": {
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 0,
                            "qSortByAscii": 1,
                            "qSortByLoadOrder": 0,
                            "qSortByExpression": 0,
                            "qExpression": {
                                "qv": " "
                            }
                        }
                    }
                ],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            },getInternalPagesKPIsColor);
            function getInternalPagesKPIsColor(reply, app){
                var kpis = reply.qHyperCube.qDataPages[0].qMatrix;
                angular.forEach(kpis, function(kpi, i){
                   // console.log(kpi, sectionLabel, kpiLabel, brand, country)
                    if(sectionLabel === kpi[2].qText && kpiLabel === kpi[3].qText && brand === kpi[1].qText && country === kpi[0].qText ){
                        color = kpi[5].qText;
                      //  console.log(KPIKey, kpi)
                    }
                    switch(color){
                        case 'vColorVeryGood':
                            $rootScope.color[KPIKey] = "dark-green"
                        break;
                        case 'vColorGood':
                            $rootScope.color[KPIKey] = "green"
                        break;                
                        case 'vColorBad':
                            $rootScope.color[KPIKey] = "orange"
                        break;
                        case 'vColorVeryBad':
                            $rootScope.color[KPIKey] = "red"
                        break;

                        default:
                            $rootScope.color[KPIKey] = "gray"
                    }
                })
            }            

        }else{

            qvf.getObject(objectsMap[KPIKey]).then(function(model){
                color = model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
                switch(color){
                    case 'vColorVeryGood':
                        $rootScope.color[KPIKey] = "dark-green"
                    break;
                    case 'vColorGood':
                        $rootScope.color[KPIKey] = "green"
                    break;                
                    case 'vColorBad':
                        $rootScope.color[KPIKey] = "orange"
                    break;
                    case 'vColorVeryBad':
                        $rootScope.color[KPIKey] = "red"
                    break;

                    default:
                        $rootScope.color[KPIKey] = "gray"
                }
            })

            
        }  
    }
  }

  AppCtrl.prototype.setupErrorHandling = function() {
    var self = this;
    qlik.setOnError(function (e) {
      self.error = "Qlik Error: " + e.message;
    });
  }

  AppCtrl.prototype.populateAppList = function() {
    var self = this;
    qlik.getAppList(function (list) {
      self.apps = list;
    });
  }

  // define the angular module with its controller
  var app = angular.module('scoreModule', ["ngRoute"]);

  app.controller('AppCtrl', AppCtrl);
  app.controller('homeCtrl', homeCtrl);
  app.controller('searchBarCtrl', searchBarCtrl);
  app.controller('headerCtrl', headerCtrl);
  app.controller('filtersCtrl', filtersCtrl);
  
  app.controller('launchExecutionCtrl', launchExecutionCtrl);
  app.controller('operationalExecutionCtrl', operationalExecutionCtrl);
  app.controller('inMarketPerformanceCtrl', inMarketPerformanceCtrl);
  app.controller('teamEngagementCtrl', teamEngagementCtrl);

  app.controller('singleKPICtrl', singleKPICtrl);

  app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller: 'homeCtrl'
        })
        .when("/searchBar", {
            templateUrl : "views/searchBar.html",
            controller: 'searchBarCtrl'
        })
        .when("/operational-execution", {
            templateUrl : "views/operationalExecution.html",
            controller: 'operationalExecutionCtrl'
        })
        .when("/launch-execution", {
            templateUrl : "views/launchExecution.html",
            controller: 'launchExecutionCtrl'
        })
        .when("/in-market-performance", {
            templateUrl : "views/inMarketPerformance.html",
            controller: 'inMarketPerformanceCtrl'
        })
        .when("/team-engagement", {
            templateUrl : "views/teamEngagement.html",
            controller: 'teamEngagementCtrl'
        })
        .when("/single-kpi/:brand/:country/:section/:kpi", {
            templateUrl : "views/singleKPI.html",
            controller: 'singleKPICtrl'
        })
        .when("/single-kpi", {
            templateUrl : "views/singleKPI.html",
            controller: 'singleKPICtrl'
        })
        .otherwise({
            redirect: '/'
        });
    });
});