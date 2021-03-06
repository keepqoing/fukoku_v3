$(function() {

    var plantProductionLosses = {};

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

    plantProductionLosses.getAllProductName = function(){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       $("#selectLine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                $("#selectProduct").append("<option value=''>모든</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectProduct").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    plantProductionLosses.getAllLinesName();

    $("#selectLine").change(function(){
        plantProductionLosses.getAllProductName();
    });

    /*
    plantProductionLosses.getAllProductionByLineTable = function () {
        if($("#selectLine").val() ==""){ alert("Please select a line!"); return ; }
        if($("#txtStartDate").val() ==""){ alert("Please select date!"); return ; }
        if($("#txtEndDate").val() ==""){ alert("Please select date!"); return ; }
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/daily-mstate-analysis/find",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "line"          :   $("#selectLine").val(),
                "machine"       :   "",
                "start_date"     :   $("#txtStartDate").val(),
                "end_date"       :   $("#txtEndDate").val()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.daily_mstate_analysis != null) {
                    $("#PRODUCTION_BY_LINE").html("");
                    if (response.daily_mstate_analysis.length > 0) {
                        var a = 1;
                        $.each(response.daily_mstate_analysis, function (key, value) {
                            response.daily_mstate_analysis[key]["NO"] = a;
                            a++;
                            //var s = response.DATA[key].NON_RUNNING_TIME/(response.DATA[key].RUNNING_TIME+response.DATA[key].NON_RUNNING_TIME);
                            //response.DATA[key]["PERCENTAGE_NON_RUNNING_TIME"] = parseFloat(s.toFixed(3))?parseFloat(s.toFixed(3)*100).toFixed(3):0;
                            //var s1 = response.DATA[key].TOTAL_DEFECTIVE_PRODUCT/response.DATA[key].TOTAL_PRODUCT;
                           // response.DATA[key]["PERCENTAGE_DEFECTIVE_PRODUCT"] = parseFloat(s1.toFixed(3))?parseFloat(s1.toFixed(3)*100).toFixed(3):0;
                            //response.DATA[key]["UPH"] = parseInt(response.DATA[key].UPH);
                        });
                        $("#PRODUCTION_BY_LINE_TEMPLATE").tmpl(response.daily_mstate_analysis).appendTo("tbody#PRODUCTION_BY_LINE");
                    } else {
                        $("#PRODUCTION_BY_LINE").html("<tr style='text-align:center;'><td colspan='13'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#PRODUCTION_BY_LINE").html("<tr style='text-align:center;'><td colspan='13'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
*/


    plantProductionLosses.getAllProductionByLineTable = function () {
        if($("#selectLine").val() ==""){ alert("Please select a line!"); return ; }
        if($("#txtStartDate").val() ==""){ alert("Please select date!"); return ; }
        if($("#txtEndDate").val() ==""){ alert("Please select date!"); return ; }
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/process-analysis",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"          :   $("#selectLine").val(),
                "machine"       :   "",
                "start_date"     :   $("#txtStartDate").val(),
                "end_date"       :   $("#txtEndDate").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PRODUCTION_BY_LINE").html("");
                    if (response.DATA.length > 0 || !response.DATA) {


                        $("#PRODUCTION_BY_LINE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PRODUCTION_BY_LINE");
                    } else {
                        $("#PRODUCTION_BY_LINE").html("<tr style='text-align:center;'><td colspan='19'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#PRODUCTION_BY_LINE").html("<tr style='text-align:center;'><td colspan='19'>콘텐츠 없음</td></tr>");
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
});