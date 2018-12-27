$(function () {

    var factories = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    //TODO: SERVER SIDE REQUEST
    factories.getAllFactories = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/factory",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "name"   :   $("#txtSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#FACTORY").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 공장)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#FACTORY_TEMPLATE").tmpl(response.DATA).appendTo("tbody#FACTORY");
                        if (checkPagination) {
                            factories.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#FACTORY").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#FACTORY").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 공장)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    factories.addFactory = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/factory",
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

    factories.getFactory = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/factory/" + id,
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

    factories.updateFactory = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/factory",
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

    factories.deleteFactory = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/factory/" + id,
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
    factories.setPagination = function (totalPage) {
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
        factories.getAllFactories();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        factories.getAllFactories();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        factories.getAllFactories();
    });

    factories.getAllFactories();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalFactory").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#txtproduct").val() == "" || $("#txtStartDate").val() == "" || $("#txtEndDate").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "ADDRESS"               :   $("#txtAddress").val(),
                "MAPPING_NAME"          :   $("#txtName").val(),
                "NAME"                  :   $("#txtName").val(),
                "PRODUCT"               :   $("#txtproduct").val(),
                "PRODUCTION_START_DATE" :   $("#txtStartDate").val(),
                "PRODUCTION_END_DATE"   :   $("#txtEndDate").val(),
                "REMARK"                :   $("#txtRemark").val()
            };
            factories.addFactory(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalFactory").trigger("click");
                    checkPagination = true;
                    factories.getAllFactories();
                } else {
                    $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalFactory").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        factories.getFactory(id, function (response) {
            $("#txtName").val(response.DATA.NAME);
            $("#txtproduct").val(response.DATA.PRODUCT);
            $("#txtStartDate").val(response.DATA.PRODUCTION_START_DATE);
            $("#txtEndDate").val(response.DATA.PRODUCTION_END_DATE);
            $("#txtAddress").val(response.DATA.ADDRESS);
            $("#txtRemark").val(response.DATA.REMARK);
            $("#modalFactory").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#selectMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "ADDRESS"               :   $("#txtAddress").val(),
                "MAPPING_NAME"          :   $("#txtName").val(),
                "NAME"                  :   $("#txtName").val(),
                "PRODUCT"               :   $("#txtproduct").val(),
                "PRODUCTION_START_DATE" :   $("#txtStartDate").val(),
                "PRODUCTION_END_DATE"   :   $("#txtEndDate").val(),
                "REMARK"                :   $("#txtRemark").val(),
                "ID"                    :   id
            };
            factories.updateFactory(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalFactory").trigger("click");
                    checkPagination = true;
                    factories.getAllFactories();
                } else {
                    $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalFactory").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        factories.deleteFactory(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFactory").trigger("click");
                checkPagination = true;
                factories.getAllFactories();
            } else {
                $("#modalFactory").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFactory").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});