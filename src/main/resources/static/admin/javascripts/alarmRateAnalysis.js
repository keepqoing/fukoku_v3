$(function() {
    alarm = {};

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });
    
    alarm.getAllLinesName = function(){
        $.ajax({
            url: "/v1/api/fukoku/line/select-box",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectLineSearch').empty();
                $("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLineSearch").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });

                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    alarm.getAllLinesName();


    alarm.getAllMachineNameByLineName = function(){
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "lineName"  :   $("#selectLineSearch").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectMachine").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    $('#selectLineSearch').on('click', function () {
        alarm.getAllMachineNameByLineName();
    });


    alarm.getAlarmData = function () {

        var year = $('#yearSelected').val();
        var line = $('#selectLineSearch').val();
        var machine = $("#selectMachine").val();

        $.ajax({
            url:"/v1/api/fukoku/alarm-history/monthly/line-machine",
            type:'GET',
            dataType: 'JSON',
            data:{
                "line":line,
                "machine":machine,
                "startTime":year
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                console.log(response);
                if(response.CODE == "7777"){
                    $("#bar-label").empty();
                    $("#tbody").empty();

                    for(var i=0;i<response.DATA.length;i++){
                        $("#tbody").append("" +
                            "<tr>" +
                            "<td>"+response.DATA[i].LINE+"</td>" +
                            "<td>"+response.DATA[i].MACHINE+"</td>" +
                            "<td>"+response.DATA[i].M_1+"</td>" +
                            "<td>"+response.DATA[i].M_2+"</td>" +
                            "<td>"+response.DATA[i].M_3+"</td>" +
                            "<td>"+response.DATA[i].M_4+"</td>" +
                            "<td>"+response.DATA[i].M_5+"</td>" +
                            "<td>"+response.DATA[i].M_6+"</td>" +
                            "<td>"+response.DATA[i].M_7+"</td>" +
                            "<td>"+response.DATA[i].M_8+"</td>" +
                            "<td>"+response.DATA[i].M_9+"</td>" +
                            "<td>"+response.DATA[i].M_10+"</td>" +
                            "<td>"+response.DATA[i].M_11+"</td>" +
                            "<td>"+response.DATA[i].M_12+"</td>" +
                            "<td>"+response.DATA[i].TOTAL+"</td>" +
                            "<td>"+response.DATA[i].RATIO+"</td>" +
                            "</tr>"
                        );
                    }

                    var dataset = alarm.sortFunctionDesc(response.DATA,"MACHINE");
                    console.log(dataset);
                    dataset = jQuery.map(dataset,function (n) {
                        return {
                            "LINE": n.MACHINE,
                            "TOTAL": n.TOTAL
                        }
                    });
                    console.log(dataset);
                    var settings = {
                        selector: "#bar-label",
                        width: "1200",
                        height: "500",
                        x:"LINE",
                        y:"TOTAL"
                    };
                    barchartLabel(dataset, settings);

                }else{
                    $("#bar-label").empty();
                    $("#tbody").empty();
                }
            },
            error:function(data,status,err) {
                $("#bar-label").empty();
                $("#tbody").empty();
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    $('#btnQuery').click(function () {
        alarm.getAlarmData();
    });

    alarm.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    }



});