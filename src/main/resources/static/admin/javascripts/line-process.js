var orbitControls = null;
var container, camera, scene, renderer, loader;
var getObjGLTF;
var cameraIndex = 0;
var cameras = [];
var cameraNames = [];
var defaultCamera = null;
var mixer = null;
var clock = new THREE.Clock();
var sphere, IB_LINE5;
var extension = "glTF";
var mouse = {x: 0, y: 0};
var all_line;
var xc = 0, yc = 0, zc = 0;
var targetList = [];
var process = {};

var eetS = 1516455744000;
var eetB = 1516455803000;
var eetAllS = 1516698001000;
var eetAllB = 1516698027000;
var est, eet;
var estNew, eetNew;


THREE.Cache.enabled = true;

// RENDERER
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
$(function () {


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    estNew = est;
    eetNew = eet;
    eetSNew = eetS;
    eetBNew = eetB;
    eetAllSNew = eetAllS;
    eetAllBNew = eetAllB;
    var intervals;
    var lineName;

    function timeInterval() {

        intervals = setInterval(function () {
            var line = $("#scenes_list").val();
            if (line === 'IB') {
                lineName = "IB";
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);
            } else if (line === 'HC') {
                lineName = 'HC';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }else if (line === 'HA') {
                lineName = 'HA';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }else if (line === 'HD') {
                lineName = 'HD';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }else if (line === 'PD') {
                lineName = 'PD';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }else if (line === 'HB') {
                lineName = 'HB';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }
            else if (line === '모든 라인') {
                lineName = "All";
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }
        }, 5000);
    }

    var tempHBPre = 'offline';
    var tempHBBalancer = 'offline';
    var tempHBPnt = 'offline';
    var tempHBTmarker = 'offline';

    var tempHAPre = 'offline';
    var tempHAPaka = 'offline';
    var tempHAPnt = 'offline';
    var tempHARunout = 'offline';
    var tempHABalancer = 'offline';

    var tempHcPre = 'offline';
    var tempHcPaka = 'offline';
    var tempHcPnt = 'offline';
    var tempHcRunout = 'offline';
    var tempHcBalancer = 'offline';
    var tempHcTp = 'offline';

    var tempHDPre = 'offline';
    var tempHDPaka = 'offline';
    var tempHDPnt = 'offline';
    var tempHDRunout = 'offline';
    var tempHDBalancer = 'offline';
    var tempHDTmarker = 'offline';

    var tempPDPre = 'offline';
    var tempPDOven = 'offline';
    var tempPDBalancer = 'offline';
    var tempPDPaka = 'offline';
    var tempPDPnt = 'offline';


    var tempIbPre1 = 'offline';
    var tempIbPre2 = 'offline';
    var tempIbPre3 = 'offline';
    var tempIbPnt = 'offline';
    var tempIbRunout = 'offline';
    var tempIbBalancer = 'offline';
    var line1;

    process.findMStateByLineAndStartTimeAndEndTime = function (start, end) {
        line1 = $("#scenes_list").val();
        if (line1 === 'HC') {
            // line1="HC";
        }
        if (line1 === 'IB') {
            line1 = "IB";
        }
        if (line1 === 'HD') {
            line1 = "HD";
        }
        if (line1 === 'HA') {
            line1 = "HA";
        }
        if (line1 === 'HB') {
            line1 = "HB";
        }
        if (line1 === 'PD') {
            line1 = "PD";
        }
        if (line1 === '모든 라인') {
            line1 = "All";

        }
        console.log("******************** Start Time:" + eetSNew + "   End Time: " + eetBNew + "********************");
        clearInterval(intervals);
        $.ajax({
                url: "/v1/api/fukoku/mstate",
                type: 'GET',
                dataType: 'JSON',
                data: {
                    "lineName": line1
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                success: function (response) {

                    colorHBPre = tempHBPre;
                    colorHBBalancer = tempHBBalancer;
                    colorHBPnt = tempHBPnt;
                    colorHBTmarker = tempHBTmarker;


                    // console.log(response);
                    colorHcPre = tempHcPre;
                    colorHcPaka = tempHcPaka;
                    colorHcPnt = tempHcPnt;
                    colorHcBalancer = tempHcBalancer;
                    colorHcTp = tempHcTp;
                    colorHcRunout = tempHcRunout;

                    colorHaPre = tempHAPre;
                    colorHaPaka = tempHAPaka;
                    colorHaPnt = tempHAPnt;
                    colorHaBalancer = tempHABalancer;
                    colorHaRunout = tempHARunout;

                    colorHDPre = tempHDPre;
                    colorHDPaka = tempHDPaka;
                    colorHDPnt = tempHDPnt;
                    colorHDBalancer = tempHDBalancer;
                    colorHDTmarker = tempHDTmarker;
                    colorHDRunout = tempHDRunout;

                    colorPDPre = tempPDPre;
                    colorPDOven = tempPDOven;
                    colorPDBalancer = tempPDBalancer;
                    colorPDPaka = tempPDPaka;
                    colorPDPnt = tempPDPnt;


                    colorIbPre1 = tempIbPre1;
                    colorIbPre2 = tempIbPre2;
                    colorIbPre3 = tempIbPre3;
                    colorIbPnt = tempIbPnt;
                    colorIbRunout = tempIbRunout;
                    colorIbBalancer = tempIbBalancer;
                    lineName = $("#scenes_list").val();

                    var i = 0;
                    if (response.MESSAGE.match('NOT')) {
                        //  console.log("DATA NOT FUND");
                    }
                    else {
                        for (i; i < response.DATA.length; i++) {
                            //Get Line name
                            //lineName = response.DATA[i].LINE_NAME;
                            if (response.DATA[i].MACHINE_NAME === 'IB_Pre1') {
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

//TODO ****************************PD Condition*****************************************************
                            if (response.DATA[i].MACHINE_NAME === 'PD_Pre') {
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
                                    colorPDPre = 'offline';
                                    tempPDPre = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorPDPre = 'manual';
                                    tempPDPre = 'manual';
                                }
                            }

                            if (response.DATA[i].MACHINE_NAME === 'PD_Oven') {
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

//TODO ************************************* HB Condition *****************************************************
                            if (response.DATA[i].MACHINE_NAME === 'HB_Pre') {
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
                            if (response.DATA[i].MACHINE_NAME === 'HB_Pnt') {
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
//****************************HC Condition*****************************************************

                            if (response.DATA[i].MACHINE_NAME === 'HC_Pre') {
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

                            }
                            else if (response.DATA[i].MACHINE_NAME === 'HC_Balancer') {
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

                            }
                            else if (response.DATA[i].MACHINE_NAME === 'HC_TP') {
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

                            //****************************HD Condition*****************************************************

                            if (response.DATA[i].MACHINE_NAME === 'HD_Pre') {
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

                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Paka') {
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

                            } else if (response.DATA[i].MACHINE_NAME === 'HD_Runout') {
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
                            else if (response.DATA[i].MACHINE_NAME === 'HD_Balancer') {
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
                            }
                            else if (response.DATA[i].MACHINE_NAME === 'HD_Tmarker') {
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
                            }

//TODO HA Get Data From DataBase
//****************************HA Condition*****************************************************

                            if (response.DATA[i].MACHINE_NAME === 'HA_Pre') {
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
                                if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                    colorHAPaka = 'auto';
                                    tempHAPaka = 'auto';
                                } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                    colorHAPaka = 'wait';
                                    tempHAPaka = 'wait';
                                } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                    colorHAPaka = 'stop';
                                    tempHAPaka = 'stop';
                                } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                    colorHAPaka = 'offline';
                                    tempHAPaka = 'offline';
                                } else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                    colorHAPaka = 'manual';
                                    tempHAPaka = 'manual';
                                }

                            }
                            if (response.DATA[i].MACHINE_NAME === 'HA_Pnt') {
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

//TODO The end of Get Data From Database
                        }
                    }

                    // console.log("Count rows " + i);

                    if (lineName === 'IB') {

                        changeColorIB_LINE();
                    } else if (lineName === 'HC') {

                        changeColorHC_LINE();
                    } else if (lineName === 'HD') {

                        changeColorHD_LINE();
                    } else if (lineName === 'HA') {

                        changeColorHA_LINE();
                    } else if (lineName === 'HB') {

                        changeColorHB_LINE();
                    } else if (lineName === 'PD') {

                        changeColorPD_LINE();
                    } else if (lineName === '모든 라인') {
                        changeColorIB_LINE();
                        changeColorHC_LINE();
                        changeColorHD_LINE();
                        changeColorHA_LINE();
                        changeColorHB_LINE();
                        changeColorPD_LINE();
                    }

                    timeInterval();


                }
                ,
                error: function (data, status, err) {
                    console.log("error: " + data + " status: " + status + " err:" + err);
                }
            }
        );

    }


});


$(document).ready(function () {

    var line = $("#scenes_list").val();

    if (line === 'IB') {
        process.findMStateByLineAndStartTimeAndEndTime(est, eet);
    } else if (line === 'HC') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    } else if (line === 'HD') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    } else if (line === 'HA') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    } else if (line === 'HB') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    } else if (line === 'PD') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    }
    else if (line === '모든 라인') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);

    }
});


