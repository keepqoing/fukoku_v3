$(function() {

    var plantProductionLosses = {};
    var limit = 20;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    plantProductionLosses.getAllLinesName = function(){
        $.ajax({
            url: "/v1/api/fukoku/line/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    plantProductionLosses.getAllLinesName();

    plantProductionLosses.getAllProductionByLineTable = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/date",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"          :   $("#selectLine").val(),
                "status"        :   "YES",
                "mState"        :   "STOP",
                "startDate"     :   $("#txtStartDate").val(),
                "endDate"       :   $("#txtEndDate").val(),
                "limit"         :   limit
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ALARM").html("");
                    if (response.DATA.length > 0) {
                        var a = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = a;
                            a++;
                            var duration = response.DATA[key].DURATION/60;
                            response.DATA[key]["DURATION"] = duration.toFixed(3);
                        });
                        $("#ALARM_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM");
                        $("#btnLoadMore").show();
                    } else {
                        $("#ALARM").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                        $("#btnLoadMore").hide();
                    }
                } else {
                    $("#ALARM").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                    $("#btnLoadMore").hide();
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    $("#btnQuery").click(function(){
        plantProductionLosses.getAllProductionByLineTable();
    });

    $("#btnLoadMore").click(function(){
    limit += 20;
        plantProductionLosses.getAllProductionByLineTable();
    });

    $("#btnLoadMore").hide();

});