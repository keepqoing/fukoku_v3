/*
$(function(){
    productDefect = {};

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    productDefect.getData = function(){
        var startTime = $('#startTime input').val();
        var endTime =$('#endTime input').val();
        $.ajax({
            url: "/v1/api/fukoku/productDefectDetail/find-Product-Defect-Detail",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "startTime":startTime,
                "endTime":endTime
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#tableData').find("tr:gt(2)").remove();

                //response.Data.ge
                //console.log(response.data.)
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
})*/



var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    $scope.data;
    $scope.error_names;
    $scope.count_errrors;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    productDefect = {};

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $scope.findAllProducts = function(){
        openLoading();
        var startTime = $('#startTime input').val();
        var endTime =$('#endTime input').val();
        var post = $http({
            /*method: "GET",
            url: "/v1/api/fukoku/productDefectDetail/find-Product-Defect-Detail/"+startTime+"/"+endTime,
            */
            method: "POST",
            url: "/v1/api/fukoku/daily-mstate-analysis/process-defect-period-status",
            dataType: 'json',
            data: JSON.stringify({
                "line"          :   "",
                "machine"       :  "",
                "start_date"     :  startTime,
                "end_date"       :   endTime
            }),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            $("#pieChart2").empty();
            $("#pieChart3").empty();
            console.log("data",response);
            $scope.data = response.daily_mstate_analysis;
            $scope.error_names = response.error_names;
            $scope.count_errrors  = response.count_errrors;
            let contentArr = [];
            for (var i = 0; i < response.daily_mstate_analysis.length; i++) {
                let contentObj = {};
                contentObj.label = response.daily_mstate_analysis[i].line;
                contentObj.value = response.daily_mstate_analysis[i].total_product;
                contentArr.push(contentObj);
            }
            var pie = new d3pie("pieChart2", {
                "data": {
                    "content":contentArr
                },
                "size": {

                    "canvasHeight": 280,
                    "canvasWidth": 350
                }
            });
            if($scope.count_errrors.length > 0 ){
                let contentArr3 = [];
                for (var i = 0; i < response.count_errrors.length; i++) {
                    let contentObj = {};
                    contentObj.label = response.count_errrors[i].error;
                    contentObj.value = response.count_errrors[i].count_error;
                    contentArr3.push(contentObj);
                }
                var pie = new d3pie("pieChart3", {
                    "data": {
                        "content":contentArr3
                    },
                    "size": {

                        "canvasHeight": 280,
                        "canvasWidth": 350
                    }
                });
            }else {
                $("#pieChart3").text("No data");
            }


            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });
    }
    productDefect.getAllData = function () {
        $scope.findAllProducts();
    }
});
