var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	$scope.processMachines;
	$scope.maxStage=0;
	$scope.id;
	$scope.processVars
	
	
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
		  	$scope.data = {
					"name" : "",
			};
	        var post = $http({
	            method: "POST",
	            url: "/v3/api/fukoku/process-var/find",
	            dataType: 'json',
	            data : JSON.stringify($scope.data),
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
		/*
        var post = $http({
        	method: "GET",
            url: "http://113.198.137.191:8080/v3/api/fukoku/process_model",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processMachines = null;
            if(response.code == 200){
            	$scope.processMachines = response.data;
            }else{
            	$scope.message = response.message;
            }
            console.log("pm",$scope.processMachines);
        });
        post.error(function (data, status) {
            console.log(data);
        });
        */
		
		$scope.processMachines = {
				  "code": 200,
				  "data": [
				    {
				      "ID": 3,
				      "SEQ": 1,
				      "NAME": "IB_1",
				      "REF_LINE": "IB",
				      "PROCESS_PRODUCT": [
				        {
				          "ID": 5,
				          "REF_PRODUCT": "R-ENG",
				          "REF_PROCESS_CHAIN_ID": 3,
				          "STATUS": "1"
				        }
				      ],
				      "PROCESS_CHAIN_ELEMENT": [
				        {
				          "ID": 12,
				          "STAGE": 1,
				          "NAME": "압입",
				          "REF_PROCESS_CHAIN_ID": 3,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 13,
				              "SEQ": 1,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "압입기_IB_01",
				              "REF_PROCESS_CHAIN_ELEMENT": 12,
				              "NEXT_SEQUENCE": "2",
				              "PRODUCT_PROCESS_VAR": [
				            	  {"NAME" : "TEST_1", "LSL":0,"USL":100},
				            	  {"NAME" : "TEST_2", "LSL":0,"USL":100},
				            	  {"NAME" : "TEST_3", "LSL":0,"USL":100},
				              ]
				            },
				            {
				              "ID": 14,
				              "SEQ": 2,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "압입기_IB_02",
				              "REF_PROCESS_CHAIN_ELEMENT": 12,
				              "NEXT_SEQUENCE": "3",
				              "PROCESS_VAR": [
				            	  {"NAME" : "TEST_1", "LSL":0,"USL":100},
				            	  {"NAME" : "TEST_2", "LSL":0,"USL":100},
				            	  {"NAME" : "TEST_3", "LSL":0,"USL":100},
				              ]
				            },
				            {
				              "ID": 15,
				              "SEQ": 3,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "압입기_IB_03",
				              "REF_PROCESS_CHAIN_ELEMENT": 12,
				              "NEXT_SEQUENCE": "4"
				            }
				          ]
				        },
				        {
				          "ID": 13,
				          "STAGE": 2,
				          "NAME": "바란스",
				          "REF_PROCESS_CHAIN_ID": 3,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 16,
				              "SEQ": 4,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "바란스기_IB",
				              "REF_PROCESS_CHAIN_ELEMENT": 13,
				              "NEXT_SEQUENCE": "5"
				            }
				          ]
				        },
				        {
				          "ID": 14,
				          "STAGE": 3,
				          "NAME": null,
				          "REF_PROCESS_CHAIN_ID": 3,
				          "PROCESS_MACHINE": null
				        },
				        {
				          "ID": 15,
				          "STAGE": 4,
				          "NAME": "도장",
				          "REF_PROCESS_CHAIN_ID": 3,
				          "PROCESS_MACHINE": null
				        },
				        {
				          "ID": 16,
				          "STAGE": 5,
				          "NAME": "0",
				          "REF_PROCESS_CHAIN_ID": 3,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 17,
				              "SEQ": 6,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "런아웃기_IB",
				              "REF_PROCESS_CHAIN_ELEMENT": 16,
				              "NEXT_SEQUENCE": ""
				            }
				          ]
				        }
				      ]
				    },
				    {
				      "ID": 4,
				      "SEQ": 1,
				      "NAME": "HC_1",
				      "REF_LINE": "HC",
				      "PROCESS_PRODUCT": [
				        {
				          "ID": 6,
				          "REF_PRODUCT": "DS7E",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "STATUS": "1"
				        },
				        {
				          "ID": 7,
				          "REF_PRODUCT": "CM5E",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "STATUS": "1"
				        },
				        {
				          "ID": 8,
				          "REF_PRODUCT": "TIGER SHARK",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "STATUS": "1"
				        }
				      ],
				      "PROCESS_CHAIN_ELEMENT": [
				        {
				          "ID": 17,
				          "STAGE": 1,
				          "NAME": "압입",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 18,
				              "SEQ": 1,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "압입기_HC_01",
				              "REF_PROCESS_CHAIN_ELEMENT": 17,
				              "NEXT_SEQUENCE": "2"
				            }
				          ]
				        },
				        {
				          "ID": 18,
				          "STAGE": 2,
				          "NAME": "바란스",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 19,
				              "SEQ": 2,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "바란스기_HC",
				              "REF_PROCESS_CHAIN_ELEMENT": 18,
				              "NEXT_SEQUENCE": "3"
				            }
				          ]
				        },
				        {
				          "ID": 19,
				          "STAGE": 3,
				          "NAME": "파카",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 20,
				              "SEQ": 3,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "파카기_HC",
				              "REF_PROCESS_CHAIN_ELEMENT": 19,
				              "NEXT_SEQUENCE": "4"
				            }
				          ]
				        },
				        {
				          "ID": 20,
				          "STAGE": 4,
				          "NAME": "도장",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 21,
				              "SEQ": 4,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "도장기_HC",
				              "REF_PROCESS_CHAIN_ELEMENT": 20,
				              "NEXT_SEQUENCE": "5"
				            }
				          ]
				        },
				        {
				          "ID": 21,
				          "STAGE": 5,
				          "NAME": "0",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 22,
				              "SEQ": 5,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "런아웃기_HC",
				              "REF_PROCESS_CHAIN_ELEMENT": 21,
				              "NEXT_SEQUENCE": "6",
				              "PROCESS_VAR": [
					            	  {"NAME" : "TEST_1", "LSL":0,"USL":100},
					            	  {"NAME" : "TEST_2", "LSL":0,"USL":100},
					            	  {"NAME" : "TEST_3", "LSL":0,"USL":100},
					          ]  
				            }
				          ]
				        },
				        {
				          "ID": 22,
				          "STAGE": 6,
				          "NAME": "T플레이트",
				          "REF_PROCESS_CHAIN_ID": 4,
				          "PROCESS_MACHINE": [
				            {
				              "ID": 23,
				              "SEQ": 6,
				              "REF_PROCESS": null,
				              "REF_MACHINE": "T플레이트_HC",
				              "REF_PROCESS_CHAIN_ELEMENT": 22,
				              "NEXT_SEQUENCE": ""
				            }
				          ]
				        }
				      ]
				    }
				  ]
				};
		
		console.log("pm",$scope.processMachines);
		
		
		
		angular.forEach($scope.processMachines.data, function(value, key) {
				console.log(value.PROCESS_CHAIN_ELEMENT.length);
				if( value.PROCESS_CHAIN_ELEMENT.length > $scope.maxStage){
					$scope.maxStage = value.PROCESS_CHAIN_ELEMENT.length;
				}
		});
		
		//
    }
	
	$scope.save = function(method){
		var data = {
				"id" : $scope.id,
				"seq" : $("#txtSeq").val(),
				"ref_process_id" : $("#selectOptProcess").val(),
				"ref_machine_id" : $("#selectOptMachine").val(),
				"next_sequence" : $("#txtNextSequence").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/process-machine",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
            	$scope.findAll("");
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
	 $scope.findProcessVar();
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
	 	$scope.btAdd = function(refProductId, refProcessMachineId, refProcessChainElementId){
			$scope.action = "add";
			$('#frm').trigger("reset");
			$('#txtRefProductId').val(refProductId);
			$('#txtRefProcessId').val(refProcessMachineId);
			$('#txtRefProcessChainElementId').val(refProcessChainElementId);
			
			$("#btUpdate").hide();
			$("#btSave").show();
			$("#modalFrm").modal('show');
		};
		
		
		 $scope.btUpdate = function(){
				$scope.action = "add";
				$('#frm').trigger("reset");
				$("#btSave").hide();
				$("#btUpdate").show();
				$("#modalFrm").modal('show');
			};
	
	
	
});