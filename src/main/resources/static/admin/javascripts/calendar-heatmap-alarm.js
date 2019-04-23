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

    calHeatmap.getAllLinesName = function(fid){
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  fid ,
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
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#select-line").append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    $("#select-line").prop("selectedIndex",0).change();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getAllMachineNameByLineName = function(){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllByLine/" + $("#select-line").val(),
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#select-machine').empty();
                $("#select-machine").append("<option value='ALL'>ALL</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#select-machine").append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    $("#select-machine").prop("selectedIndex",0).change();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getAllLinesName(2);
    calHeatmap.getAllMachineNameByLineName();
    $('#select-line').on('click', function () {
        calHeatmap.getAllMachineNameByLineName();
    });

    calHeatmap.getCountAlarm = function(line, machine, label){
        $.ajax({
            url: "/v3/api/fukoku/cal-heatmap/alarm",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"  :   line,
                "machine"  :   machine,
                "date"  :   $("#txtYear").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE == "7777"){
                    // $("#heatmap").html("");
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ffcccc; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-10</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #ff9999; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #ff3333; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #cc0000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #990000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50+</span>');

                    // calHeatmap.getCountAlarm();
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et, label,['#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }else{
                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = []
                    calHeatmap.drawCal(data,st,et, label,['#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    // calHeatmap.getCountAlarm();
    calHeatmap.showResult = function(ln,ma) {

        switch(ln) {
            case "ALL":
                calHeatmap.getCountAlarm("IB", ma, "(IB)");
                calHeatmap.getCountAlarm("PD", ma, "(PD)");
                calHeatmap.getCountAlarm("HA", ma, "(HA)");
                calHeatmap.getCountAlarm("HB", ma, "(HB)");
                calHeatmap.getCountAlarm("HC", ma, "(HC)");
                calHeatmap.getCountAlarm("HD", ma, "(HD)");
                break;
            case "IB":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("IB", "IB_Pre1", " IB_Pre1");
                    calHeatmap.getCountAlarm("IB", "IB_Pre2", " IB_Pre2");
                    calHeatmap.getCountAlarm("IB", "IB_Pre3", " IB_Pre3");
                    calHeatmap.getCountAlarm("IB", "IB_Balancer", " IB_Balancer");
                    calHeatmap.getCountAlarm("IB", "IB_Pnt", " IB_Pnt");
                    calHeatmap.getCountAlarm("IB", "IB_Runout", " IB_Runout");
                } else {
                    calHeatmap.getCountAlarm("IB", ma, "(IB)");
                }
                ;
                break;
            case "PD":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("PD", "PD_Pre", " PD_Pre");
                    calHeatmap.getCountAlarm("PD", "PD_Oven", " PD_Oven");
                    calHeatmap.getCountAlarm("PD", "PD_Balancer", " PD_Balancer");
                    calHeatmap.getCountAlarm("PD", "PD_Paka", " PD_Paka");
                    calHeatmap.getCountAlarm("PD", "PD_Pnt", " PD_Pnt");
                } else {
                    calHeatmap.getCountAlarm("PD", ma, "(PD)");
                }
                ;
                break;
            case "HA":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("HA", "HA_Pre", " HA_Pre");
                    calHeatmap.getCountAlarm("HA", "HA_Balancer", " HA_Balancer");
                    calHeatmap.getCountAlarm("HA", "HA_Paka", " HA_Paka");
                    calHeatmap.getCountAlarm("HA", "HA_Pnt", " HA_Pnt");
                    calHeatmap.getCountAlarm("HA", "HA_Runout", " HA_Runout");
                } else {
                    calHeatmap.getCountAlarm("HA", ma, "(HA)");
                }
                ;
                break;
            case "HB":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("HB", "HB_Pre", " HB_Pre");
                    calHeatmap.getCountAlarm("HB", "HB_Balancer", " HB_Balancer");
                    calHeatmap.getCountAlarm("HB", "HB_Pnt", " HB_Pnt");
                    calHeatmap.getCountAlarm("HB", "HB_Tmarker", " HB_Tmarker");
                } else {
                    calHeatmap.getCountAlarm("HB", ma, "(HB)");
                }
                ;
                break;
            case "HC":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("HC", "HC_Pre", " HC_Pre");
                    calHeatmap.getCountAlarm("HC", "HC_Balancer", " HC_Balancer");
                    calHeatmap.getCountAlarm("HC", "HC_Paka", " HC_Paka");
                    calHeatmap.getCountAlarm("HC", "HC_Pnt", " HC_Pnt");
                    calHeatmap.getCountAlarm("HC", "HC_Runout", " HC_Runout");
                    calHeatmap.getCountAlarm("HC", "HC_TP", " HC_TP");
                } else {
                    calHeatmap.getCountAlarm("HC", ma, "(HC)");
                }
                ;
                break;
            case "HD":
                if (ma == "ALL") {
                    calHeatmap.getCountAlarm("HD", "HD_Pre", " HD_Pre");
                    calHeatmap.getCountAlarm("HD", "HD_Balancer", " HD_Balancer");
                    calHeatmap.getCountAlarm("HD", "HD_Paka", " HD_Paka");
                    calHeatmap.getCountAlarm("HD", "HD_Pnt", " HD_Pnt");
                    calHeatmap.getCountAlarm("HD", "HD_Tmarker", " HD_Tmarker");
                    calHeatmap.getCountAlarm("HD", "HD_Runout", " HD_Runout");
                } else {
                    calHeatmap.getCountAlarm("HD", ma, "(HD)");
                }
                ;
                break;
            default:
                calHeatmap.getCountAlarm(ln, ma, "(NAS)");
                break;
        }
    }





    $('#btnSearch').click(function () {
        $("#heatmap").html("");
        var ln = $("#select-line").val();
        var ma = $("#select-machine").val();
        calHeatmap.showResult(ln,ma);
    });

    // First Loading Page
    $(document).ready(function(){
        $("#heatmap").html("");
        calHeatmap.showResult("ALL","ALL");
    });
});