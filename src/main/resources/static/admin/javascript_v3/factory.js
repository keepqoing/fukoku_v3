var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.message;
	$scope.factories;
	$scope.id;
	$scope.action;
	$scope.dtTable;
	$scope.sorting = "asc";
	$scope.data = {
			"name" : "",
			"status" : "",
	};
	$scope.status="All";
	
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
	});*/
	
	
	$scope.findAll = function(){
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/factory/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        console.log($scope.data);
        post.success(function (response, status) {
        	$scope.factories = null;
        	//console.log(response);
            if(response.code == 200){
            	$scope.factories = response.data;
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
            url: "/v3/api/fukoku/factory/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#txtStartDate").val(response.data.start_date);
            	$("#txtEndDate").val(response.data.end_date);
            	$("#txtAddress").val(response.data.address);
            	$("#txtSeq").val(response.data.seq);
            	$("#txtRemark").val(response.data.remark);
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
				"name" : $("#txtName").val(),
				"start_date" : $("#startDate").find("input").val(),
				"end_date" : $("#endDate").find("input").val(),
				"address" : $("#txtAddress").val(),
				"remark" : $("#txtRemark").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/factory",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
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
	
	$scope.delete = function(id){
		swal({  title: "Factory" ,   
			text: "Are you sure you want to deleted this factory?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/factory/"+id,
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
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	$scope.btEdit = function(id){
		console.log(id);
		$scope.action = "update";
		$('#frm').trigger("reset");
		$scope.findOne(id);
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
		$scope.delete(id);
	};
	
	$scope.btSearch = function(){
		$scope.data["name"] = $("#txtSearch").val();
		$scope.findAll($scope.data);
	}
	
	$scope.btSearchActive = function(){
		// alert($scope.status);
		$scope.data["name"] = $("#txtSearch").val();
		$scope.data["status"] = $scope.status;
		$scope.findAll($scope.data);
	}
	

	
	$scope.btExport = function(){
		$http({
		    url: '/v3/api/fukoku/factory/download',
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
    	    url: "/v3/api/fukoku/factory/import",
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
	
	
	
	
	

	
	
	
	
	
	
});