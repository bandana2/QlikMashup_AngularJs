define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
        return function($scope, $rootScope, $routeParams, $window){
            var qvf = qlik.openApp(appID, config);
            // clearFilter();
            $scope.brands =  ['Entresto', 'Cosentyx', 'Cosentyx PsO','Cosentyx SpA','Cosentyx PsA','Cosentyx AS', 'Aimovig'];
            $scope.countries = ['France', 'Germany', 'Spain'];
            $scope.KPIs = [
                {label: 'Dynamic Market', id: 'DynamicMarket', 
                objects: objectsMap.InMarPerf.DynamicMarket, 
                objPerBrand: {
                        'Entresto':  objectsMap.InMarPerf.DynamicMarket.ENTRESTO,
                    },
                },
                {label: 'Market Expansion', id: 'MarketExpansion', objects: [], objPerBrand: {
                        'Cosentyx': objectsMap.InMarPerf.MarketExpansion.COSENTYX,
                        'Cosentyx AS': objectsMap.InMarPerf.MarketExpansion.COSENTYX,
                        'Cosentyx PsO': objectsMap.InMarPerf.MarketExpansion.COSENTYX,
                        'Cosentyx SpA': objectsMap.InMarPerf.MarketExpansion.COSENTYX,
                        'Cosentyx PsA': objectsMap.InMarPerf.MarketExpansion.COSENTYX
                    },
                },
                //{label: 'HCP Perception', id: 'HCPPerception', objects: []},
                {label: 'Share Of Voice', id: 'ShareOfVoice', objects: objectsMap.InMarPerf.ShareOfVoice, 
                objPerBrand: {
                        'Cosentyx PsO': objectsMap.InMarPerf.ShareOfVoice.COSENTYX_PSO,
                    },
                },
            ]

            $scope.openSingleKPI = function(country, brand,  kpiId, kpiName, objects, objPerBrand = null){
               //  console.log(country, brand, kpiId, kpiName, objects);

                $rootScope.brand = brand;
                $rootScope.country = country;
                $rootScope.kpiId = kpiId;
                $rootScope.kpiName = kpiName;
                $rootScope.section = 'In Market Performance';
                $rootScope.sectionId = 'InMarPerf';
                $rootScope.objects = objects;
                $rootScope.objPerBrand = objPerBrand;
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
               // console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                 angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.countries, function(country, y){
                       
                            $rootScope.color['InMarPerf' + kpi.id + country ] = "gray";
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === kpi.label));
                                })[0];
                            if(filterColor){
                                 setColor(filterColor[3].qText, 'InMarPerf' + kpi.id + country);
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
               // console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                 angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.brands, function(brand, y){
                       
                            $rootScope.color['InMarPerf' + kpi.id + brand ] = $rootScope.color['InMarPerf' + kpi.id + brand ] ? $rootScope.color['InMarPerf' + kpi.id + brand ] : "gray";
                               var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === brand) && (obj[1].qText === kpi.label));
                                })[0];
                              if(filterColor && filterColor[3].qText !== '-'){
                               setColor(filterColor[3].qText, 'InMarPerf' + kpi.id + brand);
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
                                return ((obj[0].qText === "In-Market Performance"));
                                })[0];
                if(filterColor){
                    setColor(filterColor[2].qText, 'InMarPerf');
                }
            }

             qvf.createCube({
                    "qInitialDataFetch": [
                        {
                            "qHeight": 99,
                            "qWidth": 10
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
                                    "=if([Level 1 Score]='In-Market Performance', [Level 1 Score])"
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
                            "qLabel": "Score_InMark_DM",
                            "qLibraryId": "HTgkNj",
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
                            "qLabel": "Color_InMark_DM",
                            "qLibraryId": "HSPZcP",
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
                            "qLabel": "Score_InMark_ME",
                            "qLibraryId": "LuuJS",
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
                            "qLabel": "Color_InMark_ME",
                            "qLibraryId": "HFaE",
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
                            "qLabel": "Score_InMark_SOV",
                            "qLibraryId": "cvNRJQS",
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
                            "qLabel": "Color_InMark_SOV",
                            "qLibraryId": "tcSj",
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
                    },getInMarkColors);


            function getInMarkColors(reply,app){
             //   console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                 angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.countries, function(country, y){
                        angular.forEach($scope.brands, function(brand, x){
                            $rootScope.color['InMarPerf' + kpi.id + country + brand] = "gray";
                          //  $rootScope.color['OperExe' + kpi.id + country + brand] = 'dark-green'
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === brand) && (obj[3].qText === kpi.label));
                            });
                           // console.log(filterColor);
                            if(filterColor.length){   
                                switch(kpi.id){
                                    case "DynamicMarket" :
                                    setColor(filterColor[0][5].qText, 'InMarPerf' + kpi.id + country + brand); 
                                    // console.log(filterColor[0][5].qText);
                                
                                    break;
                                    case "MarketExpansion" :
                                    setColor(filterColor[0][7].qText, 'InMarPerf' + kpi.id + country + brand);
                                   // console.log(filterColor[0][7].qText);
                                
                                    break; 
                                    case "ShareOfVoice" :
                                    setColor(filterColor[0][9].qText, 'InMarPerf' + kpi.id + country + brand); 
                                    // console.log(filterColor[0][9].qText);
                                
                                    break;
                                    default:                                   
                                    $rootScope.color['InMarPerf' + kpi.id + country + brand] = "gray";
                                    break;
                                }
                                                                
                            }
                        });
                    });
                });
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