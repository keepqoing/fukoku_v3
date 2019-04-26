$(function () {

    var summaryTreatment = {};
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    summaryTreatment.getAllName = function(callback){
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

    summaryTreatment.getAllName(function(){
        summaryTreatment.getAllTreatmentAndTreatmentDetail($('#selectDepartment').val());
    });

    $('#selectDepartment').change(function () {
        summaryTreatment.getAllTreatmentAndTreatmentDetail($('#selectDepartment').val());
    });

    //TODO: SERVER SIDE REQUEST
    summaryTreatment.getAllTreatmentAndTreatmentDetail = function (id) {
        console.log("id = " + id);
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/treatment/table/"+id,
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {

                if (response.CODE == "7777") {
                    $("#SUMMARY_TREATMENT").html("");

                    if (response.DATA.length > 0) {

                        $("#SUMMARY_TREATMENT_TEMPLATE").tmpl(response).appendTo("tbody#SUMMARY_TREATMENT");

                        console.log(response);
                    } else {
                        $("#SUMMARY_TREATMENT").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#SUMMARY_TREATMENT").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
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
            var errorId = $(this).parents('tr').children().eq(0).data('id');
            var treatmentId = $(this).parents('tbody').children().eq(0).children().eq($(this).parents('td').index()).data('id');

            var data = {
                "ERROR"     :    errorId,
                "TREATMENT" :    treatmentId
            };


            summaryTreatment.addTreatmentDetail(data, function (response) {});
        }else{
            var detailId = $(this).data('id');
            summaryTreatment.deleteTreatment(detailId, function(response){});
        }
    });

    summaryTreatment.addTreatmentDetail = function(treatment, callback){
        $.ajax({
            url: "/v1/api/fukoku/treatment-detail",
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

    summaryTreatment.deleteTreatment = function(id, callback){
        $.ajax({
            url: "/v1/api/fukoku/treatment-detail/"+id,
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