define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
    return function($scope, $rootScope, $routeParams, $window){
        var selectedAppID=''
        let qvf=''
        $scope.query="Type here"
        $scope.dropdownSelection='AppName'
        let vis=''
        $scope.data = {
            model: null,
            availableOptions: [
              {id: '1', name: 'DO MM'},
              {id: '2', name: 'UVP'},
              {id: '3', name: 'GDOLT'}
            ]
           };
      
         
        console.log($scope.query);
        $scope.searchFor=function(){
        console.log(`Changed Search: ${$scope.query}`)
        }

        $scope.queryBlank=function(){
            $scope.query=''
            console.log('focused')
        }

        $scope.getQlikObj= function(){
            console.log($scope.data.availableOptions[$scope.data.model-1].name)
            if ($scope.data.availableOptions[$scope.data.model-1].name==='UVP'){
                selectedAppID=objectsMap.apps.UVP.appName;
                selectedAppObj='UVP';
                 qvf = qlik.openApp(selectedAppID, config);
            } else if ($scope.data.availableOptions[$scope.data.model-1].name==='DO MM'){
                
                selectedAppID=objectsMap.apps.DOMM.appName;
                selectedAppObj='DOMM';
                 qvf = qlik.openApp(selectedAppID, config);
                console.log(`selectedAppID : ${selectedAppID}`)
            } else if ($scope.data.availableOptions[$scope.data.model-1].name==='GDOLT'){
                selectedAppID=objectsMap.apps.DOMM.appName;
                selectedAppObj='GDOLT';
                 qvf = qlik.openApp(selectedAppID, config);
                console.log(`selectedAppID : ${selectedAppID}`)
            }
    
            qvf.getObject('QV00','CurrentSelections'); 
        //    vis=qvf.getObject('QV01', objectsMap.apps[selectedAppObj].qvobjects[$scope.query]);
       qvf.visualization.get(objectsMap.apps[selectedAppObj].qvobjects[$scope.query]).then(function(vis){
            vis.show('QV01');
            // vis.toggleDataView().then(function(){
             
            //     this.getElementById('QV01')[0].focus();
              
            // })
          });
    }

    

        $scope.toggleQlikObj = function(){
            console.log('clicked toggle')

            qvf.visualization.get(objectsMap.apps[selectedAppObj].qvobjects[$scope.query]).then(function(vis){
               console.log(vis)
               vis.show('QV01');
                vis.toggleDataView().then(function(toggled){
                    vis.isToggled = toggled;
                    document.getElementById('QV01').parentElement.focus();
                })
              });

       }

       $scope.dataDownload=function(){
        qvf.visualization.get(objectsMap.apps[selectedAppObj].qvobjects[$scope.query]).then(function(vis){
            vis.exportData({format:'OOXML', state: 'A'}).then(function(link){
             
                window.open(link);
              
            })
          });
       }
       
    }
    
    
});