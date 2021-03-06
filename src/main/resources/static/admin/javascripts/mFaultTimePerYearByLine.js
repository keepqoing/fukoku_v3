var getRespone = null;
var dataTable = $('#dataTable').DataTable();
var process = {};
var dataGraph;
$(function () {


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $(document).ready(function () {

        process.getLineName(2);



    });

    $(document).on('click', "#btnQuery", function () {
        //process.findMStateByLineAndStartTimeAndEndTime();
        process.breakdowntimeanalysisbyline();
    });

    process.getLineName = function (fid) {

        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  fid ,
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                // console.log(response);
                var elt = document.getElementById('lineName');

                while (elt.hasChildNodes()) {
                    elt.removeChild(elt.lastChild);
                }

                var i, len = response.data.length;

                for (i = 0; i < len; i++) {
                    var option = document.createElement("option");
                    option.text = response.data[i].name;
                    elt.add(option);
                }


                var queryString = decodeURIComponent(window.location.search);
                queryString = queryString.substring(1);
                var queries = queryString.split("&");
                console.log("queries.length = " + queries.length);
                if(queries.length > 1){
                    console.log("queries[0] = " + queries[0]);
                    console.log("queries[1] = " + queries[1]);
                    $("#lineName").val(queries[0]);
                    $("#yearSelected").val(queries[1]);


                    process.breakdowntimeanalysisbyline();
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        })
    }

    process.findMStateByLineAndStartTimeAndEndTime = function () {
        $("#bar-label").empty();


        var line = $("#lineName").val();
        var year = $("#yearSelected").val();
        $.ajax({
            url: "/v1/api/fukoku/faultime/totalHourByLine",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": line,
                "startTime": year /*,
                "startTime": start,
                "endTime": end*/

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
               // console.log("@@@@@@@@@@@@ ");
               //  console.log(response);
                // var settings = {
                //     selector: "#bar-label",
                //     width: 300,
                //     height: 300,
                //     x: "MACHINE",
                //     y: "stopTime"
                // };
                // barchartLabel(response.DataTables, settings);

                // console.log("Hello");
                var settings = {
                    selector: "#donut-label",
                    width: 1400,
                    height: 300,
                    x: "MACHINE",
                    y: "stopTime"
                };

                donutLabel(response.DataTables, settings);

                dataTable.rows()
                    .remove()
                    .draw();
                $("#tbody").empty();
                for (var i = 0; i < response.DataTables.length; i++) {
                    //console.log("%%%%%%%%%%% "+response.DataTables[i].MONTHS[0]);
                    $("#tbody").append("" +
                        "<tr><td>" + response.DataTables[i].LINE_NAME + "</td>" +
                        "<td>" + response.DataTables[i].MACHINE + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[0] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[1] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[2] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[3] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[4] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[5] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[6] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[7] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[8] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[9] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[10] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[11] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[12] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[13] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[14] + "</td></tr>"
                    );
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }


});


process.breakdowntimeanalysisbyline = function () {
    openLoading();
    $.ajax({
        url: "/v1/api/fukoku/daily-mstate-analysis/non_active_Time_by_machine",
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify({
            "work_date": $("#yearSelected").val(),
            "line": $("#lineName").val()
        }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (response) {
            if (response.breakdowntimeanalysisbyline.length > 0) {


                // console.log("response", response);
                let data = response.breakdowntimeanalysisbyline;
                var lines = [$("#lineName").val()];
                var month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var working_time = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var non_active_ratio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var tr = "";
                $("#tbody").empty();
                $("#bar-label").empty();
                $("#donut-label").empty();
                var graphObjArr = [];
                var pieObjArr = [];

                // for (var l = 0; l < lines.length; l++) {
                for (var m = 0; m < response.machines.length; m++) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].month == 1 && response.machines[m].name == data[i].machine) {
                            month[0] = data[i].working_nonactive_time_s;
                            working_time[0] = data[i].working_time_s;
                            non_active_ratio[0] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 2 && response.machines[m].name == data[i].machine) {
                            month[1] = data[i].working_nonactive_time_s;
                            working_time[1] = data[i].working_time_s;
                            non_active_ratio[1] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 3 && response.machines[m].name == data[i].machine) {
                            month[2] = data[i].working_nonactive_time_s;
                            working_time[2] = data[i].working_time_s;
                            non_active_ratio[2] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 4 && response.machines[m].name == data[i].machine) {
                            month[3] = data[i].working_nonactive_time_s;
                            working_time[3] = data[i].working_time_s;
                            non_active_ratio[3] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 5 && response.machines[m].name == data[i].machine) {
                            month[4] = data[i].working_nonactive_time_s;
                            working_time[4] = data[i].working_time_s;
                            non_active_ratio[4] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 6 && response.machines[m].name == data[i].machine) {
                            month[5] = data[i].working_nonactive_time_s;
                            working_time[5] = data[i].working_time_s;
                            non_active_ratio[5] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 7 && response.machines[m].name == data[i].machine) {
                            month[6] = data[i].working_nonactive_time_s;
                            working_time[6] = data[i].working_time_s;
                            non_active_ratio[6] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 8 && response.machines[m].name == data[i].machine) {
                            month[7] = data[i].working_nonactive_time_s;
                            working_time[7] = data[i].working_time_s;
                            non_active_ratio[7] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 9 && response.machines[m].name == data[i].machine) {
                            month[8] = data[i].working_nonactive_time_s;
                            working_time[8] = data[i].working_time_s;
                            non_active_ratio[8] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 10 && response.machines[m].name == data[i].machine) {
                            month[9] = data[i].working_nonactive_time_s;
                            working_time[9] = data[i].working_time_s;
                            non_active_ratio[9] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 11 && response.machines[m].name == data[i].machine) {
                            month[10] = data[i].working_nonactive_time_s;
                            working_time[10] = data[i].working_time_s;
                            non_active_ratio[10] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                        if (data[i].month == 12 && response.machines[m].name == data[i].machine) {
                            month[11] = data[i].working_nonactive_time_s;
                            working_time[11] = data[i].working_time_s;
                            non_active_ratio[11] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100
                        }
                    }

                    var total_working_nonactive_time_s = 0;
                    var total_working_time_s = 0;
                    var total_non_active_ratio = 0;
                    for (var t = 0; t < month.length; t++) {
                        if (!Number.isNaN(month[t])) {
                            total_working_nonactive_time_s += month[t];
                        }
                        if (!Number.isNaN(working_time[t])) {
                            total_working_time_s += working_time[t];
                        }
                        if (!Number.isNaN(non_active_ratio[t])) {
                            total_non_active_ratio += non_active_ratio[t];
                        }
                    }


                    // console.log("Machine is ["+m+"] = "+response.machines[m].name);

                    var tr =
                        "<tr><td>" + $("#lineName").val() + "</td>" +
                        "<td>" + response.machines[m].name + "</td>" +
                        "<td>" + (month[0] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[1] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[2] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[3] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[4] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[5] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[6] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[7] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[8] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[9] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[10] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (month[11] / 3600).toFixed(2) + "</td>" +
                        "<td>" + (total_working_nonactive_time_s / 3600).toFixed(2) + "</td>" +
                        "<td>" + (total_working_time_s / 3600).toFixed(2) + "</td>" +
                        "<td>" + total_non_active_ratio.toFixed(2) + "</td>" +
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


                var pie = new d3pie("donut-label", {
                    "data": {
                        "content": pieObjArr
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
                // barchartLabel(graphObjArr, settings);
                barchartLabelWithClick(graphObjArr, settings, $("#yearSelected").val(), "non_active_Time_by_machine", "machine");


        }else{
                $("#tbody").empty();
                $("#bar-label").empty();
                $("#donut-label").empty();
                $("#tbody").append("<tr><td colspan='15'>콘텐츠 없음</td></tr>");
        }
            closeLoading();
        }
    });
}






$('#dataTable').on('page.dt', function () {
    var info = dataTable.page.info();
    console.log('Showing page: ' + info.page + ' of ' + info.pages);
});

/*$(document).ready(function () {
    dataTable = $('#dataTable').DataTable();
process.findMStateByLineAndStartTimeAndEndTime();
});*/

/*var data = [
    {
    ID: 0, MACHINE_NAME: "IB_Balancer", _DATE: "2018-01", LINE_NAME: "IB", TOTAL_WAIT: "1.2670000344514847",TOTAL_MANUAL:"2.7289999946951866"
    }
];*/

