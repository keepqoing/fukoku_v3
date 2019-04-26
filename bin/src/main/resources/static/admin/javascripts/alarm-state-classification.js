$(function () {
    var alarmCls={};

    alarmCls.sortFunctionDesc = function (dataSet,fieldName) {
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

    // var dataBar=[
    //     {
    //         FREQUENCY:0,
    //         ALARM_NAME:"공급이송 척3 상승하강이상"
    //     },
    //     {
    //         FREQUENCY:0,
    //         ALARM_NAME:"공급이송 척3 회전복귀이상\n"
    //     },
    //     {
    //         FREQUENCY:0,
    //         ALARM_NAME:"공급이송 척3 잠김풀림이상\n"
    //     },
    //     {
    //         FREQUENCY:0,
    //         ALARM_NAME:"측정부1 전진후진이상\n"
    //     }
    // ];

    alarmCls.getFrequencyAlarmCode = function (line,startDate,endDate) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-history/alarm-freq-val",
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
                $("#bar-label").empty();
                if(response.CODE == "7777"){
                    var data = alarmCls.sortFunctionDesc(response.DATA,"FREQUENCY");
                    drawLineBarchart(data, settings);
                }else {
                    drawLineBarchart(dataBar, settings);
                }

            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    alarmCls.getAllLinesName = function(){
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

    /*alarmCls.getAllMachineNameByLineName = function(line, callback){
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

    alarmCls.getAllLinesName();
    /*$("#selectLineSearch").change($("#selectLineSearch").val(), function () {
        checkPagination = true;
        currentPage = 1;
        alarmCls.getAllMachineNameByLineName($("#selectLineSearch").val(), function (response) {
            $('#selectMachineSearch').empty();
            $("#selectMachineSearch").append("<option value=''>설비</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectMachineSearch").append("<option value='"+value.MAPPING_NAME+"'>"+value.MACHINE_NAME+"</option>");
                });
            }
        });
    });*/




    dataBar = alarmCls.sortFunctionDesc(dataBar,"FREQUENCY");

    var settings={
        "width":1200,
        "height":700,
        /*"margin": { left: 190, top: 16, right: 30, bottom: 85 },*/
        "margin" :{left: 30, right: 30, top: 50, bottom: 75}, // done
        "selector":"#bar-label",
        // "xColumn":"ALARM_NAME",
        // "yColumn":"FREQUENCY",

        "xColumn":"FREQUENCY",
        "yColumn":"ALARM_NAME",
        "x_text": "time (s)",
        "y_text": "Alarm name"
    };
    drawLineBarchart(dataBar, settings);

    var line = $('#selectLineSearch').val();
    var startDate = $('#txtStartDate').val();
    var endDate = $('#txtEndDate').val();
    alarmCls.getFrequencyAlarmCode(line,startDate,endDate);

    $('#btnSearch').click(function () {
        var line = $('#selectLineSearch').val();
        var startDate = $('#txtStartDate').val();
        var endDate = $('#txtEndDate').val();
        alarmCls.getFrequencyAlarmCode(line,startDate,endDate);
    })
});