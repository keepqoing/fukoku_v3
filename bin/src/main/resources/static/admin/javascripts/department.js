$(function() {

    var departments = {};
    var checkPagination = true;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });
    //TODO: SERVER SIDE REQUEST
    departments.getAllDepartments = function(){
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/department",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#DEPARTMENT").html("");
                    if(response.DATA.length > 0){
                        var no = 1;
                        $.each(response.DATA, function(key,value){
                            response.DATA[key]["NO"] = no;
                            no++;
                        });
                        $("#DEPARTMENT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#DEPARTMENT");
                    }else{
                        $("#DEPARTMENT").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                    }
                }
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    departments.getAllDepartments();

    departments.addDepartment = function(department, callback){
        $.ajax({
            url: "/v1/api/fukoku/department",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(department),
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

    departments.getDepartmentById = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/department/"+id,
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

    departments.updateDepartment = function(department, callback){
        $.ajax({
            url: "/v1/api/fukoku/department",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(department),
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

    departments.deleteDepartment = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/department/"+id,
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

    //TODO: View action
    $("#btnNew").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalDepartment").modal('show');
    });

    $("#btnSave").click(function(){
        if($("#txtDepartmentCode").val() == "" || $("#txtDepartmentName").val() == "") {
            alert("Please input the data!");
        }else{
            var data = {
                "CODE"      :   $("#txtDepartmentCode").val(),
                "NAME"      :   $("#txtDepartmentName").val(),
                "REMARK"    :   $("#txtDepartmentDescription").val(),
                "ORDER"     :   $("#txtOrder").val()
            };
            departments.addDepartment(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalDepartment").trigger("click");
                    departments.getAllDepartments();
                } else {
                    $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalDepartment").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        departments.getDepartmentById(id, function(response){
            $("#txtDepartmentCode").val(response.DATA.CODE);
            $("#txtDepartmentName").val(response.DATA.NAME);
            $("#txtDepartmentDescription").val(response.DATA.REMARK);
            $("#txtOrder").val(response.DATA.ORDER);
            $("#modalDepartment").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function(){
        if($("#txtDepartmentCode").val() == "" || $("#txtDepartmentName").val() == "") {
            alert("Please input the data!");
        }else {
            var data = {
                "CODE"      :   $("#txtDepartmentCode").val(),
                "NAME"      :   $("#txtDepartmentName").val(),
                "REMARK"    :   $("#txtDepartmentDescription").val(),
                "ORDER"     :   $("#txtOrder").val(),
                "ID"        :   id
            };
            departments.updateDepartment(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalDepartment").trigger("click");
                    departments.getAllDepartments();
                } else {
                    $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalDepartment").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function(){
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function(){
        departments.deleteDepartment(id, function(response){
            if(response.CODE=="0000"){
                $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                $("#modalDepartment").trigger("click");
                checkPagination = true;
                departments.getAllDepartments();
            }else{
                $("#modalDepartment").attr("data-toastr-notification", response.MESSAGE);
                $("#modalDepartment").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });
});