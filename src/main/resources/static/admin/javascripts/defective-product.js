$(function () {

    var defectiveProduct = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    defectiveProduct.getLineCounting = function (productionDate, callback) {
        $.ajax({
            url: "/v3/api/fukoku/defective-product/number-line/"+productionDate,
            type: 'GET',
            dataType: 'JSON',
            data: {},
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

    defectiveProduct.getMachineCounting = function (lineParam, productionDate, callback) {
        $.ajax({
            url: "/v3/api/fukoku/defective-product/number-machine/"+lineParam+"/"+productionDate,
            type: 'GET',
            dataType: 'JSON',
            data: {},
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

    var buttonClicked = null;
    var buttonClicked1 = null;

    function highlightButtonLine(element) {
        if (buttonClicked != null) {
            buttonClicked.style.background = "#00a65a";
        }
        buttonClicked = element;
        buttonClicked.style.background = "black";
    }
    function highlightButtonMachine(element) {
        if (buttonClicked1 != null) {
            buttonClicked1.style.background = "#dd4b39";
        }
        buttonClicked1 = element;
        buttonClicked1.style.background = "black";
    }

    defectiveProduct.getAllLinesName = function(callback){
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  2 ,
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                console.log(response);
                if(callback){
                    callback(response);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    defectiveProduct.getAllMachineNameByLineName = function(line, callback){
        $.ajax({
            url: "/v3/api/fukoku/machine/findAllByLine/" + line,
            type: 'GET',
            dataType: 'JSON',
            data:{

            },
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

    function getCountLine() {
        defectiveProduct.getAllLinesName(function (response) {

            if(response.code == 200){
                $("#selectLineButtonList").html("");
                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLine'>ALL</button>");
                var productionDate = $('#txtProductionDate').val()==""?"0":$('#txtProductionDate').val();
                defectiveProduct.getLineCounting(productionDate, function (response1) {
                    var total = 0;
                    for(var v=0;v<response.data.length;v++){
                        if(response1.DATA != null) {
                            for (var v1 = 0; v1 < response1.DATA.length; v1++) {

                                if (response.data[v].name == response1.DATA[v1].ATTRIBUTE) {

                                    $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response.data[v].name + " id='btnLine'>" + response.data[v].name + "(" + response1.DATA[v1].NUMBER + ")</button>");
                                    total += response1.DATA[v1].NUMBER;
                                }

                            }
                        }
                    }

                    if(response1.DATA != null) {
                        for (var v1 = 0; v1 < response1.DATA.length; v1++) {

                            if (response1.DATA[v1].ATTRIBUTE == 'OTHER') {
                                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response1.DATA[v1].ATTRIBUTE + " id='btnLine'>" + response1.DATA[v1].ATTRIBUTE + "(" + response1.DATA[v1].NUMBER + ")</button>");
                                total += response1.DATA[v1].NUMBER;
                            }
                        }
                    }

                    $("#selectLineButtonList").val($("#selectLineButtonList button:first").html('ALL('+total+')'));
                });
            }
        });
    }

    getCountLine();

    var lineId = "";
    var machineId = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        machineId = "";
        if (lineId == '') {
            $("#selectMachineButtonList").html("");
            defectiveProduct.getAllnonActiveStates('','');
            return;
        }
        defectiveProduct.getAllnonActiveStates(lineId,'');
        $("#selectMachineButtonList").html("");
        defectiveProduct.getAllMachineNameByLineName(lineId, function (response) {
            $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
            var productionDate = $('#txtProductionDate').val()==""?"0":$('#txtProductionDate').val();
            defectiveProduct.getMachineCounting(lineId, productionDate, function (response1) {
                var total = 0;
                $.each(response.data, function (key, value) {
                    $.each(response1.DATA, function (key1, value1) {
                        if(value.name == value1.ATTRIBUTE) {
                            $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.name + ">" + value.name +"("+value1.NUMBER+ ")</button>");
                            total += value1.NUMBER;
                        }
                    });
                });
                $.each(response1.DATA, function (key1, value1) {
                    if(value1.ATTRIBUTE ==  "OTHER") {
                        $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value1.ATTRIBUTE + ">" + value1.ATTRIBUTE +"("+value1.NUMBER+ ")</button>");
                        total += value1.NUMBER;
                    }
                });
                $("#selectMachineButtonList").val($("#selectMachineButtonList button:first").html('ALL('+total+')'));
            })
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineId==''){
            defectiveProduct.getAllnonActiveStates(lineId,'');
            return;
        }
        defectiveProduct.getAllnonActiveStates(lineId, machineId);
    });

    defectiveProduct.getAllnonActiveStates = function (lId, mId) {
        openLoading();
        $.ajax({
            url: "/v3/api/fukoku/defective-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"          :   lId,
                "machine"       :   mId,
                "productionDate"       :   $('#txtProductionDate').val(),
                "limit"         :   $("#PER_PAGE").val(),
                "page"          :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#DEFECTIVE_PRODUCT").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                            /!*response.DATA[key]["DURATION"] = response.DATA[key].DURATION.toFixed(2);*!/
                        });
                        $("#DEFECTIVE_PRODUCT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#DEFECTIVE_PRODUCT");
                        if (checkPagination) {
                            defectiveProduct.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#DEFECTIVE_PRODUCT").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#DEFECTIVE_PRODUCT").html("<tr style='text-align:center;'><td colspan='8'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 공정)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    $('#productionDate').datetimepicker({
        format: 'YYYY-MM-DD',
    }).on('dp.change', function (ev) {
        $("#selectMachineButtonList").html("");
        getCountLine();
        checkPagination = true;
        defectiveProduct.getAllnonActiveStates("","");
    });

    //TODO: PAGINATION
    defectiveProduct.setPagination = function (totalPage) {
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
        defectiveProduct.getAllnonActiveStates();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        defectiveProduct.getAllnonActiveStates();
    });
    defectiveProduct.getAllnonActiveStates("","");


    // Download button is clicked
    $(document).on('click', '#btnExport', function () {
        openLoading();
        $.ajax({
            url: '/v3/api/fukoku/defective-product/download',
            type: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {

                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    });
});