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
    errors.getAllErrorsByDepartmentAndClassification = function(){
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/error",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "department"            :   $("#selectDepartment").val(),
                "classification"        :   $("#selectClassification").val(),
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
                $("#selectDepartment").append("<option value='0'>부서</option>");
                $("#selectDepartmentForError").empty();
                $("#selectDepartmentForAssignment").empty();
                $("#selectDepartmentForError").append("<option value='0'>부서</option>");
                $("#selectDepartmentForAssignment").append("<option value='0'>부서</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectDepartmentForError").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectDepartmentForAssignment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    errors.getAllErrorCode = function(){
        $.ajax({
            url: "/v1/api/fukoku/error/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "department"    :   $("#selectDepartmentForAssignment").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectErrorForAssignment").empty();
                $("#selectErrorForAssignment").append("<option value='0'>고장</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectErrorForAssignment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    errors.getAllClassificationName = function(department, callback){
        $.ajax({
            url: "/v1/api/fukoku/category/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "department"    :   department,
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

    errors.getAllDepartmentName();
    // $("#selectDepartment").change(function(){
    //     errors.getAllClassificationName($("#selectDepartment").val(), function(response){
    //         $("#selectClassification").empty();
    //         $("#selectClassification").append("<option value='0'>관리항목</option>");
    //         if(response.CODE == "7777"){
    //             $.each(response.DATA, function(key, value){
    //                 $("#selectClassification").append("<option value="+value.ID+">"+value.NAME+"</option>");
    //             });
    //         }
    //     });
    //     checkPagination = true;
    //     currentPage = 1;
    //     errors.getAllErrorsByDepartmentAndClassification();
    // });

    $("#selectClassification").change(function(){
        checkPagination = true;
        currentPage = 1;
        errors.getAllErrorsByDepartmentAndClassification();
    });

    $("#selectDepartmentForError").change(function(){
        errors.getAllClassificationName($("#selectDepartmentForError").val(), function(response){
            $("#selectClassificationForError").empty();
            $("#selectClassificationForError").append("<option value='0'>관리항목</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectClassificationForError").append("<option value="+value.ID+">"+value.NAME+"</option>");
                });
            }
        });
    });

    $("#selectDepartmentForAssignment").change(function(){
        errors.getAllClassificationName($("#selectDepartmentForAssignment").val(), function(response){
            $("#selectClassificationForAssignment").empty();
            $("#selectClassificationForAssignment").append("<option value='0'>관리항목</option>");
            if(response.CODE == "7777"){
                $.each(response.DATA, function(key, value){
                    $("#selectClassificationForAssignment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                });
            }
        });
        errors.getAllErrorCode();
    });


    errors.addError = function(error, callback){
        $.ajax({
            url: "/v1/api/fukoku/error",
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

    errors.addErrorDetail = function(error, callback){
        $.ajax({
            url: "/v1/api/fukoku/error-detail",
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
            url: "/v1/api/fukoku/error/"+id,
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

    errors.updateError = function(error, callback){
        console.log(error);
        $.ajax({
            url: "/v1/api/fukoku/error",
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

    errors.deleteError = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/error-detail/"+id,
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
        errors.getAllErrorsByDepartmentAndClassification();
    });

    $("#PER_PAGE").change(function(){
        checkPagination = true;
        errors.getAllErrorsByDepartmentAndClassification();
    });

    errors.getAllErrorsByDepartmentAndClassification();

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
        if($("#txtCode").val() == "" || $("#txtName").val() == "" || $("#selectDepartmentForError").val() == "0" || $("#selectClassificationForError").val() == "0") {
            alert("Please input the data!");
        }else{
            var data = {
                "CODE"              :    $("#txtCode").val(),
                "NAME"              :    $("#txtName").val(),
                "REMARK"            :    $("#txtRemark").val(),
                "DEPARTMENT"        :    $("#selectDepartmentForError").val(),
                "CLASSIFICATION"    :    $("#selectClassificationForError").val()
            };
            errors.addError(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                    checkPagination = true;
                    errors.getAllErrorsByDepartmentAndClassification();
                } else {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                }
            });
        }
    });

    $("#btnSaveAssign").click(function(){
        if($("#selectClassificationForAssignment").val() == "0" || $("#selectErrorForAssignment").val() == "0") {
            alert("Please input the data!");
        }else{
            var data = {
                "CLASSIFICATION"     :    $("#selectClassificationForAssignment").val(),
                "ERROR"              :    $("#selectErrorForAssignment").val()
            };
            errors.addErrorDetail(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalAssignment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalAssignment").trigger("click");
                    checkPagination = true;
                    errors.getAllErrorsByDepartmentAndClassification();
                } else {
                    $("#modalAssignment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalAssignment").trigger("click");
                }
            });
        }
    });

    var id = 0;
    var detail = 0;
    $(document).on('click', '#btnEdit', function(){
        var token = $(this).parents("tr").data("id");
        var t = token.split(",");
        id = t[0];
        detail = t[1];
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        errors.getErrorById(id, function(response){
            $("#txtCode").val(response.DATA.CODE);
            $("#txtName").val(response.DATA.NAME);
            $("#txtRemark").val(response.DATA.REMARK);
            $("#selectDepartmentForError").val(response.DATA.DP_ID);
            errors.getAllClassificationName($("#selectDepartmentForError").val(), function(response1){
                $("#selectClassificationForError").empty();
                $("#selectClassificationForError").append("<option value='0'>분류선텐</option>");
                if(response1.CODE == "7777"){
                    $.each(response1.DATA, function(key, value){
                        $("#selectClassificationForError").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
                $("#selectClassificationForError").val(response.DATA.CF_ID);
            });
            $("#modalError").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function(){
        if($("#txtCode").val() == "" || $("#txtName").val() == "" || $("#selectDepartmentForError").val() == "0" || $("#selectClassificationForError").val() == "0") {
            alert("Please input the data!");
        }else {
            var data = {
                "CODE"              :    $("#txtCode").val(),
                "NAME"              :    $("#txtName").val(),
                "REMARK"            :    $("#txtRemark").val(),
                "DEPARTMENT"        :    $("#selectDepartmentForError").val(),
                "CLASSIFICATION"    :    $("#selectClassificationForError").val(),
                "ID"                :    detail,
                "DETAIL_ID"         :    id
            };
            errors.updateError(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                    checkPagination = true;
                    errors.getAllErrorsByDepartmentAndClassification();
                } else {
                    $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalError").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function(){
        $("#modalMessage").modal("show");
        var token = $(this).parents("tr").data("id");
        var t = token.split(",");
        id = t[0].trim();
    });

    $("#btnOk").click(function(){
        errors.deleteError(id, function(response){
            if(response.CODE=="0000"){
                $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                $("#modalError").trigger("click");
                checkPagination = true;
                errors.getAllErrorsByDepartmentAndClassification();
            }else{
                $("#modalError").attr("data-toastr-notification", response.MESSAGE);
                $("#modalError").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});