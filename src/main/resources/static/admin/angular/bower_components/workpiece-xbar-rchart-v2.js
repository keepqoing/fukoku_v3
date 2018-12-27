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
    $scope.avgXChart;
    $scope.avgRChart;
    $scope.minRD;
    $scope.maxRD;

    $scope.barData=[];
    $scope.dataLineX =[];
    $scope.dataLineR = [];

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
                height: 250,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
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

    $scope.generateGraphLine = function () {
        $scope.optionsLine = {
            chart: {
                type: 'cumulativeLineChart',
                height: 250,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                //y: function(d){ return d[1]/100; },
                y: function(d){return d[1];},
                //average: function(d) { return d.mean/100; },
                average: function(d) { return d.mean; },
                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(d))
                    },
                    showMaxMin: true,
                    rotateLabels: 15,
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                        //return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 20
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
               $scope.dataLineX = [
                   {
                       key: "X",
                       values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]],
                       mean: 250
                   }
               ];


                       $scope.dataLineR = [
                           {
                               key: "R",
                               values: [ [ 1083297600000 , 345] , [ 1085976000000 , 100] , [ 1088568000000 , 100] , [ 1091246400000 , 7.100] , [ 1093924800000 , 7.100] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]],
                               mean: 250
                           }
                       ];

                       console.log("dataLineR" , $scope.dataLineR);
                       */

    }

    //$scope.generateGraphLine();




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
                $scope.avgXChart=parseInt(response.workpieces[response.workpieces.length-1].avg_xbar, 10);
                $scope.avgRChart=parseInt(response.workpieces[response.workpieces.length-1].avg_r_chart, 10);
                $scope.minRD=response.workpieces[response.workpieces.length-1].min_bar;
                $scope.maxRD=response.workpieces[response.workpieces.length-1].max_bar;

                $scope.endDate = $("#endTime").find("input").val();
                $scope.startDate = $("#startTime").find("input").val();


                var caseNum = 10;
                var color;
                if(caseNum <= 3){
                    color = "green";
                }else if(caseNum <=6){
                    color = "yellow";
                }else if(caseNum <= 10 || caseNum <= 20){
                    color = "orange";
                }else if(caseNum >= 21){
                    color = "red";
                }
                $("#styleProcessName").css("background-color",color);

                console.log("min-max",$scope.workpieceForceY);
                var dataValue = [];
                var rChartValue = [];
                var xChartValue = [];

                limit = response.workpieces.length;
                for (i = 0; i < limit; i++) {
                    for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                        dataValue.push(response.workpieces[i].bar_values[j]);
                    }
                    for (j = 0; j < response.workpieces[i].r_chart_values.length; j++) {
                        rChartValue.push(response.workpieces[i].r_chart_values[j]);
                    }
                    for (j = 0; j < response.workpieces[i].x_chart_values.length; j++) {
                        xChartValue.push(response.workpieces[i].x_chart_values[j]);
                    }





                }

                var dataArrObj = [];
                var dataValueObj1 = {};
                dataValueObj1.key = "Quantity" ;
                dataValueObj1.bar = true;
                dataValueObj1.values = dataValue;
                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                $scope.barData = dataArrObj;


                var rDataArrObj = [];
                var rDataValueObj1 = {};
                rDataValueObj1.key = "R" ;
                rDataValueObj1.mean =  parseInt(response.workpieces[response.workpieces.length-1].avg_r_chart, 10);
                rDataValueObj1.values = rChartValue;
                rDataArrObj = $scope.appendObjTo(rDataArrObj, rDataValueObj1);

                $scope.dataLineR = rDataArrObj;

                var xDataArrObj = [];
                var xDataValueObj1 = {};
                xDataValueObj1.key = "X" ;
                xDataValueObj1.mean = parseInt(response.workpieces[response.workpieces.length-1].avg_xbar, 10);
                xDataValueObj1.values = xChartValue;
                xDataArrObj = $scope.appendObjTo(xDataArrObj, xDataValueObj1);

                $scope.dataLineX = xDataArrObj;



                console.log("dataValue" , dataValue);
                console.log("xChartValue" , xChartValue);

                console.log("barData",$scope.barData);
                console.log("dataLineX",$scope.dataLineX);
                console.log("dataLineR",$scope.dataLineR);

                //console.log("bar",$scope.barData);

                $scope.generateGraphBar();
                $scope.generateGraphLine();

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


