var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.message;
	$scope.products;
	$scope.id;
	$scope.action;
	$scope.dtTable;
	$scope.sorting = "asc";
	$scope.data = {
			"name" : "",
			"status":""
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
            url: "/v3/api/fukoku/product/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
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
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#txtType").val(response.data.type);
            	$("#txtStartDate").val(response.data.start_date);
            	$("#txtEndDate").val(response.data.end_date);
            	$("#txtCustomerName").val(response.data.customer_name);
            	$("#txtRemark").val(response.data.remark);
            	$("#txtAcronym").val(response.data.acronym);
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
				"acronym": $("#txtAcronym").val()
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
            	$scope.findAll($scope.data);
            	swal({position: 'top-end',type: 'success',title: '데이터가 저장되었습니다.',showConfirmButton: false,timer: 1500})
            }else{
            	$scope.message = response.message;
            	swal({position: 'top-end',type: 'error',title: '데이터가 저장되지 않았습니다.',showConfirmButton: false,timer: 1500})
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.delete = function(id){
		swal({  title: "제품관리" ,   
			text: "이 제품을 삭제 하시겠습니까?",   
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
	            	swal({position: 'top-end',type: 'success',title: '데이터가 삭제되었습니다.',showConfirmButton: false,timer: 1500})
	            }else{
	            	swal({position: 'top-end',type: 'error',title: '데이터가 삭제되었습니다.',showConfirmButton: false,timer: 1500})
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
		$scope.delete(id);
	}
	
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
		    url: '/v3/api/fukoku/product/download',
		    method: "POST",
		    data : JSON.stringify($scope.data),
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
    	    url: "/v3/api/fukoku/product/import",
    	    type: "POST",
    	    data: new FormData($("#fileUploadForm")[0]),
    	    enctype: 'multipart/form-data',
    	    processData: false,
    	    contentType: false,
    	    cache: false,
    	    success: function () {
    	    	$scope.findAll($scope.data);
    	    	swal({position: 'top-end',type: 'success',title: '데이터를 가져 왔습니다.',showConfirmButton: false,timer: 1500})
    	    },
    	    error: function () {
    	    	swal({position: 'top-end',type: 'error',title: '데이터를 가져 오지 않았습니다.',showConfirmButton: false,timer: 1500})
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