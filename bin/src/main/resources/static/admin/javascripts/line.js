$(function () {

    var lines = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    lines.getAllFactoriesName = function(){
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
                $("#selectFactorySearch").append("<option value=''>공장</option>");
                $("#selectFactory").append("<option value=''>공장</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectFactory").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectFactorySearch").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    lines.getAllFactoriesName()

    //TODO: SERVER SIDE REQUEST
    lines.getAllLines = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/line",
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
                    $("#LINE").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 라인)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#LINE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#LINE");
                        if (checkPagination) {
                            lines.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#LINE").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#LINE").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 라인)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    lines.addLine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/line",
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

    lines.getLine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/line/" + id,
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

    lines.updateLine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/line",
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

    lines.deleteLine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/line/" + id,
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
    lines.setPagination = function (totalPage) {
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
        lines.getAllLines();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        lines.getAllLines();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        lines.getAllLines();
    });

    $("#selectFactorySearch").change(function(){
        checkPagination = true;
        currentPage = 1;
        lines.getAllLines();
    });

    lines.getAllLines();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalLine").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#selectFactory").val() == "" || $("#txtMappingName").val() == "" || $("#txtLocation").val() == ""
            || $("#txtProduct").val() == "" || $("#txtDate").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FACTORY"           :   $("#selectFactory").val(),
                "LINE_NAME"         :   $("#txtName").val(),
                "LOCATION"          :   $("#txtLocation").val(),
                "MAPPING_NAME"      :   $("#txtName").val(),
                "PRODUCT"           :   $("#txtProduct").val(),
                "PRODUCTION_DATE"   :   $("#txtDate").val(),
                "REMARK"            :   $("#txtRemark").val(),
                "SEQ"               :   ""
            };
            lines.addLine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalLine").trigger("click");
                    checkPagination = true;
                    lines.getAllLines();
                } else {
                    $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalLine").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        lines.getLine(id, function (response) {
            $("#selectFactory").val(response.DATA.FACTORY);
            $("#txtProduct").val(response.DATA.PRODUCT);
            $("#txtDate").val(response.DATA.PRODUCTION_DATE);
            $("#txtRemark").val(response.DATA.REMARK);
            $("#txtMappingName").val(response.DATA.MAPPING_NAME);
            $("#txtLocation").val(response.DATA.LOCATION);
            $("#txtName").val(response.DATA.LINE_NAME);
            $("#modalLine").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectFactory").val() == "" || $("#txtMappingName").val() == "" || $("#txtLocation").val() == ""
            || $("#txtProduct").val() == "" || $("#txtDate").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "FACTORY"           :   $("#selectFactory").val(),
                "LINE_NAME"         :   $("#txtName").val(),
                "LOCATION"          :   $("#txtLocation").val(),
                "MAPPING_NAME"      :   $("#txtName").val(),
                "PRODUCT"           :   $("#txtProduct").val(),
                "PRODUCTION_DATE"   :   $("#txtDate").val(),
                "REMARK"            :   $("#txtRemark").val(),
                "SEQ"               :   "",
                "ID"                :   id
            };
            lines.updateLine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalLine").trigger("click");
                    checkPagination = true;
                    lines.getAllLines();
                } else {
                    $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalLine").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        lines.deleteLine(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalLine").trigger("click");
                checkPagination = true;
                lines.getAllLines();
            } else {
                $("#modalLine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalLine").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});