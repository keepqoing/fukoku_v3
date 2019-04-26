$(function () {

    var alarmCode = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    alarmCode.getAllLinesName = function(callback){
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

    alarmCode.getAllMachineNameByLineName = function(line, callback){
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

    alarmCode.getAllLinesName(function (response) {
        $('#selectLine').empty();
        $('#selectLineAdd').empty();
        $("#selectLine").append("<option value=''>라인</option>");
        $("#selectLineAdd").append("<option value=''>라인</option>");
        if(response.CODE == "7777"){
            $.each(response.DATA, function(key, value){
                $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                $("#selectLineAdd").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
            });
        }
    });

    //TODO: SERVER SIDE REQUEST
    alarmCode.getAllAlarmCode = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"      :   $("#selectLine").val(),
                "machine"   :   /*$("#selectMachine").val()*/'',
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#alarm-code").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 알람코드)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#alarm-code-template").tmpl(response.DATA).appendTo("tbody#alarm-code");
                        if (checkPagination) {
                            alarmCode.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#alarm-code").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#alarm-code").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 알람코드)");
                }
                if(callback){
                    callback();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    alarmCode.addAlarmCode = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code",
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

    alarmCode.getAlarmCode = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code/" + id,
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

    alarmCode.updateAlarmCode = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code",
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

    alarmCode.deleteAlarmCode = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code/" + id,
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
    alarmCode.setPagination = function (totalPage) {
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
        openLoading();
        alarmCode.getAllAlarmCode(function () {
            closeLoading();
        });
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        openLoading();
        alarmCode.getAllAlarmCode(function () {
            closeLoading();
        });
    });

    $('#selectLine').change(function () {
        checkPagination = true;

        openLoading();
        alarmCode.getAllAlarmCode(function () {
            closeLoading();
        });
       /*alarmCode.getAllMachineNameByLineName($('#selectLine').val(), function (response) {
           $('#selectMachine').empty();
           $("#selectMachine").append("<option value=''>설비</option>");
           if(response.CODE == "7777"){
               $.each(response.DATA, function(key, value){
                   $("#selectMachine").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
               });
           }
       });*/
    });

    $('#selectLineAdd').change(function () {
        alarmCode.getAllMachineNameByLineName($('#selectLineAdd').val(), function (response) {
            $('#selectMachineAdd').empty();
            $("#selectMachineAdd").append("<option value=''>설비</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectMachineAdd").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                });
            }
        });
    });

    $('#selectMachine').change(function () {
        openLoading();
        alarmCode.getAllAlarmCode(function () {
            closeLoading();
        });
    });

    openLoading();
    alarmCode.getAllAlarmCode(function () {
        closeLoading();
    });

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modal-alarm-code").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#selectLineAdd").val() == "" || $("#selectMachineAdd").val() == "" || $("#txt-start-date").val() == "" || $("#txt-end-date").val() == "" || $("#txt-alarm-code").val() == "" || $("#txt-alarm-name").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "LINE"           :      $("#selectLineAdd").val(),
                "MACHINE"        :      $("#selectMachineAdd").val(),
                "START_DATE"     :      $("#txt-start-date").val(),
                "END_DATE"       :      $("#txt-end-date").val(),
                "ALARM_CODE"     :      $("#txt-alarm-code").val(),
                "ALARM_NAME"     :      $("#txt-alarm-name").val(),
            };
            alarmCode.addAlarmCode(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                    $("#modal-alarm-code").trigger("click");
                    checkPagination = true;
                    openLoading();
                    alarmCode.getAllAlarmCode(function () {
                        closeLoading();
                    });
                } else {
                    $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                    $("#modal-alarm-code").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        alarmCode.getAlarmCode(id, function (response) {
            $("#selectLineAdd").val(response.DATA.LINE);
            alarmCode.getAllMachineNameByLineName($('#selectLineAdd').val(), function (response1) {
                $('#selectMachineAdd').empty();
                $("#selectMachineAdd").append("<option value=''>설비</option>");
                if(response1.CODE == "7777"){
                    $.each(response1.DATA, function(key, value){
                        $("#selectMachineAdd").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                }
                $("#selectMachineAdd").val(response.DATA.MACHINE);
            });

            $("#txt-start-date").val(response.DATA.START_DATE);
            $("#txt-end-date").val(response.DATA.END_DATE);
            $("#txt-alarm-code").val(response.DATA.ALARM_CODE);
            $("#txt-alarm-name").val(response.DATA.ALARM_NAME);
            $("#modal-alarm-code").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#selectLineAdd").val() == "" || $("#selectMachineAdd").val() == "" || $("#txt-start-date").val() == "" || $("#txt-end-date").val() == "" || $("#txt-alarm-code").val() == "" || $("#txt-alarm-name").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "LINE"           :      $("#selectLineAdd").val(),
                "MACHINE"        :      $("#selectMachineAdd").val(),
                "START_DATE"     :      $("#txt-start-date").val(),
                "END_DATE"       :      $("#txt-end-date").val(),
                "ALARM_CODE"     :      $("#txt-alarm-code").val(),
                "ALARM_NAME"     :      $("#txt-alarm-name").val(),
                "ID"             :      id
            };
            alarmCode.updateAlarmCode(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                    $("#modal-alarm-code").trigger("click");
                    checkPagination = true;
                    openLoading();
                    alarmCode.getAllAlarmCode(function () {
                        closeLoading();
                    });
                } else {
                    $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                    $("#modal-alarm-code").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        alarmCode.deleteAlarmCode(id, function (response) {
            if (response.CODE == "0000") {
                $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                $("#modal-alarm-code").trigger("click");
                checkPagination = true;
                openLoading();
                alarmCode.getAllAlarmCode(function () {
                    closeLoading();
                });
            } else {
                $("#modal-alarm-code").attr("data-toastr-notification", response.MESSAGE);
                $("#modal-alarm-code").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    alarmCode.uploadFile = function (data, callback) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/alarm-code/upload-file",
            type: 'POST',
            enctype: "multipart/form-data",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                //xhr.setRequestHeader("Accept", "application/json");
                //xhr.setRequestHeader("Content-Type", "application/json");
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

    alarmCode.downloadExcel = function (line, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-code/download/" + line,
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
                //window.location = "/v1/api/fukoku/alarm-code/download-redirect";
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
                window.location = "/v1/api/fukoku/alarm-code/download-redirect";
                closeLoading();
            }
        });
    }

    $('#file').change(function () {
        var formData = new FormData();
        formData.append("file", $("#file")[0].files[0]);
        alarmCode.uploadFile(formData, function (response) {
            alarmCode.getAllAlarmCode(function () {
                closeLoading();
            });
            $('#file').val('');
        });
    });

    $('#btnDownloadExcel').click(function () {
        openLoading();
        var param = $('#selectLine').val();
        if(param=='')
            param = 'T';
        console.log(param);
        alarmCode.downloadExcel(param, function (response) {
            closeLoading();
        });
    });
});