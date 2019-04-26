
var process={};
$(function () {


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });








    process.findMStateByLineAndStartTimeAndEndTime = function () {
        $.ajax({
            url: "/v1/api/fukoku/mstatemonitorline",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": "",
                "machineName": "IB_Pre"/*,
                "startTime": start,
                "endTime": end*/

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("QQQQQQQQQ "+response);
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


});

$(document).ready(function () {
process.findMStateByLineAndStartTimeAndEndTime();
});