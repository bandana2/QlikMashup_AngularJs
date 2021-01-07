define(["angular","js/qlik", "scoreApp"], function (angular, qlik) {
 
        return function($scope, $rootScope){
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
        }

});