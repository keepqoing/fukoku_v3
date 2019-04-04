var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.processMachines;
	$scope.factories;
	$scope.checkBoxLines;
	$scope.data = {
			"name" : "",
			"status" : "3",
			"ref_factory_id":0,
			"name_in" : "",
	};
	
	$scope.selectCtrl = this;
	$scope.selectCtrl.selectedValue = "2";
	
	$scope.statusLineCheckOpt= this;
	$scope.statusLineCheckOpt.selected="0";
	$scope.countStage=0;
	
	
	$scope.id;
	$scope.processMachineId;
	
	$scope.processVars;
	
	$scope.usl;
	$scope.lsl;
	
	$scope.status="3";
	
	$scope.statusLineProductCheckOpt= this;
	$scope.statusLineProductCheckOpt.selected="0";
	
	$scope.dataOneLine;
	
	/***
	 * Function()
	 */
	
	$scope.range = function(min, max, step){
	    step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) input.push(i);
	    return input;
	  };
	
	 
	
	$scope.findAll = function(){
        var post = $http({
        	method: "POST",
            url: "/v3/api/fukoku/mstate-monitoring/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processMachines = null;
        	console.log(response);
            if(response.code == 200){
            	$scope.processMachines = response;
            	$scope.countStage = $scope.processMachines.count_stage;
            }else{
            	$scope.message = response.message;
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
        
		
    }
	
	
	$scope.findAllByLineNameAndProductStatus = function(){
        var post = $http({
        	method: "POST",
            url: "/v3/api/fukoku/process-machine3/find-line-name-product-status",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processMachines = null;
        	//console.log(response);
            if(response.code == 200){
            	$scope.processMachines = response;
            }else{
            	$scope.message = response.message;
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
        
		
    }
	
	$scope.findFactories = function(){
		var data = {
				"name" : "",
				"status" : "",
		};
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/factory/find",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
//        console.log($scope.data);
        post.success(function (response, status) {
        	$scope.factories = null;
        	$scope.checkBoxLines = null;
            if(response.code == 200){
            	$scope.factories = response.data;
            	$scope.findLineByFactoryId($scope.selectCtrl.selectedValue,$scope.status);
            }else{
            	$scope.message = response.message;
            }
            //console.log($scope.factories);
//            console.log($scope.checkBoxLines);
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.findLineByFactoryId = function(id, status){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process-machine3/find/line/"+id+"/"+status,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
//        console.log($scope.data);
        post.success(function (response, status) {
        	$scope.checkBoxLines = null;
            if(response.code == 200){
            	$scope.checkBoxLines = response.data;
            }else{
            	$scope.message = response.message;
            }
            ///console.log("$scope.checkBoxLines ",$scope.checkBoxLines);
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	
	
	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	$scope.findFactories(); 
	$scope.findAll();
	 
	setInterval(function(){
		$scope.findAll();
	}, 1000);
	
	
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
	
	$scope.selectByProductStatus = function(statusLineProductCheckOpt){
		//alert( statusLineProductCheckOpt);
		$scope.data["product_status"] = statusLineProductCheckOpt;
		$scope.findAllByLineNameAndProductStatus($scope.data);
	}
	
	$scope.selectByFactory = function(){
		$scope.data["ref_factory_id"] = parseInt($scope.selectCtrl.selectedValue);
//		console.log($scope.data);
		$scope.findLineByFactoryId(parseInt($scope.selectCtrl.selectedValue) , $scope.status)
//		$scope.data["name"] = "";
//		$scope.data["status"] = "3";
//		$scope.data["ref_factory_id"] = "0";
		$scope.data["name_in"] = "";
		$scope.findAll($scope.data);
	}
	
	$scope.lineCheck = function(){
		var lines="";
        $.each($("input[name='ckLines']:checked"), function(){    
        	lines +=  "'"+ $(this).val() +"',";
        	//console.log($(this).val());
        });
		//console.log("ckLine", lines.substring(0, lines.length-1) );
		$scope.data["name_in"] = lines.substring(0, lines.length-1);
		$scope.findAll($scope.data);
	}
	
	$scope.changeStatusLineCheckOpt = function(status){
		$scope.data["status"] = status;
		$scope.findAll($scope.data);
		
		$scope.findLineByFactoryId(parseInt($scope.selectCtrl.selectedValue) , status)
		
	}
	
	
	$scope.changeStatusProductLineCheckOpt = function(line, statusLineProductCheckOpt){
		alert(line + " " + statusLineProductCheckOpt);
	}
	
	
	
	
	
	
});