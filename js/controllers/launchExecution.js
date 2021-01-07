define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
        return function($scope, $rootScope, $routeParams, $window){
            var qvf = qlik.openApp(appID, config);
           // clearFilter();
            $scope.brands =  ['Entresto', 'Cosentyx', 'Cosentyx PsO','Cosentyx SpA','Cosentyx PsA','Cosentyx AS', 'Aimovig'];
            $scope.countries = ['France', 'Germany', 'Spain'];
            $scope.KPIs = [
                {label: 'Pre-Launch Investment', id: 'PLI', objects: objectsMap.LaucExe.PLI},
               /* {label: 'Other Launch Execution KPIs', id: 'OLE'},*/
            ]

            qvf.createList({
                "qFrequencyMode": "V",
                "qDef": {
                        "qFieldDefs": [
                                "Time before launch"
                        ]
                },
                "qExpressions": [],
                "qInitialDataFetch": [
                        {
                                "qHeight": 20,
                                "qWidth": 1
                        }
                ],
                "qLibraryId": "5c7fdcad-6804-4372-ab5e-502cb7fb0767"
            },getTBL);
             function getTBL(reply, app){
               // console.log(reply);
                $rootScope.TBL = []
                angular.forEach(reply.qListObject.qDataPages[0].qMatrix, function(value, key){
                    if(value[0].qText){
                        $rootScope.TBL.push(value[0].qText);
                    }
                })
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
                       
                            $rootScope.color['LE' + kpi.id + country ] = "gray";
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === kpi.label));
                                })[0];
                            if(filterColor){
                                 setColor(filterColor[3].qText, 'LE' + kpi.id + country);
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
                       
                            $rootScope.color['LE' + kpi.id + brand ] = $rootScope.color['LE' + kpi.id + brand ] ? $rootScope.color['LE' + kpi.id + brand ] : "gray";
                               var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === brand) && (obj[1].qText === kpi.label));
                                })[0];
                              if(filterColor && filterColor[3].qText !== '-'){
                               setColor(filterColor[3].qText, 'LE' + kpi.id + brand);
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
               // console.log(reply)
                var colors = reply.qHyperCube.qDataPages[0].qMatrix;
                var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === "Launch Execution"));
                                })[0];
                if(filterColor){
                    setColor(filterColor[2].qText, 'LaucExe');
                }
            }

            









            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 20,
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
                        "qDef": {
                            "qFieldDefs": [
                                "=if([Level 1 Score]='Launch Execution', [Level 1 Score])"
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
                        "qLabel": "Score_LaunchExe_PreLaunch",
                        "qLibraryId": "AFP",
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
                        "qLabel": "Color_LaunchExe_PreLaunch",
                        "qLibraryId": "nbxJq",
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
                },getLaunchExecColors);

                function getLaunchExecColors(reply,app){
                  //  console.log(reply);
                      var colors = reply.qHyperCube.qDataPages[0].qMatrix; 

                angular.forEach($scope.KPIs, function(kpi, i){
                    angular.forEach($scope.countries, function(country, y){
                        angular.forEach($scope.brands, function(brand, x){
                            $rootScope.color['LaucExe' + kpi.id + country + brand] = "gray";
                          //  $rootScope.color['OperExe' + kpi.id + country + brand] = 'dark-green'
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === country) && (obj[1].qText === brand) && (obj[3].qText === kpi.label));
                                });
                           // console.log(filterColor);
                            if(filterColor.length){ 
                               // console.log(filterColor[0][0].qText +":" +filterColor[0][1].qText+":"+filterColor[0][3].qText +":" +filterColor[0][7].qText);
                                
                                switch(kpi.id){
                                    case "PLI" :
                                        setColor(filterColor[0][5].qText, 'LaucExe' + kpi.id + country + brand); 
                                      //  console.log(filterColor[0][0].qText +":" +filterColor[0][1].qText+":"+filterColor[0][3].qText +":" +filterColor[0][5].qText);                  
                                    break;
                                    default:                                   
                                    $rootScope.color['LaucExe' + kpi.id + country + brand] = "gray";
                                    break;
                                }
                                                                
                            }
                           

                        })
                    })
                })
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

            $scope.openSingleKPI = function(country, brand,  kpiId, kpiName, objects){
            	$rootScope.brand = brand;
            	$rootScope.country = country;
            	$rootScope.kpiId = kpiId;
            	$rootScope.kpiName = kpiName;
            	$rootScope.section = 'Launch Execution';
				$rootScope.sectionId = 'LaucExe';
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
    }
});