//TODO function startUp onload
function onload() {
    $("#khihortmodal").modal('hide');
    $("#khihortmodal2").modal('hide');
    $("#khihortmodal3").modal('hide');

    var data = [
        [
            {
                text: "<i class='fa fa-cut site-cm-icon'></i>Pressure1 Detatils",
                action: function () {
                    ibPre1();
                }
            },
            {
                text: "<i class='fa fa-copy site-cm-icon'></i>Machines Pre1 info"
            },
            {
                text: "<i class='fa fa-paste site-cm-icon'></i>Product Details",
                action: function () {
                    ibPre2();
                }
            }
            ,
            {
                text: "<i class='fa fa-paste site-cm-icon'></i>Line Info",
                action: function () {
                    console.log("??");
                }
            },
            {
                text: "<i class='fa fa-paste site-cm-icon'></i>Machine Temperature",
                action: function () {
                    console.log("??");
                }
            },
            {
                text: "<i class='fa fa-paste site-cm-icon'></i>Machine Status",
                action: function () {
                    console.log("??");
                }
            }
        ]/*,
        [
            {
                text: "<i class='fa fa-bold site-cm-icon'></i>Hide Row)"
            },
        ]*/
    ];


//TODO onDocumentMouseDown
    var getElementPosition = function (element) {
        var top = left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        }
        while (element);
        return {top: top, left: left};
    }
    window.addEventListener('DOMContentLoaded', (function () {
        renderer.domElement.addEventListener('click', function (event) {
            var projector = new THREE.Projector();
            var mouseX = event.clientX - getElementPosition(renderer.domElement).left;
            var mouseY = event.clientY - getElementPosition(renderer.domElement).top;

            var x = (mouseX / renderer.domElement.width) * 2 - 1;
            var y = -(mouseY / renderer.domElement.height) * 2 + 1;
            var vector = new THREE.Vector3(x, y, 1);

            projector.unprojectVector(vector, camera);
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
//TODO Event Click
            // create an array containing all objects in the scene with which the ray intersects
            var intersects = ray.intersectObjects(targetList);
            $("#container1").contextMenu(data);

        }, true);
    }), true);


