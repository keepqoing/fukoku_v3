$(function () {

    var cycleTime = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    cycleTime.getAllLinesName = function(){
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

    cycleTime.getAllMachineNameByLineName = function(line, callback){
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

    cycleTime.getAllProductName = function(callback){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {},
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

    cycleTime.getAllProductName1 = function(line, machine, callback){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       line,
                "machine"      :       machine
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

    cycleTime.getAllLinesName();

    $("#selectLineSearch").change(function () {
        cycleTime.getAllMachineNameByLineName($("#selectLineSearch").val(), function (response) {
            $('#selectMachineSearch').empty();
            $("#selectMachineSearch").append("<option value=''>설비</option>");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#selectMachineSearch").append("<option value=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</option>");
                });
            }
            cycleTime.getAllCycleTime();
        });
    });

    cycleTime.getAllProductName(function(response) {
        $('#selectProductSearch').empty();
        $("#selectProductSearch").append("<option value=''>품종</option>");
        if (response.CODE == "7777") {
            $.each(response.DATA, function (key, value) {
                $("#selectProductSearch").append("<option value='" + value.NAME + "'>" + value.NAME + "</option>");
            });
        }
    });

    $("#selectMachineSearch").change(function(){
        cycleTime.getAllCycleTime();
    });

    $("#selectLine").change(function () {
        cycleTime.getAllMachineNameByLineName($("#selectLine").val(), function (response) {
            $('#selectMachine').empty();
            $("#selectMachine").append("<option value=''>설비</option>");
            if (response.CODE == "7777") {
                $.each(response.DATA, function (key, value) {
                    $("#selectMachine").append("<option value=" + value.MAPPING_NAME + ">" + value.MACHINE_NAME + "</option>");
                });
            }
        });
    });

    $("#selectMachine").change(function(){
        cycleTime.getAllProductName1($("#selectLine").val(), $("#selectMachine").val(), function(response){
            $('#selectProduct').empty();
            $("#selectProduct").append("<option value=''>품종</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectProduct").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                });
            }
        });
    });

    //TODO: SERVER SIDE REQUEST
    cycleTime.getAllCycleTime = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/cycle-time",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"      :   $("#selectLineSearch").val(),
                "machine"   :   $("#selectMachineSearch").val(),
                "product"   :   $("#selectProductSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#CYCLE_TIME").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 사이클타임)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#CYCLE_TIME_TEMPLATE").tmpl(response.DATA).appendTo("tbody#CYCLE_TIME");
                        if (checkPagination) {
                            cycleTime.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#CYCLE_TIME").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#CYCLE_TIME").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 사이클타임)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    cycleTime.addCycleTime = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/cycle-time",
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

    cycleTime.getCycleTime = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/cycle-time/" + id,
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

    cycleTime.updateCycleTime = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/cycle-time",
            type: 'PUT',
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

    cycleTime.deleteCycleTime = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/cycle-time/" + id,
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

    //TODO: PAGINATION
    cycleTime.setPagination = function (totalPage) {
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
        cycleTime.getAllCycleTime();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        cycleTime.getAllCycleTime();
    });

    $("#selectProductSearch").change(function () {
        checkPagination = true;
        cycleTime.getAllCycleTime();
    });

    cycleTime.getAllCycleTime();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#selectProduct").val("");
        $("#selectLine").val("");
        $("#selectMachine").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalCycleTime").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#selectLine").val() == "" || $("#selectMachine").val() == "" || $("#selectProduct").val() == "" || $("#txtCycleTime").val() == "" || $("#txtProcessCycleTime").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "CYCLE_TIME"           :   $("#txtCycleTime").val(),
                "PROCESS_CYCLE_TIME"   :   $("#txtProcessCycleTime").val(),
                "LINE"                 :   $("#selectLine").val(),
                "MACHINE"              :   $("#selectMachine").val(),
                "PRODUCT"              :   $("#selectProduct").val(),
                "REMARK"               :   $("#txtRemark").val(),
            };
            cycleTime.addCycleTime(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalCycleTime").trigger("click");
                    checkPagination = true;
                    cycleTime.getAllCycleTime();
                } else {
                    $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalCycleTime").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        cycleTime.getCycleTime(id, function (response) {
            $("#selectLine").val(response.DATA.LINE);
            cycleTime.getAllMachineNameByLineName(response.DATA.LINE, function(response1){
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response1.CODE == "7777"){
                    $.each(response1.DATA, function(key, value){
                        $("#selectMachine").append("<option value='"+value.MAPPING_NAME+"'>"+value.MACHINE_NAME+"</option>");
                    });
                    $("#selectMachine").val(response.DATA.MACHINE);
                }
            }) ;
            cycleTime.getAllProductName1(response.DATA.LINE, response.DATA.MACHINE, function(response1){
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                if(response1.CODE == "7777"){
                    $.each(response1.DATA, function(key, value){
                        $("#selectProduct").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
                $("#selectProduct").val(response.DATA.PRODUCT);
            });
            $("#txtRemark").val(response.DATA.REMARK);
            $("#txtCycleTime").val(response.DATA.CYCLE_TIME);
            $("#txtProcessCycleTime").val(response.DATA.PROCESS_CYCLE_TIME);
            $("#modalCycleTime").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#selectLine").val() == "" || $("#selectMachine").val() == "" || $("#selectProduct").val() == "" || $("#txtCycleTime").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "CYCLE_TIME"           :   $("#txtCycleTime").val(),
                "PROCESS_CYCLE_TIME"   :   $("#txtProcessCycleTime").val(),
                "LINE"                 :   $("#selectLine").val(),
                "MACHINE"              :   $("#selectMachine").val(),
                "PRODUCT"              :   $("#selectProduct").val(),
                "REMARK"               :   $("#txtRemark").val(),
                "ID"                   :   id
            };
            cycleTime.updateCycleTime(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalCycleTime").trigger("click");
                    checkPagination = true;
                    cycleTime.getAllCycleTime();
                } else {
                    $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalCycleTime").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        cycleTime.deleteCycleTime(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalCycleTime").trigger("click");
                checkPagination = true;
                cycleTime.getAllCycleTime();
            } else {
                $("#modalCycleTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalCycleTime").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});