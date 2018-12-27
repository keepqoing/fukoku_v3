$(function () {
    var nonMovingCls={};

    nonMovingCls.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    };

    pie={};

    var dataBar=[
        {
            FREQUENCY:0,
            ALARM_NAME:"L607"
        },
        {
            FREQUENCY:0,
            ALARM_NAME:"L608"
        },
        {
            FREQUENCY:0,
            ALARM_NAME:"L609"
        },
        {
            FREQUENCY:0,
            ALARM_NAME:"L610"
        }
    ];

    var dataBar1=[
        {
            FREQUENCY:0,
            ALARM_CODE:"L607"
        },
        {
            FREQUENCY:0,
            ALARM_CODE:"L608"
        },
        {
            FREQUENCY:0,
            ALARM_CODE:"L609"
        },
        {
            FREQUENCY:0,
            ALARM_CODE:"L610"
        }
    ];

    //dataBar = nonMovingCls.sortFunctionDesc(dataBar,"FREQUENCY");


    nonMovingCls.getAllLinesName = function(){
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
                $('#selectLineSearch').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                $("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                        $("#selectLineSearch").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    /*nonMovingCls.getAllMachineNameByLineName = function(line, callback){
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "lineName"  :   line
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(callback){
                    callback(response);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };*/

    nonMovingCls.getAllLinesName();
    /*$("#selectLineSearch").change($("#selectLineSearch").val(), function () {
        checkPagination = true;
        currentPage = 1;
        nonMovingCls.getAllMachineNameByLineName($("#selectLineSearch").val(), function (response) {
            $('#selectMachineSearch').empty();
            $("#selectMachineSearch").append("<option value=''>설비</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectMachineSearch").append("<option value='"+value.MACHINE_NAME+"'>"+value.MACHINE_NAME+"</option>");
                });
            }
        });
    });*/


    nonMovingCls.getFrequencyAlarmCode = function (line,startDate,endDate) {
        $.ajax({
            url: "/v1/api/fukoku/non-active-state/nas-freq-val",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"      :   line,
                "startDate"     :   startDate,
                "endDate"      :   endDate
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#bar-label1").empty();
                if(response.CODE == "7777"){
                    var data = nonMovingCls.sortFunctionDesc(response.DATA,"FREQUENCY");
                    console.log("data",data);
                    drawLineBarchar(data, settings);
                }else {
                    drawLineBarchar(dataBar, settings);
                }

            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    nonMovingCls.getFrequencyMstate = function (line,startDate,endDate) {
        $.ajax({
            url: "/v1/api/fukoku/non-active-state/nas-ms-freq-val",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"      :   line,
                "startDate"     :   startDate,
                "endDate"      :   endDate
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#bar-label2").empty();
                if(response.CODE == "7777"){
                    var data = nonMovingCls.sortFunctionDesc(response.DATA,"FREQUENCY");
                    drawLineBarchar(data, settings1);
                }else {
                    drawLineBarchar(dataBar1, settings1);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    var settings={
        "width": document.getElementById("p1").offsetWidth,
        "height":800,
        /*"margin": { left: 190, top: 16, right: 30, bottom: 85 },*/
        "margin" :{top: 30, right: 20, bottom: 150, left: 50},
        "selector":"#bar-label1",
        "xColumn":"ALARM_NAME",
        "yColumn":"FREQUENCY"
    };
    drawLineBarchar(dataBar, settings);

    var settings1={
        "width": document.getElementById("p2").offsetWidth,
        "height":800,
        "margin" :{top: 30, right: 20, bottom: 150, left: 50},
        "selector":"#bar-label2",
        "xColumn":"ALARM_NAME",
        "yColumn":"FREQUENCY"
    };
    drawLineBarchar(dataBar1, settings1);
    var line = $('#selectLineSearch').val();
    var startDate = $('#txtStartDate').val();
    var endDate = $('#txtEndDate').val();
    nonMovingCls.getFrequencyAlarmCode(line,startDate,endDate);
    nonMovingCls.getFrequencyMstate(line,startDate,endDate);

    $('#btnSearch').click(function () {
        var line = $('#selectLineSearch').val();
        var startDate = $('#txtStartDate').val();
        var endDate = $('#txtEndDate').val();
        nonMovingCls.getFrequencyAlarmCode(line,startDate,endDate);
        nonMovingCls.getFrequencyMstate(line,startDate,endDate);
    })

});