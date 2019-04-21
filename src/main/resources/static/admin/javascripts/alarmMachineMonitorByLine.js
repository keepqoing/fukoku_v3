$(function() {
    alarmMachineMonitor = {};


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    alarmMachineMonitor.getAllLinesName = function(fid){
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  fid ,
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectLineSearch').empty();
                // $("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#selectLineSearch").append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    $("#selectLineSearch").prop("selectedIndex",0).change();

                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    alarmMachineMonitor.getAlarmData = function (line, year) {
        openLoading();

        $.ajax({
            url:"/v1/api/fukoku/alarm-history/monthly/" + line + "/" + year,
            type:'GET',
            dataType: 'JSON',

            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE == "7777"){
                    // console.log(response);

                    $("#bar-label").empty();
                    $("#tbody").empty();


                    var dataset = alarmMachineMonitor.sortFunctionDesc(response.DATA,"MACHINE");
                    // sum of each column to put on the bottom of table
                    var sum_m1 = 0;
                    var sum_m2 = 0;
                    var sum_m3 = 0;
                    var sum_m4 = 0;
                    var sum_m5 = 0;
                    var sum_m6 = 0;
                    var sum_m7 = 0;
                    var sum_m8 = 0;
                    var sum_m9 = 0;
                    var sum_m10 = 0;
                    var sum_m11 = 0;
                    var sum_m12 = 0;
                    var sum_total = 0;

                    for(var i=0;i<response.DATA.length;i++){
                        $("#tbody").append("" +
                            "<tr>" +
                            "<td align='left'>"+response.DATA[i].MACHINE+"</td>" +
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
                            // "<td>"+response.DATA[i].RATIO+"</td>" + -- -- not correct because of the wrong formulae
                            // The correct formular is 알람율 = 총알람시간/총부하시간 x 100
                            "<td></td>" +
                            "</tr>"
                        );

                        // accumulate value to variables
                        sum_m1 += response.DATA[i].M_1;
                        sum_m2 += response.DATA[i].M_2;
                        sum_m3 += response.DATA[i].M_3;
                        sum_m4 += response.DATA[i].M_4;
                        sum_m5 += response.DATA[i].M_5;
                        sum_m6 += response.DATA[i].M_6;
                        sum_m7 += response.DATA[i].M_7;
                        sum_m8 += response.DATA[i].M_8;
                        sum_m9 += response.DATA[i].M_9;
                        sum_m10 += response.DATA[i].M_10;
                        sum_m11 += response.DATA[i].M_11;
                        sum_m12 += response.DATA[i].M_12;
                        sum_total += response.DATA[i].TOTAL;
                    }

                    // Show total on the bottom of table
                    console.log("HELELHELRHWEHJR" + sum_total);
                    $("#tbody").append("" +

                        "<tr style='font-weight: bold'>" +
                        "<td align='left'>Total</td>" +
                        "<td>"+ ( sum_m1 == 0 ? 0 : sum_m1.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m2 == 0 ? 0 : sum_m2.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m3 == 0 ? 0 : sum_m3.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m4 == 0 ? 0 : sum_m4.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m5 == 0 ? 0 : sum_m5.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m6 == 0 ? 0 : sum_m6.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m7 == 0 ? 0 : sum_m7.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m8 == 0 ? 0 : sum_m8.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m9 == 0 ? 0 : sum_m9.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m10 == 0 ? 0 : sum_m10.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m11 == 0 ? 0 : sum_m11.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_m12 == 0 ? 0 : sum_m12.toFixed(2) ) +"</td>" +
                        "<td>"+ ( sum_total == 0 ? 0 : sum_total.toFixed(2) ) +"</td>" +
                        "<td></td>" +
                        "<td></td>" +
                        "</tr>"

                    );



                    var dataset = alarmMachineMonitor.sortFunctionDesc(response.DATA,"TOTAL");

                    var settings = {
                        selector: "#bar-label",
                        width: "1200",
                        height: "500",
                        x:"MACHINE",
                        y:"TOTAL"
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
        var line = $('#selectLineSearch').val();
        var year = $('#yearSelected').val();

       // alarmMachineMonitor.getAlarmData(line, year);
        alarmMachineMonitor.breakdowntimeanalysisbyline();
    });

    // First Loading Page
    $(document).ready(function(){
        alarmMachineMonitor.getAllLinesName(2);
        var line = $('#selectLineSearch').val();
        var year = $('#yearSelected').val();

        //alarmMachineMonitor.getAlarmData("IB", year);
    });



    alarmMachineMonitor.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    };



    alarmMachineMonitor.breakdowntimeanalysisbyline = function () {
        $.ajax({
            url: "/v1/api/fukoku/daily-mstate-analysis/non_active_Time_by_machine",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "work_date": $('#yearSelected').val(),
                "line":$("#selectLineSearch").val()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("response", response);
                $("#bar-label").empty();
                let data = response.breakdowntimeanalysisbyline;
                var lines = [$("#selectLineSearch").val()];
                var month = [0,0,0,0,0,0,0,0,0,0,0,0]; var working_time = [0,0,0,0,0,0,0,0,0,0,0,0];
                var non_active_ratio = [0,0,0,0,0,0,0,0,0,0,0,0];
                var tr = "";
                $("#tbody").empty();
                $("#bar-label").empty();
                $("#donut-label").empty();
                var graphObjArr = [];
                var pieObjArr = [];

                // for (var l = 0; l < lines.length; l++) {
                for (var m = 0; m < response.machines.length; m++) {
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].month == 1 && response.machines[m].name == data[i].machine){ month[0] = data[i].alarm_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].alarm_time_s / data[i].working_time_s) * 100  }
                        if(data[i].month == 2  && response.machines[m].name == data[i].machine){ month[1] = data[i].alarm_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 3  && response.machines[m].name == data[i].machine){ month[2] = data[i].alarm_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 4  && response.machines[m].name == data[i].machine){ month[3] = data[i].alarm_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 5  && response.machines[m].name == data[i].machine){ month[4] = data[i].alarm_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 6  && response.machines[m].name == data[i].machine){ month[5] = data[i].alarm_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 7  && response.machines[m].name == data[i].machine){ month[6] = data[i].alarm_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 8  && response.machines[m].name == data[i].machine){ month[7] = data[i].alarm_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 9  && response.machines[m].name == data[i].machine){ month[8] = data[i].alarm_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 10  && response.machines[m].name == data[i].machine){ month[9] = data[i].alarm_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 11  && response.machines[m].name == data[i].machine){ month[10] = data[i].alarm_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 12  && response.machines[m].name == data[i].machine){ month[11] = data[i].alarm_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                    }

                    var total_alarm_time_s = 0;
                    var total_working_time_s = 0;

                    for (var t = 0; t < month.length; t++) {
                        if(!Number.isNaN(month[t])){
                            total_alarm_time_s += month[t];
                        }
                        if(!Number.isNaN(working_time[t])){
                            total_working_time_s += working_time[t];
                        }
                    }

                    var tr =
                        "<tr><td>"+ $("#selectLineSearch").val()+"</td>"+
                        "<td>"+response.machines[m].name+"</td>"+
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
                        "<td>"+   ((total_alarm_time_s / total_working_time_s) * 100).toFixed(2)+"</td>" +
                        "</tr>";
                    $("#tbody").append(tr);

                    // var graphObj = {};
                    // graphObj.MACHINE = response.machines[m].name;
                    // graphObj .stopTime = (total_working_nonactive_time_s / 3600).toFixed(2);
                    // graphObjArr.push(graphObj);

                    var graphObj = {};
                    var pieObj = {};
                    graphObj.MACHINE = response.machines[m].name;
                    graphObj.stopTime = (total_alarm_time_s / 3600).toFixed(2);
                    graphObjArr.push(graphObj);

                    pieObj.label = response.machines[m].name;
                    pieObj.value = parseInt(((total_alarm_time_s / 3600) + 1) * 10);
                    pieObjArr.push(pieObj);

                }








                // }


                // var settings = {
                //     selector: "#bar-label",
                //     width: 1400,
                //     height: 350,
                //     x: "MACHINE",
                //     y: "stopTime"
                // };
                // barchartLabel(graphObjArr, settings);
                //
                //
                // console.log(month);

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
    }


});