$(function () {

    var calHeatmap = {};

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    calHeatmap.drawCal = function (data, startYear, endYear, label, color) {
        // *****************************************
        // render chart
        // *****************************************
        function drawCalendar(yearLabel) {
            'use strict';

            var nestedData;
            var parseDate = d3.time.format('%Y-%m-%d').parse;

            // create chart
            var heatChart = d3.eesur.heatmap()
                .colourRangeStart('#FDBB30')
                .colourRangeEnd('#EE3124')
                .height(300)
                .startYear(startYear)
                .endYear(endYear)
                .label(yearLabel)
                .color(color)
                .on('_hover', function (d, i) {
                    var f = d3.time.format('%B %d, %Y');


                    tooltip
                        .style('font-size','12px')
                        .style('font-weight','bold')
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html('date: ' + f(d) + ' | value: ' + nestedData[d]);


                    d3.select('#info')
                        .text(function () {
                            return 'date: ' + f(d) + ' | value: ' + nestedData[d];
                        });




                });
                // .on("_mousemove", function(d){
                //     tooltip
                //         .style('font-size','12px')
                //         .style('font-weight','bold')
                //         .style("left", d3.event.pageX - 50 + "px")
                //         .style("top", d3.event.pageY - 70 + "px")
                //         .style("display", "inline-block")
                //         .html('date: ' + f(d) + ' | value: ' + nestedData[d]);
                // });
                // .on("mouseout", function(d){
                //     d3.select(this).style("fill", color(d.rate));
                //     tooltip.style("display", "none");});

            // apply after nesting data


            nestedData = d3.nest()
                .key(function (d) {
                    return parseDate(d.date.split(' ')[0]);
                })
                .rollup(function (n) {
                    return d3.sum(n, function (d) {
                        return d.amount; // key
                    });
                })
                .map(data);

            // console.log(nestedData);

            // render chart
            d3.select('#heatmap')
                .datum(nestedData)
                .call(heatChart);

        }
        drawCalendar(label);
        d3.select(self.frameElement).style('height', '300px');
    }
/*
        drawCalendar('(TT)');
        d3.select(self.frameElement).style('height', '300px');
        drawCalendar('(OK)');
        d3.select(self.frameElement).style('height', '300px');
        drawCalendar('(NG)');
        d3.select(self.frameElement).style('height', '300px');
        drawCalendar('(DF)');
        d3.select(self.frameElement).style('height', '300px');
*/

    /*$('#year').datetimepicker({
        format: 'YYYY',
    }).on('dp.change', function (ev) {
        calHeatmap.getCountTT();
    });*/

    calHeatmap.getAllLinesName = function(){
        $.ajax({
            url: "/v1/api/fukoku/line/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#select-line').empty();
                $("#select-line").append("<option value='ALL'>ALL</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#select-line").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getAllMachineNameByLineName = function(){
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "lineName"  :   $("#select-line").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#select-machine').empty();
                $("#select-machine").append("<option value='ALL'>ALL</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#select-machine").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getAllLinesName();
    calHeatmap.getAllMachineNameByLineName('ALL');
    $('#select-line').on('click', function () {
        calHeatmap.getAllMachineNameByLineName();
    });

    calHeatmap.getCountTT = function(){
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/tt",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"  :   $("#select-line").val(),
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {

                calHeatmap.getCountOK();
                if(response.CODE == "7777"){
                    $("#heatmap").html("");
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #c8e5e3; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-300</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #a3d5d1; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  300-600</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #80c9c6; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  600-900</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #44b4c4; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  900-1200</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #1792a4; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  1200+</span>');

                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(TT)',['#c8e5e3','#a3d5d1','#80c9c6','#44b4c4','#1792a4']);
                }else{
                    $("#heatmap").html("");
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #c8e5e3; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-300</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #a3d5d1; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  300-600</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #80c9c6; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  600-900</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #44b4c4; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  900-1200</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #1792a4; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  1200+</span>');

                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et,'(TT)',['#c8e5e3','#a3d5d1','#80c9c6','#44b4c4','#1792a4']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountOK = function(){
        // openLoading();
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/ok",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"  :   $("#select-line").val(),
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ccffe5; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-300</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #88ffb2; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  300-600</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #00dd80; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  600-900</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #00994c; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  900-1200</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #006000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  1200+</span>');

                calHeatmap.getCountNG();
                if(response.CODE == "7777"){
                    console.log(1)
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(OK)',['#ccffe5','#88ffb2','#00dd80','#00994c','#006000']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = [];
                    calHeatmap.drawCal(data,st,et,'(OK)',['#ccffe5','#88ffb2','#00dd80','#00994c','#006000']);
                }
                // closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountNG = function(){
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/ng",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"  :   $("#select-line").val(),
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ffcccc; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-10</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ff9999; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ff3333; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #cc0000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #990000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50+</span>');

                calHeatmap.getCountDF();
                if(response.CODE == "7777"){
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(NG)',['#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et,'(NG)',[ '#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountDF = function(){
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/df",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"  :   $("#select-line").val(),
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #f0f0f0; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-10</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #d0d0d0; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #b0b0b0; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #707070; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #000000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50+</span>');

                if(response.CODE == "7777"){
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(DF)',['#f0f0f0','#d0d0d0','#b0b0b0','#707070','#000000']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et,'(DF)',['#f0f0f0','#d0d0d0','#b0b0b0','#707070','#000000']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountTT();


    $('#btnSearch').click(function () {
       calHeatmap.getCountTT();
    });
});