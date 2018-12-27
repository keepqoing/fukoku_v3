var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	$scope.message;
	$scope.products;
	$scope.factories;
	$scope.id;
	$scope.action;
	$scope.dtTable = $("#dtTable");
	
	$scope.findAllProduct = function(){
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
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.findAll = function(){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/factory",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.factories = null;
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
        	$scope.products = null;
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#selectOpt").val(response.data.product.id);
            	$("#txtStartDate").val(response.data.start_date);
            	$("#txtEndDate").val(response.data.end_date);
            	$("#txtAddress").val(response.data.address);
            	$("#txtProductType").val(response.data.product_type);
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
				"ref_product_id" : $("#selectOpt").val(),
				"product_type" : $("#txtProductType").val(),
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
	
	angular.element(document).ready(function() {
		$scope.dtTable.dataTable();
	});
	
	$scope.btAdd = function(){
		$scope.action = "add";
		$('#frm').trigger("reset");
		$scope.findAllProduct();
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	$scope.btEdit = function(id){
		console.log(id);
		$('#frm').trigger("reset");
		$scope.action = "update";
		$scope.findAllProduct();
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
		$scope.findAll();
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
	            $scope.findAll();
	        });
	        post.error(function (data, status) {
	            console.log(data);
	        });
		
				
		});		
	}

	
	
	
	$scope.findAll();
	
	
});