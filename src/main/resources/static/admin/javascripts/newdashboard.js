$(function() {

    dashboard = {};

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    dashboard.setUpdateGauges = function(key, value) {
        gauges[key].redraw(value);
    };

    dashboard.getAllMachineNameByLineName = function(line, selector/*, callback*/){
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
                $('#'+selector+'').empty();
                if(response.CODE == "7777"){
                    $.each(response.DATA.reverse(), function(key, value){
                        $('#'+selector+'').append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                    if(line == "IB"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }
                    if(line == "HC"){
                        dashboard.matchLastMachine(selector,"T플레이트");
                    }
                    if(line == "HD"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }
                    if(line == "PD"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }
                    if(line == "HA"){
                        dashboard.matchLastMachine(selector,"파카기");
                    }
                    if(line == "HB"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }

                    var machineName = $('#'+selector+'').val();
                    var currentTime = new Date();
                    var startTime =  jQuery.format.date(currentTime,'yyyy-MM-dd') + ' 08:00'; //dashboard.setDateTimeFormat("08:00");

                    dashboard.getGaugesData(selector,line,machineName,startTime, jQuery.format.date(currentTime,'yyyy-MM-dd HH:mm'));
                }
                /*if(callback){
                    callback($('#'+selector+''));
                }*/
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    dashboard.matchLastMachine = function (selector,textToFind) {
        var dd = document.getElementById(selector);
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === textToFind) {
                dd.selectedIndex = i;
                break;
            }
        }
    }

    dashboard.getGaugesData = function(selector,line,machineName,startTime,endTime){
        console.log("Start Time "+ startTime +" End Time "+ endTime);
        //var humTime = new Date(startTime * 1000);
        //openLoading();
        var parentNode=$('#'+selector+'').closest('.panel-body');
        //alert(parentNode.find("div[id*='startTime']>input").val());
        //console.log(thisSelector.parent());

        var gauges1 = parentNode.find("span[id*='totalFacilityEfficiency']").attr('id').replace("GaugeContainer","");
        var gauges2 = parentNode.find("span[id*='timeOperationRate']").attr('id').replace("GaugeContainer","");
        var gauges3 = parentNode.find("span[id*='performanceStartupRate']").attr('id').replace("GaugeContainer","");
        var gauges4 = parentNode.find("span[id*='yieldRate']").attr('id').replace("GaugeContainer","");
        $.ajax({
            url:"/v1/api/fukoku/new-dashboard/result",
            type:'GET',
            dataType:'JSON',
            data:{
                "lineName": line,
                "machineName":machineName,
                "startTime":startTime,
                "endTime":endTime
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response){
                //console.log(response.CODE);
                if(response.CODE == "7777"){
                    if(response.DATA != null){
                        //console.log(response.DATA[0].TOTAL_PRODUCT_PERFORMANCE);

                        parentNode.find(".hiddenInput").empty();
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalFacilly'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalOperatingTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalPerformanceStartUp'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalQuality'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtOperatingTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtPlanStopTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtUnplanStopTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtCycleTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtProductQuantity'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtDefectionProduct'>");

                        console.log(response.DATA);
                        dashboard.setUpdateGauges(gauges1,response.DATA[0].FACILITY_EFFICIENCY_RATE);
                        dashboard.setUpdateGauges(gauges2,response.DATA[0].TIME_OPERATION_RATE);
                        dashboard.setUpdateGauges(gauges3,response.DATA[0].PRODUCT_EFFICIENCY);
                        dashboard.setUpdateGauges(gauges4,response.DATA[0].YIELD_RATE);

                        parentNode.find(".txtTotalFacilly").val(response.DATA[0].FACILITY_EFFICIENCY_RATE + " %");
                        parentNode.find(".txtTotalOperatingTime").val(response.DATA[0].TIME_OPERATION_RATE + " %");
                        parentNode.find(".txtTotalPerformanceStartUp").val(response.DATA[0].PRODUCT_EFFICIENCY + " %");
                        parentNode.find(".txtTotalQuality").val(response.DATA[0].YIELD_RATE + " %");
                        parentNode.find(".txtOperatingTime").val(response.DATA[0].OPERATING_TIME + " mins");
                        parentNode.find(".txtPlanStopTime").val(response.DATA[0].PLANNED_STOP_TIME + " mins");
                        parentNode.find(".txtUnplanStopTime").val(response.DATA[0].NON_PLANNED_STOP_TIME + " mins");
                        parentNode.find(".txtCycleTime").val(response.DATA[0].CYCLE_TIME + " mins");
                        parentNode.find(".txtProductQuantity").val(response.DATA[0].PRODUCT_QTY + " unit");
                        parentNode.find(".txtDefectionProduct").val(response.DATA[0].DEFECTIVE_PRODUCT_QTY + " unit");
                        closeLoading();
                    }
                }else if(response.CODE == "8888"){
                    dashboard.setUpdateGauges(gauges1,0);
                    dashboard.setUpdateGauges(gauges2,0);
                    dashboard.setUpdateGauges(gauges3,0);
                    dashboard.setUpdateGauges(gauges4,0);
                    closeLoading();
                }
            },
            error:function(data,status,err) {
                closeLoading();
                dashboard.setUpdateGauges(gauges1,0);
                dashboard.setUpdateGauges(gauges2,0);
                dashboard.setUpdateGauges(gauges3,0);
                dashboard.setUpdateGauges(gauges4,0);
                console.log("error: "+data+" status: "+status+" err:"+err);
                closeLoading();
            }
        });
    };

    dashboard.setDateTimeFormat = function(setTime){
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var today = new Date();
        var dd = today.getDate();
        var yyyy = today.getFullYear();
        //var mm = monthNames[today.getMonth()];
        var mm = today.getMonth();

        return new String(yyyy+"-"+mm+"-"+dd+" "+setTime);
    };
    openLoading();
    dashboard.getAllMachineNameByLineName("IB", "selectIBMachine");
    dashboard.getAllMachineNameByLineName("HC", "selectHCMachine");
    dashboard.getAllMachineNameByLineName("HD", "selectHDMachine");
    dashboard.getAllMachineNameByLineName("PD", "selectPDMachine");
    dashboard.getAllMachineNameByLineName("HA", "selectHAMachine");
    dashboard.getAllMachineNameByLineName("HB", "selectHBMachine");

    //dashboard.getGaugesData("selectIBMachine");
    dashboard.convertStrDateTimeToEpoch = function(dateTime){
        return moment(dateTime, 'YYYY-MM-DD HH:mm').toDate().getTime();
    };

    dashboard.reloadData = function (MachineSelector,endTime) {
        var parentNode=$('#'+MachineSelector+'').closest('.panel-body');
        var lineName = parentNode.closest('.panel').find('.panel-heading').text().replace(" LINE","");
        var machineName = $('#'+MachineSelector+'').val();
        dashboard.getGaugesData(MachineSelector, lineName, machineName, parentNode.find('.startTimeClass input').val(), jQuery.format.date(endTime,'yyyy-MM-dd HH:mm'));
    };


    //TODO: EVENT ON CLICK ON EACH GAUGE
    $('.btnSearch').click(function(){
        openLoading();
        var parentNode = $(this).closest('.panel-body');
        var selectorName = parentNode.find('.form-control').attr('id');
        var startTime = parentNode.find('.startTimeClass input').val();
        var endTime = parentNode.find('.endTimeClass input').val();

        if(dashboard.convertStrDateTimeToEpoch(startTime) > dashboard.convertStrDateTimeToEpoch(endTime)){
            alert("Please check start date and end date");
        }else {
            dashboard.reloadData(selectorName,parentNode.find('.endTimeClass input').val());
        }

    });
    $('.totalFacilityRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail1').modal('show');
        $("#DASHBOARD_DETAIL1").find("tr>#operatingTimeValue").text(0);
        $("#DASHBOARD_DETAIL1").find("tr>#productValue").text(0);
        $("#DASHBOARD_DETAIL1").find("tr>#qualityValue").text(0);
        $("#DASHBOARD_DETAIL1").find("tr>#facilityValue").text(0);
        $("#DASHBOARD_DETAIL1").find("tr>#operatingTimeValue").text(parentNode.find(".txtTotalOperatingTime").val());
        $("#DASHBOARD_DETAIL1").find("tr>#productValue").text(parentNode.find(".txtTotalPerformanceStartUp").val());
        $("#DASHBOARD_DETAIL1").find("tr>#qualityValue").text(parentNode.find(".txtTotalQuality").val());
        $("#DASHBOARD_DETAIL1").find("tr>#facilityValue").text(parentNode.find(".txtTotalFacilly").val());
    });
    $('.totalOperatingTimeRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail2').modal('show');

        $("#DASHBOARD_DETAIL2").find("tr>.txtOperatingTimeValue").text(0);
        $("#DASHBOARD_DETAIL2").find("tr>.txtPlanStopTimeValue").text(0);
        $("#DASHBOARD_DETAIL2").find("tr>.txtUnOperatingTimeValue").text(0);
        $("#DASHBOARD_DETAIL2").find("tr>.txtOperatingTimeValue").text(parentNode.find(".txtOperatingTime").val());
        $("#DASHBOARD_DETAIL2").find("tr>.txtPlanStopTimeValue").text(parentNode.find(".txtPlanStopTime").val());
        $("#DASHBOARD_DETAIL2").find("tr>.txtUnOperatingTimeValue").text(parentNode.find(".txtUnplanStopTime").val());
    });
    $('.totalStartupRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail3').modal('show');
        $("#DASHBOARD_DETAIL3").find("tr>.txtProductQuantityValue").text(0);
        $("#DASHBOARD_DETAIL3").find("tr>.txtCycleTimeValue").text(0);
        $("#DASHBOARD_DETAIL3").find("tr>.txtOperatingTimeValue").text(0);
        $("#DASHBOARD_DETAIL3").find("tr>.txtPlanStopTimeValue").text(0);
        $("#DASHBOARD_DETAIL3").find("tr>.txtUnOperatingTimeValue").text(0);
        $("#DASHBOARD_DETAIL3").find("tr>.txtProductQuantityValue").text(parentNode.find(".txtProductQuantity").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtCycleTimeValue").text(parentNode.find(".txtCycleTime").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtOperatingTimeValue").text(parentNode.find(".txtOperatingTime").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtPlanStopTimeValue").text(parentNode.find(".txtPlanStopTime").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtUnOperatingTimeValue").text(parentNode.find(".txtUnplanStopTime").val());
    });
    $('.totalYieldRateRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail4').modal('show');
        $("#DASHBOARD_DETAIL4").find("tr>.txtProductQuantityValue").text(0);
        $("#DASHBOARD_DETAIL4").find("tr>.txtDefectiveProductValue").text(0);
        $("#DASHBOARD_DETAIL4").find("tr>.txtProductQuantityValue").text(parentNode.find(".txtProductQuantity").val());
        $("#DASHBOARD_DETAIL4").find("tr>.txtDefectiveProductValue").text(parentNode.find(".txtDefectionProduct").val());
    });
});