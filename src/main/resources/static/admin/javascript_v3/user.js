$(function () {

    var users = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

   /* users.getAllLinesName = function(){
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
                $("#selectLine").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                    $("#selectLine").append("<option value='Other'>Other</option>");
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };*/

    /*users.getAllDepartmentName = function(){
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
                $("#selectDepartmentSearch").empty();
                $("#selectDepartment").append("<option value=''>부서</option>");
                $("#selectDepartmentSearch").append("<option value=''>부서</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value="+value.NAME+">"+value.NAME+"</option>");
                        $("#selectDepartmentSearch").append("<option value="+value.NAME+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };*/

//    users.getAllLinesName();
//    users.getAllDepartmentName();

    //TODO: SERVER SIDE REQUEST
    users.getAllUsers = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/user",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "department"      :   $("#selectDepartmentSearch").val(),
                "filter"          :   $("#txtNameSearch").val(),
                "limit"           :   $("#PER_PAGE").val(),
                "page"            :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#USER").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 품종)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#USER_TEMPLATE").tmpl(response.DATA).appendTo("tbody#USER");
                        if (checkPagination) {
                            users.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#USER").html("<tr style='text-align:center;'><td colspan='13'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#USER").html("<tr style='text-align:center;'><td colspan='13'>콘텐츠 없음</td></tr>");
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

    users.addUser = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/user",
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

    users.getUser = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/user/" + id,
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

    users.updateUser = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/user",
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

    users.updateUserPassword = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/user/password",
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

    users.deleteUser = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/user/" + id,
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
    users.setPagination = function (totalPage) {
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
        users.getAllUsers();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        users.getAllUsers();
    });

    $("#btnSearch").click(function () {
        checkPagination = true;
        currentPage = 1;
        users.getAllUsers();
    });

    $("#selectDepartmentSearch").change(function () {
        checkPagination = true;
        currentPage = 1;
        users.getAllUsers();
    });

    users.getAllUsers();

    //TODO: View action
    $("#btnNew").click(function () {
        $("#txtPassword").prop('disabled', false);
        $("#txtConfirmPassword").prop('disabled', false);
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalUser").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtName").val() == "" ||  $("#selectMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"          :   $("#txtName").val(),
                "LINE"          :   1,//$("#selectLine").val(),
                "CELL_PHONE"    :   $("#txtCellPhone").val(),
                "DEPARTMENT"    :   1, //$("#selectDepartment").val(),
                "EMAIL"         :   $("#txtEmail").val(),
                "E_ID"          :   $("#txtEmployeeId").val(),
                "PHONE"         :   $("#txtPhone").val(),
                "PASSWORD"      :   $("#txtPassword").val(),
                "POSITION"      :   $("#selectPosition").val(),
                "ROLE"          :   $("#selectRole").val(),
                "STATUS"        :   $("#selectStatus").val()
            }
            users.addUser(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUser").trigger("click");
                    checkPagination = true;
                    users.getAllUsers();
                } else {
                    $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUser").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        $("#txtPassword").prop('disabled', true);
        $("#txtConfirmPassword").prop('disabled', true);
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        users.getUser(id, function (response) {
            $("#txtEmployeeId").val(response.DATA.E_ID);
            $("#txtEmail").val(response.DATA.EMAIL);
            $("#txtCellPhone").val(response.DATA.CELL_PHONE);
            $("#txtPhone").val(response.DATA.PHONE);
            $("#txtName").val(response.DATA.NAME);
            $("#selectPosition").val(response.DATA.POSITION);
            $("#selectRole").val(response.DATA.ROLE);
            $("#selectStatus").val(response.DATA.STATUS);
            $("#selectDepartment").val(response.DATA.DEPARTMENT);
            $("#selectLine").val(response.DATA.LINE);
            $("#modalUser").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtName").val() == "" || $("#selectMachine").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "NAME"          :   $("#txtName").val(),
                "LINE"          :   $("#selectLine").val(),
                "CELL_PHONE"    :   $("#txtCellPhone").val(),
                "DEPARTMENT"    :   $("#selectDepartment").val(),
                "EMAIL"         :   $("#txtEmail").val(),
                "E_ID"          :   $("#txtEmployeeId").val(),
                "PHONE"         :   $("#txtPhone").val(),
                "POSITION"      :   $("#selectPosition").val(),
                "ROLE"          :   $("#selectRole").val(),
                "STATUS"        :   $("#selectStatus").val(),
                "ID"            :   id
            }
            users.updateUser(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUser").trigger("click");
                    checkPagination = true;
                    users.getAllUsers();
                } else {
                    $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalUser").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function () {
        users.deleteUser(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                $("#modalUser").trigger("click");
                checkPagination = true;
                users.getAllUsers();
            } else {
                $("#modalUser").attr("data-toastr-notification", response.MESSAGE);
                $("#modalUser").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    $(document).on('click', '#btnPassword', function () {
        $("#modalUserChangedPassword").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnSaveChangedPassword").click(function () {
        if ($("#txtPasswordChanged").val() == "" || $("#txtConfirmPasswordChanged").val() == ""){
            alert("Please input the data!");
        } else {
            if($("#txtPasswordChanged").val() == $("#txtConfirmPasswordChanged").val()) {
                var data = {
                    "PASSWORD": $("#txtPasswordChanged").val(),
                };
                var data = {
                    "PASSWORD"  :   $("#txtPasswordChanged").val(),
                    "ID"        :   id
                };
                users.updateUserPassword(data, function (response) {
                    if (response.CODE == "0000") {
                        $("#modalUserChangedPassword").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalUserChangedPassword").trigger("click");
                        checkPagination = true;
                        users.getAllUsers();
                    } else {
                        $("#modalUserChangedPassword").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalUserChangedPassword").trigger("click");
                    }
                });
            }else{
                alert("Password and Confirm Password aren't match.");
            }
        }
    });
});