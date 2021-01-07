define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {

        return function($scope, $rootScope, $filter,  $window){
            var qvf = qlik.openApp(appID, config);

            $scope.KPIs = [
                {label: 'Launch Execution', id: 'LaucExe', href: '#/launch-execution', icon: 'images/icon_launch_execution.png'},
                {label: 'Operational Execution', id: 'OperExe', href: '#/operational-execution', icon: 'images/icon_operational_execution.png'},
                {label: 'In-Market Performance', id: 'InMarPerf', href: '#/in-market-performance', icon: 'images/icon_in_market_performance.png'},
                {label: 'Team Engagement', id: 'TeamEngag', href: '#/team-engagement', icon: 'images/icon_team_engagement.png'},
            ]

            $scope.detailsTable = {
                brands: [
                    { name: 'Entresto', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Cosentyx', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    // JUST FOR TESTING, I NEED TO HAVE COSENTYX COMING FROM DATA
                    { name: 'Cosentyx PsO', indication: true, YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Cosentyx SpA', indication: true, YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Cosentyx PsA', indication: true, YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Cosentyx AS', indication: true, YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Aimovig', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                ],
                countries: [
                    { name: 'France', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Germany', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                    { name: 'Spain', YTD: '', vsPY: '', vsTGT: '', MSMonth: '', MSRank: '', MS1x1: '', MS3x3: '', ProfYTD: '', ProfMSPerc: '', ProfVsPY: '', ProfVsTGT: '' }, 
                ],
            }

            qvf.getObject('marketShareChart', '9678f4c8-a63d-4bf1-bf59-80b3c0879a5a');
            qvf.getObject('mgmtSalesChart', 'a3fcba68-5c7c-4416-827f-4983eab162f6');
            qvf.getObject('profitabilityChart', '524fac59-2594-45e0-91da-7cb7d38b0d23');

            function resetDetailsTable(table){
                angular.forEach($scope.detailsTable[table], function(row, i){
                    $scope.detailsTable[table][i].YTD = 0;
                    $scope.detailsTable[table][i].vsPY = 0;
                    $scope.detailsTable[table][i].vsTGT = 0;
                    $scope.detailsTable[table][i].ProfYTD = 0; 
                    $scope.detailsTable[table][i].ProfMSPerc = 0; 
                    $scope.detailsTable[table][i].ProfVsPY = 0; 
                    $scope.detailsTable[table][i].ProfVsTGT = 0;
                })
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
                        "qDef": {
                            "qFieldDefs": [
                                "=if(Len(Trim(Country))=0, 'Europe', Country) "
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
                ],
                "qMeasures": [
                    {
                        "qLabel": "F1_ManSales_YTD-Country/RE",
                        "qLibraryId": "TQgePqk",
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
                        "qLabel": "F1_ManSales_vs PY-Country/RE_Prev Month",
                        "qLibraryId": "TmNpdJn",
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
                        "qLabel": "F1_ManSales_vs PY-Country/RE_Latest Month",
                        "qLibraryId": "WbjCZ",
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
                        "qLabel": "F1_ManSales_vs TGT-Country/RE-Prev month",
                        "qLibraryId": "LEkKrq",
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
                        "qLabel": "F1_ManSales_vs TGT-Country/RE-Latest month",
                        "qLibraryId": "fAdKArJ",
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
                        "qLabel": "F1_ManagementSales_MaxDate",
                        "qLibraryId": "HXhkL",
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
            }, getManagementSalesCountryData);
            function getManagementSalesCountryData(reply, app){
                if(!$rootScope.selectedBrands.length){
                    if(!$rootScope.selectedCountries.length){
                        var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                        angular.forEach(totals, function(total, i){
                            if('Region Europe' === total[0].qText){
                                $scope.totalYTD = total[1].qText;
                                $scope.vsPY = total[3].qNum * 100;
                                $scope.vsTGT = total[5].qNum * 100;
                                $scope.ManSalDate = total[6].qText;
                                $scope.vsPYTrend = (total[2].qNum * 100) < (total[3].qNum * 100);
                                $scope.vsTGTTrend = (total[4].qNum * 100) < (total[5].qNum * 100);         
                            }
                        })
                    }else{
                        $scope.totalYTD = reply.qHyperCube.qGrandTotalRow[0].qNum;
                        $scope.vsPY = reply.qHyperCube.qGrandTotalRow[2].qNum * 100;
                        $scope.vsTGT = reply.qHyperCube.qGrandTotalRow[4].qNum * 100;
                        $scope.ManSalDate = reply.qHyperCube.qGrandTotalRow[5].qText;
                        $scope.vsPYTrend = (reply.qHyperCube.qGrandTotalRow[1].qNum * 100) < (reply.qHyperCube.qGrandTotalRow[2].qNum * 100);
                        $scope.vsTGTTrend = (reply.qHyperCube.qGrandTotalRow[3].qNum * 100) < (reply.qHyperCube.qGrandTotalRow[4].qNum * 100); 
                    }
                    // If brand is not selected populate country on countries' columns
                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                    angular.forEach(totals, function(total, i){
                        angular.forEach($scope.detailsTable.countries, function(country, i){
                            if(country.name === total[0].qText){
                                $scope.detailsTable.countries[i].YTD = total[1].qText;
                                $scope.detailsTable.countries[i].vsPY = total[3].qNum * 100;
                                $scope.detailsTable.countries[i].vsTGT = total[5].qNum * 100;
                            }
                        })
                    })
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
                        "qDef": {
                             "qFieldDefs": [
                                "[Novartis Brand]"
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
                                "Country"
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
                    
                ],
                "qMeasures": [
                    {
                        "qLabel": "F1_ManSales_YTD-Brand",
                        "qLibraryId": "SSWeWXx",
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
                        "qLabel": "F1_ManSales_ PY-Brand-Prev month",
                        "qLibraryId": "qtmUtM",
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
                        "qLabel": "F1_ManSales_vs PY-Brand-latest month",
                        "qLibraryId": "bbudCS",
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
                        "qLabel": "F1_ManSales_vs TGT-Brand_Prev Month",
                        "qLibraryId": "UCsPNBt",
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
                        "qLabel": "F1_ManSales_vs TGT-Brand_latest Month",
                        "qLibraryId": "DfvssfQ",
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
                        "qLabel": "F1_ManagementSales_MaxDate",
                        "qLibraryId": "HXhkL",
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
            }, getManagementSalesBrandData);
            function getManagementSalesBrandData(reply, app){
               // console.log(reply)
                if($rootScope.selectedBrands.length && !$rootScope.selectedCountries.length){
                    //$scope.totalYTD = reply.qHyperCube.qGrandTotalRow[0].qNum;
                    // WHY ONLY YTD TAKES FROM REGION EUROPE AND THE OTHERS FROM TOTAL?
                    var totYTD= 0,
                        vsPYPmonth = 0,
                        vsPY = 0,
                        vsTGTPmonth = 0,
                        vsTGT = 0,
                        vsPYTrend = 0,
                        vsTGTTrend = 0;
                    var totals= reply.qHyperCube.qDataPages[0].qMatrix;
                    angular.forEach(totals, function(total, i){
                            if($rootScope.selectedBrands.includes(total[0].qText) && 'Region Europe' == total[1].qText){           
                                totYTD  = parseFloat(totYTD) + parseFloat(total[2].qNum);
                                vsPY += total[4].qNum * 100 / $rootScope.selectedBrands.length;
                                vsTGT += total[6].qNum * 100 / $rootScope.selectedBrands.length;

                                vsPYPmonth += total[3].qNum * 100 / $rootScope.selectedBrands.length;
                                vsTGTPmonth += total[5].qNum * 100 / $rootScope.selectedBrands.length;

                                vsPYTrend = vsPYPmonth < vsPY;
                                vsTGTTrend = vsTGTPmonth < vsTGT;
                                
                                $scope.totalYTD = totYTD;
                                $scope.vsPY = vsPY;
                                $scope.vsTGT = vsTGT;
                                $scope.vsPYTrend = vsPYTrend;
                                $scope.vsTGTTrend = vsTGTTrend;
                            }
                        })
                    $scope.ManSalDate = reply.qHyperCube.qGrandTotalRow[5].qText;
                }
                var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                //console.log(reply)
                angular.forEach($scope.detailsTable.brands, function(brand, i){
                    var dtbYTD = 0,
                        dtbvsPY = 0,
                        dtbvsTGT = 0;
                    angular.forEach(totals, function(total, y){
                        if($rootScope.selectedCountries.length){
                            if(brand.name === total[0].qText && $rootScope.selectedCountries.includes(total[1].qText)){
                                dtbYTD += total[2].qNum;
                                dtbvsPY += total[4].qNum * 100 / $rootScope.selectedCountries.length;
                                dtbvsTGT += total[6].qNum * 100 / $rootScope.selectedCountries.length;

                                $scope.detailsTable.brands[i].YTD = dtbYTD;
                                $scope.detailsTable.brands[i].vsPY = dtbvsPY;
                                $scope.detailsTable.brands[i].vsTGT = dtbvsTGT;
                            }
                        }else{
                            if(brand.name === total[0].qText && 'Region Europe' == total[1].qText){
                                $scope.detailsTable.brands[i].YTD = total[2].qNum;
                                $scope.detailsTable.brands[i].vsPY = total[4].qNum * 100;
                                $scope.detailsTable.brands[i].vsTGT = total[6].qNum * 100;
                            }
                        }
                    })
                })
            }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 12
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "=if(Len(Trim(Country))=0, 'Europe', Country) "
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
                                "[Novartis Brand]"
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
                    
                ],
                "qMeasures": [
                    {
                        "qLabel": "F1_ManSales_YTD-Brand",
                        "qLibraryId": "SSWeWXx",
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
                        "qLabel": "F1_ManSales_vs PY-Country/RE_Latest Month",
                        "qLibraryId": "WbjCZ",
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
                        "qLabel": "F1_ManSales_vs TGT-Country/RE-Latest month",
                        "qLibraryId": "fAdKArJ",
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
                        "qLabel": "F1_ManSales_vs PY-Brand-latest month",
                        "qLibraryId": "bbudCS",
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
                        "qLabel": "F1_ManSales_ PY-Brand-Prev month",
                        "qLibraryId": "qtmUtM",
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
                        "qLabel": "F1_ManSales_vs TGT-Brand_latest Month",
                        "qLibraryId": "DfvssfQ",
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
                        "qLabel": "F1_ManSales_vs TGT-Brand_Prev Month",
                        "qLibraryId": "UCsPNBt",
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
                        "qLabel": "F1_ManagementSales_MaxDate",
                        "qLibraryId": "HXhkL",
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
            }, getManagementSalesBrandPerCountryData);
            function getManagementSalesBrandPerCountryData(reply, app){
                //console.log(reply)
                if($rootScope.selectedBrands.length && $rootScope.selectedCountries.length){
                    //$scope.totalYTD = reply.qHyperCube.qGrandTotalRow[0].qNum;
                    // WHY ONLY YTD TAKES FROM REGION EUROPE AND THE OTHERS FROM TOTAL?
                    var totYTD= 0;
                    var totals= reply.qHyperCube.qDataPages[0].qMatrix;
                    angular.forEach(totals, function(total, i){
                            if($rootScope.selectedBrands.includes(total[1].qText) && $rootScope.selectedCountries.includes(total[0].qText)){           
                                totYTD  = parseFloat(totYTD) + parseFloat(total[2].qNum);
                                $scope.totalYTD = totYTD;
                            }
                        })
                    $scope.vsPY = reply.qHyperCube.qGrandTotalRow[3].qNum * 100;
                    $scope.vsTGT = reply.qHyperCube.qGrandTotalRow[5].qNum * 100;
                    $scope.ManSalDate = reply.qHyperCube.qGrandTotalRow[7].qText;
                    $scope.vsPYTrend = (reply.qHyperCube.qGrandTotalRow[4].qNum * 100) < (reply.qHyperCube.qGrandTotalRow[3].qNum * 100);
                    $scope.vsTGTTrend = (reply.qHyperCube.qGrandTotalRow[6].qNum * 100) < (reply.qHyperCube.qGrandTotalRow[5].qNum * 100); 
                }
                if($rootScope.selectedBrands.length){
                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;
                    angular.forEach($scope.detailsTable.countries, function(country, y){
                        var dtcYTD = 0,
                            dtcvsPY = 0,
                            dtcvsTGT = 0;
                        angular.forEach(totals, function(total, i){
                            if(country.name === total[0].qText){
                                dtcYTD += total[2].qNum;
                                dtcvsPY += total[5].qNum * 100 / $rootScope.selectedBrands.length;
                                dtcvsTGT += total[7].qNum * 100 / $rootScope.selectedBrands.length;

                                $scope.detailsTable.countries[y].YTD = dtcYTD;
                                $scope.detailsTable.countries[y].vsPY = dtcvsPY;
                                $scope.detailsTable.countries[y].vsTGT = dtcvsTGT;
                            }
                        })
                    })
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
                        "qDef": {
                            "qFieldDefs": [
                                " =if(Company='NOVARTIS', Company)"
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
                                " =if(Len(Trim(Country))=0, 'Europe', Country)"
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
                        "qLabel": "F2_MktShr_Month-Country/RE",
                        "qLibraryId": "JBcauz",
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
                        "qLabel": "F2_MktShr_Rank-Country/RE",
                        "qLibraryId": "xeSqV",
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
                        "qLabel": "F2_MktShr_1 x 1-Country/RE",
                        "qLibraryId": "Mnczjb",
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
                        "qLabel": "F2_MktShr_3 x 3-Country/RE",
                        "qLibraryId": "vgJSSwq",
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
                        "qLabel": "F2_MktShr_YTD-Country/RE",
                        "qLibraryId": "VpLFpV",
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
                        "qLabel": "F2_MktShr_MAT-Country/RE",
                        "qLibraryId": "Qugdxz",
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
                        "qLabel": "F2_MktShare_MaxDate",
                        "qLibraryId": "gnkPjKh",
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
                ],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            },getMarketSalesCountryData);
            function getMarketSalesCountryData(reply, app){
                if(!$rootScope.selectedBrands.length){
                    if(!$rootScope.selectedCountries.length){
                        var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                        angular.forEach(totals, function(total, i){
                            if('Region Europe' === total[1].qText){
                                $scope.MSMonth = total[2].qNum * 100;
                                $scope.MSRank = total[3].qNum;
                                $scope.MS1x1 = total[4].qNum;
                                $scope.MS3x3 = total[5].qNum;
                                $scope.MSYTD = total[6].qNum;
                                $scope.MAT = total[7].qNum;
                                $scope.MktSalDate = total[8].qText;
                            }
                        })
                    }else{
                        $scope.MSMonth = reply.qHyperCube.qGrandTotalRow[0].qNum * 100;
                        $scope.MSRank = reply.qHyperCube.qGrandTotalRow[1].qNum;
                        $scope.MS1x1 = reply.qHyperCube.qGrandTotalRow[2].qNum;
                        $scope.MS3x3 = reply.qHyperCube.qGrandTotalRow[3].qNum;
                        $scope.MSYTD = reply.qHyperCube.qGrandTotalRow[4].qNum;
                        $scope.MAT = reply.qHyperCube.qGrandTotalRow[5].qNum;
                        $scope.MktSalDate = reply.qHyperCube.qGrandTotalRow[6].qText;
                    }

                    // If brand is not selected populate country on countries' columns
                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;                 
                        angular.forEach(totals, function(total, i){
                            angular.forEach($scope.detailsTable.countries, function(country, i){
                                if(country.name === total[1].qText && 'NOVARTIS' === total[0].qText){
                                    $scope.detailsTable.countries[i].MSMonth = total[2].qNum * 100;
                                    $scope.detailsTable.countries[i].MSRank = total[3].qNum;
                                    $scope.detailsTable.countries[i].MS1x1 = total[4].qNum;
                                    $scope.detailsTable.countries[i].MS3x3 = total[5].qNum;
                                }
                            })
                        })                   
                }
            }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 9
                    }
                ],
                "qDimensions": [
                    {
                         "qDef": {
                            "qFieldDefs": [
                                " =if(Company='NOVARTIS', Company)"
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
                                "[Novartis Brand]"
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
                                " =if(Len(Trim(Country))=0, 'Europe', Country)"
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
                ],
                "qMeasures": [
                    {
                        "qLabel": "F2_MktShr_Month-Brand",
                        "qLibraryId": "ZnRXPp",
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
                        "qLabel": "F2_MktShr_Rank-Brand",
                        "qLibraryId": "RrJGcmG",
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
                        "qLabel": "F2_MktShr_1 x 1-Brand",
                        "qLibraryId": "XSTBbM",
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
                        "qLabel": "F2_MktShr_3 x 3-Brand",
                        "qLibraryId": "CKhc",
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
                        "qLabel": "F2_MktShr_YTD-Brand",
                        "qLibraryId": "smcBSfQ",
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
                        "qLabel": "F2_MktShr_MAT-Brand",
                        "qLibraryId": "EJjSER",
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
                        "qLabel": "F2_MktShare_MaxDate",
                        "qLibraryId": "gnkPjKh",
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
                ],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            },getMarketSalesBrandData);
            function getMarketSalesBrandData(reply, app){
               var totals= reply.qHyperCube.qDataPages[0].qMatrix;
               if($rootScope.selectedBrands.length === 1 && $rootScope.selectedBrands.indexOf('Entresto') === -1 ){
                    if(!$rootScope.selectedCountries.length){                      
                             angular.forEach(totals, function(total, i){
                                if('Region Europe' == total[2].qText){
                                    $scope.MSMonth =total[3].qNum *100;
                                    $scope.MSRank = total[4].qNum; 
                                    $scope.MS1x1 = total[5].qNum;
                                    $scope.MS3x3 = total[6].qNum;
                                    $scope.MSYTD = total[7].qNum;
                                    $scope.MAT = total[8].qNum;
                                    $scope.MktSalDate = reply.qHyperCube.qGrandTotalRow[6].qText;
                                }
                             });
                    }else {
                        angular.forEach(totals, function(total, i){                                
                                    $scope.MSMonth = reply.qHyperCube.qGrandTotalRow[0].qNum * 100;
                                    $scope.MSRank = reply.qHyperCube.qGrandTotalRow[1].qNum;
                                    $scope.MS1x1 = reply.qHyperCube.qGrandTotalRow[2].qNum;
                                    $scope.MS3x3 = reply.qHyperCube.qGrandTotalRow[3].qNum;
                                    $scope.MSYTD = reply.qHyperCube.qGrandTotalRow[4].qNum;
                                    $scope.MAT = reply.qHyperCube.qGrandTotalRow[5].qNum;
                                    $scope.MktSalDate = reply.qHyperCube.qGrandTotalRow[6].qText;                                
                            })
                    }
               }else if( $rootScope.selectedBrands.length >1){
                //When more than one brand is selected Market share is not applicable. and when MSRank is set to NaN html displays correctly. 
                    $scope.MSRank='NaN';
               }

               if($rootScope.selectedBrands.length  && $rootScope.selectedBrands.indexOf('Entresto') === -1){
                angular.forEach($scope.detailsTable.countries, function(country, i){  
                                                var totMsMonth=0,totMsRank=0,totMs1x1=0,totMs3x3=0;
       
                    angular.forEach(totals, function(total, k){
                        angular.forEach($rootScope.selectedBrands, function(brand, j){
                            if(brand === total[1].qText && country.name == total[2].qText &&  'NOVARTIS' === total[0].qText){
                                totMsMonth = totMsMonth + parseFloat(total[3].qNum)
                                totMsRank = totMsRank + parseFloat(total[4].qNum)
                                totMs1x1 = totMs1x1 + parseFloat(total[5].qNum)
                                totMs3x3 = totMs3x3 +parseFloat (total[6].qNum)
                                $scope.detailsTable.countries[i].MSMonth = totMsMonth * 100 / $rootScope.selectedBrands.length;
                                $scope.detailsTable.countries[i].MSRank = totMsRank / $rootScope.selectedBrands.length;
                                $scope.detailsTable.countries[i].MS1x1 = totMs1x1 / $rootScope.selectedBrands.length;
                                $scope.detailsTable.countries[i].MS3x3 = totMs3x3 / $rootScope.selectedBrands.length; 
                            }
                        });
                    }); 
                });
               }

               angular.forEach($scope.detailsTable.brands, function(brand, i){                    
                         if(!$rootScope.selectedCountries.length){
                             angular.forEach(totals, function(total, k){
                                 if(brand.name === total[1].qText && 'Region Europe' == total[2].qText &&  'NOVARTIS' === total[0].qText){
                                    $scope.detailsTable.brands[i].MSMonth = total[3].qNum * 100;
                                    $scope.detailsTable.brands[i].MSRank = total[4].qNum;
                                    $scope.detailsTable.brands[i].MS1x1 = total[5].qNum;
                                    $scope.detailsTable.brands[i].MS3x3 = total[6].qNum;                                    
                                 }
                            });
                         }else {                          
                             var totMsMonth=0,totMsRank=0,totMs1x1=0,totMs3x3=0;
                             angular.forEach(totals, function(total, k){
                                 angular.forEach($rootScope.selectedCountries, function(country, j){
                                     if(brand.name === total[1].qText && country == total[2].qText &&  'NOVARTIS' === total[0].qText){
                                        totMsMonth = totMsMonth + parseFloat(total[3].qNum)
                                        totMsRank = totMsRank + parseFloat(total[4].qNum)
                                        totMs1x1 = totMs1x1 + parseFloat(total[5].qNum)
                                        totMs3x3 = totMs3x3 +parseFloat (total[6].qNum)
                                        //console.log(total[2].qText+"::"+totMsMonth +":" + totMsRank)
                                        $scope.detailsTable.brands[i].MSMonth = totMsMonth * 100 / $rootScope.selectedCountries.length;
                                        $scope.detailsTable.brands[i].MSRank = totMsRank  / $rootScope.selectedCountries.length;
                                        $scope.detailsTable.brands[i].MS1x1 = totMs1x1  / $rootScope.selectedCountries.length;
                                        $scope.detailsTable.brands[i].MS3x3 = totMs3x3  / $rootScope.selectedCountries.length; 
                                    }
                                });
                            });
                         }
                    
               });


                
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
                        "qDef": {
                            "qFieldDefs": [
                                "=if(Company='NOVARTIS', Company)"
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
                                "=if(Len(Trim(Country))=0, 'Europe', Country)"
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
                                "=if(Company='NOVARTIS' And [Novartis Brand]= 'Entresto', [Novartis Brand])"
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
                        "qLabel": "F2_MktShr(Entresto)_Month-Country/RE",
                        "qLibraryId": "PPAcQ",
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
                        "qLabel": "F2_MktShr_Month-Brand",
                        "qLibraryId": "ZnRXPp",
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
                        "qLabel": "F2_MktShr(Entresto)_1 x 1-Brand",
                        "qLibraryId": "BQPZk",
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
                        "qLabel": "MktShr(Entresto)_3 x 3-Brand",
                        "qLibraryId": "vCXw",
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
                        "qLabel": "MktShr(Entresto)_YTD-Brand",
                        "qLibraryId": "TXJwrpJ",
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
                        "qLabel": "MktShr(Entresto)_MAT-Brand",
                        "qLibraryId": "ZJBjKY",
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
                        "qLabel": "PatPen_MaxDate_Ent_Market Shrae",
                        "qLibraryId": "GuUag",
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
                },getMarketSalesEntrestoData);

            function getMarketSalesEntrestoData(reply, app){
                var totals= reply.qHyperCube.qDataPages[0].qMatrix;     
                if($rootScope.selectedBrands.length === 1 && $rootScope.selectedBrands.indexOf('Entresto') == 0 ){
                    
                      if(!$rootScope.selectedCountries.length){                      
                        angular.forEach(totals, function(total, i){ 
                                if('Region Europe' == total[1].qText){                                  
                                    $scope.MSMonth =total[3].qNum *100;
                                    $scope.MSRank = total[4].qNum; 
                                    $scope.MS1x1 = total[5].qNum;
                                    $scope.MS3x3 = total[6].qNum;
                                    $scope.MSYTD = total[7].qNum;
                                    $scope.MAT = total[8].qNum;
                                    $scope.MktSalDate = reply.qHyperCube.qGrandTotalRow[6].qText;
                                }
                             });
                      }else{
                          angular.forEach(totals, function(total, i){                               
                                    $scope.MSMonth = reply.qHyperCube.qGrandTotalRow[0].qNum * 100;
                                    $scope.MSRank = reply.qHyperCube.qGrandTotalRow[1].qNum;
                                    $scope.MS1x1 = reply.qHyperCube.qGrandTotalRow[2].qNum;
                                    $scope.MS3x3 = reply.qHyperCube.qGrandTotalRow[3].qNum;
                                    $scope.MSYTD = reply.qHyperCube.qGrandTotalRow[4].qNum;
                                    $scope.MAT = reply.qHyperCube.qGrandTotalRow[5].qNum;
                                    $scope.MktSalDate = reply.qHyperCube.qGrandTotalRow[6].qText;  
                            })
                      }
                }

                 angular.forEach($scope.detailsTable.brands, function(brand, i){                    
                         if(!$rootScope.selectedCountries.length){
                             angular.forEach(totals, function(total, k){
                                 if(brand.name === total[2].qText && 'Region Europe' == total[1].qText &&  'NOVARTIS' === total[0].qText){
                                    $scope.detailsTable.brands[i].MSMonth = total[3].qNum * 100;
                                    $scope.detailsTable.brands[i].MSRank = total[4].qNum;
                                    $scope.detailsTable.brands[i].MS1x1 = total[5].qNum;
                                    $scope.detailsTable.brands[i].MS3x3 = total[6].qNum;
                                 }
                            });
                         }else {
                            var totMsMonth=0,totMsRank=0,totMs1x1=0,totMs3x3=0;
                            angular.forEach(totals, function(total, k){
                                 angular.forEach($rootScope.selectedCountries, function(country, j){
                                     if(brand.name === total[2].qText && country == total[1].qText &&  'NOVARTIS' === total[0].qText){
                                      /*  $scope.detailsTable.brands[i].MSMonth = reply.qHyperCube.qGrandTotalRow[0].qNum * 100;
                                        $scope.detailsTable.brands[i].MSRank = reply.qHyperCube.qGrandTotalRow[1].qNum;
                                        $scope.detailsTable.brands[i].MS1x1 = reply.qHyperCube.qGrandTotalRow[2].qNum;
                                        $scope.detailsTable.brands[i].MS3x3 = reply.qHyperCube.qGrandTotalRow[3].qNum;*/
                                        totMsMonth = totMsMonth + parseFloat(total[3].qNum)
                                        totMsRank = totMsRank + parseFloat(total[4].qNum)
                                        totMs1x1 = totMs1x1 + parseFloat(total[5].qNum)
                                        totMs3x3 = totMs3x3 +parseFloat (total[6].qNum)
                                        //console.log(totMsMonth);
                                        $scope.detailsTable.brands[i].MSMonth = totMsMonth * 100;
                                        $scope.detailsTable.brands[i].MSRank = totMsRank;
                                        $scope.detailsTable.brands[i].MS1x1 = totMs1x1;
                                        $scope.detailsTable.brands[i].MS3x3 = totMs3x3; 

                                        $scope.detailsTable.countries[i].MSMonth = totMsMonth * 100;
                                        $scope.detailsTable.countries[i].MSRank = totMsRank;
                                        $scope.detailsTable.countries[i].MS1x1 = totMs1x1;
                                        $scope.detailsTable.countries[i].MS3x3 = totMs3x3;                                          
                                    }
                                });
                            });
                         }
                    
               });
            }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 17
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "=if(Len(Trim(Country))=0, 'Europe', Country) "
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
                ],
                "qMeasures": [
                    {
                        "qLabel": "Prof_YTD EMR-Country/RE",
                        "qLibraryId": "ZUepP",
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
                        "qLabel": "Prof_(% of MS)-Country/RE",
                        "qLibraryId": "mfNuy",
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
                        "qLabel": "Prof_vs PY-Country/RE",
                        "qLibraryId": "Cbwmvt",
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
                        "qLabel": "Prof_(pp) vs PY-Country/RE",
                        "qLibraryId": "dcvkRPq",
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
                        "qLabel": "Prof_vs TGT-Country/RE",
                        "qLibraryId": "Capgqb",
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
                        "qLabel": "Prof_(pp)vs TGT-Country/RE",
                        "qLibraryId": "esrtJZs",
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
                        "qLabel": "Prof_YTD EMR-Brand",
                        "qLibraryId": "zZNwsL",
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
                        "qLabel": "Prof_(% of MS)-Brand)",
                        "qLibraryId": "nhCPY",
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
                        "qLabel": "Prof_vs PY-Brand",
                        "qLibraryId": "vTPJj",
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
                        "qLabel": "Prof_(pp) vs PY-Brand",
                        "qLibraryId": "jWpnDq",
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
                        "qLabel": "Prof_vs TGT-Brand",
                        "qLibraryId": "GkCa",
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
                        "qLabel": "prof_(pp)vs TGT-Brand",
                        "qLibraryId": "FrqGPu",
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
                        "qLabel": "Prof_MaxDate",
                        "qLibraryId": "cbKWrmJ",
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
                ],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            },getProfitabilityCountryData);
            function getProfitabilityCountryData(reply, app){
                if(!$rootScope.selectedBrands.length){
                    if(!$rootScope.selectedCountries.length){
                        var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                        angular.forEach(totals, function(total, i){
                            if('Region Europe' === total[0].qText){
                                $scope.YTDEMR = total[1].qNum;
                                $scope.MSPerc = total[2].qNum * 100;
                                $scope.ProfVsPY = total[3].qNum * 100;
                                $scope.ProfVsPYpp = total[4].qNum;
                                $scope.ProfVsTGT = total[5].qNum * 100;
                                $scope.ProfVsTGTpp = total[6].qNum;
                                $scope.ProfDate = total[13].qText;
                            }
                        })

                    }else{
                        $scope.YTDEMR = reply.qHyperCube.qGrandTotalRow[0].qNum;
                        $scope.MSPerc = reply.qHyperCube.qGrandTotalRow[1].qNum * 100;
                        $scope.ProfVsPY = reply.qHyperCube.qGrandTotalRow[2].qNum * 100;
                        $scope.ProfVsPYpp = reply.qHyperCube.qGrandTotalRow[3].qNum;
                        $scope.ProfVsTGT = reply.qHyperCube.qGrandTotalRow[4].qNum * 100;
                        $scope.ProfVsTGTpp = reply.qHyperCube.qGrandTotalRow[5].qNum;
                        $scope.ProfDate = reply.qHyperCube.qGrandTotalRow[12].qText;
                    }
                    
                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                    angular.forEach(totals, function(total, i){
                        angular.forEach($scope.detailsTable.countries, function(country, i){
                            if(country.name === total[0].qText){
                                $scope.detailsTable.countries[i].ProfYTD = total[1].qNum;
                                $scope.detailsTable.countries[i].ProfMSPerc = total[2].qNum * 100;
                                $scope.detailsTable.countries[i].ProfVsPY = total[3].qNum * 100;
                                $scope.detailsTable.countries[i].ProfVsTGT = total[5].qNum * 100;
                            }
                        })
                    })
                }
            }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 17
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "[Novartis Brand]"
                            ]
                        }
                    },
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "Country"
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
                ],
                "qMeasures": [
                    {
                        "qLabel": "Prof_YTD EMR-Country/RE",
                        "qLibraryId": "ZUepP",
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
                        "qLabel": "Prof_(% of MS)-Country/RE",
                        "qLibraryId": "mfNuy",
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
                        "qLabel": "Prof_vs PY-Country/RE",
                        "qLibraryId": "Cbwmvt",
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
                        "qLabel": "Prof_(pp) vs PY-Country/RE",
                        "qLibraryId": "dcvkRPq",
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
                        "qLabel": "Prof_vs TGT-Country/RE",
                        "qLibraryId": "Capgqb",
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
                        "qLabel": "Prof_(pp)vs TGT-Country/RE",
                        "qLibraryId": "esrtJZs",
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
                        "qLabel": "Prof_YTD EMR-Brand",
                        "qLibraryId": "zZNwsL",
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
                        "qLabel": "Prof_(% of MS)-Brand)",
                        "qLibraryId": "nhCPY",
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
                        "qLabel": "Prof_vs PY-Brand",
                        "qLibraryId": "vTPJj",
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
                        "qLabel": "Prof_(pp) vs PY-Brand",
                        "qLibraryId": "jWpnDq",
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
                        "qLabel": "Prof_vs TGT-Brand",
                        "qLibraryId": "GkCa",
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
                        "qLabel": "prof_(pp)vs TGT-Brand",
                        "qLibraryId": "FrqGPu",
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
                        "qLabel": "Prof_MaxDate",
                        "qLibraryId": "cbKWrmJ",
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
                        "qLabel": "F2_MktShare_MaxDate",
                        "qLibraryId": "gnkPjKh",
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
                        "qLabel": "F1_ManagementSales_MaxDate",
                        "qLibraryId": "HXhkL",
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
            },getProfitabilityBrandData);
            function getProfitabilityBrandData(reply, app){
                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;  
                    angular.forEach(totals, function(total, i){
                        angular.forEach($scope.detailsTable.brands, function(brand, i){
                            if(brand.name === total[0].qText){
                                $scope.detailsTable.brands[i].ProfYTD = total[8].qNum;
                                $scope.detailsTable.brands[i].ProfMSPerc = total[9].qNum;
                                $scope.detailsTable.brands[i].ProfVsPY = total[10].qNum * 100;
                                $scope.detailsTable.brands[i].ProfVsTGT = total[12].qNum * 100;
                            }
                        })
                    })
            }   

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 17
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "=if(Len(Trim(Country))=0, 'Europe', Country) "
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
                                "[Novartis Brand]"
                            ]
                        }
                    }
                ],
                "qMeasures": [
                    {
                        "qLabel": "Prof_YTD EMR-Country/RE",
                        "qLibraryId": "ZUepP",
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
                        "qLabel": "Prof_(% of MS)-Country/RE",
                        "qLibraryId": "mfNuy",
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
                        "qLabel": "Prof_vs PY-Country/RE",
                        "qLibraryId": "Cbwmvt",
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
                        "qLabel": "Prof_(pp) vs PY-Country/RE",
                        "qLibraryId": "dcvkRPq",
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
                        "qLabel": "Prof_vs TGT-Country/RE",
                        "qLibraryId": "Capgqb",
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
                        "qLabel": "Prof_(pp)vs TGT-Country/RE",
                        "qLibraryId": "esrtJZs",
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
                        "qLabel": "Prof_YTD EMR-Brand",
                        "qLibraryId": "zZNwsL",
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
                        "qLabel": "Prof_(% of MS)-Brand)",
                        "qLibraryId": "nhCPY",
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
                        "qLabel": "Prof_vs PY-Brand",
                        "qLibraryId": "vTPJj",
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
                        "qLabel": "Prof_(pp) vs PY-Brand",
                        "qLibraryId": "jWpnDq",
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
                        "qLabel": "Prof_vs TGT-Brand",
                        "qLibraryId": "GkCa",
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
                        "qLabel": "prof_(pp)vs TGT-Brand",
                        "qLibraryId": "FrqGPu",
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
                        "qLabel": "Prof_MaxDate",
                        "qLibraryId": "cbKWrmJ",
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
                        "qLabel": "F2_MktShare_MaxDate",
                        "qLibraryId": "gnkPjKh",
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
                ],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            },getProfitabilityBrandPerCountryData);
            function getProfitabilityBrandPerCountryData(reply, app){
                if($rootScope.selectedBrands.length){
                    if(!$rootScope.selectedCountries.length){
                        var totals = reply.qHyperCube.qDataPages[0].qMatrix; 
                        angular.forEach($rootScope.selectedBrands, function(brand, y){
                            
                            var YTDEMR = 0,
                                MSPerc = 0,
                                ProfVsPY = 0,
                                ProfVsPYpp = 0,
                                ProfVsTGT = 0,
                                ProfVsTGTpp = 0; 
                            angular.forEach(totals, function(total, i){
                                if('Region Europe' === total[0].qText){
                                    YTDEMR += total[8].qNum;
                                    MSPerc += total[9].qNum * 100 / $rootScope.selectedBrands.length;
                                    ProfVsPY += total[10].qNum * 100 / $rootScope.selectedBrands.length;
                                    ProfVsPYpp += total[11].qNum / $rootScope.selectedBrands.length;
                                    ProfVsTGT += total[12].qNum * 100 / $rootScope.selectedBrands.length;
                                    ProfVsTGTpp += total[13].qNum / $rootScope.selectedBrands.length;

                                    $scope.YTDEMR = YTDEMR;
                                    $scope.MSPerc = MSPerc;
                                    $scope.ProfVsPY = ProfVsPY;
                                    $scope.ProfVsPYpp = ProfVsPYpp;
                                    $scope.ProfVsTGT = ProfVsTGT;
                                    $scope.ProfVsTGTpp = ProfVsTGTpp;
                                }
                            })
                        })
                    }else{
                        $scope.YTDEMR = reply.qHyperCube.qGrandTotalRow[6].qNum;
                        $scope.MSPerc = reply.qHyperCube.qGrandTotalRow[7].qNum * 100;
                        $scope.ProfVsPY = reply.qHyperCube.qGrandTotalRow[8].qNum * 100;
                        $scope.ProfVsPYpp = reply.qHyperCube.qGrandTotalRow[9].qNum;
                        $scope.ProfVsTGT = reply.qHyperCube.qGrandTotalRow[10].qNum * 100;
                        $scope.ProfVsTGTpp = reply.qHyperCube.qGrandTotalRow[11].qNum;
                    }

                    $scope.ProfDate = reply.qHyperCube.qGrandTotalRow[12].qText;

                    var totals = reply.qHyperCube.qDataPages[0].qMatrix;
                    angular.forEach($scope.detailsTable.countries, function(country, y){
                        var dtpYTD = 0,
                            dtpMS = 0,
                            dtpvsPY = 0,
                            dtpvsTGT = 0;
                        angular.forEach(totals, function(total, i){
                            if(country.name === total[0].qText){
                                dtpYTD += total[8].qNum;
                                dtpMS += total[9].qNum * 100 / $rootScope.selectedBrands.length;
                                dtpvsPY += total[10].qNum * 100 / $rootScope.selectedBrands.length;
                                dtpvsTGT += total[12].qNum * 100 / $rootScope.selectedBrands.length;

                                $scope.detailsTable.countries[y].ProfYTD = dtpYTD;
                                $scope.detailsTable.countries[y].ProfMSPerc = dtpMS;
                                $scope.detailsTable.countries[y].ProfVsPY = dtpvsPY;
                                $scope.detailsTable.countries[y].ProfVsTGT = dtpvsTGT;
                            }
                        })
                    })
                }
            }
            //qvf.field('Company').selectMatch('NOVARTIS')

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
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
                
                 angular.forEach($scope.KPIs, function(kpi, i){
                    var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === kpi.label));
                                })[0];
                    if(filterColor){
                        setColor(filterColor[2].qText, kpi.id);
                        //console.log(filterColor[2].qText,kpi.id)
                    }
                 });
                
            }
            
            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 5
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "[Novartis Brand]"
                            ]
                        }
                    },
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
             },getKPIBrandCountryColor);

            function getKPIBrandCountryColor(reply, app){
                if($rootScope.selectedBrands.length && $rootScope.selectedCountries.length){
                  //  console.log(reply);
                    var colors = reply.qHyperCube.qDataPages[0].qMatrix;                
                     angular.forEach($scope.KPIs, function(kpi, i){
                         $rootScope.color[kpi.id] = "gray"
                        var filterColor = colors.filter(function(obj){ 
                                    return ((obj[2].qText === kpi.label) );
                                    })[0];
                        if(filterColor){
                            //console.log(filterColor[4].qText+":"+ kpi.id)
                            setColor(filterColor[4].qText, kpi.id);
                        }
                     });
                 }
            }

            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 5
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": [
                                "[Novartis Brand]"
                            ]
                        }
                    },
                   
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
             },getKPIBrandColor);

            function getKPIBrandColor(reply,app){
               if($rootScope.selectedBrands.length && !$rootScope.selectedCountries.length){
               // console.log(reply);
                     var colors = reply.qHyperCube.qDataPages[0].qMatrix;                
                     angular.forEach($scope.KPIs, function(kpi, i){
                         $rootScope.color[kpi.id] = "gray"
                        var filterColor = colors.filter(function(obj){ 
                                    return ((obj[1].qText === kpi.label) );
                                    })[0];
                        if(filterColor){
                            //console.log(filterColor[3].qText+":"+ kpi.id)
                            setColor(filterColor[3].qText, kpi.id);
                        }
                     });
                }
            }


            qvf.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 5
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
             },getKPICountryColor);

            function getKPICountryColor(reply,app){
                if(!$rootScope.selectedBrands.length && $rootScope.selectedCountries.length){
                   // console.log(reply);
                     var colors = reply.qHyperCube.qDataPages[0].qMatrix;                
                     angular.forEach($scope.KPIs, function(kpi, i){
                         $rootScope.color[kpi.id] = "gray"
                        var filterColor = colors.filter(function(obj){ 
                                    return ((obj[1].qText === kpi.label) );
                                    })[0];
                        if(filterColor){
                            //console.log(filterColor[3].qText+":"+ kpi.id)
                            setColor(filterColor[3].qText, kpi.id);
                        }
                     });
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

            $scope.goto = function(label,brand,country){

                if(country && country !== null){
            	    qvf.field('Country').selectMatch(country, false); 
                    $rootScope.selectedCountries.push(country);
                }
                if(brand && brand !== null){
            	    qvf.field('[Novartis Brand]').selectMatch(brand, false);
                    $rootScope.selectedBrands.push(brand);
                }
               
                if (label == "Launch Execution"){
                    $window.location.href = $rootScope.basepath + 'launch-execution';
                }else if (label == "Operational Execution"){
                     $window.location.href = $rootScope.basepath + 'operational-execution';
                }else if (label == "In-Market Performance"){
                     $window.location.href = $rootScope.basepath + 'in-market-performance';
                }else if (label == "Team Engagement"){
                     $window.location.href = $rootScope.basepath + 'team-engagement';
                }
            }

            $scope.resize= function(){
                setTimeout(function(){
                    qlik.resize();
                }, 500)
            }
 
        }

});