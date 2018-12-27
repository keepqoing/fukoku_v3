$(function () {

    var summaryError = {};
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    summaryError.getAllName = function(callback){
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
                /*$("#selectDepartment").empty();
                $("#selectDepartment").append("<option value='1'>부서</option>");*/
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectDepartment").append("<option value="+value.ID+">"+value.NAME+"</option>");
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

    summaryError.getAllName(function(){
        summaryError.getAllErrorAndErrorDetail($('#selectDepartment').val());
    });

    $('#selectDepartment').change(function () {
        summaryError.getAllErrorAndErrorDetail($('#selectDepartment').val());
    });

    //TODO: SERVER SIDE REQUEST
    summaryError.getAllErrorAndErrorDetail = function (id) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/error/table/"+id,
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#SUMMARY_ERROR").html("");
                    if (response.DATA.length > 0) {
                        $("#SUMMARY_ERROR_TEMPLATE").tmpl(response).appendTo("tbody#SUMMARY_ERROR");
                    } else {
                        $("#SUMMARY_ERROR").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#SUMMARY_ERROR").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    $(document).on('change', '.chk', function(){
        if(this.checked) {
            var cfId = $(this).parents('tr').children().eq(0).data('id');
            var errorId = $(this).parents('tbody').children().eq(0).children().eq($(this).parents('td').index()).data('id');
            var data = {
                "CLASSIFICATION"     :    cfId,
                "ERROR"              :    errorId
            };
            summaryError.addErrorDetail(data, function (response) {});
        }else{
            var detailId = $(this).data('id');
            summaryError.deleteError(detailId, function(response){});
        }
    });

    summaryError.addErrorDetail = function(error, callback){
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

    summaryError.deleteError = function(id, callback){
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
});