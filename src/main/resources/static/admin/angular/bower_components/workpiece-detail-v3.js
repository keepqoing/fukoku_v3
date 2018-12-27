

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.data = [];
    $scope.workpieceForceY = [];

    $scope.product;
    $scope.pohashikan;
    $scope.uph;


    $scope.sum_total_product=0;
    $scope.sum_good_product=0;
    $scope.sum_bad_product=0;

    $scope.st;
    $scope.et;

    $scope.selectedModel;

    $scope.selectedProcess;

    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
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
                $scope.product = response.products;
            }
        });
        post.error(function (data, status) {
            console.log(data);
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
            $('#lineList').empty();
            if(response.products.length > 0){
                console.log("response > 0" , response.products )
                $scope.product = response.products;
            }else{
                $scope.findAllProducts();
                //console.log("response 0" , tempData);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }

    $scope.findProductByLineAndMachine($("#line").text() , $("#machine").text() );

    $scope.generateGraph = function () {

        $scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 100,
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
                color: ['#2ca02c', 'red','blue','#f39c12'],
                x: function(d,i) { return i },
                xAxis: {
                    //axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        //console.log("xAxis : " , d3.time.format('%x %H:%M:%S')(new Date(dx)));
                        if (dx > 0) {
                            return "("+$scope.data[0].values[d].seq +"."+$scope.data[0].values[d].in_seq+") "+d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(dx))
                        }
                        return null;
                    },
                    rotateLabels: 30,
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        //console.log("x2Axis : " , d3.time.format('%b-%Y')(new Date(dx)));
                        //return d3.time.format('%Y-%b-%d')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    //axisLabel: 'Y1 Axis',
                    tickFormat: function(d){
                        //console.log("y1Axis d",d3.format(',f')(d));
                        return d3.format(',f')(d)
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    //axisLabel: 'Y2 Axis',
                    tickFormat: function(d) {
                        //console.log("y1Axis : " + '$' + d3.format(',.2f')(d));
                        return  d3.format(',.f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        //console.log("y3Axis : ", d);
                        return d3.format(',f')(d)
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        //console.log("y4Axis : ", d);
                        return '$' + d3.format(',.2f')(d)
                    }
                },
                tooltip: {
                    contentGenerator: function (graph) { //return html content
                        var data = null;
                        if(graph.data != null){
                            data = graph.data;
                            //console.log("graph.data" , graph.data);
                        }else if(graph.point != null){
                            data = graph.point;
                            //console.log("graph.point" , graph.point);
                        }
                        //console.log("data" , $scope.data);
                        //console.log("graph" , graph);
                        var rows =
                            "<tr>" +
                            "<td class='key'>" + 'Seq: ' + "</td>" +
                            "<td class='x-value'>(" +  data.seq+"."+data.in_seq + ")</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td class='key'>" + 'Time: ' + "</td>" +
                            "<td class='x-value'>" +  d3.time.format('%x %H:%M:%S')(new Date(data.date)) + "</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td class='key'>공정:</td>" +
                            "<td class='x-value'><strong>" + data.process + "</strong></td>" +
                            "</tr>"+
                            "<td class='key'>품종:</td>" +
                            "<td class='x-value'><strong>" + data.model + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Data</td>" +
                            "<td class='x-value'><strong>" + data.y + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>USL</td>" +
                            "<td class='x-value'><strong>" + data.usl + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>LSL</td>" +
                            "<td class='x-value'><strong>" + data.lsl + "</strong></td>" +
                            "</tr>"+
                            "<tr>";

                        var header =
                            "<thead>" +
                            "<tr>" +
                            "<td class='legend-color-guide'><div style='background-color: " + data.color + ";'></div></td>" +
                            "<td class='key'><strong>" + data.id + ". " + data.name + "</strong></td>" +
                            "</tr>" +
                            "</thead>";

                        return "<table>" +
                            //header +
                            "<tbody>" +
                            rows +
                            "</tbody>" +
                            "</table>";

                        return '<h1></h1>';
                    }
                },
                // line chart events
                lines: {
                    dispatch: {
                        elementClick: function(e){
                           // console.log('click')
                        }
                    }
                }

            }
        };
    }


    $scope.getData = function () {

        startTime = $scope.toTimestamp($("#startTime").find("input").val())    ;
        endTime =  $scope.toTimestamp($("#endTime").find("input").val());

        if( $("#selectProduct").val() == ""){
            alert("Please select 품종!");
            return;
        }

        $scope.selectedModel = $("#selectProduct").val();

        $scope.totalFound = "";

        openLoading();

        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "LIST_PROCESS_NAME": process,
            //"PROCESS_NAME" : $scope.selectedProcess,//process[0],
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":   $("#selectProduct").val(),
            "START_TIME": startTime
            //"LIMIT": limitWorkpiece
        };
        console.log(data);

        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-group-workpiece-detail-v3",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {
            console.log("response",response);
            if( response.groupWorkpieces != null  || response.groupWorkpieces.length != 0){

                $scope.totalFound ="";
                $("#showData").show();

                $scope.machine =  machineName;//$("#machine").text();

                if(response.groupWorkpieces.length != 0){

                    $scope.workpieceForceY = [response.groupWorkpieces[response.groupWorkpieces.length-1].min_rd,response.groupWorkpieces[response.groupWorkpieces.length-1].max_rd];

                    var dataValue = [];
                    var uclValue = [];
                    var lclValue = [];
                    var countGraph=0;
                    for(i=0;i<response.groupWorkpieces.length;i++) {
                        for (j = 0; j < response.groupWorkpieces[i].bar_values.length; j++) {
                            dataValue.push(response.groupWorkpieces[i].bar_values[j]);
                            uclValue.push(response.groupWorkpieces[i].ucl_values[j]);
                            lclValue.push(response.groupWorkpieces[i].lcl_values[j]);
                            countGraph++;
                            if(countGraph > 3000) break;
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

                    $scope.data = dataArrObj.map(function(series) {
                        series.values = series.values.map(function(d) {
                            return {
                                x: d[0],
                                y: d[1],
                                process: d[2],
                                model: d[3],
                                seq: d[4],
                                usl: d[5],
                                lsl: d[6],
                                date: d[7],
                                in_seq: d[8]
                            }
                        });
                        return series;
                    });

                    console.log("$scope.data",$scope.data);

                    $scope.generateGraph();



                    $scope.selectedProcess = processHTML1.trim().slice(0, -1);
                    // Find CPK
                    var lsl = response.groupWorkpieces[response.groupWorkpieces.length-1].avg_lsl;
                    var usl = response.groupWorkpieces[response.groupWorkpieces.length-1].avg_usl;
                    var c = (usl - lsl) / 2;
                    //console.log("c" , c);
                    var k = ( c -  (response.groupWorkpieces[response.groupWorkpieces.length-1].total_rd / response.groupWorkpieces[response.groupWorkpieces.length-1].freq_total_wp_cycle )  / response.groupWorkpieces.length) / c;
                    //console.log("cpk" , Number(k).toFixed(2));
                    $scope.cpk =  Number(k).toFixed(2);
                    // End CPK

                    // Find 부하시간
                    $scope.st  = $("#startTime").find("input").val();
                    $scope.et = $("#endTime").find("input").val();
                    var startHours = $scope.toTimestamp($("#endTime").find("input").val());
                    var endHours = $scope.toTimestamp($("#startTime").find("input").val());
                    var workingTime = startHours - endHours;
                    var toHour = Math.floor(workingTime / (60 * 60));
                    var ds = response.groupWorkpieces[response.groupWorkpieces.length-1].max_total_product ;
                    var result = ds / toHour;
                    //console.log(Number(result).toFixed(2)  + " && " + result);
                    $scope.pohashikan = Number(result).toFixed(2);
                    // End 부하시간

                    // Find UPH
                    $scope.uph = ds / result;
                    // End UPH

                    // Find 생산수량 (total product), 양품수량 (good), 불량수량 (bad)
                    $scope.sum_total_product=0;
                    $scope.sum_good_product=0;
                    $scope.sum_bad_product=0;
                    for(t=0;t<response.groupWorkpieces.length;t++){
                        $scope.sum_total_product += response.groupWorkpieces[t].total_product;
                        $scope.sum_good_product += response.groupWorkpieces[t].total_good_product;
                        $scope.sum_bad_product += response.groupWorkpieces[t].total_detective_product;
                    }

                    $scope.cp =  response.groupWorkpieces[response.groupWorkpieces.length-1].cp;
                    $scope.ppk =  response.groupWorkpieces[response.groupWorkpieces.length-1].ppk;
                    $scope.avgLSL =  response.groupWorkpieces[response.groupWorkpieces.length-1].avg_lsl;
                    $scope.avgUSL =  response.groupWorkpieces[response.groupWorkpieces.length-1].avg_usl;
                    var readData = response.groupWorkpieces[response.groupWorkpieces.length-1].total_rd / response.groupWorkpieces[response.groupWorkpieces.length-1].freq_total_wp_cycle;
                    $scope.avgRD =  Number(readData).toFixed(2);


                    $scope.dataTable = $('#dataTable').DataTable({
                        "paging": true,
                        "lengthChange": true,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        "autoWidth": true,
                        "data": response.groupWorkpieces,
                        "destroy": true,
                        "columns": [{
                            "title": "#",
                            "data": "id"
                        }, {
                            "title": "품종",
                            "data": "model"

                        }, {
                            "title": "START TIME",
                            "data": "cvt_start_time"

                        }, {
                            "title": "END TIME",
                            "data": "cvt_end_time"

                        }, {
                            "title": "AVG LSL",
                            "data": "avg_lsl"

                        }, {
                            "title": "AVG USL",
                            "data": "avg_usl"
                        },{
                            "title":"공정",
                            "data":"process_name"
                        },{
                            "title": "Max RD",
                            "data": "max_rd"
                        },{
                            "title": "생산수량",
                            "data": "total_product"
                        },{
                            "title": "양품수량",
                            "data": "total_good_product"
                        },{
                            "title": "불량수량",
                            "data": "total_detective_product"
                        },{
                            "title":"Freq",
                            "data": "freq_total_wp_cycle"
                        }

                        ]
                    });





                }else{
                    console.log("XR No data!");
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
            console.log(data);
        });
    }


});
