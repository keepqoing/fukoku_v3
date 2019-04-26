$(function() {

    var treatments = {};
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
    treatments.getAllTreatments = function(){
        openLoading();
        var d = $("#selectDepartment option:selected").text().trim();
        if(d== '부서')
            d = '';
        $.ajax({
            url: "/v1/api/fukoku/top-treatment",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "departmentName"    :   d,
                "limit"                 :   $("#PER_PAGE").val(),
                "page"                  :   currentPage
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#TREATMENT").html("");
                    if(response.DATA.length > 0){
                        // var no = 1;
                        // $.each(response.DATA, function(key,value){
                        //     response.DATA[key]["NO"] = no;
                        //     no++;
                        // });

                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("("+response.PAGINATION.TOTAL_COUNT+" 기록)");
                        $.each(response.DATA, function(key,value){
                            response.DATA[key]["NO"] = (key+1)+((response.PAGINATION.PAGE-1) * response.PAGINATION.LIMIT);
                        });

                        $("#TREATMENT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#TREATMENT");

                        if(checkPagination){
                            treatments.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination=false;
                        }

                    }else{
                        $("#TREATMENT").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                        $("#limitPage").html(0);
                        $("#totalPage").html(0);
                        $("#totalRecords").html("("+0+" 기록)");
                    }
                }else{
                    $("#TREATMENT").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
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
        treatments.getAllTreatments();
    });

    treatments.getAllDepartmentName = function(){
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
                $("#selectDepartmentForTreatment").empty();
                $("#selectDepartmentForTreatment").append("<option value='0'>부서</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectDepartmentForTreatment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    treatments.getAllDepartmentName();
    // treatments.getAllTreatments();


    treatments.addTreatment = function(treatment, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-treatment",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(treatment),
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

    treatments.getTreatmentById = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-treatment/"+id,
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

    treatments.deleteTreatment = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-treatment/"+id,
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

    treatments.updateTreatment = function(treatment, callback){
        $.ajax({
            url: "/v1/api/fukoku/top-treatment",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(treatment),
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
    treatments.setPagination = function(totalPage){
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
        treatments.getAllTreatments();
    });

    $("#PER_PAGE").change(function(){
        checkPagination = true;
        treatments.getAllTreatments();
    });

    treatments.getAllTreatments();


    //TODO: View action
    $("#btnNew").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalTreatment").modal('show');
    });

    $("#btnAssign").click(function(){
        window.location.href = '/admin/summary-treatment';
    });


    $("#btnSave").click(function(){
        if($("#txtTreatmentCode").val() == "" || $("#txtTreatmentName").val() == "" || $("#selectDepartmentForTreatment").val() == "0") {
            alert("Please input the data!");
        }else{
            var data = {
                "TREATMENT_CODE"          :   $("#txtTreatmentCode").val(),
                "TREATMENT_NAME"          :   $("#txtTreatmentName").val(),
                "DESCRIPTION"        :   $("#txtTreatmentRemark").val(),
                "DEPARTMENT"    :   $("#selectDepartmentForTreatment").val()
            };
            treatments.addTreatment(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalTreatment").trigger("click");
                    treatments.getAllTreatments();
                } else {
                    $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalTreatment").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        treatments.getTreatmentById(id, function(response){
            $("#txtTreatmentCode").val(response.DATA.TREATMENT_CODE);
            $("#txtTreatmentName").val(response.DATA.TREATMENT_NAME);
            $("#txtTreatmentRemark").val(response.DATA.DESCRIPTION);
            $("#selectDepartmentForTreatment").val(response.DATA.DEPARTMENT);
            $("#modalTreatment").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function(){
        if($("#txtTreatmentCode").val() == "" || $("#txtTreatmentName").val() == "" || $("#selectDepartmentForTreatment").val() == "0") {
            alert("Please input the data!");
        }else {
            var data = {
                "TREATMENT_CODE"          :   $("#txtTreatmentCode").val(),
                "TREATMENT_NAME"          :   $("#txtTreatmentName").val(),
                "DESCRIPTION"        :   $("#txtTreatmentRemark").val(),
                "DEPARTMENT"    :   $("#selectDepartmentForTreatment").val(),
                "ID"            :   id
            };
            treatments.updateTreatment(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalTreatment").trigger("click");
                    treatments.getAllTreatments();
                } else {
                    $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalTreatment").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function(){
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function(){
        treatments.deleteTreatment(id, function(response){
            if(response.CODE=="0000"){
                $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                $("#modalTreatment").trigger("click");
                treatments.getAllTreatments();
            }else{
                $("#modalTreatment").attr("data-toastr-notification", response.MESSAGE);
                $("#modalTreatment").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });


});