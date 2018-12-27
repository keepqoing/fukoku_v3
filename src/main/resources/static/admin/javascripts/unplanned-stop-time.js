$(function () {

    var unplannedStopTime = {};
    var checkPagination = true;
    var currentPage = 1;
    var lineArray = [];
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    unplannedStopTime.getAllLinesName = function(){
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
                $('#selectLineSearch').empty();
                $("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        lineArray.push(value.LINE_NAME);
                        $("#chkBox").append("<input type=\"checkbox\" id="+value.LINE_NAME+" style=\"width: 35px; height: 20px\" value="+value.LINE_NAME+">"+value.LINE_NAME+"");
                        $("#selectLineSearch").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    unplannedStopTime.getAllLinesName();

    unplannedStopTime.getAllItems = function(){
        $.ajax({
            url: "/v1/api/fukoku/item/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "classification"    :   "33"
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectItem").empty();
                $("#selectItem").append("<option value=''>세부항목</option>");
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

    unplannedStopTime.getAllItems();

    //TODO: SERVER SIDE REQUEST
    unplannedStopTime.getAllUnplannedStopTime = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/operating-time",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "workingTypeName"   :   $("#selectWorkingTypeNameSearch").val(),
                "actionType"        :   "비계획정지",
                "line"              :   $("#selectLine").val(),
                "limit"             :   $("#PER_PAGE").val(),
                "page"              :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#UNPLAN_STOP_TIME").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 조업시간코드)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#UNPLAN_STOP_TIME_TEMPLATE").tmpl(response.DATA).appendTo("tbody#UNPLAN_STOP_TIME");
                        if (checkPagination) {
                            unplannedStopTime.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#UNPLAN_STOP_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#UNPLAN_STOP_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
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

    unplannedStopTime.getAllUnplannedStopTime1 = function () {
        $.ajax({
            url: "/v1/api/fukoku/operating-time",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "workingTypeName"   :   $("#selectWorkingTypeNameSearch").val(),
                "actionType"        :   "비계획정지",
                "line"              :   $("#selectLine").val(),
                "limit"             :   $("#PER_PAGE").val(),
                "page"              :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#UNPLAN_STOP_TIME").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 조업시간코드)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#UNPLAN_STOP_TIME_TEMPLATE").tmpl(response.DATA).appendTo("tbody#UNPLAN_STOP_TIME");
                        if (checkPagination) {
                            unplannedStopTime.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#UNPLAN_STOP_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#UNPLAN_STOP_TIME").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("("+0+" 급장애)");
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    unplannedStopTime.addUnplannedStopTime = function (data, callback) {
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

    unplannedStopTime.getUnplannedStopTime = function (id, callback) {
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

    unplannedStopTime.updateUnplannedStopTime = function (data, callback) {
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

    unplannedStopTime.deleteUnplannedStopTime = function (id, callback) {
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
    unplannedStopTime.setPagination = function (totalPage) {
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
        unplannedStopTime.getAllUnplannedStopTime();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        unplannedStopTime.getAllUnplannedStopTime();
    });

    $("#selectWorkingTypeNameSearch").change(function () {
        checkPagination = false;
        currentPage = 1;
        unplannedStopTime.getAllUnplannedStopTime();
    });

    unplannedStopTime.getAllUnplannedStopTime();

    //TODO: View action
    $("#btnNew").click(function () {
        $("#btnSaveUpdate").hide();
        $("#selectItem").val("");
        $("#selectWorkingTypeName").val("");
        $("#txtWorkName").val("");
        $("#selectTimeTag").val("");
        $("#txtStartDate").val("");
        $("#txtEndDate").val("");
        $("#txtStartTime").val("");
        $("#txtEndTime").val("");
        $("#btnSave").show();
        for(var i=0;i<lineArray.length;i++){
            $($("input[id="+lineArray[i]+"]")).prop('checked', false);
            $($("input[id="+lineArray[i]+"]")).removeAttr("name");
            $($("input[id="+lineArray[i]+"]")).attr("type","checkbox");
        }
        $("input[name=startDate]").prop('checked', false);
        $("input[name=endDate]").prop('checked', false);
        $("#modalUnplannedStopTime").modal('show');
    });


    $("#btnSave").click(function () {
        if ($("#txtStartTime").val() == "" || $("#txtEndTime").val() == "" || $("#selectTimeTag").val() == ""
            || $("#selectWorkTypeName").val() == "" || $("#selectItem").val() == "0" || $("#selectCrossDay").val() == ""
            || !$('input[name=startDate]').is(':checked') || !$('input[name=endDate]').is(':checked')) {
            alert("Please input the data!");
        } else {
            openLoading();
            var l = '';
            for(var i=0;i<lineArray.length;i++){
                var s = "#"+lineArray[i];
                if($(s).is(':checked')) {
                    var s = "#" + lineArray[i] + ":checked";
                    l += $(s).val() + " ";
                }
            }
            var l1 = l.split(" ");
            for (var i=0;i<l1.length-1;i++){
                var data = {
                    "ACTION_TYPE"           :       "비계획정지",
                    "DURATION"              :       0,
                    "ITEM"                  :       $("#selectItem").val(),
                    "END_DAY"               :       $("input[name=endDate]:checked").val(),
                    "END_TIME"              :       $("#txtEndTime").val(),
                    "START_DAY"             :       $("input[name=startDate]:checked").val(),
                    "START_TIME"            :       $("#txtStartTime").val(),
                    "TIME_TAG"              :       $("#selectTimeTag").val(),
                    "WORKING_CODE"          :       $("#selectWorkingTypeName").val(),
                    "WORKING_TYPE_NAME"     :       $("#selectWorkingTypeName option:selected").text().trim(),
                    "WORK_TYPE_NAME"        :       $("#txtWorkName").val(),
                    "START_DATE"            :       $("#txtStartDate").val(),
                    "END_DATE"              :       $("#txtEndDate").val(),
                    "DAY_TYPE"              :       $("#selectCrossDay").val(),
                    "LINE"                  :       l1[i]
                };
                unplannedStopTime.addUnplannedStopTime(data, function (response) {
                    if (response.CODE == "0000") {
                        $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalUnplannedStopTime").trigger("click");
                        unplannedStopTime.getAllUnplannedStopTime1();
                    } else {
                        $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalUnplannedStopTime").trigger("click");
                    }
                });
            }
            closeLoading();
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        for(var i=0;i<lineArray.length;i++){
            $($("input[id="+lineArray[i]+"]")).prop('checked', false);
            $($("input[id="+lineArray[i]+"]")).attr("name","same");
            $($("input[id="+lineArray[i]+"]")).attr("type","radio");
        }
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        unplannedStopTime.getUnplannedStopTime(id, function (response) {
            $("#selectItem").val(response.DATA.ITEM);
            $("#selectWorkingTypeName").val(response.DATA.WORKING_CODE);
            $("#txtStartTime").val(response.DATA.START_TIME);
            $("#txtEndTime").val(response.DATA.END_TIME);
            $("#txtStartDate").val(response.DATA.START_DATE);
            $("#txtEndDate").val(response.DATA.END_DATE);
            $("#txtWorkName").val(response.DATA.WORK_TYPE_NAME);
            $("#selectTimeTag").val(response.DATA.TIME_TAG);
            $("#selectCrossDay").val(response.DATA.DAY_TYPE);
            for(var i=0;i<lineArray.length;i++){
                $($("input[id="+lineArray[i]+"][value=" + response.DATA.LINE + "]")).prop('checked', true);
            }
            $("input[name=startDate][value=" + response.DATA.START_DAY + "]").prop('checked', true);
            $("input[name=endDate][value=" + response.DATA.END_DAY + "]").prop('checked', true);
            $("#modalUnplannedStopTime").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtStartTime").val() == "" || $("#txtEndTime").val() == "" || $("#selectTimeTag").val() == ""
            || $("#selectWorkTypeName").val() == "" || $("#selectItem").val() == "0" || $("#selectCrossDay").val() == ""
            || !$('input[name=startDate]').is(':checked') || !$('input[name=endDate]').is(':checked')) {
            alert("Please input the data!");
        } else {
            var data = {
                "ACTION_TYPE"           :       "비계획정지",
                "DURATION"              :       0,
                "ITEM"                  :       $("#selectItem").val(),
                "END_DAY"               :       $("input[name=endDate]:checked").val(),
                "END_TIME"              :       $("#txtEndTime").val(),
                "START_DAY"             :       $("input[name=startDate]:checked").val(),
                "START_TIME"            :       $("#txtStartTime").val(),
                "TIME_TAG"              :       $("#selectTimeTag").val(),
                "WORKING_CODE"          :       $("#selectWorkingTypeName").val(),
                "WORKING_TYPE_NAME"     :       $("#selectWorkingTypeName option:selected").text().trim(),
                "WORK_TYPE_NAME"        :       $("#txtWorkName").val(),
                "START_DATE"            :       $("#txtStartDate").val(),
                "END_DATE"              :       $("#txtEndDate").val(),
                "DAY_TYPE"              :       $("#selectCrossDay").val(),
                "LINE"                  :       $("input[name=same]:checked").val(),
                "ID"                    :       id
            };
            unplannedStopTime.updateUnplannedStopTime(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUnplannedStopTime").trigger("click");
                    unplannedStopTime.getAllUnplannedStopTime();
                } else {
                    $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUnplannedStopTime").trigger("click");
                }
            });
        }
    });


    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        unplannedStopTime.deleteUnplannedStopTime(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalUnplannedStopTime").trigger("click");
                unplannedStopTime.getAllUnplannedStopTime();
            } else {
                $("#modalUnplannedStopTime").attr("data-toastr-notification", response.MESSAGE);
                $("#modalUnplannedStopTime").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});