var getRespone=null;
var dataTable = $('#dataTable').DataTable();
var process={};

$(function () {


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $(document).ready(function () {
        process.getFactoryName();
    });

   /* $(document).on('click',"#btnQuery" , function(){
        process.fineMachineNameInFactory();

    });*/

    var totalHourEachMonth = {monthsAll:[]};

    process.getFactoryName=function () {
        $.ajax({
            url: "/v1/api/fukoku/FailureFactoryMonitoring/getFactoryName",
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
    $(document).on('click', "#btnQuery", function () {
        process.findMStateByLineAndStartTimeAndEndTime();

    });
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
            var data=[];
            console.log(response);

                $("#line-bar").empty();

                dataTable.rows()
                    .remove()
                    .draw();


                $.each(response, function (key, value) {
                    $("#line-bar").empty();

                    //TODO Store STOPAUTOWAIT Dawta each month
                    jan = value[value.length >= 1 ? 0 : 0]._DATE.match("2018-01") ? value[value.length >= 1 ? 0 : 0].STOPAUTOWAIT : 0;//TODO Jan
                    feb = value[value.length >= 2 ? 1 : 0]._DATE.match("2018-02") ? value[value.length >= 2 ? 1 : 0].STOPAUTOWAIT : 0;//TODO Feb
                    mar = value[value.length > 2 ? 2 : 0]._DATE.match("2018-03") ? value[value.length > 2 ? 2 : 0].STOPAUTOWAIT : 0;//TODO Mar
                    apr = value[value.length > 3 ? 3 : 0]._DATE.match("2018-04") ? value[value.length > 3 ? 3 : 0].STOPAUTOWAIT : 0;//TODO Apr
                    may = value[value.length >= 5 ? 4 : 0]._DATE.match("2018-05") ? value[value.length >= 5 ? 4 : 0].STOPAUTOWAIT : 0;//TODO May
                    jun = value[value.length >= 6 ? 5 : 0]._DATE.match("2018-06") ? value[value.length >= 6 ? 5 : 0].STOPAUTOWAIT : 0;//TODO June
                    jul = value[value.length >= 7 ? 6 : 0]._DATE.match("2018-07") ? value[value.length >= 7 ? 6 : 0].STOPAUTOWAIT : 0;//TODO July
                    aug = value[value.length >= 8 ? 7 : 0]._DATE.match("2018-08") ? value[value.length >= 8 ? 7 : 0].STOPAUTOWAIT : 0;//TODO Aug
                    sep = value[value.length >= 9 ? 8 : 0]._DATE.match("2018-09") ? value[value.length >= 9 ? 8 : 0].STOPAUTOWAIT : 0;//TODO Sept
                    oct = value[value.length >= 10 ? 9 : 0]._DATE.match("2018-10") ? value[value.length >= 10 ? 9 : 0].STOPAUTOWAIT : 0;//TODO Oct
                    nov = value[value.length >= 11 ? 10 : 0]._DATE.match("2018-11") ? value[value.length >= 11 ? 10 : 0].STOPAUTOWAIT : 0;//TODO Nov
                    dec = value[value.length >= 12 ? 11 : 0]._DATE.match("2018-12") ? value[value.length >= 12 ? 11 : 0].STOPAUTOWAIT : 0;//TODO Dec

                    //TODO convert to float easy to sum data
                    var combeine =
                        parseFloat(jan) +
                        parseFloat(feb) +
                        parseFloat(mar) +
                        parseFloat(apr) +
                        parseFloat(may) +
                        parseFloat(jun) +
                        parseFloat(jul) +
                        parseFloat(aug) +
                        parseFloat(sep) +
                        parseFloat(oct) +
                        parseFloat(nov) +
                        parseFloat(dec);
                    console.log("Combine 3Month !!!!!! "+combeine);
//TODO Store working time Each month
                    var janWorkingTime = value[value.length >= 1 ? 0 : 0]._DATE.match("2018-01") ? value[value.length >= 1 ? 0 : 0].WORKINGTIME : 0;//TODO Jan
                    var febWorkingTime = value[value.length >= 2 ? 1 : 0]._DATE.match("2018-02") ? value[value.length >= 2 ? 1 : 0].WORKINGTIME : 0;//TODO Feb
                    var marWorkingTime = value[value.length > 2 ? 2 : 0]._DATE.match("2018-03") ? value[value.length > 2 ? 2 : 0].WORKINGTIME : 0;//TODO Mar
                    var aprWorkingTime = value[value.length > 3 ? 3 : 0]._DATE.match("2018-04") ? value[value.length > 3 ? 3 : 0].WORKINGTIME : 0;//TODO Apr
                    var mayWorkingTime = value[value.length >= 5 ? 4 : 0]._DATE.match("2018-05") ? value[value.length >= 5 ? 4 : 0].WORKINGTIME : 0;//TODO May
                    var junWorkingTime = value[value.length >= 6 ? 5 : 0]._DATE.match("2018-06") ? value[value.length >= 6 ? 5 : 0].WORKINGTIME : 0;//TODO June
                    var julWorkingTime = value[value.length >= 7 ? 6 : 0]._DATE.match("2018-07") ? value[value.length >= 7 ? 6 : 0].WORKINGTIME : 0;//TODO July
                    var augWorkingTime = value[value.length >= 8 ? 7 : 0]._DATE.match("2018-08") ? value[value.length >= 8 ? 7 : 0].WORKINGTIME : 0;//TODO Aug
                    var sepWorkingTime = value[value.length >= 9 ? 8 : 0]._DATE.match("2018-09") ? value[value.length >= 9 ? 8 : 0].WORKINGTIME : 0;//TODO Sept
                    var octWorkingTime = value[value.length >= 10 ? 9 : 0]._DATE.match("2018-10") ? value[value.length >= 10 ? 9 : 0].WORKINGTIME : 0;//TODO Oct
                    var novWorkingTime = value[value.length >= 11 ? 10 : 0]._DATE.match("2018-11") ? value[value.length >= 11 ? 10 : 0].WORKINGTIME : 0;//TODO Nov
                    var decWorkingTime = value[value.length >= 12 ? 11 : 0]._DATE.match("2018-12") ? value[value.length >= 12 ? 11 : 0].WORKINGTIME : 0;//TODO Dec
//TODO Store planingnonworkingtime  each month
                    var janplaningnonworkingtime = value[value.length >= 1 ? 0 : 0]._DATE.match("2018-01") ? value[value.length >= 1 ? 0 : 0].PLANINGNONWORKINGTIME : 0;//TODO Jan
                    var febplaningnonworkingtime = value[value.length >= 2 ? 1 : 0]._DATE.match("2018-02") ? value[value.length >= 2 ? 1 : 0].PLANINGNONWORKINGTIME : 0;//TODO Feb
                    var marplaningnonworkingtime = value[value.length > 2 ? 2 : 0]._DATE.match("2018-03") ? value[value.length > 2 ? 2 : 0].PLANINGNONWORKINGTIME : 0;//TODO Mar
                    var aprplaningnonworkingtime = value[value.length > 3 ? 3 : 0]._DATE.match("2018-04") ? value[value.length > 3 ? 3 : 0].PLANINGNONWORKINGTIME : 0;//TODO Apr
                    var mayplaningnonworkingtime = value[value.length >= 5 ? 4 : 0]._DATE.match("2018-05") ? value[value.length >= 5 ? 4 : 0].PLANINGNONWORKINGTIME : 0;//TODO May
                    var junplaningnonworkingtime = value[value.length >= 6 ? 5 : 0]._DATE.match("2018-06") ? value[value.length >= 6 ? 5 : 0].PLANINGNONWORKINGTIME : 0;//TODO June
                    var julplaningnonworkingtime = value[value.length >= 7 ? 6 : 0]._DATE.match("2018-07") ? value[value.length >= 7 ? 6 : 0].PLANINGNONWORKINGTIME : 0;//TODO July
                    var augplaningnonworkingtime = value[value.length >= 8 ? 7 : 0]._DATE.match("2018-08") ? value[value.length >= 8 ? 7 : 0].PLANINGNONWORKINGTIME : 0;//TODO Aug
                    var sepplaningnonworkingtime = value[value.length >= 9 ? 8 : 0]._DATE.match("2018-09") ? value[value.length >= 9 ? 8 : 0].PLANINGNONWORKINGTIME : 0;//TODO Sept
                    var octplaningnonworkingtime = value[value.length >= 10 ? 9 : 0]._DATE.match("2018-10") ? value[value.length >= 10 ? 9 : 0].PLANINGNONWORKINGTIME : 0;//TODO Oct
                    var novplaningnonworkingtime = value[value.length >= 11 ? 10 : 0]._DATE.match("2018-11") ? value[value.length >= 11 ? 10 : 0].PLANINGNONWORKINGTIME : 0;//TODO Nov
                    var decplaningnonworkingtime = value[value.length >= 12 ? 11 : 0]._DATE.match("2018-12") ? value[value.length >= 12 ? 11 : 0].PLANINGNONWORKINGTIME : 0;//TODO Dec
//TODO Store totalLoadTIme
                    var totalLoadTime = parseFloat(janWorkingTime) - parseFloat(janplaningnonworkingtime) +
                        parseFloat(febWorkingTime) - parseFloat(febplaningnonworkingtime) +
                        parseFloat(marWorkingTime) - parseFloat(marplaningnonworkingtime) +
                        parseFloat(aprWorkingTime) - parseFloat(aprplaningnonworkingtime) +
                        parseFloat(mayWorkingTime) - parseFloat(mayplaningnonworkingtime) +
                        parseFloat(junWorkingTime) - parseFloat(junplaningnonworkingtime) +
                        parseFloat(julWorkingTime) - parseFloat(julplaningnonworkingtime) +
                        parseFloat(augWorkingTime) - parseFloat(augplaningnonworkingtime) +
                        parseFloat(sepWorkingTime) - parseFloat(sepplaningnonworkingtime) +
                        parseFloat(octWorkingTime) - parseFloat(octplaningnonworkingtime) +
                        parseFloat(novWorkingTime) - parseFloat(novplaningnonworkingtime) +
                        parseFloat(decWorkingTime) - parseFloat(decplaningnonworkingtime);

                    console.log("Combine 3months totalLoadTime: "+totalLoadTime);
//TODO Store totalFailureRate
                    var totalFailureRate =
                        isFinite((parseFloat(jan) / (parseFloat(janWorkingTime) - parseFloat(janplaningnonworkingtime))) * 100) ? (parseFloat(jan) / (parseFloat(janWorkingTime) - parseFloat(janplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(feb) / (parseFloat(febWorkingTime) - parseFloat(febplaningnonworkingtime))) * 100) ? (parseFloat(feb) / (parseFloat(febWorkingTime) - parseFloat(febplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(mar) / (parseFloat(marWorkingTime) - parseFloat(marplaningnonworkingtime))) * 100) ? (parseFloat(mar) / (parseFloat(marWorkingTime) - parseFloat(marplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(apr) / (parseFloat(aprWorkingTime) - parseFloat(aprplaningnonworkingtime))) * 100) ? (parseFloat(apr) / (parseFloat(aprWorkingTime) - parseFloat(aprplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(may) / (parseFloat(mayWorkingTime) - parseFloat(mayplaningnonworkingtime))) * 100) ? (parseFloat(may) / (parseFloat(mayWorkingTime) - parseFloat(mayplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(jun) / (parseFloat(junWorkingTime) - parseFloat(junplaningnonworkingtime))) * 100) ? (parseFloat(jun) / (parseFloat(junWorkingTime) - parseFloat(junplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(jul) / (parseFloat(julWorkingTime) - parseFloat(julplaningnonworkingtime))) * 100) ? (parseFloat(jul) / (parseFloat(julWorkingTime) - parseFloat(julplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(aug) / (parseFloat(augWorkingTime) - parseFloat(augplaningnonworkingtime))) * 100) ? (parseFloat(aug) / (parseFloat(augWorkingTime) - parseFloat(augplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(sep) / (parseFloat(sepWorkingTime) - parseFloat(sepplaningnonworkingtime))) * 100) ? (parseFloat(sep) / (parseFloat(sepWorkingTime) - parseFloat(sepplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(oct) / (parseFloat(octWorkingTime) - parseFloat(octplaningnonworkingtime))) * 100) ? (parseFloat(oct) / (parseFloat(octWorkingTime) - parseFloat(octplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(nov) / (parseFloat(novWorkingTime) - parseFloat(novplaningnonworkingtime))) * 100) ? (parseFloat(nov) / (parseFloat(novWorkingTime) - parseFloat(novplaningnonworkingtime))) * 100 : 0 +
                        isFinite((parseFloat(dec) / (parseFloat(decWorkingTime) - parseFloat(decplaningnonworkingtime))) * 100) ? (parseFloat(dec) / (parseFloat(decWorkingTime) - parseFloat(decplaningnonworkingtime))) * 100 : 0;

                    data.push( {
                        "year": value[0].LINE_NAME,
                        "bar": combeine.toFixed(3),

                    });



                    //Creare Dynamic Row
                    dataTable.row.add([
                        value[0].LINE_NAME,
                        value[value.length >= 1 ? 0 : 0]._DATE.match("2018-01") ? value[value.length >= 1 ? 0 : 0].STOPAUTOWAIT : 0,//TODO Jan
                        value[value.length >= 2 ? 1 : 0]._DATE.match("2018-02") ? value[value.length >= 2 ? 1 : 0].STOPAUTOWAIT : 0,//TODO Feb
                        value[value.length > 2 ? 2 : 0]._DATE.match("2018-03") ? value[value.length > 2 ? 2 : 0].STOPAUTOWAIT : 0,//TODO Mar
                        value[value.length > 3 ? 3 : 0]._DATE.match("2018-04") ? value[value.length > 3 ? 3 : 0].STOPAUTOWAIT : 0,//TODO Apr
                        value[value.length >= 5 ? 4 : 0]._DATE.match("2018-05") ? value[value.length >= 5 ? 4 : 0].STOPAUTOWAIT : 0,//TODO May
                        value[value.length >= 6 ? 5 : 0]._DATE.match("2018-06") ? value[value.length >= 6 ? 5 : 0].STOPAUTOWAIT : 0,//TODO June
                        value[value.length >= 7 ? 6 : 0]._DATE.match("2018-07") ? value[value.length >= 7 ? 6 : 0].STOPAUTOWAIT : 0,//TODO July
                        value[value.length >= 8 ? 7 : 0]._DATE.match("2018-08") ? value[value.length >= 8 ? 7 : 0].STOPAUTOWAIT : 0,//TODO Aug
                        value[value.length >= 9 ? 8 : 0]._DATE.match("2018-09") ? value[value.length >= 9 ? 8 : 0].STOPAUTOWAIT : 0,//TODO Sept
                        value[value.length >= 10 ? 9 : 0]._DATE.match("2018-10") ? value[value.length >= 10 ? 9 : 0].STOPAUTOWAIT : 0,//TODO Oct
                        value[value.length >= 11 ? 10 : 0]._DATE.match("2018-11") ? value[value.length >= 11 ? 10 : 0].STOPAUTOWAIT : 0,//TODO Nov
                        value[value.length >= 12 ? 11 : 0]._DATE.match("2018-12") ? value[value.length >= 12 ? 11 : 0].STOPAUTOWAIT : 0,//TODO Dec
                        combeine.toFixed(3),//TODO 총고장시간
                        totalLoadTime.toFixed(3),//TODO 충부하시간
                        totalFailureRate.toFixed(3),//TODO 고장율(%)

                    ]).draw();

                });



                var settings = {
                    selector: "#line-bar",
                    width: "1200",
                    height: "500"
                };
                lineBarchart(data, settings);
                console.log("***************** "+JSON.stringify(data));
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


    process.fineMachineNameInFactory = function () {
        $("#bar-label").empty();


        var line=$("#lineName").val();
        var year=$("#yearSelected").val();
        $.ajax({
            url: "/v1/api/fukoku/FailureFactoryMonitoring/FailureFactoryMonitoringMachine",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": line,
                "startTime":year /*,
                "startTime": start,
                "endTime": end*/

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
                $("#line-bar").empty();
                dataTable.rows()
                    .remove()
                    .draw();
                if (response.DATA === null) {
                }
                else{
                    $.each(response.DATA, function (key, value) {
                        console.log("@@@@ "+value.MACHINE_NAME)
                        dataTable.row.add([
                            value.MACHINE_NAME,
                             0,//TODO Jan
                             0,//TODO Feb
                             0,//TODO Mar
                             0,//TODO Apr
                             0,//TODO May
                             0,//TODO June
                             0,//TODO July
                             0,//TODO Aug
                             0,//TODO Sept
                             0,//TODO Oct
                             0,//TODO Nov
                             0,//TODO Dec
                             0,//TODO 총고장시간
                             0,//TODO 충부하시간
                             0,//TODO 고장율(%)

                        ]).draw();
                    });
                }


                var data = [
                    {
                        "year": 'HA',
                        "bar": 120,
                        "line1": 5.5
                    },
                    {
                        "year": 'HB',
                        "bar": 100,
                        "line1": 4.6
                    },
                    {
                        "year": 'HC',
                        "bar": 100,
                        "line1": 4.6
                    },
                    {
                        "year": 'HD',
                        "bar": 80,
                        "line1": 3.7
                    },
                    {
                        "year": 'IB',
                        "bar": 60,
                        "line1": 2.8
                    },
                    {
                        "year": 'PD',
                        "bar": 50,
                        "line1": 2.3
                    }
                ];


                var settings = {
                    selector: "#line-bar",
                    width: "1200",
                    height: "500"
                };
                lineBarchart(data, settings);
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


});


$('#dataTable').on('page.dt', function(){
    var info = dataTable.page.info();
    console.log( 'Showing page: '+info.page+' of '+info.pages );
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
