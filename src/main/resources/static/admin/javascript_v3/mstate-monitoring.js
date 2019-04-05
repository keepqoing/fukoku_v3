var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.processes;
	$scope.lines;
	
	/***
	 * Function()
	 */
	
	
	$scope.findRealTime = function(){
        var post = $http({
        	method: "GET",
            url: "/v3/api/fukoku/mstate-monitoring/real-time",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	console.log("findRealTime",response);
        	$scope.lines = response.lines;
        	$scope.processes = response.processes;
        });
        post.error(function (data, status) {
            console.log(data);
        });
        
		
    }
	
	
	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	$scope.findRealTime();
	 
//	setInterval(function(){
//		$scope.findAll();
//	}, 1000);
	
	
	
	
	
	
	
});