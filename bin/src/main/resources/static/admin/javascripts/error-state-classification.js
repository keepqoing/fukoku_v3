$(function () {
    var errorCls={};

    errorCls.sortFunctionDesc = function (dataSet,fieldName) {
        var data = dataSet.sort(function (a,b) {
            return b[fieldName] - a[fieldName];
        })
        return data;
    };

    /*var dataset=[
        {
            "categorie":"IB_Pre1",
            "values":[
                {"value" :1, "rate":"정형"},
                {"value" : 1, "rate":"HYDRAULIC PUMP"},
                {"value" : 1, "rate":"감속기 & 345펌프"},
                {"value" : 1, "rate":"감속기 & 6펌프"},
                {"value" : 1, "rate":"감속기 &3 펌프"},
                {"value" : 1, "rate":"감속기 & gh펌프"},
                {"value" : 1, "rate":"감속기 & j펌프"},
                {"value" : 1, "rate":"발열"}
            ]
        },
        {
            "categorie":"IB_Pre2",
            "values":[
                {"value" :1, "rate":"정형"},
                {"value" : 5, "rate":"HYDRAULIC PUMP"},
                {"value" : 33, "rate":"감속adf기 & 펌프1"},
                {"value" : 34, "rate":"감속sd기 & 펌프2"},
                {"value" : 35, "rate":"감속adf기 & 펌프3"},
                {"value" : 36, "rate":"감속adf기 & 펌프4"},
                {"value" : 37, "rate":"감속기5adf & 펌프5"},
                {"value" : 38, "rate":"감속adf기 & 펌프6"}
            ]
        },
        {
            "categorie":"IB_Pre3",
            "values":[
                {"value" :1, "rate":"정형"},
                {"value" : 5, "rate":"HYDRAdgULIC PUMP"},
                {"value" : 5, "rate":"HYDRAadfULIC PUMP"},
                {"value" : 5, "rate":"HYDRfgAULIC PUMP"},
                {"value" : 5, "rate":"HYDRAghjULIC PUMP"},
                {"value" : 5, "rate":"HYDRAUqLIC PUMP"},
                {"value" : 5, "rate":"HYDRAUL3IC PUMP"},
                {"value" : 3, "rate":"감속기 & 펌프"}
            ]
        }
    ];*/

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

    errorCls.getFrequencyAlarmCode = function (line,startDate,endDate) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state/fault-freq-val",
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
                console.log(response.DATA);
                $("#group-barchart").empty();
                if(response.CODE == "7777"){
                    var data = errorCls.sortFunctionDesc(response.DATA,"FREQUENCY");
                    drawLineBarchar(data, settings);
                }
                /*if(response.CODE == "7777"){
                    //var dataset = errorCls.sortFunctionDesc(response.DATA,"ERROR_COUNT");
                    /!*dataset = jQuery.map(dataset,function (n) {
                        return {
                            "categorie":n.MACHINE_NAME,
                            "values":[
                                {"value" : n.ERROR_COUNT, "rate":n.ERROR_NAME, "name":n.ERROR_NAME},
                                {"value" : n.ITEM_COUNT, "rate":n.ITEM, "name":n.ITEM},
                                {"value" : n.SUB_ITEM_COUNT, "rate":n.SUB_ITEM, "name":n.SUB_ITEM},
                                {"value" : n.TREATMENT_COUNT, "rate":n.TREATMENT, "name":n.TREATMENT}
                            ]
                        }
                    });*!/
                    /!*var tempStr = response.DATA[0].MACHINE_NAME;
                    var dataset = [];
                    var values = [];
                    for(var i=0;i<response.DATA.length;i++){
                        if(tempStr == response.DATA[i].MACHINE_NAME){
                            var d = {"value":response.DATA[i].ITEM_COUNT, "rate":response.DATA[i].ITEM}
                            var d1 = {"value":response.DATA[i].SUB_ITEM_COUNT, "rate":response.DATA[i].SUB_ITEM}
                            var d2 = {"value":response.DATA[i].ERROR_COUNT, "rate":response.DATA[i].ERROR_NAME}
                            var d3 = {"value":response.DATA[i].TREATMENT_COUNT, "rate":response.DATA[i].TREATMENT}
                            values.push(d);
                            values.push(d1);
                            values.push(d2);
                            values.push(d3);
                        }else{
                            var data = {"categorie": tempStr, "values": values};
                            dataset.push(data);
                            values = [];
                            tempStr = response.DATA[i].MACHINE_NAME;
                            i=i-1;
                        }
                        if(response.DATA.length-1 == i){
                            var data = {"categorie": tempStr, "values": values};
                            dataset.push(data);
                            values = [];
                            tempStr = response.DATA[i].MACHINE_NAME;
                        }
                    }*!/
                    var settings = {
                        selector: "#group-barchart",
                        height: 450,
                        width: document.getElementById("canvas").offsetWidth - 60
                    }
                    groupBarchart(dataset, settings);
                }else {
                    $('#group-barchart').empty();
                }*/

            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    errorCls.getAllLinesName = function(){
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


    errorCls.getAllLinesName();

    /*var line = $('#selectLineSearch').val();
    var startDate = $('#txtStartDate').val();
    var endDate = $('#txtEndDate').val();
    errorCls.getFrequencyAlarmCode(line,startDate,endDate);*/


    var settings={
        "width":1200,
        "height":700,
        "margin" :{top: 30, right: 20, bottom: 30, left: 50},
        "selector":"#group-barchart",
        "xColumn":"ALARM_NAME",
        "yColumn":"FREQUENCY"
    };
    //drawLineBarchar(dataBar, settings);

    var line = $('#selectLineSearch').val();
    var startDate = $('#txtStartDate').val();
    var endDate = $('#txtEndDate').val();
    errorCls.getFrequencyAlarmCode(line,startDate,endDate);


    $('#btnSearch').click(function () {
        var line = $('#selectLineSearch').val();
        var startDate = $('#txtStartDate').val();
        var endDate = $('#txtEndDate').val();
        errorCls.getFrequencyAlarmCode(line,startDate,endDate);
    })
});