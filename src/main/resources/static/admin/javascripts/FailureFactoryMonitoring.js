var getRespone = null;
var dataTable = $('#dataTable').DataTable();
var process = {};

$(function () {


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $(document).ready(function () {

      //  process.getFactoryName();
    });

    process.getFactoryName = function () {
        $.ajax({
            url: "/v1/api/fukoku/FailureFactoryMonitoring/getFactoryName",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
                var elt = document.getElementById('factoryName');

                while (elt.hasChildNodes()) {
                    elt.removeChild(elt.lastChild);
                }

                var i, len = response.DATA.length;

                for (i = 0; i < len; i++) {
                    var option = document.createElement("option");
                    option.text = response.DATA[i].FACTORY_NAME;
                    elt.add(option);
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        })
    }

    var jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
    process.findMStateByLineAndStartTimeAndEndTime = function () {
        $("#bar-label").empty();


        var line = $("#lineName").val();
        var year = $("#yearSelected").val();
        $.ajax({
            url: "/v1/api/fukoku/faultimeAllLine/totalHourByAllLine",
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
                console.log(response);
                var data = JSON.parse(response.GraphData);
                dataTable.rows()
                    .remove()
                    .draw();

                $("#line-bar").empty();
                $("#tbody").empty();

                for (var i = 0; i < response.DataTables.length; i++) {
                    $("#tbody").append("" +
                        "<tr><td>" + response.DataTables[i].LINE_NAME + "</td>" +
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
                        "<td>" + response.DataTables[i].MONTHS[12]+ "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[13] + "</td>" +
                        "<td>" + response.DataTables[i].MONTHS[14] + "</td></tr>"
                    );
                }


                var settings = {
                    selector: "#line-bar",
                    width: "1000",
                    height: "500"
                };

                lineBarchart(data, settings);
                console.log("***************** " + JSON.stringify(data));
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


    process.breakdowntimeanalysisbyline = function () {
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
                var month = [0,0,0,0,0,0,0,0,0,0,0,0]; var working_time = [0,0,0,0,0,0,0,0,0,0,0,0];
                var non_active_ratio = [0,0,0,0,0,0,0,0,0,0,0,0];
                var tr = "";
                $("#bar-label").empty();
                $("#donut-label").empty();

                var graphObjArr = [];
                var pieObjArr = [];
                for (var l = 0; l < lines.length; l++) {
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].month == 1 && lines[l] == data[i].line){ month[0] = data[i].working_nonactive_time_s; working_time[0] = data[i].working_time_s ; non_active_ratio[0] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100  }
                        if(data[i].month == 2 && lines[l] == data[i].line){ month[1] = data[i].working_nonactive_time_s; working_time[1] = data[i].working_time_s ; non_active_ratio[1] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 3 && lines[l] == data[i].line){ month[2] = data[i].working_nonactive_time_s; working_time[2] = data[i].working_time_s ; non_active_ratio[2] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 4 && lines[l] == data[i].line){ month[3] = data[i].working_nonactive_time_s; working_time[3] = data[i].working_time_s ; non_active_ratio[3] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 5 && lines[l] == data[i].line){ month[4] = data[i].working_nonactive_time_s; working_time[4] = data[i].working_time_s ; non_active_ratio[4] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 6 && lines[l] == data[i].line){ month[5] = data[i].working_nonactive_time_s; working_time[5] = data[i].working_time_s ; non_active_ratio[5] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 7 && lines[l] == data[i].line){ month[6] = data[i].working_nonactive_time_s; working_time[6] = data[i].working_time_s ; non_active_ratio[6] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 8 && lines[l] == data[i].line){ month[7] = data[i].working_nonactive_time_s; working_time[7] = data[i].working_time_s ; non_active_ratio[7] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 9 && lines[l] == data[i].line){ month[8] = data[i].working_nonactive_time_s; working_time[8] = data[i].working_time_s ; non_active_ratio[8] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 10 && lines[l] == data[i].line){ month[9] = data[i].working_nonactive_time_s; working_time[9] = data[i].working_time_s ; non_active_ratio[9] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 11 && lines[l] == data[i].line){ month[10] = data[i].working_nonactive_time_s; working_time[10] = data[i].working_time_s ; non_active_ratio[10] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
                        if(data[i].month == 12 && lines[l] == data[i].line){ month[11] = data[i].working_nonactive_time_s; working_time[11] = data[i].working_time_s ; non_active_ratio[11] = (data[i].working_nonactive_time_s / data[i].working_time_s) * 100}
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
                        "<td>"+(total_working_nonactive_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+(total_working_time_s / 3600).toFixed(2)+"</td>" +
                        "<td>"+  total_non_active_ratio.toFixed(2)+"</td>" +
                        "</tr>";
                    $("#tbody").append(tr);

                    // var graphObj = {};
                    // graphObj.year = lines[l];
                    // graphObj.line1 = lines[l];
                    // graphObj.bar = (total_working_nonactive_time_s / 3600).toFixed(2);
                    // graphObjArr.push(graphObj);

                    var graphObj = {};
                    var pieObj = {};
                    graphObj.line1 = lines[l];
                    graphObj.bar = (total_working_nonactive_time_s / 3600).toFixed(2);
                    graphObjArr.push(graphObj);

                    pieObj.label = lines[l];
                    pieObj.value = parseInt(((total_working_nonactive_time_s / 3600)+1) * 10);
                    pieObjArr.push(pieObj);


                }

                // var settings = {
                //     selector: "#line-bar",
                //     width: "1000",
                //     height: "500"
                // };
                // lineBarchart(graphObjArr, settings);


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
                    x: "line1",
                    y: "bar"
                };
                barchartLabelWithClick(graphObjArr, settings,  $("#yearSelected").val(), "stop_offl_Line", "line");


                closeLoading();

                // console.log(month);

            }

        });

    }


    $(document).on('click', "#btnQuery", function () {
       process.breakdowntimeanalysisbyline();
       //process.findMStateByLineAndStartTimeAndEndTime();
    });


});


$('#dataTable').on('page.dt', function () {
    var info = dataTable.page.info();
    console.log('Showing page: ' + info.page + ' of ' + info.pages);
});
