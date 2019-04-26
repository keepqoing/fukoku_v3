$(function () {
    var corelations = {};
    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    var data = [{xValue: 1, yValue: 2.00},{xValue: 2, yValue: 0.10},{xValue: 3, yValue: 0.12},{xValue: 4, yValue: 0.15},{xValue: 5, yValue: 0.17},{xValue: 6, yValue: 0.20},{xValue: 7, yValue: 0.24},{xValue: 8, yValue: 0.5},{xValue: 9, yValue: 0.3},{xValue: 10, yValue: 0.29},{xValue: 11, yValue: 0.25},{xValue: 12, yValue: 0.23},{xValue: 13, yValue: 0.22},{xValue: 14, yValue: 0.18},{xValue: 15, yValue: 0.12}];
    var data2 =  [{xValue: 1, yValue: 30},{xValue: 2, yValue: 10},{xValue: 3, yValue: 10},{xValue: 4, yValue: 10},{xValue: 5, yValue: 10},{xValue: 6, yValue: 20},{xValue: 7, yValue: 10},{xValue: 8, yValue: 10},{xValue: 9, yValue: 10},{xValue: 10, yValue: 12},{xValue: 11, yValue: 10},{xValue: 12, yValue: 10},{xValue: 13, yValue: 10},{xValue: 14, yValue: 10},{xValue: 15, yValue: 10}];
    var settings = {
        selector: "#corelation",
        width: 2000,
        height: 300,
        xLabel: "Process 1",
        yLabel: "P"
    };
    var settings2 = {
        selector: "#corelation2",
        width: 2000,
        height: 200,
        xLabel: "Process 1",
        yLabel: "Pn"
    };
    /*drawCorrelation(data, settings);
    drawCorrelation(data2, settings2);*/

    corelations.getAllLinesName1 = function(){
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
               // $("#selectLine").append("<option value=''>라인</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectLine").append("<option value="+value.MAPPING_NAME+">"+value.LINE_NAME+"</option>");
                    });

                    //alert($("#selectLine").val());
                    corelations.getAllMachineNameByLineName();

                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };


    corelations.getAllMachineNameByLineName = function(){
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
                //$("#selectMachine").append("<option value=''>설비</option>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#selectMachine").append("<option value="+value.MAPPING_NAME+">"+value.MACHINE_NAME+"</option>");
                    });
                    corelations.getProductName($("#selectLine").val() , $("#machine").val());
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    corelations.getAllLinesName1();
    $("#selectLine").change(function(){
        corelations.getAllMachineNameByLineName();
    });

    corelations.getProductName = function(line,machine){
        $.ajax({
            url: "/v1/api/fukoku/workpiece/find-product/"+line+"/"+machine,
            type: 'GET',
            dataType: 'JSON',
            data:{},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {
                $('#selectProduct').empty();
                $("#selectProduct").append("<option value=''>품종</option>");
                //console.log(response);
                if(response.code == "7777"){
                    console.log(response);
                    $.each(response.products, function(key, value){
                        $("#selectProduct").append("<option value="+value.NAME+">"+value.NAME+"</option>");
                    });
                }
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
                $('#PROCESS_TABLE').html("");
                $("#PROCESS_TABLE").append("<tr style=\"font-weight: bold;background-color: #3c8dbc;color: white; text-align: center;\"><td style=\"width: 250px;\">설비</td><td>Y인자기준항목</td><td>X인자 비교항목</td></tr>");
                if(response.CODE == "7777"){
                    $.each(response.DATA, function(key, value){
                        $("#PROCESS_TABLE").append("<tr><td style=\"text-align: center; font-size: 15pt; width: 250px;\"><strong>"+value.MACHINE+"</strong></td><td><label class=\"container\" style=\"margin-left: 10px; width:250px;\"><input type=\"radio\" name=\"optradioLeft\">"+value.NAME+"<span class=\"checkmark\"></span></label></td><td><label class=\"container\" style=\"margin-left: 10px; width:250px;\"><input type=\"radio\" name=\"optradioRight\">"+value.NAME+"<span class=\"checkmark\"></span></label></td></tr>");
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

    corelations.getAllProductName = function(){
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


    //corelations.getAllLinesName();

    /*$("#selectLine").change(function(){
        corelations.getAllProcessesByLineAndMachine();
    });*/

    corelations.getAllProduct= function(line,machine,product,startDate,endDate,process){
        console.log(line,machine,product,startDate, endDate,process);
        $.ajax({
            url: "/v1/api/fukoku/ppn/selectPpn",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName":line,
                "machineName":machine,
                "processName":process,
                "model":product,
                "startTime":startDate,
                "endTime":endDate
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(response) {


                console.log("response",response);

                $('#tbody').empty();
                $("#corelation").empty();
                $("#corelation2").empty();
                if(response.CODE == "7777"){
                    console.log("data",response.DATA);
                    var dataP = jQuery.map(response.DATA,function (n,i) {
                        return {"xValue":i+1, "yValue":n.read_point}
                    });
                    var dataPn = jQuery.map(response.DATA,function (n,i) {
                        return {"xValue":i+1, "yValue":n.daily_seq_ng}
                    });
                    console.log(data);
                    $.each(response.DATA, function(key, value){
                        $("#tbody").append(
                            "<tr><td>" + value.product_date+"</td><td>"+value.daily_seq+"</td><td>"+value.daily_seq_ng+"</td><td>"+value.read_point+"</td>   <!--<td></td>   <td></td>   <td></td>   <td></td>    <td></td>     --> </tr>"
                        );
                    });
                    drawCorrelation(dataP, settings);
                    drawCorrelation(dataPn, settings2);
                }
            },
            error:function(data,status,err) {
                console.log("error: "+data+" status: "+status+" err:"+err);
            }
        });
    };

    $("#btnQuery").click(function(){
        var line = $("#selectLine").val();
        var machine = $("#selectMachine").val();
        var product = "";//$('#selectProduct').val();
        var startDate = $('#txtstartDate').val();
        var endDate = $('#txtendDate').val();
        var process = "";//$('#process input[name=optionsRadios]:checked').val();

        corelations.getAllProduct(line,machine,product,startDate,endDate,process);
    });

});