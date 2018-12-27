$(function() {

    var workpiece = {};

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    workpiece.findAllProductByLine = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/workpiece/find-all-product",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("All",response);
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                if(response.code == "7777"){
                    $.each(response.products, function(key, value){
                        $("#selectProduct").append("<option value="+NAME.MAPPING_NAME+">"+value.NAME+"</option>");
                    });
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    workpiece.findProductByLine = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/workpiece/find-product/"+line+"/"+machine,
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                $('#lineList').empty();
                if(response.products.length > 0){
                        console.log("By line",response);

                    $('#selectProduct').empty();
                    $("#selectProduct").append("<option value=''>품종</option>");
                    if(response.code == "7777"){
                        for(var i=0;i<response.products.length;i++){
                            $("#selectProduct").append("<option value="+response.products[i].NAME+">"+response.products[i].NAME+"</option>");
                        }
                        $("#selectProduct").append("<option value='Unknown'>Unknown</option>");
                    }

                }else{
                    workpiece.findAllProductByLine();
                    // find all prodcudct
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };


    workpiece.findProductByLine();























});