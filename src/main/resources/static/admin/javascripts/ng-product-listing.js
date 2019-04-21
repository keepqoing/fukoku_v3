$(function () {

    var ngProduct = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    ngProduct.getLineCounting = function (callback, productionDate) {
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/ng-product/number-line/"+productionDate,
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

    ngProduct.getMachineCounting = function (lineParam, productionDate, callback) {
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/ng-product/number-machine/"+lineParam+"/"+productionDate,
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
    ngProduct.getAllLinesName = function(callback){
        $.ajax({
            url: "http://113.198.137.142:8080/v3/api/fukoku/line/factory/" +  2 ,
            type: 'GET',
            dataType: 'JSON',
            data:{},
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

    var buttonClickedHistory = null;
    var buttonClicked1History = null;

    function highlightButtonLineHistory(element) {
        if (buttonClickedHistory != null) {
            buttonClickedHistory.style.background = "#00a65a";
        }
        buttonClickedHistory = element;
        buttonClickedHistory.style.background = "black";
    }
    function highlightButtonMachineHistory(element) {
        if (buttonClicked1History != null) {
            buttonClicked1History.style.background = "#dd4b39";
        }
        buttonClicked1History = element;
        buttonClicked1History.style.background = "black";
    }

    ngProduct.getAllMachineNameByLineName = function(line, callback){
        $.ajax({
            url: "http://113.198.137.142:8080/v3/api/fukoku/machine/findAllByLine/" + line,
            type: 'GET',
            dataType: 'JSON',
            data:{
                "lineName"  :   line
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

    function getNumberByLine() {
        ngProduct.getAllLinesName(function (response) {
            if (response.code == 200) {
                $("#selectLineButtonList").html("");
                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnLine'>ALL</button>");
                var productionDate = $('#txtProductionDate').val() == "" ? "0" : $('#txtProductionDate').val();
                ngProduct.getLineCounting(function (response1) {
                    var total = 0;
                    for (var v = 0; v < response.data.length; v++) {
                        for (var v1 = 0; v1 < response1.DATA.length; v1++) {
                            if (response.data[v].name == response1.DATA[v1].ATTRIBUTE) {
                                $("#selectLineButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id=" + response.data[v].name + " id='btnLine'>" + response.data[v].name + "(" + response1.DATA[v1].NUMBER + ")</button>");
                                total += response1.DATA[v1].NUMBER;
                            }
                        }
                    }
                    $("#selectLineButtonList").val($("#selectLineButtonList button:first").html('ALL(' + total + ')'));
                }, productionDate)

            }
        });
    }

    getNumberByLine();

    var lineId = "";
    var machineId = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(lineId == ''){
            ngProduct.getAllngProduct('', '');
            $("#selectMachineButtonList").html("");
            return;
        }
        ngProduct.getAllMachineNameByLineName(lineId, function (response) {
            $("#selectMachineButtonList").html("");
            if (response.code == 200) {
                $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");
                var productionDate = $('#txtProductionDate').val()==""?"0":$('#txtProductionDate').val();
                ngProduct.getMachineCounting(lineId,productionDate, function (response1) {
                    var total = 0;
                    $.each(response.data, function (key, value) {
                        $.each(response1.DATA, function (key1, value1) {
                            if(value.name == value1.ATTRIBUTE) {
                                $("#selectMachineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=" + value.name + ">" + value.name +"("+value1.NUMBER+ ")</button>");
                                total += value1.NUMBER;
                            }
                        });
                    });
                    $("#selectMachineButtonList").val($("#selectMachineButtonList button:first").html('ALL('+total+')'));
                })
                ngProduct.getAllngProduct(lineId, machineId);
            }
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineId = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineId==''){
            ngProduct.getAllngProduct(lineId, '');
            return;
        }
        ngProduct.getAllngProduct(lineId, machineId);
    });

    ngProduct.getAllProductName = function(){
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       $("#selectLine").val(),
                "machine"      :       $("#selectMachine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
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

    //TODO: SERVER SIDE REQUEST
    ngProduct.getAllngProduct = function (lId, mId) {
        openLoading();
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/ng-product",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"      :   lId,
                "machine"   :   mId,
                "status"    :   "",
                "productionDate"    :   $('#txtProductionDate').val(),
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#NG_PRODUCT").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 게)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#NG_PRODUCT_TEMPLATE").tmpl(response.DATA).appendTo("tbody#NG_PRODUCT");
                        if (checkPagination) {
                            ngProduct.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#NG_PRODUCT").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#NG_PRODUCT").html("<tr style='text-align:center;'><td colspan='9'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 게)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    ngProduct.getAllngProduct('', '');

    $('#productionDate').datetimepicker({
        format: 'YYYY-MM-DD',
    }).on('dp.change', function (ev) {
        $("#selectMachineButtonList").html("");
        getNumberByLine();
        checkPagination = true;
        ngProduct.getAllngProduct(lineId, machineId);
    });

    //TODO: PAGINATION
    ngProduct.setPagination = function (totalPage) {
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
        ngProduct.getAllngProduct(lineId, machineId);
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        ngProduct.getAllngProduct(lineId, machineId);
    });

});