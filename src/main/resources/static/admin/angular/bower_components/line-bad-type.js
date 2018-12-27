var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http , $compile) {

    $scope.lines;
    $scope.total_assign_product;

    $scope.lineList = function(){
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/line-list",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response" , response )
                $scope.lines = response.lines;
            }else{
                $scope.lines = "Error!";
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });

    }

    $scope.findCpCpk = function(){
        openLoading();
        data = {
            "LINE_NAME": $("#selectLine").val(),
            "START_TIME": $("#startTime").find("input").val(),
            "END_TIME": $("#endTime").find("input").val()
        };
        console.log(data);
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-cp-cpk",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response" , response )
                //$scope.total_assign_product = response.total_assign_product;
             //   $scope.generateGraph(response.total_produced_product , response.total_assign_product);
            }else{
                $scope.generateGraph(0 , assigned);
                $scope.lines = "Error!";
               // alert(response.message);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    };







    
    $scope.generateGraph = function (produced , assigned) {
        $scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',f')(d)
                    }
                }
            }
        };

        $scope.data = [

            {
                "key": "Produced Product",
                "color": "#d62728",
                "values": [
                    {
                        "label" : "Number of products" ,
                        "value" : produced
                    }
                ]
            },
            {
                "key": "Assign Product",
                "color": "#1f77b4",
                "values": [
                    {
                        "label" : "Number of products" ,
                        "value" : assigned
                    }
                ]
            }



        ]
    }

    
    


    $scope.lineList();

});