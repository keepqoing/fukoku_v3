$(function() {
    fualtMachineMonitorByLine = {};

    fualtMachineMonitorByLine.getAllLinesName = function(fid){
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
                $('#selectLineSearch').empty();
                //$("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#selectLineSearch").append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    //fualtMachineMonitorByLine.getFualtData();


                    var queryString = decodeURIComponent(window.location.search);
                    queryString = queryString.substring(1);
                    var queries = queryString.split("&");
                    console.log("queries.length = " + queries.length);
                    if(queries.length > 1){
                        console.log("queries[0] = " + queries[0]);
                        console.log("queries[1] = " + queries[1]);
                        $("#selectLineSearch").val(queries[0]);
                        $("#yearSelected").val(queries[1]);



                        fualtMachineMonitorByLine.breakdowntimeanalysisbyline();
                    }

                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    fualtMachineMonitorByLine.getAllLinesName(2); // factory_id = 2;
    fualtMachineMonitorByLine.getFualtData = function () {
        var year = $('#yearSelected').val();
        var dataTable = $('#dataTable').DataTable();
        var line = $("#selectLineSearch").val();
        $.ajax({
            url:"/v1/api/fukoku/fault/find-by-line",
            type:'GET',
            dataType: 'JSON',
            data:{"year"    :   year, "line" : line},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {

                if(response.CODE == "7777"){
                    $("#line-bar").empty();
                    $("#tbody").empty();

                    for(var i=0;i<response.DataTables.length;i++){
                        $("#tbody").append("" +
                            "<tr>" +
                            "<td>"+response.DataTables[i].LINE_NAME+"</td>" +
                            "<td>"+response.DataTables[i].DISPLAY_NAME+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[0]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[1]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[2]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[3]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[4]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[5]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[6]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[7]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[8]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[9]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[10]+"</td>" +
                            "<td>"+response.DataTables[i].MONTHS[11]+"</td>" +
                            "<td>"+response.DataTables[i].TOTAL_STOP_TIME+"</td>" +
                            "<td></td>" +
                            "<td>"+response.DataTables[i].FAULT_RATE.toFixed(2)+"</td>" +
                            "</tr>"
                        );
                    }

                    var dataset = fualtMachineMonitorByLine.sortFunctionDesc(response.DataTables,"TOTAL_STOP_TIME");

                    var settings = {
                        selector: "#line-bar",
                        width: "1200",
                        height: "500",
                        xColumn:"DISPLAY_NAME",
                        yColumn:"TOTAL_STOP_TIME"
                    };
                    lineBarchart(dataset, settings);

                }else{
                    $("#line-bar").empty();
                    $("#tbody").empty();
                }
            },
            error:function(data,status,err) {
                $("#line-bar").empty();
                $("#tbody").empty();
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    $('#btnQuery').click(function () {
      // fualtMachineMonitorByLine.getFualtData();
        fualtMachineMonitorByLine.breakdowntimeanalysisbyline();
    });

    fualtMachineMonitorByLine.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    }




    fualtMachineMonitorByLine.breakdowntimeanalysisbyline = function () {
        openLoading();
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
                if (response.breakdowntimeanalysisbyline.length > 0) {
                // console.log("response", response);
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
                        if(data[i].month == 1 && response.machines[m].name == data[i].machine){ month[0] = data[i].fault_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].fault_time_s / data[i].working_time_s) * 100  }
                        if(data[i].month == 2  && response.machines[m].name == data[i].machine){ month[1] = data[i].fault_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 3  && response.machines[m].name == data[i].machine){ month[2] = data[i].fault_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 4  && response.machines[m].name == data[i].machine){ month[3] = data[i].fault_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 5  && response.machines[m].name == data[i].machine){ month[4] = data[i].fault_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 6  && response.machines[m].name == data[i].machine){ month[5] = data[i].fault_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 7  && response.machines[m].name == data[i].machine){ month[6] = data[i].fault_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 8  && response.machines[m].name == data[i].machine){ month[7] = data[i].fault_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 9  && response.machines[m].name == data[i].machine){ month[8] = data[i].fault_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 10  && response.machines[m].name == data[i].machine){ month[9] = data[i].fault_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 11  && response.machines[m].name == data[i].machine){ month[10] = data[i].fault_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 12  && response.machines[m].name == data[i].machine){ month[11] = data[i].fault_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].fault_time_s / data[i].working_time_s) * 100}
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
                        "<td>"+(total_working_nonactive_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+(total_working_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+  total_non_active_ratio.toFixed(2)+"</td>" +
                        "</tr>";
                    $("#tbody").append(tr);


                    var graphObj = {};
                    var pieObj = {};
                    graphObj.MACHINE = response.machines[m].name;
                    graphObj.stopTime = (total_working_nonactive_time_s / 3600).toFixed(2);
                    graphObjArr.push(graphObj);

                    pieObj.label = response.machines[m].name;
                    pieObj.value = parseInt(((total_working_nonactive_time_s / 3600) + 1) * 10);
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
                // barchartLabelWithClickNA(graphObjArr, settings);
                barchartLabelWithClickNA(graphObjArr, settings, $("#yearSelected").val(), "faultTimeAnalysisByMachine", "machine");
                }else{
                    $("#tbody").empty();
                    $("#bar-label").empty();
                    $("#donut-label").empty();
                    $("#tbody").append("<tr><td colspan='17'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            }
        });
    }

});