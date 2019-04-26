

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.xData = [];
    $scope.rData = [];
    $scope.workpieceForceY = [];
    $scope.chartData=[];
    $scope.processes;
    $scope.machine;

    $scope.endTime;
    $scope.startTime;

    $scope.selectedProcess;


    $scope.product;

    $scope.cp;
    $scope.cpk;
    $scope.avgLSL;
    $scope.avgUSL;
    $scope.avgRD;

    $scope.lstModel = [];

    $scope.getProcesses = function(){
        $scope.processes = myprocess;
     //   console.log("data",$scope.processes);
    }

    $scope.getProcesses();

    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    $scope.findProductByLineAndMachine = function(line,  machine){
      //  console.log("l", line+"/"+machine);
        openLoading();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/find-product/"+line+"/"+machine,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            $('#lineList').empty();
            if(response.products.length > 0){
             //   console.log("response > 0" , response.products )
                $scope.product = response.products;
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }
            }else{
                $scope.findAllProducts();
              //  console.log("response 0" , $scope.product);
            }
            closeLoading();
        });
        post.error(function (data, status) {
          //  console.log(data);
            closeLoading();
        });

    }


    $scope.findAllProducts = function(){
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/find-all-product",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.products.length > 0){
                $scope.product = response.products; alert(1);
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }
            }
        });
        post.error(function (data, status) {
           // console.log(data);
        });
    }




    //$scope.findAllProducts();
    $scope.findProductByLineAndMachine($("#line").text() , $("#machine").text() );

    $scope.selectRadio = function(value){
        $scope.selectedProcess = value;
     //   console.log( $scope.selectedProcess);
        $scope.getData();
    }

    $scope.getData = function () {

        $scope.selectedProcess = $('input[name=optionsRadios]:checked').val();

        $scope.startTime = $("#startTime").find("input").val()    ;
        $scope.endTime =  $("#endTime").find("input").val();

        var param = startTime +"/"+ endTime +"/"+ $("#line").text()  +"/"+ $("#machine").text() +"/"+ $("#selectProduct").val()  +"/"+  process[0];
        //console.log(param);
        //$scope.generateGroupBarChart(param); return;

        if( $("#selectProduct").val() == ""){
            alert("Please select 품종!");
            return;
        }

        if( $scope.selectedProcess == null){
            alert("Please select 공정: !");
            return;
        }

        $("#histogram").empty();


        openLoading();


        /*
        data = {
            "END_TIME":   $scope.endTime,
            "LINE_NAME": $("#line").text(),
            "LIST_PROCESS_NAME": null,
            "PROCESS_NAME" : $scope.selectedProcess,//process[0],
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":   $("#selectProduct").val(),
            "START_TIME": $scope.startTime
            //"LIMIT": limitWorkpiece
        };*/

        var pr =  $("#selectProduct").val();
        var models = [];
        if(pr == "ALL"){
            pr = "ALL";
            models = $scope.lstModel;
        }else{
            models.push(pr);
        }

        startTime = $("#startTime").find("input").val();
        endTime =  $("#endTime").find("input").val();

        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "PROCESS_NAME" : $scope.selectedProcess,
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  pr,
            "START_TIME": startTime,
            "lst_model" : $scope.lstModel
        };



        console.log(data);

        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-group-workpiece-status-quality-v2",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {
            console.log("response",response);
            if( response.code == "200"){

                $scope.totalFound ="";
                $("#showData").show();

                $scope.machine =  machineName;//$("#machine").text();

                //var data = d3.range(1000).map(d3.randomBates(10));
               // console.log(data);
                $("#groupBarChart").empty();
                if(response.groupCharts.length != 0){

                    $("#showData").show();

                    var readData =[];
                    for(i=0;i<response.groupCharts.length;i++){
                        if(response.groupCharts[i].rd != null){
                            for(j=0;j<response.groupCharts[i].rd.length;j++){
                                //console.log(i +" - " + j + " - " +response.groupCharts[i].rd[j]);
                                readData.push(response.groupCharts[i].rd[j]);
                                //console.log("==========> readData : "+readData.length);
                               // if(readData.length > 3000) break;
                            }
                        }
                    }

                  // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(readData));
                   // var downloadAnchorNode = document.createElement('a');
                   // downloadAnchorNode.setAttribute("href",     dataStr);
                   // downloadAnchorNode.setAttribute("download",  "test.json");
                   // downloadAnchorNode.click();
                   // downloadAnchorNode.remove();

                    //$scope.generateGroupBarChart(readData);
                     $scope.histogramResponsiveWidth(readData);
                }else{
                    $("#groupBarChart").empty();
                }

                $("#xChart").empty();
                if(response.groupCharts.length != 0){

                    //$scope.workpieceForceY = [response.groupWorkpieces[response.groupWorkpieces.length-1].min_rd,response.groupWorkpieces[response.groupWorkpieces.length-1].max_rd];
                    $scope.workpieceForceY = [ response.nvd3Graph.minBar , response.nvd3Graph.maxBar];

                    var dataValue = [];
                    var uclValue = [];
                    var lclValue = [];
                    var countGraph=0;
                    for(i=0;i<response.workpieces.length;i++) {
                        for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                            dataValue.push(response.workpieces[i].bar_values[j]);
                            uclValue.push(response.workpieces[i].ucl_values[j]);
                            lclValue.push(response.workpieces[i].lcl_values[j]);
                            countGraph++;
                            //console.log("dataValue : "+dataValue.length);
                            //if(dataValue.length > 3000) break;
                        }
                    }

                    var dataArrObj = [];
                    var dataValueObj1 = {};
                    dataValueObj1.key = "Data";
                    dataValueObj1.bar = true;
                    dataValueObj1.values = dataValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                    var dataValueObj2 = {};
                    dataValueObj2.key = "USL";
                    dataValueObj2.bar = false;
                    dataValueObj2.values = uclValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);

                    var dataValueObj3 = {};
                    dataValueObj3.key = "LSL";
                    dataValueObj3.bar = false;
                    dataValueObj3.values = lclValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);

                    $scope.xData = dataArrObj.map(function(series) {
                        series.values = series.values.map(function(d) {
                            return {
                                x: d[0],
                                y: d[1]
                            }
                        });
                        return series;
                    });

                   // console.log("R",$scope.xData);

                    /**
                     * R Chart
                     * @type {Array}
                     */

                    var dataValue = [];
                    var uclValue = [];
                    var lclValue = [];
                    var countGraph=0;
                    for(i=0;i<response.workpieces.length;i++) {
                        for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                            dataValue.push(response.workpieces[i].bar_values[j]);
                            uclValue.push(response.workpieces[i].ucl_values[j]);
                            lclValue.push(response.workpieces[i].lcl_values[j]);
                            countGraph++;
                           // console.log("dataValue : "+dataValue.length);
                            //if(dataValue.length > 3000) break;
                        }
                    }

                    var dataArrObj = [];
                    var dataValueObj1 = {};
                    dataValueObj1.key = "Data";
                    dataValueObj1.bar = true;
                    dataValueObj1.values = dataValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                    var dataValueObj2 = {};
                    dataValueObj2.key = "USL";
                    dataValueObj2.bar = false;
                    dataValueObj2.values = uclValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);

                    var dataValueObj3 = {};
                    dataValueObj3.key = "LSL";
                    dataValueObj3.bar = false;
                    dataValueObj3.values = lclValue;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);

                    $scope.rData = dataArrObj.map(function(series) {
                        series.values = series.values.map(function(d) {
                            return {
                                x: d[0],
                                y: d[1]
                            }
                        });
                        return series;
                    });

                    $scope.linePlusBarChart();


                        /*
                    // Find CPK
                    var lsl = response.groupWorkpieces[response.groupWorkpieces.length-1].avg_lsl;
                    var usl = response.groupWorkpieces[response.groupWorkpieces.length-1].avg_usl;
                    var c = (usl - lsl) / 2;
                   // console.log("c" , c);
                    var k = ( c -  (response.groupWorkpieces[response.groupWorkpieces.length-1].total_rd / response.groupWorkpieces[response.groupWorkpieces.length-1].freq_total_wp_cycle )  / response.groupWorkpieces.length) / c;

                    console.log("cpk" , Number(k).toFixed(2));
                    $scope.cpk =  Number(k).toFixed(2);
                    $scope.cp =  response.groupWorkpieces[response.groupWorkpieces.length-1].cp;
                    $scope.ppk =  response.groupWorkpieces[response.groupWorkpieces.length-1].ppk;
                    $scope.avgLSL =  response.groupWorkpieces[response.groupWorkpieces.length-1].avg_lsl;
                    $scope.avgUSL =  response.groupWorkpieces[response.groupWorkpieces.length-1].avg_usl;
                    var readData = response.groupWorkpieces[response.groupWorkpieces.length-1].total_rd / response.groupWorkpieces[response.groupWorkpieces.length-1].freq_total_wp_cycle;
                    $scope.avgRD =  Number(readData).toFixed(2);;*/


                }else{
                   // console.log("XR No data!");
                    //$scope.xData = [];
                    //$scope.rData = [];
                    //$scope.linePlusBarChart();
                    $scope.totalFound = "<div class='callout callout-warning'><h4><i class='icon fa fa-warning'></i>검색결과: 0 건</h4></div>";
                    $("#showData").hide();

                }

            }else{
                $("#showData").hide();
                $scope.totalFound = "<div class='callout callout-warning'><h4><i class='icon fa fa-warning'></i>검색결과: 0 건</h4></div>";
            }
            closeLoading();
        });

        post.error(function (data, status) {
         //   console.log(data);
        });
    }


    $scope.generateGroupBarChart = function (readData) {

        var color = "blue";
        // Generate a 1000 data points using normal distribution with mean=20, deviation=5

        //var values = d3.range(1000).map(d3.random.normal(20, 5));

        //var values = readData.map(d3.random.normal(20, 5))
        var values = readData;
      //  console.log(values);

        // A formatter for counts.
        var formatCount = d3.format(",.0f");
        var margin = {top: 20, right: 30, bottom: 30, left: 30},
            width = 760 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        var max = d3.max(values);
        var min = d3.min(values);
        var x = d3.scale.linear()
            .domain([min, max])
            .range([0, width]);
        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(20).range([0, 1000])
            (values);
        var yMax = d3.max(data, function(d){return d.length});
        var yMin = d3.min(data, function(d){return d.length});
        var colorScale = d3.scale.linear()
            .domain([yMin, yMax])
            .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);
        var y = d3.scale.linear()
            .domain([0, yMax])
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var svg = d3.select("#histogram").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
        bar.append("rect")
            .attr("x", 1)
            .attr("width", (x(data[0].dx) - x(0)) - 1)
            .attr("height", function(d) { return height - y(d.y); })
            .attr("fill", function(d) { return colorScale(d.y) });
        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(data[0].dx) - x(0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        /*
        * Adding refresh method to reload new data
        */
        function refresh(values){
            // var values = d3.range(1000).map(d3.random.normal(20, 5));
            var data = d3.layout.histogram()
                .bins(x.ticks(20))
                (values);
            // Reset y domain using new data
            var yMax = d3.max(data, function(d){return d.length});
            var yMin = d3.min(data, function(d){return d.length});
            y.domain([0, yMax]);
            var colorScale = d3.scale.linear()
                .domain([yMin, yMax])
                .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);
            var bar = svg.selectAll(".bar").data(data);
            // Remove object with data
            bar.exit().remove();
            bar.transition()
                .duration(1000)
                .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
            bar.select("rect")
                .transition()
                .duration(1000)
                .attr("height", function(d) { return height - y(d.y); })
                .attr("fill", function(d) { return colorScale(d.y) });
            bar.select("text")
                .transition()
                .duration(1000)
                .text(function(d) { return formatCount(d.y); });
        }


        // Calling refresh repeatedly.
        //setInterval(function() {
        //    var values = d3.range(1000).map(d3.random.normal(20, 5));
        //   refresh(values);
        //}, 2000);

    }


    $scope.linePlusBarChart = function () {

        $scope.xOptions = {
            chart: {
                type: 'linePlusBarChart',
                height: 400,
                width: 760,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    //forceY: 0
                    forceY: $scope.workpieceForceY
                },
                bars2: {
                    forceY: [0]
                },
                yDomain:  $scope.workpieceForceY,
                focusEnable: false,
                tooltips:false,
                color: ['blue', 'red','#2ca02c'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: '',
                    tickFormat: function(d) {
                        var dx = $scope.xData[0].values[d] && $scope.xData[0].values[d].x || 0;
                        if (dx > 0) {
                            //return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.xData[0].values[d] && $scope.xData[0].values[d].x || 0;
                        //return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'X Chart',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: '',
                    tickFormat: function(d) {
                        return  d3.format(',.f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        return '$' + d3.format(',.2f')(d)
                    }
                }
            }
        };

        $scope.rOptions = {
            chart: {
                type: 'linePlusBarChart',
                height: 400,
                width: 760,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    //forceY: 0
                    forceY: $scope.workpieceForceY
                },
                bars2: {
                    forceY: [0]
                },
                yDomain:  $scope.workpieceForceY,
                focusEnable: true,
                tooltips:false,
                color: [ 'red','#f39c12','#3c8dbc'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: '',
                    tickFormat: function(d) {
                        var dx = $scope.rData[0].values[d] && $scope.rData[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.rData[0].values[d] && $scope.rData[0].values[d].x || 0;
                        //return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'R Chart',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: '',
                    tickFormat: function(d) {
                        return  d3.format(',.f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        return '$' + d3.format(',.2f')(d)
                    }
                }
            }
        };


        /*

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            },
            {
                "key" : "Price" ,
                "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98]]
            }
        ].map(function(series) {
            series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
            return series;
        });*/
    }





    $scope.getTextWidth = function (text, fontSize, fontName) {
        c = document.createElement("canvas");
        ctx = c.getContext("2d");
        ctx.font = fontSize + ' ' + fontName;
        return ctx.measureText(text).width;
    }

    $scope.DataSegregator = function (array, on) {
        var SegData;
       // console.log(SegData);
        OrdinalPositionHolder = {
            valueOf: function () {
                thisObject = this;
                keys = Object.keys(thisObject);
                keys.splice(keys.indexOf("valueOf"), 1);
                keys.splice(keys.indexOf("keys"), 1);
                return keys.length == 0 ? -1 : d3.max(keys, function (d) { return thisObject[d] })
            }
            , keys: function () {
                keys = Object.keys(thisObject);
                keys.splice(keys.indexOf("valueOf"), 1);
                keys.splice(keys.indexOf("keys"), 1);
                return keys;
            }
        }
        array[0].map(function (d) { return d[on] }).forEach(function (b) {
            value = OrdinalPositionHolder.valueOf();
            OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
        })

        SegData = OrdinalPositionHolder.keys().map(function () {
            return [];
        });

        array.forEach(function (d) {
            d.forEach(function (b) {
                SegData[OrdinalPositionHolder[b[on]]].push(b);
            })
        });

        return SegData;
    }

    $scope.xChart = function(responseData){

        Data = responseData;
        /*Data = [
            { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
            { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 321 }, { Name: "Category1", Value: 524 },{ Name: "Category1", Value: 521 }, { Name: "Category1", Value: 123 }, { Name: "Category1", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
            { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category1", Value: 236 }, { Name: "Category1", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
            { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category1", Value: 330 }, { Name: "Category1", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
            { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category1", Value: 423 }, { Name: "Category1", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
            { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category1", Value: 461 }, { Name: "Category1", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
        ];*/

       // console.log("local",Data);
      //  console.log("response.xchart_rchart",responseData);

        var margin = { top: 20, right: 30, bottom: 60, left: 40 },
            width = 760 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var textWidthHolder = 0;
        /// Adding Date in LineCategory
        Data.forEach(function (d) {
            d.LineCategory.forEach(function (b) {
                b.Date = d.Date;
            })
        });




        var Categories = new Array();
        // Extension method declaration

        Categories.pro

        var Data;
        var ageNames;
        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
        var XLine = d3.scale.ordinal()
            .rangeRoundPoints([0, width], .1);
        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
            .range([height, 0]);

        var YLine = d3.scale.linear().range([height, 0])
            .domain([0, d3.max(Data, function (d) { return d3.max(d.LineCategory, function (b) { return b.Value }) })]);

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var line = d3.svg.line().x(function (d) {
            return x0(d.Date) + x0.rangeBand() / 2;
        }).y(function (d) { return YLine(d.Value) });




        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        var YLeftAxis = d3.svg.axis().scale(YLine).orient("right").tickFormat(d3.format(".2s"));

        var svg = d3.select("#xChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");





        // Bar Data categories
        Data.forEach(function (d) {
            d.Categories.forEach(function (b) {
                if (Categories.findIndex(function (c) { return c.Name===b.Name}) == -1) {
                    b.Type = "bar";
                 //   console.log(JSON.stringify(b))
                    Categories.push(b)
                }
            })
        });


        // Line Data categories
        Data.forEach(function (d) {
            d.LineCategory.forEach(function (b) {
                if (Categories.findIndex(function (c) { return c.Name === b.Name }) == -1) {
                    b.Type = "line";
               //     console.log(JSON.stringify(b))
                    Categories.push(b)
                }
            })
        });

        // Processing Line data
        lineData = $scope.DataSegregator(Data.map(function (d) { return d.LineCategory }), "Name");

        // Line Coloring
        LineColor = d3.scale.ordinal();
        LineColor.domain(Categories.filter(function (d) { return d.Type == "line" }).map(function (d) { return d.Name }));
        LineColor.range(["#d40606", "#06bf00", "#98bdc5", "#671919", "#0b172b"])
        x0.domain(Data.map(function (d) { return d.Date; }));
        XLine.domain(Data.map(function (d) { return d.Date; }));
        x1.domain(Categories.filter(function (d) { return d.Type == "bar" }).map(function (d) { return d.Name})).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(Data, function (d) { return d3.max(d.Categories, function (d) { return d.Value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (width) + ",0)")
            .call(YLeftAxis)

            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -10)

            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Percent");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Population");


        var state = svg.selectAll(".state")
            .data(Data)
            .enter().append("g")
            .attr("class", "state")
            .attr("transform", function (d) { return "translate(" + x0(d.Date) + ",0)"; });

        state.selectAll("rect")
            .data(function (d) { return d.Categories; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) { return x1(d.Name); })
            .attr("y", function (d) { return y(d.Value); })
            //.attr("height", function (d) { return height - y(d.Value); })
            .style("fill", function (d) { return color(d.Name); })
            .transition().delay(500).attrTween("height", function (d) {
            var i = d3.interpolate(0, height - y(d.Value));
            return function (t)
            {
                return i(t);
            }
        });

        // drawaing lines
        svg.selectAll(".lines").data(lineData).enter().append("g").attr("class", "line")
            .each(function (d) {
                Name=d[0].Name
                d3.select(this).append("path").attr("d", function (b) { return line(b) }).style({ "stroke-width": "2px", "fill": "none" }).style("stroke", LineColor(Name)).transition().duration(1500);
            })


        // Legends

        var LegendHolder = svg.append("g").attr("class", "legendHolder");
        var legend = LegendHolder.selectAll(".legend")
            .data(Categories.map(function (d) { return {"Name":d.Name,"Type":d.Type}}))
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," +( height+ margin.bottom/2 )+ ")"; })
            .each(function (d,i) {
                //  Legend Symbols


                d3.select(this).append("rect")
                    .attr("width", function () { return 18 })
                    .attr("x", function (b) {

                        left = (i+1) * 15 + i * 18 + i * 5 + textWidthHolder;
                        return left;
                    })
                    .attr("y", function (b) { return b.Type == 'bar'?0:7})
                    .attr("height", function (b) { return b.Type== 'bar'? 18:5 })
                    .style("fill", function (b) { return b.Type == 'bar' ? color(d.Name) : LineColor(d.Name) });

                //  Legend Text

                d3.select(this).append("text")
                    .attr("x", function (b) {

                        left = (i+1) * 15 + (i+1) * 18 + (i + 1) * 5 + textWidthHolder;

                        return left;
                    })
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(d.Name);

                textWidthHolder += $scope.getTextWidth(d.Name, "10px", "calibri");
            });


        // Legend Placing

        d3.select(".legendHolder").attr("transform", function (d) {
            thisWidth = d3.select(this).node().getBBox().width;
            return "translate(" + ((width) / 2 - thisWidth / 2) + ",0)";
        })


    }






    $scope.histogramResponsiveWidth = function(getValues){

        var numOfBins = 10;
        // Generate a Bates distribution of 10 random variables.
        var values =   getValues;
        // A formatter for counts.
        var formatCount = d3.format(",.0f");



        var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      //  console.log("width",width);
        var x = d3.scale.linear()
            .domain([
                Math.floor(d3.min(values) / numOfBins) * numOfBins, // 10
                Math.ceil(d3.max(values) / numOfBins) * numOfBins // 100
            ])
            .range([0, width]);
        /*
        var x = d3.scale.linear()
            .domain([0, 1])
            .range([0, width]);
        */
        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(20))
            (values);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var svg = d3.select("#histogram").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    //    console.log("data[0].dx", data[0].dx);
     //   console.log("x(data[0].dx) - 1", x(data[0].dx) - 1);


        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(data[0].dx) - 1)
            .attr("height", function(d) { return height - y(d.y); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", x(data[0].dx) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    }




});
