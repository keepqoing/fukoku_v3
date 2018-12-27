$(function () {
    var calendarPage = {};
    var arr = [];
    var data = [];
    var d;
    var a = [];
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    function getAllLineName(callback){
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
                if(callback){
                    callback(response);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    }

    /* initialize the external events
    -----------------------------------------------------------------*/
    $('#external-events div.external-event').each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });

    function b(data) {
        /* initialize the calendar
        -----------------------------------------------------------------*/
        var calendar = $('#calendar').fullCalendar({
            header: {
                left: 'title',
                //center: 'agendaDay,agendaWeek,month',
                right: 'prev,next'
            },
            //editable: true,
            firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
            selectable: true,
            defaultView: 'month',
            axisFormat: 'h:mm',
            columnFormat: {
                month: 'ddd',    // Mon
                week: 'ddd d', // Mon 7
                day: 'dddd M/d',  // Monday 9/7
                agendaDay: 'dddd d'
            },
            titleFormat: {
                month: 'MMMM yyyy', // September 2009
                week: "MMMM yyyy", // September 2009
                day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
            },
            allDaySlot: false,
            selectHelper: true,
            select: function (start, end, allDay) {
                //$("input").not("input[type=button]").val("");
                $('#btnNewRecord').prop('disabled', false);
                $('#MULTI_RECORD').html('');
                arr = [];
                a = [];
                counter = 0;
                $("#btnSave").show();
                $("#btnDelete").hide();
                $("#btnSaveUpdate").hide();
                $("#selectWorkingTime").val("");
                $("#selectProduct").val("");
                $("#txtTotal").val("");
                var date = new Date(start);
                d = formatDate(date);
                $("#modalOperatingTimeCalendar").modal('show');
                calendar.fullCalendar('unselect');
            },
            eventClick: function (calEvent, jsEvent, view) {
                $('#btnNewRecord').prop('disabled', true);
                arr = [];
                a = [];
                counter = 0;
                $('#MULTI_RECORD').html('');
                id = calEvent.id;
                $("#btnSave").hide();
                $("#btnDelete").show();
                $("#btnSaveUpdate").show();
                calendarPage.getWorkTimeCalendar(id, function (response) {
                    $("#selectWorkingTime").val(response.DATA.OPERATING_TIME);
                    $("#selectProduct").val(response.DATA.PRODUCT);
                    $("#txtTotal").val(response.DATA.TOTAL);
                    var date = new Date(response.DATA.DATE);
                    d = formatDate(date);
                    $("input[name=crossDay][value=" + response.DATA.CROSS_DATE_LABEL + "]").prop('checked', true);
                });
                $("#modalOperatingTimeCalendar").modal('show');
            },
            events: data,
        });

                $('.fc-button-prev').click(function () {
                    $('#calendar').fullCalendar('removeEvents');
                    calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                        for(var i =0;i<data.length;i++) {
                            $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                        }
                    });
                });


        $('.fc-button-next').click(function () {
            $('#calendar').fullCalendar('removeEvents');
            calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                for(var i =0;i<data.length;i++) {
                    $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                }
            });
        });


        // testing
        /*
        $(document).on("click",".fc-button-prev span",function(){
            $('#calendar').fullCalendar('removeEvents');
            calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                for(var i =0;i<data.length;i++) {
                    $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                }
            });
        });


        $(document).on("click",".fc-button-next span",function(){
            $('#calendar').fullCalendar('removeEvents');
            calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                for(var i =0;i<data.length;i++) {
                    $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                }
            });
        });
        */
        // end testing
    }

    calendarPage.getAllCalendarsByMonthAndLine = function (callback) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/work-time-calendar",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line": $("#selectLine").val(),
                "shortDate": $(".fc-header-title").children(0).html()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    if (response.DATA.length > 0) {
                        data = [];
                        var date = response.DATA[0].CROSS_DATE;
                        var product = response.DATA[0].PRODUCT;
                        var totalDuration = 0;
                        var totalAmount = 0;
                        var title = "";
                        var flag = true;
                        var c = 'Blue';
                        $.each(response.DATA, function (key, value) {
                            /*var a = new Date(response.DATA[key].DATE);
                            if((a.getDate()%2)==0){
                                c = "#009933";
                            }else{
                                c = '#cc0000';
                            }
                            console.log(a.getDate()%2, c);*/

                            // Prepare data to calendar
                            var d = {};
                            d["id"] = response.DATA[key].ID;
                            d["title"] = response.DATA[key].START_TIME + " - " + response.DATA[key].END_TIME+" \n - "+response.DATA[key].WORKING_TYPE_NAME +", "+ response.DATA[key].CROSS_DATE + "\n - (" + response.DATA[key].PRODUCT + ", " + response.DATA[key].TOTAL + ")";
                            d["start"] = new Date(response.DATA[key].DATE);
                            d["textColor"] = "white";
                            if(d["start"].getDate()%2==0){
                                d["color"] = "#009933";
                                if (response.DATA[key].CROSS_DATE_LABEL == 'Yesterday'){
                                    d["color"] = "#009933";
                                }else{
                                    d["color"] = "#cc0000";
                                }
                            }else{
                                d["color"] = "#cc0000";
                                if (response.DATA[key].CROSS_DATE_LABEL == 'Yesterday'){
                                    d["color"] = "#cc0000";
                                }else{
                                    d["color"] = "#009933";
                                }
                            }

                            data.push(d);

                            // Find the header information
                            if(date == value.CROSS_DATE && product == value.PRODUCT){
                                totalDuration += value.DURATION;
                                totalAmount += value.TOTAL;
                                title = value.PRODUCT;
                                date = value.CROSS_DATE;
                                product = value.PRODUCT;
                                flag = true;
                            }else{
                                //title = value.PRODUCT;
                                //product = value.PRODUCT;
                                var head = '#('+title+', '+totalDuration+'분, '+totalAmount+'개'+')';
                                var a = new Date(date);
                                if((a.getDate()%2)==0){
                                    c = "#cc0000";
                                }else{
                                    c = '#009933';
                                }
                                var d1 = {
                                    title: head,
                                    start:  new Date(date),
                                    color: c,
                                    textColor: "white"
                                };
                                data.push(d1);
                                totalAmount = value.TOTAL;
                                totalDuration = value.DURATION;
                                title = value.PRODUCT;
                                date = value.CROSS_DATE;
                                product = value.PRODUCT;
                                flag = false;
                            }
                        });
                        // The last day of header information
                        if(flag == true){
                            //totalAmount += response.DATA[response.DATA.length-1].TOTAL;
                            //totalDuration += response.DATA[response.DATA.length-1].DURATION;
                            var head = '#('+title+', '+totalDuration+'분, '+totalAmount+'개'+')';
                            var a = new Date(response.DATA[response.DATA.length-1].CROSS_DATE);
                            if((a.getDate()%2)==0){
                                c = "#cc0000";
                            }else{
                                c = '#009933';
                            }
                            var d1 = {
                                title: head,
                                start:  new Date(date),
                                color: c,
                                textColor: "white"
                            };
                            data.push(d1);
                        }else{
                            totalAmount += response.DATA[response.DATA.length-1].TOTAL;
                            totalDuration += response.DATA[response.DATA.length-1].DURATION;
                            var head = '#('+title+', '+totalDuration+'분, '+totalAmount+'개'+')';
                            var a = new Date(response.DATA[response.DATA.length-1].CROSS_DATE);
                            if((a.getDate()%2)==0){
                                c = "#cc0000";
                            }else{
                                c = '#009933';
                            }
                            var d1 = {
                                title: head,
                                start:  new Date(date),
                                color: c,
                                textColor: "white"
                            };
                            data.push(d1);
                        }

                        /*for(var j=0;j<data.length;j++){
                            if(data[j].)
                        }*/
                    }
                }
                closeLoading();
                if (callback) {
                    callback(data);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    b(data);

    getAllLineName(function (response) {
        $('#selectLine').empty();
        if (response.CODE == "7777") {
            $.each(response.DATA, function (key, value) {
                $("#selectLine").append("<option value=" + value.MAPPING_NAME + ">" + value.LINE_NAME + "</option>");
            });
        }

        calendarPage.getAllCalendarsByMonthAndLine(function (data) {
            $('#calendar').fullCalendar('removeEvents');
            for(var i =0;i<data.length;i++) {
                $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
            }
        });
        calendarPage.getAllProductName();
    });

    calendarPage.getAllLinesName = function(){
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
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });
                }
                calendarPage.getAllProductName();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calendarPage.getAllWorkTime = function(){
        $.ajax({
            url: "/v1/api/fukoku/operating-time/select-box",
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectWorkingTime').empty();
                $("#selectWorkingTime").append("<option value=''>조업시간코드</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectWorkingTime").append("<option value="+value.ID+">"+value.WORKING_TYPE_NAME+" , "+value.TIME_TAG+" , "+value.START_TIME+"~"+value.END_TIME+" , "+value.START_DAY+"~"+value.END_DAY+" , "+value.START_DATE+"~"+value.END_DATE+" , "+value.WORK_TYPE_NAME+"</option>");
                    });
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    calendarPage.getAllProductName = function(){
        $.ajax({
            url: "/v1/api/fukoku/product/select-box",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "line"         :       $("#selectLine").val(),
                "machine"      :       ""
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

    calendarPage.addWorkTimeCalendar = function (data1, callback) {
        $.ajax({
            url: "/v1/api/fukoku/work-time-calendar",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data1),
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

    $("#btnSave").click(function () {
        if ($("#selectWorkingTime").val() == "" || $("#selectProduct").val() == "" || $("#selectTimeTag").val() == "0" || $("#txtTotal").val() == "") {
            alert("Please input the data!");
        } else {
            if(arr.length == 0){
                alert("Please add to list!");
            }else{
                var data = {DATA:arr};
                var data1 = {
                    "DATE"              :       JSON.stringify(data),
                    "LINE"              :       "",
                    "OPERATING_TIME"    :       "",
                    "PRODUCT"           :       "",
                    "SHORT_DATE"        :       "",
                    "CROSS_DATE"        :       "",
                    "CROSS_DATE_LABEL"  :       "",
                    "TOTAL"             :       0
                };
                calendarPage.addWorkTimeCalendar(data1, function (response) {
                    if (response.CODE == "0000") {
                        $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalOperatingTimeCalendar").trigger("click");

                        //console.log("data" , data); return;

                        calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                            $('#calendar').fullCalendar('removeEvents');
                            for(var i =0;i<data.length;i++) {
                                $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                            }
                        });
                    } else {
                        $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalOperatingTimeCalendar").trigger("click");
                    }
                });

                /*var crossDate = $("input[name=crossDay]:checked").val();
                if(crossDate=='Today')
                    crossDate = getCurrentDay(d);
                else
                    crossDate = getPreviousDay(d);
                var data1 = {
                    "DATE"              :       d,
                    "LINE"              :       $("#selectLine").val(),
                    "OPERATING_TIME"    :       $("#selectWorkingTime").val(),
                    "PRODUCT"           :       $("#selectProduct").val(),
                    "SHORT_DATE"        :       $(".fc-header-title").children(0).html(),
                    "CROSS_DATE"        :       crossDate,
                    "CROSS_DATE_LABEL"  :       $("input[name=crossDay]:checked").val(),
                    "TOTAL"             :       $("#txtTotal").val()
                };
                calendarPage.addWorkTimeCalendar(data1, function (response) {
                    if (response.CODE == "0000") {
                        $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalOperatingTimeCalendar").trigger("click");
                        calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                            $('#calendar').fullCalendar('removeEvents');
                            for(var i =0;i<data.length;i++) {
                                $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                            }
                        });
                    } else {
                        $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                        $("#modalOperatingTimeCalendar").trigger("click");
                    }
                });*/
            }
        }
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#selectWorkingTime").val() == "" || $("#selectProduct").val() == "" || $("#selectTimeTag").val() == "0" || $("#txtTotal").val() == "") {
            alert("Please input the data!");
        } else {
            var crossDate = $("input[name=crossDay]:checked").val();

            if(crossDate=='Today')
                crossDate = getCurrentDay(d);
            else
                crossDate = getPreviousDay(d);
            var data1 = {
                "OPERATING_TIME"    :       $("#selectWorkingTime").val(),
                "PRODUCT"           :       $("#selectProduct").val(),
                "LINE"              :       $("#selectLine").val(),
                "TOTAL"             :       $("#txtTotal").val(),
                "CROSS_DATE"        :       crossDate,
                "CROSS_DATE_LABEL"  :       $("input[name=crossDay]:checked").val(),
                "ID"                :       id
            };
            calendarPage.updateWorkTimeCalendar(data1, function (response) {
                if (response.CODE == "0000") {
                    $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTimeCalendar").trigger("click");
                    calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                        $('#calendar').fullCalendar('removeEvents');
                        for(var i =0;i<data.length;i++) {
                            $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                        }

                    });

                } else {
                    $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalOperatingTimeCalendar").trigger("click");
                }
            });



        }
    });

    $("#btnDelete").click(function () {
        calendarPage.deleteAssignOperatingTime(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                $("#modalOperatingTimeCalendar").trigger("click");
                calendarPage.getAllCalendarsByMonthAndLine(function (data) {
                    $('#calendar').fullCalendar('removeEvents');
                    for(var i =0;i<data.length;i++) {
                        $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
                    }
                });
            } else {
                $("#modalOperatingTimeCalendar").attr("data-toastr-notification", response.MESSAGE);
                $("#modalOperatingTimeCalendar").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    calendarPage.getWorkTimeCalendar = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/work-time-calendar/" + id,
            type: 'GET',
            dataType: 'JSON',
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
    }

    calendarPage.updateWorkTimeCalendar = function (data1, callback) {
        $.ajax({
            url: "/v1/api/fukoku/work-time-calendar/update",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data1),
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
    }

    calendarPage.getAllWorkTime();
    $("#selectLine").change(function(){
        calendarPage.getAllCalendarsByMonthAndLine(function (data) {
            $('#calendar').fullCalendar('removeEvents');
            for(var i =0;i<data.length;i++) {
                $('#calendar').fullCalendar('renderEvent', data[i], 'stick');
            }
        });
        calendarPage.getAllProductName();
    });

    calendarPage.deleteAssignOperatingTime = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/work-time-calendar/" + id,
            type: 'DELETE',
            dataType: 'JSON',
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
    }

    $('#MULTI_RECORD').on('hide.bs.modal', function () {
        alert(2);
    });

    //counter = 1;
    document.getElementById('btnNewRecord').addEventListener('click', function () {
        if ($("#selectWorkingTime").val() == "" || $("#selectProduct").val() == "" || $("#selectTimeTag").val() == "0" || $("#txtTotal").val() == "") {
            alert("Please input the data!");
        } else {
            //counter++;
            var crossDate = $("input[name=crossDay]:checked").val();
            if(crossDate=='Today')
                crossDate = getCurrentDay(d);
            else
                crossDate = getPreviousDay(d);
            var str = $("#selectWorkingTime option:selected").text().trim();
            var strSplit = str.split(",");
            var d12 = {DATE:crossDate + " " + strSplit[2],CODE: strSplit[5],PRODUCT:$('#selectProduct').val(),TOTAL:$('#txtTotal').val()};
            a.push(d12);
            a.sort(function(a,b) {return (a.DATE > b.DATE) ? 1 : ((b.DATE > a.DATE) ? -1 : 0);} );
            $('#MULTI_RECORD').html('');
            var counter = 0;
            for(var i=0;i<a.length;i++) {
                counter++;
                $('#MULTI_RECORD').append('<tr>' +
                    '<td>' + counter + '</td>' +
                    '<td>' + a[i].DATE + '</td>' +
                    '<td>' + a[i].CODE + '</td>' +
                    '<td>' + a[i].PRODUCT + '</td>' +
                    '<td>' + a[i].TOTAL + '</td>' +
                    '<td><button class="btn btn-danger btn-xs" id="btnRemove"><i class="fa fa-trash fa-lg">삭제</i></button></td>' +
                    '</tr>');
            }

            /*$('#MULTI_RECORD').append('<tr>' +
                '<td>' + counter + '</td>' +
                '<td>' + /!*$("input[name=crossDay]:checked").parent('label').text()*!/crossDate + " " + strSplit[2] + '</td>' +
                '<td>' + strSplit[5] + '</td>' +
                '<td>' + $('#selectProduct').val() + '</td>' +
                '<td>' + $('#txtTotal').val() + '</td>' +
                '<td><button class="btn btn-danger btn-xs" id="btnRemove"><i class="fa fa-trash fa-lg">삭제</i></button></td>' +
                '</tr>');*/
            //}
        }
        var crossDate = $("input[name=crossDay]:checked").val();
        if(crossDate=='Today')
            crossDate = getCurrentDay(d);
        else
            crossDate = getPreviousDay(d);
        var data1 = {
            "DATE"              :       d,
            "LINE"              :       $("#selectLine").val(),
            "OPERATING_TIME"    :       $("#selectWorkingTime").val(),
            "PRODUCT"           :       $("#selectProduct").val(),
            "SHORT_DATE"        :       $(".fc-header-title").children(0).html(),
            "CROSS_DATE"        :       crossDate,
            "CROSS_DATE_LABEL"  :       $("input[name=crossDay]:checked").val(),
            "TOTAL"             :       $("#txtTotal").val()
        };
        arr.push(data1);
    });

    $(document).on('click', '#btnRemove', function (e) {
        e.preventDefault();
        var rowIndex = $('#MULTI_RECORD tr').index($(this).closest('tr'));
        $("#MULTI_RECORD tr").eq(rowIndex).remove();
        arr.splice(rowIndex, 1);
        a.splice(rowIndex, 1);
        $('#MULTI_RECORD').html('');
        var counter = 0;
        for(var i=0;i<a.length;i++) {
            counter++;
            $('#MULTI_RECORD').append('<tr>' +
                '<td>' + counter + '</td>' +
                '<td>' + a[i].DATE + '</td>' +
                '<td>' + a[i].CODE + '</td>' +
                '<td>' + a[i].PRODUCT + '</td>' +
                '<td>' + a[i].TOTAL + '</td>' +
                '<td><button class="btn btn-danger btn-xs" id="btnRemove"><i class="fa fa-trash fa-lg">삭제</i></button></td>' +
                '</tr>');
        }
    });

    $('#btnExcel').click(function(){
        alert(1);
    });
});