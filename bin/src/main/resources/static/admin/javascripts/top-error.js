$(function() {

    var errors = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });
    //TODO: SERVER SIDE REQUEST
    errors.getAllTopErrors = function(){
        openLoading();
        var d = $("#selectDepartment option:selected").text().trim();
        if(d== '부서')
            d = '';
        $.ajax({
            url: "/v1/api/fukoku/top-error",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "departmentName"        :   d,
                "limit"                 :   $("#PER_PAGE").val(),
                "page"                  :   currentPage
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#ERROR").html("");
                    if(response.DATA.length > 0){
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("("+response.PAGINATION.TOTAL_COUNT+" 기록)");
                        $.each(response.DATA, function(key,value){
                            response.DATA[key]["NO"] = (key+1)+((response.PAGINATION.PAGE-1) * response.PAGINATION.LIMIT);
                        });
                        $("#ERROR_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ERROR");
                        if(checkPagination){
                            errors.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination=false;
                        }
                    }else{
                        $("#ERROR").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                        $("#limitPage").html(0);
                        $("#totalPage").html(0);
                        $("#totalRecords").html("("+0+" 기록)");
                    }
                }else{
                    $("#ERROR").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("("+0+" 기록)");
                }
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    $("#selectDepartment").change(function(){
        errors.getAllTopErrors();
    });

    errors.getAllDepartmentName = function(){
        $.ajax({
            url: "/v1/api/fukoku/department/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectDepartment").empty();
                $("#selectDepartment").append("<option value=''>부서</option>");
                $("#selectDepartmentForError").empty();
                $("#selectDepartmentForError").append("<option value=''>부서</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value='"+value.ID+"'>"+value.NAME+"</option>");
                        $("#selectDepartmentForError").append("<option value='"+value.ID+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    errors.getAllDepartmentName();

    errors.addError = function(error, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-error",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(error),
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

    errors.getErrorById = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-error/"+id,
            type: 'GET',
            dataType: 'JSON',
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
    }

    errors.deleteError = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-error/"+id,
            type: 'DELETE',
            dataType: 'JSON',
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
    }

    errors.updateError = function(error, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-error",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(error),
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
    }

    //TODO: PAGINATION
    errors.setPagination = function(totalPage){
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

    $("#PAGINATION").on("page", function(event, page){
        checkPagination = false;
        currentPage = page;
        errors.getAllTopErrors();
    });

    $("#PER_PAGE").change(function(){
        checkPagination = true;
        errors.getAllTopErrors();
    });

    errors.getAllTopErrors();

    //TODO: View action
    $("#btnNew").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalError").modal('show');
    });

    $("#btnAssign").click(function(){
        location.href = "/admin/summary-error";
    });

    $("#btnSave").click(function(){
        if($("#txtCode").val() == "" || $("#txtName").val() == "" || $("#selectDepartmentForError").val() == "") {
            alert("Please input the data!");
        }else{
            var data = {
                "ERROR_CODE"        :    $("#txtCode").val(),
                "ERROR_NAME"        :    $("#txtName").val(),
                "REMARK"            :    $("#txtRemark").val(),
                "DEPARTMENT"        :    $("#selectDepartmentForError").val(),
            };
            errors.addError(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                    checkPagination = true;
                    errors.getAllTopErrors();
                } else {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        errors.getErrorById(id, function(response){
            $("#txtCode").val(response.DATA.ERROR_CODE);
            $("#txtName").val(response.DATA.ERROR_NAME);
            $("#txtRemark").val(response.DATA.REMARK);
            $("#selectDepartmentForError").val(response.DATA.DEPARTMENT);
            $("#modalError").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function(){
        if($("#txtCode").val() == "" || $("#txtName").val() == "" || $("#selectDepartmentForError").val() == "0" || $("#selectClassificationForError").val() == "0") {
            alert("Please input the data!");
        }else {
            var data = {
                "ERROR_CODE"        :    $("#txtCode").val(),
                "ERROR_NAME"        :    $("#txtName").val(),
                "REMARK"            :    $("#txtRemark").val(),
                "DEPARTMENT"        :    $("#selectDepartmentForError").val(),
                "ID"                :    id,
            };
            errors.updateError(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                    checkPagination = true;
                    errors.getAllTopErrors();
                } else {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function(){
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function(){
        errors.deleteError(id, function(response){
            if(response.CODE=="0000"){
                $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                $("#modalError").trigger("click");
                checkPagination = true;
                errors.getAllTopErrors();
            }else{
                $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                $("#modalError").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});