var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http , $compile,$interval) {

    $scope.lines;

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
                $('#selectLineSearch').empty();
                if(response.lines.length > 0){
                    $.each(response.lines, function(key, value){
                        $("#selectLineSearch").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            }else{
                $scope.lines = "Error!";
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }


    $scope.getFrequencyAlarmCode = function (line,startDate,endDate){
        var line = $('#selectLineSearch').val();
        var startDate = $("#startTime").find("input").val();
        var endDate = $("#endTime").find("input").val();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/alarm-history/alarm-freq-val?line="+line+"&startDate="+startDate+"&endDate="+endDate,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            console.log("response" , response )
            $scope.generateGraph(response.DATA);
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }






    $scope.generateGraph = function (data) {
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

        var dataGraph =[];
        for (var i = 0; i < data.length; i++) {
            var my_object = {};
            my_object.key = "Alarm";
            my_object.color ="#d62728",

                 inObject = {};
                inObject.value = data[i].FREQUENCY;
                inObject.label = data[i].ALARM_NAME;
                 value = [];
                value.push(inObject)
            my_object.value = value;
            dataGraph.push(my_object);
        }

        console.log("dataGraph",dataGraph)
        //$scope.data = dataGraph;

        $scope.data = [
            {
                "key": "Series1",
                "color": "#d62728",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : -1.8746444827653
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : -8.0961543492239
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : -0.57072943117674
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : -2.4174010336624
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : -0.72009071426284
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : -0.77154485523777
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : -0.90152097798131
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : -0.91445417330854
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : -0.055746319141851
                    }
                ]
            },
            {
                "key": "Series2",
                "color": "#1f77b4",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : 25.307646510375
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : 16.756779544553
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : 18.451534877007
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : 8.6142352811805
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : 7.8082472075876
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : 5.259101026956
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : 0.30947953487127
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : 0
                    }
                ]
            }
        ];

        console.log($scope.data);





    }





    $scope.lineList();


});