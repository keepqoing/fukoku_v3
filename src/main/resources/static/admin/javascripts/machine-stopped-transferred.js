$(function () {

    var machineStopped = {};
    var alarmHistory = {};
    var checkPagination = true;
    var checkPaginationMain = true;
    var currentPage = 1;
    var departmentId = 0;
    var rowKey = "";
    var oneRecord;
    var record;
    var limit = 100;
    var j;
    var val = {};
    var lastPageNumber = 1;
    var m_option = "0";


    // Variable to store global values
    var _CLASSIFICATION = "";
    var _ITEM = "";
    var _ERROR = "";
    var _TREATMENT = "";

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $('#panel').hide();

    $('#treatmentPanel').click(function () {
        $('#panel').show();
    });



    machineStopped.getLineCounting = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state/number-line/생산부/0",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getMachineCounting = function (lineParam, callback) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state/number-machine/"+lineParam+"/생산부/0",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    var buttonClicked = null;
    var buttonClicked1 = null;
    var a = null;

    function highlightButtonLine(element) {
        if (buttonClicked != null) {
            buttonClicked.style.background = "#00a65a";
        }
        buttonClicked = element;
        buttonClicked.style.background = "black";
    }

    function highlightButtonMachine(element) {
        if (buttonClicked1 != null) {
            buttonClicked1.style.background = "#dd4b39";
        }
        buttonClicked1 = element;
        buttonClicked1.style.background = "black";
    }

    var buttonClickedHistory = null;
    var buttonClicked1History = null;

    function highlightButtonLineHistory(element) {
        if (buttonClickedHistory != null) {
            buttonClickedHistory.style.background = "#00a65a";
        }
        buttonClickedHistory = element;
        buttonClickedHistory.style.background = "black";
    }

    function highlightButtonMachineHistory(element) {
        if (buttonClicked1History != null) {
            buttonClicked1History.style.background = "#dd4b39";
        }
        buttonClicked1History = element;
        buttonClicked1History.style.background = "black";
    }

    machineStopped.getAllLinesName = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/line/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllMachineNameByLineName = function (line, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": line
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    var lineId = "";
    var machineId = "";
    $(document).on('click', '#btnLine', function () {
        $('#selectLineButtonList').children('button').attr("style","margin-right: 5px; margin-bottom: 5px;");
        highlightButtonLine(this);
        lineId = $(this).data("id");
        checkPagination = true;
        checkPaginationMain = true;
        currentPage = 1;
        if (lineId == '') {
            openLoading();
            machineStopped.getAllAlarmByStatus3('', '', function () {
                closeLoading();
            });
            $("#selectMachineButtonList").html("");
            return;
        }


        machineStopped.getAllMachineNameByLineName(lineId, function (response) {
            //val = response;
            $("#selectMachineButtonList").html("");
            if (response.CODE == "7777") {

                $("#noData").hide();

                $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
                $.each(response.DATA, function (key, value) {
                    $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</button>");
                });
                openLoading();
                // Start Count Machine
                var machineCounter = new Array(response.DATA.length);
                for (var i = 0; i < machineCounter.length; i++) {
                    machineCounter[i] = 0;
                }
                machineStopped.getAllAlarmByStatus3(lineId, '', function (r) {

                    // Count Machine by line
                    if (r.DATA1.countAlarmMstatesByLineInEachMachines) {
                        console.log("response.DATA", response.DATA);
                        console.log("getAllMachineNameByLineName",r );
                        for (var a = 0; a < response.DATA.length; a++) {
                            for (var b = 0; b < r.DATA1.countAlarmMstatesByLineInEachMachines.length; b++) {
                                if (response.DATA[a].MAPPING_NAME == r.DATA1.countAlarmMstatesByLineInEachMachines[b].mappingName) {
                                    machineCounter[a] = r.DATA1.countAlarmMstatesByLineInEachMachines[b].totalAlarmMstate;
                                }
                            }
                        }
                    } else {
                        for (var a = 0; a < response.DATA.length; a++) {
                            machineCounter[a] = 0;
                        }
                    }
                    var total = 0;
                    for (var i = 0; i < machineCounter.length; i++) {
                        total += machineCounter[i];
                    }
                    machineCounter.splice(0, 0, total);

                    for (var i = 0; i < machineCounter.length; i++) {
                        var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                        $('#selectMachineButtonList').children('button').eq(i).html(t1 + " (" + machineCounter[i] + ")");
                    }
                    closeLoading();
                });
                /*
                machineStopped.getAllAlarmByStatus3(lineId, '', function (r) {
                    console.log("getAllMachineNameByLineName",r );
                    // Count Machine by line
                    if (r.DATA) {
                        for (var a = 0; a < response.DATA.length; a++) {
                            for (var b = 0; b < r.DATA.length; b++) {
                                if (response.DATA[a].MACHINE_NAME == r.DATA[b].MACHINE_NAME) {
                                    machineCounter[a] += 1;
                                }
                            }
                        }
                    } else {
                        for (var a = 0; a < response.DATA.length; a++) {
                            machineCounter[a] = 0;
                        }
                    }
                    var total = 0;
                    for (var i = 0; i < machineCounter.length; i++) {
                        total += machineCounter[i];
                    }
                    machineCounter.splice(0, 0, total);

                    for (var i = 0; i < machineCounter.length; i++) {
                        var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                        $('#selectMachineButtonList').children('button').eq(i).html(t1 + " (" + machineCounter[i] + ")");
                    }
                    closeLoading();
                });
                */

                // End Count Machine
            }else {

            }
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineId = $(this).data("id");
        checkPagination = true;
        checkPaginationMain = true;
        currentPage = 1;
        if (machineId == '') {
            openLoading();
            machineStopped.getAllAlarmByStatus3(lineId, '', function () {
                closeLoading();
            });
            return;
        }
        openLoading();
        machineStopped.getAllAlarmByStatus3(lineId, machineId, function () {
            closeLoading();
        });



    });

    function clearText(tagId, text) {
        $(tagId).html(text);
    }

    function changeText() {
        clearText("#classificationStep", "");
        clearText("#itemStep", "");
        clearText("#errorStep", "");
        clearText("#treatmentStep", "");
    }

    function addAlarmHistoryModule() {
        // var classification = $("#classificationStep").html().trim();
        // var item = $("#itemStep").html().trim();
        // var error = $("#errorStep").html().trim();
        // var treatment = $("#treatmentStep").html().trim();

        var classification = _CLASSIFICATION;
        var item = _ITEM;
        var error = _ERROR;
        var treatment = _TREATMENT;


        var data = {
            "ALARM_CODE": oneRecord.DATA.ALARM_CODE,
            "ALARM_NAME": oneRecord.DATA.ALARM_NAME,
            "CLASSIFICATION_NAME": classification,
            "END_ALARM_TIME": oneRecord.DATA.END_TIME,
            "END_REPAIR_TIME": "",
            "ERROR_NAME": error,
            "ITEM_NAME": item,
            "LINE": oneRecord.DATA.LINE_NAME,
            "MACHINE": oneRecord.DATA.MACHINE_NAME,
            "MACHINE_MAPPING": oneRecord.DATA.MACHINE_NAME,
            "MSTATE": oneRecord.DATA.MACHINE_STATE,
            "ROW_KEY": rowKey.trim(),
            "START_ALARM_TIME": oneRecord.DATA.START_TIME,
            "START_REPAIR_TIME": "",
            "TREATMENT_NAME": treatment,
            "DEPARTMENT": "생산부"
        };
        machineStopped.addAlarm(data, function () {
            changeText();
            $("#modalMachineStopped").modal('hide');
            $('#smartwizard').smartWizard("reset");
        });
    }

    $("#btnSave").click(function () {
        /*if($('#classificationStep').html() == '항목' || $('#itemStep').html() == '세부항목' || $('#errorStep').html() == '고장' || $('#treatmentStep').html() == '고장조치'){
            alert('Please complete all steps!');
            return;
        }*/
        openLoading();
        // addAlarmHistoryModule(); Dr. Kim told not to add the alarm again because the alarm is already added by system every 30 minutes. As fo 2018-10-27. Developer Chomern
        closeLoading();
    });
    // Toolbar extra buttons
    /*var btnSave = $('<button></button>').text('조치내용추가').addClass('btn btn-primary').on('click', function () {
        if($('#classificationStep').html() == '항목' || $('#itemStep').html() == '세부항목' || $('#errorStep').html() == '고장' || $('#treatmentStep').html() == '고장조치'){
            alert('Please complete all steps!');
            return;
        }
        openLoading();
        addAlarmHistoryModule();
        closeLoading();
    });*/
    var btnFinish = $('<button></button>').text('완료').addClass('btn btn-info').on('click', function () {
        /*if($('#classificationStep').html() == '항목' || $('#itemStep').html() == '세부항목' || $('#errorStep').html() == '고장' || $('#treatmentStep').html() == '고장조치'){
            alert('Please complete all steps!');
            return;
        }*/
        var z = confirm("아래와 같이 조치내용을 저장하시겠습니까?\n  - 아래 -\n"+"이상항목: "+$('#classificationStep').html()+"\n세부항목: "+$('#itemStep').html()+"\n이상원인: "+$('#errorStep').html()+"\n조치: "+$('#treatmentStep').html());
        if (z == true) {
            console.log("record = "+record);
            addErorStateModule(record);
            var rowKeyIn = {"ROW_KEY": mstate_id.toString()};
            openLoading()
            machineStopped.deleteAlarmList(rowKeyIn, function (response) {
                reload();
            });
        }
    });
    var btnCancel = $('<button></button>').text('취소').addClass('btn btn-danger').on('click', function () {
        $("#modalMachineStopped").modal('hide');
        $('#smartwizard').smartWizard("reset");
    });

    // Smart Wizard
    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect: 'fade',
        toolbarSettings: {
            toolbarPosition: 'bottom',
            toolbarExtraButtons: [btnFinish, btnCancel]
        }
    });

    $('#smartwizard').smartWizard("reset");

    machineStopped.getAllLinesName(function (response) {
        if (response.CODE == "7777") {
            openLoading();
            $("#selectLineButtonList").html("");
            $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLine'>ALL</button>");
            for (var v = 0; v < response.DATA.length; v++) {
                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response.DATA[v].MAPPING_NAME + " id='btnLine'>" + response.DATA[v].LINE_NAME + "</button>");
            }
            /*$.each(response.DATA, function(key, value){
            });*/
            machineStopped.getAllAlarmByStatus(lineId, machineId, function () {
                closeLoading();
            });
        }
    });

    //TODO: SERVER SIDE REQUEST
    // Important function
    machineStopped.getAllAlarmByStatus = function (line, machine, callback) {
        $("#selectMachineButtonList").empty();
        $('#selectLineButtonList').children('button').attr("style","margin-right: 5px; margin-bottom: 5px;");
        $('#selectLineButtonList').children('button') .eq(0).attr("style","margin-right: 5px; margin-bottom: 5px;background: black;");
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": $("#PER_PAGE_MAIN").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").show();*/
                    // if (response.DATA.length > 0) {


                        /**
                         * Add pagination
                         * @type {number}
                         */
                    if (response.DATA.length > 0 || !response.DATA) {

                        console.log("data",response);


                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no  + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                            no++;
                        });

                        $("#limitPageMain").html(response.PAGINATION.PAGE);
                        $("#totalPageMain").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecordsMain").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");

                        /**
                         * Add pagination
                         */
                        if (checkPaginationMain) {
                            machineStopped.setPagination(response.PAGINATION.TOTAL_PAGES, currentPage);
                            checkPaginationMain = false;
                        }

                        var no = 1;
                        var lineCounter = {
                            ALL: 0,
                            IB: 0,
                            HC: 0,
                            HD: 0,
                            HA: 0,
                            HB: 0,
                            PD: 0
                        };

                        /*
                        $.each(response.DATA, function (key, value) {

                            // response.DATA[key]["NO"] = no;


                            // * Add pagination

                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);


                            no++;
                            if (response.DATA[key].LINE_NAME == 'IB') {
                                lineCounter.IB = lineCounter.IB + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HC') {
                                lineCounter.HC = lineCounter.HC + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HD') {
                                lineCounter.HD = lineCounter.HD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'PD') {
                                lineCounter.PD = lineCounter.PD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HA') {
                                lineCounter.HA = lineCounter.HA + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HB') {
                                lineCounter.HB = lineCounter.HB + 1;
                            }
                        });
                        lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
                        */

                        //lineCounter.ALL = response.PAGINATION.TOTAL_COUNT;
                        $.each(response.DATA1.countAlarmMstates, function (key, value) {
                            console.log("key, value", value.lineName);
                            if (value.lineName == 'IB') {
                                lineCounter.IB = value.totalAlarmMstate;
                            } else if (value.lineName == 'HC') {
                                lineCounter.HC = value.totalAlarmMstate;
                            } else if (value.lineName == 'HD') {
                                lineCounter.HD = value.totalAlarmMstate;
                            } else if (value.lineName == 'PD') {
                                lineCounter.PD = value.totalAlarmMstate;
                            } else if (value.lineName == 'HA') {
                                lineCounter.HA = value.totalAlarmMstate;
                            } else if (value.lineName == 'HB') {
                                lineCounter.HB = value.totalAlarmMstate;
                            }else{
                                lineCounter.ALL = value.totalAlarmMstate;
                            }
                        });

                            for (var b = 0; b < 7; b++) {
                                var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                                var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                                $('#selectLineButtonList').children('button').eq(b).html('')
                                if (t == 'IB') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                                } else if (t == 'HC') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                                } else if (t == 'HD') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                                } else if (t == 'PD') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                                } else if (t == 'HA') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                                } else if (t == 'HB') {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                                } else {
                                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                                }
                            }







                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");

                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION_MAIN").html("");
                    }
                } else {

                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").hide();*/
                    $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION_MAIN").html("");
                    $("#limitPageMain").html(0);
                    $("#totalPageMain").html(0);
                    $("#totalRecordsMain").html("(0 공정)");
                }
                if (callback)
                    callback();
            },
            error: function (data, status, err) {
                if (callback)
                    callback();
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatusWhenClickPagination = function (line, machine, callback) {
       // $("#selectMachineButtonList").empty();
       // $('#selectLineButtonList').children('button').attr("style","margin-right: 5px; margin-bottom: 5px;");
       // $('#selectLineButtonList').children('button') .eq(0).attr("style","margin-right: 5px; margin-bottom: 5px;background: black;");


        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": $("#PER_PAGE_MAIN").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").show();*/
                    // if (response.DATA.length > 0) {


                    /**
                     * Add pagination
                     * @type {number}
                     */
                    if (response.DATA.length > 0 || !response.DATA) {

                        console.log("data",response);

                        $("#limitPageMain").html(response.PAGINATION.PAGE);
                        $("#totalPageMain").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecordsMain").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");


                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no  + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                            no++;
                        });

                        var no = 1;
                        var lineCounter = {
                            ALL: 0,
                            IB: 0,
                            HC: 0,
                            HD: 0,
                            HA: 0,
                            HB: 0,
                            PD: 0
                        };

                        /*
                        $.each(response.DATA, function (key, value) {

                            // response.DATA[key]["NO"] = no;


                            // * Add pagination

                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);


                            no++;
                            if (response.DATA[key].LINE_NAME == 'IB') {
                                lineCounter.IB = lineCounter.IB + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HC') {
                                lineCounter.HC = lineCounter.HC + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HD') {
                                lineCounter.HD = lineCounter.HD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'PD') {
                                lineCounter.PD = lineCounter.PD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HA') {
                                lineCounter.HA = lineCounter.HA + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HB') {
                                lineCounter.HB = lineCounter.HB + 1;
                            }
                        });
                        lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
                        */

                        //lineCounter.ALL = response.PAGINATION.TOTAL_COUNT;
                        /*
                        $.each(response.DATA1.countAlarmMstates, function (key, value) {
                            console.log("key, value", value.lineName);
                            if (value.lineName == 'IB') {
                                lineCounter.IB = value.totalAlarmMstate;
                            } else if (value.lineName == 'HC') {
                                lineCounter.HC = value.totalAlarmMstate;
                            } else if (value.lineName == 'HD') {
                                lineCounter.HD = value.totalAlarmMstate;
                            } else if (value.lineName == 'PD') {
                                lineCounter.PD = value.totalAlarmMstate;
                            } else if (value.lineName == 'HA') {
                                lineCounter.HA = value.totalAlarmMstate;
                            } else if (value.lineName == 'HB') {
                                lineCounter.HB = value.totalAlarmMstate;
                            }else{
                                lineCounter.ALL = value.totalAlarmMstate;
                            }
                        });

                        for (var b = 0; b < 7; b++) {
                            var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                            var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                            $('#selectLineButtonList').children('button').eq(b).html('')
                            if (t == 'IB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                            } else if (t == 'HC') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                            } else if (t == 'HD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                            } else if (t == 'PD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                            } else if (t == 'HA') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                            } else if (t == 'HB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                            } else {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                            }
                        }
                        */







                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                        /**
                         * Add pagination
                         */

                        if (checkPaginationMain) {
                            machineStopped.setPagination(response.PAGINATION.TOTAL_PAGES,currentPage);
                            checkPaginationMain = false;
                        }
                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION_MAIN").html("");
                    }
                } else {

                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").hide();*/
                    $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION_MAIN").html("");
                    $("#limitPageMain").html(0);
                    $("#totalPageMain").html(0);
                    $("#totalRecordsMain").html("(0 공정)");
                }
                if (callback)
                    callback();
            },
            error: function (data, status, err) {
                if (callback)
                    callback();
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };



    machineStopped.getAllAlarmByStatusWhenChangeByCambox = function (line, machine, callback) {
        //$("#selectMachineButtonList").empty();
        //$('#selectLineButtonList').children('button').attr("style","margin-right: 5px; margin-bottom: 5px;");
        //$('#selectLineButtonList').children('button') .eq(0).attr("style","margin-right: 5px; margin-bottom: 5px;background: black;");


        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": $("#PER_PAGE_MAIN").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").show();*/
                    // if (response.DATA.length > 0) {


                    /**
                     * Add pagination
                     * @type {number}
                     */
                    if (response.DATA.length > 0 || !response.DATA) {

                        console.log("data",response);

                        $("#limitPageMain").html(response.PAGINATION.PAGE);
                        $("#totalPageMain").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecordsMain").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");

                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no  + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                            no++;
                        });

                        var no = 1;
                        var lineCounter = {
                            ALL: 0,
                            IB: 0,
                            HC: 0,
                            HD: 0,
                            HA: 0,
                            HB: 0,
                            PD: 0
                        };

                        /*
                        $.each(response.DATA, function (key, value) {

                            // response.DATA[key]["NO"] = no;


                            // * Add pagination

                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);


                            no++;
                            if (response.DATA[key].LINE_NAME == 'IB') {
                                lineCounter.IB = lineCounter.IB + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HC') {
                                lineCounter.HC = lineCounter.HC + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HD') {
                                lineCounter.HD = lineCounter.HD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'PD') {
                                lineCounter.PD = lineCounter.PD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HA') {
                                lineCounter.HA = lineCounter.HA + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HB') {
                                lineCounter.HB = lineCounter.HB + 1;
                            }
                        });
                        lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
                        */

                        //lineCounter.ALL = response.PAGINATION.TOTAL_COUNT;
                        $.each(response.DATA1.countAlarmMstates, function (key, value) {
                            console.log("key, value", value.lineName);
                            if (value.lineName == 'IB') {
                                lineCounter.IB = value.totalAlarmMstate;
                            } else if (value.lineName == 'HC') {
                                lineCounter.HC = value.totalAlarmMstate;
                            } else if (value.lineName == 'HD') {
                                lineCounter.HD = value.totalAlarmMstate;
                            } else if (value.lineName == 'PD') {
                                lineCounter.PD = value.totalAlarmMstate;
                            } else if (value.lineName == 'HA') {
                                lineCounter.HA = value.totalAlarmMstate;
                            } else if (value.lineName == 'HB') {
                                lineCounter.HB = value.totalAlarmMstate;
                            }else{
                                lineCounter.ALL = value.totalAlarmMstate;
                            }
                        });

                        for (var b = 0; b < 7; b++) {
                            var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                            var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                            $('#selectLineButtonList').children('button').eq(b).html('')
                            if (t == 'IB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                            } else if (t == 'HC') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                            } else if (t == 'HD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                            } else if (t == 'PD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                            } else if (t == 'HA') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                            } else if (t == 'HB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                            } else {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                            }
                        }

                        machineStopped.getAllMachineNameByLineName(lineId, function (response) {
                            //val = response;
                            //$("#selectMachineButtonList").html("");
                            if (response.CODE == "7777") {

                                //$("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
                                $.each(response.DATA, function (key, value) {
                                    $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</button>");
                                });
                                //openLoading();
                                // Start Count Machine
                                var machineCounter = new Array(response.DATA.length);
                                for (var i = 0; i < machineCounter.length; i++) {
                                    machineCounter[i] = 0;
                                }
                                machineStopped.getAllAlarmByStatus3(lineId, '', function (r) {

                                    // Count Machine by line
                                    if (r.DATA1.countAlarmMstatesByLineInEachMachines) {
                                        console.log("response.DATA", response.DATA);
                                        console.log("getAllMachineNameByLineName",r );
                                        for (var a = 0; a < response.DATA.length; a++) {
                                            for (var b = 0; b < r.DATA1.countAlarmMstatesByLineInEachMachines.length; b++) {
                                                if (response.DATA[a].MAPPING_NAME == r.DATA1.countAlarmMstatesByLineInEachMachines[b].mappingName) {
                                                    machineCounter[a] = r.DATA1.countAlarmMstatesByLineInEachMachines[b].totalAlarmMstate;
                                                }
                                            }
                                        }
                                    } else {
                                        for (var a = 0; a < response.DATA.length; a++) {
                                            machineCounter[a] = 0;
                                        }
                                    }
                                    var total = 0;
                                    for (var i = 0; i < machineCounter.length; i++) {
                                        total += machineCounter[i];
                                    }
                                    machineCounter.splice(0, 0, total);

                                    for (var i = 0; i < machineCounter.length; i++) {
                                        var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                                        $('#selectMachineButtonList').children('button').eq(i).html(t1 + " (" + machineCounter[i] + ")");
                                    }
                                    //closeLoading();
                                });
                            }
                        });



                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                        /**
                         * Add pagination
                         */
                        if (checkPaginationMain) {
                            machineStopped.setPagination(response.PAGINATION.TOTAL_PAGES,currentPage);
                            checkPaginationMain = false;
                        }
                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION_MAIN").html("");
                    }
                } else {

                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").hide();*/
                    $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION_MAIN").html("");
                    $("#limitPageMain").html(0);
                    $("#totalPageMain").html(0);
                    $("#totalRecordsMain").html("(0 공정)");
                }
                if (callback)
                    callback();
            },
            error: function (data, status, err) {
                if (callback)
                    callback();
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatus1 = function (line, machine, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": limit
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    //$("#MACHINE_STOPPED").html("");
                    //$("#btnLoadMore").show();
                    if (response.DATA.length > 0) {

                        /**
                         * Add pagination
                         */
                        $("#limitPageMain").html(response.PAGINATION.PAGE);
                        $("#totalPageMain").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecordsMain").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        /**
                         * Add pagination
                         */
                        if (checkPaginationMain) {
                            machineStopped.setPagination(response.PAGINATION.TOTAL_PAGES,currentPage);
                            checkPaginationMain = false;
                        }
                        //var no = 1;
                        var lineCounter = {
                            ALL: 0,
                            IB: 0,
                            HC: 0,
                            HD: 0,
                            HA: 0,
                            HB: 0,
                            PD: 0
                        };
                        $.each(response.DATA, function (key, value) {
                            if (response.DATA[key].LINE_NAME == 'IB') {
                                lineCounter.IB = lineCounter.IB + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HC') {
                                lineCounter.HC = lineCounter.HC + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HD') {
                                lineCounter.HD = lineCounter.HD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'PD') {
                                lineCounter.PD = lineCounter.PD + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HA') {
                                lineCounter.HA = lineCounter.HA + 1;
                            } else if (response.DATA[key].LINE_NAME == 'HB') {
                                lineCounter.HB = lineCounter.HB + 1;
                            }
                        });
                        lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
                        for (var b = 0; b < 7; b++) {
                            var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                            var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                            $('#selectLineButtonList').children('button').eq(b).html('')
                            if (t == 'IB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                            } else if (t == 'HC') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                            } else if (t == 'HD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                            } else if (t == 'PD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                            } else if (t == 'HA') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                            } else if (t == 'HB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                            } else {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                            }
                        }
                    } else {
                    }
                } else {
                }
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatus2 = function (line, machine, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": limit
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback)
                    callback(response);
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatus3 = function (line, machine, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": $("#PER_PAGE_MAIN").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("1",response);
                if (response.CODE == "7777") {

                    $("#MACHINE_STOPPED").html("");
                    /*$("#btnLoadMore").show();*/
                    if (response.DATA.length > 0) {

                       // alert(1);


                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no  + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                            no++;
                        });
                        //if (callback)
                         //   callback(response);
                        console.log("2 response.DATA",response);
                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                        /**
                         * Add pagination
                         */
                        $("#limitPageMain").html(response.PAGINATION.PAGE);
                        $("#totalPageMain").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecordsMain").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        if (checkPaginationMain) {
                            machineStopped.setPagination(response.PAGINATION.TOTAL_PAGES,currentPage);
                            checkPaginationMain = false;
                        }

                    } else {
                        if (callback)
                            callback(response);
                        $("#MACHINE_STOPPED").html("");
                        /*$("#btnLoadMore").hide();*/
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");

                        //$("#textData").text(line + " 검색결과: 0 건");
                        // $("#noData").show();
                    }
                } else {
                    $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                }




                        var no = 1;
                        var lineCounter = {
                            ALL: 0,
                            IB: 0,
                            HC: 0,
                            HD: 0,
                            HA: 0,
                            HB: 0,
                            PD: 0
                        };

                        //lineCounter.ALL = response.PAGINATION.TOTAL_COUNT;
                        $.each(response.DATA1.countAlarmMstates, function (key, value) {
                            console.log("key, value", value.lineName);
                            if (value.lineName == 'IB') {
                                lineCounter.IB = value.totalAlarmMstate;
                            } else if (value.lineName == 'HC') {
                                lineCounter.HC = value.totalAlarmMstate;
                            } else if (value.lineName == 'HD') {
                                lineCounter.HD = value.totalAlarmMstate;
                            } else if (value.lineName == 'PD') {
                                lineCounter.PD = value.totalAlarmMstate;
                            } else if (value.lineName == 'HA') {
                                lineCounter.HA = value.totalAlarmMstate;
                            } else if (value.lineName == 'HB') {
                                lineCounter.HB = value.totalAlarmMstate;
                            }else{
                                lineCounter.ALL = value.totalAlarmMstate;
                            }
                        });

                        for (var b = 0; b < 7; b++) {
                            var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                            var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                            $('#selectLineButtonList').children('button').eq(b).html('')
                            if (t == 'IB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                            } else if (t == 'HC') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                            } else if (t == 'HD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                            } else if (t == 'PD') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                            } else if (t == 'HA') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                            } else if (t == 'HB') {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                            } else {
                                $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                            }
                        }

                        machineStopped.getAllMachineNameByLineName(lineId, function (response1) {
                            //val = response;
                            //$("#selectMachineButtonList").html("");
                            if (response1.CODE == "7777") {
                                console.log("3 getAllMachineNameByLineName" , response1);

                                //$("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
                                //$.each(response.DATA, function (key, value) {
                                //    $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</button>");
                               // });
                                //openLoading();
                                // Start Count Machine
                                var machineCounter = new Array(response1.DATA.length);
                                for (var i = 0; i < machineCounter.length; i++) {
                                    machineCounter[i] = 0;
                                }
                                //machineStopped.getAllAlarmByStatus3(lineId, '', function (r) {

                                    // Count Machine by line
                                    if (response.DATA1.countAlarmMstatesByLineInEachMachines) {
                                        console.log("response.DATA", response1.DATA);
                                        console.log("getAllMachineNameByLineName",response );
                                        for (var a = 0; a < response1.DATA.length; a++) {
                                            for (var b = 0; b < response.DATA1.countAlarmMstatesByLineInEachMachines.length; b++) {
                                                if (response1.DATA[a].MAPPING_NAME == response.DATA1.countAlarmMstatesByLineInEachMachines[b].mappingName) {
                                                    machineCounter[a] = response.DATA1.countAlarmMstatesByLineInEachMachines[b].totalAlarmMstate;
                                                }
                                            }
                                        }
                                    } else {
                                        for (var a = 0; a < response1.DATA.length; a++) {
                                            machineCounter[a] = 0;
                                        }
                                    }
                                    var total = 0;
                                    for (var i = 0; i < machineCounter.length; i++) {
                                        total += machineCounter[i];
                                    }
                                    machineCounter.splice(0, 0, total);

                                    for (var i = 0; i < machineCounter.length; i++) {
                                        var t1 = $('#selectMachineButtonList').children('button').eq(i).html().split(" ");
                                        console.log(t1);
                                        $('#selectMachineButtonList').children('button').eq(i).html(t1[0] + " (" + machineCounter[i] + ")");
                                    }

                                //});




                            }
                        });







                closeLoading();

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatusRealTime = function (line, machine, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/transferred-alarm-mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status": "NO",
                "mState": m_option,
                "mState1": "WAIT",
                "department": "1",
                "line": line,
                "machine": machine,
                "limit": limit
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#MACHINE_STOPPED").html("");
                    if (response.DATA.length > 0) {
                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no;
                            no++;
                        });

                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    }
                }
                if (callback)
                    callback(response);
            },
            error: function (data, status, err) {
                var data = []
                var response = {DATA: data};
                if (callback)
                    callback(response);
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    machineStopped.getAllAlarmHistoriesByRowKey = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/alarm-history/row-key",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "rowKey": rowKey,
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                $("#REPAIRING_INFO").html("");
                if (response.CODE == "7777") {
                    if (response.DATA.length > 0) {
                        var no = 1;
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = no;
                            no++;
                        });
                        $("#REPAIR_INFO_TEMPLATE").tmpl(response.DATA).appendTo("tbody#REPAIRING_INFO");
                    } else {
                        $("#REPAIRING_INFO").html("<tr style='text-align:center;'><td colspan='14'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#REPAIRING_INFO").html("<tr style='text-align:center;'><td colspan='14'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };


    machineStopped.getAllClassificationName = function (department, callback) {
        $.ajax({
            url: "/v1/api/fukoku/category/status/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "department": department,
                "status": 1
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllErrorCode = function (classification, callback) {
        $.ajax({
            url: "/v1/api/fukoku/error/select-box-by-classification",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "classification": classification
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAlarm = function (rowKey, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/get-one",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "rowKey": rowKey
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAlarmList = function (rowKey, callback, callbackError) {
        console.log("Row key = "+rowKey);

        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/machine-stopped-transferred/get-one-as-list",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "rowKey": rowKey
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                if (callbackError)
                    callbackError();
                $("#smartwizard").smartWizard('reset');
                $("#modalMachineStopped").modal('show');
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllItemByClassification = function (classification, callback) {
        $.ajax({
            url: "/v1/api/fukoku/item/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "classification": classification
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.addAlarm = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-history/",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.addNonMovingState = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/non-moving-state/",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.addFaultState = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state/",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.addNotError = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/non-moving-state/",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.updateAlarm = function (rowKeyIn, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/update-status",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(rowKeyIn),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.updateAlarmList = function (rowKeyIn, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/update-status-list",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(rowKeyIn),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.deleteAlarmList = function (rowKeyIn, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/mstate_id",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(rowKeyIn),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.updateAlarmDepartment = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/update-department",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.updateAlarmDepartmentList = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/update-department-list",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllTreatmentByDepartment = function (department, callback) {
        $.ajax({
            url: "/v1/api/fukoku/treatment/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "department": department
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    function firstLoad() {
        changeText();
        $('#smartwizard').smartWizard("reset");
        departmentId = 1;
        machineStopped.getAllClassificationName(1, function (response) {
            $("#CLASSIFICATION").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#CLASSIFICATION").append("<button id='btnClassificationClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id=" + value.ID + ">" + value.NAME + "</button>");
                });
            }
        });
    }

    //TODO: FUNCTION OF ALARM HISTORY
    //START ALARM HISTORY
    alarmHistory.getAllAlarmHistory = function (lId, mId) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/fault-state",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "department": "생산부",
                "line": lId,
                "machine": mId,
                "productionDate": '',
                "limit": $("#PER_PAGE").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ERROR_STATE").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ERROR_STATE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ERROR_STATE");
                        if (checkPagination) {
                            alarmHistory.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#ERROR_STATE").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#ERROR_STATE").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 공정)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    //TODO: PAGINATION
    alarmHistory.setPagination = function (totalPage) {
        $('#PAGINATION').bootpag({
            total: totalPage,
            page: currentPage,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: '처음',
            last: '마지막',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        });
    };

    $("#PAGINATION").on("page", function (event, page) {
        checkPagination = false;
        currentPage = page;
        alarmHistory.getAllAlarmHistory(lineHistoryId, machineHistoryId);
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        alarmHistory.getAllAlarmHistory(lineHistoryId, machineHistoryId);
    });


    alarmHistory.getAllLinesName = function () {
        $.ajax({
            url: "/v1/api/fukoku/line/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                if (response.CODE == "7777") {
                    $.each(response.DATA, function (key, value) {
                        $("#selectLine").append("<option value=" + value.MAPPING_NAME + ">" + value.LINE_NAME + "</option>");
                    });
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    alarmHistory.getAllMachineNameByLineName = function () {
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": $("#selectLine").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if (response.CODE == "7777") {
                    $.each(response.DATA, function (key, value) {
                        $("#selectMachine").append("<option value='" + value.MACHINE_NAME + "'>" + value.MACHINE_NAME + "</option>");
                    });
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    //END ALARM HISTORY

    //TODO: View action

    $(document).on('click', '#btnClassificationClick', function () {
        var cfId = $(this).data("id");
        $("#MCL").empty().append("<input type='hidden' value='" + cfId + "' id='txtClassificationHidden'>");
        machineStopped.getAllItemByClassification(cfId, function (response) {
            $("#ITEM").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#ITEM").append("<button id='btnItemClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id=" + value.ID + ">" + value.NAME + "</button>");
                });
            }
        });
        $("#classificationStep").html($(this).html());
        _CLASSIFICATION = $(this).html();
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnItemClick', function () {
        var iId = $(this).data("id");
        $("#MI").empty().append("<input type='hidden' value='" + iId + "' id='txtItemHidden'>");
        machineStopped.getAllErrorCode($("#txtClassificationHidden").val(), function (response) {
            $("#ERROR").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#ERROR").append("<button id='btnErrorClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id=" + value.ID + ">" + value.NAME + "</button>");
                });
            }
        });
        $("#itemStep").html($(this).html());
        _ITEM = $(this).html();
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnErrorClick', function () {
        //var eId = $(this).data("id");
        machineStopped.getAllTreatmentByDepartment(departmentId, function (response) {
            $("#TREATMENT").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#TREATMENT").append("<button id='btnTreatmentClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id=" + value.ID + ">" + value.NAME + "</button>");
                });
            }
        });
        $("#errorStep").html($(this).html());
        _ERROR = $(this).html();
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnTreatmentClick', function () {
        $("#treatmentStep").html($(this).html());
    });

    $("#btnHistory").click(function () {
        $('#selectLineButtonListHistory').html('');
        $('#selectMachineButtonListHistory').html('');
        _TREATMENT = $(this).html();

        /*machineStopped.getAllLinesName(function (response) {
            if (response.CODE == "7777") {
                $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLineHistory'>ALL</button>");
                $.each(response.DATA, function (key, value) {
                    $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='" + value.LINE_NAME + "' id='btnLineHistory'>" + value.LINE_NAME + "</button>");
                });
            }
        });*/
        machineStopped.getAllLinesName(function (response) {
            if(response.CODE == "7777"){
                $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLineHistory'>ALL</button>");
                machineStopped.getLineCounting(function (response1) {
                    var total = 0;
                    for(var v=0;v<response.DATA.length;v++){
                        for(var v1=0;v1<response1.DATA.length;v1++) {
                            if (response.DATA[v] == response.DATA[v1]) {
                                $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response.DATA[v].MAPPING_NAME + " id='btnLineHistory'>" + response.DATA[v].LINE_NAME +"("+response1.DATA[v1].NUMBER+ ")</button>");
                                total += response1.DATA[v1].NUMBER;
                            }
                        }
                    }
                    $("#selectLineButtonListHistory").val($("#selectLineButtonListHistory button:first").html('ALL('+total+')'));
                });
            }
        });
        alarmHistory.getAllAlarmHistory('', '');
        $("#modalHistory").modal('show');
    });

    var lineHistoryId = "";
    var machineHistoryId = "";
    $(document).on('click', '#btnLineHistory', function () {
        highlightButtonLineHistory(this);
        lineHistoryId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if (lineHistoryId == '') {
            alarmHistory.getAllAlarmHistory('', '');
            $("#selectMachineButtonListHistory").html("");
            return;
        }
        alarmHistory.getAllAlarmHistory(lineHistoryId, '');
        machineStopped.getAllMachineNameByLineName(lineHistoryId, function (response) {
            $("#selectMachineButtonListHistory").html("");
            $("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id=''>ALL</button>");
            if (response.CODE == "7777") {
                /*$("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id=''>ALL</button>");
                $.each(response.DATA, function (key, value) {
                    $("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id='" + value.MAPPING_NAME + "'>" + value.MACHINE_NAME + "</button>");
                });*/
                machineStopped.getMachineCounting(lineHistoryId, function (response1) {
                    var total = 0;
                    $.each(response.DATA, function (key, value) {
                        $.each(response1.DATA, function (key1, value1) {
                            if(value.MAPPING_NAME == value1.ATTRIBUTE) {
                                $("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME +"("+value1.NUMBER+ ")</button>");
                                total += value1.NUMBER;
                            }
                        });
                    });
                    $("#selectMachineButtonListHistory").val($("#selectMachineButtonListHistory button:first").html('ALL('+total+')'));
                })
            }
        });

    });

    $(document).on('click', '#btnMachineHistory', function () {
        highlightButtonMachineHistory(this);
        machineHistoryId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if (machineHistoryId == '') {
            alarmHistory.getAllAlarmHistory(lineHistoryId, '');
            return;
        }
        alarmHistory.getAllAlarmHistory(lineId, machineHistoryId);
    });

    $(document).on('click', '#btnPass', function () {
        $("#modalMessagePassTo").modal("show");
        rowKey = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        var data = {
            "ROW_KEY": rowKey
        };
        machineStopped.updateAlarmDepartment(data, function (response) {
            if (response.CODE == "0000") {
                checkPagination = true;
                machineStopped.getAllAlarmByStatus(lineId, machineId);
            } else {
                alert("Transaction error");
            }
        });
        $("#modalMessagePassTo").modal("hide");
    });

    function timeIntervalForAlarm() {
        setInterval(function () {

            machineStopped.getAllAlarmByStatus3(lineId, machineId, function (r) {
                machineStopped.getAllAlarmByStatus1('', '', function (res) {
                    machineStopped.getAllAlarmByStatus2(lineId, '', function (response) {
                        machineStopped.getAllMachineNameByLineName(lineId, function (rm) {
                            // Start Count Machine
                            var machineCounter = new Array(rm.DATA.length);
                            for (var i = 0; i < machineCounter.length; i++) {
                                machineCounter[i] = 0;
                            }
                            // Count Machine by line
                            if (response.DATA != null) {
                                for (var a = 0; a < rm.DATA.length; a++) {
                                    for (var b = 0; b < response.DATA.length; b++) {
                                        if (rm.DATA[a].MACHINE_NAME == response.DATA[b].MACHINE_NAME) {
                                            machineCounter[a] += 1;
                                        }
                                    }
                                }
                            } else {
                                for (var a = 0; a < rm.DATA.length; a++) {
                                    machineCounter[a] = 0;
                                }
                            }
                            var total = 0;
                            for (var i = 0; i < machineCounter.length; i++) {
                                total += machineCounter[i];
                            }
                            machineCounter.splice(0, 0, total);

                            for (var i = 0; i < machineCounter.length; i++) {
                                var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                                var t = t1.split(' ');
                                $('#selectMachineButtonList').children('button').eq(i).html(t[0] + " (" + machineCounter[i] + ")");
                            }
                            $('#headCheck').prop('checked', false);
                            // End Count Machine
                        });
                    });

                });
            });
        }, 300000);
    }

    timeIntervalForAlarm();

    $("#btnNotError").click(function () {
        var json = deletedWithCheckBox().length == 0 ? "N" : deletedWithCheckBox();
        if (json == 'N') {
            alert('Please check the record!')
            return;
        } else {
            openLoading();
            machineStopped.getAlarmList(json.toString(), function (r2) {
                $.each(r2.DATA, function (key, value) {
                    var d = {
                        LINE: value.LINE_NAME,
                        MACHINE: value.MACHINE_NAME,
                        PRODUCT: value.PRODUCT,
                        MSTATE: value.MACHINE_STATE,
                        WORK_DATE: value.WORK_DATE,
                        START_TIME: value.START_TIME,
                        END_TIME: value.END_TIME,
                        DURATION: 0,
                        ALARM_CODE: value.ALARM_CODE,
                        ALARM_NAME: value.ALARM_NAME,
                        DEPARTMENT: '생산부'
                    };
                    machineStopped.addNonMovingState(d, function (r1) {
                    });
                });
                var rowKeyIn = {"ROW_KEY": mstate_id.toString()};
                machineStopped.deleteAlarmList(rowKeyIn, function (r) {
                    reload();
                });
            }, function () {

            });
        }
    });


    function reload() {
        machineStopped.getAllAlarmByStatus3(lineId, machineId, function (r) {
            machineStopped.getAllAlarmByStatus1('', '', function (res) {
                machineStopped.getAllAlarmByStatus2(lineId, '', function (response) {
                    if (lineId != '') {
                        machineStopped.getAllMachineNameByLineName(lineId, function (rm) {
                            // Start Count Machine
                            var machineCounter = new Array(rm.DATA.length);
                            for (var i = 0; i < machineCounter.length; i++) {
                                machineCounter[i] = 0;
                            }
                            // Count Machine by line
                            if (response.DATA) {
                                for (var a = 0; a < rm.DATA.length; a++) {
                                    for (var b = 0; b < response.DATA.length; b++) {
                                        if (rm.DATA[a].MACHINE_NAME == response.DATA[b].MACHINE_NAME) {
                                            machineCounter[a] += 1;
                                        }
                                    }
                                }
                            } else {
                                for (var a = 0; a < rm.DATA.length; a++) {
                                    machineCounter[a] = 0;
                                }
                            }
                            var total = 0;
                            for (var i = 0; i < machineCounter.length; i++) {
                                total += machineCounter[i];
                            }
                            machineCounter.splice(0, 0, total);

                            for (var i = 0; i < machineCounter.length; i++) {
                                var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                                var t = t1.split(' ');
                                $('#selectMachineButtonList').children('button').eq(i).html(t[0] + " (" + machineCounter[i] + ")");
                            }
                            // End Count Machine
                        });
                    }
                    $('#headCheck').prop('checked', false);
                    closeLoading();
                });

            });
        });
    }

    function reloadData(response) {
        if (response.DATA.length > 0) {
            var lineCounter = {
                ALL: 0,
                IB: 0,
                HC: 0,
                HD: 0,
                HA: 0,
                HB: 0,
                PD: 0
            };
            $.each(response.DATA, function (key, value) {
                if (response.DATA[key].LINE_NAME == 'IB') {
                    lineCounter.IB = lineCounter.IB + 1;
                } else if (response.DATA[key].LINE_NAME == 'HC') {
                    lineCounter.HC = lineCounter.HC + 1;
                } else if (response.DATA[key].LINE_NAME == 'HD') {
                    lineCounter.HD = lineCounter.HD + 1;
                } else if (response.DATA[key].LINE_NAME == 'PD') {
                    lineCounter.PD = lineCounter.PD + 1;
                } else if (response.DATA[key].LINE_NAME == 'HA') {
                    lineCounter.HA = lineCounter.HA + 1;
                } else if (response.DATA[key].LINE_NAME == 'HB') {
                    lineCounter.HB = lineCounter.HB + 1;
                }
            });
            lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
            for (var b = 0; b < 7; b++) {
                var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                $('#selectLineButtonList').children('button').eq(b).html('')
                if (t == 'IB') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                } else if (t == 'HC') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                } else if (t == 'HD') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                } else if (t == 'PD') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                } else if (t == 'HA') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                } else if (t == 'HB') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                } else {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                }
            }
        }

        // Count machine

        machineStopped.getAllMachineNameByLineName(lineId, function (rm) {
            // Start Count Machine
            var machineCounter = new Array(rm.DATA.length);
            for (var i = 0; i < machineCounter.length; i++) {
                machineCounter[i] = 0;
            }
            // Count Machine by line
            if (response.DATA) {
                for (var a = 0; a < rm.DATA.length; a++) {
                    for (var b = 0; b < response.DATA.length; b++) {
                        if (rm.DATA[a].MACHINE_NAME == response.DATA[b].MACHINE_NAME) {
                            machineCounter[a] += 1;
                        }
                    }
                }
            } else {
                for (var a = 0; a < rm.DATA.length; a++) {
                    machineCounter[a] = 0;
                }
            }
            var total = 0;
            for (var i = 0; i < machineCounter.length; i++) {
                total += machineCounter[i];
            }
            machineCounter.splice(0, 0, total);

            for (var i = 0; i < machineCounter.length; i++) {
                var t1 = $('#selectMachineButtonList').children('button').eq(i).html();
                var t = t1.split(' ');
                $('#selectMachineButtonList').children('button').eq(i).html(t[0] + " (" + machineCounter[i] + ")");
            }
            // End Count Machine
        });
    }

    function reloadLineData(response) {
        if (response.DATA.length > 0) {
            var lineCounter = {
                ALL: 0,
                IB: 0,
                HC: 0,
                HD: 0,
                HA: 0,
                HB: 0,
                PD: 0
            };
            $.each(response.DATA, function (key, value) {
                if (response.DATA[key].LINE_NAME == 'IB') {
                    lineCounter.IB = lineCounter.IB + 1;
                } else if (response.DATA[key].LINE_NAME == 'HC') {
                    lineCounter.HC = lineCounter.HC + 1;
                } else if (response.DATA[key].LINE_NAME == 'HD') {
                    lineCounter.HD = lineCounter.HD + 1;
                } else if (response.DATA[key].LINE_NAME == 'PD') {
                    lineCounter.PD = lineCounter.PD + 1;
                } else if (response.DATA[key].LINE_NAME == 'HA') {
                    lineCounter.HA = lineCounter.HA + 1;
                } else if (response.DATA[key].LINE_NAME == 'HB') {
                    lineCounter.HB = lineCounter.HB + 1;
                }
            });
            lineCounter.ALL = lineCounter.IB + lineCounter.HC + lineCounter.HD + lineCounter.HA + lineCounter.HB + lineCounter.PD;
            for (var b = 0; b < 7; b++) {
                var t1 = $('#selectLineButtonList').children('button').eq(b).html();
                var t = b == 0 ? t1.substring(0, 3) : t1.substring(0, 2);
                $('#selectLineButtonList').children('button').eq(b).html('')
                if (t == 'IB') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.IB + ")");
                } else if (t == 'HC') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HC + ")");
                } else if (t == 'HD') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HD + ")");
                } else if (t == 'PD') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.PD + ")");
                } else if (t == 'HA') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HA + ")");
                } else if (t == 'HB') {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.HB + ")");
                } else {
                    $('#selectLineButtonList').children('button').eq(b).html(t + " (" + lineCounter.ALL + ")");
                }
            }
        }

    }

    machineStopped.addTransferredTransaction = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    var transferData;
    var alarmData;
    var mstate_id;

    $("#btnTransfer2").click(function () {
        var json = deletedWithCheckBox().length == 0 ? "N" : deletedWithCheckBox();
        if (json == 'N') {
            alert('Please check the record!')
            return;
        } else {
            var data = {
                LINE: JSON.stringify(transferData),
                MACHINE: "",
                START_TIME: "",
                JSON_LIST: JSON.stringify(alarmData),
                DEPARTMENT: "생산부"
            };
            openLoading();
            machineStopped.addTransferredTransaction(data, function () {
                var rowKeyIn = {"ROW_KEY": mstate_id.toString()};
                machineStopped.deleteAlarmList(rowKeyIn, function (response) {
                    reload();

                });
            });
            $("#modalMachineStopped").modal('hide');
            $('#smartwizard').smartWizard("reset");
        }
    });

    $("#btnErrorInputList").click(function () {
        j = deletedWithCheckBox().length == 0 ? "N" : deletedWithCheckBox();
        if (j == 'N') {
            alert('Please check the record!')
            return;
        } else {
            var rowKeyIn = {"ROW_KEY": j.toString()};
            changeText();
            firstLoad();
            $("#R").html("");
            //openLoading();
            machineStopped.getAlarmList(j.toString(), function (response) {
                record = response;
                $.each(response.DATA, function (key, value) {
                    //if(!value.LINE_NAME)
                    $("#R").append("<tr><td>" + value.LINE_NAME + "</td><td>" + value.MACHINE_NAME + "</td><td>" + value.STATE + "</td><td>" + value.START_TIME + "</td><td>" + value.END_TIME + "</td><td>" + value.DURATION + "</td><td>" + value.ALARM_CODE + "</td><td>" + value.ALARM_NAME + "</td></tr>");
                });
            }, function () {

            });
            $("#smartwizard").smartWizard('reset');
            $("#modalMachineStopped").modal('show');
        }
    });


    function deletedWithCheckBox() {
        var arr = [];
        transferData = {};
        alarmData = {};
        var mstate = [];
        mstate_id = "";
        t = [];
        a = [];
        $('input.chk-box:checkbox:checked').each(function () {
            var rowIndex = $('#MACHINE_STOPPED tr').index($(this).closest('tr'));
            var a1 = {
                LINE: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[1].innerHTML,
                MACHINE: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[2].innerHTML,
                PRODUCT: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[3].innerHTML,
                STATE: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[4].innerHTML,
                PRODUCTION_DATE: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[5].innerHTML,
                START_TIME: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[6].innerHTML,
                END_TIME: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[7].innerHTML,
                ALARM_CODE: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[10].innerHTML,
                ALARM_NAME: document.getElementById('MACHINE_STOPPED').rows[rowIndex].cells[11].innerHTML,
                DEPARTMET: "생산부"
            }
            a.push(a1);
            arr.push($(this).val());
            t.push($(this).data('id'));
            mstate.push($(this).data('i'));
        });
        var t1 = [t[0]];
        transferData["DATA"] = t1;
        alarmData['DATA'] = a;
        mstate_id = mstate.toString();
        return arr;
    }





    $("#selectMState").change(function(){
        //machineStopped.getAllAlarmByStatus();
        //machineStopped.getAllAlarmByStatusWhenChangeByCambox();
        if (machineId == '') {
            //openLoading();
            machineStopped.getAllAlarmByStatus3(lineId, '', function () {
                closeLoading();
            });
            return;
        }
        //openLoading();
        machineStopped.getAllAlarmByStatus3(lineId, machineId, function () {
            //closeLoading();
        });
    });




    function addErorStateModule(dErrorState) {
        var classification = $("#classificationStep").html().trim();
        var item = $("#itemStep").html().trim();
        var error = $("#errorStep").html().trim();
        var treatment = $("#treatmentStep").html().trim();
        var ID = generateUniqueID();
        $.each(dErrorState.DATA, function (key, value) {
            var data = {
                "ALARM_CODE": value.ALARM_CODE,
                "ALARM_NAME": value.ALARM_NAME,
                "ITEM": classification,
                "START_TIME": value.START_TIME,
                "END_TIME": value.END_TIME,
                "ERROR": error,
                "SUB_ITEM": item,
                "LINE": value.LINE_NAME,
                "MACHINE": value.MACHINE_NAME,
                "MSTATE": value.MACHINE_STATE,
                "TREATMENT": treatment,
                "DEPARTMENT": '생산부',
                "PRODUCT": value.PRODUCT,
                "WORK_DATE": value.WORK_DATE,
                "IDENTIFIER":ID
            };

            machineStopped.addFaultState(data, function () {
                changeText();
                $("#modalMachineStopped").modal('hide');
                $('#smartwizard').smartWizard("reset");
            });
        });
    }

    // ***
    // Add pagination
    //

    /** Pagination **/
    machineStopped.setPagination = function(totalPage, currentPagepg){
        $('#PAGINATION_MAIN').bootpag({
            total: totalPage,
            page: currentPage,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: 'First',
            last: 'Last',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        }).on("page", function(event, currentPagepg){
            //alert(currentPagepg);
            checkPaginationMain = false;
            currentPage = currentPagepg;
            if (machineId == '') {
                machineStopped.getAllAlarmByStatus3(lineId, '', function () {});
            }else{
                machineStopped.getAllAlarmByStatus3(lineId, machineId, function () { });
            }

        });
    };


    /*
    //TODO: PAGINATION_MAIN
    machineStopped.setPaginationOld = function (totalPage) {
        $('#PAGINATION_MAIN').bootpag({
            total: totalPage,
            page: currentPage,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: '처음',
            last: '마지막',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        });
    };

    $("#PAGINATION_MAIN").on("page", function (event, page) {
        //alert(page);
        checkPaginationMain = false;
        currentPage = page;
        //machineStopped.getAllAlarmByStatus();
        //machineStopped.getAllAlarmByStatusWhenClickPagination();
        if (machineId == '') {
            //openLoading();
            machineStopped.getAllAlarmByStatus3(lineId, '', function () {
                closeLoading();
            });
            return;
        }
        //openLoading();
        machineStopped.getAllAlarmByStatus3(lineId, machineId, function () {
            //closeLoading();
        });
    });*/

    $("#PER_PAGE_MAIN").change(function () {
        checkPaginationMain = true;
        //machineStopped.getAllAlarmByStatus();
        //machineStopped.getAllAlarmByStatusWhenClickPagination();
        if (machineId == '') {
            //openLoading();
            machineStopped.getAllAlarmByStatus3(lineId, '', function () {
                closeLoading();
            });
            return;
        }
        //openLoading();
        machineStopped.getAllAlarmByStatus3(lineId, machineId, function () {
            //closeLoading();
        });
    });

    // Check boxes for selecting mstate and get the results
    $('.select_all_mstates').click(function() {
        if ($(this).is(':checked')) {
            $('div input').attr('checked', true);
        } else {
            $('div input').attr('checked', false);
        }
    });


    $("input[name='m_option']").change(function() {
        //if(this.checked) {
            m_option = "";
            checkPaginationMain = true;
            $.each($("input[name='m_option']:checked"), function(){
                m_option += $(this).val()+",";
            });
            if(m_option == ""){
                m_option = "0"; // ALL
            }else{
                m_option = m_option.slice(0,-1);
            }
            console.log("2 " + m_option);
            if (machineId == '') {
                machineStopped.getAllAlarmByStatus3(lineId, '', function () { });
            }else{
                machineStopped.getAllAlarmByStatus3(lineId, machineId, function () { });
            }

        //}
    });

    // Delete fault_state_savelist
    $("#modalHistory #mainHistory tbody#ERROR_STATE").on( 'click', '#btnDelete', function () {

        $("#modalMessage").modal("show");
        fault_id = $(this).parents("tr").data("id");
        console.log("fault_id============" + fault_id);
    });

    // Click confirm to delete the record of fault_state_analysis
    $("#btnOkDelete").click(function () {
        machineStopped.deleteFaultStateAnalysis(fault_id, function (response) {
            console.log(fault_id);
            $('.row-container[data-id="'+fault_id+'"]').remove();

        });

        var tbody = $("#modalHistory #mainHistory tbody#ERROR_STATE");
        console.log(tbody.children().length + " length");
        if (tbody.children().length == 1) {
            tbody.html('<tr><td colspan="14" style="text-align:center;font-weight:bold;">콘텐츠 없음</td></tr>');
            console.log("hehe : " + $("#modalHistory #mainHistory tbody#ERROR_STATE >  tr > td:first-child").html());

        }
        $("#modalMessage").modal("hide");



    });


    $("#btnCancelDelete").click(function () {
        $("#modalMessage").modal("hide");
    });

    machineStopped.deleteFaultStateAnalysis = function (fault_id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state/" + fault_id,
            type: 'DELETE',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

});