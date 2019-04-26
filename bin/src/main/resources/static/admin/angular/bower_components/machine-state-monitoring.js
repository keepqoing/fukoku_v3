


    var process = {};
    var colorIbPre1, colorIbPre2, colorIbPre3, colorIbPnt, colorIbRunout, colorIbBalancer, colorIbManual;
    var colorHcPre, colorHcPnt, colorHcPaka, colorHcRunout, colorHcManual;
    var colorHDPre, colorHDPnt, colorHDPaka, colorHDRunout, colorHDBalancer, colorHDTmarker;
    var colorHAPre, colorHAPnt, colorHAPaka, colorHARunout, colorHABalancer;
    var colorHBPre, colorHBBalancer, colorHBPaka, colorHBPnt, colorHBTmarker;
    var colorPDPre, colorPDOven, colorPDBalancer, colorPDPaka, colorPDPnt, colorPDTmarker;
    var eetHc = 1515991559000;
    /*1515991424000;*/
    var estHc = 1515991564000;
    /*1515991429000;*/

    var eetS = 1516698001000;
    var eetB = 1516698027000;
    var est, eet;
    var estNew, eetNew;
    var HC_LINE, HC_LINE2, HC_LINE3, HC_LINE4;
    var tempHcPre = 'offline';
    var tempHcPaka = 'offline';
    var tempHcPnt = 'offline';
    var tempHcRunout = 'offline';
    var tempHcBalancer = 'offline';
    var tempHcTp = 'offline';
    var tempHcManual = 'offline';

    var tempHDPre = 'offline';
    var tempHDPaka = 'offline';
    var tempHDPnt = 'offline';
    var tempHDRunout = 'offline';
    var tempHDBalancer = 'offline';
    var tempHDTmarker = 'offline';

    var tempHBPre = 'offline';
    var tempHBBalancer = 'offline';
    var tempHBPaka = 'offline';
    var tempHBPnt = 'offline';
    var tempHBTmarker = 'offline';

    var tempHAPre = 'offline';
    var tempHAPaka = 'offline';
    var tempHAPnt = 'offline';
    var tempHARunout = 'offline';
    var tempHABalancer = 'offline';
    var tempHATmarker = 'offline';

    var tempPDPre = 'offline';
    var tempPDOven = 'offline';
    var tempPDBalancer = 'offline';
    var tempPDPaka = 'offline';
    var tempPDPnt = 'offline';
    var tempPDTmarker = 'offline';

    var tempIbPre1 = 'offline';
    var tempIbPre2 = 'offline';
    var tempIbPre3 = 'offline';
    var tempIbPnt = 'offline';
    var tempIbRunout = 'offline';
    var tempIbBalancer = 'offline';
    var tempIbManual = 'offline';

    $(function () {


        var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

        // Prepend context path to all jQuery AJAX requests
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (!options.crossDomain) {
                options.url = _ctx + options.url;
            }
        });


        var counter = 0;
        var st, et;
        estNew = est;
        eetNew = eet;
        eetSNew = eetS;
        eetBNew = eetB;
        var intervals;
        var lineName;


        function timeInterval() {
            intervals = setInterval(function () {
                /*  var line = $("#scenes_list").val();
                  if (line === 'IB') {
                      var temp1 = estNew + 5000;
                      var temp2 = eetNew + 5000;

                      if (est < temp1) {
                          estNew = temp1;
                      }
                      if (eet < temp2) {
                          eetNew = temp2;
                      }

                      process.findMStateByLineAndStartTimeAndEndTime(estNew, eetNew);*/
                // } else if (line === 'HC') {
                var temp3 = eetBNew;
                var temp4 = eetBNew + 10000;

                if (eetS < temp3) {
                    eetSNew = temp3;
                }
                if (eetB < temp4) {
                    eetBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetSNew, eetBNew);

                // }
            }, 5000);
        }


        process.findMStateByLineAndStartTimeAndEndTime = function (start, end) {
            process.findAssignedProducedProductList();
            console.log("******************** " + eetSNew + "   " + eetBNew);
            clearInterval(intervals);
            $.ajax({
                url: "/v1/api/fukoku/mstatemonitor",
                type: 'GET',
                dataType: 'JSON',
                data: {
                    "lineName": "All",
                    "machineName": "IB_Pre",
                    "startTime": start,
                    "endTime": end

                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (response) {
                    console.log(response);
                    colorHcPre = tempHcPre;
                    colorHcPaka = tempHcPaka;
                    colorHcPnt = tempHcPnt;
                    colorHcRunout = tempHcRunout;
                    colorHcManual = tempHcManual;
                    colorHcBalancer = tempHcBalancer;
                    colorHcTp = tempHcTp;

                    colorHDPre = tempHDPre;
                    colorHDPaka = tempHDPaka;
                    colorHDPnt = tempHDPnt;
                    colorHDRunout = tempHDRunout;
                    colorHDBalancer = tempHDBalancer;
                    colorHDTmarker = tempHDTmarker;

                    colorPDPre = tempPDPre;
                    colorPDOven = tempPDOven;
                    colorPDBalancer = tempPDBalancer;
                    colorPDPaka = tempPDPaka;
                    colorPDPnt = tempPDPnt;
                    colorPDTmarker = tempPDTmarker;

                    colorHBPre = tempHBPre;
                    colorHBBalancer = tempHBBalancer;
                    colorHBPaka = tempHBPaka;
                    colorHBPnt = tempHBPnt;
                    colorHBTmarker = tempHBTmarker;

                    colorHAPre = tempHAPre;
                    colorHAPaka = tempHAPaka;
                    colorHAPnt = tempHAPnt;
                    colorHARunout = tempHARunout;
                    colorHABalancer = tempHABalancer;

                    colorIbPre1 = tempIbPre1;
                    colorIbPre2 = tempIbPre2;
                    colorIbPre3 = tempIbPre3;
                    colorIbBalancer = tempIbBalancer;
                    colorIbPnt = tempIbPnt;
                    colorIbRunout = tempIbRunout;
                    colorIbManual = tempIbManual;

                    document.getElementById("hcPre").style.backgroundColor = '#666666';
                    document.getElementById("hcPaka").style.backgroundColor = '#666666';
                    document.getElementById("hcPnt").style.backgroundColor = '#666666';
                    document.getElementById("hcBalancer").style.backgroundColor = '#666666';
                    document.getElementById("hcRunout").style.backgroundColor = '#666666';
                    var i = 0;
                    if (response.MESSAGE.match('NOT')) {
                        console.log("DATA NOT FUND");
                    }
                    else {
                        for (i; i < response.DATA.length; i++) {


                            //Get Line name
                            lineName = response.DATA[i].LINE_NAME;
                            if (response.DATA[i].MACHINE_NAME === 'IB_Pre1') {
                                //TODO set Product Model Name
                                document.getElementById("IB_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbPre1 = 'auto';
                                    tempIbPre1 = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbPre1 = 'wait';
                                    tempIbPre1 = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbPre1 = 'stop';
                                    tempIbPre1 = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbPre1 = 'offline';
                                    tempIbPre1 = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbPre1 = 'manual';
                                    tempIbPre1 = 'manual';
                                }
                            }

                            if (response.DATA[i].MACHINE_NAME === 'IB_Pre2') {
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbPre2 = 'auto';
                                    tempIbPre2 = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbPre2 = 'wait';
                                    tempIbPre2 = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbPre2 = 'stop';
                                    tempIbPre2 = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbPre2 = 'offline';
                                    tempIbPre2 = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbPre2 = 'manual';
                                    tempIbPre2 = 'manual';
                                }

                            }

                            if (response.DATA[i].MACHINE_NAME === 'IB_Pre3') {
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbPre3 = 'auto';
                                    tempIbPre3 = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbPre3 = 'wait';
                                    tempIbPre3 = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbPre3 = 'stop';
                                    tempIbPre3 = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbPre3 = 'offline';
                                    tempIbPre3 = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbPre3 = 'manual';
                                    tempIbPre3 = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'IB_Pnt') {
                                document.getElementById("IB_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbPnt = 'auto';
                                    tempIbPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbPnt = 'wait';
                                    tempIbPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbPnt = 'stop';
                                    tempIbPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbPnt = 'offline';
                                    tempIbPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbPnt = 'manual';
                                    tempIbPnt = 'manual';
                                }

                            }

                            if (response.DATA[i].MACHINE_NAME === 'IB_Runout') {
                                document.getElementById("IB_ProductModel_Runout").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbRunout = 'auto';
                                    tempIbRunout = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbRunout = 'wait';
                                    tempIbRunout = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbRunout = 'stop';
                                    tempIbRunout = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbRunout = 'offline';
                                    tempIbRunout = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbRunout = 'manual';
                                    tempIbRunout = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'IB_Balancer') {
                                document.getElementById("IB_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorIbBalancer = 'auto';
                                    tempIbBalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorIbBalancer = 'wait';
                                    tempIbBalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorIbBalancer = 'stop';
                                    tempIbBalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorIbBalancer = 'offline';
                                    tempIbBalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorIbBalancer = 'manual';
                                    tempIbBalancer = 'manual';
                                }

                            }

//TODO HA Conditon
                            if (response.DATA[i].MACHINE_NAME === 'HA_Pre') {
                                document.getElementById("HA_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHAPre = 'auto';
                                    tempHAPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHAPre = 'wait';
                                    tempHAPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHAPre = 'stop';
                                    tempHAPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHAPre = 'offline';
                                    tempHAPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHAPre = 'manual';
                                    tempHAPre = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'HA_Paka') {
                                document.getElementById("HA_ProductModel_Paka").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHAPaka = 'auto';
                                    tempHaPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHaPre = 'wait';
                                    tempHaPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHaPre = 'stop';
                                    tempHaPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHaPre = 'offline';
                                    tempHaPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHaPre = 'manual';
                                    tempHaPre = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'HA_Pnt') {
                                document.getElementById("HA_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHAPnt = 'auto';
                                    tempHAPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHAPnt = 'wait';
                                    tempHAPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHAPnt = 'stop';
                                    tempHAPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHAPnt = 'offline';
                                    tempHAPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHAPnt = 'manual';
                                    tempHAPnt = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'HA_Runout') {
                                document.getElementById("HA_ProductModel_Runout").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHARunout = 'auto';
                                    tempHARunout = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHARunout = 'wait';
                                    tempHARunout = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHARunout = 'stop';
                                    tempHARunout = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHARunout = 'offline';
                                    tempHARunout = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHARunout = 'manual';
                                    tempHARunout = 'manual';
                                }

                            }

                            if (response.DATA[i].MACHINE_NAME === 'HA_Balancer') {
                                document.getElementById("HA_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHABalancer = 'auto';
                                    tempHABalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHABalancer = 'wait';
                                    tempHABalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHABalancer = 'stop';
                                    tempHABalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHABalancer = 'offline';
                                    tempHABalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHABalancer = 'manual';
                                    tempHABalancer = 'manual';
                                }

                            }
//TODO The end of HA condition
//!****************************HC Condition*****************************************************

                            if (response.DATA[i].MACHINE_NAME === 'HC_Pre') {
                                document.getElementById("HC_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcPre = 'auto';
                                    tempHcPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcPre = 'wait';
                                    tempHcPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcPre = 'stop';
                                    tempHcPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcPre = 'offline';
                                    tempHcPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcPre = 'manual';
                                    tempHcPre = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HC_Paka') {
                                document.getElementById("HC_ProductModel_Paka").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcPaka = 'auto';
                                    tempHcPaka = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcPaka = 'wait';
                                    tempHcPaka = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcPaka = 'stop';
                                    tempHcPaka = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcPaka = 'offline';
                                    tempHcPaka = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcPaka = 'manual';
                                    tempHcPaka = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HC_Pnt') {
                                document.getElementById("HC_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcPnt = 'auto';
                                    tempHcPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcPnt = 'wait';
                                    tempHcPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcPnt = 'stop';
                                    tempHcPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcPnt = 'offline';
                                    tempHcPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcPnt = 'manual';
                                    tempHcPnt = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HC_Runout') {
                                document.getElementById("HC_ProductModel_Runout").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcRunout = 'auto';
                                    tempHcRunout = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcRunout = 'wait';
                                    tempHcRunout = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcRunout = 'stop';
                                    tempHcRunout = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcRunout = 'offline';
                                    tempHcRunout = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcRunout = 'manual';
                                    tempHcRunout = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HC_Balancer') {
                                document.getElementById("HC_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcBalancer = 'auto';
                                    tempHcBalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcBalancer = 'wait';
                                    tempHcBalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcBalancer = 'stop';
                                    tempHcBalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcBalancer = 'offline';
                                    tempHcBalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcBalancer = 'manual';
                                    tempHcBalancer = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HC_TP') {
                                document.getElementById("HC_ProductModel_Tp").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHcTp = 'auto';
                                    tempHcTp = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHcTp = 'wait';
                                    tempHcTp = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHcTp = 'stop';
                                    tempHcTp = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHcTp = 'offline';
                                    tempHcTp = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHcTp = 'manual';
                                    tempHcTp = 'manual';
                                }

                            }
//!****************************HD Condition*****************************************************

                            else if (response.DATA[i].MACHINE_NAME === 'HD_Pre') {
                                document.getElementById("HD_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDPre = 'auto';
                                    tempHDPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDPre = 'wait';
                                    tempHDPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDPre = 'stop';
                                    tempHDPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDPre = 'offline';
                                    tempHDPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDPre = 'manual';
                                    tempHDPre = 'manual';
                                }
                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Balancer') {
                                document.getElementById("HD_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDBalancer = 'auto';
                                    tempHDBalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDBalancer = 'wait';
                                    tempHDBalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDBalancer = 'stop';
                                    tempHDBalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDBalancer = 'offline';
                                    tempHDBalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDBalancer = 'manual';
                                    tempHDBalancer = 'manual';
                                }
                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Paka') {
                                document.getElementById("HD_ProductModel_Paka").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDPaka = 'auto';
                                    tempHDPaka = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDPaka = 'wait';
                                    tempHDPaka = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDPaka = 'stop';
                                    tempHDPaka = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDPaka = 'offline';
                                    tempHDPaka = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDPaka = 'manual';
                                    tempHDPaka = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Pnt') {
                                document.getElementById("HD_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDPnt = 'auto';
                                    tempHDPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDPnt = 'wait';
                                    tempHDPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDPnt = 'stop';
                                    tempHDPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDPnt = 'offline';
                                    tempHDPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDPnt = 'manual';
                                    tempHDPnt = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Tmarker') {
                                document.getElementById("HD_ProductModel_Tmarker").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDTmarker = 'auto';
                                    tempHDTmarker = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDTmarker = 'wait';
                                    tempHDTmarker = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDTmarker = 'stop';
                                    tempHDTmarker = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDTmarker = 'offline';
                                    tempHDTmarker = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDTmarker = 'manual';
                                    tempHDTmarker = 'manual';
                                }

                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Runout') {
                                document.getElementById("HD_ProductModel_Runout").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHDRunout = 'auto';
                                    tempHDRunout = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHDRunout = 'wait';
                                    tempHDRunout = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHDRunout = 'stop';
                                    tempHDRunout = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHDRunout = 'offline';
                                    tempHDRunout = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHDRunout = 'manual';
                                    tempHDRunout = 'manual';
                                }


                            }
                            //TODO HB LINE
                            if (response.DATA[i].MACHINE_NAME === 'HB_Pre') {
                                document.getElementById("HB_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHBPre = 'auto';
                                    tempHBPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHBPre = 'wait';
                                    tempHBPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHBPre = 'stop';
                                    tempHBPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHBPre = 'offline';
                                    tempHBPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHBPre = 'manual';
                                    tempHBPre = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'HB_Balancer') {
                                document.getElementById("HB_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHBBalancer = 'auto';
                                    tempHBBalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHBBalancer = 'wait';
                                    tempHBBalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHBBalancer = 'stop';
                                    tempHBBalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHBBalancer = 'offline';
                                    tempHBBalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHBBalancer = 'manual';
                                    tempHBBalancer = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'HB_Paka') {
                                document.getElementById("HB_ProductModel_Paka").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHBPaka = 'auto';
                                    tempHBPaka = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHBPaka = 'wait';
                                    tempHBPaka = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHBPaka = 'stop';
                                    tempHBPaka = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHBPaka = 'offline';
                                    tempHBPaka = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHBPaka = 'manual';
                                    tempHBPaka = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'HB_Pnt') {
                                document.getElementById("HB_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHBPnt = 'auto';
                                    tempHBPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHBPnt = 'wait';
                                    tempHBPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHBPnt = 'stop';
                                    tempHBPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHBPnt = 'offline';
                                    tempHBPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHBPnt = 'manual';
                                    tempHBPnt = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'HB_Tmarker') {
                                document.getElementById("HB_ProductModel_Tmarker").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHBTmarker = 'auto';
                                    tempHBTmarker = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHBTmarker = 'wait';
                                    tempHBTmarker = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHBTmarker = 'stop';
                                    tempHBTmarker = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHBTmarker = 'offline';
                                    tempHBTmarker = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHBTmarker = 'manual';
                                    tempHBTmarker = 'manual';
                                }
                            }

                            //TODO PD LINE
                            if (response.DATA[i].MACHINE_NAME === 'PD_Pre') {
                                document.getElementById("PD_ProductModel_Pre").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDPre = 'auto';
                                    tempPDPre = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDPre = 'wait';
                                    tempPDPre = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDPre = 'stop';
                                    tempPDPre = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDPre= 'offline';
                                    tempPDPre= 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDPre= 'manual';
                                    tempPDPre= 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'PD_Oven') {
                                document.getElementById("PD_ProductModel_Oven").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDOven = 'auto';
                                    tempPDOven = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDOven = 'wait';
                                    tempPDOven = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDOven = 'stop';
                                    tempPDOven = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDOven = 'offline';
                                    tempPDOven = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDOven = 'manual';
                                    tempPDOven = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'PD_Balancer') {
                                document.getElementById("PD_ProductModel_Balancer").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDBalancer = 'auto';
                                    tempPDBalancer = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDBalancer = 'wait';
                                    tempPDBalancer = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDBalancer = 'stop';
                                    tempPDBalancer = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDBalancer = 'offline';
                                    tempPDBalancer = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDBalancer = 'manual';
                                    tempPDBalancer = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'PD_Paka') {
                                document.getElementById("PD_ProductModel_Paka").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDPaka = 'auto';
                                    tempPDPaka = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDPaka = 'wait';
                                    tempPDPaka = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDPaka = 'stop';
                                    tempPDPaka = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDPaka = 'offline';
                                    tempPDPaka = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDPaka = 'manual';
                                    tempPDPaka = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'PD_Pnt') {
                                document.getElementById("PD_ProductModel_Pnt").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDPnt = 'auto';
                                    tempPDPnt = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDPnt = 'wait';
                                    tempPDPnt = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDPnt = 'stop';
                                    tempPDPnt = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDPnt = 'offline';
                                    tempPDPnt = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDPnt = 'manual';
                                    tempPDPnt = 'manual';
                                }
                            }
                            if (response.DATA[i].MACHINE_NAME === 'PD_Tmarker') {
                                document.getElementById("PD_ProductModel_Tmarker").value=response.DATA[i].PRODUCTMODEL;
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorPDTmarker = 'auto';
                                    tempPDTmarker = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorPDTmarker = 'wait';
                                    tempPDTmarker = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorPDTmarker = 'stop';
                                    tempPDTmarker = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorPDTmarker = 'offline';
                                    tempPDTmarker = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDTmarker = 'manual';
                                    tempPDTmarker = 'manual';
                                }
                            }
                        }
                    }

                    console.log("Count rows " + i);
                    colorChange();
                    timeInterval();


                },
                error: function (data, status, err) {
                    console.log("error: " + data + " status: " + status + " err:" + err);
                }
            });

        }


    });

    function colorChange() {
        if (colorIbPre1 === 'auto') {
            document.getElementById("ibPre1").style.backgroundColor = 'green';
        } else if (colorIbPre1 === 'wait') {
            document.getElementById("ibPre1").style.backgroundColor = '#FFD800';
        } else if (colorIbPre1 === 'stop') {
            document.getElementById("ibPre1").style.backgroundColor = '#FF0000';
        } else if (colorIbPre1 === 'offline') {
            document.getElementById("ibPre1").style.backgroundColor = '#666666';
        } else if (colorIbPre1 === 'manual') {
            document.getElementById("ibPre1").style.backgroundColor = 'blue';
        }

        if (colorIbPre2 === 'auto') {
            document.getElementById("ibPre2").style.backgroundColor = 'green';
        } else if (colorIbPre2 === 'wait') {
            document.getElementById("ibPre2").style.backgroundColor = '#FFD800';
        } else if (colorIbPre2 === 'stop') {
            document.getElementById("ibPre2").style.backgroundColor = '#FF0000';
        } else if (colorIbPre2 === 'offline') {
            document.getElementById("ibPre2").style.backgroundColor = '#666666';
        } else if (colorIbPre2 === 'manual') {
            document.getElementById("ibPre2").style.backgroundColor = 'blue';
        }

        if (colorIbPre3 === 'auto') {
            document.getElementById("ibPre3").style.backgroundColor = 'green';
        } else if (colorIbPre3 === 'wait') {
            document.getElementById("ibPre3").style.backgroundColor = '#FFD800';
        } else if (colorIbPre3 === 'stop') {
            document.getElementById("ibPre3").style.backgroundColor = '#FF0000';
        } else if (colorIbPre3 === 'offline') {
            document.getElementById("ibPre3").style.backgroundColor = '#666666';
        } else if (colorIbPre3 === 'manual') {
            document.getElementById("ibPre3").style.backgroundColor = 'blue';
        }

        if (colorIbBalancer === 'auto') {
            document.getElementById("ibBalancer").style.backgroundColor = 'green';
        } else if (colorIbBalancer === 'wait') {
            document.getElementById("ibBalancer").style.backgroundColor = '#FFD800';
        } else if (colorIbBalancer === 'stop') {
            document.getElementById("ibBalancer").style.backgroundColor = '#FF0000';
        } else if (colorIbBalancer === 'offline') {
            document.getElementById("ibBalancer").style.backgroundColor = '#666666';
        } else if (colorIbBalancer === 'manual') {
            document.getElementById("ibBalancer").style.backgroundColor = 'blue';
        }

        if (colorIbPnt === 'auto') {
            document.getElementById("iPnt").style.backgroundColor = 'green';
        } else if (colorIbPnt === 'wait') {
            document.getElementById("iPnt").style.backgroundColor = '#FFD800';
        } else if (colorIbPnt === 'stop') {
            document.getElementById("iPnt").style.backgroundColor = '#FF0000';
        } else if (colorIbPnt === 'offline') {
            document.getElementById("iPnt").style.backgroundColor = '#666666';
        } else if (colorIbPnt === 'manual') {
            document.getElementById("iPnt").style.backgroundColor = 'blue';
        }

        if (colorIbRunout === 'auto') {
            document.getElementById("ibRunout").style.backgroundColor = 'green';
        } else if (colorIbRunout === 'wait') {
            document.getElementById("ibRunout").style.backgroundColor = '#FFD800';
        } else if (colorIbRunout === 'stop') {
            document.getElementById("ibRunout").style.backgroundColor = '#FF0000';
        } else if (colorIbRunout === 'offline') {
            document.getElementById("ibRunout").style.backgroundColor = '#666666';
        } else if (colorIbRunout === 'manual') {
            document.getElementById("ibRunout").style.backgroundColor = 'blue';
        }

//TODO HA LINE
        if (colorHAPre === 'auto') {
            document.getElementById("HAPre").style.backgroundColor = 'green';
        } else if (colorHAPre === 'wait') {
            document.getElementById("HAPre").style.backgroundColor = '#FFD800';
        } else if (colorHAPre === 'stop') {
            document.getElementById("HAPre").style.backgroundColor = '#FF0000';
        } else if (colorHAPre === 'offline') {
            document.getElementById("HAPre").style.backgroundColor = '#666666';
        } else if (colorHAPre === 'manual') {
            document.getElementById("HAPre").style.backgroundColor = 'blue';
        }

        if (colorHAPaka === 'auto') {
            document.getElementById("HAPaka").style.backgroundColor = 'green';
        } else if (colorHAPaka === 'wait') {
            document.getElementById("HAPaka").style.backgroundColor = '#FFD800';
        } else if (colorHAPaka === 'stop') {
            document.getElementById("HAPaka").style.backgroundColor = '#FF0000';
        } else if (colorHAPaka === 'offline') {
            document.getElementById("HAPaka").style.backgroundColor = '#666666';
        } else if (colorHAPaka === 'manual') {
            document.getElementById("HAPaka").style.backgroundColor = 'blue';
        }
        if (colorHABalancer === 'auto') {
            document.getElementById("HABalancer").style.backgroundColor = 'green';
        } else if (colorHABalancer === 'wait') {
            document.getElementById("HABalancer").style.backgroundColor = '#FFD800';
        } else if (colorHABalancer === 'stop') {
            document.getElementById("HABalancer").style.backgroundColor = '#FF0000';
        } else if (colorHABalancer === 'offline') {
            document.getElementById("HABalancer").style.backgroundColor = '#666666';
        } else if (colorHABalancer === 'manual') {
            document.getElementById("HABalancer").style.backgroundColor = 'blue';
        }
        if (colorHAPnt === 'auto') {
            document.getElementById("HAPnt").style.backgroundColor = 'green';
        } else if (colorHAPnt === 'wait') {
            document.getElementById("HAPnt").style.backgroundColor = '#FFD800';
        } else if (colorHAPnt === 'stop') {
            document.getElementById("HAPnt").style.backgroundColor = '#FF0000';
        } else if (colorHAPnt === 'offline') {
            document.getElementById("HAPnt").style.backgroundColor = '#666666';
        } else if (colorHAPnt === 'manual') {
            document.getElementById("HAPnt").style.backgroundColor = 'blue';
        }
        if (colorHARunout === 'auto') {
            document.getElementById("HARunout").style.backgroundColor = 'green';
        } else if (colorHARunout === 'wait') {
            document.getElementById("HARunout").style.backgroundColor = '#FFD800';
        } else if (colorHARunout === 'stop') {
            document.getElementById("HARunout").style.backgroundColor = '#FF0000';
        } else if (colorHARunout === 'offline') {
            document.getElementById("HARunout").style.backgroundColor = '#666666';
        } else if (colorHARunout === 'manual') {
            document.getElementById("HARunout").style.backgroundColor = 'blue';
        }
//TODO The End of HA
//=======================HC=================================
        if (colorHcPre === 'auto') {
            document.getElementById("hcPre").style.backgroundColor = 'green';
        } else if (colorHcPre === 'wait') {
            document.getElementById("hcPre").style.backgroundColor = '#FFD800';
        } else if (colorHcPre === 'stop') {
            document.getElementById("hcPre").style.backgroundColor = '#FF0000';
        } else if (colorHcPre === 'offline') {
            document.getElementById("hcPre").style.backgroundColor = '#666666';
        } else if (colorHcPre === 'manual') {
            document.getElementById("hcPre").style.backgroundColor = 'blue';
        }

        if (colorHcPaka === 'auto') {
            document.getElementById("hcPaka").style.backgroundColor = 'green';
        } else if (colorHcPaka === 'wait') {
            document.getElementById("hcPaka").style.backgroundColor = '#FFD800';
        } else if (colorHcPaka === 'stop') {
            document.getElementById("hcPaka").style.backgroundColor = '#FF0000';
        } else if (colorHcPaka === 'offline') {
            document.getElementById("hcPaka").style.backgroundColor = '#666666';
        } else if (colorHcPaka === 'manual') {
            document.getElementById("hcPaka").style.backgroundColor = 'blue';
        }

        if (colorHcPnt === 'auto') {
            document.getElementById("hcPnt").style.backgroundColor = 'green';
        } else if (colorHcPnt === 'wait') {
            document.getElementById("hcPnt").style.backgroundColor = '#FFD800';
        } else if (colorHcPnt === 'stop') {
            document.getElementById("hcPnt").style.backgroundColor = '#FF0000';
        } else if (colorHcPnt === 'offline') {
            document.getElementById("hcPnt").style.backgroundColor = '#666666';
        } else if (colorHcPnt === 'manual') {
            document.getElementById("hcPnt").style.backgroundColor = 'blue';
        }

        if (colorHcRunout === 'auto') {
            document.getElementById("hcRunout").style.backgroundColor = 'green';
        } else if (colorHcRunout === 'wait') {
            document.getElementById("hcRunout").style.backgroundColor = '#FFD800';
        } else if (colorHcRunout === 'stop') {
            document.getElementById("hcRunout").style.backgroundColor = '#FF0000';
        } else if (colorHcRunout === 'offline') {
            document.getElementById("hcRunout").style.backgroundColor = '#666666';
        } else if (colorHcRunout === 'manual') {
            document.getElementById("hcRunout").style.backgroundColor = 'blue';
        }

        if (colorHcBalancer === 'auto') {
            document.getElementById("hcBalancer").style.backgroundColor = 'green';
        } else if (colorHcBalancer === 'wait') {
            document.getElementById("hcBalancer").style.backgroundColor = '#FFD800';
        } else if (colorHcBalancer === 'stop') {
            document.getElementById("hcBalancer").style.backgroundColor = '#FF0000';
        } else if (colorHcBalancer === 'offline') {
            document.getElementById("hcBalancer").style.backgroundColor = '#666666';
        } else if (colorHcBalancer === 'manual') {
            document.getElementById("hcBalancer").style.backgroundColor = 'blue';
        }

        if (colorHcTp === 'auto') {
            document.getElementById("hcTp").style.backgroundColor = 'green';
        } else if (colorHcTp === 'wait') {
            document.getElementById("hcTp").style.backgroundColor = '#FFD800';
        } else if (colorHcTp === 'stop') {
            document.getElementById("hcTp").style.backgroundColor = '#FF0000';
        } else if (colorHcTp === 'offline') {
            document.getElementById("hcTp").style.backgroundColor = '#666666';
        } else if (colorHcTp === 'manual') {
            document.getElementById("hcTp").style.backgroundColor = 'blue';
        }
//=======================HD=================================
        if (colorHDPre === 'auto') {
            document.getElementById("HDPre").style.backgroundColor = 'green';
        } else if (colorHDPre === 'wait') {
            document.getElementById("HDPre").style.backgroundColor = '#FFD800';
        } else if (colorHDPre === 'stop') {
            document.getElementById("HDPre").style.backgroundColor = '#FF0000';
        } else if (colorHDPre === 'offline') {
            document.getElementById("HDPre").style.backgroundColor = '#666666';
        } else if (colorHDPre === 'manual') {
            document.getElementById("HDPre").style.backgroundColor = 'blue';
        }

        if (colorHDBalancer === 'auto') {
            document.getElementById("HDBalancer").style.backgroundColor = 'green';
        } else if (colorHDBalancer === 'wait') {
            document.getElementById("HDBalancer").style.backgroundColor = '#FFD800';
        } else if (colorHDBalancer === 'stop') {
            document.getElementById("HDBalancer").style.backgroundColor = '#FF0000';
        } else if (colorHDBalancer === 'offline') {
            document.getElementById("HDBalancer").style.backgroundColor = '#666666';
        } else if (colorHDBalancer === 'manual') {
            document.getElementById("HDBalancer").style.backgroundColor = 'blue';
        }

        if (colorHDPaka === 'auto') {
            document.getElementById("HDPaka").style.backgroundColor = 'green';
        } else if (colorHDPaka === 'wait') {
            document.getElementById("HDPaka").style.backgroundColor = '#FFD800';
        } else if (colorHDPaka === 'stop') {
            document.getElementById("HDPaka").style.backgroundColor = '#FF0000';
        } else if (colorHDPaka === 'offline') {
            document.getElementById("HDPaka").style.backgroundColor = '#666666';
        } else if (colorHDPaka === 'manual') {
            document.getElementById("HDPaka").style.backgroundColor = 'blue';
        }

        if (colorHDPnt === 'auto') {
            document.getElementById("HDPnt").style.backgroundColor = 'green';
        } else if (colorHDPnt === 'wait') {
            document.getElementById("HDPnt").style.backgroundColor = '#FFD800';
        } else if (colorHDPnt === 'stop') {
            document.getElementById("HDPnt").style.backgroundColor = '#FF0000';
        } else if (colorHDPnt === 'offline') {
            document.getElementById("HDPnt").style.backgroundColor = '#666666';
        } else if (colorHDPnt === 'manual') {
            document.getElementById("HDPnt").style.backgroundColor = 'blue';
        }

        if (colorHDTmarker === 'auto') {
            document.getElementById("HDTmarker").style.backgroundColor = 'green';
        } else if (colorHDTmarker === 'wait') {
            document.getElementById("HDTmarker").style.backgroundColor = '#FFD800';
        } else if (colorHDTmarker === 'stop') {
            document.getElementById("HDTmarker").style.backgroundColor = '#FF0000';
        } else if (colorHDTmarker === 'offline') {
            document.getElementById("HDTmarker").style.backgroundColor = '#666666';
        } else if (colorHDTmarker === 'manual') {
            document.getElementById("HDTmarker").style.backgroundColor = 'blue';
        }

        if (colorHDRunout === 'auto') {
            document.getElementById("HDRunout").style.backgroundColor = 'green';
        } else if (colorHDRunout === 'wait') {
            document.getElementById("HDRunout").style.backgroundColor = '#FFD800';
        } else if (colorHDRunout === 'stop') {
            document.getElementById("HDRunout").style.backgroundColor = '#FF0000';
        } else if (colorHDRunout === 'offline') {
            document.getElementById("HDRunout").style.backgroundColor = '#666666';
        } else if (colorHDRunout === 'manual') {
            document.getElementById("HDRunout").style.backgroundColor = 'blue';
        }

        //=======================HB=================================
        if (colorHBPre === 'auto') {
            document.getElementById("HBPre").style.backgroundColor = 'green';
        } else if (colorHBPre === 'wait') {
            document.getElementById("HBPre").style.backgroundColor = '#FFD800';
        } else if (colorHBPre === 'stop') {
            document.getElementById("HBPre").style.backgroundColor = '#FF0000';
        } else if (colorHBPre === 'offline') {
            document.getElementById("HBPre").style.backgroundColor = '#666666';
        } else if (colorHBPre === 'manual') {
            document.getElementById("HBPre").style.backgroundColor = 'blue';
        }

        if (colorHBBalancer === 'auto') {
            document.getElementById("HBBalancer").style.backgroundColor = 'green';
        } else if (colorHBBalancer === 'wait') {
            document.getElementById("HBBalancer").style.backgroundColor = '#FFD800';
        } else if (colorHBBalancer === 'stop') {
            document.getElementById("HBBalancer").style.backgroundColor = '#FF0000';
        } else if (colorHBBalancer === 'offline') {
            document.getElementById("HBBalancer").style.backgroundColor = '#666666';
        } else if (colorHBBalancer === 'manual') {
            document.getElementById("HBBalancer").style.backgroundColor = 'blue';
        }

        /*if (colorHBPaka === 'auto') {
            document.getElementById("HBPaka").style.backgroundColor = 'green';
        } else if (colorHBPaka === 'wait') {
            document.getElementById("HBPaka").style.backgroundColor = '#FFD800';
        } else if (colorHBPaka === 'stop') {
            document.getElementById("HBPaka").style.backgroundColor = '#FF0000';
        } else if (colorHBPaka === 'offline') {
            document.getElementById("HBPaka").style.backgroundColor = '#666666';
        } else if (colorHBPaka === 'manual') {
            document.getElementById("HBPaka").style.backgroundColor = 'blue';
        }*/

        if (colorHBPnt === 'auto') {
            document.getElementById("HBPnt").style.backgroundColor = 'green';
        } else if (colorHBPnt === 'wait') {
            document.getElementById("HBPnt").style.backgroundColor = '#FFD800';
        } else if (colorHBPnt === 'stop') {
            document.getElementById("HBPnt").style.backgroundColor = '#FF0000';
        } else if (colorHBPnt === 'offline') {
            document.getElementById("HBPnt").style.backgroundColor = '#666666';
        } else if (colorHBPnt === 'manual') {
            document.getElementById("HBPnt").style.backgroundColor = 'blue';
        }
        if (colorHBTmarker === 'auto') {
            document.getElementById("HBTmarker").style.backgroundColor = 'green';
        } else if (colorHBTmarker === 'wait') {
            document.getElementById("HBTmarker").style.backgroundColor = '#FFD800';
        } else if (colorHBTmarker === 'stop') {
            document.getElementById("HBTmarker").style.backgroundColor = '#FF0000';
        } else if (colorHBTmarker === 'offline') {
            document.getElementById("HBTmarker").style.backgroundColor = '#666666';
        } else if (colorHBTmarker === 'manual') {
            document.getElementById("HBTmarker").style.backgroundColor = 'blue';
        }

        //TODO PD LINE
        if (colorPDPre === 'auto') {
            document.getElementById("PDPre").style.backgroundColor = 'green';
        } else if (colorPDPre === 'wait') {
            document.getElementById("PDPre").style.backgroundColor = '#FFD800';
        } else if (colorPDPre === 'stop') {
            document.getElementById("PDPre").style.backgroundColor = '#FF0000';
        } else if (colorPDPre === 'offline') {
            document.getElementById("PDPre").style.backgroundColor = '#666666';
        } else if (colorPDPre === 'manual') {
            document.getElementById("PDPre").style.backgroundColor = 'blue';
        }
        if (colorPDOven === 'auto') {
            document.getElementById("PDOven").style.backgroundColor = 'green';
        } else if (colorPDOven === 'wait') {
            document.getElementById("PDOven").style.backgroundColor = '#FFD800';
        } else if (colorPDOven === 'stop') {
            document.getElementById("PDOven").style.backgroundColor = '#FF0000';
        } else if (colorPDOven === 'offline') {
            document.getElementById("PDOven").style.backgroundColor = '#666666';
        } else if (colorPDOven === 'manual') {
            document.getElementById("PDOven").style.backgroundColor = 'blue';
        }
        if (colorPDBalancer === 'auto') {
            document.getElementById("PDBalancer").style.backgroundColor = 'green';
        } else if (colorPDBalancer === 'wait') {
            document.getElementById("PDBalancer").style.backgroundColor = '#FFD800';
        } else if (colorPDBalancer === 'stop') {
            document.getElementById("PDBalancer").style.backgroundColor = '#FF0000';
        } else if (colorPDBalancer === 'offline') {
            document.getElementById("PDBalancer").style.backgroundColor = '#666666';
        } else if (colorPDBalancer === 'manual') {
            document.getElementById("PDBalancer").style.backgroundColor = 'blue';
        }
        if (colorPDPaka === 'auto') {
            document.getElementById("PDPaka").style.backgroundColor = 'green';
        } else if (colorPDPaka === 'wait') {
            document.getElementById("PDPaka").style.backgroundColor = '#FFD800';
        } else if (colorPDPaka === 'stop') {
            document.getElementById("PDPaka").style.backgroundColor = '#FF0000';
        } else if (colorPDPaka === 'offline') {
            document.getElementById("PDPaka").style.backgroundColor = '#666666';
        } else if (colorPDPaka === 'manual') {
            document.getElementById("PDPaka").style.backgroundColor = 'blue';
        }
        if (colorPDPnt === 'auto') {
            document.getElementById("PDPnt").style.backgroundColor = 'green';
        } else if (colorPDPnt === 'wait') {
            document.getElementById("PDPnt").style.backgroundColor = '#FFD800';
        } else if (colorPDPnt === 'stop') {
            document.getElementById("PDPnt").style.backgroundColor = '#FF0000';
        } else if (colorPDPnt === 'offline') {
            document.getElementById("PDPnt").style.backgroundColor = '#666666';
        } else if (colorPDPnt === 'manual') {
            document.getElementById("PDPnt").style.backgroundColor = 'blue';
        }
        /*if (colorPDTmarker === 'auto') {
            document.getElementById("PDTmarker").style.backgroundColor = 'green';
        } else if (colorPDTmarker === 'wait') {
            document.getElementById("PDTmarker").style.backgroundColor = '#FFD800';
        } else if (colorPDTmarker === 'stop') {
            document.getElementById("PDTmarker").style.backgroundColor = '#FF0000';
        } else if (colorPDTmarker === 'offline') {
            document.getElementById("PDTmarker").style.backgroundColor = '#666666';
        } else if (colorPDTmarker === 'manual') {
            document.getElementById("PDTmarker").style.backgroundColor = 'blue';
        }*/
    }

    $(document).ready(function () {

    process.findAssignedProducedProductList = function(){
        var curday = function(sp){
            today = new Date();
            if (today.getHours() > 23 || today.getHours() < 8) {
                today.setDate(today.getDate() - 1);
            }else{
                today.setDate(today.getDate());
            }
            var dd = today.getDate();
            var mm = today.getMonth()+1; //As January is 0.
            var yyyy = today.getFullYear();

            if(dd<10) dd='0'+dd;
            if(mm<10) mm='0'+mm;
            return (yyyy+sp+mm+sp+dd);
        };
        console.log(curday('/'));
        console.log(curday('-'));

        $.ajax({
            url: "/v1/api/fukoku/workpiece/findTargetAndProducedProduct",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify({
                "LINE_NAME": "",
                "START_TIME":curday('-')
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("response" , response);
                var lineNamePlusModel = [6];  var lineNamePlusModelBlue = [6];
                lineNamePlusModel[0]= ""; lineNamePlusModel[1]= "";lineNamePlusModel[2]= ""; lineNamePlusModel[3]= "";lineNamePlusModel[4]= "";lineNamePlusModel[5]= "";//lineNamePlusModel[6]= "";
                lineNamePlusModelBlue[0]= ""; lineNamePlusModelBlue[1]= "";lineNamePlusModelBlue[2]= ""; lineNamePlusModelBlue[3]= "";lineNamePlusModelBlue[4]= "";lineNamePlusModelBlue[5]= "";
                var lineArr = ["IB","HC","HD","PD","HA","HB"];
                for(l=0; lineArr.length  >  l ; l++) {
                    for (j = 0; response.getWorkPlanGroupByModel.length > j; j++) {
                        if (response.getWorkPlanGroupByModel[j].ref_line == lineArr[l]) {
                            lineNamePlusModelBlue[l] += "<div style='color:blue' data-line='"+lineArr[l]+"'>" +
                                ((response.getWorkPlanGroupByModel[j].target == null || response.getWorkPlanGroupByModel[j].target == 0) ? "작업계획없음" : response.getWorkPlanGroupByModel[j].ref_product + " : " + response.getWorkPlanGroupByModel[j].target) + "</div>";
                        }
                    }
                }
                for(m=0;response.getMaxDsAndTargetByModelFromLastMachine.length > m;m++) {

                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "IB"){
                        lineNamePlusModel[0] +=
                            "<div style='color:red' data-line='IB'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////
                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HC"){

                        lineNamePlusModel[1] +=
                            "<div style='color:red' data-line='HC'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////
                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HD"){
                        lineNamePlusModel[2] +=
                            "<div style='color:red' data-line=HD'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////
                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "PD"){
                        lineNamePlusModel[3] +=
                            "<div style='color:red' data-line='PD'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////
                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HA"){
                        lineNamePlusModel[4] +=
                            "<div style='color:red'  data-line='HA'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////
                    if (response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HB"){
                        lineNamePlusModel[5] +=
                            "<div style='color:red'  data-line='HB'>"+ response.getMaxDsAndTargetByModelFromLastMachine[m].model + ": "+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds +"</div> ";
                    }
                    /////////////////////////////

                }


             //   console.log("1 lineNamePlusModel",lineNamePlusModel);
                for(let p = 0; lineArr.length > p  ; p++){
                    console.log(p , p+ " --- "+ lineNamePlusModelBlue[p]);
                    if(lineNamePlusModelBlue[p] == ""){
                        lineNamePlusModelBlue[p] = "<div style='color:blue' data-line='"+lineArr[p]+"'  >작업계흭없음</div>";
                    }
                }
               // console.log("2 lineNamePlusModel",lineNamePlusModel);

                $("#ibProduct").html(""+ lineNamePlusModelBlue[0] + lineNamePlusModel[0].slice(0, -1)+" ");
                $("#hcProduct").html(""+ lineNamePlusModelBlue[1] + lineNamePlusModel[1].slice(0, -1)+" ");
                $("#hdProduct").html(""+ lineNamePlusModelBlue[2] + lineNamePlusModel[2].slice(0, -1)+" ");
                $("#pdProduct").html(""+ lineNamePlusModelBlue[3] + lineNamePlusModel[3].slice(0, -1)+" ");
                $("#haProduct").html(""+ lineNamePlusModelBlue[4] + lineNamePlusModel[4].slice(0, -1)+" ");
                $("#hbProduct").html(""+ lineNamePlusModelBlue[5] + lineNamePlusModel[5].slice(0, -1)+" ");

                //console.log("findAssignedProducedProductList ",response);
                /*
                $("#ibProduct").text(response.TargetAndProducedProduct[0].products == null ? 0 :response.TargetAndProducedProduct[0].products);
                $("#ibTarget").text(response.TargetAndProducedProduct[0].target == null ? 0 : response.TargetAndProducedProduct[0].target);
                $("#hcProduct").text(response.TargetAndProducedProduct[1].products == null ? 0 :response.TargetAndProducedProduct[1].products);
                $("#hcTarget").text(response.TargetAndProducedProduct[1].target == null ? 0 : response.TargetAndProducedProduct[1].target);
                $("#hdProduct").text(response.TargetAndProducedProduct[2].products == null ? 0 :response.TargetAndProducedProduct[2].products);
                $("#hdTarget").text(response.TargetAndProducedProduct[2].target == null ? 0 : response.TargetAndProducedProduct[2].target);
                $("#pdProduct").text(response.TargetAndProducedProduct[3].products == null ? 0 :response.TargetAndProducedProduct[3].products);
                $("#pdTarget").text(response.TargetAndProducedProduct[3].target == null ? 0 : response.TargetAndProducedProduct[3].target);
                $("#haProduct").text(response.TargetAndProducedProduct[4].products == null ? 0 :response.TargetAndProducedProduct[4].products);
                $("#haTarget").text(response.TargetAndProducedProduct[4].target == null ? 0 : response.TargetAndProducedProduct[4].target);
                $("#hbProduct").text(response.TargetAndProducedProduct[5].products == null ? 0 :response.TargetAndProducedProduct[5].products);
                $("#hbTarget").text(response.TargetAndProducedProduct[5].target == null ? 0 : response.TargetAndProducedProduct[5].target);
                */
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });


    }




    process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);



});