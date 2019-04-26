$(function () {

    var machineStopped = {};
    var alarmHistory = {};
    var checkPagination = true;
    var currentPage = 1;
    var departmentId = 0;
    var rowKey = "";
    var oneRecord;
    var limit = 20;

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    machineStopped.getAllLinesName = function(){
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
                $('#selectLineSearch').empty();
                $("#selectLineSearch").append("<option value='.*[A-Z]*.'>라인</option>");
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

    machineStopped.getAllLinesName();

    $("#selectLineSearch").change(function () {
        machineStopped.getAllAlarmByStatus();
    });

    $("#btnLoadMore").click(function () {
        limit += 20;
        machineStopped.getAllAlarmByStatus();
    });

    function clearText(tagId, text){
        $(tagId).html(text);
    }

    function changeText(){
        clearText("#classificationStep", "항목");
        clearText("#itemStep", "세부항목");
        clearText("#errorStep", "고장");
        clearText("#treatmentStep", "조치");
    }

    function addAlarmHistoryModule(){
        var classification = $("#classificationStep").html().trim();
        var item = $("#itemStep").html().trim();
        var error = $("#errorStep").html().trim();
        var treatment = $("#treatmentStep").html().trim();
        var data = {
            "ALARM_CODE"            :       oneRecord.DATA.ALARM_CODE,
            "ALARM_NAME"            :       oneRecord.DATA.ALARM_NAME,
            "CLASSIFICATION_NAME"   :       classification,
            "END_ALARM_TIME"        :       oneRecord.DATA.END_TIME,
            "END_REPAIR_TIME"       :       "",
            "ERROR_NAME"            :       error,
            "ITEM_NAME"             :       item,
            "LINE"                  :       oneRecord.DATA.LINE_NAME,
            "MACHINE"               :       oneRecord.DATA.MACHINE_NAME,
            "MACHINE_MAPPING"       :       oneRecord.DATA.MACHINE_NAME,
            "MSTATE"                :       oneRecord.DATA.MACHINE_STATE,
            "ROW_KEY"               :       rowKey.trim(),
            "START_ALARM_TIME"      :       oneRecord.DATA.START_TIME,
            "START_REPAIR_TIME"     :       "",
            "TREATMENT_NAME"        :       treatment,
            "DEPARTMENT"            :       "보전부"
        };
        machineStopped.addAlarm(data, function () {
            changeText();
            $("#modalMachineStopped").modal('hide');
            $('#smartwizard').smartWizard("reset");
        });
    }

    // Toolbar extra buttons
    var btnSave = $('<button></button>').text('저장').addClass('btn btn-primary').on('click', function () {
        openLoading();
        addAlarmHistoryModule();
        closeLoading();
    });
    var btnFinish = $('<button></button>').text('끝').addClass('btn btn-info').on('click', function () {
        var rowKeyIn = {"ROW_KEY" : rowKey};
        addAlarmHistoryModule();
        machineStopped.updateAlarm(rowKeyIn, function (response) {
            machineStopped.getAllAlarmByStatus();
        });
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
            toolbarExtraButtons: [btnSave, btnFinish, btnCancel]
        }
    });
    $('#smartwizard').smartWizard("reset");

    //TODO: SERVER SIDE REQUEST
    machineStopped.getAllAlarmByStatus = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status"        :   "NO",
                "mState"        :   "STOP",
                "mState1"       :   "WAIT",
                "department"    :   "2",
                "line"          :   $("#selectLineSearch").val(),
                "limit"         :   limit
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
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION/60;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION.toFixed(2);
                        });
                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    }
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatusRealTime = function () {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "status"        :   "NO",
                "mState"        :   "STOP",
                "mState1"       :   "WAIT",
                "department"    :   "2",
                "line"          :   $("#selectLineSearch").val(),
                "limit"         :   limit
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
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION/60;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION.toFixed(2);
                        });
                        $("#MACHINE_STOPPED_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE_STOPPED");
                    } else {
                        $("#MACHINE_STOPPED").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                    }
                }
            },
            error: function (data, status, err) {
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
                "rowKey"      :       rowKey,
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
                }else{
                    $("#REPAIRING_INFO").html("<tr style='text-align:center;'><td colspan='14'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machineStopped.getAllAlarmByStatus();

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
                "rowKey"    :   rowKey
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
            data : JSON.stringify(data),
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
            data : JSON.stringify(rowKeyIn),
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
            data : JSON.stringify(data),
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
        departmentId = 2;
        machineStopped.getAllClassificationName(2, function (response) {
            $("#CLASSIFICATION").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#CLASSIFICATION").append("<button id='btnClassificationClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id="+value.ID+">"+value.NAME+"</button>");
                });
            }
        });
    }

    //TODO: FUNCTION OF ALARM HISTORY
    //START ALARM HISTORY
    alarmHistory.getAllAlarmHistory = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/alarm-history",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line": $("#selectLine").val(),
                "machine": $("#selectMachine").val(),
                "startTime": $("#txtStartTime").val(),
                "endTime": $("#txtEndTime").val(),
                "department": "보전부",
                "limit": $("#PER_PAGE").val(),
                "page": currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ALARM_HISTORY").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 고장조치)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ALARM_HISTORY_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_HISTORY");
                        if (checkPagination) {
                            alarmHistory.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='15'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='15'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
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
        alarmHistory.getAllAlarmHistory();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        alarmHistory.getAllAlarmHistory();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        alarmHistory.getAllAlarmHistory();
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
                $("#selectLine").append("<option value='0'>라인</option>");
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
                $("#selectMachine").append("<option value='0'>설비</option>");
                if (response.CODE == "7777") {
                    $.each(response.DATA, function (key, value) {
                        $("#selectMachine").append("<option value=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</option>");
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
        $("#MCL").empty().append("<input type='hidden' value='"+cfId+"' id='txtClassificationHidden'>");
        machineStopped.getAllItemByClassification(cfId, function (response) {
            $("#ITEM").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#ITEM").append("<button id='btnItemClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id="+value.ID+">"+value.NAME+"</button>");
                });
            }
        });
        $("#classificationStep").html($(this).html());
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnItemClick', function () {
        var iId = $(this).data("id");
        $("#MI").empty().append("<input type='hidden' value='"+iId+"' id='txtItemHidden'>");
        machineStopped.getAllErrorCode($("#txtClassificationHidden").val(), function (response) {
            $("#ERROR").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#ERROR").append("<button id='btnErrorClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id="+value.ID+">"+value.NAME+"</button>");
                });
            }
        });
        $("#itemStep").html($(this).html());
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnErrorClick', function () {
        //var eId = $(this).data("id");
        machineStopped.getAllTreatmentByDepartment(departmentId, function (response) {
            $("#TREATMENT").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#TREATMENT").append("<button id='btnTreatmentClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id="+value.ID+">"+value.NAME+"</button>");
                });
            }
        });
        $("#errorStep").html($(this).html());
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnTreatmentClick', function () {
        $("#treatmentStep").html($(this).html());
        /*changeText();
        $("#modalMachineStopped").modal('hide');
        $('#smartwizard').smartWizard("reset");*/
    });

    $(document).on('click', '#btnStop', function () {
        var r = $(this).data("id");
        var ra = r.split(",");
        $("#R").html("");
        $("#R").append("<tr><td>"+ra[0]+"</td><td>"+ra[1]+"</td><td>"+ra[2]+"</td><td>"+ra[3]+"</td><td>"+ra[4]+"</td><td>"+ra[5]+"</td><td>"+ra[6]+"</td><td>"+ra[7]+"</td></tr>");
        rowKey = $(this).parents("tr").data("id");
        machineStopped.getAllAlarmHistoriesByRowKey();
        machineStopped.getAlarm(rowKey.trim(), function (response) {
            oneRecord = response;
        });
        changeText();
        firstLoad();
        $("#smartwizard").smartWizard('reset');
        $("#modalMachineStopped").modal('show');
    });

    $("#btnHistory").click(function () {
        alarmHistory.getAllAlarmHistory();
        $("#modalHistory").modal('show');
        alarmHistory.getAllLinesName();
        $("#selectLine").change(function () {
            alarmHistory.getAllMachineNameByLineName();
        });
    });

    /*    $(document).on('click', '#btnEdit', function () {
            changeText();
            firstLoad();
            $("#modalMachineStopped").modal('show');
        });*/

    $(document).on('click', '#btnPass', function () {
        $("#modalMessagePassTo").modal("show");
        rowKey = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        var data = {
            "ROW_KEY"    :   rowKey
        };
        machineStopped.updateAlarmDepartment(data, function (response) {
            if (response.CODE == "0000") {
                checkPagination = true;
                machineStopped.getAllAlarmByStatus();
            } else {
                alert("Transaction error");
            }
        });
        $("#modalMessagePassTo").modal("hide");
    });

    function timeIntervalForAlarm() {
        setInterval(function(){
            machineStopped.getAllAlarmByStatusRealTime();
        }, 100000);
    }

    timeIntervalForAlarm();

    $("#btnNotError").click(function () {
        alert(1);
    });
});