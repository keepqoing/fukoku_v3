$(function() {

    var categoryItems = {};
    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    categoryItems.getAllName = function(){
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
                $("#selectDepartmentForClassification").empty();
                $("#selectDepartmentForItem").empty();
                $("#selectDepartment").append("<option value='0'>부서</option>");
                $("#selectDepartmentForClassification").append("<option value='0'>부서</option>");
                $("#selectDepartmentForItem").append("<option value='0'>부서</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectDepartmentForClassification").append("<option value="+value.ID+">"+value.NAME+"</option>");
                        $("#selectDepartmentForItem").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    categoryItems.getAllClassificationName = function(callback){
        $.ajax({
            url: "/v1/api/fukoku/category/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "department"      :     $("#selectDepartmentForItem").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectClassificationForItem").empty();
                $("#selectClassificationForItem").append("<option value='0'>분류</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectClassificationForItem").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
                if(callback){
                    callback();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    //TODO: SERVER SIDE REQUEST
    categoryItems.getAllCategoryItems = function(fnCallback){
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/category",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "department"    :   $("#selectDepartment").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#CATEGORY_ITEM").html("");
                    if(response.DATA.length > 0){
                        var no = 0;
                        $.each(response.DATA, function(key,value){
                            if(response.DATA[key]["STATUS"] == 1) {
                                no++
                            }
                            response.DATA[key]["NO"] = no;
                        });
                        $("#CATEGORY_ITEM_TEMPLATE").tmpl(response.DATA).appendTo("tbody#CATEGORY_ITEM");
                    }else{
                        $("#CATEGORY_ITEM").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                    }
                }else{
                    $("#CATEGORY_ITEM").html("<tr style='text-align:center;'><td colspan='5'>콘텐츠 없음</td></tr>");
                }
                if(fnCallback){
                    fnCallback();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    categoryItems.getAllName();
    categoryItems.getAllCategoryItems(function(){
            $('.tree').treegrid();
            $('.tree').treegrid('collapseAll');
            closeLoading();
    });

    $("#selectDepartmentForItem").change(function(){
        categoryItems.getAllClassificationName();
    });

    $("#selectDepartment").change(function(){
        categoryItems.getAllCategoryItems(function(){
            $('.tree').treegrid();
            $('.tree').treegrid('collapseAll');
            closeLoading();
        });
    });


    categoryItems.addCategoryItem = function(categoryItem, callback){
        $.ajax({
            url: "/v1/api/fukoku/category",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(categoryItem),
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

    categoryItems.getCategoryItemById = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/category/"+id,
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

    categoryItems.updateCategoryItem = function(categoryItem, callback){
        $.ajax({
            url: "/v1/api/fukoku/category",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(categoryItem),
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

    categoryItems.deleteCategoryItem = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/category/"+id,
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

    categoryItems.addItem = function(item, callback){
        $.ajax({
            url: "/v1/api/fukoku/item",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(item),
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

    categoryItems.getItemById = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/item/"+id,
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

    categoryItems.updateItem = function(item, callback){
        $.ajax({
            url: "/v1/api/fukoku/item",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(item),
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

    categoryItems.deleteItem = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/item/"+id,
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
    $("#btnNewClassification").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdateClassification").hide();
        $("#btnSaveClassification").show();
        $("#modalClassification").modal('show');
    });

    $("#btnNewItem").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdateItem").hide();
        $("#btnSaveItem").show();
        $("#modalItem").modal('show');
    });

    $("#btnSaveClassification").click(function(){
        if($("#txtCategoryCode").val() == "" || $("#txtCategoryName").val() == "" || $("#selectDepartmentForClassification").val() == '0') {
            alert("Please input the data!");
        }else{
            var data = {
                "CODE"      :   $("#txtClassificationCode").val(),
                "NAME"      :   $("#txtClassificationName").val(),
                "REMARK"    :   $("#txtClassificationRemark").val(),
                "PARENT"    :   $("#selectDepartmentForClassification").val(),
                "ORDER"     :   0
            };
            categoryItems.addCategoryItem(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalClassification").trigger("click");
                    categoryItems.getAllCategoryItems(function(){
                        $('.tree').treegrid();
                        $('.tree').treegrid('collapseAll');
                        closeLoading();
                    });
                } else {
                    $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalClassification").trigger("click");
                }
            });
        }
    });

    $("#btnSaveItem").click(function(){
        if($("#txtItemCode").val() == "" || $("#txtItemName").val() == "" || $("#selectDepartmentForItem").val() == '0' || $("#selectClassificationForItem").val() == '0') {
            alert("Please input the data!");
        }else{
            var data = {
                "CODE"              :   $("#txtItemCode").val(),
                "NAME"              :   $("#txtItemName").val(),
                "REMARK"            :   $("#txtItemRemark").val(),
                "DEPARTMENT"        :   $("#selectDepartmentForItem").val(),
                "CLASSIFICATION"    :   $("#selectClassificationForItem").val()
            };
            categoryItems.addItem(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalItem").trigger("click");
                    categoryItems.getAllCategoryItems(function(){
                        $('.tree').treegrid();
                        $('.tree').treegrid('collapseAll');
                        closeLoading();
                    });
                } else {
                    $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalItem").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEditClassification', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSaveClassification").hide();
        $("#btnSaveUpdateClassification").show();
        categoryItems.getCategoryItemById(id, function(response){
            $("#txtClassificationCode").val(response.DATA.CODE);
            $("#txtClassificationName").val(response.DATA.NAME);
            $("#txtClassificationRemark").val(response.DATA.REMARK);
            $("#selectDepartmentForClassification").val(response.DATA.PARENT);
            //$("#txtOrder").val(response.DATA.ORDER);
            $("#modalClassification").modal("show");
        });
    });

    $(document).on('click', '#btnEditItem', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSaveItem").hide();
        $("#btnSaveUpdateItem").show();
        categoryItems.getItemById(id, function(response){
            $("#txtItemCode").val(response.DATA.CODE);
            $("#txtItemName").val(response.DATA.NAME);
            $("#txtItemRemark").val(response.DATA.REMARK);
            $("#selectDepartmentForItem").val(response.DATA.REF_PARENT);
            categoryItems.getAllClassificationName(function(){
                $("#selectClassificationForItem").val(response.DATA.DEP_OF_CAT);
            });
            $("#modalItem").modal("show");
        });
    });

    $("#btnSaveUpdateClassification").click(function(){
        if($("#txtCategoryItemCode").val() == "" || $("#txtCategoryItemName").val() == "") {
            alert("Please input the data!");
        }else {
            var data = {
                "CODE"      :   $("#txtClassificationCode").val(),
                "NAME"      :   $("#txtClassificationName").val(),
                "REMARK"    :   $("#txtClassificationRemark").val(),
                "PARENT"    :   $("#selectDepartmentForClassification").val(),
                "ORDER"     :   0,
                "ID"        :   id
            };
            categoryItems.updateCategoryItem(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalClassification").trigger("click");
                    categoryItems.getAllCategoryItems(function(){
                        $('.tree').treegrid();
                        $('.tree').treegrid('collapseAll');
                        closeLoading();
                    });
                } else {
                    $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalClassification").trigger("click");
                }
            });
        }
    });

    $("#btnSaveUpdateItem").click(function(){
        if($("#txtItemCode").val() == "" || $("#txtItemName").val() == "" || $("#selectDepartmentForItem").val() == '0' || $("#selectClassificationForItem").val() == '0') {
            alert("Please input the data!");
        }else {
            var data = {
                "CODE"              :   $("#txtItemCode").val(),
                "NAME"              :   $("#txtItemName").val(),
                "REMARK"            :   $("#txtItemRemark").val(),
                "DEPARTMENT"        :   $("#selectDepartmentForItem").val(),
                "CLASSIFICATION"    :   $("#selectClassificationForItem").val(),
                "ID"                :   id
            };
            categoryItems.updateItem(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalItem").trigger("click");
                    categoryItems.getAllCategoryItems(function(){
                        $('.tree').treegrid();
                        $('.tree').treegrid('collapseAll');
                        closeLoading();
                    });
                } else {
                    $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalItem").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDeleteClassification', function(){
        $("#modalMessageClassification").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $(document).on('click', '#btnDeleteItem', function(){
        $("#modalMessageItem").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOkClassification").click(function(){
        categoryItems.deleteCategoryItem(id, function(response){
            if(response.CODE=="0000"){
                $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                $("#modalClassification").trigger("click");
                categoryItems.getAllCategoryItems(function(){
                    $('.tree').treegrid();
                    $('.tree').treegrid('collapseAll');
                    closeLoading();
                });
            }else{
                $("#modalClassification").attr("data-toastr-notification", response.MESSAGE);
                $("#modalClassification").trigger("click");
            }
        });
        $("#modalMessageClassification").modal("hide");
    });

    $("#btnOkItem").click(function(){
        categoryItems.deleteItem(id, function(response){
            if(response.CODE=="0000"){
                $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                $("#modalItem").trigger("click");
                categoryItems.getAllCategoryItems(function(){
                    $('.tree').treegrid();
                    $('.tree').treegrid('collapseAll');
                    closeLoading();
                });
            }else{
                $("#modalItem").attr("data-toastr-notification", response.MESSAGE);
                $("#modalItem").trigger("click");
            }
        });
        $("#modalMessageItem").modal("hide");
    });
});