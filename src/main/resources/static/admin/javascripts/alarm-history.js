$(function () {

    var alarmHistories = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    alarmHistories.getLineCounting = function (productionDate, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-history/number-line/"+productionDate,
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

    alarmHistories.getMachineCounting = function (lineParam, productionDate, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-history/number-machine/"+lineParam+"/"+productionDate,
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

    alarmHistories.getAllLinesName = function(callback){
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

    alarmHistories.getAllMachineNameByLineName = function(line, callback){
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

    function getCountLine(){
        alarmHistories.getAllLinesName(function (response) {
            if(response.CODE == "7777"){
                $("#selectLineButtonList").html("");
                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLine'>ALL</button>");
                var productionDate = $('#txtProductionDate').val()==""?"0":$('#txtProductionDate').val();
                alarmHistories.getLineCounting(productionDate, function (response1) {
                    var total = 0;
                    for(var v=0;v<response.DATA.length;v++){
                        for(var v1=0;v1<response1.DATA.length;v1++) {
                            if (response.DATA[v] == response.DATA[v1]) {
                                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response.DATA[v].MAPPING_NAME + " id='btnLine'>" + response.DATA[v].LINE_NAME +"("+response1.DATA[v1].NUMBER+ ")</button>");
                                total += response1.DATA[v1].NUMBER;
                            }
                        }
                    }
                    $("#selectLineButtonList").val($("#selectLineButtonList button:first").html('ALL('+total+')'));
                });
            }
        });
    }

    getCountLine();

    var lineId = "";
    var machineId = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        machineId = "";
        if (lineId == '') {
            $("#selectMachineButtonList").html("");
            alarmHistories.getAllalarmHistories();
            return;
        }
        alarmHistories.getAllalarmHistories();
        $("#selectMachineButtonList").html("");
        alarmHistories.getAllMachineNameByLineName(lineId, function (response) {
            $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
            var productionDate = $('#txtProductionDate').val()==""?"0":$('#txtProductionDate').val();
            alarmHistories.getMachineCounting(lineId, productionDate, function (response1) {
                var total = 0;
                $.each(response.DATA, function (key, value) {
                    $.each(response1.DATA, function (key1, value1) {
                        if(value.MAPPING_NAME == value1.ATTRIBUTE) {
                            $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME +"("+value1.NUMBER+ ")</button>");
                            total += value1.NUMBER;
                        }
                    });
                });
                $("#selectMachineButtonList").val($("#selectMachineButtonList button:first").html('ALL('+total+')'));
            })
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineId==''){
            alarmHistories.getAllalarmHistories();
            return;
        }
        alarmHistories.getAllalarmHistories();
    });

    // Important function
    alarmHistories.getAllalarmHistories = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/alarm-history",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"          :   lineId,
                "machine"       :   machineId,
                "productionDate"       :   $('#txtProductionDate').val(),
                "limit"         :   $("#PER_PAGE").val(),
                "page"          :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ERROR_STATE").html("");
                    if (response.DATA.length > 0 || !response.DATA) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ERROR_STATE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ERROR_STATE");
                        if (checkPagination) {
                            alarmHistories.setPagination(response.PAGINATION.TOTAL_PAGES);
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

    alarmHistories.getAllalarmHistories("","");

    $('#productionDate').datetimepicker({
        format: 'YYYY-MM-DD',
    }).on('dp.change', function (ev) {
        $("#selectMachineButtonList").html("");
        getCountLine();
        checkPagination = true;
        alarmHistories.getAllalarmHistories("","");
    });

    //TODO: PAGINATION
    alarmHistories.setPagination = function (totalPage) {
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
        alarmHistories.getAllalarmHistories();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        alarmHistories.getAllalarmHistories();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        alarmHistories.getAllalarmHistories();
    });

    // alarmHistories.getAllalarmHistories();
});