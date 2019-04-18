$(function () {


    /**
     * This function uses for rowspan in html with the same content
     */
    /*
    !function (t, n, e, i) {
        "use strict";
        function a(n, e) {
            this.element = n, this.settings = t.extend({}, o, e), this._defaults = o, this._name = s, this.init()
        }

        var s = "rowspanizer", o = {vertical_align: "top"};
        t.extend(a.prototype, {
            init: function () {
                var n = this, e = t(this.element), i = [];
                e.find("tr").each(function (n, e) {
                    t(this).find("td").each(function (n, e) {
                        if (n == 0 || n == 1  ) {
                            var a = t(e), s = a.html();
                            if ("undefined" != typeof i[n] && "dato" in i[n] && i[n].dato == s) {
                                var o = i[n].elem.data("rowspan");
                                ("undefined" == o || isNaN(o)) && (o = 1), i[n].elem.data("rowspan", parseInt(o) + 1).addClass("rowspan-combine"), a.addClass("rowspan-remove")
                            } else i[n] = {dato: s, elem: a}
                        }
                    })
                }), t(".rowspan-combine").each(function (e, i) {
                    var a = t(this);
                    a.attr("rowspan", a.data("rowspan")).css({"vertical-align": n.settings.vertical_align})
                }), t(".rowspan-remove").remove()
            }
        }), t.fn[s] = function(n){
            return this.each(function () {
                t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new a(this, n))
            })
        }
    }(jQuery, window, document);
    */


    var factoryName = "ALL";
    var lineName = "ALL";
    var machineName = "ALL";
    var selectedYear = "2018";
    var checkPagination = true;
    var currentPage = 1;
    var alarmName = "";

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });


    // ========== 1. START: Selecting Factory =======================================
    // Get Factory Counting
    alarmStatistics.getFactoryCounting = function (callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-factory",
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

    alarmStatistics.getAllFactoriesName = function(callback){
        $.ajax({
            url: "/v3/api/fukoku/factory",
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

    function getCountFactory(){
        $("#selectFactoryButtonList").html("");
        $("#selectFactoryButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='ALL' id='btnFactory'>ALL</button>");

        alarmStatistics.getFactoryCounting(function (response) {
            var total = 0;
            for(var v=0;v<response.DATA.length;v++){
                $("#selectFactoryButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='" + response.DATA[v].ATTRIBUTE + "' id='btnFactory'>" + response.DATA[v].ATTRIBUTE +"("+response.DATA[v].NUMBER+ ")</button>");
                total += response.DATA[v].NUMBER;

            }
            $("#selectFactoryButtonList").val($("#selectFactoryButtonList button:first").html('ALL('+total+')'));
        });
    }
    getCountFactory();

    // ========== 1. END: Selecting Factory =======================================


    // ========== 2. START: Selecting Line ========================================
    alarmStatistics.getLineCounting = function (factory, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-line/"+factory,
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

    var buttonClickedFactory = null;
    var buttonClickedLine = null;
    var buttonClickedMachine = null;
    var buttonClickedYear = null;

    function highlightButtonFactory(element) {
        if (buttonClickedFactory != null) {
            buttonClickedFactory.style.background = "#00a65a";
        }
        buttonClickedFactory = element;
        buttonClickedFactory.style.background = "black";
    }

    function highlightButtonLine(element) {
        if (buttonClickedLine != null) {
            buttonClickedLine.style.background = "#dd4b39";
        }
        buttonClickedLine = element;
        buttonClickedLine.style.background = "black";
    }

    function highlightButtonMachine(element) {
        if (buttonClickedMachine != null) {
            buttonClickedMachine.style.background = "#dd4b39";
            buttonClickedMachine.style.borderColor = "#d73925";
        }
        buttonClickedMachine = element;
        buttonClickedMachine.style.background = "black";
    }


    function highlightButtonYear(element) {
        if (buttonClickedYear != null) {
            buttonClickedYear.style.background = "#dd4b39";
            buttonClickedYear.style.borderColor = "#d73925";
        }
        buttonClickedYear = element;
        buttonClickedYear.style.background = "black";
    }


    $(document).on('click', '#btnFactory', function () {
        highlightButtonFactory(this);
        factoryName = $(this).data("id");
        // console.log(factoryName);
        lineName = "ALL";

        if (factoryName == 'ALL') {
            $("#selectLineButtonList").html("");
            return;
        }
        // alarmHistories.getAllalarmHistories();
        $("#selectLineButtonList").html("");

        $("#selectLineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnLine' data-id='ALL'>ALL</button>");

        alarmStatistics.getLineCounting(factoryName, function (response) {
            var total = 0;

            $.each(response.DATA, function (key, value) {

                $("#selectLineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnLine' data-id='" + value.ATTRIBUTE + "'>" + value.ATTRIBUTE +"("+value.NUMBER+ ")</button>");
                total += value.NUMBER;

            });

            $("#selectLineButtonList").val($("#selectLineButtonList button:first").html('ALL('+total+')'));
        });
    });

    // ================ 2. END: Selecting Line ===========================================

    // ================ 3. Selecting Machine =============================================
    alarmStatistics.getMachineCounting = function (line, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-machine/" + line,
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

    // var lnName = "";
    // var machineName = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lineName = $(this).data("id");
        // console.log("lnName : " + lnName);
        machineName = "ALL";
        if (lineName == 'ALL') {
            $("#selectMachineButtonList").html("");

            return;
        }

        $("#selectMachineButtonList").html("");

        $("#selectMachineButtonList").append("<button class='btn btn-primary' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id='ALL'>ALL</button>");

        alarmStatistics.getMachineCounting(lineName, function (response) {
            var total = 0;
            $.each(response.DATA, function (key, value) {
                $("#selectMachineButtonList").append("<button class='btn btn-primary' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id='" + value.ATTRIBUTE + "'>" + value.ATTRIBUTE +"("+value.NUMBER+ ")</button>");
                total += value.NUMBER;
            });
            $("#selectMachineButtonList").val($("#selectMachineButtonList button:first").html('ALL('+total+')'));
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineName = $(this).data("id");

        if(machineName=='ALL'){
            // alarmHistories.getAllalarmHistories();
            return;
        }
        // alarmHistories.getAllalarmHistories();
    });
    // ================ 3. END: Selecting Machine ========================================

    // ================ 4. START: Selecting Year =========================================
    $(document).on('click', '#selectedYear', function () {
        highlightButtonYear(this);
        selectedYear = $(this).data("id");

        alarmStatistics.getAlarmData(factoryName, lineName, machineName, selectedYear, function(){
            $(".table-responsive td.tdValue ").each(function(){
                $(this).each(function () {
                    var value = $(this).text();

                    if (value != 0) {
                        $(this).css("background-color", "#80a8d1");
                    }
                })
            });
        });

        // Summation
        alarmStatistics.getAlarmDataSum(factoryName, lineName, machineName, selectedYear, function(){
            $(".table-responsive td.tdValue ").each(function(){
                $(this).each(function () {
                    var value = $(this).text();
                    // console.log("value = " + value);
                    if (value != 0) {
                        $(this).css("background-color", "#80a8d1");
                    }
                })
            });
        });

        $("#chosen_year").text(selectedYear);

    });
    // ================ 4. END: Selecting Year ===========================================

    // ================ 5. GETTING Alarm Data ============================================

    //TODO: SERVER SIDE REQUEST
    alarmStatistics.getAlarmData = function (factory, line, machine, year, callback) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/"+factory+"/"+line+"/"+machine+"/"+year,
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#ALARM_COUNTING_1").html("");
                    $("#ALARM_COUNTING_2").html("");
                    if(response.DATA.length > 0){

                        $("#ALARM_COUNTING_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_COUNTING_1");
                        $("#ALARM_COUNTING_2_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_COUNTING_2");

                        if(callback)
                            callback();

                    }else{
                        $("#ALARM_COUNTING_1").html("<tr style='text-align:left;'><td colspan='376'>콘텐츠 없음</td></tr>");
                        $("#ALARM_COUNTING_2").html("<tr style='text-align:left;'><td colspan='16'>콘텐츠 없음</td></tr>");
                    }
                }
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    // Summation
    //TODO: SERVER SIDE REQUEST
    alarmStatistics.getAlarmDataSum = function (factory, line, machine, year, callback) {

        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/sum/"+factory+"/"+line+"/"+machine+"/"+year,
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE=="7777"){
                    $("#ALARM_COUNTING_3").html("");
                    $("#ALARM_COUNTING_4").html("");

                    if(response.DATA.length > 0){

                        $("#ALARM_COUNTING_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_COUNTING_3");
                        $("#ALARM_COUNTING_2_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_COUNTING_4");

                        if(callback)
                            callback();
                    }else{
                        $("#ALARM_COUNTING_3").html("<tr style='text-align:left;'><td colspan='374'>콘텐츠 없음</td></tr>");
                        $("#ALARM_COUNTING_4").html("<tr style='text-align:left;'><td colspan='14'>콘텐츠 없음</td></tr>");
                    }
                }
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    // ===================================================================================

    // Checkbox
    // set selected = selected when the option is chosen
    $(document).on('change','input:checkbox',function(){
        var showOption = $("#filterForm input[type='radio']:checked").val();
        console.log("value = " + showOption);

        var isShownProduct = $('#show_product').is(':checked');
        hideShowTable(showOption, isShownProduct);

    });

    $("input[type='radio']").change(function(){
        var showOption = $(this).val();
        var isShownProduct = $('#show_product').is(':checked');

        hideShowTable(showOption, isShownProduct);
    });

    function hideShowTable(showOption, isShownProduct){
        if (showOption == "day" && isShownProduct){
            $("#firstTable").show();
            $("#secondTable").hide();
            $("#thirdTable").hide();
            $("#fourthTable").hide();
        } else if(showOption == "day" && !isShownProduct){
            $("#firstTable").hide();
            $("#secondTable").hide();
            $("#thirdTable").show();
            $("#fourthTable").hide();
        } else if(showOption == "month" && isShownProduct){
            $("#firstTable").hide();
            $("#secondTable").show();
            $("#thirdTable").hide();
            $("#fourthTable").hide();
        } else if (showOption == "month" && !isShownProduct){
            $("#firstTable").hide();
            $("#secondTable").hide();
            $("#thirdTable").hide();
            $("#fourthTable").show();
        }
    }
    // Alarm History
    alarmStatistics.getAlarmHistory = function () {

        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/findAlarmHistory",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"       :   lineName,
                "alarmName"  :   alarmName,
                "productionDate"  :   selectedYear,
                "limit"      :   $("#PER_PAGE").val(),
                "page"       :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ALARM_HISTORY").html("");
                    if (response.DATA.length > 0 || !response.DATA) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 개)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ALARM_HISTORY_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ALARM_HISTORY");
                        if (checkPagination) {
                            alarmStatistics.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#ALARM_HISTORY").html("<tr style='text-align:center;'><td colspan='12'>콘텐츠 없음</td></tr>");
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


    alarmStatistics.showHistory = function(alarm){

        alarmName = alarm;
        // console.log(alarmName);
        alarmStatistics.getAlarmHistory( );
        $('#modalHistory').modal('show');
    }

    //TODO: PAGINATION
    alarmStatistics.setPagination = function (totalPage) {
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
        alarmStatistics.getAlarmHistory();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        alarmStatistics.getAlarmHistory();
    });
});