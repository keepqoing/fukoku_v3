var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	$scope.message;
	$scope.products;
	$scope.id;
	$scope.action;
	$scope.dtTable = $("#dtTable");
	
	$scope.findAll = function(){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/product",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.products = null;
            if(response.code == 200){
            	$scope.products = response.data;
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
            url: "/v3/api/fukoku/product/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.products = null;
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#txtType").val(response.data.type);
            	$("#txtStartDate").val(response.data.start_date);
            	$("#txtEndDate").val(response.data.end_date);
            	$("#txtCustomerName").val(response.data.customer_name);
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
				"name" : $("#txtName").val(),
				"type" : $("#txtType").val(),
				"start_date" : $("#startDate").find("input").val(),
				"end_date" : $("#endDate").find("input").val(),
				"customer_name" : $("#txtCustomerName").val(),
				"remark" : $("#txtRemark").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/product",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
            	$scope.findAll();
            	swal({position: 'top-end',type: 'success',title: 'Data has been saved',showConfirmButton: false,timer: 1500})
            }else{
            	$scope.message = response.message;
            	swal({position: 'top-end',type: 'error',title: 'Data has not been saved',showConfirmButton: false,timer: 1500})
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	angular.element(document).ready(function() {
		$scope.dtTable.dataTable();
	});
	
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
		$scope.findOne(id);
		$('#frm').trigger("reset");
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
		$("#modalFrm").modal('hide');
	}
	
	
	
	
	
	
	
	$scope.btDelete = function(id){
		swal({  title: " Category" ,   
			text: "Are you sure you want to deleted this product?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/product/"+id,
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
	            $scope.findAll();
	        });
	        post.error(function (data, status) {
	            console.log(data);
	        });
		
				
		});		
	}

	
	
	
	$scope.findAll();
	
	
});