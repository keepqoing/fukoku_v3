var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {
	
	/**
	 * Variable
	 */
	

	$scope.factories;
    $scope.lines;
    $scope.machines;
    $scope.status = "1";
    $scope.selectCtrl = this;
    $scope.selectCtrl.selectedValue = "2";
    $scope.selectCtrl.selectedLineValue = "2";
    $scope.selectCtrl.selectedMachineValue = "2";
	$scope.data = {
			"name" : "",
			"status" : "3",
			"ref_factory_id":0,
			"name_in" : "",
	};
	
	$scope.findFactories = function(){
		var data = {
				"name" : "",
				"status" : "",
		};
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/factory/find",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
        	$scope.factories = null;
        	$scope.checkBoxLines = null;
            if(response.code == 200){
            	$scope.factories = response.data;
            	$scope.findLineByFactoryId($scope.selectCtrl.selectedValue,$scope.status);
            }else{
            	$scope.message = response.message;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
	
	$scope.findLineByFactoryId = function(id, status){
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/process-machine3/find/line/"+id+"/"+status,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {

            if(response.code == 200){
            	$scope.lines = response.data;
            }else{
            	$scope.message = response.message;
            }
            // console.log("$scope.checkBoxLines ",$scope.checkBoxLines);
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }

    $scope.findMachineByLineName = function(line){
	    console.log("line = " + line);
        var post = $http({
            method: "GET",
            url: "/v3/api/fukoku/machine/findAllByLine/"+ line,

            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {

            if(response.code == 200){
                console.log(response.data);
                $scope.machines = response.data;
            }else{
                $scope.message = response.message;
            }
            // console.log("$scope.checkBoxLines ",$scope.checkBoxLines);
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }

	

	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	$scope.findFactories(); 


	$scope.selectByFactory = function(){
		$scope.data["ref_factory_id"] = parseInt($scope.selectCtrl.selectedValue);

		$scope.findLineByFactoryId(parseInt($scope.selectCtrl.selectedValue) , $scope.status)

	}

    $scope.selectByLine = function(){
        $scope.findMachineByLineName($scope.selectCtrl.selectedLineValue);

    }

    var productionStatus = {};
    productionStatus.getAllProductStatusGraphs = function () {
        $("#barMultiLine").html("");

        $.ajax({
            url: "/v3/api/fukoku/alarm-appearance/"+
                $("#selectOptLine").val() + "/" +
                $("#selectOptMachine").val() + "/" +
                $("#txtDate").val() + "/" ,
            type: 'GET',
            dataType: 'JSON',
            data: {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response)
                $("#kagiChart").html("");
                if (response.code == 200) {
                        var arrX = [];
                        var arrY = [];
                        // $.each(response.data, function (key, value) {
                        //     var arrX = parseFloat(response.data[key].x);
                        //
                        //     response.data[key]["line1"] = (parseFloat(a.toFixed(2))?parseFloat(a.toFixed(2)):0);
                        //
                        // });

                        // var settings = {
                        //     selector: "#barMultiLine",
                        //     width: 20000,
                        //     height: 450
                        // };
                        // barchartMultiLine(response.data, settings);
                    // var data = [
                    //     {
                    //         x: arrX,
                    //         y: arrY,
                    //         type: 'scatter'
                    //     }
                    // ];
                    //
                    // Plotly.newPlot('myDiv', data, {}, {showSendToCloud: true});

                    // var data = [
                    //     {
                    //         "date": "2015-01-02",
                    //         "close": 109.33
                    //     },
                    //     {
                    //         "date": "2015-01-05",
                    //         "close": 106.25
                    //     },
                    //     {
                    //         "date": "2015-01-06",
                    //         "close": 106.26
                    //     }];
                    Draw_LineChart_V3(response.data, "", "", "#alarmChart", "y", "lineT" );


                }else{
                    // $("#mark").hide();
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    $("#btnGraph").click(function () {

        productionStatus.getAllProductStatusGraphs();

    });

});