$(function() {

    var productionStatus = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    productionStatus.getAllLinesName = function(){
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
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    productionStatus.getAllMachineNameByLineName = function(){
        $.ajax({
            url: "/v1/api/fukoku/machine/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "lineName"  :   $("#selectLine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectMachine").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    productionStatus.getAllProductName = function(){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       $("#selectLine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                $("#selectProduct").append("<option value=''>모든</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectProduct").append("<option value='"+value.NAME+"'>"+value.NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };
    $("#mark").hide();




    $("#selectLine").change(function(){
        productionStatus.getAllMachineNameByLineName();
    });

    $("#selectLine").change(function(){
        productionStatus.getAllProductName();
    });

    //TODO: SERVER SIDE REQUEST
    productionStatus.getAllProductStatuses = function () {

        if($("#selectLine").val() ==""){ alert("라인을 선택하십시오!"); return ; }
        if($("#selectMachine").val() ==""){ alert("설비를 선택하십시오!"); return ; }
        if($("#txtStartDate").val() ==""){ alert("시작날짜 선택하십시오!"); return ; }
        if($("#txtEndDate").val() ==""){ alert("종료날짜 선택하십시오!"); return ; }


        console.log('$("#selectMachine").val() = ' + $("#selectMachine").val());
        console.log('$("#txtStartDate").val() = ' + $("#txtStartDate").val() );
        console.log('$("#txtEndDate").val() = ' + $("#txtEndDate").val() );


        $("#PRODUCT_STATUS").html("");
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/process-analysis",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"       :   $("#selectLine").val(),
                "machine"       :   $("#selectMachine").val(),
                "start_date"     :   $("#txtStartDate").val(),
                "end_date"       :   $("#txtEndDate").val()
               // "limit"         :   $("#PER_PAGE").val(),
                //"page"          :   currentPage,
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    console.log("response", response);
                    if (response.DATA.length > 0 || !response.DATA) {

                        $("#PRODUCT_STATUS_TEMPLATE").tmpl(response.DATA).appendTo("tbody#PRODUCT_STATUS");
                        productionStatus.getAllProductStatusGraphs();
                    } else {
                        $("#PRODUCT_STATUS").html("<tr style='text-align:center;'><td colspan='19'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                        $("#limitPage").html(0);
                        $("#totalPage").html(0);
                        $("#totalRecords").html("(0 열)");
                    }

/*
                                    if (response.DATA != null) {
                                        if (response.DATA.length > 0) {
                                            $("#barMultiLine").html("");
                                            $("#mark").show();
                                            $.each(response.DATA, function (key, value) {
                                                var a = parseFloat(response.DATA[key].line1);
                                                var a1 = parseFloat(response.DATA[key].line2);
                                                response.DATA[key]["line1"] = (parseFloat(a.toFixed(3))?parseFloat(a.toFixed(3)):0);
                                                response.DATA[key]["line2"] = (parseFloat(a1.toFixed(3))?parseFloat(a1.toFixed(3)):0);
                                                response.DATA[key]["line3"] = 2;
                                            });
                                            var settings = {
                                                selector: "#barMultiLine",
                                                width: 1200,
                                                height: 450
                                            };
                                            barchartMultiLine(response.DATA, settings);
                                        }
                                    }
*/
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    productionStatus.getAllProductStatusGraphs = function () {
        $("#barMultiLine").html("");
        $("#mark").show();
        $.ajax({
            url: "/v1/api/fukoku/process-analysis/graph",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"       :   $("#selectLine").val(),
                "machine"       :   $("#selectMachine").val(),

                "startDate"     :   $("#txtStartDate").val(),
                "endDate"       :   $("#txtEndDate").val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response)
                if (response.CODE == "7777") {
                    if (response.DATA.length > 0) {
                        $.each(response.DATA, function (key, value) {
                            var a = parseFloat(response.DATA[key].line1);
                            var a1 = parseFloat(response.DATA[key].line2);
                            var a2 = parseFloat(response.DATA[key].line3);
                            var a3 = parseFloat(response.DATA[key].line4);
                            var a4 = parseFloat(response.DATA[key].line5);
                            response.DATA[key]["line1"] = (parseFloat(a.toFixed(2))?parseFloat(a.toFixed(2)):0);
                            response.DATA[key]["line2"] = (parseFloat(a1.toFixed(2))?parseFloat(a1.toFixed(2)):0);
                            response.DATA[key]["line3"] = (parseFloat(a2.toFixed(2))?parseFloat(a2.toFixed(2)):0);
                            response.DATA[key]["line4"] = (parseFloat(a3.toFixed(2))?parseFloat(a3.toFixed(2)):0);
                            response.DATA[key]["line5"] = (parseFloat(a4.toFixed(2))?parseFloat(a4.toFixed(2)):0);
                        });
                        var settings = {
                            selector: "#barMultiLine",
                            width: 1200,
                            height: 450
                        };
                        barchartMultiLine(response.DATA, settings);
                    }

                }else{
                    $("#mark").hide();
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    //TODO: PAGINATION
    productionStatus.setPagination = function (totalPage) {
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
        productionStatus.getAllProductStatuses();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        productionStatus.getAllProductStatuses();
    });

    $("#btnQuery").click(function () {
        $("#mark").hide();

        checkPagination = true;
        productionStatus.getAllProductStatuses();

    });

    productionStatus.getYearlyReport = function(){
        var data = [
            {
                "year": 1,
                "bar": 120,
                "line1": 5.5,
                "line2": 4,
                "line3": 2
            },
            {
                "year": 2,
                "bar": 100,
                "line1": 4.6,
                "line2": 3,
                "line3": 1
            },
            {
                "year": 3,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            },
            {
                "year": 4,
                "bar": 80,
                "line1": 3.7,
                "line2": 4.5,
                "line3": 1
            },
            {
                "year": 5,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            },
            {
                "year": 6,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            },
            {
                "year": 7,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            },
            {
                "year": 8,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            },
            {
                "year": 9,
                "bar": 100,
                "line1": 4.6,
                "line2": 6,
                "line3": 2
            }
        ];
        var settings = {
            selector: "#barMultiLine",
            width: 1200,
            height: 350
        };
        barchartMultiLine(data, settings);
    };

    productionStatus.getAllMachinesNameV2 = function(){
        $.ajax({
            url: "/v1/api/fukoku/machine/all/select-box",
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectMachine').empty();
                $("#selectMachine").append("<option value=''>설비</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectMachine").append("<option value='"+value.MAPPING_NAME+"' data-id="+value.ID+">"+value.MACHINE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };



    productionStatus.getAllLinesName();
    productionStatus.getAllMachinesNameV2();



    //productionStatus.getYearlyReport();
});