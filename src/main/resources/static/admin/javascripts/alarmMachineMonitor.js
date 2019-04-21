$(function() {
    alarmMachineMonitor = {};

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    alarmMachineMonitor.getAlarmData = function () {
        openLoading();
        var year = $('#yearSelected').val();
        var dataTable = $('#dataTable').DataTable();
        $.ajax({
            url:"/v1/api/fukoku/alarm-history/monthly/"+year,
            type:'GET',
            dataType: 'JSON',
            //data:{"year"    :   year},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE == "7777"){
                    console.log(response);

                    $("#bar-label").empty();
                    $("#tbody").empty();

                    var dataset = alarmMachineMonitor.sortFunctionDesc(response.DATA,"LINE");
                    for(var i=0;i<response.DATA.length;i++){
                        $("#tbody").append("" +
                            "<tr>" +
                            "<td>"+response.DATA[i].LINE+"</td>" +
                            "<td>"+response.DATA[i].M_1+"</td>" +
                            "<td>"+response.DATA[i].M_2+"</td>" +
                            "<td>"+response.DATA[i].M_3+"</td>" +
                            "<td>"+response.DATA[i].M_4+"</td>" +
                            "<td>"+response.DATA[i].M_5+"</td>" +
                            "<td>"+response.DATA[i].M_6+"</td>" +
                            "<td>"+response.DATA[i].M_7+"</td>" +
                            "<td>"+response.DATA[i].M_8+"</td>" +
                            "<td>"+response.DATA[i].M_9+"</td>" +
                            "<td>"+response.DATA[i].M_10+"</td>" +
                            "<td>"+response.DATA[i].M_11+"</td>" +
                            "<td>"+response.DATA[i].M_12+"</td>" +
                            "<td>"+response.DATA[i].TOTAL+"</td>" +
                            "<td></td>" +
                            // "<td>"+response.DATA[i].RATIO+"</td>" + -- not correct because of the wrong formulae
                            // The correct formular is 알람율 = 총알람시간/총부하시간 x 100
                            "<td></td>"+
                            "</tr>"
                        );
                    }
                    var dataset = alarmMachineMonitor.sortFunctionDesc(response.DATA,"TOTAL");

                    var settings = {
                        selector: "#bar-label",
                        width: "1200", //1200
                        height: "500", // 500
                        x:"LINE",
                        y:"TOTAL",
                        x_text: "라인",
                        y_text: "시간"
                    };
                    barchartLabel(dataset, settings);


                }else{
                    $("#bar-label").empty();
                    $("#tbody").empty();
                }
            },
            error:function(data,status,err) {
                $("#bar-label").empty();
                $("#tbody").empty();
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
        closeLoading();
    };

    $('#btnQuery').click(function () {
        //alarmMachineMonitor.getAlarmData();
        alarmMachineMonitor.breakdowntimeanalysisbyline();
    });

    alarmMachineMonitor.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    };

    // First Loading Page
    $(document).ready(function(){
       // alarmMachineMonitor.getAlarmData();
    });


    alarmMachineMonitor.breakdowntimeanalysisbyline = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/daily-mstate-analysis/breakdowntimeanalysisbyline",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "work_date": $("#yearSelected").val()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("response", response);
                let data = response.breakdowntimeanalysisbyline;
                var lines = ["HC", "IB", "HA", "HD", "PD", "HB"];

                var tr = "";
                $("#tbody").empty();
                $("#bar-label").empty();
                $("#donut-label").empty();
                var graphObjArr = [];
                var pieObjArr = [];
                for (var l = 0; l < lines.length; l++) {
                    var month = [0,0,0,0,0,0,0,0,0,0,0,0]; var working_time = [0,0,0,0,0,0,0,0,0,0,0,0];
                    var non_active_ratio = [0,0,0,0,0,0,0,0,0,0,0,0];

                    for (var i = 0; i < data.length; i++) {

                        if(data[i].month == 1 && lines[l] == data[i].line){ month[0] = data[i].alarm_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].alarm_time_s / data[i].working_time_s) * 100  }
                        if(data[i].month == 2 && lines[l] == data[i].line){ month[1] = data[i].alarm_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 3 && lines[l] == data[i].line){ month[2] = data[i].alarm_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 4 && lines[l] == data[i].line){ month[3] = data[i].alarm_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 5 && lines[l] == data[i].line){ month[4] = data[i].alarm_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 6 && lines[l] == data[i].line){ month[5] = data[i].alarm_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 7 && lines[l] == data[i].line){ month[6] = data[i].alarm_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 8 && lines[l] == data[i].line){ month[7] = data[i].alarm_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 9 && lines[l] == data[i].line){ month[8] = data[i].alarm_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 10 && lines[l] == data[i].line){month[9] = data[i].alarm_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 11 && lines[l] == data[i].line){ month[10] = data[i].alarm_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 12 && lines[l] == data[i].line){ month[11] = data[i].alarm_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                    }
                    var total_alarm_time_s = 0;
                    var total_working_time_s = 0;

                    for (var t = 0; t < month.length; t++) {
                        if(Number.isNaN(month[t]) || Number.isFinite(month[t]) ){
                            total_alarm_time_s += month[t];
                        }
                        if(Number.isNaN(working_time[t]) || Number.isFinite(working_time[t]) ){
                            total_working_time_s += working_time[t] ;
                        }

                    }
                   // console.log(lines[l] , month);
                   // console.log(lines[l] , working_time);
                   // console.log(lines[l] , non_active_ratio);

                    var tr =
                        "<tr><td>"+lines[l]+"</td>"+
                        "<td>"+(month[0] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[1] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[2] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[3] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[4] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[5] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[6] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[7] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[8] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[9] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[10] / 3600).toFixed(2)+"</td>"+
                        "<td>"+(month[11] / 3600).toFixed(2)+"</td>" +
                        "<td>"+(total_alarm_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+(total_working_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+  ((total_alarm_time_s / total_working_time_s) * 100).toFixed(2) +"</td>" +
                        "</tr>";
                    $("#tbody").append(tr);

                    // var graphObj = {};
                    // graphObj.MACHINE = lines[l];
                    // graphObj .stopTime = (total_working_nonactive_time_s / 3600).toFixed(2);
                    // graphObjArr.push(graphObj);


                    var graphObj = {};
                    var pieObj = {};
                    graphObj.MACHINE = lines[l];
                    graphObj.stopTime = (total_alarm_time_s / 3600).toFixed(2);
                    graphObjArr.push(graphObj);

                    pieObj.label = lines[l];
                    pieObj.value = parseInt(((total_alarm_time_s / 3600) + 1) * 10);
                    pieObjArr.push(pieObj);

                }

                // $("#bar-label").empty();
                // var settings = {
                //     selector: "#bar-label",
                //     width: 1400,
                //     height: 350,
                //     x: "MACHINE",
                //     y: "stopTime"
                // };
                // barchartLabel(graphObjArr, settings);


                var pie = new d3pie("donut-label", {
                    "data": {
                        "content":pieObjArr
                    },
                    "size": {

                        "canvasHeight": 280,
                        "canvasWidth": 400
                    }
                });

                var barPanel = document.getElementById("piePanel");

                var settings = {
                    selector: "#bar-label",
                    width: $(barPanel).width(),
                    height: $(barPanel).height() - 97,
                    x: "MACHINE",
                    y: "stopTime"
                };
                barchartLabel(graphObjArr, settings);

            }
        });
        closeLoading();
    }



});