$(function () {

    var products = {};
    var checkPagination = true;
    var currentPage = 1;
    var sortBy = "0";

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    products.getAllLinesName = function(){
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
                console.log(response);
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    products.getAllLinesName();

    //TODO: SERVER SIDE REQUEST
    products.getAllProductsByMaterialAndMaterialDetail = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "sortBy"    :   sortBy,
                "name"      :   $("#txtNameSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PRODUCT").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 품종)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#PRODUCT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PRODUCT");
                        if (checkPagination) {
                            products.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#PRODUCT").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#PRODUCT").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 품종)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    products.addProduct = function (product, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(product),
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

    products.getProductById = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product/" + id,
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

    products.updateProduct = function (product, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product",
            type: 'PUT',
            dataType: 'JSON',
            data: JSON.stringify(product),
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

    products.deleteProduct = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/product/" + id,
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
    products.setPagination = function (totalPage) {
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
        products.getAllProductsByMaterialAndMaterialDetail();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        products.getAllProductsByMaterialAndMaterialDetail();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        products.getAllProductsByMaterialAndMaterialDetail();
    });

    products.getAllProductsByMaterialAndMaterialDetail();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalProduct").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#txtProcess").val() == "" || $("#txtLSL").val() == "" || $("#txtUSL").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"           :      $("#txtName").val(),
                "LINE"           :      $("#selectLine").val(),
                "START_DATE"     :      $("#txtStartDate").val(),
                "END_DATE"       :      $("#txtEndDate").val(),
                "REMARK"         :      $("#txtRemark").val(),
                "PROCESS"        :      $("#txtProcess").val(),
                "LSL"            :      $("#txtLSL").val(),
                "USL"            :      $("#txtUSL").val(),
            };
            products.addProduct(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProduct").trigger("click");
                    checkPagination = true;
                    products.getAllProductsByMaterialAndMaterialDetail();
                } else {
                    $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProduct").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        products.getProductById(id, function (response) {
            $("#txtName").val(response.DATA.NAME);
            $("#selectLine").val(response.DATA.LINE);
            $("#txtStartDate").val(response.DATA.START_DATE);
            $("#txtEndDate").val(response.DATA.END_DATE);
            $("#txtRemark").val(response.DATA.REMARK);
            $("#txtProcess").val(response.DATA.PROCESS);
            $("#txtLSL").val(response.DATA.LSL);
            $("#txtUSL").val(response.DATA.USL);
            $("#modalProduct").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#txtProcess").val() == "" || $("#txtLSL").val() == "" || $("#txtUSL").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"           :      $("#txtName").val(),
                "LINE"           :      $("#selectLine").val(),
                "MACHINE"        :      $("#selectMachine").val(),
                "START_DATE"     :      $("#txtStartDate").val(),
                "END_DATE"       :      $("#txtEndDate").val(),
                "REMARK"         :      $("#txtRemark").val(),
                "PROCESS"        :      $("#txtProcess").val(),
                "LSL"            :      $("#txtLSL").val(),
                "USL"            :      $("#txtUSL").val(),
                "ID"             :      id
            }
            products.updateProduct(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProduct").trigger("click");
                    checkPagination = true;
                    products.getAllProductsByMaterialAndMaterialDetail();
                } else {
                    $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProduct").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        products.deleteProduct(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProduct").trigger("click");
                checkPagination = true;
                products.getAllProductsByMaterialAndMaterialDetail();
            } else {
                $("#modalProduct").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProduct").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    var lineFlag = false;
    $("#lineSort").click(function () {
        if(lineFlag){
            sortBy = "1-A";
            products.getAllProductsByMaterialAndMaterialDetail();
            lineFlag = false;
        }else{
            sortBy = "1-D";
            products.getAllProductsByMaterialAndMaterialDetail();
            lineFlag = true;
        }
    });

    var productFlag = false;
    $("#productSort").click(function () {
        if(productFlag){
            sortBy = "2-A";
            products.getAllProductsByMaterialAndMaterialDetail();
            productFlag = false;
        }else{
            sortBy = "2-D";
            products.getAllProductsByMaterialAndMaterialDetail();
            productFlag = true;
        }
    });
});