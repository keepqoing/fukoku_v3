var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});

app.controller('MainCtrl', function($scope, $http , $compile) {

    $scope.machines;
    $scope.processes;
    $scope.products;
    $scope.workpieceForceY;
    $scope.ppk;
    $scope.processName;
    $scope.cp;
    $scope.cpk;

    $scope.workpieces = [];


    $scope.barData=[];
    $scope.lineDataX =[];
    $scope.lineDataR = [];

    $scope.startDate;
    $scope.endDate;


    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    $scope.lineList = function(){
        openLoading();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/line-list",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            console.log(response);
            if(response.code == "7777"){
                $scope.lines = response.lines;
                console.log($scope.lines);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }

    $scope.lineList();

    $scope.machineListByLineId = function(lineId){
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/machine-list/"+lineId,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            console.log(response);
            if(response.code == "7777"){
                $scope.machines = response.machines;
            }
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }

    $("#lineList").change(function(){
        $scope.machineListByLineId($("#lineList").val());
    });

    $("#machineListByLine").change(function(){
        //console.log($("#machineListByLine").val() +" - " + $("#lineList").val());
        $scope.processByLineAndMachine(  $("#lineList").val() ,   $("#machineListByLine").val());
        $scope.findProductByLineAndMachine(  $("#lineList").val() ,   $("#machineListByLine").val());
    });

    $scope.processByLineAndMachine = function(line,machine){
        //openLoading();
        data = {
            "LINE_NAME": line,
            "MACHINE_NAME": machine
        };
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-process-by-line-machine",
            dataType: 'json',
            data : JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            console.log(response);
            if(response.code == "7777"){
                $scope.processes = response.processes;
                // $("#processList").empty();
                /*
                for(i=0;i<response.processes.length;i++) {
                    $("#processList").append("<label style=\"margin-right: 40px;\" ng-repeat=\"pr in processes\">\n" +
                        "                                        <strong style=\"color: red;\"><input type=\"radio\" name=\"optProcess\" value='"+response.processes[i].NAME+"' >"+response.processes[i].NAME +"</strong>\n" +
                        "                                    </label>")
                }
                */

            }
            //closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            //closeLoading();
        });

    }


    $scope.findProductByLineAndMachine = function(line,  machine){
        console.log("l", line+"/"+machine);
        openLoading();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/find-product/"+line+"/"+machine,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.products.length > 0){
                console.log("response > 0" , response.products )
                $scope.products = response.products;
            }else{
                tempData = [
                    {ID: 1, NAME: "CM5E", MACHINE: "HC_Runout", LINE: "HC"},
                    {ID: 2, NAME: "DS7E", MACHINE: "HC_Runout", LINE: "HC"},
                    {ID: 3, NAME: "JX6E", MACHINE: "HC_Runout", LINE: "HC"},
                    {ID: 4, NAME: "R-ENG", MACHINE: "IB_Balancer", LINE: "HC"},
                    {ID: 5, NAME: "X-100", MACHINE: "HC_Runout", LINE: "HC"},
                    {ID: 6, NAME: "THETA-개선(VVL)", MACHINE: "HB_Balancer", LINE: "HC"},
                    {ID: 7, NAME: "THETA-HEV(YF)", MACHINE: "HB_Balancer", LINE: "HC"},
                    {ID: 8, NAME: "THETA-GDI", MACHINE: "HB_Balancer", LINE: "HC"},
                    {ID: 9, NAME: "H4MK", MACHINE: "HB_Balancer", LINE: "HC"}
                ];
                $scope.products = tempData;
                console.log("response 0" , tempData);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }


    $scope.generateGraphBar = function () {

        $scope.optionsBar = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                color: [ 'red','blue','yellow'],
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                //yDomain:  $scope.workpieceForceY,
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(d))
                    },
                    rotateLabels: 15,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 1000],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        /*
        $scope.barData = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            }];
            */

    }






    $scope.getData = function(value) {
        $scope.processName = $('#processList').val();

        if($("#lineList").val() == ""){
            alert("Please select 라인!"); return;
        }
        if($("#machineListByLine").val() == ""){
            alert("Please select 설비!"); return;
        }
        if($scope.processName == ""){
            alert("Please select 공정변수!"); return;
        }
        //if($("#productList").val() == ""){
        //    alert("Please select 품종!"); return;
        //}
        processRDO = [$scope.processName];
        openLoading();
        startTime = $scope.toTimestamp($("#startTime").find("input").val())    ;
        endTime =  $scope.toTimestamp($("#endTime").find("input").val());
        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#lineList").val(),
            "LIST_PROCESS_NAME": processRDO,
            "MACHINE_NAME": $("#machineListByLine").val(),
            "MODEL":    "",//$("#productList").val(),
            "START_TIME": startTime
            //"LIMIT": limitWorkpiece
        };
        console.log(data);
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-workpiece-or-process",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {
            console.log(response);
            if(response.code == "7777"){
                $("#graphBlook").show();
                $scope.workpieceForceY = [response.workpieces[response.workpieces.length-1].min_bar,response.workpieces[response.workpieces.length-1].max_bar];
                $scope.ppk = response.workpieces[response.workpieces.length-1].ppk;
                $scope.cpk = response.workpieces[response.workpieces.length-1].cpk;
                $scope.cp = response.workpieces[response.workpieces.length-1].cp;

                $scope.endDate = $("#endTime").find("input").val();
                $scope.startDate = $("#startTime").find("input").val();


                for(i=0;i<50;i++){
                    $scope.workpieces.push(response.workpieces[i]);
                }

                console.log("min-max",$scope.workpieceForceY);
                var dataValue = [];
                limit = response.workpieces.length;

                for (i = 0; i < 50;i++) {
                    for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                        dataValue.push(response.workpieces[i].bar_values[j]);
                    }
                }

                dataValue.push(response.workpieces[0].bar_values[0]);

                var dataArrObj = [];
                var dataValueObj1 = {};
                dataValueObj1.key = "Quantity" ;
                dataValueObj1.bar = true;
                dataValueObj1.values = dataValue;

                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                $scope.barData = dataArrObj;

                console.log("bar",$scope.barData);

                $scope.generateGraphBar();



            }else{
                $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                    "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                    "              </div>";
                $("#graphBlook").hide();
                //$scope.totalFound = "<h3>검색결과: 0 건</h3>";
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
        });

    }



});


