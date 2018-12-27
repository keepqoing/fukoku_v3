$(function () {

    var machineStopped = {};
    var alarmHistory = {};
    var checkPagination = true;
    var tmpID="";
    var currentPage = 1;
    var rowKey = "";

    // Variable to store global values
    var _CLASSIFICATION = "";
    var _ITEM = "";
    var _ERROR = "";
    var _TREATMENT = "";
    var sortBy = 0;



    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });



    // Get Line and Machine Buttons for Filtering the Results
    $('#selectLineButtonListHistory').html('');
    $('#selectMachineButtonListHistory').html('');



    alarmHistory.getAllLinesName = function(callback){
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
                if(callback){
                    callback(response);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    alarmHistory.getAllMachineNameByLineName = function(line, callback){
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
    };

    alarmHistory.getAllLinesName(function (response) {

        if(response.CODE == "7777"){
            $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLineHistory'>ALL</button>");
            alarmHistory.getLineCounting('0',function (response1) {
                var total = 0;
                $.each(response.DATA, function(key, value) {
                    $.each(response1.DATA, function (key1, value1) {
                        if(value.LINE_NAME==value1.ATTRIBUTE) {
                            $("#selectLineButtonListHistory").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='" + value.LINE_NAME + "' id='btnLineHistory'>" + value.LINE_NAME + "(" + value1.NUMBER + ")</button>");
                            total += value1.NUMBER;
                        }
                    })
                });
                $("#selectLineButtonListHistory").val($("#selectLineButtonListHistory button:first").html('ALL('+total+')'));
            });
        }

        //console.log(response);

    });


    alarmHistory.getLineCounting = function (status, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/counting/"+status,
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

    alarmHistory.getMachineCounting = function (lineParam,status, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/counting-machine/"+lineParam+"/"+status,
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


    // End Get Line and Machine Buttons for Filtering the Results

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
        alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId, 0);
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId, 0);
    });

    //END ALARM HISTORY



    $(document).on('click', '#btnStopHistory', function () {
        id = $(this).parents("tr").data("id");
        alarmHistory.getTransactionDetailByTransactionHistory(id);
        $("#modal-history-detail").modal('show');
    });





    var lineHistoryId = "";
    var machineHistoryId = "";
    $(document).on('click', '#btnLineHistory', function () {
        highlightButtonLineHistory(this);
        lineHistoryId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(lineHistoryId == ''){
            alarmHistory.getAllTransferredTransactionsHistory('', '', 0);
            $("#selectMachineButtonListHistory").html("");
            return;
        }
        alarmHistory.getAllMachineNameByLineName(lineHistoryId, function (response) {
            $("#selectMachineButtonListHistory").html("");

            if(response.CODE == "7777"){
                $("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id=''>ALL</button>");
                alarmHistory.getMachineCounting(lineHistoryId,'0', function (response1) {
                    var total = 0;
                    $.each(response.DATA, function(key, value){
                        $.each(response1.DATA, function(key1, value1){
                            if(value.MAPPING_NAME==value1.ATTRIBUTE) {
                                $("#selectMachineButtonListHistory").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachineHistory' data-id='" + value.MAPPING_NAME + "'>" + value.MACHINE_NAME +"("+value1.NUMBER+ ")</button>");
                                total += value1.NUMBER;
                            }
                        });
                    });
                    $("#selectMachineButtonListHistory").val($("#selectMachineButtonListHistory button:first").html('ALL('+total+')'));
                })
                alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, '', 0);
            }
        });
    });

    $(document).on('click', '#btnMachineHistory', function () {
        highlightButtonMachineHistory(this);
        machineHistoryId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineHistoryId==''){
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, '', 0);
            return;
        }
        alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId, 0);
    });




    // First loading page information
    //TODO: SERVER SIDE REQUEST
    alarmHistory.getAllTransferredTransactionsHistory = function (line, machine, status) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/withFaultSort",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"      :   line,
                "machine"   :   machine,
                "status"    :   status,
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage,
                "sortBy"    :   sortBy
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
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ALARM_HISTORY_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_HISTORY");
                        if (checkPagination) {
                            alarmHistory.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 개)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    alarmHistory.getAllTransferredTransactionsHistory('','',0);


    // History Detail Function
    alarmHistory.getTransactionDetailByTransactionHistory = function (id) {
        console.log("id = "+id);
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/"+id,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#detail-history").html("");
                    if (response.DATA.length > 0) {
                        var counter = 0;
                        $.each(response.DATA, function (key, value) {
                            counter++;
                            response.DATA[key]["NO"] = counter;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION/60;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION.toFixed(2);
                        });
                        $("#detail-history-template").tmpl(response.DATA).appendTo("tbody#detail-history");
                    } else {
                        $("#detail-history").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#detail-history").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };



//    ===== Modal for editing

    // $('#panel').hide();
    $('#panel').show();

    $('#treatmentPanel').click(function () {

        machineStopped.getFaultStateSaveList($.trim(id), function (response) {
            if (response.CODE == '8888') {
                $("#REPAIRING_INFO").html("<tr style='text-align:center;'><td colspan='15'>콘텐츠 없음</td></tr>");
            } else {
                $('#REPAIRING_INFO').html("");
                $("#REPAIRING_INFO_TEMPLATE").tmpl(response.DATA).appendTo("tbody#REPAIRING_INFO");
            }
        })


        $('#panel').show();
    });


    function addAlarmHistoryModule(){
        // var classification = $("#classificationStep").html().trim();
        // var item = $("#itemStep").html().trim();
        // var error = $("#errorStep").html().trim();
        // var treatment = $("#treatmentStep").html().trim();

        var classification = _CLASSIFICATION;
        var item = _ITEM;
        var error = _ERROR;
        var treatment = _TREATMENT;

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

    machineStopped.updateTransferredTransaction = function (id, data,finishedDate, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/update/"+id+"/"+data+"/"+finishedDate,
            type: 'POST',
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

    // var btnRTopListModified = $('<button></button>').text('수정').addClass('btn btn-danger').on('click', function () {
    $('#btnRTopListModified').click(function () {
        console.log(tmpID.slice(0,-1));


        if(!bolBtnDelete){
            alert("삭제 버튼을 클릭하십시오.");
            return;
        }


        var z = "";

        var tbody = $("#modalMachineStopped #tableR tbody#R");
        console.log("============== length : "+tbody.children().length );
        if (tbody.children().length == 1) {
            z = confirm("삭제를 반영하시겠습니까?")
        }else{
            z = confirm("요청항목 전체가 삭제됩니다. 계속하시겣습니까?");
        }


        if (z == true){
            console.log("You said YES");
            $.ajax({
                url: "/v1/api/fukoku/daily-mstate-analysis/delete-transcation-detail-by-id",
                type: 'POST',
                dataType: 'JSON',
                data: JSON.stringify({
                    "line": tmpID.slice(0,-1)
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (response) {
                    console.log("response", response);
                    $("#modalMachineStopped").modal('hide');
                    machineStopped.getAllTransferredTransactions(lineId, machineId,1);
                    //window.location = window.location;
                }
            });
        }else{
            console.log("You said NO");
            // alert(id);
            machineStopped.getTransactionDetailByTransaction(id);


        }

        bolBtnDelete = false;

    });

    var btnFinish = $('<button></button>').text('완료').addClass('btn btn-info').on('click', function () {
        /*if($('#classificationStep').html() == '항목' || $('#itemStep').html() == '세부항목' || $('#errorStep').html() == '고장' || $('#treatmentStep').html() == '고장조치'|| $('#txtFinishedDate').val()==''){
            alert('Please complete all steps!');
            return;
        }*/

        if ($("#modalMachineStopped #mainREPAIRING_INFO tbody#REPAIRING_INFO >  tr > td:first-child").html()=="콘텐츠 없음") {
            alert("조치내용을 추가해 주십시요" );
            return;
        }


        // var z = confirm("아래와 같이 조치내용을 저장하시겠습니까?\n  - 아래 -\n" + "이상항목: " + _CLASSIFICATION + "\n세부항목: " + _ITEM + "\n이상원인: " + _ERROR + "\n조치: " + _TREATMENT);

        var z = confirm("조치내용을 입력을 완료되고 조치내역에 저장하시겠습니까?");
        if (z == true) {
            if ($('#txtFinishedDate').val() == '') {
                alert('Please input finished date!');
                return;
            }
            $("#modalMachineStopped").modal('hide');
            $('#smartwizard').smartWizard("reset");
            // var classification = $("#classificationStep").html().trim();
            // var item = $("#itemStep").html().trim();
            // var error = $("#errorStep").html().trim();
            // var treatment = $("#treatmentStep").html().trim();

            var classification = _CLASSIFICATION;
            var item = _ITEM;
            var error = _ERROR;
            var treatment = _TREATMENT;

            var data = classification + "@" + item + "@" + error + "@" + treatment;
            data = data.replace("&amp;", "&");
            data = data.replace(" ", "_");
            machineStopped.updateTransferredTransaction(id, data, $('#txtFinishedDate').val(), function () {
                machineStopped.getAllTransferredTransactions(lineId, machineId, 1);
            });
            location.reload();
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
            toolbarExtraButtons: [/*btnSave, */ btnFinish, btnCancel]
        }
    });
    $('#smartwizard').smartWizard("reset");






    function clearText(tagId, text){
        $(tagId).html(text);
    }

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


    machineStopped.getTransactionDetailByTransaction = function (id) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/"+id,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#R").html("");
                    if (response.DATA.length > 0) {
                        var counter = 0;
                        $.each(response.DATA, function (key, value) {
                            counter++;
                            response.DATA[key]["NO"] = counter;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION/60;
                            response.DATA[key]["DURATION"] = response.DATA[key].DURATION.toFixed(2);
                        });
                        $("#R_TEMPLATE").tmpl(response.DATA).appendTo("tbody#R");
                    } else {
                        $("#R").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#R").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };



    function changeText(){
        clearText("#classificationStep", "");
        clearText("#itemStep", "");
        clearText("#errorStep", "");
        clearText("#treatmentStep", "");
        $('#step_one').click();

    }


    $(document).on('click', '#btnStop', function () {
        tmpID = "";
        // $('#panel').hide();
        $('#txtFinishedDate').val('');
        id = $(this).parents("tr").data("id");
        finishedDate = $(this).closest('tr').children('td.fd').text();
        $('#txtFinishedDate').val(finishedDate);
        console.log(id);
        console.log("Finished_date ============= " + finishedDate);

        machineStopped.getTransactionDetailByTransaction(id);
        rowKey = $(this).parents("tr").data("id");
        changeText();
        firstLoad();
        $("#smartwizard").smartWizard('reset');
        $("#modalMachineStopped").modal('show');

        machineStopped.getFaultStateSaveList($.trim(id), function (response) {
            if (response.CODE == '8888') {
                $("#REPAIRING_INFO").html("<tr style='text-align:center;'><td colspan='15'>콘텐츠 없음</td></tr>");
            } else {
                $('#REPAIRING_INFO').html("");
                $("#REPAIRING_INFO_TEMPLATE").tmpl(response.DATA).appendTo("tbody#REPAIRING_INFO");
            }
        })
    });


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
        console.log("Classification value : "+$(this).html())
        _CLASSIFICATION = $(this).html();
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
        console.log("ITEM value: "+$(this).html());
        _ITEM = $(this).html();
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
        console.log("Error : "+$(this).html());
        _ERROR = $(this).html();
        $('#smartwizard').smartWizard("next");
    });

    $(document).on('click', '#btnTreatmentClick', function () {
        $("#treatmentStep").html($(this).html());
        console.log("Treatment value: "+$(this).html());
        _TREATMENT = $(this).html();

        /*changeText();
        $("#modalMachineStopped").modal('hide');
        $('#smartwizard').smartWizard("reset");*/
    });

    machineStopped.addNonMovingState = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/non-moving-state/",
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

    machineStopped.getTransactionDetail = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/transaction-detail/"+id,
            type: 'GET',
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
    };

    machineStopped.updateStatus = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/transferred-transaction/update-status/"+id,
            type: 'PUT',
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
    };

    machineStopped.addBack = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/add/",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(data),
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

    $(document).on('click', '#btn-transfer-back', function () {
        var idR = $(this).parents("tr").data("id");
        machineStopped.getTransactionDetail(idR, function (response) {
            var d = {
                LINE_NAME: response.DATA.LINE,
                MACHINE_NAME: response.DATA.MACHINE,
                MACHINE_STATE: response.DATA.STATE,
                START_TIME: response.DATA.START_TIME,
                END_TIME: response.DATA.END_TIME,
                DURATION: 0,
                ALARM_CODE: response.DATA.ALARM_CODE,
                ALARM_NAME: response.DATA.ALARM_NAME,
                DEPARTMENT: '1'
            };
            machineStopped.addBack(d, function (response) {});
            var rowIndex = $('#R tr').index($(this).closest('tr'));
            $("#R tr").eq(rowIndex).remove();
        });
    });

    $(document).on('click', '#btn-move-to-non-active', function () {
        //alert("Why");
        var idR = $(this).parents("tr").data("id");

        tmpID += idR+",";
        console.log(tmpID);
        var rowIndex = $('#R tr').index($(this).closest('tr'));
        $("#R tr").eq(rowIndex).remove();

        bolBtnDelete = true;

        /*
        machineStopped.getTransactionDetail(idR, function (response) {
            var d = {
                LINE: response.DATA.LINE,
                MACHINE: response.DATA.MACHINE,
                MSTATE: response.DATA.STATE,
                START_TIME: response.DATA.START_TIME,
                END_TIME: response.DATA.END_TIME,
                DURATION: 0,
                ALARM_CODE: response.DATA.ALARM_CODE,
                ALARM_NAME: response.DATA.ALARM_NAME,
                DEPARTMENT: '보전부'
            };
            machineStopped.addNonMovingState(d, function () {});
        }); */
    });

    machineStopped.addFaultStateSavelist = function(savelist, callback){
        $.ajax({
            url: "/v1/api/fukoku/fault-state-savelist",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(savelist),
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

    machineStopped.getFaultStateSaveList = function (id, callback) {

        $.ajax({
            url: "/v1/api/fukoku/fault-state-savelist/" + id,
            type: 'GET',
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

    $('#btnSave').click(function () {


        if($('#classificationStep').html() == "" &&
            $('#itemStep').html() == "" &&
            $('#errorStep').html() == "" &&
            $('#treatmentStep').html() == ""
        ){
            alert("카테고리에서 선택하십시오.");
            return;
        }


        var classification = $("#classificationStep").html().trim();
        var item = $("#itemStep").html().trim();
        var error = $("#errorStep").html().trim();
        var treatment = $("#treatmentStep").html().trim();
        classification = classification.replace("&amp;", "&");

        console.log("ID = "+id);

        var data = {
            "LINE": "",
            "MACHINE": "",
            "PRODUCT": "",
            "MSTATE": "",
            "WORK_DATE":"",
            "START_TIME":"",
            "END_TIME":"",
            "DURATION":0,
            "ALARM_CODE":"",
            "ALARM_NAME":"",
            "ITEM": classification,
            "SUB_ITEM": item,
            "ERROR": error,
            "TREATMENT": treatment,
            "TRANSFER_ID": $.trim(id),
            "DEPARTMENT": "보전부"
        };
        machineStopped.addFaultStateSavelist(data, function () {
            machineStopped.getFaultStateSaveList($.trim(id),function (response) {
                $('#REPAIRING_INFO').html("");
                $("#REPAIRING_INFO_TEMPLATE").tmpl(response.DATA).appendTo("tbody#REPAIRING_INFO");
            })
        })
        changeText();
    });




    // Delete fault_state_savelist
    $("#modalMachineStopped #mainREPAIRING_INFO tbody#REPAIRING_INFO").on( 'click', '#btnDelete', function () {

        $("#modalMessage").modal("show");
        fault_id = $(this).parents("tr").data("id");
        console.log("fault_id============" + fault_id);
    });



    // Click confirm to delete the record of fault_state_savelist
    $("#btnOkDelete").click(function () {
        machineStopped.deleteFaultStateSaveList(fault_id, function (response) {
            console.log(fault_id);
            $('.row-container[data-id="'+fault_id+'"]').remove();

        });

        var tbody = $("#modalMachineStopped #mainREPAIRING_INFO tbody#REPAIRING_INFO");
        console.log(tbody.children().length + " length");
        if (tbody.children().length == 1) {
            tbody.html('<tr><td colspan="15" style="text-align:center;font-weight:bold;">콘텐츠 없음</td></tr>');
            console.log("hehe : " + $("#modalMachineStopped #mainREPAIRING_INFO tbody#REPAIRING_INFO >  tr > td:first-child").html());

        }
        $("#modalMessage").modal("hide");



    });


    $("#btnCancelDelete").click(function () {
        $("#modalMessage").modal("hide");
    });

    machineStopped.deleteFaultStateSaveList = function (fault_id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/fault-state-savelist/" + fault_id,
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





    // ========================== Delete Historical Record ========================================
    // Delete fault_state_savelist
    $("#alarmHistoryTable tbody#ALARM_HISTORY").on( 'click', '#btnDeleteHistory', function () {

        $("#modalDeleteMessageHistory").modal("show");
        alarm_history_id = $(this).parents("tr").data("id");
        console.log("alarm_history_id============" + alarm_history_id);
    });



    // Click confirm to delete the record of fault_state_savelist
    $("#btnOkDeleteHistory").click(function () {
        alarmHistory.deleteAlarmHistory(alarm_history_id, function (response) {
            console.log(alarm_history_id);
            $('.history-row[data-id="'+alarm_history_id+'"]').remove();
            location.reload();

        });

        var tbody = $("#alarmHistoryTable tbody#ALARM_HISTORY");
        console.log(tbody.children().length + " length");
        if (tbody.children().length == 1) {
            tbody.html('<tr><td colspan="15" style="text-align:center;font-weight:bold;">콘텐츠 없음</td></tr>');
            console.log("hehe : " + $("#alarmHistoryTable tbody#ALARM_HISTORY >  tr > td:first-child").html());

        }
        $("#modalDeleteMessageHistory").modal("hide");



    });


    $("#btnCancelDeleteHistory").click(function () {
        $("#modalDeleteMessageHistory").modal("hide");
    });

    alarmHistory.deleteAlarmHistory = function (alarm_history_id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine-stopped/alarm-machine/delete/" + alarm_history_id,
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

    // =========================End Delete Historical Record ======================================


    // Sorting
    // Sort by Line
    var lineFlag = false;
    $("#lineSort").click(function () {
        if(lineFlag){
            sortBy = "ref_line";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            lineFlag = false;
        }else{
            sortBy = "ref_line DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            lineFlag = true;
        }
    });

    // Sort by Machine
    var machineFlag = false;
    $("#machineSort").click(function () {
        if(machineFlag){
            sortBy = "ref_machine";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            machineFlag = false;
        }else{
            sortBy = "ref_machine DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            machineFlag = true;
        }
    });

    // Sort by Start Time
    var startTimeFlag = false;
    $("#startTimeSort").click(function () {
        if(startTimeFlag){
            sortBy = "start_time";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            startTimeFlag = false;
        }else{
            sortBy = "start_time DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            startTimeFlag = true;
        }
    });

    // Sort by Finished Time
    var finishedTimeFlag = false;
    $("#finishedTimeSort").click(function () {
        if(finishedTimeFlag){
            sortBy = "finished_time";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            finishedTimeFlag = false;
        }else{
            sortBy = "finished_time DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            finishedTimeFlag = true;
        }
    });

    // Sort by Duration
    var durationFlag = false;
    $("#durationSort").click(function () {
        if(durationFlag){
            sortBy = "duration";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            durationFlag = false;
        }else{
            sortBy = "duration DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            durationFlag = true;
        }
    });

    // Sort by Department
    var departmentFlag = false;
    $("#departmentSort").click(function () {
        if(departmentFlag){
            sortBy = "department";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            departmentFlag = false;
        }else{
            sortBy = "department DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            departmentFlag = true;
        }
    });

    // Sort by Item
    var itemFlag = false;
    $("#itemSort").click(function () {
        if(itemFlag){
            sortBy = "item";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            itemFlag = false;
        }else{
            sortBy = "item DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            itemFlag = true;
        }
    });

    // Sort by Sub Item
    var subItemFlag = false;
    $("#subItemSort").click(function () {
        if(subItemFlag){
            sortBy = "sub_item";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            subItemFlag = false;
        }else{
            sortBy = "sub_item DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            subItemFlag = true;
        }
    });

    // Sort by Error
    var errorFlag = false;
    $("#errorSort").click(function () {
        if(errorFlag){
            sortBy = "error";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            errorFlag = false;
        }else{
            sortBy = "error DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            errorFlag = true;
        }
    });

    // Sort by Error
    var treatmentFlag = false;
    $("#treatmentSort").click(function () {
        if(errorFlag){
            sortBy = "treatment";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            treatmentFlag = false;
        }else{
            sortBy = "treatment DESC";
            alarmHistory.getAllTransferredTransactionsHistory(lineHistoryId, machineHistoryId ,0);
            treatmentFlag = true;
        }
    });
});



