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
        	console.log(response);
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
            console.log("$scope.checkBoxLines ",$scope.checkBoxLines);
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
            	$("#txtProductId").val($scope.processVar.ref_product_id);
            	$("#selectOptName").val($scope.processVar.ref_process_var_id);
            	$scope.processMachineId = $scope.processVar.ref_process_machine_id;
            	$("#txtSeq").val($scope.processVar.seq);
            	$("#txtName").val($scope.processVar.name);
            	$("#selectType").val($scope.processVar.type);
            	
            	$("#txtUnitKind").val($scope.processVar.unit_kind);
            	$("#txtTransformValue").val($scope.processVar.transform_value);
            	$("#txtRemark").val($scope.processVar.remark);
            	$("#txtUslPlc").val($scope.processVar.usl_plc);
            	$("#txtLslPlc").val($scope.processVar.lsl_plc);
            	
            	$("#txtLsl").val($scope.processVar.lsl);
            	$("#txtUsl").val($scope.processVar.usl);
            	$("#selectSign").val($scope.processVar.sign);
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
	
	
	$scope.calculateLslUsl = function() {
		$scope.lsl=0;
		$scope.usl=0;
		var lslPlc = $("#txtLslPlc").val() ;
		var uslPlc = $("#txtUslPlc").val() ;
		var sign = $("#selectSign").val() ;
		var tranformValue = $("#txtTransformValue").val();
		console.log(sign);
		if( $.isNumeric($("#txtUslPlc").val()) && $.isNumeric($("#txtLslPlc").val()) && $.isNumeric($("#txtTransformValue").val()) ){
			if(sign == '+'){
				$scope.lsl = parseFloat(lslPlc) +  parseFloat(tranformValue);
				$scope.usl = parseFloat(uslPlc) +  parseFloat(tranformValue);
			}
			else if(sign == '-'){
				$scope.lsl = parseFloat(lslPlc) -  parseFloat(tranformValue);
				$scope.usl = parseFloat(uslPlc) -  parseFloat(tranformValue);
			}
			else if(sign == '*'){
				$scope.lsl = parseFloat(lslPlc) *  parseFloat(tranformValue);
				$scope.usl = parseFloat(uslPlc) *  parseFloat(tranformValue);
			}
			else if(sign == "/"){
				$scope.lsl = parseFloat(lslPlc) /  parseFloat(tranformValue);
				$scope.usl = parseFloat(uslPlc) /  parseFloat(tranformValue);
			}
			
		}
		
		$("#txtLsl").val($scope.lsl );
		$("#txtUsl").val($scope.usl);
		console.log( $scope.lsl + " ~ "+ $scope.usl);
	}
	
	
	$scope.save = function(method){
		var data = {
				"id" : $scope.id,
				"ref_process_machine_id" : $scope.processMachineId ,
				"seq" : $("#txtSeq").val(),
				"ref_product_id" : $("#txtProductId").val(),
				"ref_process_var_id" : $("#selectOptName").val(),
				"type" : $("#selectType").val(),
				"usl_plc" : $("#txtUslPlc").val(),
				"lsl_plc" : $("#txtLslPlc").val(),
				"unit_kind" : $("#txtUnitKind").val(),
				"transform_value" : $("#txtTransformValue").val(),
				"remark" : $("#txtRemark").val(),
				"lsl" : $scope.lsl,
				"usl" : $scope.usl,
				"sign" : $("#selectSign").val()
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
	
	
	$scope.btAdd = function(refProcessChainElementId, processMachineId, productId, productName){ 
		$scope.action = "add";
		$('#frm').trigger("reset");
		$scope.processMachineId = processMachineId;
		$scope.findProcessChainProducts(refProcessChainElementId); 
		//alert(productId + " "+productName );
		$("#txtProduct").val(productName);
		$("#txtProductId").val(productId);
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	
	 $scope.btUpdate = function(refProcessChainElementId, processMachineId,productProcessVar,productId, productName){
			$scope.action = "update";
			$('#frm').trigger("reset");
			$scope.processMachineId = processMachineId;
			$scope.findProcessChainProducts(refProcessChainElementId);
			setTimeout(function(){ $scope.findOne(productProcessVar);  }, 0);
			$("#txtProduct").val(productName);
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
	
	
		/*****
		 * 
		 */
		
		
		$(document).on('click',"#btAddSensor" , function(){
			$('#frm').trigger("reset");
			$("#modalFrm").modal('show');
			$("#txtRefLine").val($(this).data("line"));
			
			$("#btSave").show();
			$("#btUpdate").hide();
		});
		
		$(document).on('click',".btClickUpdateSensor" , function(){
			$('#frm').trigger("reset");
			$("#modalFrm").modal('show');
			$("#txtRefLine").val($(this).data("line"));
			
			findOne($(this).data("line"));
			
			$("#btSave").hide();
			$("#btUpdate").show();
		});
		
		$(document).on('click',".btClickDeleteSensor" , function(){
			deleteOne($(this).data("line"));
		});
		
		
		$(document).on('click',"#btSave" , function(){
			params = {
				"id" : $("#txtSensorId").val(),
				"sensorName" : $("#txtName").val(),
				"temperature" : $("#txtTemperature").val() ,
				"humidity" : $("#txtHumidity").val(),
				"refLine" : $("#txtRefLine").val(),
				"endTime" : "",
				"startTime" : ""
			};
			console.log(params);
			add(params);
			$("#modalFrm").modal('hide');
		});
		
		$(document).on('click',"#btUpdate" , function(){
			params = {
				"id" : $("#txtSensorId").val(),
				"sensorName" : $("#txtName").val(),
				"temperature" : $("#txtTemperature").val() ,
				"humidity" : $("#txtHumidity").val(),
				"refLine" : $("#txtRefLine").val()
			};
			console.log(params);
			update(params);
			$("#modalFrm").modal('hide');
		});
		
		
		
		
		/***** Function *****/

		add = function(data){
			$.ajax({ 
			    url:  "/v3/api/fukoku/sensor",
			    type: "POST",
			    dataType: 'json',
	            data: JSON.stringify(data),
			    beforeSend: function(xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
			    },
			    success: function(data) { 
					console.log(data);
					if(data.code == 200){
						swal({position: 'top-end',type: 'success',title: '데이터가 저장되었습니다.',showConfirmButton: false,timer: 1500})
					}else{
						swal({position: 'top-end',type: 'error',title: '데이터가 저장되지 않았습니다.',showConfirmButton: false,timer: 1500})
					}
					$scope.findAll();
			    },
                error:function(jqXHR, status, thrownError) {
                    var responseText = jQuery.parseJSON(jqXHR.responseText);
                    console.log(responseText);
                }
			});
	
       };
       
       update = function(data){
			$.ajax({ 
			    url:  "/v3/api/fukoku/sensor",
			    type: "PUT",
			    dataType: 'json',
	            data: JSON.stringify(data),
			    beforeSend: function(xhr) {
                   xhr.setRequestHeader("Accept", "application/json");
                   xhr.setRequestHeader("Content-Type", "application/json");
			    },
			    success: function(data) { 
					console.log(data);
					if(data.code == 200){
						swal({position: 'top-end',type: 'success',title: '데이터가 저장되었습니다.',showConfirmButton: false,timer: 1500})
						$scope.findAll();
					}else{
						swal({position: 'top-end',type: 'error',title: '데이터가 저장되지 않았습니다.',showConfirmButton: false,timer: 1500})
					}
			    },
               error:function(jqXHR, status, thrownError) {
                   var responseText = jQuery.parseJSON(jqXHR.responseText);
                   console.log(responseText);
               }
			});
	
      };
      
      deleteOne = function(id){
    	  swal({  title: "Sensor" ,   
  			text: "Sensor 삭제 하시겠습니까??",   
  			type: "info",  
  			showCancelButton: true,   
  			closeOnConfirm: false,   
  			showLoaderOnConfirm: true, 
  		}, function(){   
  			
  			$.ajax({ 
			    url:  "/v3/api/fukoku/sensor/"+id,
			    type: "DELETE",
			    dataType: 'json',
			    beforeSend: function(xhr) {
                 xhr.setRequestHeader("Accept", "application/json");
                 xhr.setRequestHeader("Content-Type", "application/json");
			    },
			    success: function(data) { 
					console.log(data);
					if(data.code == 200){
						swal({position: 'top-end',type: 'success',title: '데이터가 삭제되었습니다.',showConfirmButton: false,timer: 1500})
						$scope.findAll();
					}else{
						swal({position: 'top-end',type: 'error',title: '데이터가 삭제되지 않았습니다.',showConfirmButton: false,timer: 1500})
					}
			    },
             error:function(jqXHR, status, thrownError) {
                 var responseText = jQuery.parseJSON(jqXHR.responseText);
                 console.log(responseText);
             }
			});
  		
  				
  		});	
			
	
    };
       
       findOne = function(id){
			$.ajax({ 
			    url:  "/v3/api/fukoku/sensor/"+id,
			    type: "GET",
			    dataType: 'json',
			    beforeSend: function(xhr) {
                   xhr.setRequestHeader("Accept", "application/json");
                   xhr.setRequestHeader("Content-Type", "application/json");
			    },
			    success: function(data) { 
					console.log(data);
					$("#txtSensorId").val(data.data.id);
					$("#txtName").val(data.data.sensorName);
					$("#txtTemperature").val(data.data.id);
					$("#txtHumidity").val(data.data.humidity);
					$("#txtRefLine").val(data.data.refLine);
			    },
               error:function(jqXHR, status, thrownError) {
                   var responseText = jQuery.parseJSON(jqXHR.responseText);
                   console.log(responseText);
               }
			});
	
      };
	
	
});