//TODO Load multiple GLTF Files~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    buildSceneList();
    xc = 0;
    yc = 40.84;
    zc = -10.1;

    loadLine(0, -2.5, 110, 9);
    loadLine(1, -2.5, 110, 9);
    loadLine(2, -2.5, 110, 9);
    loadLine(3, -2.5, 110, 9);
    loadLine(4, -2.5, 110, 9);
    loadLine(5, -2.5, 110, 9);
    loadLine(6, -2.5, 110, 9);
    loadLine(7, -2.5, 110, 9);
    loadLine(8, -2.5, 110, 9);
    loadLine(9, -2.5, 110, 9);
    loadLine(10, -2.5, 110, 9);
    loadLine(11, -2.5, 110, 9);
    loadLine(12, -2.5, 110, 9);
    loadLine13(13, -2.5, 110, 9);
    /*var elt = document.getElementById('scenes_list');
    elt.selectedIndex = 13;*/
    animate();
    //orbit.update();
}


//TODO function popup Pre1
function ibPre1() {
    $("#khihortmodal").modal('show');
    $('#bar-chart').empty();
    // $("#bar-chart").load("machine-state-monitoring.html");

    var data = [
        {num_sent: 0, perc: '100'},
        {num_sent: 1, perc: '70'},
        {num_sent: 2, perc: '40'},
        {num_sent: 3, perc: '60'},
        {num_sent: 4, perc: '80'}
    ];
    var barChart = Chart.barChart({
        selector: "#bar-chart",
        data: data,
        width: 700,
        height: 400,
        yAxisLabel: 'T/MARK',
        xAxisLabel: "½Ã°£",
        dimensionName: 'num_sent',
        onClick: function (d, i, el) {
        }
    })
}

