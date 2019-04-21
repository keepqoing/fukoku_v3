$(function() {
    alarm = {};

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    alarm.getAllMachinesName = function(){
        var machineName = "";
        $.ajax({
            url:  "/v3/api/fukoku/machine/findAllDistinct",
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){


                        $("#selectMachine").append("<option value='"+value.name+"' data-id="+value.ID+">"+value.name+"</option>");
                    });
                    $("#selectMachine").prop("selectedIndex",1).change();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    alarm.getAlarmData = function () {
        var year = $('#yearSelected').val();
        var dataTable = $('#dataTable').DataTable();
        var machine = $("#selectMachine").val();
        $.ajax({
            url:"/v1/api/fukoku/alarm-history/monthly/machine/"+ machine + "/"+year,
            type:'GET',
            dataType: 'JSON',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                // console.log(response);
                if(response.CODE == "7777"){
                    $("#bar-label").empty();
                    $("#tbody").empty();

                    for(var i=0;i<response.DATA.length;i++){
                        $("#tbody").append("" +
                            "<tr>" +
                            "<td>"+response.DATA[i].LINE+"</td>" +
                            "<td>"+response.DATA[i].MACHINE+"</td>" +
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
                            "<td></td>"+
                            // "<td>"+response.DATA[i].RATIO+"</td>" + -- -- not correct because of the wrong formulae
                            // The correct formular is 알람율 = 총알람시간/총부하시간 x 100
                            "<td></td>" +
                            "</tr>"
                        );
                    }

                    var dataset = alarm.sortFunctionDesc(response.DATA,"MACHINE");
                    // console.log(dataset);
                    dataset = jQuery.map(dataset,function (n) {
                            return {
                                // "LINE": n.LINE + " " + n.MACHINE,
                                "MACHINE":  n.MACHINE,
                                "TOTAL": n.TOTAL
                            }
                        });
                    console.log(dataset);
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
    };
    $('#btnQuery').click(function () {
       // alarm.getAlarmData();
        alarm.breakdowntimeanalysisbyline();
    });

    alarm.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    }

    // First Loading Page
    $(document).ready(function(){
        alarm.getAllMachinesName();

       // alarm.getAlarmData();
    });


    alarm.breakdowntimeanalysisbyline = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/daily-mstate-analysis/non_active_Time_by_machine",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "work_date": $('#yearSelected').val(),
                "machine": $("#selectMachine").val()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("response", response);
                let data = response.breakdowntimeanalysisbyline;
                var lines = ["HC", "IB", "HA", "HD", "PD", "HB"];
                var month = [0,0,0,0,0,0,0,0,0,0,0,0]; var working_time = [0,0,0,0,0,0,0,0,0,0,0,0];
                var non_active_ratio = [0,0,0,0,0,0,0,0,0,0,0,0];
                var tr = "";
                $("#tbody").empty();
                $("#bar-label").empty();
                $("#donut-label").empty();
                var graphObjArr = [];
                var pieObjArr = [];

                for (var l = 0; l < lines.length; l++) {
                    for (var m = 0; m < response.machines.length; m++) {
                        for (var i = 0; i < data.length; i++) {
                            if(data[i].month == 1 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[0] = data[i].alarm_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].alarm_time_s / data[i].working_time_s) * 100  }
                            if(data[i].month == 2 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[1] = data[i].alarm_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 3 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[2] = data[i].alarm_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 4 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[3] = data[i].alarm_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 5 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[4] = data[i].alarm_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 6 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[5] = data[i].alarm_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 7 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[6] = data[i].alarm_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 8 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[7] = data[i].alarm_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 9 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[8] = data[i].alarm_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 10 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[9] = data[i].alarm_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 11 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[10] = data[i].alarm_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 12 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[11] = data[i].alarm_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].alarm_time_s / data[i].working_time_s) * 100}
                        }
                        var total_working_nonactive_time_s = 0;
                        var total_working_time_s = 0;
                        var  total_non_active_ratio = 0;
                        for (var t = 0; t < month.length; t++) {
                            if(!Number.isNaN(month[t])){
                                total_working_nonactive_time_s += month[t];
                            }
                            if(!Number.isNaN(working_time[t])){
                                total_working_time_s += working_time[t];
                            }
                            if(!Number.isNaN(non_active_ratio[t])){
                                total_non_active_ratio += non_active_ratio[t];
                            }
                        }
                    }


                    var tr =
                        "<tr><td>"+lines[l]+"</td>"+
                        "<td>"+lines[l]+"_"+$("#selectMachine").val()+"</td>"+
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
                        "<td>"+(total_working_nonactive_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+(total_working_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+  total_non_active_ratio.toFixed(2)+"</td>" +
                        "</tr>";
                    $("#tbody").append(tr);

                    // var graphObj = {};
                    // graphObj.MACHINE = lines[l]+"_"+$("#selectMachine").val();
                    // graphObj.stopTime = (total_working_nonactive_time_s / 3600).toFixed(2);
                    // graphObjArr.push(graphObj);

                    var graphObj = {};
                    var pieObj = {};
                    graphObj.MACHINE = lines[l]+"_"+$("#selectMachine").val();
                    graphObj.stopTime = (total_working_nonactive_time_s / 3600).toFixed(2);
                    graphObjArr.push(graphObj);

                    pieObj.label = lines[l]+"_"+$("#selectMachine").val();
                    pieObj.value = parseInt(((total_working_nonactive_time_s / 3600) + 1) * 10);
                    pieObjArr.push(pieObj);


                }

                // var settings = {
                //     selector: "#bar-label",
                //     width: 1400,
                //     height: 350,
                //     x: "MACHINE",
                //     y: "stopTime"
                // };
                // barchartLabel(graphObjArr, settings);
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
        closeLoading();
    }

});