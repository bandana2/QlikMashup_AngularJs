define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
        return function($scope, $rootScope, $routeParams, $window){
            var qvf = qlik.openApp(appID, config);
           // clearFilter();
            $scope.brands =  ['Entresto', 'Cosentyx', 'Cosentyx PsO','Cosentyx SpA','Cosentyx PsA','Cosentyx AS', 'Aimovig'];
            $scope.countries = ['France', 'Germany', 'Spain'];
            $scope.KPIs = [
                {label: 'Team Barometer', id: 'TeamBarometer', objects:  objectsMap.TeamEngag.TeamBarometer},
                {label: 'Voluntary Turnover', id: 'VoluntaryTurnover', objects: objectsMap.TeamEngag.VolontaryTurnover},
            ]

             $scope.openSingleKPI = function(country, brand,  kpiId, kpiName, objects){
                // console.log(country, brand, kpiId, kpiName, objects);

                $rootScope.brand = brand;
                $rootScope.country = country;
                $rootScope.kpiId = kpiId;
                $rootScope.kpiName = kpiName;
                $rootScope.section = 'Team Engagement';
                $rootScope.sectionId = 'TeamEngag';
                $rootScope.objects = objects
                clearFilter();
                setValues(country, brand);
                $window.location.href = $rootScope.basepath + 'single-kpi';
            }

             function clearFilter(){
                qvf.field('Country').clear();
                qvf.field('[Novartis Brand]').clear();
                $rootScope.selectedBrands = [];
                $rootScope.selectedCountries = [];
                $rootScope.brand = [];
                $rootScope.country =[];
            }

            function setValues(country, brand){
                if(country && country !== null){
            	    qvf.field('Country').selectMatch(country, false); 
                    $rootScope.selectedCountries.push(country);
                }
                if(brand && brand !== null){
            	    qvf.field('[Novartis Brand]').selectMatch(brand, false);
                    $rootScope.selectedBrands.push(brand);
                }
           }

           qvf.createCube({
                    "qInitialDataFetch": [
                        {
                            "qHeight": 99,
                            "qWidth": 8
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
                            "qDef": {
                                "qFieldDefs": [
                                    "=if([Level 1 Score]='Team Engagement', [Level 1 Score])"
                                ]
                            },
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
                            "qDef": {
                                "qFieldDefs": [
                                    "=if([Level 2 Score]='Voluntary Turnover' OR [Level 2 Score]='Team Barometer', [Level 2 Score])\r\n                        "
                                ]
                            },
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
                            "qLabel": "Score_TE_TB",
                            "qLibraryId": "BaTta",
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
                            "qLabel": "Color_TE_TB",
                            "qLibraryId": "CRyUVZ",
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
                            "qLabel": "Score_TE_VT",
                            "qLibraryId": "SFmk",
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
                            "qLabel": "Color_TE_VT",
                            "qLibraryId": "afeLG",
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
                    },getTeamEngColors);

              function getTeamEngColors(reply, app){
               // console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 

                angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.countries, function(country, y){
                        angular.forEach($scope.brands, function(brand, x){

                            $rootScope.color['TE' + kpi.id + country + brand] = "gray";

                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === brand) && (obj[3].qText === kpi.label));
                                });
                           // console.log(filterColor);
                            if(filterColor.length){ 
                                    switch(kpi.id){
                                    case "TeamBarometer" :
                                    setColor(filterColor[0][5].qText, 'TE' + kpi.id + country + brand); 
                                    // console.log(filterColor[0][0].qText +":" +filterColor[0][1].qText+":"+filterColor[0][3].qText +":" +filterColor[0][5].qText);
                                
                                    break;
                                    case "VoluntaryTurnover" :
                                    setColor(filterColor[0][7].qText, 'TE' + kpi.id + country + brand);
                                   // console.log(filterColor[0][0].qText +":" +filterColor[0][1].qText+":"+filterColor[0][3].qText +":" +filterColor[0][7].qText);
                                    break;
                                }

                            }

                        })
                    })
                });

              }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 4
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
                        "qLabel": "SCORE_Country_L2",
                        "qLibraryId": "pzWh",
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
                        "qLabel": "COLOR_Country_L2",
                        "qLibraryId": "JvBkzzg",
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
                },getCountryColors);

            function getCountryColors(reply,app){
              //  console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                 angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.countries, function(country, y){
                       
                            $rootScope.color['TE' + kpi.id + country ] = "gray";
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === kpi.label));
                                })[0];
                            if(filterColor){
                                 setColor(filterColor[3].qText, 'TE' + kpi.id + country);
                            }
                           
                    });
                });
            }              

           
            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 4
                    }
                ],
                "qDimensions": [
                    {
                        qDef: {  
                            qFieldDefs: ["[Novartis Brand]"] 
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
                        "qLabel": "SCORE_Brand_L2",
                        "qLibraryId": "YdvGF",
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
                        "qLabel": "COLOR_Brand_L2",
                        "qLibraryId": "KVMQPM",
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
                },getBrandColors);

            function getBrandColors(reply,app){
              //  console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                 angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.brands, function(brand, y){
                       
                            $rootScope.color['TE' + kpi.id + brand ] = $rootScope.color['TE' + kpi.id + brand ] ? $rootScope.color['TE' + kpi.id + brand ] : "gray";
                               var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === brand) && (obj[1].qText === kpi.label));
                                })[0];
                              if(filterColor && filterColor[3].qText !== '-'){
                               setColor(filterColor[3].qText, 'TE' + kpi.id + brand);
                            }
                    });
                });
            }

             qvf.createCube({
            "qInitialDataFetch": [
                {
                    "qHeight": 20,
                    "qWidth": 3
                }
            ],
            "qDimensions": [
                {
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
                    "qLabel": "Color Total",
                    "qLibraryId": "FYpJhxW",
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
            },getKPITotalColors);
            function getKPITotalColors(reply,app){
              //  console.log(reply)
                var colors = reply.qHyperCube.qDataPages[0].qMatrix;
                var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === "Team Engagement"));
                                })[0];
                if(filterColor){
                    setColor(filterColor[2].qText, 'TeamEngag');
                }
            }
               function setColor(colorCase, KPIKey){
               
                 switch(colorCase){
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
                        break;
                }
            }
        }
});