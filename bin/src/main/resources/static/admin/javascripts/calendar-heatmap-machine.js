$(function () {

    var calHeatmap = {};


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
                    d3.select('#info')
                        .text(function () {
                            return 'date: ' + f(d) + ' | value: ' + nestedData[d];
                        });
                });

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
    calHeatmap.getAllMachineNameByLineName('HC');
    $('#select-line').on('click', function () {
        calHeatmap.getAllMachineNameByLineName();
    });

    calHeatmap.getCountNAS = function(){
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/nas",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {

                calHeatmap.getCountFS();
                if(response.CODE == "7777"){
                    $("#heatmap").html("");
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #b3b3ff; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-5</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #9999ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  5-10</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #8080ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #6666ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #4d4dff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #3333ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50-70</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #1a1aff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  70-100</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #0000ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  100+</span>');

                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(NAS)',['#b3b3ff','#9999ff','#8080ff','#6666ff','#4d4dff','#3333ff','#1a1aff','#0000ff']);
                }else{
                    $("#heatmap").html("");
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #b3b3ff; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-5</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #9999ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  5-10</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #8080ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #6666ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #4d4dff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #3333ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50-70</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #1a1aff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  70-100</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #0000ff; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  100+</span>');

                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et,'(NAS)',['#b3b3ff','#9999ff','#8080ff','#6666ff','#4d4dff','#3333ff','#1a1aff','#0000ff']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountFS = function(){
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/fs",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ccffcc; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-5</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #b3ffb3; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  5-10</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #99ff99; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #80ff80; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #66ff66; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #1aff1a; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50-70</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #00e600; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  70-100</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #00cc00; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  100+</span>');

                calHeatmap.getCountAlarm();
                if(response.CODE == "7777"){
                    console.log(1)
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(FS)',['#ccffcc','#b3ffb3','#99ff99','#80ff80','#66ff66','#1aff1a','#00e600','#00cc00']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = [];
                    calHeatmap.drawCal(data,st,et,'(FS)',['#ccffcc','#b3ffb3','#99ff99','#80ff80','#66ff66','#1aff1a','#00e600','#00cc00']);
                }
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getCountAlarm = function(){
        $.ajax({
            url: "/v1/api/fukoku/cal-heatmap/alarm",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "machine"  :   $("#select-machine").val(),
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ffff80; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-5</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ffff66; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  5-10</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ffff4d; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ffff33; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ffff1a; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #ffff00; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50-70</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #e6e600; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  70-100</span>' +
                    '<span style="width: 15px; height: 15px; background-color: #cccc00; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  100+</span>');

                // calHeatmap.getCountAlarm();
                if(response.CODE == "7777"){
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,'(ALARM)',['#ffff80','#ffff66','#ffff4d','#ffff33','#ffff1a','#ffff00','#e6e600','#cccc00']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et,'(ALARM)',['#ffff80','#ffff66','#ffff4d','#ffff33','#ffff1a','#ffff00','#e6e600','#cccc00']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    calHeatmap.getCountNAS();


    $('#btnSearch').click(function () {
       calHeatmap.getCountNAS();
    });
});