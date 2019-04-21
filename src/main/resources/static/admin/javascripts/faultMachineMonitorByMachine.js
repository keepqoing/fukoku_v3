$(function() {
    fualtMachineMonitorByMachine = {};

    fualtMachineMonitorByMachine.getPrefixMachineName=function () {
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllDistinct",
            type: 'GET',
            dataType: 'JSON',
            data: {
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
                var elt = document.getElementById('selectMachine');

                while (elt.hasChildNodes()) {
                    elt.removeChild(elt.lastChild);
                }

                var i, len = response.data.length;

                for (i = 0; i < len; i++) {
                    var option = document.createElement("option");
                    option.text = response.data[i].name;
                    elt.add(option);
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        })
    }

    fualtMachineMonitorByMachine.getAllMachinesName = function(){
        var machineName = "";
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllDistinct",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){

                        $("#selectMachine").append("<option value='"+value.name+"' data-id="+value.id+">"+value.name+"</option>");
                    });
                    $("#selectMachine").prop("selectedIndex",1).change();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };



    fualtMachineMonitorByMachine.getFualtData = function () {
        var year = $('#yearSelected').val();
        var dataTable = $('#dataTable').DataTable();
        var machine = $("#selectMachine").val();
        $.ajax({
            url:"/v1/api/fukoku/fault/find-by-machine",
            type:'GET',
            dataType: 'JSON',
            data:{"year"    :   year, "machine" : machine},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                console.log(response);
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
                            "<td>"+response.DataTables[i].FAULT_RATE+"</td>" +
                            "</tr>"
                        );
                    }

                    var dataset = fualtMachineMonitorByMachine.sortFunctionDesc(response.DataTables,"TOTAL_STOP_TIME");
                    console.log(dataset);
                    dataset = jQuery.map(dataset,function (n) {
                            return {
                                "DISPLAY_NAME": n.LINE_NAME + " " + n.DISPLAY_NAME,
                                "TOTAL_STOP_TIME": n.TOTAL_STOP_TIME
                            }
                        });
                    console.log(dataset);
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
       // fualtMachineMonitorByMachine.getFualtData();
        fualtMachineMonitorByMachine.breakdowntimeanalysisbyline();
    });

    fualtMachineMonitorByMachine.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    }


    fualtMachineMonitorByMachine.breakdowntimeanalysisbyline = function () {
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

                $("#bar-label").empty();
                for (var l = 0; l < lines.length; l++) {
                    for (var m = 0; m < response.machines.length; m++) {
                        for (var i = 0; i < data.length; i++) {
                            if(data[i].month == 1 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[0] = data[i].fault_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].fault_time_s / data[i].working_time_s) * 100  }
                            if(data[i].month == 2 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[1] = data[i].fault_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 3 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[2] = data[i].fault_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 4 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[3] = data[i].fault_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 5 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[4] = data[i].fault_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 6 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[5] = data[i].fault_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 7 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[6] = data[i].fault_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 8 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[7] = data[i].fault_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 9 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[8] = data[i].fault_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 10 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[9] = data[i].fault_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 11 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[10] = data[i].fault_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].fault_time_s / data[i].working_time_s) * 100}
                            if(data[i].month == 12 && lines[l] == data[i].line && response.machines[m].name == data[i].machine){ month[11] = data[i].fault_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].fault_time_s / data[i].working_time_s) * 100}
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


    // fualtMachineMonitorByMachine.getPrefixMachineName();
    fualtMachineMonitorByMachine.getAllMachinesName();
});