

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.data = [];
    $scope.workpieceForceY = [];

    $scope.product;
    $scope.lstModel = [];


    $scope.workpieces_group;


    $scope.selectedProcess;


    $scope.responseWorkpiece;




    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }


    $scope.formatDateTime = function date2str(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
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
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }
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
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }


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

    /*
    $scope.limitWorkpiece = 50;

    $scope.btNext = function () {
        workpieces = [];
        $("#dataTable").find("tr:not(:first)").remove();
        //$("#chart").empty();
        $scope.limitWorkpiece += 50
        $scope.getData($scope.limitWorkpiece);
    }
    */

    $scope.getData = function (limitWorkpiece) {

        $scope.selectedProcess = $('input[name=optionsRadios]:checked').val();

        var selectedProcessArr = [];

        if( $scope.selectedProcess == null){
            alert("Please select 공정: !");
            return;
        }else{
            selectedProcessArr.push($scope.selectedProcess);
        }

        if( $("#selectProduct").val() == ""){
            alert("Please select 품종!");
            return;
        }

        openLoading();

        startTime = $scope.toTimestamp($("#startTime").find("input").val())    ;
        endTime =  $scope.toTimestamp($("#endTime").find("input").val());

        startDateFormat = $scope.formatDateTime($("#startTime").find("input").val() )    ;
        endDateFormat = $scope.formatDateTime($("#endTime").find("input").val())    ;

        var pr =  $("#selectProduct").val();
        var models = [];
        if(pr == "ALL"){
            pr = "ALL";
            models = $scope.lstModel;
        }else{
            models.push(pr);
        }

        $scope.totalFound = "";


        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "LIST_PROCESS_NAME": selectedProcessArr,//process,
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  pr,
            "START_TIME": startTime,
            "lst_model" : models,
            "startDateFormat" : startDateFormat,
            "endDateFormat" :  endDateFormat
            //"LIMIT": limitWorkpiece
        };

        console.log(data);

        /*
        console.log($scope.selectProductTest);
        console.log($scope.txStartTime);
        console.log($scope.txEndTime);


        return;



        var data = {
            "END_TIME": "1518102000",
            "LINE_NAME": "HC",
            "LIST_PROCESS_NAME": [
                "평판도"
            ],
            "MACHINE_NAME": "HC_TP",
            "MODEL": "DS7E",
            "START_TIME": "1514905200"
        };
        */


        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/mybatis-find-workpiece-or-process-model-group",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {

            console.log(response);


            if(response.code == "200" ){

               if(response.workpieces.length == 0){
                   $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                       "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                       "              </div>";
                   closeLoading();
                     return;
               }

                $scope.workpieces_group = response.workpieces_group;

                workpieces = [];
                $scope.data = [];

                $scope.workpieceForceY = [response.nvd3Graph.minBar,response.nvd3Graph.maxBar];

                angular.element( document.querySelector( '#filteringMessage' ) ).empty();

                jsonWorkpiecesData = response.workpieces;

                //console.log("workpiece",response.workpieces.length);
                //console.log("graph",response.workpieces[response.workpieces.length-1].count_graph);

                var dataValue = [];
                var uclValue = [];
                var lclValue = [];
                var cycleValue = [];
                if(response.workpieces.length < limit){
                    limit = response.workpieces.length;
                }else{
                    limit = response.workpieces.length;
                }
                for (i = 0; i < limit; i++) {
                    //var graphIndex = i;
                    //var workpieceLength = response.workpieces.length;
                    //console.log("bar_values.length "+i , response.workpieces[i].bar_values.length);

                    if(response.workpieces[i].bar_values != null || response.workpieces[i].lcl_values != null || response.workpieces[i].ucl_values != null){
                        for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                            //console.log(graphIndex);
                            dataValue.push(response.workpieces[i].bar_values[j]);
                            uclValue.push(response.workpieces[i].ucl_values[j]);
                            lclValue.push(response.workpieces[i].lcl_values[j]);

                            //graphIndex++
                        }
                    }

                    cycleValue.push(response.workpieces[i].cycle_values);
                    workpieces.push(response.workpieces[i]);

                }

                console.log("dataTable workpiece", workpieces);
                //console.log("cycleValue", cycleValue);
                //console.log("Workpiecs-1000", workpieces);
                //console.log("jsonWorkpiecesData", jsonWorkpiecesData);


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

                    //uclVal[p][0] =  startDate; //time
                    //uclVal[p][1] =  workpiece.getUcl(); // bar
                    //uclVal[p][2] =  startDate; // time
                    //uclVal[p][3] =  workpiece.getProcessName(); // ProcessName
                    //uclVal[p][4] = "darkred"; // color
                    //uclVal[p][5] = workpiece.getPrdCycle();    // product cycle

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



                //console.log($scope.data);

                $scope.totalFound = "<h3>검색결과: "+response.workpieces.length+" 건</h3>";

                $scope.generateGraph();


                $("#selectItem").text(processHTML1.trim().slice(0, -1));
                $("#fStartDate").text($("#startTime").find("input").val());
                $("#fEndDate").text($("#endTime").find("input").val());
                /*
                $("#fModel").text(response.workpieces[response.workpieces.length-1].model);
                $("#fDs").text(response.workpieces[response.workpieces.length-1].max_ds);
                $("#fDsok").text(response.workpieces[response.workpieces.length-1].good_quality);
                $("#fDsNg").text(response.workpieces[response.workpieces.length-1].bad_quality);

                $("#fCp").text(response.workpieces[response.workpieces.length-1].cp);

                var lsl = response.workpieces[response.workpieces.length-1].lcl;
                var usl = response.workpieces[response.workpieces.length-1].ucl;
                var c = (usl - lsl) / 2;
                console.log("c" , c);
                var k = ( c -  response.workpieces[response.workpieces.length-1].avg_product_max_rd  / response.workpieces.length) / c;

                $("#fCpk").text( Number(k).toFixed(2));

                var startHours = $scope.toTimestamp($("#endTime").find("input").val());
                var endHours = $scope.toTimestamp($("#startTime").find("input").val());
                console.log(endHours - startHours);
                var workingTime = startHours - endHours;
                var toHour = Math.floor(workingTime / (60 * 60));
                var ds = response.workpieces[response.workpieces.length-1].max_ds;
                var result = ds / toHour;
                var result2 = ds / response.workpieces[response.workpieces.length-1].working_time;
                console.log("result: " + result +" - result2: "+result2);

                //alert(new Date(endHours).getHours() + " - " +  new Date(startHours).getHours() + " = " + new Date(endHours).getHours() - new Date(startHours).getHours());

                console.log(Number(result).toFixed(2)  + " && " + result);
                $("#fshikan").text(  Number(result).toFixed(2)   );

                $("#fUph").text(ds / result);
                */



                $scope.dataTable = $('#dataTable').DataTable({
                    "paging": true,
                    "lengthChange": true,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": true,
                    "data": workpieces,
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
                        "title": "LSL",
                        "data": "avg_lsl"

                    }, {
                        "title": "USL",
                        "data": "avg_usl"
                    },{
                        "title":"공정",
                        "data":"process_name"
                    },{
                        "title": "측정량",
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

                    //,{
                    //    "title": "비고",
                    //    "data": "product_quality"
                    //}

                    ]
                });

            }else{

                $scope.workpieceForceY =[0,0];

                workpieces = [];
                $scope.data = [];

                $scope.workpieces_group = [];

                console.log("No data");
                $scope.generateGraph();

                $scope.dataTable = $('#dataTable').DataTable({
                    "paging": true,
                    "lengthChange": true,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": true,
                    "data": workpieces,
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
                        "title": "LSL",
                        "data": "avg_lsl"

                    }, {
                        "title": "USL",
                        "data": "avg_usl"
                    },{
                        "title":"공정",
                        "data":"process_name"
                    },{
                        "title": "측정량",
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
                        //,{
                        //    "title": "비고",
                        //    "data": "product_quality"
                        //}

                    ]
                });

                $("#selectItem").text(processHTML1.trim().slice(0, -1));
                $("#fModel").text(pr);
                $("#fStartDate").text($("#startTime").find("input").val());
                $("#fEndDate").text($("#endTime").find("input").val());
                $("#fDs").text("");
                $("#fDsok").text("");
                $("#fDsNg").text("");
                $("#fCp").text("");
                $("#fshikan").text("");
                $("#fUph").text("");
                $("#fCpk").text("");

                $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                    "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                    "              </div>";

                //$scope.totalFound = "<h3>검색결과: 0 건</h3>";
            }



            closeLoading();




        });

        post.error(function (data, status) {
            console.log(data);
        });
    }

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




    /*
    $scope.data = [
        {
            "key" : "Data" ,
            "bar": true,
            "values" : [
                [ 1516392112000 , -1200000,1516392112000,"Test Name",'#2ca02c'],  [ 1516392112000 , -5271000.0], [ 1516392112000 , 9271000.0]  , [ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0]
                ,[ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0], [ 1516392112000 , 9271000.0]  , [ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0]
                ,[ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0], [ 1516392112000 , 9271000.0]  , [ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0]
                ,[ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0], [ 1516392112000 , 9271000.0]  , [ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0]
                ,[ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0], [ 1516392112000 , 9271000.0]  , [ 1516392112000 , 1271000.0],  [ 1516392112000 , 5271000.0]
            ]
        },
        {
            "key" : "UCL" ,
            "bar": false,
            "values" : [
                [ 1516392112000 , -92.0,1516392112000,"Test Name",'darkred'],  [ 1516392112000 , 60.0], [ 1516392112000 , 80.0]  , [ 1516392112000 , 76.0],  [ 1516392112000 , 85.0]
                ,[ 1516392112000 , 92.0],  [ 1516392112000 , 60.0], [ 1516392112000 , 80.0]  , [ 1516392112000 , 76.0],  [ 1516392112000 , 85.0]
                ,[ 1516392112000 , 92.0],  [ 1516392112000 , 60.0], [ 1516392112000 , 80.0]  , [ 1516392112000 , 76.0],  [ 1516392112000 , 85.0]
                ,[ 1516392112000 , 92.0],  [ 1516392112000 , 60.0], [ 1516392112000 , 80.0]  , [ 1516392112000 , 76.0],  [ 1516392112000 , 85.0]
                ,[ 1516392112000 , 92.0],  [ 1516392112000 , 60.0], [ 1516392112000 , 80.0]  , [ 1516392112000 , 76.0],  [ 1516392112000 , 85.0]
            ]
        },
        {
            "key" : "LCL" ,
            "bar": false,
            "values" : [
                [ 1516392112000 , -22.0,1516392112000,"Test Name",'#07C'],  [ 1516392112000 , 33.0], [ 1516392112000 , 44.0]  , [ 1516392112000 , 22.0],  [ 1516392112000 , 49.0]
                ,[ 1516392112000 , 22.0],  [ 1516392112000 , 33.0], [ 1516392112000 , 44.0]  , [ 1516392112000 , 22.0],  [ 1516392112000 , 49.0]
                ,[ 1516392112000 , 22.0],  [ 1516392112000 , 33.0], [ 1516392112000 , 44.0]  , [ 1516392112000 , 22.0],  [ 1516392112000 , 49.0]
                ,[ 1516392112000 , 22.0],  [ 1516392112000 , 33.0], [ 1516392112000 , 44.0]  , [ 1516392112000 , 22.0],  [ 1516392112000 , 49.0]
                ,[ 1516392112000 , 22.0],  [ 1516392112000 , 33.0], [ 1516392112000 , 44.0]  , [ 1516392112000 , 22.0],  [ 1516392112000 , 49.0]
            ]
        }
    ].map(function(series) {
        series.values = series.values.map(function(d) { return {x: d[0], y: d[1], time:d[2] , name:d[3], color:d[4] } });
        return series;
    });
    */

    /*
    $scope.data = [
        {
            "key" : "Data" ,
            "bar": true,
            "values" : [
                { "time":1516392112000 ,  "data":-1200000,      "index":1},
                { "time":1516392112000 ,  "data":-5271000.0,    "index":2},
                { "time":1516392112000 ,  "data":9271000.0,     "index":3},
                { "time":1516392112000 ,  "data":1271000.0,     "index":4},
                { "time":1516392112000 ,  "data":5271000.0,     "index":5},
                {  "time":1516392112000 , "data":1271000.0,     "index":6},
                { "time":1516392112000 ,  "data":-1200000,      "index":1},
                { "time":1516392112000 ,  "data":-5271000.0,    "index":2},
                { "time":1516392112000 ,  "data":9271000.0,     "index":3},
                { "time":1516392112000 ,  "data":1271000.0,     "index":4},
                { "time":1516392112000 ,  "data":5271000.0,     "index":5},
                {  "time":1516392112000 , "data":1271000.0,     "index":6},
                { "time":1516392112000 ,  "data":-1200000,      "index":1},
                { "time":1516392112000 ,  "data":-5271000.0,    "index":2},
                { "time":1516392112000 ,  "data":9271000.0,     "index":3},
                { "time":1516392112000 ,  "data":1271000.0,     "index":4},
                { "time":1516392112000 ,  "data":5271000.0,     "index":5},
                {  "time":1516392112000 , "data":1271000.0,     "index":6},
                { "time":1516392112000 ,  "data":-1200000,      "index":1},
                { "time":1516392112000 ,  "data":-5271000.0,    "index":2},
                { "time":1516392112000 ,  "data":9271000.0,     "index":3},
                { "time":1516392112000 ,  "data":1271000.0,     "index":4},
                { "time":1516392112000 ,  "data":5271000.0,     "index":5},
                {  "time":1516392112000 , "data":1271000.0,     "index":6},
                { "time":1516392112000 ,  "data":-1200000,      "index":1},
                { "time":1516392112000 ,  "data":-5271000.0,    "index":2},
                { "time":1516392112000 ,  "data":9271000.0,     "index":3},
                { "time":1516392112000 ,  "data":1271000.0,     "index":4},
                { "time":1516392112000 ,  "data":5271000.0,     "index":5},
                {  "time":1516392112000 , "data":1271000.0,     "index":6}
            ]
        },
        {
            "key" : "UCL" ,
            "values" : [
                { "time":1516392112000 ,    "ucl":-92.0,    "index":1},
                { "time":1516392112000 ,    "ucl":60.0,    "index":2},
                { "time":1516392112000 ,    "ucl":80.0,    "index":3},
                { "time":1516392112000 ,    "ucl":76.0,    "index":4},
                { "time":1516392112000 ,    "ucl":85.0,    "index":5},
                { "time":1516392112000 ,    "ucl":92.0,    "index":6},
                { "time":1516392112000 ,    "ucl":-92.0,    "index":1},
                { "time":1516392112000 ,    "ucl":60.0,    "index":2},
                { "time":1516392112000 ,    "ucl":80.0,    "index":3},
                { "time":1516392112000 ,    "ucl":76.0,    "index":4},
                { "time":1516392112000 ,    "ucl":85.0,    "index":5},
                { "time":1516392112000 ,    "ucl":92.0,    "index":6},
                { "time":1516392112000 ,    "ucl":-92.0,    "index":1},
                { "time":1516392112000 ,    "ucl":60.0,    "index":2},
                { "time":1516392112000 ,    "ucl":80.0,    "index":3},
                { "time":1516392112000 ,    "ucl":76.0,    "index":4},
                { "time":1516392112000 ,    "ucl":85.0,    "index":5},
                { "time":1516392112000 ,    "ucl":92.0,    "index":6},
                { "time":1516392112000 ,    "ucl":-92.0,    "index":1},
                { "time":1516392112000 ,    "ucl":60.0,    "index":2},
                { "time":1516392112000 ,    "ucl":80.0,    "index":3},
                { "time":1516392112000 ,    "ucl":76.0,    "index":4},
                { "time":1516392112000 ,    "ucl":85.0,    "index":5},
                { "time":1516392112000 ,    "ucl":92.0,    "index":6},
                { "time":1516392112000 ,    "ucl":-92.0,    "index":1},
                { "time":1516392112000 ,    "ucl":60.0,    "index":2},
                { "time":1516392112000 ,    "ucl":80.0,    "index":3},
                { "time":1516392112000 ,    "ucl":76.0,    "index":4},
                { "time":1516392112000 ,    "ucl":85.0,    "index":5},
                { "time":1516392112000 ,    "ucl":92.0,    "index":6},
            ]
        },
        {
            "key" : "LCL" ,
            "values" : [
                { "time":1516392112000 ,   "lcl":-22.0,    "index":1},
                { "time": 1516392112000 ,  "lcl":33.0,     "index":2},
                { "time":1516392112000 ,   "lcl":44.0,     "index":3},
                { "time":1516392112000 ,   "lcl":22.0,     "index":4},
                { "time":1516392112000,    "lcl": 49.0,    "index":5},
                { "time":1516392112000 , "lcl": 22.0,      "index":6},
                { "time":1516392112000 ,   "lcl":-22.0,    "index":1},
                { "time": 1516392112000 ,  "lcl":33.0,     "index":2},
                { "time":1516392112000 ,   "lcl":44.0,     "index":3},
                { "time":1516392112000 ,   "lcl":22.0,     "index":4},
                { "time":1516392112000,    "lcl": 49.0,    "index":5},
                { "time":1516392112000 , "lcl": 22.0,      "index":6},
                { "time":1516392112000 ,   "lcl":-22.0,    "index":1},
                { "time": 1516392112000 ,  "lcl":33.0,     "index":2},
                { "time":1516392112000 ,   "lcl":44.0,     "index":3},
                { "time":1516392112000 ,   "lcl":22.0,     "index":4},
                { "time":1516392112000,    "lcl": 49.0,    "index":5},
                { "time":1516392112000 , "lcl": 22.0,      "index":6},
                { "time":1516392112000 ,   "lcl":-22.0,    "index":1},
                { "time": 1516392112000 ,  "lcl":33.0,     "index":2},
                { "time":1516392112000 ,   "lcl":44.0,     "index":3},
                { "time":1516392112000 ,   "lcl":22.0,     "index":4},
                { "time":1516392112000,    "lcl": 49.0,    "index":5},
                { "time":1516392112000 , "lcl": 22.0,      "index":6},
                { "time":1516392112000 ,   "lcl":-22.0,    "index":1},
                { "time": 1516392112000 ,  "lcl":33.0,     "index":2},
                { "time":1516392112000 ,   "lcl":44.0,     "index":3},
                { "time":1516392112000 ,   "lcl":22.0,     "index":4},
                { "time":1516392112000,    "lcl": 49.0,    "index":5},
                { "time":1516392112000 , "lcl": 22.0,      "index":6}
            ]
        }
    ];
    */








});
