$(function () {
    var alarmStatistics = {};
    var checkPagination = true;
    var currentPage = 1;

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });


    function showModal(){
        // $("#modalMessage").modal("show");

    }

    // ========== 1. START: Selecting Factory =======================================
    // Get Factory Counting
    alarmStatistics.getFactoryCounting = function (startYear, endYear, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-factory/"+ startYear + "/" + endYear,
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
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
        alarmStatistics.getAllFactoriesName(function (response) {
            if(response.code == "200"){
                $("#selectFactoryButtonList").html("");
                $("#selectFactoryButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='' id='btnFactory'>ALL</button>");
                var startYear = $('#txtStartYear').val();
                var endYear = $('#txtStartYear').val();
                alarmStatistics.getFactoryCounting(startYear, endYear, function (response1) {
                    var total = 0;
                    for(var v=0;v<response.data.length;v++){
                        for(var v1=0;v1<response1.DATA.length;v1++) {
                            if (response.data[v] == response.data[v1]) {
                                $("#selectFactoryButtonList").append("<button class='btn btn-success' style='margin-right:5px; margin-bottom:5px;' data-id='" + response.data[v].name + "' id='btnFactory'>" + response.data[v].name +"("+response1.DATA[v1].NUMBER+ ")</button>");
                                total += response1.DATA[v1].NUMBER;
                            }
                        }
                    }
                    $("#selectFactoryButtonList").val($("#selectFactoryButtonList button:first").html('ALL('+total+')'));
                });
            }
        });
    }
    getCountFactory();

    // ========== 1. END: Selecting Factory =======================================

    // ========== 2. START: Selecting Line ========================================
    alarmStatistics.getLineCounting = function (factory, startYear, endYear, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-line/"+factory+"/"+startYear+"/"+endYear,
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
    var buttonClicked2 = null;

    function highlightButtonFactory(element) {
        if (buttonClicked != null) {
            buttonClicked.style.background = "#00a65a";
        }
        buttonClicked = element;
        buttonClicked.style.background = "black";
    }

    function highlightButtonLine(element) {
        if (buttonClicked1 != null) {
            buttonClicked1.style.background = "#dd4b39";
        }
        buttonClicked1 = element;
        buttonClicked1.style.background = "black";
    }

    function highlightButtonMachine(element) {
        if (buttonClicked2 != null) {
            buttonClicked2.style.background = "#3b1aa9";
        }
        buttonClicked2 = element;
        buttonClicked2.style.background = "black";
    }

    alarmStatistics.getAllLineNameByFactoryName = function(factory, startYear, endYear, callback){
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/all-line/" + factory + "/" + startYear + "/" + endYear,
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
    };

    var factoryName = "";
    var lineName = "";
    $(document).on('click', '#btnFactory', function () {
        highlightButtonFactory(this);
        factoryName = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        lineName = "";
        var startYear = $('#txtStartYear').val();
        var endYear = $('#txtEndYear').val();
        if (factoryName == '') {
            $("#selectLineButtonList").html("");
            // alarmStatistics.getAllalarmHistories();
            alarmStatistics.getAlarmData(startYear,endYear,"","");
            return;
        }
        // alarmHistories.getAllalarmHistories();
        $("#selectLineButtonList").html("");

        alarmStatistics.getAllLineNameByFactoryName(factoryName, startYear, endYear, function (response) {
            $("#selectLineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnLine' data-id=''>ALL</button>");

            alarmStatistics.getLineCounting(factoryName, startYear, endYear, function (response1) {
                var total = 0;
                $.each(response.DATA, function (key, value) {
                    $.each(response1.DATA, function (key1, value1) {
                        if(value.name == value1.ATTRIBUTE) {
                            $("#selectLineButtonList").append("<button class='btn btn-danger' style='margin-right:5px; margin-bottom: 5px;' id='btnLine' data-id='" + value.name + "'>" + value.name +"("+value1.NUMBER+ ")</button>");
                            total += value1.NUMBER;
                        }
                    });
                });
                $("#selectLineButtonList").val($("#selectLineButtonList button:first").html('ALL('+total+')'));
            })
        });
    });

    // ================ 3. END: Selecting Line ===========================================

    // ================ 4. START: Selecting Machine ======================================
    alarmStatistics.getMachineCounting = function (line, startYear, endYear, callback) {
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/number-machine/" + line + "/" + startYear + "/" + endYear,
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

    alarmStatistics.getAllMachineNameByLineName = function(line, startYear, endYear, callback){
        $.ajax({
            url: "/v1/api/fukoku/alarm-statistics/all-machine/"+line+"/"+startYear+"/"+endYear,
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

    var lnName = "";
    var machineName = "";
    $(document).on('click', '#btnLine', function () {
        highlightButtonLine(this);
        lnName = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        machineName = "";
        if (lnName == '') {
            $("#selectMachineButtonList").html("");
            // alarmHistories.getAllalarmHistories();
            return;
        }
        // alarmHistories.getAllalarmHistories();
        $("#selectMachineButtonList").html("");
        var startYear = $('#txtStartYear').val();
        var endYear = $('#txtEndYear').val();
        alarmStatistics.getAllMachineNameByLineName(lnName, startYear, endYear, function (response) {
            $("#selectMachineButtonList").append("<button class='btn btn-primary' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id=''>ALL</button>");

            alarmStatistics.getMachineCounting(lnName, startYear, endYear, function (response1) {
                var total = 0;
                $.each(response.DATA, function (key, value) {
                    $.each(response1.DATA, function (key1, value1) {
                        if(value.name == value1.ATTRIBUTE) {
                            $("#selectMachineButtonList").append("<button class='btn btn-primary' style='margin-right:5px; margin-bottom: 5px;' id='btnMachine' data-id='" + value.name + "'>" + value.name +"("+value1.NUMBER+ ")</button>");
                            total += value1.NUMBER;
                        }
                    });
                });
                $("#selectMachineButtonList").val($("#selectMachineButtonList button:first").html('ALL('+total+')'));
            })
        });
    });

    $(document).on('click', '#btnMachine', function () {
        highlightButtonMachine(this);
        machineName = $(this).data("id");
        checkPagination = true;
        currentPage = 1;
        if(machineName==''){
            // alarmHistories.getAllalarmHistories();
            return;
        }
        // alarmHistories.getAllalarmHistories();
    });
    // ================ 4. END: Selecting Machine ======================================



    // STANDARD FORMAT
    /*
    var data = [{
        "ALARM_ID" : 0,
        "ALARM_NAME" : "A",
        "ALARM_COUNT" : 0,
        "ALARM_PRODUCT" : [{
            "REF_PRODUCT" : "P",
            "TOTAL" : 0,
            "ALARM_PRODUCT_YEAR" : [{
                "M1" : [
                    "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M2" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M3" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M4" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M5" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M6" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M7" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M8" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M9" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M10" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M11" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0

                ],
                    "M12" : [
                        "1": 0,
                        "2": 0,
                        "3": 0,
                ...
                    "31": 0,
                        "total": 0
                ],
                    "TOTAL" : 0,
                        "YEAR" : 2018
                }]
                }]
                }];
    */
    // ================ 5. JSON ========================================================
    alarmStatistics.getAlarmData = function (startYear, endYear, factoryName, lineName, machineName) {
        $.ajax({
            url: "/v3/api/fukoku/alarm",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startYear" : startYear,
                "endYear"   : endYear,
                "factory"   : factoryName,
                "line"      : lineName,
                "machine"   : machineName
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if(response.code == 200){
                    if(response.data.length > 0){
                        resetTableContents();
                        loadDataToTable(response.data);
                    }
                } else{
                    console.log("Data cannot be read");
                }
                console.log(response);
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    // alarmStatistics.getAlarmData("2018","2019","IB","IB_Pre1");


    // ==== Dynamic Table =============
    function loadDataToTable(result){
        console.log(result);
        for(var i = 0; i < result.length; i++){
            var tdObj1 = createOneAlarmName(result[i].ALARM_ID, result[i].ALARM_NAME, result[i].ALARM_COUNT);

            var alarmProducts = result[i].ALARM_PRODUCT;
            if(alarmProducts != null){
                newProduct_2_1_FromDB(result[i].ALARM_ID, alarmProducts, result[i], tdObj1);
            }
        }

        // isChecked();
    }

    // Reset Table Content
    function resetTableContents(){
        document.getElementById("tableHeader").innerHTML = "";
        document.getElementById("tableHeader2").innerHTML = "";
        document.getElementById("alarmTable").innerHTML = "";
    }


    // 1.1 - Read Data and Create One Alarm Name for once
    function createOneAlarmName(alarmId, alarmName, alarmTotal){

        if(!isExisted("alarmHeader")) {
            var theader = document.getElementById("tableHeader");

            var th = document.createElement("th");
            th.innerText = "알람명";
            th.id = "alarmHeader";
            th.setAttribute("rowspan","2");
            th.setAttribute("style", "text-align:center; vertical-align: middle!important;");
            theader.appendChild(th);
        }

        if(!isExisted("totalHeader")) {
            var theader = document.getElementById("tableHeader");

            var th = document.createElement("th");
            th.innerText = "합계";
            th.id = "totalHeader";
            th.setAttribute("style","width:20px!important");
            // th.setAttribute("rowspan","2");
            theader.appendChild(th);

            var theader2 = document.getElementById("tableHeader2");

            var th2 = document.createElement("th");
            th2.id = "totalResult";
            theader2.appendChild(th2);
        }

        if(!isExisted("tr"+alarmId+"_1")) {
            var tbody = document.getElementById("alarmTable");

            var tr = document.createElement("tr");

            tr.id = "tr" + alarmId + "_1";
            tr.className = "tr" + alarmId;


            // Alarm Name
            var td = document.createElement("td");
            td.id = "td" + alarmId;
            td.className = "td" + alarmId;
            td.setAttribute("rowspan", "1");



            var span = document.createElement("span");
            span.setAttribute("id", "span" + alarmId);
            // span.setAttribute("class", "span" + arrLine[i]);
            span.setAttribute("class", "span" + "AlarmName");
            span.innerText = alarmName;

            var a = document.createElement("a");
            a.appendChild(span);
            a.setAttribute("style","cursor: pointer;");
            a.addEventListener("click", function(){spanClick(alarmName)});

            // Alarm Total
            var tdT = document.createElement("td");
            tdT.id = "tdTotal" + alarmId;
            tdT.className = "tdTotal" + alarmId;
            tdT.setAttribute("rowspan", "1");

            var spanT = document.createElement("span");
            spanT.setAttribute("id", "spanTotal" + alarmId);
            // span.setAttribute("class", "span" + arrLine[i]);
            spanT.setAttribute("class", "spanTotal");
            spanT.innerText = alarmTotal;

            td.appendChild(a);
            tr.appendChild(td);

            tdT.append(spanT);
            tr.appendChild(tdT)
            tbody.appendChild(tr);
        }
        return td;

    }


    // 1.2 - Read Data and Create One Alarm Total for once
    function createOneAlarmTotal(alarmId, alarmTotal){

        // Create a new Column Header
        if(!isExisted("totalHeader")){
            var theader = document.getElementById("tableHeader");
            var th = document.createElement("th");
            th.innerText = "합계";
            th.id = "totalHeader";
            theader.appendChild(th);
        }

        return th;
    }


    // ===== Helping Functions =====
    // This function is used to know whether the html element is existed
    function isExisted(id){
        var item = document.getElementById(id);
        if(item){
            return true;
        }else{
            return false;
        }
    }


    // Step 2.1 -- Create Product Td From Database
    function newProduct_2_1_FromDB(alarmId, alarmProducts, result, btnObj){
        for(let i=0; i< alarmProducts.length; i++){
            // Create a new Column Header
            if(!isExisted("productHeader")){
                var theader = document.getElementById("tableHeader");
                var th = document.createElement("th");
                th.innerText = "제품";
                th.id = "productHeader";
                th.setAttribute("colspan", "2");

                theader.appendChild(th);

                var theader2 = document.getElementById("tableHeader2");
                var th1 = document.createElement("th");
                th1.className="ptHeader";
                th1.innerText = "합계";

                var th2 = document.createElement("th");
                th2.className="pnHeader";
                th2.innerText = "제품명";

                theader2.appendChild(th1);
                theader2.appendChild(th2);
            }

            // Create a new Column Header
            // if(!isExisted("productNameHeader")){
            //     var theader = document.getElementById("tableHeader");
            //     var th = document.createElement("th");
            //     th.innerText = "제품";
            //     th.id = "productNameHeader";
            //     th.setAttribute("rowspan", "2");
            //     theader.appendChild(th);
            // }


            // get final class name of current tr which obtains the clicked button
            var finalClassName = $(btnObj).parent().attr("class");
            // count the class name of current tr which obtains the clicked button
            var countClassName = $("."+finalClassName).length;
            // select the last tr with the class name that we selected above
            var refElement = $("tr"+"."+finalClassName+":last")[0];


            // New Process Product
            // var div = newProduct_2_2(alarmId, countClassName);


            // ==================== Alarm Product Total - (PT)
            var tdPT = getTD(alarmId, alarmProducts[i].TOTAL, "PT");

            var tdPN = getTD(alarmId, alarmProducts[i].REF_PRODUCT, "PN");
            // =====================

            var newTd = $("tr" + " > " + "td[data-id='" + alarmId + "']" )[0];

            if(newTd == undefined) {
                // Add default product

                // var td = document.createElement("td");
                // td.appendChild(div);
                // td.setAttribute("data-id", alarmId);
                // td.className = "tdProduct";
                var tr = $(btnObj).parent()[0];
                tr.appendChild(tdPT);
                tr.appendChild(tdPN);
            }

            if(countClassName >= 1  && newTd != undefined){

                // var cell = addProductFamily();
                var row = addRowAfter(btnObj);
                row.insertCell(0);

                var cell = row.cells[0];
                cell.className = "tdPN" ;
                cell.setAttribute("data-id",alarmId);
                cell.id = "tdPN" + alarmId + "_" + countClassName;
                cell.innerHTML = tdPN.innerHTML;


                row.insertCell(0);
                var cell2 = row.cells[0];
                cell2.className = "tdPT" ;
                cell2.setAttribute("data-id",alarmId);
                cell2.id = "tdPT" + alarmId + "_" + countClassName;
                cell2.innerHTML = tdPT.innerHTML;

                // cell.appendChild(div);
                var rowspan = parseInt($('#td'+alarmId).attr('rowSpan'));
                $('#td'+alarmId).attr('rowSpan', (rowspan + 1));
                $('#tdTotal'+alarmId).attr('rowSpan', (rowspan + 1));
            }
            var productYear = alarmProducts[i].ALARM_PRODUCT_YEAR;
            if(productYear != null){
                newProductYear_FromDB(alarmId, productYear, result, btnObj);
            }
        }
    }


    // GET TD
    function getTD(alarmId, text, className){
        var td = document.createElement("td");
        td.id = "td"+className + alarmId;
        td.className = "td"+className;
        td.setAttribute("data-id", alarmId);


        var span = document.createElement("span");
        span.setAttribute("id", "span" + className + alarmId);
        span.setAttribute("class", "span" + className);
        span.innerText = text;

        td.appendChild(span);

        return td;
    }



    // -- Step 2-2. Create Div to store elements of New Process Product
    // This function is used to create div for default process product
    function newProduct_2_2(alarmId, countClassName){
        // Create a new row
        var div = document.createElement("div");
        div.className = "divProduct";
        div.id = "divProduct" + alarmId + "_" + countClassName;



        return div;
    }

    function addRowAfter(btnObj){
        // get final class name of current tr which obtains the clicked button
        var finalClassName = $(btnObj).parent().attr("class");
        // count the class name of current tr which obtains the clicked button
        var countClassName = $("."+finalClassName).length;

        // select the last tr with the class name that we selected above
        var refElement = $("tr"+"."+finalClassName+":last")[0];

        var newRow= document.createElement('tr');
        newRow.id = finalClassName+ "_" + (countClassName + 1); // plus one because of new element
        newRow.className = finalClassName;

        refElement.parentNode.insertBefore(newRow, refElement.nextSibling);
        return newRow;
    }


    // ==== Add counting month by year
    // Step 2.1 -- Create Product Td From Database
    function newProductYear_FromDB(alarmId, productYear, result, btnObj){

        for(let i=0; i< productYear.length; i++){


            // Create a new Column Header
            if(!isExisted("year"+productYear[i].YEAR+"Header")){
                var theader = document.getElementById("tableHeader");
                var th = document.createElement("th");
                th.innerText = productYear[i].YEAR;
                th.id = "year"+productYear[i].YEAR+"Header";
                th.setAttribute("class", "yearHeader");
                th.setAttribute("colspan", "12");
                theader.appendChild(th);

                var theader2 = document.getElementById("tableHeader2");
                var th1 = document.createElement("th");
                th1.innerText = "1";
                th1.className = "thYear";
                theader2.appendChild(th1);

                var th2 = document.createElement("th");
                th2.innerText = "2";
                th2.className = "thYear";
                theader2.appendChild(th2);

                var th3 = document.createElement("th");
                th3.innerText = "3";
                th3.className = "thYear";
                theader2.appendChild(th3);

                var th4 = document.createElement("th");
                th4.innerText = "4";
                th4.className = "thYear";
                theader2.appendChild(th4);

                var th5 = document.createElement("th");
                th5.innerText = "5";
                th5.className = "thYear";
                theader2.appendChild(th5);

                var th6 = document.createElement("th");
                th6.innerText = "6";
                th6.className = "thYear";
                theader2.appendChild(th6);

                var th7 = document.createElement("th");
                th7.innerText = "7";
                th7.className = "thYear";
                theader2.appendChild(th7);

                var th8 = document.createElement("th");
                th8.innerText = "8";
                th8.className = "thYear";
                theader2.appendChild(th8);

                var th9 = document.createElement("th");
                th9.innerText = "9";
                th9.className = "thYear";
                theader2.appendChild(th9);

                var th10 = document.createElement("th");
                th10.innerText = "10";
                th10.className = "thYear";
                theader2.appendChild(th10);

                var th11 = document.createElement("th");
                th11.innerText = "11";
                th11.className = "thYear";
                theader2.appendChild(th11);

                var th12 = document.createElement("th");
                th12.innerText = "12";
                th12.className = "thYear";
                theader2.appendChild(th12);

            }

            // get final class name of current tr which obtains the clicked button
            var finalClassName = $(btnObj).parent().attr("class");
            // count the class name of current tr which obtains the clicked button
            var countClassName = $("."+finalClassName).length;
            // select the last tr with the class name that we selected above
            var refElement = $("tr"+"."+finalClassName+":last")[0];

            // ==================== Alarm Product Total - (PT)
            var year = productYear[i].YEAR;
            var tdM1 = getTD(alarmId, productYear[i].M1, "Year");
            var tdM2 = getTD(alarmId, productYear[i].M2, "Year");
            var tdM3 = getTD(alarmId, productYear[i].M3, "Year");
            var tdM4 = getTD(alarmId, productYear[i].M4, "Year");
            var tdM5 = getTD(alarmId, productYear[i].M5, "Year");
            var tdM6 = getTD(alarmId, productYear[i].M6, "Year");
            var tdM7 = getTD(alarmId, productYear[i].M7, "Year");
            var tdM8 = getTD(alarmId, productYear[i].M8, "Year");
            var tdM9 = getTD(alarmId, productYear[i].M9, "Year");
            var tdM10 = getTD(alarmId, productYear[i].M10, "Year");
            var tdM11 = getTD(alarmId, productYear[i].M11, "Year");
            var tdM12 = getTD(alarmId, productYear[i].M12, "Year");

            if(countClassName == 1) {
                var tr = $(btnObj).parent()[0];
                tr.appendChild(tdM1);
                tr.appendChild(tdM2);
                tr.appendChild(tdM3);
                tr.appendChild(tdM4);
                tr.appendChild(tdM5);
                tr.appendChild(tdM6);
                tr.appendChild(tdM7);
                tr.appendChild(tdM8);
                tr.appendChild(tdM9);
                tr.appendChild(tdM10);
                tr.appendChild(tdM11);
                tr.appendChild(tdM12);
            } else{
                var tr3 = $(btnObj).parent().closest("tr").next("tr");
                for(let k = 2; k < countClassName; k++){
                    tr3 = $(tr3).closest("tr").next("tr");
                }

                tr3 = $(tr3)[0];
                tr3.appendChild(tdM1);
                tr3.appendChild(tdM2);
                tr3.appendChild(tdM3);
                tr3.appendChild(tdM4);
                tr3.appendChild(tdM5);
                tr3.appendChild(tdM6);
                tr3.appendChild(tdM7);
                tr3.appendChild(tdM8);
                tr3.appendChild(tdM9);
                tr3.appendChild(tdM10);
                tr3.appendChild(tdM11);
                tr3.appendChild(tdM12);
            }
        }
        sumTotal();
    }

    function sumTotal(){

        var totals = document.getElementsByClassName("spanTotal");
        var result = 0;
        for(let t of totals){
            result += parseInt(t.innerText);
        }
        $("#totalResult").text(result);
    }


    // Alarm History
    alarmStatistics.getAlarmHistory = function (line, alarmName, startYear, endYear, limit, page) {

        $.ajax({
            url: "/v1/api/fukoku/alarm-history",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"       :   line,
                "alarmName"  :   alarmName,
                "startTime"  :   startYear,
                "endTime"    :   endYear,
                "limit"      :   limit,
                "page"       :   page
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


    function spanClick(alarmName){
        console.log(alarmName);
        var startYear = $('#txtStartYear').val();
        var endYear = $('#txtStartYear').val();
        alarmStatistics.getAlarmHistory(lineName,alarmName, startYear, endYear, 15, 1);
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


    $(document).on('change','input:checkbox#show_month',function(){
        if($(this).is(":checked"))
        {
            $(".yearHeader").show();
            $(".thYear").show();
            $(".tdYear").show();

        }else{
            $(".yearHeader").hide();
            $(".thYear").hide();
            $(".tdYear").hide();
        }

    });

    $(document).on('change','input:checkbox#show_product',function(){
        if($(this).is(":checked"))
        {
            $("#productHeader").show();
            $(".ptHeader").show();
            $(".pnHeader").show();
            $(".tdPT").show();
            $(".tdPN").show();
        }else{
            $("#productHeader").hide();
            $(".ptHeader").hide();
            $(".pnHeader").hide();
            $(".tdPT").hide();
            $(".tdPN").hide();
        }

    });
});