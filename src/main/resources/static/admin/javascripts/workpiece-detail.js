$(function() {

    var workpiece = {};

    var dataTable = null;
    var jsonWorkpieceData = null;
    var currentGraph = 0;

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });



    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    function appendObjTo(thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }


    workpiece.generateGraph = function (response,start) {
        if (start <= response.workpieces.length) {
           console.log(start +'<='+ response.workpieces.length);
            for (var j = 0; j < 20; j++) {


                currentGraph++ ;
                // Generate Graph
                console.log("currentGraph : "+ currentGraph);
                console.log( response.workpieces[currentGraph]);
                console.log(
                    "generating graph: " + currentGraph +
                    " UCL: " + response.workpieces[currentGraph].ucl +
                    " LCL: " + response.workpieces[currentGraph].lcl +
                    " Max: " + response.workpieces[currentGraph].product_max_rd);
                $("#graphBlock").append(
                    '<div class="table-responsive" style="display:inline-block;border-right: 2px dotted black">' +
                    '<div class="table" style="margin-bottom: 0px" id="bar-chart' + currentGraph + '">' +

                    '</div>' +
                    '<div style="width: 100%">' +
                    '<span style="display: inline-block;padding-right:20px;"><h6>' + response.workpieces[currentGraph].product_start_time + '</h6></span>' +
                    '<span style="display: inline-block;float: right;padding-right:20px;"><h6>' + response.workpieces[currentGraph].product_end_time + '</h6></span>' +
                    '</div>' +
                    '</div>');

                var readData = $.parseJSON(response.workpieces[currentGraph].read_data);
                var readPoint = $.parseJSON(response.workpieces[currentGraph].read_point);
                //var readPoint = response.workpieces[currentGraph].READ_POINT_ARR;
                var dataArrayObject = [];

                if (readData != null && readPoint != null) {
                    if (readData.length == readPoint.length) {
                        for (i = 0; i < readPoint.length; i++) {
                            var dataObj = {};
                            dataObj.num_sent = readPoint[i]; // Time
                            dataObj.perc = readData[i];      //  Value
                            dataArrayObject = appendObjTo(dataArrayObject, dataObj);
                        }
                    } else {
                        console.log("Read data: " + readData.length + " is not equal read point: " + readPoint.length);
                    }
                    //console.log(dataArrayObject);

                    var barChart = Chart.barChart({
                        selector: "#bar-chart" + currentGraph,
                        data: dataArrayObject,
                        width: 500,
                        height: 400,
                        dimensionName: 'num_sent',
                        yAxisLabel: response.workpieces[currentGraph].ID + "." + response.workpieces[currentGraph].product_name,
                        onClick: function (d, i, el) {
                        }
                    })

                    barChart.createHorizontalLineUCL((response.workpieces[currentGraph].UCL / 100) * response.workpieces[currentGraph].product_max_rd);
                    barChart.createHorizontalLineLCL((response.workpieces[currentGraph].LCL / 100) * response.workpieces[currentGraph].product_min_rd);

                }

                // .End Generate Graph

            } // End Loop
        }else{
            console.log(start +'>'+ response.workpieces.length);
        }

    };


    // Graph
    workpiece.findProcessLine = function(data){

        if(data == null){
            data = {
                "END_TIME": "1516003390000",
                "LINE_NAME": "IB",
                "LIST_PROCESS_NAME": [
                    "1차불균형량","1차드릴수"
                ],
                "MACHINE_NAME": "IB_Balancer",
                "MODEL": "Model-1",
                "START_TIME": "1516003383000"
            };
        }


        swal({   title: "검색중" ,
            text: "",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function(){


            $.ajax({
                url: "/v1/api/fukoku/workpiece/find-workpiece",
                type: 'POST',
                dataType: 'JSON',
                data: JSON.stringify(data) ,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function(response) {

                    console.log("%%%%%%%%%%%%%% "+response.workpieces);
                    console.log(response.workpieces[response.workpieces.length-1].count_graph);

                    var dataValue = [];
                    var uclValue = [];
                    var lclValue = [];
                    for (i = 0; i < response.workpieces.length; i++) {
                        //var graphIndex = i;
                        //var workpieceLength = response.workpieces.length;
                        for (j = 0; j < response.workpieces[i].bar_values.length; j++) {
                            //console.log(graphIndex);
                            dataValue.push(response.workpieces[i].bar_values[j]);
                            uclValue.push(response.workpieces[i].ucl_values[j]);
                            lclValue.push(response.workpieces[i].lcl_values[j]);
                            //graphIndex++
                        }

                    }

                    var dataArrObj = [];
                    var dataValueObj1 = {};
                    dataValueObj1.key = "Data";
                    dataValueObj1.bar = true;
                    dataValueObj1.values = dataValue;
                    dataArrObj = appendObjTo(dataArrObj, dataValueObj1);


                    var dataValueObj2 = {};
                    dataValueObj2.key = "UCL";
                    dataValueObj2.bar = false;
                    dataValueObj2.values = uclValue;
                    dataArrObj = appendObjTo(dataArrObj, dataValueObj2);

                    var dataValueObj3 = {};
                    dataValueObj3.key = "LCL";
                    dataValueObj3.bar = false;
                    dataValueObj3.values = lclValue;
                    dataArrObj = appendObjTo(dataArrObj, dataValueObj3);

                    console.log(dataArrObj);



                    return;

                    if(response.code == "7777"){



                        jsonWorkpieceData = response;

                        //console.log($.parseJSON(response.workpieces[0].READ_DATA));
                        //console.log($.parseJSON(response.workpieces[0].READ_POINT));

                        $("#filteringMessage").empty();
                        $("#graphBlock").empty();



                        $("#selectItem").text(processHTML1.trim().slice(0, -1));
                        $("#fModel").text(response.workpieces[response.workpieces.length-1].model);
                        $("#fStartDate").text($("#startTime").find("input").val());
                        $("#fEndDate").text($("#endTime").find("input").val());
                        $("#fDs").text(response.workpieces[response.workpieces.length-1].daily_seq);
                        $("#fDsok").text(response.workpieces[response.workpieces.length-1].daily_seq_ok);
                        $("#fUph").text(response.workpieces[response.workpieces.length-1].uph);
                        $("#fCp").text(response.workpieces[response.workpieces.length-1].cp);
                        $("#fCpk").text(response.workpieces[response.workpieces.length-1].cpk);
                        $("#fshikan").text(  $scope.toTimestamp($("#endTime").find("input").val()) - $scope.toTimestamp($("#startTime").find("input").val())   );


                         dataTable.destroy();
                         dataTable = $('#dataTable').DataTable({
                            "paging": true,
                            "lengthChange": true,
                            "searching": false,
                            "ordering": true,
                            "info": true,
                            "autoWidth": true,
                            "data": response.workpieces,
                            "columns": [{
                                "title": "#",
                                "data": "id"
                            }, {
                                "title": "품종",
                                "data": "model"

                            }, {
                                "title": "START TIME",
                                "data": "cv_start_time"

                            }, {
                                "title": "END TIME",
                                "data": "cv_end_time"

                            }, {
                                "title": "LCL",
                                "data": "lcl"

                            }, {
                                "title": "UCL",
                                "data": "ucl"
                            },{
                                "title": "측정량",
                                "data": "product_max_rd"
                            },{
                                "title": "판정",
                                "data": "product_quality"
                            },{
                                "title": "순도정시간",
                                "data": "product_hour"
                            },{
                                "title": "공정시간",
                                "data": "product_cycle"
                            },{
                                "title": "비고",
                                "data": "product_quality"
                            }]
                        });



                        //workpiece.generateGraph(response,currentGraph);

                        for(j=0;j<20;j++){


                            currentGraph = j;
                            // Generate Graph
                            if(j < 20) {
                                console.log(
                                    "generating graph: " + j +
                                    " UCL: " + response.workpieces[j].ucl +
                                    " LCL: " + response.workpieces[j].lcl +
                                    " Max: " + response.workpieces[j].product_max_rd);
                                $("#graphBlock").append(
                                    '<div class="table-responsive" style="display:inline-block;border-left: 2px dotted black">' +
                                        '<div class="table" style="margin-bottom: 0px" id="bar-chart' + j + '">' +

                                        '</div>' +
                                        '<div style="width: 100%">' +
                                            '<span style="display: inline-block;padding-left:20px;"><h6>'+response.workpieces[j].start_time+'</h6></span>' +
                                            '<span style="display: inline-block;float: right;padding-right:20px;"><h6>'+response.workpieces[j].end_time+'</h6></span>' +
                                        '</div>'+
                                    '</div>');

                                var readData = $.parseJSON(response.workpieces[j].read_data);
                                var readPoint = $.parseJSON(response.workpieces[j].read_point);
                                //var readPoint = response.workpieces[j].READ_POINT_ARR;
                                var dataArrayObject = [];

                                if(readData != null && readPoint != null){
                                    if (readData.length == readPoint.length) {
                                        for (i = 0; i < readPoint.length; i++) {
                                            var dataObj = {};
                                            dataObj.num_sent = readPoint[i]; // Time
                                            dataObj.perc = readData[i];      //  Value
                                            dataArrayObject = appendObjTo(dataArrayObject, dataObj);
                                        }
                                        /*
                                        var dataObj1 = {};
                                        dataObj1.num_sent = 0;// Time
                                        dataObj1.perc = response.workpieces[j].PRODUCT_MAX_RD;       //  Value
                                        var dataObj2 = {};
                                        dataObj2.num_sent = 0;// Time
                                        dataObj2.perc = response.workpieces[j].PRODUCT_MIN_RD;       //  Value
                                        dataArrayObject = appendObjTo(dataArrayObject, dataObj1);
                                        dataArrayObject = appendObjTo(dataArrayObject, dataObj2);
                                        */
                                    } else {
                                        console.log("Read data: " + readData.length + " is not equal read point: " + readPoint.length);
                                    }
                                    //console.log(dataArrayObject);

                                    var barChart = Chart.barChart({
                                        selector: "#bar-chart" + j,
                                        data: dataArrayObject,
                                        width: 500,
                                        height: 400,
                                        dimensionName: 'num_sent',
                                        yAxisLabel: response.workpieces[j].id+"."+response.workpieces[j].product_name,
                                        onClick: function (d, i, el) {
                                        }
                                    })

                                    barChart.createHorizontalLineUCL((response.workpieces[j].ucl / 100) * response.workpieces[j].product_max_rd);
                                    barChart.createHorizontalLineLCL((response.workpieces[j].lcl / 100) * response.workpieces[j].product_max_rd);

                                }

                            }else{
                                console.log("Else: "+ j);
                                break;
                            }
                            // .End Generate Graph

                        } // End Loop

                        //dataTable.draw();
                        swal("검색결과: "+response.workpieces.length+" 건");
                        $("#totalFound").html("<h3>검색결과: "+response.workpieces.length+" 건</h3>");




                    }else{
                        swal("Found: 0 Record(s)");
                        $("#filteringMessage").html("<div class=\"callout callout-warning\">\n" +
                            "                <h4><i class=\"icon fa fa-warning\"></i> Data not found!</h4>\n" +
                            "              </div>");
                    }
                },
                error:function(data,status,err) {
                    console.log("error: "+data+" status: "+status+" err:"+err);
                }
            });



        });




    };





    $(document).on('click',"#btQuery" , function(){

        dataTable = $('#dataTable').DataTable();

        if( $("#selectProductTest").val() == ""){
            alert("Please select 품종!");
            return;
        }

        /*
        data = {
            lineName : $("#selectLine").val() ,
            machineName : $("#selectMachine").val(),
            model : $("#selectProduct").val(),
            startTime : new Date($("#startTime").find("input").val()).getTime(),
            endTime : new Date($("#startTime").find("input").val()).getTime(),
            processName : "2차 V홈 흔들림 값"
        };

    */

        startTime = toTimestamp($("#startTime").find("input").val())    ;
        endTime =  toTimestamp($("#endTime").find("input").val());

        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "LIST_PROCESS_NAME": process,
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  $("#selectProductTest").val(),
            "START_TIME": startTime
        };


        console.log(data);

        workpiece.findProcessLine(data);

    });


        $('#dataTable').on('page.dt', function(){
            var info = dataTable.page.info();
            console.log( 'Showing page: '+info.page+' of '+info.pages );
        });








    var lastScrollLeft = 0;
    $("#graphBlock").scroll(function() {
        var elmnt = document.getElementById("graphBlock");
        var x = elmnt.scrollWidth;
        console.log($(this).scrollLeft()  + "  " + x);
        if( $(this).scrollLeft() >= (x/1.5) ) {
            console.log("bottom!");
            workpiece.generateGraph(jsonWorkpieceData,currentGraph+1)
        }
    });















});