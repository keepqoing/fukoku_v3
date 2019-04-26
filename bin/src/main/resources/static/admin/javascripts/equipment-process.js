$(function () {

    var equipmentProcess = {};
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

    equipmentProcess.getAllLinesName = function(){
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

    equipmentProcess.getAllMachineNameByLineName = function(line, callback){
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

    equipmentProcess.getAllLinesName();
    $("#selectLineSearch").change($("#selectLineSearch").val(), function () {
        checkPagination = true;
        currentPage = 1;
        equipmentProcess.getAllProcesses();
        equipmentProcess.getAllMachineNameByLineName($("#selectLineSearch").val(), function (response) {
            $('#selectMachineSearch').empty();
            $("#selectMachineSearch").append("<option value=''>설비</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectMachineSearch").append("<option value='"+value.MACHINE_NAME+"'>"+value.MACHINE_NAME+"</option>");
                });
            }
        });
    });

    $("#selectLine").change(function () {
        equipmentProcess.getAllMachineNameByLineName($("#selectLine").val(), function (response) {
            $('#selectMachine').empty();
            $("#selectMachine").append("<option value=''>설비</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectMachine").append("<option value='"+value.MAPPING_NAME+"'>"+value.MACHINE_NAME+"</option>");
                });
            }
        });
    });

    //TODO: SERVER SIDE REQUEST
    equipmentProcess.getAllProcesses = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/process",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "sortBy"    :   sortBy,
                "line"      :   $("#selectLineSearch").val(),
                "machine"   :   $("#selectMachineSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PROCESS").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 공정)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#PROCESS_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PROCESS");
                        if (checkPagination) {
                            equipmentProcess.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#PROCESS").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#PROCESS").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 공정)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    equipmentProcess.addProcess = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/process",
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

    equipmentProcess.getProcess = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/process/" + id,
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

    equipmentProcess.updateProcess = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/process",
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

    equipmentProcess.deleteProcess = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/process/" + id,
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
    equipmentProcess.setPagination = function (totalPage) {
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
        equipmentProcess.getAllProcesses();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        equipmentProcess.getAllProcesses();
    });

    $("#selectMachineSearch").change(function () {
        checkPagination = true;
        currentPage = 1;
        equipmentProcess.getAllProcesses();
    });

    equipmentProcess.getAllProcesses();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalProcess").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#selectMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"           :   $("#txtName").val(),
                "LINE"           :   $("#selectLine").val(),
                "MACHINE"        :   $("#selectMachine option:selected").text().trim(),
                "MAPPING_NAME"   :   $("#selectMachine").val(),
                "SEQ"            :   $("#txtSeq").val()
            };
            equipmentProcess.addProcess(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProcess").trigger("click");
                    checkPagination = true;
                    equipmentProcess.getAllProcesses();
                } else {
                    $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProcess").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        equipmentProcess.getProcess(id, function (response) {
            $("#txtName").val(response.DATA.NAME);
            $("#txtSeq").val(response.DATA.SEQ);
            $("#selectLine").val(response.DATA.LINE);
            equipmentProcess.getAllMachineNameByLineName(response.DATA.LINE, function (response1) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response1.CODE == "7777"){
                    $.each(response1.DATA, function(key, value){
                        $("#selectMachine").append("<option value='"+value.MACHINE_NAME+"'>"+value.MACHINE_NAME+"</option>");
                    });
                }
                console.log(response.DATA.MACHINE);
                $("#selectMachine").val(response.DATA.MACHINE);
            });
            $("#modalProcess").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#selectMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"      :   $("#txtName").val(),
                "LINE"      :   $("#selectLine").val(),
                "MACHINE"        :   $("#selectMachine option:selected").text().trim(),
                "MAPPING_NAME"   :   $("#selectMachine").val(),
                "SEQ"            :   $("#txtSeq").val(),
                "ID"        :   id
            }
            equipmentProcess.updateProcess(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProcess").trigger("click");
                    checkPagination = true;
                    equipmentProcess.getAllProcesses();
                } else {
                    $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalProcess").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        equipmentProcess.deleteProcess(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProcess").trigger("click");
                checkPagination = true;
                equipmentProcess.getAllProcesses();
            } else {
                $("#modalProcess").attr("data-toastr-notification", response.MESSAGE);
                $("#modalProcess").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    var lineFlag = false;
    $("#lineSort").click(function () {
        if(lineFlag){
            sortBy = "1-A";
            equipmentProcess.getAllProcesses();
            lineFlag = false;
        }else{
            sortBy = "1-D";
            equipmentProcess.getAllProcesses();
            lineFlag = true;
        }
    });
});