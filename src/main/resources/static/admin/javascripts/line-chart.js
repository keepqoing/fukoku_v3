
$(function () {
    lineChart = {};
    var selectedMachine = [];
    var datajson = [
        {'totalFac':0, 'data2':0},
        {'totalFac':0, 'data2':0},
        {'totalFac':0, 'data2':0},
        {'totalFac':0, 'data2':0},
    ];
    lineChart.generateLineChart = function(selector,jsonData,xAxisValue){
       // console.log(jsonData);
        var chart = c3.generate({
            bindto: document.getElementById(selector),
            data: {
                json: jsonData,
                keys: {
                    x: xAxisValue, // it's possible to specify 'x' when category axis
                    value: ['EFFICIENCY_RATE', 'TIME_OPERATION_RATE','TOTAL_PRODUCT_RATE','BYPASSED_PRODUCT_RATE']
                },
                names:{
                    EFFICIENCY_RATE:"설비종합효율",
                    TIME_OPERATION_RATE:"시간가동율",
                    TOTAL_PRODUCT_RATE:"성능가동율",
                    BYPASSED_PRODUCT_RATE:"직행율"
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d',
                        rotate:90,
                        culling: false
                    }
                }
            },
            point: {
                r: 5
            }
        });
        return chart;
    };

    lineChart.generateLineChartWithTimeFormat = function(selector,jsonData,xAxisValue){
        console.log("generateLineChartWithTimeFormat",jsonData);
        var chart = c3.generate({
            bindto: document.getElementById(selector),
            data: {
                json: jsonData,
                keys: {
                    x: xAxisValue, // it's possible to specify 'x' when category axis
                    value: ['TOTAL_PRODUCT_RATE', 'TIME_OPERATION_RATE','BYPASSED_PRODUCT_RATE','EFFICIENCY_RATE']
                },
                names:{
                    EFFICIENCY_RATE:"설비종합효율",
                    TIME_OPERATION_RATE:"시간가동율",
                    TOTAL_PRODUCT_RATE:"성능가동율",
                    BYPASSED_PRODUCT_RATE:"직행율"
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        rotate:90,
                        culling: false
                    }
                }
            },
            point: {
                r: 5
            }
        });
        return chart;
    };

    lineChart.getAllMachineNameByLineName = function(line, selector){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllByLine/" + line,
            type: 'GET',
            dataType: 'JSON',
            data:{

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#'+selector+'').empty();
                if(response.code == "200"){
                    $.each(response.data.reverse(), function(key, value){
                        $('#'+selector+'').append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    if(line == "IB"){
                        lineChart.matchLastMachine(selector,"V홈높이,흔들림");
                        selectedMachine[0] = "V홈높이,흔들림"
                        lineChart.onLoadLineChart(selector);
                    }
                    if(line == "HC"){
                        lineChart.matchLastMachine(selector,"T플레이트");
                        lineChart.onLoadLineChart(selector);
                    }
                    if(line == "HD"){
                        lineChart.matchLastMachine(selector,"V홈높이,흔들림");
                        lineChart.onLoadLineChart(selector);
                    }
                    if(line == "PD"){
                        lineChart.matchLastMachine(selector,"도장기");
                        lineChart.onLoadLineChart(selector);
                    }
                    if(line == "HA"){
                        lineChart.matchLastMachine(selector,"V홈높이,흔들림");
                        lineChart.onLoadLineChart(selector);
                    }
                    if(line == "HB"){
                        lineChart.matchLastMachine(selector,"T/Mark");
                        lineChart.onLoadLineChart(selector);
                    }

                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    lineChart.getData = function(selector,line,machineName,startTime,endTime){
        var parentNode=$('#'+selector+'').closest('.panel-body');
        $.ajax({/*
           url:"/v2/api/fukoku/line-chart",
                type:'POST',
                dataType:'JSON',
                data:JSON.stringify({
                    "LINE_NAME": line,
                    "MACHINE_NAME":machineName,
                    "START_TIME":startTime,
                    "END_TIME":endTime
                }), */
            url: "/v1/api/fukoku/daily-mstate-analysis/find",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "line": line,
                "machine":machineName,
                "start_date":startTime,
                "end_date":endTime
            }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response){
                console.log("tola",response.daily_mstate_analysis);
                    if(response.daily_mstate_analysis != null){
                        $.each(response.daily_mstate_analysis, function (key, value) {
                            response.daily_mstate_analysis[key]["EFFICIENCY_RATE"] = parseFloat(value.machine_efficiency_rate)	;
                            response.daily_mstate_analysis[key]["TIME_OPERATION_RATE"] = parseFloat(value.time_operation_rate)	;
                            response.daily_mstate_analysis[key]["TOTAL_PRODUCT_RATE"] = parseFloat(value.total_product_rate)	;
                            response.daily_mstate_analysis[key]["BYPASSED_PRODUCT_RATE"] = parseFloat(value.bypassed_product_rate)	;
                            response.daily_mstate_analysis[key]["START_TIME"] = value.start_date	;
                            response.daily_mstate_analysis[key]["END_TIME"] = value.end_date	;
                            response.daily_mstate_analysis[key]["TIME"] = "08:00";
                            response.daily_mstate_analysis[key]["CROSS_DATE"] = value.work_date	;

                        });
                        console.log(parentNode.find(".c3").attr("id"));
                        if(response.daily_mstate_analysis.END_TIME!=null){
                            lineChart.generateLineChartWithTimeFormat(parentNode.find(".c3").attr("id"),response.daily_mstate_analysis,"TIME");
                        }else{
                            lineChart.generateLineChart(parentNode.find(".c3").attr("id"),response.daily_mstate_analysis,"CROSS_DATE");
                        }

                    }


            },
            error:function(data,status,err) {
                closeLoading();
            }
        });
    }

    lineChart.getAllMachineNameByLineName("IB", "selectIBMachine");
    lineChart.getAllMachineNameByLineName("HC", "selectHCMachine");
    lineChart.getAllMachineNameByLineName("HD", "selectHDMachine");
    lineChart.getAllMachineNameByLineName("PD", "selectPDMachine");
    lineChart.getAllMachineNameByLineName("HA", "selectHAMachine");
    lineChart.getAllMachineNameByLineName("HB", "selectHBMachine");

    lineChart.generateLineChart("chart1",datajson,"Dates");
    lineChart.generateLineChart("chart2",datajson,"Dates");
    lineChart.generateLineChart("chart3",datajson,"Dates");
    lineChart.generateLineChart("chart4",datajson,"Dates");
    lineChart.generateLineChart("chart5",datajson,"Dates");
    lineChart.generateLineChart("chart6",datajson,"Dates");

    lineChart.convertStrDateTimeToEpoch = function(dateTime){
        return moment(dateTime, 'YYYY-MM-DD HH:mm').toDate().getTime();
    };

    lineChart.matchLastMachine = function (selector,textToFind) {
        var dd = document.getElementById(selector);
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === textToFind) {
                dd.selectedIndex = i;
                break;
            }
        }
    }
    //TODO: onclick function
    $('.btnSearch').click(function(){
        openLoading();
        var parentNode = $(this).closest('.panel-body');
        var selectorName = parentNode.find('.form-control').attr('id');
        var startTime = parentNode.find('.startTimeClass input').val();
        console.log("Start time : "+startTime);
        var endTime = parentNode.find('.endTimeClass input').val();
        var lineName = parentNode.closest('.panel').find('.panel-heading').text().replace(" LINE","");
        var machineName = $('#'+selectorName+'').val();

        if(lineChart.convertStrDateTimeToEpoch(startTime) > lineChart.convertStrDateTimeToEpoch(endTime)){
            alert("Please check start date and end date");
        }else {
            console.log(startTime+"\t"+endTime+"\t"+selectorName+"\t"+lineName+"\t"+machineName);
            lineChart.getData(selectorName,lineName,machineName,startTime,endTime);
        }
        closeLoading();
    });



    lineChart.onLoadLineChart = function(selector){
        var parentNode = $('#'+selector+'').closest('.panel-body');
        var selectorName = parentNode.find('.form-control').attr('id');
        var startTime = parentNode.find('.startTimeClass input').val();
        var endTime = parentNode.find('.endTimeClass input').val();
        var lineName = parentNode.closest('.panel').find('.panel-heading').text().replace(" LINE","");
        var machineName = $('#'+selectorName+'').val();

        if(lineChart.convertStrDateTimeToEpoch(startTime) > lineChart.convertStrDateTimeToEpoch(endTime)){
            alert("Please check start date and end date");
        }else {
            console.log(startTime+"\t"+endTime+"\t"+selectorName+"\t"+lineName+"\t"+machineName);
            var parentNode=$('#'+selector+'').closest('.panel-body');
            $.ajax({
                /*url:"/v2/api/fukoku/line-chart",
                type:'POST',
                dataType:'JSON',
                data:JSON.stringify({
                    "LINE_NAME": lineName,
                    "MACHINE_NAME":machineName,
                    "START_TIME":startTime,
                    "END_TIME":endTime
                }),*/
                url: "/v1/api/fukoku/daily-mstate-analysis/find",
                type: 'POST',
                dataType: 'JSON',
                data: JSON.stringify({
                        "line": lineName,
                        "machine":machineName,
                        "start_date":startTime,
                        "end_date":endTime
                }),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function(response){
                    console.log(response);
                    if(response.daily_mstate_analysis != null){
                        $.each(response.daily_mstate_analysis, function (key, value) {
                            response.daily_mstate_analysis[key]["EFFICIENCY_RATE"] = parseFloat(value.machine_efficiency_rate)	;
                            response.daily_mstate_analysis[key]["TIME_OPERATION_RATE"] = parseFloat(value.time_operation_rate)	;
                            response.daily_mstate_analysis[key]["TOTAL_PRODUCT_RATE"] = parseFloat(value.total_product_rate)	;
                            response.daily_mstate_analysis[key]["BYPASSED_PRODUCT_RATE"] = parseFloat(value.bypassed_product_rate)	;
                            response.daily_mstate_analysis[key]["START_TIME"] = value.start_date	;
                            response.daily_mstate_analysis[key]["END_TIME"] = value.end_date	;
                            response.daily_mstate_analysis[key]["TIME"] = "08:00";
                            response.daily_mstate_analysis[key]["CROSS_DATE"] = value.work_date	;
                        });

                        console.log(parentNode.find(".c3").attr("id"));
                        if(response.daily_mstate_analysis.END_TIME!=null){
                            lineChart.generateLineChartWithTimeFormat(parentNode.find(".c3").attr("id"),response.daily_mstate_analysis,"TIME");
                        }else{
                            lineChart.generateLineChart(parentNode.find(".c3").attr("id"),response.daily_mstate_analysis,"CROSS_DATE");
                        }

                    }
                },
                error:function(data,status,err) {
                    closeLoading();
                }
            });
        }

    }

})