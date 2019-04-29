var getRespone = null;
var  dataTable = $('#dataTable').DataTable();
var dataTablePre = $('#dataTablePre').DataTable();
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
        process.getLineName(2);

    });

    $(document).on('click', "#btnQuery", function () {
        process.findCase2StopAutoWait();

    });
    var getline;
    var getMachine;
    process.selectMachine = function () {
        getline = $("#lineName").val();

        process.getPrefixMachineName()
    }

    process.getPrefixMachineName = function () {
        $.ajax({
           /* url:"/v1/api/fukoku/machine/select-box",*/
            url: "/v3/api/fukoku/machine/findAllByLine/" + getline,
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
                var elt = document.getElementById('machineName');

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

    var totalHourEachMonth = {monthsAll: []};
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
                console.log(response);
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

                process.selectMachine();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        })
    }
    var jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
    process.findCase2StopAutoWait = function () {
        $("#bar-label").empty();


        var line = $("#lineName").val();
        var year = $("#yearSelected").val();
        getMachine = $("#machineName").val();

        $.ajax({
            url: "/v1/api/fukoku/FailureRateAnalysis/getFailureRateAnalysis",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": getline,
                "startTime": year,
                "machineName": getMachine


            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                dataTablePre.rows()
                    .remove()
                    .draw();

                dataTable.rows()
                    .remove()
                    .draw();
                console.log(response);
                $("#groupbarchartWithLine").empty();

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



                    dataTablePre.row.add([
                         parseInt(year)-1  + '년 고장시간',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();
                    dataTablePre.row.add([
                        parseInt(year)-1 + '년 고장건수',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();
                    dataTablePre.row.add([
                        parseInt(year)-1 + '년 가동시간',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();
                    dataTablePre.row.add([
                        parseInt(year)-1 + '년 MTBF',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();
                    dataTablePre.row.add([
                        parseInt(year)-1 + '년 MTTR',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();
                    dataTablePre.row.add([
                        parseInt(year)-1 + '년 고장율%',0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]).draw();




                var data = [
                    { Date: "1월", Categories: [{ Name: "Category1", Value: 0 }, { Name: "Category2", Value: 5 }], LineCategory: [{ Name: "Line1", Value: 0 }, { Name: "Line2", Value: 0 }] },
                    { Date: "2월", Categories: [{ Name: "Category1", Value: 0 }, { Name: "Category2", Value: 5 }], LineCategory: [{ Name: "Line1", Value: 0 }, { Name: "Line2", Value: 0 }] },
                    { Date: "3월", Categories: [{ Name: "Category1", Value: 0 }, { Name: "Category2", Value: 5 }], LineCategory: [{ Name: "Line1", Value: 0 }, { Name: "Line2", Value: 0 }] },
                    { Date: "4월", Categories: [{ Name: "Category1", Value: 0 }, { Name: "Category2", Value: 5 }], LineCategory: [{ Name: "Line1", Value: 0 }, { Name: "Line2", Value: 0 }] },

                ];
                var settings = {
                    selecctor: "#groupbarchartWithLine",
                    width: 1400,
                    height: 500
                }
                groupBarchartWithTrendLine(data, settings);
               // }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


});


$('#dataTable').on('page.dt', function () {
    var info = dataTable.page.info();
    console.log('Showing page: ' + info.page + ' of ' + info.pages);
});