//TODO function popup Pre1
function ibPre2() {
    $("#khihortmodal2").modal('show');
    $('#bar-chart2').empty();
    var data = [
        {num_sent: 0, perc: '100'},
        {num_sent: 1, perc: '70'},
        {num_sent: 2, perc: '40'},
        {num_sent: 3, perc: '60'},
        {num_sent: 4, perc: '80'}
    ];
    var barChart = Chart.barChart({
        selector: "#bar-chart2",
        data: data,
        width: 700,
        height: 400,
        yAxisLabel: 'À¯·®(ÅäÃâ·®)',
        xAxisLabel: "½Ã°£",
        dimensionName: 'num_sent',
        onClick: function (d, i, el) {
        }
    })

    barChart.createHorizontalLine2(85);
    barChart.createHorizontalLine2(70);
}


var control;

function initScene(index, xc, yc, zc) {

    container = document.getElementById('container1');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xC6C6C6);


    control = new function () {
        this.position_Xaxis = 0.1;
        this.position_Yaxis = 0.1;
        this.position_Zaxis = 0.1;

        this.position_Xaxis2 = 0.1;
        this.position_Yaxis2 = 0.1;
        this.position_Zaxis2 = 0.1;

        this.position_Xaxis3 = 0.1;
        this.position_Yaxis3 = 0.1;
        this.position_Zaxis3 = 0.1;

        this.position_Xaxis4 = 0.1;
        this.position_Yaxis4 = 0.1;
        this.position_Zaxis4 = 0.1;

        this.position_Xaxis5 = 0.1;
        this.position_Yaxis5 = 0.1;
        this.position_Zaxis5 = 0.1;

        this.rotation_Xaxis = 0.1;
        this.rotation_Yaxis = 0.1;
        this.rotation_Zaxis = 0.1;

        this.rotation_Xaxis2 = 0.1;
        this.rotation_Yaxis2 = 0.1;
        this.rotation_Zaxis2 = 0.1;

        this.rotation_Xaxis3 = 0.1;
        this.rotation_Yaxis3 = 0.1;
        this.rotation_Zaxis3 = 0.1;

        this.rotation_Xaxis4 = 0.1;
        this.rotation_Yaxis4 = 0.1;
        this.rotation_Zaxis4 = 0.1;

        this.rotation_Xaxis5 = 0.1;
        this.rotation_Yaxis5 = 0.1;
        this.rotation_Zaxis5 = 0.1;


    }

//TODO Add Controller

