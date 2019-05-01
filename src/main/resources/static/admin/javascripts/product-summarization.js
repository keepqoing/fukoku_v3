$(function () {

    /*require("static/admin/javascripts/d3/d3");*/

    var productSummarization = {};

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    /*products.getAllLinesName = function(){
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
                console.log(response);
                $('#selectLine').empty();
                $("#selectLine").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };*/

    // productSummarization.productPie1 = function () {

        /**
         * NG PRODUCT AND DEFECTIVE PRODUCT
         *
         * NOT GOOD PRODUCT
         */
        /*
        new d3pie("product-pie1", {
            "data": {
                "content": [

                    {"label":"PA","value":200},
                    {"label":"PD", "value":250},
                    {"label":"HA", "value":50},
                    {"label":"HD", "value":20},
                    {"label":"IB", "value":10},
                    {"label":"AA", "value":20},
                    {"label":"AB", "value":55},
                    {"label":"PC", "value":120},
                    {"label":"VA", "value": 30}

                ]
            },
            "size": {

                "canvasHeight": 350,
                "canvasWidth": 350

            },
            header: {
                title: {
                    text:     "Not Good Product",
                    color:    "#333333",
                    fontSize: 18,
                    font:     "arial"
                },
                location: "top-center",
            },
        });
*/
        /**
         * DEFECTIVE PRODUCT
         */
        /*
        new d3pie("product-pie2", {
            "data": {
                "content": [

                    {"label":"PA","value":200},
                    {"label":"PD", "value":250},
                    {"label":"HA", "value":50},
                    {"label":"HD", "value":20},
                    {"label":"IB", "value":10},
                    {"label":"AA", "value":20},
                    {"label":"AB", "value":55},
                    {"label":"PC", "value":120},
                    {"label":"VA", "value": 30}

                ]
            },
            "size": {

                "canvasHeight": 350,
                "canvasWidth": 350

            },
            header: {
                title: {
                    text:     "Defective Product",
                    color:    "#333333",
                    fontSize: 18,
                    font:     "arial"
                },
                location: "top-center",
            },
        });
        */
        /**
         * GOOD PRODUCT
         */
        /*
        new d3pie("product-pie3", {
            "data": {
                "content": [

                    {"label":"PA","value":200},
                    {"label":"PD", "value":250},
                    {"label":"HA", "value":50},
                    {"label":"HD", "value":20},
                    {"label":"IB", "value":10},
                    {"label":"AA", "value":20},
                    {"label":"AB", "value":55},
                    {"label":"PC", "value":120},
                    {"label":"VA", "value": 30}

                ]
            },
            "size": {

                "canvasHeight": 350,
                "canvasWidth": 500

            },
            header: {
                title: {
                    text:     "Good Product",
                    color:    "#333333",
                    fontSize: 18,
                    font:     "arial"
                },
                location: "top-center",
            },
        });
        */

        /**
         * Group barchart for line
         */
        /*
        var settings = {
            selector: "#product-line-group-barchart",
            height: 350,
            width: document.getElementById("div-product-line-canvas").offsetWidth - 60
        }
        */

        // var data = [
        //     {
        //     "categorie":"IB", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     },
        //     {
        //         "categorie":"HA", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     },
        //     {
        //         "categorie":"HB", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     },
        //     {
        //         "categorie":"HC", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     },
        //     {
        //         "categorie":"HD", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     },
        //     {
        //         "categorie":"PD", "values":[
        //         {"value":100, "rate": "3"},
        //         {"value":200, "rate": "4"},
        //         {"value":300, "rate": "5"}
        //         ]
        //     }
        // ];
        // groupBarchart(data, settings);

        /**
         * Group barchart for machine
         */
        /*
        var settings1 = {
            selector: "#product-machine-group-barchart",
            height: 350,
            width: document.getElementById("div-product-machine-canvas").offsetWidth - 50
        }
        groupBarchart(data, settings1);
    }
    */
    // productSummarization.productPie1();

    //btnGetMachine
    $("#btnGetMachine").click(function (){
        if($("#txtStartTime").val()=="" ){
            alert("Input data");
        }else {
            productSummarization.getAllProductByMachine();

        }
    });

    productSummarization.getAllProductByMachine = function () {


        $.ajax({
            url: "/v1/api/fukoku/product_status_freq/graph-by-machine",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtStartTime").val(),
                "machine"       :   $("#selectMachine").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#product-machine-group-barchart").html("");

                    console.log(response);

                    if (response.DATA.length > 0) {
                            if(response.DATA[0].values[0].value > 0) {
                                var settings = {
                                    selector: "#product-machine-group-barchart",
                                    height: 350,
                                    width: document.getElementById("div-product-machine-canvas").offsetWidth - 60,
                                    y_text: "수량",
                                    x_text: "라인"

                                }
                                groupBarchart(response.DATA, settings);
                            }else{
                                $("#product-machine-group-barchart").html("<p style='clear:both; font-size:18px; text-align: center'>콘텐츠 없음</p>");
                            }
                    }else{
                        $("#product-machine-group-barchart").html("<p style='clear:both; font-size:18px; text-align: center'>콘텐츠 없음</p>");
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    // ======= Chart 2: Get machine info by Line

    $("#btnGetLine").click(function (){
        if($("#txtLineStartTime").val()=="" ){
            alert("Input data");
        }else {
            productSummarization.getAllProductByLine();

        }
    });

    productSummarization.getAllProductByLine = function () {
        $.ajax({
            url: "/v1/api/fukoku/product_status_freq/graph-by-line",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtLineStartTime").val(),
                "line"       :   $("#selectLine").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {

                if (response.CODE == "7777") {
                    $("#product-line-group-barchart").html("");


                    if (response.DATA.length > 0) {
                        if(response.DATA[0].values[0].value > 0) {
                            var settings = {
                                selector: "#product-line-group-barchart",
                                height: 350,
                                width: document.getElementById("div-product-line-canvas").offsetWidth - 60,
                                y_text: "수량",
                                x_text: "설비"
                            }
                            groupBarchart(response.DATA, settings);
                        }else{
                            $("#product-line-group-barchart").html("<p style='clear:both; font-size:18px; text-align: center'>콘텐츠 없음</p>");
                        }
                    }else{
                        $("#product-line-group-barchart").html("<p style='clear:both; font-size:18px; text-align: center'>콘텐츠 없음</p>");
                    }
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };


    // ======= Chart 2: Get machine info by Line
    // $("#btnOKProduct").click(function (){
    //     if($("#txtStartTimeOK").val()=="" ){
    //         alert("Input data");
    //     }else {
    //         productSummarization.getAllProductByOK();
    //
    //     }
    // });

    /*
    productSummarization.getAllProductByOK = function () {
        $.ajax({
            url: "/v1/api/fukoku/product_status_freq/graph-by-ok-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtStartTimeOK").val()

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#product-pie-ok").html("");
                    if (response.DATA.length > 0) {
                        */
                        /**
                         * GOOD PRODUCT
                         */
                        /*
                        new d3pie("product-pie-ok", {
                            "data": {
                            "content": response.DATA
                            },
                            "label": response.DATA.RATE,
                            "size": {

                                "canvasHeight": 350,
                                "canvasWidth": 500

                            },
                            header: {
                                title: {
                                    text:     "양품생산량",
                                    color:    "#333333",
                                    fontSize: 18,
                                    font:     "arial"
                                },
                                location: "top-center",
                            },
                        });

                    }
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    */


    // ======= Chart 2: Get product by ng and df
    /*
    $("#btnNG").click(function (){
        if($("#txtNGStartTime").val()=="" ){
            alert("Input data");
        }else {
            productSummarization.getAllProductByNG();
            productSummarization.getAllProductByDF();
        }
    });
     */

    /*
    productSummarization.getAllProductByNG = function () {
        $.ajax({
            url: "/v1/api/fukoku/product_status_freq/graph-by-ng-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtNGStartTime").val()

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#product-pie-ng").html("");
                    if (response.DATA.length > 0) {
                        */
                        /**
                         * NOT GOOD PRODUCT
                         */
                        /*
                        new d3pie("product-pie-ng", {
                            "data": {
                                "content": response.DATA
                            },
                            "size": {

                                "canvasHeight": 350,
                                "canvasWidth": 500

                            },
                            header: {
                                title: {
                                    text:     "NG 생산량, 불량생산량",
                                    color:    "#333333",
                                    fontSize: 18,
                                    font:     "arial"
                                },
                                location: "top-center",
                            },
                        });

                    }
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    */


    /*
    productSummarization.getAllProductByDF = function () {
        $.ajax({
            url: "/v1/api/fukoku/product_status_freq/graph-by-df-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtNGStartTime").val()

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#product-pie-df").html("");
                    console.log(response.DATA.length);
                    if (response.DATA.length > 0) {
                        var is_empty = false;
                        for(var i=0; i< response.DATA.length; i++){
                            if(response.DATA[i].value == 0){
                                is_empty = true;
                            }
                        }


     */
                        /**
                         * DF PRODUCT
                         */
                        /*
                        if(!is_empty) {
                            new d3pie("product-pie-df", {
                                "data": {
                                    "content": response.DATA
                                },
                                "size": {

                                    "canvasHeight": 350,
                                    "canvasWidth": 500

                                },
                                header: {
                                    title: {
                                        text: "Defective Product",
                                        color: "#333333",
                                        fontSize: 18,
                                        font: "arial"
                                    },
                                    location: "top-center",
                                },
                            });
                        }

                    }
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    */

    // Add line to select box
    productSummarization.getAllLinesName = function(callback){
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" + 2,
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectLine').empty();
                $("#selectLine").append("<option value="+"'ALL'" +">"+"ALL"+"</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#selectLine").append("<option value="+value.name+">"+value.name+"</option>");
                    });
                    $("#selectLine").val("IB");
                    if(callback)
                        callback();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    productSummarization.getAllLinesName(function(){
        productSummarization.getAllProductByLine();
    });

    // Get all machine name
    productSummarization.getAllMachinesName = function(callback){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllDistinct",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>All</option>");
                if(response.code == 200){
                    $.each(response.data, function(key, value){
                        $("#selectMachine").append("<option value='"+value.name+"' data-id="+value.name+">"+value.name+"</option>");
                    });
                    // $("#selectMachine").val("Balancer");
                    $("#selectMachine").prop("selectedIndex",0).change();
                    if(callback)
                        callback();
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    productSummarization.getAllMachinesName(function () {
        productSummarization.getAllProductByMachine();
        // productSummarization.getAllProductByOK();
        // productSummarization.getAllProductByNG();
        // productSummarization.getAllProductByDF();

    });




});