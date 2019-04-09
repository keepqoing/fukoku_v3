$(function() {

    var plantProductionLosses = {};

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });



    /*
    *** get FACTORY
     */
    plantProductionLosses.getAllFactories = function () {
        $.ajax({
            url: "/v3/api/fukoku/factory",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        var sel = document.getElementById("selFactory");
                        var option = document.createElement("option");
                        option.setAttribute("value","0"); // store Process name
                        option.text = "공장"; // show Process name
                        sel.appendChild(option);

                        for(i = 0; i < response.data.length; i++){
                            var option = document.createElement("option");
                            option.setAttribute("value", response.data[i].id); // store factory id
                            option.text = response.data[i].name; // show factory name
                            sel.appendChild(option);
                        }
                        // $("#selFactory").prop("selectedIndex",1).change();


                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // First load, call this function
    plantProductionLosses.getAllFactories();

    // When the factory select box is changed, so we need to query the lines
    $(document).on('change','select.selFactory',function(){

        plantProductionLosses.getAllLinesName($("#"+this.id + " option:selected").val());


    });

    plantProductionLosses.getAllLinesName = function(fid){
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  fid ,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#selectLine").append("<option value="+value.name+">"+value.name+"</option>");
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
            url: "/v3/api/fukoku/product/distinct",
            type: 'GET',
            dataType: 'JSON',
            data: {

            },
            headers: { "Content-Type": "application/json" },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                $("#selectProduct").append("<option value=''>모든</option>");
                if(response.code == "200"){
                    $.each(response.data, function(key, value){
                        $("#selectProduct").append("<option value='"+value.name+"'>"+value.name+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    // plantProductionLosses.getAllLinesName();

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
            url: "/v3/api/fukoku/process-analysis",
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