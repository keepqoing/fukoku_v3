$(function () {

    var operatingTime = {};
    var checkPagination = true;
    var currentPage = 1;
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    operatingTime.getAllItems = function(){
        $.ajax({
            url: "/v1/api/fukoku/item/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "classification"    :   "35"
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectItem").empty();
                $("#selectItem").append("<option value='0'>세부항목</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectItem").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    operatingTime.getAllItems();

    //TODO: SERVER SIDE REQUEST
    operatingTime.getAllOperatingTime = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/operating-time",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "workingTypeName"   :   $("#selectWorkingTypeNameSearch").val(),
                "actionType"        :   "정상근무",
                "line"              :   "",
                "limit"             :   $("#PER_PAGE").val(),
                "page"              :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#OPERATING_TIME").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 조업시간코드)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#OPERATING_TIME_TEMPLATE").tmpl(response.DATA).appendTo("tbody#OPERATING_TIME");
                        if (checkPagination) {
                            operatingTime.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#OPERATING_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#OPERATING_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("("+0+" 급장애)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    operatingTime.addOperatingTime = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/operating-time",
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

    operatingTime.getOperatingTime = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/operating-time/" + id,
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

    operatingTime.updateOperatingTime = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/operating-time/update",
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

    operatingTime.deleteOperatingTime = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/operating-time/" + id,
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
    operatingTime.setPagination = function (totalPage) {
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
        operatingTime.getAllOperatingTime();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        operatingTime.getAllOperatingTime();
    });

    $("#selectWorkingTypeNameSearch").change(function () {
        checkPagination = false;
        currentPage = 1;
        operatingTime.getAllOperatingTime();
    });

    operatingTime.getAllOperatingTime();

    //TODO: View action
    $("#btnNew").click(function () {
        $("#selectItem").val("0");
        $("#selectWorkingTypeName").val("");
        $("#txtWorkName").val("");
        $("#selectTimeTag").val("");
        $("#txtStartDate").val("");
        $("#txtEndDate").val("");
        $("#txtStartTime").val("");
        $("#txtEndTime").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalOperatingTime").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtStartTime").val() == "" || $("#txtEndTime").val() == "" || $("#selectTimeTag").val() == ""
            || $("#selectWorkTypeName").val() == "" || $("#selectItem").val() == "0"
            || !$('input[name=startDate]').is(':checked') || !$('input[name=endDate]').is(':checked')) {
            alert("Please input the data!");
        } else {
            var data = {
                "ACTION_TYPE"           :       "정상근무",
                "DURATION"              :       0,
                "ITEM"                  :       0,
                "END_DAY"               :       $("input[name=endDate]:checked").val(),
                "END_TIME"              :       $("#txtEndTime").val(),
                "START_DAY"             :       $("input[name=startDate]:checked").val(),
                "START_TIME"            :       $("#txtStartTime").val(),
                "TIME_TAG"              :       $("#selectTimeTag").val(),
                "WORKING_CODE"          :       $("#selectWorkingTypeName").val(),
                "WORKING_TYPE_NAME"     :       $("#selectWorkingTypeName option:selected").text().trim(),
                "WORK_CODE"             :       $("#selectWorkTypeName").val(),
                "WORK_TYPE_NAME"        :       $("#txtWorkName").val(),
                "START_DATE"            :       $("#txtStartDate").val(),
                "END_DATE"              :       $("#txtEndDate").val(),
                "LINE"                  :       "Other"
            };
            operatingTime.addOperatingTime(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTime").trigger("click");
                    operatingTime.getAllOperatingTime();
                } else {
                    $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTime").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        operatingTime.getOperatingTime(id, function (response) {
            $("#selectItem").val(response.DATA.ITEM);
            $("#selectWorkingTypeName").val(response.DATA.WORKING_CODE);
            $("#txtStartTime").val(response.DATA.START_TIME);
            $("#txtStartDate").val(response.DATA.START_DATE);
            $("#txtEndDate").val(response.DATA.END_DATE);
            $("#txtEndTime").val(response.DATA.END_TIME);
            $("#txtWorkName").val(response.DATA.WORK_TYPE_NAME);
            $("#selectTimeTag").val(response.DATA.TIME_TAG);
            $("input[name=startDate][value=" + response.DATA.START_DAY + "]").prop('checked', true);
            $("input[name=endDate][value=" + response.DATA.END_DAY + "]").prop('checked', true);
            $("#modalOperatingTime").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtStartTime").val() == "" || $("#txtEndTime").val() == "" || $("#selectTimeTag").val() == ""
            || $("#selectWorkTypeName").val() == "" || $("#selectItem").val() == "0"
            || !$('input[name=startDate]').is(':checked') || !$('input[name=endDate]').is(':checked')) {
            alert("Please input the data!");
        } else {
            var data = {
                "ACTION_TYPE"           :       "정상근무",
                "DURATION"              :       0,
                "ITEM"                  :       0,
                "END_DAY"               :       $("input[name=endDate]:checked").val(),
                "END_TIME"              :       $("#txtEndTime").val(),
                "START_DAY"             :       $("input[name=startDate]:checked").val(),
                "START_TIME"            :       $("#txtStartTime").val(),
                "TIME_TAG"              :       $("#selectTimeTag").val(),
                "WORKING_CODE"          :       $("#selectWorkingTypeName").val(),
                "WORKING_TYPE_NAME"     :       $("#selectWorkingTypeName option:selected").text().trim(),
                "WORK_CODE"             :       $("#selectWorkTypeName").val(),
                "WORK_TYPE_NAME"        :       $("#txtWorkName").val(),
                "START_DATE"            :       $("#txtStartDate").val(),
                "END_DATE"              :       $("#txtEndDate").val(),
                "LINE"                  :       "Other",
                "ID"                    :       id
            };
            operatingTime.updateOperatingTime(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTime").trigger("click");
                    operatingTime.getAllOperatingTime();
                } else {
                    $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTime").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        operatingTime.deleteOperatingTime(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalOperatingTime").trigger("click");
                operatingTime.getAllOperatingTime();
            } else {
                $("#modalOperatingTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalOperatingTime").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});