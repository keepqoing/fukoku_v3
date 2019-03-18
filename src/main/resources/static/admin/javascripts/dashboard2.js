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

    /*
    dashboard.getAllMachineNameByLineName = function(line, selector){
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
                        dashboard.matchLastMachine(selector,"도장기");
                    }
                    if(line == "HA"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }
                    if(line == "HB"){
                        dashboard.matchLastMachine(selector,"T/Mark");
                    }

                    var machineName = $('#'+selector+'').val();
                    var currentTime = new Date();
                    // var startTime =  jQuery.format.date(currentTime,'yyyy-MM-dd') + ' 08:00'; //dashboard.setDateTimeFormat("08:00");
                    var startTime =  jQuery.format.date(currentTime,'yyyy-MM-dd'); // in store procedure set default start_time = 08:00 already
                    // dashboard.getGaugesData(selector,line,machineName,startTime, jQuery.format.date(currentTime,'yyyy-MM-dd HH:mm'));
                }

            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    */

    dashboard.getAllMachineNameByLineName = function(line, selector){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllByLine/" + line,
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
                if(response.code == "200"){
                    $.each(response.data.reverse(), function(key, value){
                        $('#'+selector+'').append("<option value="+value.name+">"+value.name+"</option>");
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
                        dashboard.matchLastMachine(selector,"도장기");
                    }
                    if(line == "HA"){
                        dashboard.matchLastMachine(selector,"V홈높이,흔들림");
                    }
                    if(line == "HB"){
                        dashboard.matchLastMachine(selector,"T/Mark");
                    }

                    var machineName = $('#'+selector+'').val();
                    var currentTime = new Date();
                    // var startTime =  jQuery.format.date(currentTime,'yyyy-MM-dd') + ' 08:00'; //dashboard.setDateTimeFormat("08:00");
                    var startTime =  jQuery.format.date(currentTime,'yyyy-MM-dd'); // in store procedure set default start_time = 08:00 already
                    // dashboard.getGaugesData(selector,line,machineName,startTime, jQuery.format.date(currentTime,'yyyy-MM-dd HH:mm'));
                }

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
            url:"/v1/api/fukoku/dashboard-v",
            type:'GET',
            dataType:'JSON',
            data:{
                "line": line,
                "machine":machineName,
                "start_date":startTime,
                "end_date": endTime.substring(0, 10),
                "end_time": endTime.substring(11)
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
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalMachineEfficiencyRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalTimeOpereationRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalProductRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalOkProductRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtCycleTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtOkProduct'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtWorkingTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtCycleTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtProductQuantity'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtWorkingNonActiveTime'>");



                        console.log("machine : " + response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2));
                        console.log("time operation : " + response.DATA[0].TIME_OPERATION_RATE.toFixed(2));
                        console.log("total product : " + response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2));
                        console.log("ok product : " + response.DATA[0].OK_PRODUCT_RATE.toFixed(2));

                        dashboard.setUpdateGauges(gauges1,response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2));
                        dashboard.setUpdateGauges(gauges2,response.DATA[0].TIME_OPERATION_RATE.toFixed(2));
                        dashboard.setUpdateGauges(gauges3,response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2));
                        dashboard.setUpdateGauges(gauges4,response.DATA[0].OK_PRODUCT_RATE.toFixed(2));

                        parentNode.find(".txtTotalMachineEfficiencyRate").val(response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2) + " %");
                        parentNode.find(".txtTotalTimeOpereationRate").val(response.DATA[0].TIME_OPERATION_RATE.toFixed(2) + " %");
                        parentNode.find(".txtTotalProductRate").val(response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2) + " %");
                        parentNode.find(".txtProductQuantity").val(response.DATA[0].TOTAL_PRODUCT + " 개");
                        parentNode.find(".txtTotalOkProductRate").val(response.DATA[0].OK_PRODUCT_RATE.toFixed(2) + " %");
                        parentNode.find(".txtCycleTime").val(response.DATA[0].THEORETICAL_CYCLE_TIME.toFixed(2) + " 초");
                        parentNode.find(".txtOkProduct").val(response.DATA[0].OK_PRODUCT + " 개");
                        parentNode.find(".txtWorkingTime").val(response.DATA[0].WORKING_TIME.toFixed(2) + " 분");
                        parentNode.find(".txtWorkingNonActiveTime").val(response.DATA[0].WK_NON_ACTIVE_TIME.toFixed(2) + " 분");

                        // closeLoading();

                    }
                }else if(response.CODE == "8888"){
                    dashboard.setUpdateGauges(gauges1,0);
                    dashboard.setUpdateGauges(gauges2,0);
                    dashboard.setUpdateGauges(gauges3,0);
                    dashboard.setUpdateGauges(gauges4,0);
                    // closeLoading();
                }
            },
            error:function(data,status,err) {
                // closeLoading();
                dashboard.setUpdateGauges(gauges1,0);
                dashboard.setUpdateGauges(gauges2,0);
                dashboard.setUpdateGauges(gauges3,0);
                dashboard.setUpdateGauges(gauges4,0);
                console.log("error: "+data+" status: "+status+" err:"+err);
                // closeLoading();
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
    // openLoading();
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
        //dashboard.getGaugesData(MachineSelector, lineName, machineName, parentNode.find('.startTimeClass input').val(), jQuery.format.date(endTime,'yyyy-MM-dd HH:mm'));
        dashboard.getGaugesData(MachineSelector, lineName, machineName, parentNode.find('.startTimeClass input').val(), endTime);
    };


    //TODO: EVENT ON CLICK ON EACH GAUGE


    $('.btnSearch').click(function(){
        // openLoading();

        var parentNode = $(this).closest('.panel-body');
        var selectorName = parentNode.find('.form-control').attr('id');
        var startTime = parentNode.find('.startTimeClass input').val();
        var endTime = parentNode.find('.endTimeClass input').val();
        // alert(endTime);
        if(dashboard.convertStrDateTimeToEpoch(startTime) > dashboard.convertStrDateTimeToEpoch(endTime)){
            alert("Please check start date and end date");
        }else {
            dashboard.reloadData(selectorName,parentNode.find('.endTimeClass input').val());
        }


    });
    $('.totalFacilityRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail1').modal('show');
        $("#DASHBOARD_DETAIL1").find("tr>#timeOpereationRate").text(parentNode.find(".txtTotalTimeOpereationRate").val());
        $("#DASHBOARD_DETAIL1").find("tr>#totalProductRate").text(parentNode.find(".txtTotalProductRate").val());
        $("#DASHBOARD_DETAIL1").find("tr>#okProductRate").text(parentNode.find(".txtTotalOkProductRate").val());
        $("#DASHBOARD_DETAIL1").find("tr>#machineEfficiencyRate").text(parentNode.find(".txtTotalMachineEfficiencyRate").val());

    });
    $('.totalOperatingTimeRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail2').modal('show');

        $("#DASHBOARD_DETAIL2").find("tr>.txtWorkingTimeValue").text(parentNode.find(".txtWorkingTime").val());
        $("#DASHBOARD_DETAIL2").find("tr>.txtWorkingNonActiveTime").text(parentNode.find(".txtWorkingNonActiveTime").val());

    });
    $('.totalStartupRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail3').modal('show');
        $("#DASHBOARD_DETAIL3").find("tr>.txtTotalProductValue").text(parentNode.find(".txtProductQuantity").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtCycleTimeValue").text(parentNode.find(".txtCycleTime").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtWorkingTimeValue").text(parentNode.find(".txtWorkingTime").val());
        $("#DASHBOARD_DETAIL3").find("tr>.txtWorkingNonActiveTime").text(parentNode.find(".txtWorkingNonActiveTime").val());

    });
    $('.totalYieldRateRate').click(function(){
        var parentNode = $(this).closest('.panel-body');
        $('#modalDetail4').modal('show');
        $("#DASHBOARD_DETAIL4").find("tr>.txtOkProductValue").text(parentNode.find(".txtOkProduct").val());
        $("#DASHBOARD_DETAIL4").find("tr>.txtTotalProductValue").text(parentNode.find(".txtProductQuantity").val());

    });




    // First loading



    dashboard.getGaugesDataFirstTime = function(selector,line,machineName,startTime,endTime,callback){

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
            url:"/v1/api/fukoku/dashboard-v",
            type:'GET',
            dataType:'JSON',
            data:{
                "line": line,
                "machine":machineName,
                "start_date":startTime,
                "end_date": endTime.substring(0, 10),
                "end_time": endTime.substring(11)
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
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalMachineEfficiencyRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalTimeOpereationRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalProductRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtTotalOkProductRate'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtCycleTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtOkProduct'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtWorkingTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtCycleTime'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtProductQuantity'>");
                        parentNode.find(".hiddenInput").append("<input type='hidden' class='txtWorkingNonActiveTime'>");



                        console.log("machine : " + response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2));
                        console.log("time operation : " + response.DATA[0].TIME_OPERATION_RATE.toFixed(2));
                        console.log("total product : " + response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2));
                        console.log("ok product : " + response.DATA[0].OK_PRODUCT_RATE.toFixed(2));

                        dashboard.setUpdateGaugesFirstTime(gauges1,response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2));
                        dashboard.setUpdateGaugesFirstTime(gauges2,response.DATA[0].TIME_OPERATION_RATE.toFixed(2));
                        dashboard.setUpdateGaugesFirstTime(gauges3,response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2));
                        dashboard.setUpdateGaugesFirstTime(gauges4,response.DATA[0].OK_PRODUCT_RATE.toFixed(2));

                        parentNode.find(".txtTotalMachineEfficiencyRate").val(response.DATA[0].MACHINE_EFFICIENCY_RATE.toFixed(2) + " %");
                        parentNode.find(".txtTotalTimeOpereationRate").val(response.DATA[0].TIME_OPERATION_RATE.toFixed(2) + " %");
                        parentNode.find(".txtTotalProductRate").val(response.DATA[0].TOTAL_PRODUCT_RATE.toFixed(2) + " %");
                        parentNode.find(".txtProductQuantity").val(response.DATA[0].TOTAL_PRODUCT + " 개");
                        parentNode.find(".txtTotalOkProductRate").val(response.DATA[0].OK_PRODUCT_RATE.toFixed(2) + " %");
                        parentNode.find(".txtCycleTime").val(response.DATA[0].THEORETICAL_CYCLE_TIME.toFixed(2) + " 초");
                        parentNode.find(".txtOkProduct").val(response.DATA[0].OK_PRODUCT + " 개");
                        parentNode.find(".txtWorkingTime").val(response.DATA[0].WORKING_TIME.toFixed(2) + " 분");
                        parentNode.find(".txtWorkingNonActiveTime").val(response.DATA[0].WK_NON_ACTIVE_TIME.toFixed(2) + " 분");

                        // closeLoading();

                    }
                }else if(response.CODE == "8888"){
                    dashboard.setUpdateGaugesFirstTime(gauges1,0);
                    dashboard.setUpdateGaugesFirstTime(gauges2,0);
                    dashboard.setUpdateGaugesFirstTime(gauges3,0);
                    dashboard.setUpdateGaugesFirstTime(gauges4,0);
                    // closeLoading();
                }
                if(callback) {
                    // if use we call the callback function so
                    callback();
                }
            },
            error:function(data,status,err) {
                // closeLoading();
                dashboard.setUpdateGaugesFirstTime(gauges1,0);
                dashboard.setUpdateGaugesFirstTime(gauges2,0);
                dashboard.setUpdateGaugesFirstTime(gauges3,0);
                dashboard.setUpdateGaugesFirstTime(gauges4,0);
                console.log("error: "+data+" status: "+status+" err:"+err);
                // closeLoading();
            }
        });
    };





    function loadDataForFirstTime(startTime, endTime){

        var parentIB = $('#selectIBMachine').closest('.panel-body');
        var parentHC = $('#selectHCMachine').closest('.panel-body');
        var parentHD = $('#selectHDMachine').closest('.panel-body');
        var parentPD = $('#selectPDMachine').closest('.panel-body');
        var parentHA = $('#selectHAMachine').closest('.panel-body');
        var parentHB = $('#selectHBMachine').closest('.panel-body');
        var currentTime = new Date();
        var endTime = jQuery.format.date(currentTime,'yyyy-MM-dd HH:mm');




        // Example getAllDashboard is the ajax Requesst Function so it will be asynchronous I added the callback function         // It is callback function
        dashboard.getGaugesDataFirstTime("selectIBMachine", "IB","IB_Runout", parentIB.find('.startTimeClass input').val(), endTime, function(){
            // Body of this callback call the getGaugesData
            dashboard.getGaugesDataFirstTime("selectHAMachine", "HA","HA_Runout", parentHA.find('.startTimeClass input').val(), endTime, function(){
                // Body of another callback function call the getAllDash..
                dashboard.getGaugesDataFirstTime("selectHBMachine", "HB","HB_Tmarker", parentHB.find('.startTimeClass input').val(), endTime, function(){
                    dashboard.getGaugesDataFirstTime("selectHCMachine", "HC","HC_TP", parentHC.find('.startTimeClass input').val(), endTime, function(){
                        dashboard.getGaugesDataFirstTime("selectHDMachine","HD","HD_Runout", parentHD.find('.startTimeClass input').val(), endTime, function(){
                            dashboard.getGaugesDataFirstTime("selectPDMachine", "PD","PD_Pnt", parentPD.find('.startTimeClass input').val(), endTime, function(){
                                // Finally Body of another callback function call the closeLoading because it is the last one and we want to close the Loading
                                // That's all major. Thank so much,teacher Do you understand or not? Yes, I do. Thank so much It is a little bit slow but it ccan help to solve that problem
                                // Because we change from asynchronous to synchronous
                                // Os houy major how are you? Bye Bye houy na. Thanks and bye bye teacher
                                closeLoading();
                            });
                        });
                    });
                });
            });
        });
    }


    $(function() {


        openLoading();
        loadDataForFirstTime($("#txtStartTime").val(), $("#txtEndTime").val());
    });


    dashboard.setUpdateGaugesFirstTime = function(mkey, value) {
        for (var key in gauges) {
            if (key == mkey) {
                gauges[key].redraw(value);
            }
        }

    };
});