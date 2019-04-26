var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	$scope.processMachines;
	$scope.maxStage=0;
	$scope.id;
	$scope.processChainProducts;
	$scope.processMachineId;
	
	$scope.productSize = [];
	$scope.processVar;
	
	
	/***
	 * Function()
	 */
	
	$scope.range = function(min, max, step){
	    step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) input.push(i);
	    return input;
	  };
	  
	  
	  $scope.findProcessChainProducts = function(id){
		  	$scope.data = {
					"name" : "",
			};
	        var post = $http({
	            method: "GET",
	            url: "/v3/api/fukoku/process-chain-product/"+id,
	            dataType: 'json',
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {
	        	$scope.processChainProducts = null;
	            if(response.code == 200){
	            	$scope.processChainProducts = response.data;
	            	console.log($scope.processChainProducts);
	            }else{
	            	$scope.message = response.message;
	            }
	        });
	        post.error(function (data, status) {
	            console.log(data);
	        });
	    }
	  
	  
	$scope.findAll = function(){
		
        var post = $http({
        	method: "GET",
            url: "/v3/api/fukoku/process_model",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processMachines = null;
            if(response.code == 200){
            	$scope.processMachines = response;
            	console.log($scope.processMachines);
            	
            	index = 0;
            	angular.forEach($scope.processMachines.data, function(value, key) {
    				
            		console.log(value.PROCESS_CHAIN_ELEMENT.length);
    				if( value.PROCESS_CHAIN_ELEMENT.length > $scope.maxStage){
    					$scope.maxStage = value.PROCESS_CHAIN_ELEMENT.length;
    				}
    				
    				$scope.productSize.push(value.PROCESS_PRODUCT.length);
    				//alert($scope.productSize);
    				index++;
            	});
            	
            }else{
            	$scope.message = response.message;
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
        
		
    }
	
	
	$scope.findOne = function(id){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/product-process-var/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.processVar = response.data;
            	console.log("1",$scope.processVar);
            	$scope.id = $scope.processVar.id;
            	$("#selectOptProduct").val($scope.processVar.ref_prouduct_id);
            	$scope.processMachineId = $scope.processVar.ref_process_machine_id;
            	$("#txtSeq").val($scope.processVar.seq);
            	$("#txtName").val($scope.processVar.name);
            	$("#selectType").val($scope.processVar.type);
            	$("#txtLsl").val($scope.processVar.lsl);
            	$("#txtUsl").val($scope.processVar.usl);
            	$("#txtUnitKind").val($scope.processVar.unit_kind);
            	$("#txtTransformValue").val($scope.processVar.transform_value);
            	$("#txtRemark").val($scope.processVar.remark);
            }else{
            	$scope.message = response.message;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.save = function(method){
		var data = {
				"id" : $scope.id,
				"ref_process_machine_id" : $scope.processMachineId ,
				"seq" : $("#txtSeq").val(),
				"ref_prouduct_id" : $("#selectOptProduct").val(),
				"name" : $("#txtName").val(),
				"type" : $("#selectType").val(),
				"lsl" : $("#txtLsl").val(),
				"usl" : $("#txtUsl").val(),
				"unit_kind" : $("#txtUnitKind").val(),
				"transform_value" : $("#txtTransformValue").val(),
				"remark" : $("#txtRemark").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/product-process-var",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
            	$scope.findAll();
            	$("#modalFrm").modal('hide');
            	swal({position: 'top-end',type: 'success',title: 'Data has been saved',showConfirmButton: false,timer: 1500})
            }else{
            	$scope.message = response.message;
            	swal({position: 'top-end',type: 'error',title: 'Data has not been saved',showConfirmButton: false,timer: 1500})
            }
        });
        post.error(function (data, status) {
            console.log(data);
            swal({position: 'top-end',type: 'error',title: 'Data has not been saved',showConfirmButton: false,timer: 1500})
        });
    }
	
	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	 $scope.findAll();
	 
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
	 	$scope.btAdd = function(refProcessChainElementId, processMachineId){ 
			$scope.action = "add";
			$('#frm').trigger("reset");
			$scope.processMachineId = processMachineId;
			$scope.findProcessChainProducts(refProcessChainElementId); 
			$("#btUpdate").hide();
			$("#btSave").show();
			$("#modalFrm").modal('show');
		};
		
		
		 $scope.btUpdate = function(refProcessChainElementId, processMachineId,productProcessVar){
				$scope.action = "update";
				$('#frm').trigger("reset");
				$scope.processMachineId = processMachineId;
				$scope.findProcessChainProducts(refProcessChainElementId); 
				$scope.findOne(productProcessVar);
				$("#btSave").hide();
				$("#btUpdate").show();
				$("#modalFrm").modal('show');
				
			};
	
			$scope.onSubmitFrm = function(){
				if($scope.action == "add"){
					$scope.save("POST");
				}else{
					$scope.save("PUT");
				}
			}
			
			
			$scope.delete = function(id){
				
				swal({  title: "Line" ,   
					text: "Are you sure you want to deleted this process var?",   
					type: "info",  
					showCancelButton: true,   
					closeOnConfirm: false,   
					showLoaderOnConfirm: true, 
				}, function(){   
					var post = $http({
			            method: "DELETE",
			            url: "/v3/api/fukoku/product-process-var/"+id,
			            dataType: 'json',
			            headers: { "Content-Type": "application/json" }
			        });
			        post.success(function (response, status) {
			        	$scope.products = null;
			            if(response.code == 200){
			            	swal({position: 'top-end',type: 'success',title: 'Data has been deleted',showConfirmButton: false,timer: 1500})
			            }else{
			            	swal({position: 'top-end',type: 'error',title: 'Data has been deleted',showConfirmButton: false,timer: 1500})
			            }
			            $scope.findAll($scope.data);
			        });
			        post.error(function (data, status) {
			            console.log(data);
			        });
				
						
				});	
				
				
			}
	
});