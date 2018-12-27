

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.dataTableDetail= {};
    $scope.data = [];
    $scope.workpieceForceY = [];

    $scope.product;
    $scope.lstModel = [];


    $scope.workpieces_group;


    $scope.selectedProcess;


    $scope.responseWorkpiece;


    $scope.colorChart = ['MediumSlateBlue','DarkTurquoise','DarkOrange','DeepPink'];




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

    $scope.msToTime = function (duration) {
        var myDate = new Date( duration*1000);
        return myDate;
    }

    $scope.goToByScroll = function (id){
        // Reove "link" from the ID
        //id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
                scrollTop: $("#"+id).offset().top},
            'slow');
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
                $scope.lstModel.push("Unknown");
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

    $scope.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

        //startTime = $scope.toTimestamp($("#startTime").find("input").val())    ;
        //endTime =  $scope.toTimestamp($("#endTime").find("input").val());

        startTime = $("#startTime").find("input").val();
        endTime =  $("#endTime").find("input").val();


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
            "PROCESS_NAME" : $scope.selectedProcess,
            //"LIST_PROCESS_NAME": selectedProcessArr,//process,
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  pr,
            "START_TIME": startTime,
            "lst_model" : models,
            //"startDateFormat" : startDateFormat,
            //"endDateFormat" :  endDateFormat
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
            url: "/v1/api/fukoku/maria-db/workpiece/cycle-time",
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
                           // uclValue.push(response.workpieces[i].ucl_values[j]);
                            //lclValue.push(response.workpieces[i].lcl_values[j]);
                            //graphIndex++

                          //  console.log("model",response.workpieces[i].bar_values[j][3])

                        }



                    }

                    response.workpieces[i].id = i+1;
                    cycleValue.push(response.workpieces[i].cycle_values);
                    workpieces.push(response.workpieces[i]);

                }




                console.log("dataTable workpiece", workpieces);
                //console.log("cycleValue", cycleValue);
                //console.log("Workpiecs-1000", workpieces);
                //console.log("jsonWorkpiecesData", jsonWorkpiecesData);


                var dataArrObj = [];



                /*
                var typeIndex = 1;
               for(m=0;m<$scope.lstModel.length;m++){
                   var newDataValue = [];
                    for(var dv=0;dv< dataValue.length;dv++){
                        console.log("dataValue",dataValue[dv][3]);
                        if($scope.lstModel[m] == dataValue[dv][3]){
                            newDataValue.push(dataValue[dv]);
                        }
                    }

                   if(newDataValue.length > 0){
                       var dataValueObj1 = {};
                       dataValueObj1.key = "RD-"+$scope.lstModel[m];
                       //dataValueObj1.type = "bar";
                       dataValueObj1.values = newDataValue;
                       //dataValueObj1.yAxis =  ( m & 1 ) ? 1 : 2;//$scope.getRandomInt(1,2);
                       //dataValueObj1.disabled = false;
                       dataValueObj1.bar = true;
                       dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);
                   }

                   typeIndex++;
                 //   console.log("lstModel",$scope.lstModel[m]);
                }
                */



                var dataValueObj1 = {};
                dataValueObj1.key = "Data";
                dataValueObj1.bar = true;
                dataValueObj1.values = dataValue;
                dataValueObj1.color = "MediumSlateBlue"
                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                /*
                // Fuchsia","Aqua"
                var dataValueObj2 = {};
                dataValueObj2.key = "USL";
                dataValueObj2.values = uclValue;
                dataValueObj2.bar = false;
                dataValueObj2.color = "Lime"
                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);

                var dataValueObj3 = {};
                dataValueObj3.key = "LSL";
                dataValueObj3.values = lclValue;
                dataValueObj3.bar = false;
                dataValueObj3.color = "Red"
                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
                */



                console.log("dataArrObj", dataArrObj);

                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataArrObj));
                var downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download",  "test.json");
                //downloadAnchorNode.click();
               // downloadAnchorNode.remove();


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
                            start_time: d[5],
                            end_time: d[6],
                            ds: d[7],
                            pc: d[8],
                            wp_cycle: d[9]
                        }
                    });
                    return series;
                });



                //console.log($scope.data);

                $scope.totalFound = "<h3>검색결과: "+response.totalWorkpiece+" 건</h3>";

                $scope.generateGraph();


                closeLoading();
                $("#filteringResult").show();


            }else{

                closeLoading();

                $scope.workpieceForceY =[0,0];

                workpieces = [];
                $scope.data = [];

                $scope.workpieces_group = [];

                console.log("No data");
                $scope.generateGraph();

                $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                    "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                    "              </div>";

                //$scope.totalFound = "<h3>검색결과: 0 건</h3>";

                //closeLoading();
            }








        });

        post.error(function (data, status) {
            console.log(data);
        });
    }

    $scope.findString = function(string, char){
        for(var i=0;i<string.length;i++)
        {
            if(string.charAt(i)==char){
                console.log(i);
                return true;
            }
        }
        return false;
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
                color: ["red" , "green" , "blue","Orange","Fuchsia","Aqua"],
                x: function(d,i) { return i },
                xAxis: {
                    //axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        //console.log("xAxis : " , d3.time.format('%x %H:%M:%S')(new Date(dx)));
                        if (dx > 0) {
                            return "("+$scope.data[0].values[d].model+") " /* $scope.data[0].values[d].seq+"_"+$scope.data[0].values[d].in_seq +". " */ +d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(dx))
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
                            "<td class='x-value'>(" +  data.seq+")</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td class='key'>공정:</td>" +
                            "<td class='x-value'><strong>" + data.process + "</strong></td>" +
                            "</tr>"+
                            "<td class='key'>품종:</td>" +
                            "<td class='x-value'><strong>" + data.model + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Start Time</td>" +
                            "<td class='x-value'><strong>" + d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(data.start_time))   + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>End Time</td>" +
                            "<td class='x-value'><strong>" +  d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(data.end_time))   + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Workpiece cycle</td>" +
                            "<td class='x-value'><strong>" + data.wp_cycle + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Daily Seq</td>" +
                            "<td class='x-value'><strong>" + data.ds + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Product cycle</td>" +
                            "<td class='x-value'><strong>" + data.pc + "</strong></td>" +
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
                            console.log('click') ;
                        }
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                },
                callback: function(chart) {
                    //console.log('in callback');
                    // ["red" , "green" , "blue","Orange","Fuchsia","Aqua"]
                    $scope.distinctColor();

                                        var setBrushEv = 0;
                                        chart.dispatch.on( 'brush', function (b) {

                                            if(!setBrushEv) {
                                                b.brush.on('brush.own', function() {
                                                    //console.log(b);
                                                    ///setTimeout(function(){
                                                        $scope.distinctColor();
                                                   // }, 3000);
                                                })
                                                setBrushEv = 1;
                                            }

                                        });


                }

            }
        };
    }


    $scope.distinctColor = function(){
        if($scope.lstModel.length > 1){
            var getBarColor = [];
            d3.selectAll('rect.nv-bar')
                .style('fill', function(data, index) {
                    //console.log('data.y: ',data.model);
                    for(lm=0;lm< $scope.lstModel.length ;lm++){
                        if($scope.lstModel[lm] == data.model){
                            getBarColor.push([$scope.colorChart[lm],data.model]);
                            return $scope.colorChart[lm];
                        }
                    }
                });


            var newBarColor = getBarColor.map(JSON.stringify).reverse().filter(function (e, i, a) {
                return a.indexOf(e, i+1) === -1;
            }).reverse().map(JSON.parse) ;
            //console.log(newBarColor);
            $("#labelCir").empty();
            for(lm=0;lm< newBarColor.length ;lm++){
                $("#labelCir").append(
                    '<span style="background-color: '+newBarColor[lm][0]+';" class="dot"></span>&nbsp'+ newBarColor[lm][1] +"&nbsp&nbsp&nbsp"
                )
            }
        }



    }


    /*
    $scope.generateGraph = function () {

        $scope.options = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 100,
                    bottom: 70,
                    left: 70
                },
                color: ["red" , "green" , "blue","Orange","Fuchsia","Aqua"],// d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                yDomain1: $scope.workpieceForceY,
                yDomain2: $scope.workpieceForceY,
                duration: 500,
                xAxis: {
                    tickFormat: function(d){
                        return  d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(d));
                    },
                    rotateLabels: 30,
                },
                yAxis1: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },tooltip: {
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
                           // "<tr>" +
                            //"<td class='key'>" + 'Seq: ' + "</td>" +
                            //"<td class='x-value'>(" +  data.seq+"."+data.in_seq + ")</td>" +
                            //"</tr>" +
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
                }

            }
        };



       // $scope.data = generateData();

        console.log("generateData()",generateData());

        function generateData(){
            var testdata = stream_layers(7,10+Math.random()*100,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a})
                };
            });


            testdata[0].type = "line"
            testdata[0].yAxis = 1
            testdata[1].type = "line"
            testdata[1].yAxis = 2
            testdata[2].type = "bar"
            testdata[2].yAxis = 2
            testdata[3].type = "bar"
            testdata[3].yAxis = 2
            testdata[4].type = "bar"
            testdata[4].yAxis = 2

            console.log(testdata);

            return testdata;
        }

       // Inspired by Lee Byron's test data generator.

        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }

    }

    */








});
