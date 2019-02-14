var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	
	/**
	 * Variable
	 */
	$scope.message;
	$scope.machines;
	$scope.id;
	$scope.action;
	$scope.processes;
	$scope.dtTable;
	$scope.sorting = "asc";
	$scope.data = {
			"name" : "",
	};
	
	$scope.selectedProcess;
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
	
	$scope.findAllProcess  =  function() {
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
            if(response.code == 200){
            	console.log(response.data);
            	$scope.processes = response.data;
            	
//            	$("#selectOptProcess").empty(); alert(response.data.length);
//            	for(i=0;i< response.data.length;i ++){
//            		console.log(response.data[i].name)
//            		$("#selectOptProcess").append("<option>"+response.data[i].name+"</option>");
//            	}
            	// setTimeout(function(){ $('.selectpicker').selectpicker(); }, 3000);
            	
            }
            
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.findAll = function(){
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/machine/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
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
            	$("#selectOptProcess").val(response.data.process.id);
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
		var processes = []
        $.each($("input[name='processCheck']:checked"), function(){     
        	processes.push(parseInt($(this).val()));
        });
        console.log(processes);
        
		var data = {
				"id" : $scope.id,
				"seq" : $("#txtSeq").val(),
				"name" : $("#txtName").val(),
				"ref_process_id" : 2,//$("#selectOptProcess").val(),
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
				"lst_process" : processes
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
		$scope.findAllProcess();
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	$scope.btEdit = function(id){
		console.log(id);
		$scope.action = "update";
		$('#frm').trigger("reset");
		$scope.findAllProcess();
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
		$scope.data["name"] = $("#txtSearch").val();
		$scope.findAll($scope.data);
	}
	
	$scope.btExport = function(){
		$http({
		    url: '/v3/api/fukoku/machine/download',
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
    	    url: "/v3/api/fukoku/machine/import",
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
	
	
	
      
	
	 
	    
	    $scope.getSelectedItems = function(item){
	        return item.selected;
	    };
	
	
});