//Function addControl
    function addControls(controlObject) {

        var gui = new dat.GUI();
        gui.add(controlObject, 'position_Xaxis').onChange(function (v) {
            PD_LINE.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis').onChange(function (v) {
            PD_LINE.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis').onChange(function (v) {
            PD_LINE.position.z = v
        });

        gui.add(controlObject, 'position_Xaxis2').onChange(function (v) {
            PD_LINE2.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis2').onChange(function (v) {
            PD_LINE2.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis2').onChange(function (v) {
            PD_LINE2.position.z = v
        });
        gui.add(controlObject, 'position_Xaxis3').onChange(function (v) {
            PD_LINE3.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis3').onChange(function (v) {
            PD_LINE3.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis3').onChange(function (v) {
            PD_LINE3.position.z = v
        });
        gui.add(controlObject, 'position_Xaxis4').onChange(function (v) {
            PD_LINE4.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis4').onChange(function (v) {
            PD_LINE4.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis4').onChange(function (v) {
            PD_LINE4.position.z = v
        });

        gui.add(controlObject, 'position_Xaxis5').onChange(function (v) {
            PD_LINE5.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis5').onChange(function (v) {
            PD_LINE5.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis5').onChange(function (v) {
            PD_LINE5.position.z = v
        });


        gui.add(controlObject, 'rotation_Xaxis').onChange(function (v) {
            PD_LINE.scale.x = v
        });
        gui.add(controlObject, 'rotation_Yaxis').onChange(function (v) {
            PD_LINE.scale.y = v
        });
        gui.add(controlObject, 'rotation_Zaxis').onChange(function (v) {
            PD_LINE.scale.z = v
        });

        gui.add(controlObject, 'rotation_Xaxis2').onChange(function (v) {
            PD_LINE2.scale.x = v
        });
        gui.add(controlObject, 'rotation_Yaxis2').onChange(function (v) {
            PD_LINE2.scale.y = v
        });
        gui.add(controlObject, 'rotation_Zaxis2').onChange(function (v) {
            PD_LINE2.scale.z = v
        });
        gui.add(controlObject, 'rotation_Xaxis3').onChange(function (v) {
            PD_LINE3.scale.x = v
        });
        gui.add(controlObject, 'rotation_Yaxis3').onChange(function (v) {
            PD_LINE3.scale.y = v
        });
        gui.add(controlObject, 'rotation_Zaxis3').onChange(function (v) {
            PD_LINE3.scale.z = v
        });
        gui.add(controlObject, 'rotation_Xaxis4').onChange(function (v) {
            PD_LINE4.scale.x = v
        });
        gui.add(controlObject, 'rotation_Yaxis4').onChange(function (v) {
            PD_LINE4.scale.y = v
        });
        gui.add(controlObject, 'rotation_Zaxis4').onChange(function (v) {
            PD_LINE4.scale.z = v
        });

        gui.add(controlObject, 'rotation_Xaxis5').onChange(function (v) {
            PD_LINE5.scale.x = v
        });
        gui.add(controlObject, 'rotation_Yaxis5').onChange(function (v) {
            PD_LINE5.scale.y = v
        });
        gui.add(controlObject, 'rotation_Zaxis5').onChange(function (v) {
            PD_LINE5.scale.z = v
        });


    }

    //defaultCamera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 4000 );
    defaultCamera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 4000);
    /*
    //defaultCamera.up = new THREE.Vector3( -100, 1, -1010 );

      defaultCamera.position.z = 1023;
      scene.add( defaultCamera );
  */

    //TODO Camera setup
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 25, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 1000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 120.84, 12.21);
    camera.lookAt(scene.position);
    camera = camera;

    //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var sceneInfo = sceneList[index];

    var spot1 = null;
    //TODO Count GLTF files
    if (sceneList.length > 0) {

    }
    if (sceneInfo.addLights) {
        var ambient = new THREE.AmbientLight(0x222222);
        scene.add(ambient);

        var directionalLight = new THREE.DirectionalLight(0xdddddd);
        directionalLight.position.set(0, 0, 1).normalize();
        scene.add(directionalLight);

        spot1 = new THREE.SpotLight(0xffffff, 1);
        spot1.position.set(10, 20, 10);
        spot1.angle = 0.25;
        spot1.distance = 1024;
        spot1.penumbra = 0.75;

        if (sceneInfo.shadows) {

            spot1.castShadow = true;
            spot1.shadow.bias = 0.0001;
            spot1.shadow.mapSize.width = 2048;
            spot1.shadow.mapSize.height = 2048;

        }

        scene.add(spot1);
    }


    if (sceneInfo.shadows) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    container.appendChild(renderer.domElement);

    var ground = null;

    if (sceneInfo.addGround) {
        var groundMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        });
        ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512), groundMaterial);

        if (sceneInfo.shadows) {
            ground.receiveShadow = true;
        }
        ground.rotation.x = -Math.PI / 2;

        scene.add(ground);
    }

    loader = new THREE.GLTFLoader();

    var url = sceneInfo.url;

    var r = eval("/" + '\%s' + "/g");
    url = url.replace(r, extension);

    if (extension === 'glTF-Binary') {
        url = url.replace('.gltf', '.glb');
    }
