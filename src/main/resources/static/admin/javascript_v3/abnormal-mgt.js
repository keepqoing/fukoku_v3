var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	
	$scope.message;
	$scope.abnormal;
    $scope.lines;
    $scope.factories;
    $scope.departments;
	$scope.id;
	$scope.action;
	$scope.dtTable;
	$scope.sorting = "asc";
	$scope.data = {
			"name" : "",
			"order by" : ""
	};

	/***
	 * Selected Lines
	 */

	$scope.selectedLine;


	$scope.getSelectedItems = function(item){
		return item.selected;
	};

	/***
	 * /Find all lines
	 * @param method
	 */
	$scope.findAllLines  =  function(data) {
		var data = {
			"name" : data,
			"status" : ""
		};
		var post = $http({
			method: "POST",
			url: "/v3/api/fukoku/line/find",
			dataType: 'json',
			data : JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
		});
		post.success(function (response, status) {
			if(response.code == 200){
				console.log(response.data);
				$scope.lines = response.data;
			}
		});
		post.error(function (data, status) {
			console.log(data);
		});
	}
	/* * */

	/****
	 * Find all factories
	 * @param method
	 */
	$scope.findAllFactories = function(data){
		var data = {
			"name" : data,
			"status" : ""
		};
		var post = $http({
			method: "POST",
			url: "/v3/api/fukoku/factory/find",
			dataType: 'json',
			data : JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
		});
		post.success(function (response, status) {
			if(response.code == 200){
				console.log(response.data);
				$scope.factories = response.data;
			}

		});
		post.error(function (data, status) {
			console.log(data);
		});
	}

	$scope.findAllFactories("");
	/* *** */

	/***
	 * Find all departments
	 * @param method
	 */
	$scope.findAllDepartments = function(data){
		var data = {
			"name" : data,
			"status" : ""
		};
		var post = $http({
			method: "POST",
			url: "/v3/api/fukoku/department/find",
			dataType: 'json',
			data : JSON.stringify($scope.data),
			headers: { "Content-Type": "application/json" }
		});
		post.success(function (response, status) {
			$scope.departments = null;
			if(response.code == 200){
				$scope.departments = response.data;
			}else{
				$scope.message = response.message;
			}
		});
		post.error(function (data, status) {
			console.log(data);
		});
	}
	$scope.findAllDepartments("");
	/* *** */


	$scope.findAll = function(){
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/abnormal-mgt/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.abnormal = null;
            if(response.code == 200){
            	$scope.abnormal = response.data;
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
            url: "/v3/api/fukoku/abnormal-mgt/id/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;

            	// list of lines
				for(i=0;i<response.data.lst_line.length;i++){
					console.log(response.data.lst_line[i].id);
					$("input[type=checkbox][value="+response.data.lst_line[i].id+"]").prop("checked",true);
					$scope.getSelectedItems(response.data.lst_line[i].name);
				}

                $("#txtSeq").val(response.data.seq);
				$("#txtName").val(response.data.name);
            	$("#selectOptFactory").val(response.data.factory.id);
                $("#selectOptDepartment").val(response.data.department.id);
            	$("#txtData").val(response.data.data);

            }else{
            	$scope.message = response.message;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }

	$scope.save = function(method){

		var lines = [];
		$.each($("input[name='lineCheck']:checked"), function(){
			lines.push(parseInt($(this).val()));
		});
		console.log(lines);

		var data = {
				"id" : $scope.id,
            	"seq" : $("#txtSeq").val(),
				"name" : $("#txtName").val(),
            	"ref_factory_id" : $("#selectOptFactory").val(),
				"ref_department_id" : $("#selectOptDepartment").val(),
				"lst_line" : lines,
				"data" : $("#txtData").val()
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/abnormal-mgt",
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			data : JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
            	$scope.findAll($scope.data);
            	$("#modalFrm").modal('hide');
            	swal({position: 'top-end',type: 'success',title: '데이터가 저장되었습니다.',showConfirmButton: false,timer: 1500})
            }else{
            	$scope.message = response.message;
            	swal({position: 'top-end',type: 'error',title: '데이터가 저장되지 않았습니다.',showConfirmButton: false,timer: 1500})
            }
        });
        post.error(function (data, status) {
            console.log(data);
            swal({position: 'top-end',type: 'error',title: '데이터가 저장되지 않았습니다.',showConfirmButton: false,timer: 1500})
        });
    }
	
	$scope.delete = function(id){
		swal({  title: "이상조치관리" ,
			text: "이 이상조치관리를 삭제 하시겠습니까?",
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true,
            confirmButtonText: '저장',
            confirmButtonColor: "#00a65a",
            cancelButtonText: "취소"
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/abnormal-mgt/"+id,
	            dataType: 'json',
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {

	            if(response.code == 200){
	            	swal({position: 'top-end',type: 'success',title: '데이터가 삭제되었습니다.',showConfirmButton: false,timer: 1500})
	            }else{
	            	swal({position: 'top-end',type: 'error',title: '데이터가 삭제되지 않았습니다.',showConfirmButton: false,timer: 1500})
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

		$scope.findAllFactories("");
        $scope.findAllDepartments("");
        $scope.findAllLines("");

		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	$scope.btEdit = function(id){
		console.log(id);
		$scope.action = "update";
		$('#frm').trigger("reset");

        $scope.findAllFactories("");
        $scope.findAllDepartments("");
        $scope.findAllLines("");


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
	
	$scope.btExport = function(){
		$http({
		    url: '/v3/api/fukoku/abnormal-mgt/download',
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
		    //DOWNLOADING IS NOT SUCCESSFULLY
		});
	}
	
	$('#btImport').change(function() {
	    $.ajax({
    	    url: "/v3/api/fukoku/abnormal-mgt/import",
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