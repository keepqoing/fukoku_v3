var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	
	$scope.processes;
	$scope.machines;
	$scope.processMachines;
	$scope.id;
	$scope.action;
	$scope.dtTable;
	$scope.sorting = "asc";
	$scope.data = {
			"name" : "",
	};
	
	/***
	 * Function()
	 */
	/*angular.element(document).ready(function() {
		$scope.dtTable = $("#dtTable");
		$scope.dtTable.dataTable({
			'paging'      : false,
		     'lengthChange': false,
		     'info'        : false,
			 "language": {
				 
		            //"lengthMenu": "Display _MENU_ records per page",
		            "lengthMenu":"디스플레이 _MENU_ 페이지 당 기록",
		            
		            "zeroRecords": "아무것도 찾을 수 없음", // nothing found
		            
		            //"info": "Showing page _PAGE_ of _PAGES_",
		            "info" : "_PAGE_ 페이지 중 _PAGES_ 페이지 표시",
		            
		            //"search":         "Search:",
		            "search":         "검색:",
		            
		            "infoEmpty": "No records available",
		            "infoFiltered": "(filtered from _MAX_ total records)",
		            
		            "paginate": {
		                "first":      "먼저",
		                "last":       "마지막",
		                "next":       "다음 것",
		                "previous":   "너무 이른"
		            }
		        }
		});
	});
	*/
	
	$scope.findProcesses = function(){
		var data = {
				"name" : "",
		};
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/process/find",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processes = null;
            if(response.code == 200){
            	$scope.processes = response.data;
            }else{
            	$scope.message = response.message;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.findMachines = function(){
		var data = {
				"name" : "",
		};
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/machine/find",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.machines = null;
            if(response.code == 200){
            	$scope.machines = response.data;
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
            url: "/v3/api/fukoku/process-machine/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.processMachines = null;
            if(response.code == 200){
            	$scope.processMachines = response.data;
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
            url: "/v3/api/fukoku/process-machine/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtSeq").val(response.data.seq);
            	$("#txtNextSequence").val(response.data.next_sequence);
            	//$("#txtName").val(response.data.name);
            	$("#selectOptProcess").val(response.data.process.name.trim());
            	$("#selectOptMachine").val(response.data.machine.name.trim());
            	
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
	
	$scope.findAll($scope.data);
	
	
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
	
	$scope.btAdd = function(){
		$scope.action = "add";
		$('#frm').trigger("reset");
		$scope.findProcesses();
		$scope.findMachines();
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	
	
	$scope.btEdit = function(id){
		console.log(id);
		$scope.action = "update";
		$('#frm').trigger("reset"); 
		$scope.findProcesses();
		$scope.findMachines();
		setTimeout(() => {
			 $scope.findOne(id)
		}, 200);
		$("#btSave").hide();
		$("#btUpdate").show();
		$("#modalFrm").modal('show');
		
	}
	
	$scope.onSubmitFrm = function(){
		if($scope.action == "add"){
			$scope.save("POST");
		}else{
			$scope.save("PUT");
		}
		
	}
	
	$scope.btDelete = function(id){
		swal({  title: "ProcessMachine" ,   
			text: "Are you sure you want to deleted this process-machine?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/process-machine/"+id,
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

	
	$scope.btExport = function(){
		$http({
		    url: '/v3/api/fukoku/process-machine/download',
		    method: "GET",
		    headers: {
		       'Content-type': 'application/json'
		    },
		    responseType: 'arraybuffer'
		}).success(function (data, status, headers, config) {
			 var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
			 var objectUrl = URL.createObjectURL(blob);
			 window.open(objectUrl);
			 

		    
		}).error(function (data, status, headers, config) {
		    //upload failed
		});
	}
	
	$('#btImport').change(function() {
	    $.ajax({
    	    url: "/v3/api/fukoku/process-machine/import",
    	    type: "POST",
    	    data: new FormData($("#fileUploadForm")[0]),
    	    enctype: 'multipart/form-data',
    	    processData: false,
    	    contentType: false,
    	    cache: false,
    	    success: function () {
    	    	$scope.findAll($scope.data);
    	    	swal({position: 'top-end',type: 'success',title: 'Data has been imported.',showConfirmButton: false,timer: 1500})
    	    },
    	    error: function () {
    	    	swal({position: 'top-end',type: 'error',title: 'Data has been imported.',showConfirmButton: false,timer: 1500})
    	    }
    	});
	    
	});
	
	
$scope.btOrder = function(col){
		
		if($scope.sorting == "asc"){
			$scope.sorting = "desc";
		}else{
			$scope.sorting = "asc";
		}
		var orderBy = " order by "+ col +" "+$scope.sorting;
		$scope.data["order_by"] = orderBy;
		console.log($scope.data);
		$scope.findAll($scope.data);
	};
	
	$scope.btSearch = function(){
		$scope.data["name"] = $("#txtSearch").val();
		$scope.findAll($scope.data);
	}
	
	
});