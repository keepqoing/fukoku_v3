var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.message;
	$scope.databaseInfor;
	$scope.id;
	$scope.action;
	$scope.sorting = "asc";
	$scope.data = {
			"db_name" : "",
	};
	
	/***
	 * Function()
	 */
	
	$scope.findAll = function(){
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/database-infor/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.databaseInfor = null;
            if(response.code == 200){
            	$scope.databaseInfor = response.data;
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
            url: "/v3/api/fukoku/database-infor/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtDatabaseName").val(response.data.db_name);
            	$("#txtIpAddress").val(response.data.db_ip_address);
            	$("#txtPort").val(response.data.db_port_no);
            	$("#txtUsername").val(response.data.db_user_name);
            	$("#txtPassword").val(response.data.db_user_password);
            	$("#selectOptType").val(response.data.db_type);
            	$("#txtRemark").val(response.data.remark);
            	$("#txtSeq").val(response.data.seq);
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
				"db_name" : $("#txtDatabaseName").val(),
				"db_ip_address" : $("#txtIpAddress").val(),
				"db_port_no" : $("#txtPort").val(),
				"db_user_name" : $("#txtUsername").val(),
				"db_user_password" : $("#txtPassword").val(),
				"db_type" : $("#selectOptType").val(),
				"remark" : $("#txtRemark").val()
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/database-infor",
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
		
		swal({  title: "Line" ,   
			text: "Are you sure you want to deleted this Line?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/database-infor/"+id,
	            dataType: 'json',
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {
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
	}
	
	$scope.btSearch = function(){
		$scope.data["db_name"] = $("#txtSearch").val();
		$scope.findAll($scope.data);
	}
	
	$scope.btSearchActive = function(){
		// alert($scope.status);
		$scope.data["db_name"] = $("#txtSearch").val();
		$scope.data["status"] = $scope.status;
		$scope.findAll($scope.data);
	}

	
	$scope.btExport = function(){
		$http({
		    url: '/v3/api/fukoku/database-infor/download',
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
    	    url: "/v3/api/fukoku/database-infor/import",
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

	function dynamicSort(property) {
	    var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}
	    
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