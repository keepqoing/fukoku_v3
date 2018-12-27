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
        $("#cTable").hide();
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/statistic/correlation",
            type: 'GET',
            dataType: 'JSON',
            data:{
                "line"      :   $("#selectLine").val(),
                "machine"   :   d.MACHINE,
                "machine2"  :   d.MACHINE2,
                "process"   :   d.PROCESS,
                "process2"  :   d.PROCESS2,
                "startDate" :   $("#txtStartDate").val(),
                "endDate"   :   $("#txtEndDate").val()
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                if(response.CODE == "7777"){
                    var settings = {
                        selector: "#corelation",
                        width: 750,
                        height: 450,
                        xLabel: d.MACHINE+" "+(d.PROCESS),
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
                $("#PROCESS_TABLE").append("<tr style=\"font-weight: bold;background-color: #3c8dbc;color: white; text-align: center;\"><td style=\"width: 250px;\">설비</td><td>Y인자기준항목</td><td>X인자 비교항목</td></tr>");
                if(response.CODE == "7777"){
                    var machine = response.DATA[0].MACHINE;
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
        if ($("#txtStartDate").val()=="" || $("#txtEndDate").val()==""){
            alert("Please input the data!")
        }else {
            corelations.getCorrelation();
        }
    });

    $("#cTable").hide();

    $(document).on('click', '#leftId', function(evt){
        d["PROCESS"] = $(this).children("input").val()
        d["MACHINE"] = $(this).children("input").data("id")
    });

    $(document).on('click', '#rightId', function(evt){
        d["PROCESS2"] = $(this).children("input").val()
        d["MACHINE2"] = $(this).children("input").data("id")
    });
});