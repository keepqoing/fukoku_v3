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
	
	/***
	 * Function()
	 */
	
	$scope.range = function(min, max, step){
	    step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) input.push(i);
	    return input;
	  };
	
	  $scope.findProcessVar = function(){
		    var data = {
					"name" : "",
			};
	        var post = $http({
	            method: "POST",
	            url: "/v3/api/fukoku/process-var/find",
	            dataType: 'json',
	            data : JSON.stringify(data),
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {
	        	$scope.processVars = null;
	            if(response.code == 200){
	            	$scope.processVars = response.data;
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
        	method: "POST",
            url: "/v3/api/fukoku/process-machine3/find",
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
            	$scope.findLineByFactoryId($scope.selectCtrl.selectedValue);
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
	
	$scope.findLineByFactoryId = function(id){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process-machine3/find/line/"+id,
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
//            console.log($scope.checkBoxLines);
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
            	$("#selectOptProduct").val($scope.processVar.ref_product_id);
            	$("#selectOptName").val($scope.processVar.ref_process_var_id);
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
	
	$scope.findProcessChainProducts = function(id){
	  	var data = {
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
	
	$scope.save = function(method){
		var data = {
				"id" : $scope.id,
				"ref_process_machine_id" : $scope.processMachineId ,
				"seq" : $("#txtSeq").val(),
				"ref_product_id" : $("#selectOptProduct").val(),
				"ref_process_var_id" : $("#selectOptName").val(),
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
            	console.log($scope.data);
            	$scope.findAll($scope.data);
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
	$scope.findFactories(); 
	$scope.findProcessVar();
	$scope.findAll();
	 
	 
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
	$scope.selectByFactory = function(){
		$scope.data["ref_factory_id"] = parseInt($scope.selectCtrl.selectedValue);
//		console.log($scope.data);
		$scope.findLineByFactoryId(parseInt($scope.selectCtrl.selectedValue))
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
	}
	
	
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
			setTimeout(function(){ $scope.findOne(productProcessVar);  }, 0);
			
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