//TODO Loading Label in future Work
    var loadStartTime = performance.now();
    var status = document.getElementById("status");
    status.innerHTML = "Loading...";

    //TODO Loader Function
    loader.load(url, function (data) {

        gltf = data;

        var object = gltf.scene;
        getObjGLTF = object;


        if (sceneInfo.cameraPos) {
            camera.position.set(xc, yc, zc);
            //camera.position.copy(sceneInfo.cameraPos);

        }
        if (sceneInfo.center) {
            orbitControls.target.copy(sceneInfo.center);
        }

        if (sceneInfo.objectPosition) {
            object.position.set(sceneInfo.objectPosition.x - 20, sceneInfo.objectPosition.y, sceneInfo.objectPosition.z - 15);
            var x = sceneInfo.objectPosition.x - 20;
            var y = sceneInfo.objectPosition.y;
            var z = sceneInfo.objectPosition.z - 15;

            // object.position.copy(sceneInfo.objectPosition);

            if (spot1) {
                spot1.position.set(sceneInfo.objectPosition.x - 100, sceneInfo.objectPosition.y + 200, sceneInfo.objectPosition.z - 100);
                spot1.target.position.copy(sceneInfo.objectPosition);
            }
        }

        if (sceneInfo.objectRotation) {
            object.rotation.set(sceneInfo.objectRotation.x - 0.58, sceneInfo.objectRotation.y, sceneInfo.objectRotation.z);
            var x = sceneInfo.objectRotation.x - 0.58;
            var y = sceneInfo.objectRotation.y;
            var z = sceneInfo.objectRotation.z;

            //object.rotation.copy(sceneInfo.objectRotation);
        }


        if (sceneInfo.objectScale)
            object.scale.copy(sceneInfo.objectScale);

//TODO Object changing to Wireframe
        object.traverse(function (node) {
            if (node.isMesh) {
                node.material.wireframe = true;
                node1castShadow = true;
            }
        });

        cameraIndex = 0;
        cameras = [];
        cameraNames = [];

        scene.add(object);
        onWindowResize();
        lineName = $("#scenes_list").val();
        if (sceneInfo.name == '모든 라인') {
            addIbLine();
            addHcLine();
            addHDLine();
            addHaLine();
            addHBLine();
            addPDLine();

        }
        else if (sceneInfo.name == "IB") {
            addIbLine();
            // addControls(control);
        } else if (sceneInfo.name == "HC") {
            addHcLine();

        } else if (sceneInfo.name == "HD") {
            addHDLine();
            //addControls(control);

        } else if (sceneInfo.name == "HA") {
            addHaLine();
            //addControls(control);

        }
        else if (sceneInfo.name == "HB") {
            addHBLine();
            //addControls(control);

        } else if (sceneInfo.name == "PD") {
            addPDLine();
            //addControls(control);

        }
        //clickObj();


    }, undefined, function (error) {

        console.error(error);

    });

    orbitControls = new THREE.OrbitControls(defaultCamera, renderer.domElement);


}


//TODO function select Scene~~~~~~~~~~~~~~~~~~~~~~~~~~
function selectScene() {

    var select = document.getElementById("scenes_list");
    var index = select.selectedIndex;

    var sceneInfo = sceneList[index];
    if (sceneInfo.name == "모든 라인") {
        all_line = 14;
        alert("ALL");
        loadLine(0, -2.5, 110, 9);
        loadLine(1, -2.5, 110, 9);
        loadLine(2, -2.5, 110, 9);
        loadLine(3, -2.5, 110, 9);
        loadLine(4, -2.5, 110, 9);
        loadLine(5, -2.5, 110, 9);
        loadLine(6, -2.5, 110, 9);
        loadLine(7, -2.5, 110, 9);
        loadLine(8, -2.5, 110, 9);
        loadLine(9, -2.5, 110, 9);
        loadLine(10, -2.5, 110, 9);
        loadLine(11, -2.5, 110, 9);
        loadLine(12, -2.5, 110, 9);
        loadLine(13, -2.5, 110, 9);

    } else if (index === 0) {//HA
        loadLine(index, -30, 40.84, -10.1);
        all_line = 0;
    } else if (index === 1) {//HB
        loadLine(index, -20, 40.84, -10.1);
        all_line = 1;
    } else if (index === 2) {//PD
        loadLine(index, -10, 40.84, -10.1);
        all_line = 2;
    } else if (index === 3) {//HC
        loadLine(index, 0, 40.84, -10.1);
        all_line = 3;
    } else if (index === 4) {//PE
        loadLine(index, 10, 40.84, -10.1);
        all_line = 4;
    } else if (index === 5) {//AA
        loadLine(index, 20, 40.84, -10.1);
        all_line = 5;
    } else if (index === 6) {//AB
        loadLine(index, 32, 40.84, -10.1);
        all_line = 6;
    } else if (index === 7) {//HD
        loadLine(index, -40, 43, 7.5);
        all_line = 7;
    } else if (index === 8) {//IB
        loadLine(index, -30, 43, 7.5);
        all_line = 8;
    } else if (index === 9) {//IA
        loadLine(index, -20, 43, 7.5);
        all_line = 9;
    } else if (index === 10) {//PA
        loadLine(index, -10, 43, 7.5);
        all_line = 10;
    } else if (index === 11) {//PB
        loadLine(index, 0, 43, 7.5);
        all_line = 11;
    } else if (index === 12) {//PC
        loadLine(index, 10, 43, 7.5);
        all_line = 12;
    } else if (index === 13) {//VA
        loadLine13(index, 25, 43, 7.5);
        all_line = 13;
    }

    var line = $("#scenes_list").val();
    if (line === 'IB') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);
    } else if (line === 'HC') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    } else if (line === 'HD') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    } else if (line === 'HA') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    } else if (line === 'HB') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    } else if (line === 'PD') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    } else if (line === '모든 라인') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    }

}

