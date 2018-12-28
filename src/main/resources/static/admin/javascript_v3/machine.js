var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	$scope.message;
	$scope.machines;
	$scope.id;
	$scope.action;
	$scope.dtTable = $("#dtTable");
	
	
	$scope.findAll = function(){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/machine",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.machines = null;
        	console.log(response);
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
	
	$scope.findOne = function(id){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/machine/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#txtIP").val(response.data.ip);
            	$("#txtImportDate").val(response.data.import_date);
            	$("#txtCode").val(response.data.code);
            	$("#txtManufacturer").val(response.data.manufacturer);
            	$("#txtFacilityStaff").val(response.data.facility_staff);
            	$("#txtFacilityContactPerson").val(response.data.facility_contact_person);
            	$("#txtPlctype").val(response.data.plc_type);
            	$("#txtPlcCommunicationDevice").val(response.data.plc_communication_device);
            	$("#txtStation").val(response.data.station);
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
				"ip" : $("#txtIP").val(),
				"import_date" : $("#importDate").find("input").val(),
				"code" : $("#txtCode").val(),
				"manufacturer" : $("#txtManufacturer").val(),
				"facility_staff" : $("#txtFacilityStaff").val(),
				"facility_contact_person" : $("#txtFacilityContactPerson").val(),
				"plc_type" : $("#txtPlctype").val(),
				"plc_communication_device" : $("#txtPlcCommunicationDevice").val(),
				"station" : $("#txtStation").val(),
				"remark" : $("#txtRemark").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/machine",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	$scope.message = response.message;
            	$scope.findAll();
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
		swal({  title: "Machine" ,   
			text: "Are you sure you want to deleted this machine?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/machine/"+id,
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