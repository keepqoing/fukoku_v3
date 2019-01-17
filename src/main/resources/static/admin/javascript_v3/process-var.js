var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	$scope.processes;
	$scope.processVars;
	$scope.id;
	$scope.action;
	$scope.dtTable;
	
	angular.element(document).ready(function() {
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
	
	$scope.classClicked = "clicked";
	
	$scope.findProcesses = function(){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process",
            dataType: 'json',
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
	
	$scope.findAll = function(){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process-var",
            dataType: 'json',
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
	
	$scope.findOne = function(id){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process-var/"+id,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == 200){
            	console.log(response);
            	$scope.id = response.data.id;
            	$("#txtName").val(response.data.name);
            	$("#selectOpt").val(response.data.process.id);
            	$("#txtSeq").val(response.data.seq);
            	$("#txtRemark").val(response.data.remark);
            	$("#txtItemType").val(response.data.item_type);
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
				"ref_process_id" : $("#selectOpt").val(),
				"remark" : $("#txtRemark").val(),
				"item_type" : $("#txtItemType").val(),
		}
		console.log("data", data);
        var post = $http({
            method: method,
            url: "/v3/api/fukoku/process-var",
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
	
	
	
	$scope.btAdd = function(){
		$scope.action = "add";
		$('#frm').trigger("reset");
		$scope.findProcesses();
		$("#btUpdate").hide();
		$("#btSave").show();
		$("#modalFrm").modal('show');
	};
	
	$scope.btEdit = function(id){
		console.log(id);
		$scope.action = "update";
		$('#frm').trigger("reset");
		$scope.findProcesses();
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
		swal({  title: "ProcessVar" ,   
			text: "Are you sure you want to deleted this process-var?",   
			type: "info",  
			showCancelButton: true,   
			closeOnConfirm: false,   
			showLoaderOnConfirm: true, 
		}, function(){   
			var post = $http({
	            method: "DELETE",
	            url: "/v3/api/fukoku/process-var/"+id,
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

	
$scope.btFindProcess = function(s){
		
	$scope.classClicked = "clicked r";
	
	
		
	// $scope.buttonClick= function (s){$scope.selectedButton =s }
	 
		//alert(name);
		//$(".btFindProcess").css("background-color","00acd6");
		//$(this).css("background-color","rebeccapurple");
		
		//$('input[type="button"].red').removeClass('red')
		// $('.btFindProcess').removeClass('red')
	    //$(this).addClass('red');
	 
		
}

  

	
	
	$scope.findAll();
	$scope.findProcesses();
	
	
});