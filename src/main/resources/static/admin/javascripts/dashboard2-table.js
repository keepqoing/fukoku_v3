$(function () {

    var dashboardTable = {};



    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });


    // Important function
    // The callback parameter is the function
    dashboardTable.getAllDashBoard = function (lineId, machineId, startDate, endDate, endTime, callback) {

        $.ajax({
            url: "/v1/api/fukoku/dashboard-v/daily_analysis",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"          :   lineId,
                "machine"       :   machineId,
                "start_date"       : startDate,
                "end_date"         :   endDate,
                "end_time"          :   endTime
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                         if (response.DATA.length > 0 || !response.DATA) {

                        // console.log("machine : " + parseFloat(response.DATA[0].machine_efficiency_rate).toFixed(2));
                        // console.log("time operation : " + parseFloat(response.DATA[0].time_operation_rate).toFixed(2));
                        // console.log("total product : " + parseFloat(response.DATA[0].total_product_rate).toFixed(2));
                        // console.log("ok product : " + parseFloat(response.DATA[0].ok_product_rate).toFixed(2));
                             line_name = lineId.toLowerCase();
                            $('#'+line_name+'MachineEfficiencyRate').html(parseFloat(response.DATA[0].machine_efficiency_rate).toFixed(2) + "%");
                            $('.'+line_name+'TimeOperationRate').html(parseFloat(response.DATA[0].time_operation_rate).toFixed(2) + "%");
                            $('.'+line_name+'TotalProductRate').html(parseFloat(response.DATA[0].total_product_rate).toFixed(2) + "%");
                            $('.'+line_name+'OkProductRate').html(parseFloat(response.DATA[0].ok_product_rate).toFixed(2) + "%");

                            $('.'+line_name+'WorkingTime').html((parseFloat(response.DATA[0].working_time_s) / 60).toFixed(2) + " 분");
                            $('.'+line_name+'WkNonActiveTime').html((parseFloat(response.DATA[0].working_nonactive_time_s) / 60).toFixed(2) + " 분");

                            $('.'+line_name+'TotalProduct').html(response.DATA[0].total_product + " 개");
                            $('#'+line_name+'OkProduct').html(response.DATA[0].ok_product + " 개");
                            $('.'+line_name+'TargetProductQty').html(response.DATA[0].target_product_qty + " 개");


                            // -- new
                            $('.'+line_name+'TheoreticalCycleTime').html(parseFloat(response.DATA[0].theoretical_cycle_time_s).toFixed(2) + " 초");
                            $('.'+line_name+'ProcessCycleTime').html(parseFloat(response.DATA[0].process_cycle_time_s).toFixed(2) + " 초");
                            $('.'+line_name+'TargetWorkingTime').html(( parseFloat(response.DATA[0].target_working_time_s) / 60).toFixed(2)  + " 분");


                            // New columns

                             var theoreticalCycleTime = 0 ;
                             var processCycleTime = 0 ;
                             var workingTime = 0 ;
                             var wkNonActiveTime = 0 ;
                             var totalProduct = 0 ;

                             // 정미가동율 = (공정사이클타임*생산수량)/(부하시간-부하비가동시간)
                             var netOperatingTime = 0 ;

                             // 속도가동율 = 이론사이클타임/공정사이클타임
                             var operatingSpeedRate = 0 ;

                            theoreticalCycleTime = parseFloat(response.DATA[0].theoretical_cycle_time_s);

                            processCycleTime = parseFloat(response.DATA[0].process_cycle_time_s);
                            workingTime = (parseFloat(response.DATA[0].working_time_s) );
                            wkNonActiveTime = (parseFloat(response.DATA[0].working_nonactive_time_s));
                            totalProduct = parseInt(response.DATA[0].total_product);

                            // 정미가동율 = (공정사이클타임*생산수량)/(부하시간-부하비가동시간)
                            if((workingTime - wkNonActiveTime) != 0){
                                netOperatingTime = ( (processCycleTime * totalProduct)/(workingTime - wkNonActiveTime) ) * 100 ;
                            }

                            // 속도가동율 = 이론사이클타임/공정사이클타임
                            if(processCycleTime != 0){
                                operatingSpeedRate =  ( theoreticalCycleTime / processCycleTime ) * 100;
                            }

                             $('.'+line_name+'WorkingTimeSecond').html((parseFloat(response.DATA[0].working_time_s) ).toFixed(2) + " 초");
                             $('.'+line_name+'WkNonActiveTimeSecond').html((parseFloat(response.DATA[0].working_nonactive_time_s) ).toFixed(2) + " 초");

                            $('.'+line_name+'NetOperatingTime').html(netOperatingTime.toFixed(2) + " %");
                            $('.'+line_name+'OperatingSpeedRate').html(operatingSpeedRate.toFixed(2)  + " %");

                            $('.'+line_name+'UPH').html(parseFloat(response.DATA[0].uph).toFixed(2)  + " 개");
                            $('.'+line_name+'WorkingTimeHour').html((parseFloat(response.DATA[0].working_time_s) / 60 / 60).toFixed(2) + " 시간");

                    } else {

                             $('#'+line_name+'MachineEfficiencyRate').html("");
                             $('.'+line_name+'TimeOperationRate').html("");
                             $('.'+line_name+'TotalProductRate').html("");
                             $('.'+line_name+'OkProductRate').html("");

                             $('.'+line_name+'WorkingTime').html("");
                             $('.'+line_name+'WkNonActiveTime').html("");

                             $('.'+line_name+'TotalProduct').html("");
                             $('#'+line_name+'OkProduct').html("");
                             $('.'+line_name+'TargetProductQty').html("");

                             // -- new
                             $('.'+line_name+'TheoreticalCycleTime').html("");
                             $('.'+line_name+'ProcessCycleTime').html("");
                             $('.'+line_name+'TargetWorkingTime').html("");

                             $('.'+line_name+'WorkingTimeSecond').html("");
                             $('.'+line_name+'WkNonActiveTimeSecond').html("");

                             $('.'+line_name+'NetOperatingTime').html("");
                             $('.'+line_name+'OperatingSpeedRate').html("");

                             $('.'+line_name+'UPH').html("");
                             $('.'+line_name+'WorkingTimeHour').html("");
                    }

                } else {
                    alert("No Data");
                }
                // When you completed your work and then you call the callback function
                // This if just check if they want to use the callback function or not
                if(callback) {
                    // if use we call the callback function so
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    $('#btnSearch').click(function(){

        var parentNode = $(this).closest('.panel-body');
        var selectorName = parentNode.find('.form-control').attr('id');
        var startTime = parentNode.find('.startTimeClass input').val();
        var endTime = parentNode.find('.endTimeClass input').val();

        // console.log("Selector Name: " + selectorName);
        // console.log("startTime: " + startTime);
        // console.log("endTime: " + endTime);

        if(dashboardTable.convertStrDateTimeToEpoch(startTime) > dashboardTable.convertStrDateTimeToEpoch(endTime)){
            alert("Please check start date and end date");
        }else {


            openLoading();
            loadData(startTime,endTime);
        }

    });


    function loadData(startTime, endTime){
        // Example getAllDashboard is the ajax Requesst Function so it will be asynchronous I added the callback function         // It is callback function
        dashboardTable.getAllDashBoard("IB",$("#ibSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
            // Body of this callback call the getAllDashboard
            dashboardTable.getAllDashBoard("HA",$("#haSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                // Body of another callback function call the getAllDash..
                dashboardTable.getAllDashBoard("HB",$("#hbSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                    dashboardTable.getAllDashBoard("HC",$("#hcSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                        dashboardTable.getAllDashBoard("HD",$("#hdSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                            dashboardTable.getAllDashBoard("PD",$("#pdSelectMachine").val(),startTime, endTime.substring(0, 10), endTime.substring(11), function(){
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



    function loadDataForFirstTime(startTime, endTime){
        // Example getAllDashboard is the ajax Requesst Function so it will be asynchronous I added the callback function         // It is callback function
        dashboardTable.getAllDashBoard("IB","IB_Runout",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
            // Body of this callback call the getAllDashboard
            dashboardTable.getAllDashBoard("HA","HA_Runout",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                // Body of another callback function call the getAllDash..
                dashboardTable.getAllDashBoard("HB","HB_Tmarker",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                    dashboardTable.getAllDashBoard("HC","HC_TP",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                        dashboardTable.getAllDashBoard("HD","HD_Runout",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
                            dashboardTable.getAllDashBoard("PD","PD_Pnt",startTime, endTime.substring(0, 10), endTime.substring(11), function(){
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


    dashboardTable.convertStrDateTimeToEpoch = function(dateTime){
        return moment(dateTime, 'YYYY-MM-DD HH:mm').toDate().getTime();
    };


    dashboardTable.matchLastMachine = function (selector,textToFind) {
        var dd = document.getElementById(selector);
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === textToFind) {
                dd.selectedIndex = i;
                break;
            }
        }
    }

    dashboardTable.getAllMachineNameByLineName = function(lineName){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllByLine/" + lineName,
            type: 'GET',
            dataType: 'JSON',
            data:{

            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {

                if(lineName == "IB") {
                    $('#ibSelectMachine').empty();
                    // $("#ibSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#ibSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("ibSelectMachine","V홈높이,흔들림");
                    }
                }else if(lineName == "HA") {
                    $('#haSelectMachine').empty();
                    // $("#haSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#haSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("haSelectMachine","V홈높이,흔들림");
                    }
                }else if(lineName == "HB") {
                    $('#hbSelectMachine').empty();
                    // $("#hbSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#hbSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("hbSelectMachine","T/Mark");
                    }
                }else if(lineName == "HC") {
                    $('#hcSelectMachine').empty();
                    // $("#hcSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#hcSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("hcSelectMachine","T플레이트");
                    }
                }else if(lineName == "HD") {
                    $('#hdSelectMachine').empty();
                    // $("#hdSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#hdSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("hdSelectMachine","V홈높이,흔들림");
                    }
                }else if(lineName == "PD") {
                    $('#pdSelectMachine').empty();
                    // $("#pdSelectMachine").append("<option value=''>설비</option>");
                    if (response.code == "200") {
                        $.each(response.data, function (key, value) {
                            $("#pdSelectMachine").append("<option value=" + value.name + ">" + value.name + "</option>");
                        });
                        dashboardTable.matchLastMachine("pdSelectMachine","도장기");
                    }
                }


            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    // HIDE AND SHOW PANE OF LINE DETAILS
    $(function() {

        dashboardTable.getAllMachineNameByLineName("IB");
        dashboardTable.getAllMachineNameByLineName("HA");
        dashboardTable.getAllMachineNameByLineName("HB");
        dashboardTable.getAllMachineNameByLineName("HC");
        dashboardTable.getAllMachineNameByLineName("HD");
        dashboardTable.getAllMachineNameByLineName("PD");



        $('#btnIBDetail').click(function() {
            $('.ibPane').toggle();
        });

        $('#btnHADetail').click(function() {
            $('.haPane').toggle();
        });

        $('#btnHBDetail').click(function() {
            $('.hbPane').toggle();
        });

        $('#btnHCDetail').click(function() {
            $('.hcPane').toggle();
        });

        $('#btnHDDetail').click(function() {
            $('.hdPane').toggle();
        });

        $('#btnPDDetail').click(function() {
            $('.pdPane').toggle();
        });


        openLoading();
        loadDataForFirstTime($("#txtStartTime").val(), $("#txtEndTime").val());
    });


    $('.ibPane').toggle();
    $('.haPane').toggle();
    $('.hbPane').toggle();
    $('.hcPane').toggle();
    $('.hdPane').toggle();
    $('.pdPane').toggle();


});

