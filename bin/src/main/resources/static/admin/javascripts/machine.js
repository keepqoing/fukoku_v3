$(function () {

    var machines = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    machines.getAllFactoriesName = function(){
        $.ajax({
            url: "/v1/api/fukoku/factory/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectFactorySearch').empty();
                $('#selectFactory').empty();
                $("#selectFactorySearch").append("<option value=''>설치위치</option>");
                $("#selectFactory").append("<option value=''>설치위치</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectFactory").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                        $("#selectFactorySearch").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    machines.getAllFactoriesName()

    //TODO: SERVER SIDE REQUEST
    machines.getAllMachines = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/machine",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "factory"   :   $("#selectFactorySearch").val(),
                "name"      :   $("#txtSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    console.log("response",response);
                    $("#MACHINE").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 설비)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#MACHINE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#MACHINE");
                        if (checkPagination) {
                            machines.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#MACHINE").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#MACHINE").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 설비)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    machines.addMachine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine",
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

    machines.getMachine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine/" + id,
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

    machines.updateMachine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine",
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

    machines.deleteMachine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/machine/" + id,
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
    machines.setPagination = function (totalPage) {
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
        machines.getAllMachines();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        machines.getAllMachines();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        machines.getAllMachines();
    });

    $("#selectFactorySearch").change(function(){
        checkPagination = true;
        currentPage = 1;
        machines.getAllMachines();
    });

    machines.getAllMachines();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalMachine").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#selectFactory").val() == "" || $("#txtMappingName").val() == "" || $("#txtIp").val() == ""
            || $("#txtImportDate").val() == "" || $("#txtProductionDate").val() == "" || $("#txtManufacturer").val() == ""
            || $("#txtContactPerson").val() == "" || $("#txtHandlerMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FACILITY_CONTACT_PERSON"       :       $("#txtContactPerson").val(),
                "FACILITY_STAFF"                :       $("#txtHandlerMachine").val(),
                "FACTORY"                       :       $("#selectFactory").val(),
                "IMPORT_DATE"                   :       $("#txtImportDate").val(),
                "IP"                            :       $("#txtIp").val(),
                "MACHINE_NAME"                  :       $("#txtName").val(),
                "MANUFACTURER"                  :       $("#txtManufacturer").val(),
                "MAPPING_NAME"                  :       $("#txtMappingName").val(),
                "CODE"                          :       $("#txtCode").val(),
                "REMARK"                        :       $("#txtRemark").val(),
                "SEQ"                           :       0,
                "STATION"                       :       $("#txtStation").val(),
                "PLC_TYPE"                      :       $("#txtPLCType").val(),
                "PLC_COMMUNICATION_DEVICE"      :       $("#txtPLCCommunicationDevice").val()
            };
            machines.addMachine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalMachine").trigger("click");
                    checkPagination = true;
                    machines.getAllMachines();
                } else {
                    $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalMachine").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        machines.getMachine(id, function (response) {
            $("#txtContactPerson").val(response.DATA.FACILITY_CONTACT_PERSON),
            $("#txtHandlerMachine").val(response.DATA.FACILITY_STAFF),
            $("#selectFactory").val(response.DATA.FACTORY),
            $("#txtImportDate").val(response.DATA.IMPORT_DATE),
            $("#txtIp").val(response.DATA.IP),
            $("#txtName").val(response.DATA.MACHINE_NAME),
            $("#txtManufacturer").val(response.DATA.MANUFACTURER),
            $("#txtMappingName").val(response.DATA.MAPPING_NAME),
            $("#txtCode").val(response.DATA.CODE),
            $("#txtRemark").val(response.DATA.REMARK),
            $("#txtStation").val(response.DATA.STATION),
            $("#txtPLCType").val(response.DATA.PLC_TYPE),
            $("#txtPLCCommunicationDevice").val(response.DATA.PLC_COMMUNICATION_DEVICE),
            $("#modalMachine").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectFactory").val() == "" || $("#txtMappingName").val() == "" || $("#txtIp").val() == ""
            || $("#txtImportDate").val() == "" || $("#txtProductionDate").val() == "" || $("#txtManufacturer").val() == ""
            || $("#txtContactPerson").val() == "" || $("#txtHandlerMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FACILITY_CONTACT_PERSON"       :       $("#txtContactPerson").val(),
                "FACILITY_STAFF"                :       $("#txtHandlerMachine").val(),
                "FACTORY"                       :       $("#selectFactory").val(),
                "IMPORT_DATE"                   :       $("#txtImportDate").val(),
                "IP"                            :       $("#txtIp").val(),
                "MACHINE_NAME"                  :       $("#txtName").val(),
                "MANUFACTURER"                  :       $("#txtManufacturer").val(),
                "MAPPING_NAME"                  :       $("#txtMappingName").val(),
                "CODE"                          :       $("#txtCode").val(),
                "REMARK"                        :       $("#txtRemark").val(),
                "SEQ"                           :       0,
                "STATION"                       :       $("#txtStation").val(),
                "PLC_TYPE"                      :       $("#txtPLCType").val(),
                "PLC_COMMUNICATION_DEVICE"      :       $("#txtPLCCommunicationDevice").val(),
                "ID"                            :       id
            };
            machines.updateMachine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalMachine").trigger("click");
                    checkPagination = true;
                    machines.getAllMachines();
                } else {
                    $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalMachine").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        machines.deleteMachine(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalMachine").trigger("click");
                checkPagination = true;
                machines.getAllMachines();
            } else {
                $("#modalMachine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalMachine").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});