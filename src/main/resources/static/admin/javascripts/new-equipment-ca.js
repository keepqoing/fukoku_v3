$(function () {
    var corelations = {};
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");
    var d = {};

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });



    corelations.getCorrelation = function(){
        //alert($("#process").val() + " " + $("#process2").val())
        console.log(d.MACHINE1);
        if($("#selectLine").val() == ""){
            alert("라인을 선택하십시오!");
            return;
        }
        if(d.MACHINE1 == undefined ||  d.MACHINE2 == undefined){
            alert("설비를 선택하십시오!");
            return;
        }
        if(d.PROCESS1 == undefined ||  d.PROCESS2 == undefined ) {
            alert("공정을 선택하십시오!");
            return;
        };

        $("#cTable").hide();
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/new-correlation",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"      :   $("#selectLine").val(),
                "machine1"   :   d.MACHINE1,
                "machine2"  :   d.MACHINE2,
                "process1"   :   d.PROCESS1,
                "process2"  :   d.PROCESS2,
                "startDate1" :   $("#txtStartDateX").val(),
                "endDate1"   :   $("#txtEndDateX").val(),
                "startDate2" :   $("#txtStartDateY").val(),
                "endDate2"   :   $("#txtEndDateY").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                console.log("*** === LINE = " + $("#selectLine").val());
                console.log("*** === machine1 = " + d.MACHINE1);
                console.log("*** === machine2 = " + d.MACHINE2);
                console.log("*** === process1 = " + d.PROCESS1);
                console.log("*** === process2 = " + d.PROCESS2);
                console.log("*** === startDateX = " + $("#txtStartDateX").val());
                console.log("*** === endDateX = " + $("#txtEndDateX").val());
                console.log("*** === startDateY = " + $("#txtStartDateY").val());
                console.log("*** === endDateY = " + $("#txtEndDateY").val());

                if(response.CODE == "7777"){
                    var settings = {
                        selector: "#corelation",
                        width: 750,
                        height: 450,
                        xLabel: d.MACHINE1+" "+(d.PROCESS1),
                        yLabel: d.MACHINE2+" "+(d.PROCESS2),
                    };
                    drawCorrelation(response.DATA1.DATA, settings);
                    $("#txtCorrelationValue").html(parseFloat(response.DATA1.CORRELATION));
                    $("#cTable").show();
                    closeLoading();
                }else{
                    closeLoading()
                }
                $("#cTable").show();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    corelations.getAllLinesName = function(){
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

    corelations.getAllProcessesByLineAndMachine = function(){
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/process/correlation",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"      :   $("#selectLine").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                console.log(response);
                $('#PROCESS_TABLE').html("");

                if(response.CODE == "7777"){
                    var machine = response.DATA[0].MACHINE1;
                    $.each(response.DATA, function(key, value){
                        $("#PROCESS_TABLE").append("<tr><td style=\"text-align: center; font-size: 15pt; width: 250px;\"><input type=\"hidden\" id=\"machine\" value='"+value.MACHINE.replace(" ", "")+"'/><strong style=\"font-size: 15px\">"+value.MACHINE.replace(" ", "")+"</strong></td><td><label id=\"leftId\" class=\"container\" style=\"margin-left: 10px; width:250px;\"><input type=\"radio\" name=\"optradioLeft\" data-id='"+value.MACHINE.replace(" ", "")+"' id=\"process\" value='"+value.NAME+"'>"+value.NAME+"<span class=\"checkmark\"></span></label></td><td><label id=\"rightId\" class=\"container\" style=\"margin-left: 10px; width:250px;\"><input type=\"radio\" name=\"optradioRight\" data-id='"+value.MACHINE.replace(" ", "")+"' id=\"process2\" value="+value.NAME+">"+value.NAME+"<span class=\"checkmark\"></span></label></td></tr>");
                    });
                }
                fixit($("table"))
                closeLoading();
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    corelations.getAllLinesName();

    $("#selectLine").change(function(){
        corelations.getAllProcessesByLineAndMachine();
    });

    $("#btnQuery").click(function(){
        $("#cTable").hide();
        $("#corelation").html("");
        console.log("Start Date X = " + $("#txtStartDateX").val());
        if ($("#txtStartDateX").val()=="" || $("#txtEndDateX").val()==""){
            alert("날짜를 입력하십시오!")
        } else if(corelations.convertStrDateTimeToEpoch($("#txtStartDateX").val()) > corelations.convertStrDateTimeToEpoch($("#txtEndDateX").val())){
            alert("Please check start date and end date");
        } else {
            startDateX = new Date($("#txtStartDateX").val());
            startDateY = startDateX;
            endDateX = new Date($("#txtEndDateX").val());
            endDateY = endDateX;



            intHour = parseInt($("#timeGapHour").val());
            intMinute = parseInt($("#timeGapMinute").val());
            intSecond = parseInt($("#timeGapSecond").val());
            console.log("Hour = " + (startDateX.getHours() + intHour));
            console.log("Minute = " + intMinute);
            console.log("Second = " + intSecond);

            startDateY.setHours(startDateY.getHours() + intHour);
            startDateY.setMinutes(startDateY.getMinutes()+ intMinute);
            startDateY.setSeconds(startDateY.getSeconds()+ intSecond);

            endDateY.setHours(endDateY.getHours() + intHour);
            endDateY.setMinutes(endDateY.getMinutes() + intMinute);
            endDateY.setSeconds(endDateY.getSeconds() + intSecond);

            $("#txtStartDateY").val(js_yyyy_mm_dd_hh_mm_ss(startDateY));
            $("#txtEndDateY").val(js_yyyy_mm_dd_hh_mm_ss(endDateY));


            corelations.getCorrelation();
        }
    });



    function js_yyyy_mm_dd_hh_mm_ss (dateTime) {
        now = dateTime;
        year = "" + now.getFullYear();
        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }



    corelations.convertStrDateTimeToEpoch = function(dateTime){
        return moment(dateTime, 'YYYY-MM-DD HH:mm').toDate().getTime();
    };

    $("#cTable").hide();

    $(document).on('click', '#leftId', function(evt){
        d["PROCESS1"] = $(this).children("input").val()
        d["MACHINE1"] = $(this).children("input").data("id")
    });

    $(document).on('click', '#rightId', function(evt){
        d["PROCESS2"] = $(this).children("input").val()
        d["MACHINE2"] = $(this).children("input").data("id")
    });
});