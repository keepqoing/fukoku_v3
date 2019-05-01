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

    calHeatmap.getAllMachineNameByLineName = function(p_line){
        var strUrl = "";
        if(p_line == 'ALL'){
            strUrl = "/v3/api/fukoku/machine/findAll";
        }else{
            strUrl = "/v3/api/fukoku/machine/findAllByLine/" + p_line;
        }

        $.ajax({
            url: strUrl,
            type: 'GET',
            dataType: 'JSON',
            data:{

            },
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
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calHeatmap.getAllLinesName(2);
    calHeatmap.getAllMachineNameByLineName('ALL');
    $('#select-line').on('change', function () {
        calHeatmap.getAllMachineNameByLineName($('#select-line').val());
    });

    calHeatmap.getCountFS = function(line, machine, label){

        $.ajax({
            url: "/v3/api/fukoku/cal-heatmap/fs",
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
                // $("#heatmap").html("");
                if(response.CODE == "7777"){
                    $('#heatmap').append('<span style="width: 15px; height: 15px; background-color: #ffcccc; display: inline-block; vertical-align: middle;margin-left: 80px;"></span><span style="margin-right: 20px;">  0-10</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #ff9999; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  10-20</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #ff3333; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  20-30</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #cc0000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  30-50</span>' +
                        '<span style="width: 15px; height: 15px; background-color: #990000; display: inline-block; vertical-align: middle;"></span><span style="margin-right: 10px;">  50+</span>');


                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    calHeatmap.drawCal(response.DATA,st,et,label,['#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }else{

                    var d = new Date($('#txtYear').val());
                    var st = d.getFullYear();
                    var et = st+1;
                    var data = [];
                    calHeatmap.drawCal(data,st,et,label,['#ffcccc','#ff9999','#ff3333','#cc0000','#990000']);
                }

            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };



    // calHeatmap.getCountFS();


    calHeatmap.showResult = function(ln,ma) {

        switch(ln) {
            case "ALL":
                calHeatmap.getCountFS("HC", ma, "(HC)");
                calHeatmap.getCountFS("IB", ma, "(IB)");
                calHeatmap.getCountFS("HA", ma, "(HA)");
                calHeatmap.getCountFS("HD", ma, "(HD)");
                calHeatmap.getCountFS("PD", ma, "(PD)");
                calHeatmap.getCountFS("HB", ma, "(HB)");

                calHeatmap.getCountFS("PB", ma, "(PB)");
                calHeatmap.getCountFS("PC", ma, "(PC)");
                calHeatmap.getCountFS("PA", ma, "(PA)");
                calHeatmap.getCountFS("PE", ma, "(PE)");
                calHeatmap.getCountFS("IA", ma, "(IA)");
                calHeatmap.getCountFS("VA", ma, "(VA)");
                calHeatmap.getCountFS("JA", ma, "(JA)");

                break;
            case "IB":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("IB", "IB_Pre1", " IB_Pre1");
                    calHeatmap.getCountFS("IB", "IB_Pre2", " IB_Pre2");
                    calHeatmap.getCountFS("IB", "IB_Pre3", " IB_Pre3");
                    calHeatmap.getCountFS("IB", "IB_Balancer", " IB_Balancer");
                    calHeatmap.getCountFS("IB", "IB_Pnt", " IB_Pnt");
                    calHeatmap.getCountFS("IB", "IB_Runout", " IB_Runout");
                } else {
                    calHeatmap.getCountFS("IB", ma, "(IB)");
                }
                ;
                break;
            case "PD":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("PD", "PD_Pre", " PD_Pre");
                    calHeatmap.getCountFS("PD", "PD_Oven", " PD_Oven");
                    calHeatmap.getCountFS("PD", "PD_Balancer", " PD_Balancer");
                    calHeatmap.getCountFS("PD", "PD_Paka", " PD_Paka");
                    calHeatmap.getCountFS("PD", "PD_Pnt", " PD_Pnt");
                } else {
                    calHeatmap.getCountFS("PD", ma, "(PD)");
                }
                ;
                break;
            case "HA":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("HA", "HA_Pre", " HA_Pre");
                    calHeatmap.getCountFS("HA", "HA_Balancer", " HA_Balancer");
                    calHeatmap.getCountFS("HA", "HA_Paka", " HA_Paka");
                    calHeatmap.getCountFS("HA", "HA_Pnt", " HA_Pnt");
                    calHeatmap.getCountFS("HA", "HA_Runout", " HA_Runout");
                } else {
                    calHeatmap.getCountFS("HA", ma, "(HA)");
                }
                ;
                break;
            case "HB":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("HB", "HB_Pre", " HB_Pre");
                    calHeatmap.getCountFS("HB", "HB_Balancer", " HB_Balancer");
                    calHeatmap.getCountFS("HB", "HB_Pnt", " HB_Pnt");
                    calHeatmap.getCountFS("HB", "HB_Tmarker", " HB_Tmarker");
                } else {
                    calHeatmap.getCountFS("HB", ma, "(HB)");
                }
                ;
                break;
            case "HC":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("HC", "HC_Pre", " HC_Pre");
                    calHeatmap.getCountFS("HC", "HC_Balancer", " HC_Balancer");
                    calHeatmap.getCountFS("HC", "HC_Paka", " HC_Paka");
                    calHeatmap.getCountFS("HC", "HC_Pnt", " HC_Pnt");
                    calHeatmap.getCountFS("HC", "HC_Runout", " HC_Runout");
                    calHeatmap.getCountFS("HC", "HC_TP", " HC_TP");
                } else {
                    calHeatmap.getCountFS("HC", ma, "(HC)");
                }
                ;
                break;
            case "HD":
                if (ma == "ALL") {
                    calHeatmap.getCountFS("HD", "HD_Pre", " HD_Pre");
                    calHeatmap.getCountFS("HD", "HD_Balancer", " HD_Balancer");
                    calHeatmap.getCountFS("HD", "HD_Paka", " HD_Paka");
                    calHeatmap.getCountFS("HD", "HD_Pnt", " HD_Pnt");
                    calHeatmap.getCountFS("HD", "HD_Tmarker", " HD_Tmarker");
                    calHeatmap.getCountFS("HD", "HD_Runout", " HD_Runout");
                } else {
                    calHeatmap.getCountFS("HD", ma, "(HD)");
                }
                ;
                break;
            default:
                calHeatmap.getCountFS(ln, ma, "(FS)");
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