//TODO Function buildSceneList
function buildSceneList() {

    var elt = document.getElementById('scenes_list');

    while (elt.hasChildNodes()) {
        elt.removeChild(elt.lastChild);
    }

    var i, len = sceneList.length;

    for (i = 0; i < len; i++) {
        var option = document.createElement("option");
        option.text = sceneList[i].name;
        elt.add(option);
    }
}


//TODO Window Resize
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    var i, len = cameras.length;

    for (i = 0; i < len; i++) { // just do it for default
        cameras[i].aspect = window.innerWidth / window.innerHeight;
        cameras[i].updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//TODO function animation
function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render();
}

//TODO function render
function render() {
    renderer.render(scene, camera);
}

//TODO Block Connect gLTF Files
var sceneList = [


    {
        name: 'HA', url: '../../static/admin/models/HaLine/gLTF/HA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-10, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HB', url: '../../static/admin/models/HbLine/gLTF/HB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(0, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PD', url: '../../static/admin/models/PdLine/gLTF/PD-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(10, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HC', url: '../../static/admin/models/HcLine/gLTF/HC-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(20, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PE', url: '../../static/admin/models/PeLine/gLTF/PE-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(30, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'AA', url: '../../static/admin/models/AaLine/gLTF/AA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(40, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'AB', url: '../../static/admin/models/AbLine/gLTF/AB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(51.5, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HD', url: '../../static/admin/models/HdLine/gLTF/HD-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-20, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'IB', url: '../../static/admin/models/IbLine/gLTF/IB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-9.5, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'IA', url: '../../static/admin/models/IaLine/gLTF/IA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(0, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PA', url: '../../static/admin/models/PaLine/gLTF/PA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(10, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PB', url: '../../static/admin/models/PbLine/gLTF/PB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(20, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PC', url: '../../static/admin/models/PcLine/gLTF/PC-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(29.5, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'VA', url: '../../static/admin/models/VaLine/gLTF/VA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(45.2, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    }, {
        name: '모든 라인', url: '../../static/admin/models/VaLine/gLTF/VA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc, yc, zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(45.2, 1, 16),
        addLights: true,
        /* objectScale: new THREE.Vector3(0, 0, 0),*/
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    }


];

//TODO function load index line gLTF, Cleanup, initScene~~~~~~~~~~~~~~~~~~~~~~
function loadLine(index, xc, yc, zc) {
    cleanup();
    initScene(index, xc, yc, zc);
}

function loadLine13(index, xc, yc, zc) {

    cleanup();
    initScene(index, xc, yc, zc);


    var elt = document.getElementById('scenes_list');
    elt.selectedIndex = 14;


}

//TODO Cleaning DOM
function cleanup() {

    if (container && renderer) {
        container.removeChild(renderer.domElement);
    }

    cameraIndex = 0;
    cameras = [];
    cameraNames = [];
    defaultCamera = null;

    if (!loader || !mixer)
        return;

    mixer.stopAllAction();
}

onload();
