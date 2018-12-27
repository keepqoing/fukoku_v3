

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.data = [];
    $scope.workpieceForceY = [];
    $scope.chartData=[];
    $scope.graphWidth=960;

    $scope.product;

    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
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
                $scope.product = tempData;
                console.log("response 0" , tempData);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
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
                $scope.product = response.products;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }

    //$scope.findAllProducts();
    $scope.findProductByLineAndMachine($("#line").text() , $("#machine").text() );

    $scope.getData = function (limitWorkpiece) {
        startTime = $("#startTime").find("input").val()    ;
        endTime =  $("#endTime").find("input").val();

        var param = startTime +"/"+ endTime +"/"+ $("#line").text()  +"/"+ $("#machine").text() +"/"+ $("#selectProduct").val()  +"/"+  process[0];
        //console.log(param);
        //$scope.generateGroupBarChart(param); return;

        if( $("#selectProduct").val() == ""){
            alert("Please select 품종!");
            return;
        }
        openLoading();

        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "LIST_PROCESS_NAME": process,
            "PROCESS_NAME" : process[0],
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  $("#selectProduct").val(),
            "START_TIME": startTime
            //"LIMIT": limitWorkpiece
        };
        console.log(data);
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/find-group-workpiece-cycle-time",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {
            console.log("response",response);
            if(response.code == "7777"){
                if(response.workpiecesCycleTime.length > 0){
                    //$("#groupBarChart").empty();
                    $scope.totalFound = "<h3>검색결과: "+response.workpiecesCycleTime.length+" 건</h3>";
                    //$scope.generateGroupBarChart(response.groupCharts);

                    var  bar_process_cycle= [];
                    var bar_pure_cycle = [];
                    var bar_pure_interval = [];
                    var bar_workpiece_cycle = [];
                    var countGraph=0;
                    for(i=0;i<response.workpiecesCycleTime.length;i++) {
                        for (j = 0; j < response.workpiecesCycleTime[i].bar_process_cycle.length; j++) {
                            bar_process_cycle.push(response.workpiecesCycleTime[i].bar_process_cycle[j]);
                            bar_pure_cycle.push(response.workpiecesCycleTime[i].bar_pure_cycle[j]);
                            bar_pure_interval.push(response.workpiecesCycleTime[i].bar_pure_interval[j]);
                            bar_workpiece_cycle.push(response.workpiecesCycleTime[i].bar_workpiece_cycle[j]);
                            countGraph++;
                        }
                        // if(countGraph > 2000) break;
                     }

                    var dataArrObj = [];
                    var dataValueObj4 = {};
                    dataValueObj4.key = "workpiece_cycle";
                    dataValueObj4.bar = true;
                    dataValueObj4.values = bar_workpiece_cycle;
                    dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj4);

                    var dataValueObj2 = {};
                    dataValueObj2.key = "pure_cycle";
                   dataValueObj2.bar = true;
                    dataValueObj2.values = bar_pure_cycle;
                    //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);

                    var dataValueObj1 = {};
                    dataValueObj1.key = "process_cycle";
                    dataValueObj1.bar = true;
                    dataValueObj1.values = bar_process_cycle;
                    //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

                    var dataValueObj3 = {};
                    dataValueObj3.key = "pure_interval";
                    dataValueObj3.bar = true;
                    dataValueObj3.values = bar_pure_interval;
                    //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);

                    console.log("$scope.data",$scope.data);
                    $scope.data = dataArrObj.map(function(series) {
                        series.values = series.values.map(function(d) {
                            return {
                                x: d[0],
                                y: d[1],
                                id: d[2],
                                workpiece_cycle:d[3],
                                pure_cycle: d[6],
                                process_cycle:d[4],
                                pure_interval:d[5],
                                freq_total_wp_cycle:d[7],
                                process:d[8],
                                model:d[9]
                            }
                        });
                        return series;
                    });
                    console.log($scope.data);

                    var dataArr = [
                        ['Year', 'Sales', 'Expenses', 'Profit','Test'],
                        ['2014', 1000, 400, 200,50],
                        ['2015', 1170, 460, 250,50],
                        ['2016', 660, 1120, 300,50],
                        ['2017', 1030, 540, 350,50],
                        ['2018', 1030, 540, 350,50],
                        ['2019', 1030, 540, 350,50],
                        ['2021', 1030, 540, 350,50],
                        ['2022', 1030, 540, 350,50],
                        ['2024', 1030, 540, 350,50],
                        ['2025', 1030, 540, 350,50],
                        ['2026', 1030, 540, 350,50],
                        ['2027', 1030, 540, 350,50],
                        ['2028', 1030, 540, 350,50]
                    ];

                    console.log("dataArr",dataArr);


                    $scope.linePlusBarChart(response.graphData);
                }else{
                    $scope.totalFound = "<div class='callout callout-warning'><h4><i class='icon fa fa-warning'></i>검색결과: 0 건</h4></div>";
                    $scope.data = [];
                    $scope.linePlusBarChart();
                }

            }else{

            }
            closeLoading();
        });

        post.error(function (data, status) {
            console.log(data);
        });
    }



    /*

    $scope.generateGroupBarChart = function (data) {

        //$("#groupBarChart").empty();

        console.log("get data again" , data.length);
        var mywidth = 1400;
       // if(data.length < 100){
         //   mywidth =800;
       // }

        var nestedData;

        var main_margin = {
                top: 25,
                right: 80,
                bottom: 160,
                left: 70
            },

            width = mywidth - main_margin.left - main_margin.right,
            mini_x_height = 10;
        main_height = 525 - main_margin.top - main_margin.bottom,

            mini_x_margin = {
                top: main_height,
                right: main_margin.right + 10,
                bottom: main_margin.bottom,
                left: main_margin.left + 10
            },

            mini_x_width = 900 - mini_x_margin.left - mini_x_margin.right,

            mini_y_margin = {
                top: main_margin.top + 10,
                right: 0,
                bottom: main_margin.bottom + 10,
                left: 0
            },
            mini_y_width = 10,
            mini_y_height = 525 - mini_y_margin.top - mini_y_margin.bottom;


        var color = d3.scale.category10();

        // x0 is the groups scale on the x axis.
        var main_x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.2);
        var mini_x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.2);



        var main_xZoom = d3.scale.linear()
            .range([0, width])
            .domain([0, width]);

        // x1 is the series scale on the x axis.
        var main_x1 = d3.scale.ordinal();
        var mini_x1 = d3.scale.ordinal();

        // y is the value scale on the y axis.
        var main_y0 = d3.scale.linear().range([main_height, 0]);

        var mini_y0 = d3.scale.linear().range([mini_y_height, 0]);

        var main_xAxis = d3.svg.axis()
            .scale(main_x0)
            .orient("bottom");

        var mini_xAxis = d3.svg.axis()
            .scale(mini_x0)
            .orient("bottom");

        var main_yAxis = d3.svg.axis()
            .scale(main_y0)
            .orient("left");

        var mini_yAxis = d3.svg.axis()
            .scale(mini_y0)
            .orient("left");

        var svg = d3.select("#groupBarChart").append("svg")
            .attr("width", width + main_margin.left + main_margin.right)
            .attr("height", main_height + main_margin.top + main_margin.bottom);

        var main = svg.append("g")
            .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

        main.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", main_height + mini_x_height + main_margin.bottom);

        var mini_x = svg.append("g")
            .attr("transform", "translate(" + mini_x_margin.left + "," + (main_margin.top + main_height) + ")")
            .attr("width", mini_x_width);

        var mini_y = svg.append("g")
            .attr("width", mini_y_width)
            .attr("transform", "translate(" + (main_margin.left - mini_y_width) + ", " + mini_y_margin.top + ")")
            .attr("height", mini_y_height);




        d3.csv("/static/admin/angular/bower_components/data.csv", function(error, data) {



        });


       // console.log(data);



       // data = [
            {
                "Country": "2018-03-01",
                "Year": "pure_cycle",
                "Cost": "1000"
            },
            {
                "Country": "2018-03-01",
                "Year": "pure_interval",
                "Cost": "1100"
            },
            {
                "Country": "2018-03-01",
                "Year": "process_cycle",
                "Cost": "11200"
            },
            {
                "Country": "2018-03-01",
                "Year": "workpiece_cycle",
                "Cost": "11200"
            }
        ];


        var seriesValues = d3.set(data.map(function(x){return x.Year;})).values().sort(d3.ascending);

        nestedData = d3.nest()
            .key(function(d) { return d.Country;})
            .sortKeys(d3.ascending)
            .sortValues(function(a, b) { return a.Year - b.Year; })
            .entries(data);

        var groupValues = d3.set(data.map(function (x) { return x.Country; })).values();

        // Define the axis domains
        main_x0.domain(groupValues);
        mini_x0.domain(groupValues);

        main_x1.domain(seriesValues).rangeRoundBands([0, main_x0.rangeBand()], 0);
        mini_x1.domain(seriesValues).rangeRoundBands([0, main_x0.rangeBand()], 0);

        main_y0.domain([0, d3.max(nestedData, function (d) { return d3.max(d.values, function (d) { return d.Cost; }); })]);
        mini_y0.domain(main_y0.domain());

        var xBrush = d3.svg.brush().x(mini_x0).on("brush", xBrushed);
        var yBrush = d3.svg.brush().y(mini_y0).on("brush", yBrushed);

        // Add the x axis
        main.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (main_height + mini_x_height) + ")")
            .attr("clip-path", "url(#clip)")
            .call(main_xAxis)
            .selectAll(".tick text")
            .style('text-anchor', 'end')
            .attr("transform", "rotate(30)" )
            .call(wrap, main_x0.rangeBand()
            );

        // Add the y axis
        main.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (-mini_y_width) + ", 0)")
            .call(main_yAxis)
            .append("text")
            .attr("transform", "rotate(-90), translate(" + -(main_height / 2) + ", " + -(mini_y_width + main_margin.left - 20) + ")")
            .attr("dy", ".71em")
            .style("text-anchor", "start");
            //.text("Avg  공정사이클타임분석");

        var x_arc = d3.svg.arc()
            .outerRadius(mini_x_height / 2)
            .startAngle(0)
            .endAngle(function(d, i) {
                return i ? -Math.PI : Math.PI;
            });

        var brush_x_grab = mini_x.append("g")
            .attr("class", "x brush")
            .call(xBrush);

        brush_x_grab.selectAll(".resize").append("path")
            .attr("transform", "translate(0," + mini_x_height / 2 + ")")
            .attr("d", x_arc);

        brush_x_grab.selectAll("rect").attr("height", mini_x_height);

        var y_arc = d3.svg.arc()
            .outerRadius(mini_y_width / 2)
            .startAngle(-(Math.PI/2))
            .endAngle(function(d, i) {
                return i ? -((3 * Math.PI) / 2) : ((Math.PI) / 2);
            });

        var brush_y_grab = mini_y.append("g")
            .attr("class", "y brush")
            .call(yBrush);

        brush_y_grab.selectAll(".resize").append("path")
            .attr("transform", "translate(" + (mini_y_width / 2) + ", 0)")
            .attr("d", y_arc);

        brush_y_grab.selectAll("rect").attr("width", mini_y_width);
       // console.log("(mini_y_width / 2)",(mini_y_width / 2));
        //console.log("mini_y_width",mini_y_width);

        // Create the main bars
        var bar = main.selectAll(".bars")
            .data(nestedData)
            .enter().append("g")
            .attr("clip-path", "url(#clip)")
            .attr("class", function(d) {
                return d.key + "-group bar";
            });

        bar.selectAll("rect")
            .data(function(d) {
                return d.values;
            })
            .enter().append("rect")
            .attr("class", function(d) {
                return d.Year;
            })
            .attr("transform", function(d) {
                return "translate(" + main_x0(d.Country) + ",0)";
            })
            .attr("width", function(d) {
                return main_x1.rangeBand();
            })
            .attr("x", function(d) {
                return main_x1(d.Year);
            })
            .attr("y", function(d) {
                return main_y0(d.Cost);
            })
            .attr("height", function(d) {
                return main_height - main_y0(d.Cost);
            })
            .style("fill", function (d) {
                return color(d.Year);
            });


        // Draws the series items onto a legend
        var legend = svg.selectAll(".legend")
            .data(seriesValues.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(50," + (main_margin.top + (i * 20)) + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

        // Called to re-draw the bars on the main chart when the brush on the x axis
        // has been altered.
        function xBrushed() {
            var originalRange = main_xZoom.range();
            main_xZoom.domain(xBrush.empty() ? originalRange : xBrush.extent());
            main_x0.rangeRoundBands([main_xZoom(originalRange[0]), main_xZoom(originalRange[1])], .1);

            main_x1.rangeRoundBands([0, main_x0.rangeBand()], 0);

            bar.selectAll("rect")
                .attr("transform", function (d) {
                    return "translate(" + main_x0(d.Country) + ",0)";
                })
                .attr("width", function (d) {
                    return main_x1.rangeBand();
                })
                .attr("x", function (d) {
                    return main_x1(d.Year);
                });

            main.select("g.x.axis").call(main_xAxis).selectAll(".tick text").call(wrap, main_x0.rangeBand());
        };

        // Called to re-draw the bars on the main chart when the
        // brush on the y axis has been altered.
        function yBrushed() {
            main_y0.domain(yBrush.empty() ? mini_y0.domain() : yBrush.extent());

            bar.selectAll("rect")
                .attr("y", function(d) {
                    return main_y0(d.Cost);
                })
                .attr("height", function(d) {
                    return main_height - main_y0(d.Cost);
                });

            main.select("g.y.axis").call(main_yAxis);
        };

        // This comes from the example at http://bl.ocks.org/mbostock/7555321
        // for wrapping long axis tick labels
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        };

        // Set the initial brush selections.
        // svg.select(".x.brush").call(xBrush.extent(main_xZoom.domain()));
        svg.select(".x.brush").call(xBrush.extent([0,610]));
        svg.select(".y.brush").call(yBrush.extent(mini_y0.domain()));


        // Forces a refresh of the brushes and main chart based
        // on the selected extents.
        xBrushed();
        yBrushed();

    }
    */



    $scope.linePlusBarChart  = function (dataArr) {


        /*
        if($scope.data.length > 0){
            if($scope.data[0].values.length > 30){
                $scope.graphWidth = 1400;
            }
        }

        $scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                width:$scope.graphWidth,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 100,
                    left: 75
                },
                bars: {
                    forceY: 0
                   // forceY: $scope.workpieceForceY
                },
                bars2: {
                    forceY: [0]
                },
                yDomain:  $scope.workpieceForceY,
                color: ['#ff9900', '#ff00ff','#6aa84f','#0000ff'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        if (dx > 0) {
                            return $scope.data[0].values[d].id+"."+d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                       // return d3.time.format('%b-%Y')(new Date(dx))
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
                        return  d3.format(',f')(d)
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
                        console.log(graph);
                        var data = null;
                        if(graph.data != null){
                            data = graph.data;
                            console.log("graph.data" , graph.data);
                        }else if(graph.point != null){
                            data = graph.point;
                            console.log("graph.point" , graph.point);
                        }

                        //console.log("data" , $scope.data);
                        //console.log("graph" , graph);
                        var rows =
                            "<tr>" +
                            "<td class='key'>품종</td>" +
                            "<td class='x-value'><strong>" + data.model + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>공정</td>" +
                            "<td class='x-value'><strong>" + data.process + "</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>" + 'Date: ' + "</td>" +
                            "<td class='x-value'>" +  d3.time.format('%x')(new Date(data.x)) + "</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td class='key'>workpiece_cycle</td>" +
                            "<td class='x-value'><strong>" + data.workpiece_cycle + " (s)</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>pure_cycle</td>" +
                            "<td class='x-value'><strong>" + data.pure_cycle + " (s)</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>process_cycle</td>" +
                            "<td class='x-value'><strong>" + data.process_cycle + " (s)</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>pure_interval</td>" +
                            "<td class='x-value'><strong>" + data.pure_interval + " (s)</strong></td>" +
                            "</tr>"+
                            "<tr>" +
                            "<td class='key'>Freq_total_wp_cycle</td>" +
                            "<td class='x-value'><strong>" + data.freq_total_wp_cycle + "</strong></td>" +
                            "</tr>";



                        var header =
                            "<thead>" +
                            "<tr>" +
                            "<td class='legend-color-guide'><div style='background-color: " + data.color + ";'></div></td>" +
                            "<td class='key'><strong>" + data.id + ". " + data.name + "</strong></td>" +
                            "</tr>" +
                            "</thead>";

                        return "<table>" +
                           // header +
                            "<tbody>" +
                            rows +
                            "</tbody>" +
                            "</table>";

                        return '<h1></h1>';
                    }
                },
            }
        };

        */

        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(
                dataArr
               /* [
                    ['Year', 'Sales', 'Expenses', 'Profit','Test'],
                    ['2014', 1000, 400, 200,50],
                    ['2015', 1170, 460, 250,50],
                    ['2016', 660, 1120, 300,50],
                    ['2017', 1030, 540, 350,50],
                    ['2018', 1030, 540, 350,50],
                    ['2019', 1030, 540, 350,50],
                    ['2021', 1030, 540, 350,50],
                    ['2022', 1030, 540, 350,50],
                    ['2024', 1030, 540, 350,50],
                    ['2025', 1030, 540, 350,50],
                    ['2026', 1030, 540, 350,50],
                    ['2027', 1030, 540, 350,50],
                    ['2028', 1030, 540, 350,50]
                ]*/
            );



            var options = {
                chart: {
                    title: ' 공정사이클타임분석',
                    subtitle: 'Workpiece cycle, pure cycle, process cycle, pure interval',
                },
                bars: 'vertical',
                vAxis: {format: 'decimal'},
                height: 400,
                colors: ['#1b9e77', '#d95f02', '#7570b3','blue']
            };

            var chart = new google.charts.Bar(document.getElementById('chart_div'));

            chart.draw(data, google.charts.Bar.convertOptions(options));

            var btns = document.getElementById('btn-group');

            btns.onclick = function (e) {

                if (e.target.tagName === 'BUTTON') {
                    options.vAxis.format = e.target.id === 'none' ? '' : e.target.id;
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }
            }
        }

    }









});
