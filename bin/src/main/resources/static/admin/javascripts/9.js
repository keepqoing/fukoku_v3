$(function() {

    var fusePages = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    //TODO: TO FIND ALL GENERATION
    fusePages.getAllFuses = function(){
        $.ajax({
            url: "/v1/api/pcb/define-fuse",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "limit" : $("#PER_PAGE").val(),
                "page" : currentPage
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="0000"){
                    $("#FUSE").html("");
                    if(response.DATA.length > 0){
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("("+response.PAGINATION.TOTAL_COUNT+" Records)");
                        $.each(response.DATA, function(key,value){
                            response.DATA[key]["NO"] = (key+1)+((response.PAGINATION.PAGE-1) * response.PAGINATION.LIMIT);
                        });
                        $("#FUSE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#FUSE");
                        if(checkPagination){
                            fusePages.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination=false;
                        }
                    }else{
                        $("#FUSE").html("<tr style='text-align:center;'><td colspan='3'>NO CONTENT</td></tr>");
                        $("#PAGINATION").html("");
                    }
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    fusePages.getAllFuses();
    //TODO: TO SET THE PAGINATION FOR THE GENERATION
    fusePages.setPagination = function(totalPage){
        $('#PAGINATION').bootpag({
            total: totalPage,
            page: currentPage,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: 'First',
            last: 'Last',
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
        fusePages.getAllFuses();
    });

    //TODO: EVENT HANDLING ON THE PER PAGE CHANGE
    $("#PER_PAGE").change(function(){
        checkPagination = true;
        fusePages.getAllFuses();
    });

    $("#btnSearch").click(function(){
        checkPagination = true;
        currentPage = 1;
        fusePages.getAllFuses();
    });

    $("#btnAddNewView").click(function(){
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalFuseMgt").modal('show');

    });

	 $("#btnSave").click(function(){
		 var data = {
			 "AMOUNT"       :   $("#txtAmount").val(),
			 "DESCRIPTION"  :   $("#txtDescription").val()
		 };
		 fusePages.addFuse(data, function(response){
			 if(response.CODE=="0000"){
				 $("#txtDefault").val("");
				 $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
				 $("#modalFuseMgt").trigger("click");
				 checkPagination = true;
				 fusePages.getAllFuses();
			 }else{
				 $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
				 $("#modalFuseMgt").trigger("click");
			 }
	 	 });
	 });

    fusePages.getIdAndNameLocation = function(){
        $.ajax({
            url: "/v1/api/pcb/location/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $("#selectLocation").append("<option value=''>SELECT LOCATION</option>");
                if(response.DATA.length > 0){
                    $.each(response.DATA, function(key, value){
                        $("#selectLocation").append("<option value="+value.ID+">"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    fusePages.getIdAndNameLocation();

    var id = 0;
    $(document).on('click', '#btnDelete', function(){
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $("#btnOk").click(function(){
        fusePages.deleteFuse(id, function(response){
            if(response.CODE=="0000"){
                $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFuseMgt").trigger("click");
                checkPagination = true;
                fusePages.getAllFuses();
            }else{
                $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFuseMgt").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    $(document).on('click', '#btnEdit', function(){
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        fusePages.getFuse(id, function(response){
            $("#txtAmount").val(response.DATA.AMOUNT);
            $("#txtDescription").val(response.DATA.DESCRIPTION);
            $("#modalFuseMgt").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function(){
        var data = {
            "AMOUNT"        :    $("#txtAmount").val(),
            "DESCRIPTION"   :    $("#txtDescription").val(),
            "ID"            :    id
        };

        fusePages.updateFuse(data, function(response){
            if(response.CODE=="0000"){
                $("#txtAmount").val("");
                $("#txtDescription").val("");
                $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFuseMgt").trigger("click");
                checkPagination = true;
                fusePages.getAllFuses();
            }else{
                $("#modalFuseMgt").attr("data-toastr-notification", response.MESSAGE);
                $("#modalFuseMgt").trigger("click");
            }
        });
    });

    //TODO: AJAX CONNECTIVITY
    fusePages.addFuse = function(fuse, callback){
        $.ajax({
            url: "/v1/api/pcb/define-fuse",
            type: 'POST',
            dataType: 'JSON',
            data : JSON.stringify(fuse),
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

    fusePages.deleteFuse = function(id, callback){
        $.ajax({
            url: "/v1/api/pcb/define-fuse/"+id,
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

    fusePages.getFuse = function(id, callback){
        $.ajax({
            url: "/v1/api/pcb/define-fuse/"+id,
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

    fusePages.updateFuse = function(fuse, callback){
        $.ajax({
            url: "/v1/api/pcb/define-fuse",
            type: 'PUT',
            dataType: 'JSON',
            data : JSON.stringify(fuse),
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

});