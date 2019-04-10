var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.products;
	
	
	
	/***
	 * Function()
	 */

	
	$scope.findAll = function(){
        var post = $http({
        	method: "GET",
            url: "/v2/api/fukoku/defective-product-v2",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.products = null;
        	console.log(response);
            if(response.code == 200){
            	$scope.products = response.data;
            	
            	

//           	 $('#dtTable').DataTable( {
//           	        "pagingType": "full_numbers"
//           	 } );
//           	 
           	 
           	 
            }else{
            	$scope.message = response.message;
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
        
		
    }
	
	
	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	$scope.findAll();
	 
	
	
	
	
});