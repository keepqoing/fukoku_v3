$(function () {

    var productsFail = {};
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
    productsFail.getAllProductsFail = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/product-fail",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "filter"    :   $("#txtSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PRODUCT_FAIL").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 제품불량코드)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#PRODUCT_FAIL_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PRODUCT_FAIL");
                        if (checkPagination) {
                            productsFail.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#PRODUCT_FAIL").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#PRODUCT_FAIL").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
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

    productsFail.addProductFail = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product-fail",
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

    productsFail.getProductFail = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product-fail/" + id,
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

    productsFail.updateProductFail = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product-fail",
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

    productsFail.deleteProductFail = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product-fail/" + id,
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
    productsFail.setPagination = function (totalPage) {
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
        productsFail.getAllProductsFail();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        productsFail.getAllProductsFail();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        productsFail.getAllProductsFail();
    });

    productsFail.getAllProductsFail();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalProductFail").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtFailCode").val() == "" || $("#txtFailGroup").val() == "" || $("#txtFailClassification").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FAIL_CODE"             :   $("#txtFailCode").val(),
                "FAIL_GROUP"            :   $("#txtFailGroup").val(),
                "FAIL_CLASSIFICATION"   :   $("#txtFailClassification").val(),
                "FAIL_NAME"             :   $("#txtFailName").val()
            };
            productsFail.addProductFail(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProductFail").trigger("click");
                    checkPagination = true;
                    productsFail.getAllProductsFail();
                } else {
                    $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProductFail").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        productsFail.getProductFail(id, function (response) {
            $("#txtFailGroup").val(response.DATA.FAIL_GROUP);
            $("#txtFailClassification").val(response.DATA.FAIL_CLASSIFICATION);
            $("#txtFailCode").val(response.DATA.FAIL_CODE);
            $("#txtFailName").val(response.DATA.FAIL_NAME);
            $("#modalProductFail").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtFailCode").val() == "" || $("#txtFailGroup").val() == "" || $("#txtFailClassification").val() == "" || $("#txtFailName").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FAIL_CODE"             :   $("#txtFailCode").val(),
                "FAIL_GROUP"            :   $("#txtFailGroup").val(),
                "FAIL_CLASSIFICATION"   :   $("#txtFailClassification").val(),
                "FAIL_NAME"             :   $("#txtFailName").val(),
                "ID"                    :   id
            };
            productsFail.updateProductFail(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProductFail").trigger("click");
                    checkPagination = true;
                    productsFail.getAllProductsFail();
                } else {
                    $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProductFail").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        productsFail.deleteProductFail(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProductFail").trigger("click");
                checkPagination = true;
                productsFail.getAllProductsFail();
            } else {
                $("#modalProductFail").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProductFail").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});