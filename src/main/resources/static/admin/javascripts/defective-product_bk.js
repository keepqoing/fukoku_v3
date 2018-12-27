$(function () {

    var defectiveProducts = {};
    var checkPagination = true;
    var currentPage = 1;
    var departmentId = 0;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

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
    defectiveProducts.getAllLinesName = function(callback){
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

    defectiveProducts.getAllMachineNameByLineName = function(line, callback){
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

    defectiveProducts.getAllLinesName(function (response) {
        if(response.CODE == "7777"){
            $("#selectLineButtonList").html("");
            $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLine'>ALL</button>");
            for(var v=0;v<response.DATA.length;v++){
                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id="+response.DATA[v].MAPPING_NAME+" id='btnLine'>"+response.DATA[v].LINE_NAME+"</button>");
            }
        }
    });

    var lineId = "";
    var machineId = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(lineId == ''){
            defectiveProducts.getAllDefectiveProducts('', '');
            $("#selectMachineButtonList").html("");
            return;
        }
        defectiveProducts.getAllMachineNameByLineName(lineId, function (response) {
            $("#selectMachineButtonList").html("");
            if (response.CODE == "7777") {
                $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
                $.each(response.DATA, function (key, value) {
                    $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</button>");
                });
                defectiveProducts.getAllDefectiveProducts(lineId, machineId);
            }
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineId==''){
            defectiveProducts.getAllDefectiveProducts(lineId, '');
            return;
        }
        defectiveProducts.getAllDefectiveProducts(lineId, machineId);
    });

    defectiveProducts.getAllProductName = function(){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       $("#selectLine").val(),
                "machine"      :       $("#selectMachine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectProduct").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    //TODO: SERVER SIDE REQUEST
    defectiveProducts.getAllDefectiveProducts = function (lId, mId) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/defective-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"      :   lId,
                "machine"   :   mId,
                "product"   :   "",
                "startTime" :   "",
                "endTime"   :   "",
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#DEFECTIVE_PRODUCT").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 게)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#DEFECTIVE_PRODUCT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#DEFECTIVE_PRODUCT");
                        if (checkPagination) {
                            defectiveProducts.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#DEFECTIVE_PRODUCT").html("<tr style='text-align:center;'><td colspan='11'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#DEFECTIVE_PRODUCT").html("<tr style='text-align:center;'><td colspan='11'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 게)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    defectiveProducts.addDefectiveProduct = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/defective-product",
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
    }

    //TODO: PAGINATION
    defectiveProducts.setPagination = function (totalPage) {
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
        defectiveProducts.getAllDefectiveProducts(lineId, machineId);
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        defectiveProducts.getAllDefectiveProducts(lineId, machineId);
    });

    defectiveProducts.getAllDefectiveProducts('','');

    //var id;
    $(document).on('click', '#btnDelete', function () {
        $("#modalDefectiveProduct").modal("show");
        firstLoad();

    });


    function clearText(tagId, text){
        $(tagId).html(text);
    }

    function changeText(){
        clearText("#classificationStep", "이상항목");
        clearText("#itemStep", "세부항목");
        clearText("#errorStep", "이상원인");
        clearText("#treatmentStep", "조치");
    }

    var btnFinish = $('<button></button>').text('끝').addClass('btn btn-info').on('click', function () {
        /*if($('#classificationStep').html() == '항목' || $('#itemStep').html() == '세부항목' || $('#errorStep').html() == '고장' || $('#treatmentStep').html() == '고장조치'){
            alert('Please complete all steps!');
            return;
        }
        $("#modalMachineStopped").modal('hide');
        $('#smartwizard').smartWizard("reset");
        var classification = $("#classificationStep").html().trim();
        var item = $("#itemStep").html().trim();
        var error = $("#errorStep").html().trim();
        var treatment = $("#treatmentStep").html().trim();
        var data = classification+"@"+item+"@"+error+"@"+treatment;
        data = data.replace("&amp;", "&");
        data = data.replace(" ", "_");
        console.log(data);
        machineStopped.updateTransferredTransaction(id,data, function () {
            machineStopped.getAllTransferredTransactions(lineId, machineId, 1);
        });*/
        //addAlarmHistoryModule();
        /*machineStopped.updateAlarm(rowKeyIn, function (response) {
            machineStopped.getAllTransferredTransactions(lineId, machineId);
        });*/
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
            toolbarExtraButtons: [/*btnSave, */btnFinish, btnCancel]
        }
    });
    $('#smartwizard').smartWizard('reset');

    defectiveProducts.getAllClassificationName = function (department, callback) {
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

    defectiveProducts.getAllErrorCode = function (classification, callback) {
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

    defectiveProducts.getAllItemByClassification = function (classification, callback) {
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

    defectiveProducts.getAllTreatmentByDepartment = function (department, callback) {
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
        defectiveProducts.getAllClassificationName(4, function (response) {
            $("#CLASSIFICATION").html("");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#CLASSIFICATION").append("<button id='btnClassificationClick' class='btn btn-primary btn-lg' style='margin-bottom: 4px;margin-right: 4px;' data-id="+value.ID+">"+value.NAME+"</button>");
                });
            }
        });
    }








    /*$("#btnSave").click(function () {
        var data = {
            "ID"           :   id,
            "FAIL_NAME"    :   $("#selectProductFail").val(),
        };
        defectiveProducts.updateDefectiveProduct(data, function (response) {
            if (response.CODE == "0000") {
                $("#modalDefectiveProduct").attr("data-toastr-notification", response.MESSAGE);
                $("#modalDefectiveProduct").trigger("click");
                checkPagination = true;
                defectiveProducts.getAllDefectiveProducts();
            } else {
                $("#modalDefectiveProduct").attr("data-toastr-notification", response.MESSAGE);
                $("#modalDefectiveProduct").trigger("click");
            }
        });
    });*/
});