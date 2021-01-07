define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
        return function($scope, $rootScope, $routeParams, $window){
            var qvf = qlik.openApp(appID, config);

            if($rootScope.selectedBrands == undefined){
                $window.history.back()
            }

             $scope.goBack = function(){
            	$window.history.back()
            }

            var generateObjects = function(){
                $scope.error = null;
                $scope.groups = [];
                if(!$rootScope.hasOwnProperty('selectedBrands')){$rootScope.selectedBrands = []}
                if(!$rootScope.hasOwnProperty('selectedCountries')){$rootScope.selectedCountries = []}
                
                if($rootScope.objPerBrand){
                    // Check if specific object per selected brand exists
                    if($rootScope.selectedBrands.length && $rootScope.objPerBrand.hasOwnProperty($rootScope.selectedBrands[0])){
                        $scope.objects = $rootScope.objPerBrand[$rootScope.selectedBrands[0]];
                    }else{
                        // Check if not brand is selected, if there's a generic object display that, else show error
                        
                        if(!$rootScope.selectedBrands.length){
                            if(Object.keys($rootScope.objects).length){
                                 if($rootScope.kpiId === 'DynamicMarket'){
                                     $scope.objects = [];
                                    $scope.error = "Please select a brand"
                                }else{
                                   // console.log($rootScope)
                                    $scope.objects = $rootScope.objects;
                                }
                            }else{ 
                                $scope.objects = [];
                                $scope.error = 'Please select a brand';
                                if($rootScope.kpiId === 'MarketExpansion'){
                                    $scope.error = "Please select one of the COSENTYX Brands"
                                }
                            }
                        }else{
                            if(Object.keys($rootScope.objects).length){
                                $scope.objects = $rootScope.objects;
                            }else{ 
                                $scope.objects = [];
                                $scope.error = 'Selection generated no data';
                                if($rootScope.kpiId === 'MarketExpansion'){
                                    $scope.error = "Please select one of the COSENTYX Brands"
                                }
                            }
                         }
                    }
                }else{
                    $scope.objects = $rootScope.objects;

                    //Create errors per kpiId
                    if(objectsMap.conditions.hasOwnProperty($rootScope.kpiId)){
                        var conditions = objectsMap.conditions[$rootScope.kpiId];
                        // Brand Conditions 
                        if(conditions.brand && conditions.brand !== 'none'){
                            if(!$rootScope.selectedBrands.length){
                                $scope.error = "Please select a brand";
                                $scope.objects = [];
                            }
                        }

                        // Country Conditions 
                        if(conditions.country){
                            if(!$rootScope.selectedCountries.length){
                                $scope.error = "Please select a country";
                                $scope.objects = [];
                            }
                        }

                        // Brand && Country Conditions
                        if(conditions.brand && conditions.country){
                            if(!$rootScope.selectedCountries.length && !$rootScope.selectedBrands.length){
                                $scope.error = "Please select a brand and a country";
                                $scope.objects = [];
                            }
                        }

                        // Brand OR Country Conditions 
                        if(conditions.brandORcountry){
                            if(!$rootScope.selectedCountries.length && !$rootScope.selectedBrands.length){
                                $scope.error = "Please select a brand or a country";
                                $scope.objects = [];
                            }
                        }

                        // NO Brand Conditions 
                        if(conditions.brand === 'none'){
                            if($rootScope.selectedBrands.length){
                                $scope.error = "Data is not available at a brand level, please deselect brands";
                                $scope.objects = [];
                            }
                        }
                    }
                }
     
                // Check if more then one brand is selected, only one allowed
                if($rootScope.selectedBrands.length > 1){
                    $scope.error = 'Only one brand at the time is allowed here! Please adjust your selection';
                    $scope.objects = [];
                }

                var objIndex = 0;
                
                angular.forEach($scope.objects, function(object, index){
                    if(object.hasOwnProperty('id')){
                        qvf.getObject('object-wrapper-' + objIndex, object.id)
                    }else{
                        if($rootScope.selectedBrands.length && object.hasOwnProperty($rootScope.selectedBrands[0])){
                            var sobjIndex = 0;
                            $scope.subobjects = object;
                            angular.forEach(object, function(subobject, x){
                                qvf.getObject('subobject-wrapper-' + objIndex + '-' + sobjIndex, subobject.id);
                                sobjIndex++
                            })
                        }else{
                            delete $scope.objects[index]
                        }
                    }

                    if(object.hasOwnProperty('group') && $scope.groups.indexOf(object.group) === -1){
                        $scope.groups.push(object.group);
                     /*   if(!$scope.activeGroup){
                            $scope.activeGroup = $scope.groups[0]
                        }
                        console.log($scope.activeGroup)*/
                    }

                    if(object.hasOwnProperty('type')){
                        $scope.objects[index].type = object.type;
                      //  console.log($scope.objects[index])
                    }
                    objIndex++
                })
            };
            generateObjects();

            $scope.resize = function(){
                 qlik.resize();             
            }

            $scope.selectGroup = function(group){
               $scope.activeGroup = group;                     
                 qlik.resize();
                              
            }
            $rootScope.$watch('selectedBrands', function (newValue, oldValue, scope) {
                generateObjects();
                $rootScope.getScoreColor($rootScope.sectionId, $rootScope.kpiId)

            });
            $rootScope.$watch('selectedCountries', function (newValue, oldValue, scope) {
                generateObjects();
                $rootScope.getScoreColor($rootScope.sectionId, $rootScope.kpiId)
            })

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
                       
                            $rootScope.color['S_KPI_' + $rootScope.sectionId + '_' + $rootScope.kpiId] = "gray";
                            var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === $rootScope.selectedCountries[0]) && (obj[1].qText === $rootScope.kpiName));
                                })[0];
                            if(filterColor){
                                 setColor(filterColor[3].qText,'S_KPI_' + $rootScope.sectionId + '_' +$rootScope.kpiId);
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
                //console.log(reply);
                var colors = reply.qHyperCube.qDataPages[0].qMatrix; 
                    $rootScope.color['S_KPI_' + $rootScope.sectionId + '_' + $rootScope.kpiId]  = "gray";
                               var filterColor = colors.filter(function(obj){ 
                                return ((obj[0].qText === $rootScope.selectedBrands[0]) && (obj[1].qText ===$rootScope.kpiName));
                                })[0];
                            if(filterColor){
                                 setColor(filterColor[3].qText,'S_KPI_' + $rootScope.sectionId + '_' +$rootScope.kpiId);
                            }
            }  
            





              function setColor(colorCase, KPIKey){
              // console.log(colorCase + ":"+ KPIKey)
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