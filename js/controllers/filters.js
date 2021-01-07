define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
        return function($scope, $rootScope){
            $rootScope.basepath = basepath;
            
            var qvf = qlik.openApp(appID, config);

            qvf.createList({
                "qFrequencyMode": "V",
                qDef: {  
                    qFieldDefs: ["[Novartis Brand]"] 
                 },
                "qExpressions": [],
                "qInitialDataFetch": [
                        {
                                "qHeight": 20,
                                "qWidth": 1
                        }
                ],
            },getBrandList);
            function getBrandList(reply, app){
                $rootScope.brands = []
                angular.forEach(reply.qListObject.qDataPages[0].qMatrix, function(value, key){
                    if(value[0].qText){
                        $rootScope.brands.push(value[0].qText)
                    }
                })
            }

            qvf.createList({
                "qFrequencyMode": "V",
                "qDef": {
                        "qFieldDefs": [
                                "Country"
                        ]
                },
                "qExpressions": [],
                "qInitialDataFetch": [
                        {
                                "qHeight": 20,
                                "qWidth": 1
                        }
                ],
                "qLibraryId": "sLrxhpA"
            },getCountyList);
            function getCountyList(reply, app){
                $rootScope.countries = []
                angular.forEach(reply.qListObject.qDataPages[0].qMatrix, function(value, key){
                    if(value[0].qText && value[0].qText !== 'Region Europe'){
                        $rootScope.countries.push(value[0].qText)
                    }
                })
            }

            qvf.createList({  
                qDef: {  
                    qFieldDefs: ["Country"] //set fieldname  
                },  
                qAutoSortByState: {  
                    qDisplayNumberOfRows: 1  
                },  
                qInitialDataFetch: [{  
                    qHeight : 100, //can set number of rows returned  
                    qWidth : 1  
                }]  
            }, getCountryFilters);
            function getCountryFilters(reply) {  
                $rootScope.selectedCountries = [];
                var rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix);  
                angular.forEach(rows, function(value){
                    if(value.qState === 'S'){
                        $rootScope.selectedCountries.push(value.qText)
                    }else{
                        $rootScope.selectedCountries = $rootScope.selectedCountries.filter(function(v, i, arr){
                            return v !== value.qText;
                        });
                    }
                })
            }  

            qvf.createList({  
                qDef: {  
                    qFieldDefs: ["[Novartis Brand]"] 
                },  
                qAutoSortByState: {  
                    qDisplayNumberOfRows: 1  
                },  
                qInitialDataFetch: [{  
                    qHeight : 100,
                    qWidth : 1  
                }]  
            }, getBrandFilters);
            function getBrandFilters(reply) {  
                $rootScope.selectedBrands = [];
                var rows = _.flatten(reply.qListObject.qDataPages[0].qMatrix);  
                angular.forEach(rows, function(value){
                    if(value.qState === 'S'){
                        $rootScope.selectedBrands.push(value.qText)
                    }else{
                        $rootScope.selectedBrands = $rootScope.selectedBrands.filter(function(v, i, arr){
                            return v !== value.qText;
                        });
                    }
                })
            } 

            $scope.toggleFilter = function(field, value){
                qvf.field(field).toggleSelect(value, false);
            }
        }
});