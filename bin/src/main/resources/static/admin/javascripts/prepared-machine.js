$(function () {

    var preparedMachines = {};
    var checkPagination = true;
    var currentPage = 1;
    var sortBy = 0;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    preparedMachines.getAllFactoriesName = function(){
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
                $("#selectFactorySearch").append("<option value=''>공장</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectFactorySearch").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    preparedMachines.getAllLinesName = function(){
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
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                $("#selectLineSearch").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.LINE_NAME+"  data-id="+value.ID+">"+value.LINE_NAME+"</option>");
                        $("#selectLineSearch").append("<option value="+value.LINE_NAME+"  data-id="+value.ID+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    preparedMachines.getAllMachinesName = function(){
        $.ajax({
            url: "/v1/api/fukoku/machine/all/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectMachine").append("<option value='"+value.ID+"' data-id="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    preparedMachines.getAllFactoriesName()
    preparedMachines.getAllLinesName();
    preparedMachines.getAllMachinesName();

    //TODO: SERVER SIDE REQUEST
    preparedMachines.getAllPreparedMachines = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/prepared-machine",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "sortBy"    :   sortBy,
                "factory"   :   $("#selectFactorySearch").val(),
                "line"      :   $("#selectLineSearch").val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PREPARED_MACHINE").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 설비)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#PREPARED_MACHINE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PREPARED_MACHINE");
                        if (checkPagination) {
                            preparedMachines.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#PREPARED_MACHINE").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#PREPARED_MACHINE").html("<tr style='text-align:center;'><td colspan='10'>콘텐츠 없음</td></tr>");
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

    preparedMachines.addPreparedMachine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/prepared-machine",
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

    preparedMachines.getPreparedMachine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/prepared-machine/" + id,
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

    preparedMachines.updatePreparedMachine = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/prepared-machine",
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

    preparedMachines.deletePreparedMachine = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/prepared-machine/" + id,
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
    preparedMachines.setPagination = function (totalPage) {
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
        preparedMachines.getAllPreparedMachines();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        preparedMachines.getAllPreparedMachines();
    });

    $("#selectLineSearch").change(function () {
        checkPagination = true;
        currentPage = 1;
        preparedMachines.getAllPreparedMachines();
    });

    $("#selectFactorySearch").change(function(){
        checkPagination = true;
        currentPage = 1;
        preparedMachines.getAllPreparedMachines();
    });

    preparedMachines.getAllPreparedMachines();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalPreparedMachine").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#txtMappingName").val() == "" || $("#selectMachine").val() == "" || $("#txtOrder").val() == "" ){
            alert("Please input the data!");
        } else {
            var dataMachineId = $("#selectMachine").find(':selected').data('id');
            var dataId = $("#selectLine").find(':selected').data('id');
            var data = {
                "DISPLAY_NAME"          :       $("#txtName").val(),
                "JOIN_NAME"             :       $("#selectLine").val()+"_"+dataMachineId,
                "LINE"                  :       dataId,
                "MACHINE"               :       $("#selectMachine").val(),
                "MAPPING_NAME"          :       $("#selectLine").val()+"_"+$("#txtMappingName").val(),
                "ORDER"                 :       $("#txtOrder").val()
            };
            preparedMachines.addPreparedMachine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalPreparedMachine").trigger("click");
                    checkPagination = true;
                    preparedMachines.getAllPreparedMachines();
                } else {
                    $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalPreparedMachine").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        preparedMachines.getPreparedMachine(id, function (response) {
            $("#txtName").val(response.DATA.DISPLAY_NAME),
            $("#txtMappingName").val(response.DATA.MAPPING_NAME),
            $("#selectLine").val(response.DATA.LINE),
            $("#selectMachine").val(response.DATA.MACHINE),
            $("#txtOrder").val(response.DATA.ORDER)
            $("#modalPreparedMachine").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectLine").val() == "" || $("#txtMappingName").val() == "" || $("#selectMachine").val() == "" || $("#txtOrder").val() == "" ){
            alert("Please input the data!");
        } else {
            var dataMachineId = $("#selectMachine").find(':selected').data('id');
            var dataId = $("#selectLine").find(':selected').data('id');
            var data = {
                "DISPLAY_NAME"          :       $("#txtName").val(),
                "JOIN_NAME"             :       $("#selectLine").val()+"_"+dataMachineId,
                "LINE"                  :       dataId,
                "MACHINE"               :       $("#selectMachine").val(),
                "MAPPING_NAME"          :       $("#selectLine").val()+"_"+$("#txtMappingName").val(),
                "ORDER"                 :       $("#txtOrder").val(),
                "ID"                    :       id
            };
            preparedMachines.updatePreparedMachine(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalPreparedMachine").trigger("click");
                    checkPagination = true;
                    preparedMachines.getAllPreparedMachines();
                } else {
                    $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalPreparedMachine").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        preparedMachines.deletePreparedMachine(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalPreparedMachine").trigger("click");
                checkPagination = true;
                preparedMachines.getAllPreparedMachines();
            } else {
                $("#modalPreparedMachine").attr("data-toastr-notification", response.MESSAGE);
                $("#modalPreparedMachine").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
    var lineFlag = false;
    $("#lineSort").click(function () {
       if(lineFlag){
           sortBy = "1-A";
           preparedMachines.getAllPreparedMachines();
           lineFlag = false;
       }else{
           sortBy = "1-D";
           preparedMachines.getAllPreparedMachines();
           lineFlag = true;
       }
    });

    var nameFlag = false;
    $("#nameSort").click(function () {
        if(nameFlag){
            sortBy = "2-A";
            preparedMachines.getAllPreparedMachines();
            nameFlag = false;
        }else{
            sortBy = "2-D";
            preparedMachines.getAllPreparedMachines();
            nameFlag = true;
        }
    });
});