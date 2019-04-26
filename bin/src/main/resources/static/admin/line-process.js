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
var xc=0,yc=0,zc=0;
var camHB='-20, 40.84, -9.1';
var camHAx=-30; var camHAy=40.84; var camHAz= -9.1;
var targetList = [];
var process = {};

var eetHc = 1515991559000;
/*1515991424000;*/
var estHc = 1515991564000;
/*1515991429000;*/
var eetS = 1516455744000;
var eetB = 1516455803000;
var eetAllS = 1516698001000;
var eetAllB = 1516698027000;
var est, eet;
var estNew, eetNew;
var HCPre, HCBalancer, HCPaka, HCPnt,HCRunout,HCTp;


var material111;
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
                lineName="IB";
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
                lineName='HC';
                var temp3 = eetAllBNew;
                var temp4 = eetAllBNew + 10000;

                if (eetS < temp3) {
                    eetAllSNew = temp3;
                }
                if (eetB < temp4) {
                    eetAllBNew = temp4;
                }

                process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);

            }else if (line === '모든 라인') {
                lineName="All";
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

    var tempHcPre='offline';
    var tempHcPaka='offline';
    var tempHcPnt='offline';
    var tempHcRunout='offline';
    var tempHcBalancer='offline';
    var tempHcTp='offline';

    var tempIbPre1 = 'offline';
    var tempIbPre2 = 'offline';
    var tempIbPre3 = 'offline';
    var tempIbPnt = 'offline';
    var tempIbRunout = 'offline';
    var tempIbBalancer = 'offline';
    var line1;

    process.findMStateByLineAndStartTimeAndEndTime = function (start, end) {
        line1=$("#scenes_list").val();
        if(line1==='HC'){
            // line1="HC";
        }
        if(line1==='IB'){
            line1="IB";
        }
        if(line1==='모든 라인'){
            line1="All";

        }
        console.log("******************** Start Time:" + eetSNew + "   End Time: " + eetBNew+"********************");
        clearInterval(intervals);
        $.ajax({
            url: "/v1/api/fukoku/mstate",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": line1,
                "machineName": "IB_Pre"/*,
                "startTime": start,
                "endTime": end*/

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                //  console.log(response);
                colorHcPre = tempHcPre;
                colorHcPaka = tempHcPaka;
                colorHcPnt = tempHcPnt;
                colorHcBalancer = tempHcBalancer;
                colorHcTp = tempHcTp;
                colorHcRunout=tempHcRunout;


                colorIbPre1 = tempIbPre1;
                colorIbPre2 = tempIbPre2;
                colorIbPre3 = tempIbPre3;
                colorIbPnt = tempIbPnt;
                colorIbRunout = tempIbRunout;
                colorIbBalancer = tempIbBalancer;
                lineName=$("#scenes_list").val();

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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                colorIbBalancer = 'manual';
                                tempIbBalancer = 'manual';
                            }

                        }
//****************************HC Condition*****************************************************

                        if (response.DATA[i].MACHINE_NAME === 'HC_Pre') {
                            if (response.DATA[i].MACHINE_STATE.match('AUTO')) {
                                colorHcPre = 'auto';
                                tempHcPre='auto';
                            } else if (response.DATA[i].MACHINE_STATE.match('WAIT')) {
                                colorHcPre = 'wait';
                                tempHcPre = 'wait';
                            } else if (response.DATA[i].MACHINE_STATE.match('STOP')) {
                                colorHcPre = 'stop';
                                tempHcPre = 'stop';
                            } else if (response.DATA[i].MACHINE_STATE.match('OFFLINE')) {
                                colorHcPre = 'offline';
                                tempHcPre = 'offline';
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
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
                            }else if (response.DATA[i].MACHINE_STATE.match('MANUAL')) {
                                colorHcTp = 'manual';
                                tempHcTp = 'manual';
                            }
                        }
                    }
                }

                // console.log("Count rows " + i);

                if (lineName === 'IB') {

                    changeColorIB_LINE();
                } else if(lineName === 'HC') {

                    changeColorHC_LINE();
                }else if(lineName==='모든 라인'){
                    changeColorIB_LINE();
                    changeColorHC_LINE();
                }

                timeInterval();


            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }


});


$(document).ready(function () {

    var line = $("#scenes_list").val();

    if (line === 'IB') {
        process.findMStateByLineAndStartTimeAndEndTime(est, eet);
    } else if (line === 'HC') {
        process.findMStateByLineAndStartTimeAndEndTime(eetS, eetB);
    }else if(line==='모든 라인'){
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
            // if there is one (or more) intersections
           /* if (intersects.length > 0) {

                if (intersects[0].object.name == "HC_LINE: pre1") {
                    alert("HC_LINE: Pre1");
                    $('.modal-title').empty();
                    $('#bar-chart').empty();
                    var div = document.getElementById('textHeader');
                    div.innerHTML += intersects[0].object.name;
                    $("#container1").contextMenu(data);
                } else if (intersects[0].object.name == "IB_LINE: pre2") {
                    alert("IB_LINE: Pre2");
                    $('.modal-title').empty();
                    $('#bar-chart2').empty();
                    var div = document.getElementById('textHeader2');
                    div.innerHTML += intersects[0].object.name;
                    $("#container1").contextMenu(data);
                } else
                    alert("Machine Name: " + intersects[0].object.name);
                // change the color of the closest face.
                intersects[0].face.color.setRGB(0.8 * Math.random() + 0.2, 0, 0);
                intersects[0].object.geometry.colorsNeedUpdate = true;

            } else {
                console.log("Not Click on Object");
            }*/
        }, true);
    }), true);


//TODO Load multiple GLTF Files~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    buildSceneList();
    xc=0;yc=40.84;zc=-10.1;
    //loadLine(14,xc,yc,zc);
    /*loadLine(0);
    loadLine(1);
    loadLine(2);
    loadLine(3);
    loadLine(4);
    loadLine(5);
    loadLine(6);
    loadLine(7);
    loadLine(8);
   loadLine(9);
   loadLine(10);
   loadLine(11);
   loadLine(12);
   loadLine(13);*/
    loadLine(0,-2.5, 110, 9);
    loadLine(1,-2.5, 110, 9);
    loadLine(2,-2.5, 110, 9);
    loadLine(3,-2.5, 110, 9);
    loadLine(4,-2.5, 110, 9);
    loadLine(5,-2.5, 110, 9);
    loadLine(6,-2.5, 110, 9);
    loadLine(7,-2.5, 110, 9);
    loadLine(8,-2.5, 110, 9);
    loadLine(9,-2.5, 110, 9);
    loadLine(10,-2.5, 110, 9);
    loadLine(11,-2.5, 110, 9);
    loadLine(12,-2.5, 110, 9);
    loadLine13(13,-2.5, 110, 9);
    /*var elt = document.getElementById('scenes_list');
    elt.selectedIndex = 13;*/
    animate();
    //orbit.update();
}


/*//TODO Add Label Machine Name
var containerText;
var cameraText;
var group, textMesh1, textMesh2, textGeo, materialText;

var firstLetter = true;
var text = "QQQQ",
    height = 20,
    size = 70,
    hover = 30,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5,
    bevelEnabled = true,
    font = undefined,
    fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = "regular"; // normal bold
var mirror = true;
var targetRotation = 0;

function loadFont() {

    var loader = new THREE.FontLoader();
    loader.load('../../static/admin/fonts/droid/droid_sans_regular.typeface.json', function (response) {

        font = response;

        refreshText();

    });

}

function createText() {

    textGeo = new THREE.TextGeometry(text, {

        font: font,

        size: size,
        height: height,
        curveSegments: curveSegments,

        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled,

        material: 0,
        extrudeMaterial: 1

    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    // "fix" side normals by removing z-component of normals for side faces
    // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

    if (!bevelEnabled) {

        var triangleAreaHeuristics = 0.1 * (height * size);

        for (var i = 0; i < textGeo.faces.length; i++) {

            var face = textGeo.faces[i];

            if (face.materialIndex == 1) {

                for (var j = 0; j < face.vertexNormals.length; j++) {

                    face.vertexNormals[j].z = 0;
                    face.vertexNormals[j].normalize();

                }

                var va = textGeo.vertices[face.a];
                var vb = textGeo.vertices[face.b];
                var vc = textGeo.vertices[face.c];

                var s = THREE.GeometryUtils.triangleArea(va, vb, vc);

                if (s > triangleAreaHeuristics) {

                    for (var j = 0; j < face.vertexNormals.length; j++) {

                        face.vertexNormals[j].copy(face.normal);

                    }

                }

            }

        }

    }

    var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textMesh1 = new THREE.Mesh(textGeo, material);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover + 30;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    //group.add( textMesh1 );
//TODO ddddddddddddddddddddd

    HC_LINE33 = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE33.material.transparent = true;
    //material = new THREE.MeshBasicMaterial({color: 0xff0000});
    //HC_LINE.material.color.setHex(0xC6C6C6);
    HC_LINE33.position.x = centerOffset;
    HC_LINE33.position.y = hover;
    HC_LINE33.name = "HC_LINE: Pre";
    HC_LINE33.add(textMesh1);
    scene.add(HC_LINE33);

    /!*if ( mirror ) {

        textMesh2 = new THREE.Mesh( textGeo, material );

        textMesh2.position.x = centerOffset;
        textMesh2.position.y = -hover;
        textMesh2.position.z = height;

        textMesh2.rotation.x = Math.PI;
        textMesh2.rotation.y = Math.PI * 2;

        group.add( textMesh2 );

    }*!/

}
function refreshText() {
   /!* //group.remove(textMesh1);
    if (mirror) group.remove(textMesh2);
    if (!text) return;*!/

    createText();

}*/

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




/*function addColor() {

    HC_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE.material.color.setHex(0xFF0000);
    HC_LINE.position.x = -2.64;
    HC_LINE.position.y = 0;
    HC_LINE.position.z = -19.4;
    HC_LINE.scale.x = 1.43;
    HC_LINE.scale.z = -2.01;
    HC_LINE.name = "HC_LINE: Pre";
    scene.add(HC_LINE);
    targetList.push(HC_LINE);

    HC_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE2.material.color.setHex(0xFF0000);
    HC_LINE2.position.x = 2.2;
    HC_LINE2.position.y = 0;
    HC_LINE2.position.z = -21.59;
    HC_LINE2.scale.x = 1.52;
    HC_LINE2.scale.z = 1.29;
    HC_LINE2.name = "HC_LINE: Balancer";
    scene.add(HC_LINE2);
    targetList.push(HC_LINE2);

    HC_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE3.material.color.setHex(0xFF0000);
    HC_LINE3.position.x = 2.11;
    HC_LINE3.position.y = 0;
    HC_LINE3.position.z = -19.05;
    HC_LINE3.scale.x = 1.49;
    HC_LINE3.scale.z = -2.79;
    HC_LINE3.name = "HC_LINE: Paka";
    scene.add(HC_LINE3);
    targetList.push(HC_LINE3);

    HC_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE4.material.color.setHex(0xFF0000);
    HC_LINE4.position.x = 2.21;
    HC_LINE4.position.y = 0;
    HC_LINE4.position.z = -16.86;
    HC_LINE4.scale.x = 1.56;
    HC_LINE4.scale.z = 1.6;
    HC_LINE4.name = "HC_LINE: Pnt";
    scene.add(HC_LINE4);
    targetList.push(HC_LINE4);

    HC_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE5.material.color.setHex(0xFF0000);
    HC_LINE5.position.x = 1.3;
    HC_LINE5.position.y = 0;
    HC_LINE5.position.z = -13.56;
    HC_LINE5.scale.x = -0.48;
    HC_LINE5.scale.z = 1.86;
    HC_LINE5.name = "HC_LINE: Runout";
    scene.add(HC_LINE5);
    targetList.push(HC_LINE5);

    HC_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    HC_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE6.material.color.setHex(0xFF0000);
    HC_LINE6.position.x = 2.65;
    HC_LINE6.position.y = 0;
    HC_LINE6.position.z = -12.36;
    HC_LINE6.scale.x = 2.16;
    HC_LINE6.scale.z = 1.11;
    HC_LINE6.name = "HC_LINE: Tp";
    scene.add(HC_LINE6);
    targetList.push(HC_LINE6);

    IB_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0x808080, transparent: 10.8});
    IB_LINE.material.color.setHex(0xFF0000);
    IB_LINE.position.x = -31.29;
    IB_LINE.position.y = 1.03;
    IB_LINE.position.z = -3.33;
    IB_LINE.name = "IB_LINE: pre1";
    IB_LINE.scale.x = -0.87;
    IB_LINE.scale.y = -0.59;
    IB_LINE.scale.z = -0.98;
    scene.add(IB_LINE);
    targetList.push(IB_LINE);

    IB_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE2.material.color.setHex(0xFF0000);
    IB_LINE2.position.x = -31.36;
    IB_LINE2.position.y = -0.59;
    IB_LINE2.position.z = -4.74;
    IB_LINE2.scale.x = 0.91;
    IB_LINE2.scale.y = 0.1;
    IB_LINE2.scale.z = 1.02;
    IB_LINE2.name = "IB_LINE: pre2";
    scene.add(IB_LINE2);
    targetList.push(IB_LINE2);

    IB_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE3.material.color.setHex(0xFF0000);
    IB_LINE3.position.x = -31.35;
    IB_LINE3.position.y = -0.59;
    IB_LINE3.position.z = -6.27;
    IB_LINE3.scale.x = -0.95;
    IB_LINE3.scale.y = -0.59;
    IB_LINE3.scale.z = -0.98;
    IB_LINE3.name = "IB_LINE: pre3";
    scene.add(IB_LINE3);
    targetList.push(IB_LINE3);


    IB_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE4.material.color.setHex(0xFF0000);
    IB_LINE4.position.x = -28.36;
    IB_LINE4.position.y = 0;
    IB_LINE4.position.z = -5.45;
    IB_LINE4.scale.x = -0.77;
    IB_LINE4.scale.y = 0.39;
    IB_LINE4.scale.z = 1.52;
    IB_LINE4.name = "IB_LINE: Pnt";
    scene.add(IB_LINE4);
    targetList.push(IB_LINE4);

    IB_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE5.material.color.setHex(0xFF0000);
    IB_LINE5.position.x = -27.74;
    IB_LINE5.position.y = -0.59;
    IB_LINE5.position.z = -2.66;
    IB_LINE5.scale.x = 1.69;
    IB_LINE5.scale.y = 0.11;
    IB_LINE5.scale.z = 1.7;
    IB_LINE5.name = "IB_LINE: Balancer";
    scene.add(IB_LINE5);
    targetList.push(IB_LINE5);

    IB_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/!*, new THREE.MeshNormalMaterial()*!/);
    IB_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE6.material.color.setHex(0xFF0000);
    IB_LINE6.position.x = -27.22;
    IB_LINE6.position.y = 0;
    IB_LINE6.position.z = 1.72;
    IB_LINE6.scale.x = 2.36;
    IB_LINE6.scale.y = 0.39;
    IB_LINE6.scale.z = -1.32;
    IB_LINE6.name = "IB_LINE: Runout";
    scene.add(IB_LINE6);
    targetList.push(IB_LINE6);


}*/

var control;

function initScene(index,xc,yc,zc) {

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

        this.scale_Xaxis = 0.1;
        this.scale_Yaxis = 0.1;
        this.scale_Zaxis = 0.1;

        this.scale_Xaxis2 = 0.1;
        this.scale_Yaxis2 = 0.1;
        this.scale_Zaxis2 = 0.1;

        this.scale_Xaxis3 = 0.1;
        this.scale_Yaxis3 = 0.1;
        this.scale_Zaxis3 = 0.1;

        this.scale_Xaxis4 = 0.1;
        this.scale_Yaxis4 = 0.1;
        this.scale_Zaxis4 = 0.1;

        this.scale_Xaxis5 = 0.1;
        this.scale_Yaxis5 = 0.1;
        this.scale_Zaxis5 = 0.1;

        /*this.rotate_Xaxis = 0.01;
         this.rotate_Yaxis = 0.01;
         this.rotate_Yaxis = 0.01;*/
    }

//TODO Add Controller

//Function addControl
    function addControls(controlObject) {

        var gui = new dat.GUI();
        gui.add(controlObject, 'scale_Xaxis').onChange(function (v) {
            HC_LINE.scale.x = v
        });
        gui.add(controlObject, 'scale_Yaxis').onChange(function (v) {
            HC_LINE.scale.y = v
        });
        gui.add(controlObject, 'scale_Zaxis').onChange(function (v) {
            HC_LINE.scale.z = v
        });

        gui.add(controlObject, 'scale_Xaxis2').onChange(function (v) {
            IB_LINE2.scale.x = v
        });
        gui.add(controlObject, 'scale_Yaxis2').onChange(function (v) {
            IB_LINE2.scale.y = v
        });
        gui.add(controlObject, 'scale_Zaxis2').onChange(function (v) {
            IB_LINE2.scale.z = v
        });
        gui.add(controlObject, 'scale_Xaxis3').onChange(function (v) {
            IB_LINE3.scale.x = v
        });
        gui.add(controlObject, 'scale_Yaxis3').onChange(function (v) {
            IB_LINE3.scale.y = v
        });
        gui.add(controlObject, 'scale_Zaxis3').onChange(function (v) {
            IB_LINE3.scale.z = v
        });
        gui.add(controlObject, 'scale_Xaxis4').onChange(function (v) {
            IB_LINE4.scale.x = v
        });
        gui.add(controlObject, 'scale_Yaxis4').onChange(function (v) {
            IB_LINE4.scale.y = v
        });
        gui.add(controlObject, 'scale_Zaxis4').onChange(function (v) {
            IB_LINE4.scale.z = v
        });
        gui.add(controlObject, 'scale_Xaxis5').onChange(function (v) {
            IB_LINE5.scale.x = v
        });
        gui.add(controlObject, 'scale_Yaxis5').onChange(function (v) {
            IB_LINE5.scale.y = v
        });
        gui.add(controlObject, 'scale_Zaxis5').onChange(function (v) {
            IB_LINE5.scale.z = v
        });


        gui.add(controlObject, 'position_Xaxis').onChange(function (v) {
            IB_LINE6.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis').onChange(function (v) {
            IB_LINE6.position.y = v
        });
        gui.add(controlObject, 'position_Zaxis').onChange(function (v) {
            IB_LINE6.position.z = v

        });

        gui.add(controlObject, 'position_Xaxis2').onChange(function (v) {
            IB_LINE2.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis2').onChange(function (v) {
            IB_LINE2.position.y = v

        });
        gui.add(controlObject, 'position_Zaxis2').onChange(function (v) {
            IB_LINE2.position.z = v

        });
        gui.add(controlObject, 'position_Xaxis3').onChange(function (v) {
            IB_LINE3.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis3').onChange(function (v) {
            IB_LINE3.position.y = v

        });
        gui.add(controlObject, 'position_Zaxis3').onChange(function (v) {
            IB_LINE3.position.z = v

        });
        gui.add(controlObject, 'position_Xaxis4').onChange(function (v) {
            IB_LINE4.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis4').onChange(function (v) {
            IB_LINE4.position.y = v

        });
        gui.add(controlObject, 'position_Zaxis4').onChange(function (v) {
            IB_LINE4.position.z = v

        });
        gui.add(controlObject, 'position_Xaxis5').onChange(function (v) {
            IB_LINE5.position.x = v
        });
        gui.add(controlObject, 'position_Yaxis5').onChange(function (v) {
            IB_LINE5.position.y = v

        });
        gui.add(controlObject, 'position_Zaxis5').onChange(function (v) {
            IB_LINE5.position.z = v

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
            camera.position.set(xc , yc, zc);
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
        /* scene.updateMatrixWorld(true);*/
        onWindowResize();
        //addColor();
        /*addIbLine();
        addHcLine();*/
        /*scene.remove(HC_LINE);
        scene.remove(HC_LINE2);
        scene.remove(HC_LINE3);
        scene.remove(HC_LINE4);
        scene.remove(HC_LINE5);
        scene.remove(HC_LINE6);*/
        lineName=$("#scenes_list").val();
        if(sceneInfo.name == '모든 라인'){
            addIbLine();
            addHcLine();

            // addControls(control);
        }
        else if (sceneInfo.name == "IB") {
            addIbLine();
           // addControls(control);
        } else if (sceneInfo.name == "HC") {
            addHcLine();

        }
        //clickObj();


    }, undefined, function (error) {

        console.error(error);

    });

    orbitControls = new THREE.OrbitControls(defaultCamera, renderer.domElement);


}

//TODO Colors%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
var color = {

    "gray": 0x666666,
    "red": 0xFF0000,
    "green": 0x336600,
    "blue": 0x0000FF,
    "yellow": 0xFFD800,
}
var  IB_LINE,IB_LINE2, IB_LINE3, IB_LINE4,IB_LINE5,IB_LINE6;
IB_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE5= new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

//TODO Add object to scene
function addIbLine() {

    IB_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0x808080, transparent: 10.8});
    IB_LINE.material.color.setHex(0xC6C6C6);
    var line = $("#scenes_list").val();
    if(line=='모든 라인'){
        IB_LINE.position.x = -31.49;
        IB_LINE.position.y = 1.13;
        IB_LINE.position.z = -3.21;
    }else{
        IB_LINE.position.x = -31.41;
        IB_LINE.position.y = 1.03;
        IB_LINE.position.z = -3.33;}

    IB_LINE.name = "IB_LINE: pre1";
    IB_LINE.scale.x = -0.87;
    IB_LINE.scale.y = -0.59;
    IB_LINE.scale.z = -0.98;
    scene.add(IB_LINE);
    targetList.push(IB_LINE);


    IB_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE2.material.color.setHex(0xC6C6C6);

    if(line=='모든 라인'){
        IB_LINE2.position.x = -31.47;
        IB_LINE2.position.y = 1.7;
        IB_LINE2.position.z = -4.14;
    }else{
        IB_LINE2.position.x = -31.46;
        IB_LINE2.position.y = -0.59;
        IB_LINE2.position.z = -4.74;}
    IB_LINE2.scale.x = 0.91;
    IB_LINE2.scale.y = 0.1;
    IB_LINE2.scale.z = 1.02;
    IB_LINE2.name = "IB_LINE: pre2";
    scene.add(IB_LINE2);
    targetList.push(IB_LINE2);


    IB_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE3.material.color.setHex(0xC6C6C6);
    if(line=='모든 라인'){
        IB_LINE3.position.x = -32.19;
        IB_LINE3.position.y = -0.5;
        IB_LINE3.position.z = -5.68;
    }else{
        IB_LINE3.position.x = -31.45;
        IB_LINE3.position.y = -0.59;
        IB_LINE3.position.z = -6.31;}
    IB_LINE3.scale.x = -0.95;
    IB_LINE3.scale.y = -0.59;
    IB_LINE3.scale.z = -0.98;
    IB_LINE3.name = "IB_LINE: pre3";
    scene.add(IB_LINE3);
    targetList.push(IB_LINE3);


    IB_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE4.material.color.setHex(0xC6C6C6);
    if(line=='모든 라인'){
        IB_LINE4.position.x = -29.13;
        IB_LINE4.position.z = -5.11;
    }else{
        IB_LINE4.position.x = -28.51;
        IB_LINE4.position.y = 0;
        IB_LINE4.position.z = -5.46;}
    IB_LINE4.scale.x = -0.77;
    IB_LINE4.scale.y = 0.39;
    IB_LINE4.scale.z = 1.52;
    IB_LINE4.name = "IB_LINE: Pnt";
    scene.add(IB_LINE4);
    targetList.push(IB_LINE4);


    IB_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE5.material.color.setHex(0xC6C6C6);
    if(line=='모든 라인'){
        IB_LINE5.position.x = -27.96;
        IB_LINE5.position.y = 1.38;
        IB_LINE5.position.z = -2.3;
    }else{
        IB_LINE5.position.x = -27.77;
        IB_LINE5.position.y = -0.59;
        IB_LINE5.position.z = -2.66;}
    IB_LINE5.scale.x = 1.69;
    IB_LINE5.scale.y = 0.11;
    IB_LINE5.scale.z = 1.7;
    IB_LINE5.name = "IB_LINE: Balancer";
    scene.add(IB_LINE5);
    targetList.push(IB_LINE5);

    IB_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE6.material.color.setHex(0xC6C6C6);
    if(line=='모든 라인'){
        IB_LINE6.position.x = -27.55;
    }else{
        IB_LINE6.position.x = -27.25;
        IB_LINE6.position.y = 0;
        IB_LINE6.position.z = 1.72;}
    IB_LINE6.scale.x = 2.36;
    IB_LINE6.scale.y = 0.39;
    IB_LINE6.scale.z = -1.32;
    IB_LINE6.name = "IB_LINE: Runout";
    scene.add(IB_LINE6);
    targetList.push(IB_LINE6);
}

var HC_LINE,HC_LINE2,HC_LINE3,HC_LINE4,HC_LINE5,HC_LINE6;
HC_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HC_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HC_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HC_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HC_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HC_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

function addHcLine() {

    HC_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE.material.color.setHex(0xC6C6C6);
    HC_LINE.position.x = -2.86;
    HC_LINE.position.y = 0;
    HC_LINE.position.z = -19.33;
    HC_LINE.scale.x = 1.43;
    HC_LINE.scale.z = -2.01;
    HC_LINE.name = "HC_LINE: Pre";
    scene.add(HC_LINE);
    targetList.push(HC_LINE);

    HC_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE2.material.color.setHex(0xC6C6C6);
    HC_LINE2.position.x = 2.01;
    HC_LINE2.position.y = 0;
    HC_LINE2.position.z = -21.49;
    HC_LINE2.scale.x = 1.52;
    HC_LINE2.scale.z = 1.29;
    HC_LINE2.name = "HC_LINE: Balancer";
    scene.add(HC_LINE2);
    targetList.push(HC_LINE2);

    HC_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE3.material.color.setHex(0xC6C6C6);
    HC_LINE3.position.x = 1.95;
    HC_LINE3.position.y = 0;
    HC_LINE3.position.z = -18.94;
    HC_LINE3.scale.x = 1.49;
    HC_LINE3.scale.z = -2.79;
    HC_LINE3.name = "HC_LINE: Paka";
    scene.add(HC_LINE3);
    targetList.push(HC_LINE3);

    HC_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE4.material.color.setHex(0xC6C6C6);
    HC_LINE4.position.x = 1.99;
    HC_LINE4.position.y = 0;
    HC_LINE4.position.z = -16.81;
    HC_LINE4.scale.x = 1.56;
    HC_LINE4.scale.z = 1.6;
    HC_LINE4.name = "HC_LINE: Pnt";
    scene.add(HC_LINE4);
    targetList.push(HC_LINE4);

    HC_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE5.material.color.setHex(0xC6C6C6);
    HC_LINE5.position.x = 1.09;
    HC_LINE5.position.y = 0;
    HC_LINE5.position.z = -13.48;
    HC_LINE5.scale.x = -0.48;
    HC_LINE5.scale.z = 1.86;
    HC_LINE5.name = "HC_LINE: Runout";
    scene.add(HC_LINE5);
    targetList.push(HC_LINE5);

    HC_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE6.material.color.setHex(0xC6C6C6);
    HC_LINE6.position.x = 2.48;
    HC_LINE6.position.y = 0;
    HC_LINE6.position.z = -12.27;
    HC_LINE6.scale.x = 2.16;
    HC_LINE6.scale.z = 1.11;
    HC_LINE6.name = "HC_LINE: Tp";
    scene.add(HC_LINE6);
    targetList.push(HC_LINE6);
}
var colorHcPre, colorHcPnt, colorHcPaka, colorHcRunout,colorHcBalancer,colorHcTp;
var material;
function changeColorHC_LINE() {


    if (colorHcPre === 'auto') {
        HC_LINE.material.color = new THREE.Color(color["green"]);
        HC_LINE.material.needsUpdate = true;

    } else if (colorHcPre === 'wait') {
        HC_LINE.material.color = new THREE.Color(color["yellow"]);
        HC_LINE.material.needsUpdate = true;

    }
    else if (colorHcPre === 'stop') {
        HC_LINE.material.color = new THREE.Color(color["red"]);
        HC_LINE.material.needsUpdate = true;

    } else if (colorHcPre === 'offline') {
        HC_LINE.material.color = new THREE.Color(color["gray"]);
        HC_LINE.material.needsUpdate = true;

    }else if (colorHcPre === 'manual') {
        HC_LINE.material.color = new THREE.Color(color["blue"]);
        HC_LINE.material.needsUpdate = true;

    }

    if (colorHcBalancer === 'auto') {
        HC_LINE2.material.color = new THREE.Color(color["green"]);
        HC_LINE2.material.needsUpdate = true;

    } else if (colorHcBalancer === 'wait') {
        HC_LINE2.material.color = new THREE.Color(color["yellow"]);
        HC_LINE2.material.needsUpdate = true;

    }
    else if (colorHcBalancer === 'stop') {
        HC_LINE2.material.color = new THREE.Color(color["red"]);
        HC_LINE2.material.needsUpdate = true;

    } else if (colorHcBalancer === 'offline') {
        HC_LINE2.material.color = new THREE.Color(color["gray"]);
        HC_LINE2.material.needsUpdate = true;

    }else if (colorHcBalancer === 'manual') {
        HC_LINE2.material.color = new THREE.Color(color["blue"]);
        HC_LINE2.material.needsUpdate = true;

    }

    if (colorHcPaka === 'auto') {
        HC_LINE3.material.color = new THREE.Color(color["green"]);
        HC_LINE3.material.needsUpdate = true;

    } else if (colorHcPaka === 'wait') {
        HC_LINE3.material.color = new THREE.Color(color["yellow"]);
        HC_LINE3.material.needsUpdate = true;

    }
    else if (colorHcPaka === 'stop') {
        HC_LINE3.material.color = new THREE.Color(color["red"]);
        HC_LINE3.material.needsUpdate = true;

    } else if (colorHcPaka === 'offline') {
        HC_LINE3.material.color = new THREE.Color(color["gray"]);
        HC_LINE3.material.needsUpdate = true;

    }else if (colorHcPaka === 'manual') {
        HC_LINE3.material.color = new THREE.Color(color["blue"]);
        HC_LINE3.material.needsUpdate = true;

    }


    if (colorHcPnt === 'auto') {
        HC_LINE4.material.color = new THREE.Color(color["green"]);
        HC_LINE4.material.needsUpdate = true;

    } else if (colorHcPnt === 'wait') {
        HC_LINE4.material.color = new THREE.Color(color["yellow"]);
        HC_LINE4.material.needsUpdate = true;

    }
    else if (colorHcPnt === 'stop') {
        HC_LINE4.material.color = new THREE.Color(color["red"]);
        HC_LINE4.material.needsUpdate = true;

    } else if (colorHcPnt === 'offline') {
        HC_LINE4.material.color = new THREE.Color(color["gray"]);
        HC_LINE4.material.needsUpdate = true;

    }else if (colorHcPnt === 'manual') {
        HC_LINE4.material.color = new THREE.Color(color["blue"]);
        HC_LINE4.material.needsUpdate = true;

    }

    if (colorHcRunout === 'auto') {
        HC_LINE5.material.color = new THREE.Color(color["green"]);
        HC_LINE5.material.needsUpdate = true;

    } else if (colorHcRunout === 'wait') {
        HC_LINE5.material.color = new THREE.Color(color["yellow"]);
        HC_LINE5.material.needsUpdate = true;

    }
    else if (colorHcRunout === 'stop') {
        HC_LINE5.material.color = new THREE.Color(color["red"]);
        HC_LINE5.material.needsUpdate = true;

    } else if (colorHcRunout === 'offline') {
        HC_LINE5.material.color = new THREE.Color(color["gray"]);
        HC_LINE5.material.needsUpdate = true;

    }else if (colorHcRunout === 'manual') {
        HC_LINE5.material.color = new THREE.Color(color["blue"]);
        HC_LINE5.material.needsUpdate = true;

    }

    if (colorHcTp === 'auto') {
        HC_LINE6.material.color = new THREE.Color(color["green"]);
        HC_LINE6.material.needsUpdate = true;

    } else if (colorHcTp === 'wait') {
        HC_LINE6.material.color = new THREE.Color(color["yellow"]);
        HC_LINE6.material.needsUpdate = true;

    }
    else if (colorHcTp === 'stop') {
        HC_LINE6.material.color = new THREE.Color(color["red"]);
        HC_LINE6.material.needsUpdate = true;

    } else if (colorHcTp === 'offline') {
        HC_LINE6.material.color = new THREE.Color(color["gray"]);
        HC_LINE6.material.needsUpdate = true;

    }else if (colorHcTp === 'manual') {
        HC_LINE6.material.color = new THREE.Color(color["blue"]);
        HC_LINE6.material.needsUpdate = true;

    }

}
var colorIbPre1, colorIbPre2, colorIbPre3, colorIbPnt, colorIbRunout, colorIbBalancer;

function changeColorIB_LINE() {
    if (colorIbPre1 === 'auto') {
        IB_LINE.material.color = new THREE.Color(color["green"]);
        IB_LINE.material.needsUpdate = true;

    } else if (colorIbPre1 === 'wait') {
        IB_LINE.material.color = new THREE.Color(color["yellow"]);
        IB_LINE.material.needsUpdate = true;

    }
    else if (colorIbPre1 === 'stop') {
        IB_LINE.material.color = new THREE.Color(color["red"]);
        IB_LINE.material.needsUpdate = true;

    } else if (colorIbPre1 === 'offline') {
        IB_LINE.material.color = new THREE.Color(color["gray"]);
        IB_LINE.material.needsUpdate = true;

    }else if (colorIbPre1 === 'manual') {
        IB_LINE.material.color = new THREE.Color(color["blue"]);
        IB_LINE.material.needsUpdate = true;

    }

    if (colorIbPre2 === 'auto') {
        IB_LINE2.material.color = new THREE.Color(color["green"]);
        IB_LINE2.material.needsUpdate = true;

    } else if (colorIbPre2 === 'wait') {
        IB_LINE2.material.color = new THREE.Color(color["yellow"]);
        IB_LINE2.material.needsUpdate = true;

    }
    else if (colorIbPre2 === 'stop') {
        IB_LINE2.material.color = new THREE.Color(color["red"]);
        IB_LINE2.material.needsUpdate = true;

    } else if (colorIbPre2 === 'offline') {
        IB_LINE2.material.color = new THREE.Color(color["gray"]);
        IB_LINE2.material.needsUpdate = true;

    }else if (colorIbPre2 === 'manual') {
        IB_LINE2.material.color = new THREE.Color(color["blue"]);
        IB_LINE2.material.needsUpdate = true;

    }


    if (colorIbPre3 === 'auto') {
        IB_LINE3.material.color = new THREE.Color(color["green"]);
        IB_LINE3.material.needsUpdate = true;

    } else if (colorIbPre3 === 'wait') {
        IB_LINE3.material.color = new THREE.Color(color["yellow"]);
        IB_LINE3.material.needsUpdate = true;

    }
    else if (colorIbPre3 === 'stop') {
        IB_LINE3.material.color = new THREE.Color(color["red"]);
        IB_LINE3.material.needsUpdate = true;

    } else if (colorIbPre3 === 'offline') {
        IB_LINE3.material.color = new THREE.Color(color["gray"]);
        IB_LINE3.material.needsUpdate = true;

    }else if (colorIbPre3 === 'manual') {
        IB_LINE3.material.color = new THREE.Color(color["blue"]);
        IB_LINE3.material.needsUpdate = true;

    }

    if (colorIbPnt === 'auto') {
        IB_LINE4.material.color = new THREE.Color(color["green"]);
        IB_LINE4.material.needsUpdate = true;

    } else if (colorIbPnt === 'wait') {
        IB_LINE4.material.color = new THREE.Color(color["yellow"]);
        IB_LINE4.material.needsUpdate = true;

    }
    else if (colorIbPnt === 'stop') {
        IB_LINE4.material.color = new THREE.Color(color["red"]);
        IB_LINE4.material.needsUpdate = true;

    } else if (colorIbPnt === 'offline') {
        IB_LINE4.material.color = new THREE.Color(color["gray"]);
        IB_LINE4.material.needsUpdate = true;

    }else if (colorIbPnt === 'manual') {
        IB_LINE4.material.color = new THREE.Color(color["blue"]);
        IB_LINE4.material.needsUpdate = true;

    }

    if (colorIbBalancer === 'auto') {
        IB_LINE5.material.color = new THREE.Color(color["green"]);
        IB_LINE5.material.needsUpdate = true;

    } else if (colorIbBalancer === 'wait') {
        IB_LINE5.material.color = new THREE.Color(color["yellow"]);
        IB_LINE5.material.needsUpdate = true;

    }
    else if (colorIbBalancer === 'stop') {
        IB_LINE5.material.color = new THREE.Color(color["red"]);
        IB_LINE5.material.needsUpdate = true;

    } else if (colorIbBalancer === 'offline') {
        IB_LINE5.material.color = new THREE.Color(color["gray"]);
        IB_LINE5.material.needsUpdate = true;

    }else if (colorIbBalancer === 'manual') {
        IB_LINE5.material.color = new THREE.Color(color["blue"]);
        IB_LINE5.material.needsUpdate = true;

    }

    if (colorIbRunout === 'auto') {
        IB_LINE6.material.color = new THREE.Color(color["green"]);
        IB_LINE6.material.needsUpdate = true;

    } else if (colorIbRunout === 'wait') {
        IB_LINE6.material.color = new THREE.Color(color["yellow"]);
        IB_LINE6.material.needsUpdate = true;

    }
    else if (colorIbRunout === 'stop') {
        IB_LINE6.material.color = new THREE.Color(color["red"]);
        IB_LINE6.material.needsUpdate = true;

    } else if (colorIbRunout === 'offline') {
        IB_LINE6.material.color = new THREE.Color(color["gray"]);
        IB_LINE6.material.needsUpdate = true;

    }else if (colorIbRunout === 'manual') {
        IB_LINE6.material.color = new THREE.Color(color["blue"]);
        IB_LINE6.material.needsUpdate = true;

    }


}

//TODO function select Scene~~~~~~~~~~~~~~~~~~~~~~~~~~
function selectScene() {

    var select = document.getElementById("scenes_list");
    var index = select.selectedIndex;

    var sceneInfo = sceneList[index];
    if (sceneInfo.name == "모든 라인") {
        all_line=14;
        alert("ALL");
        loadLine(0,-2.5, 110, 9);
        loadLine(1,-2.5, 110, 9);
        loadLine(2,-2.5, 110, 9);
        loadLine(3,-2.5, 110, 9);
        loadLine(4,-2.5, 110, 9);
        loadLine(5,-2.5, 110, 9);
        loadLine(6,-2.5, 110, 9);
        loadLine(7,-2.5, 110, 9);
        loadLine(8,-2.5, 110, 9);
        loadLine(9,-2.5, 110, 9);
        loadLine(10,-2.5, 110, 9);
        loadLine(11,-2.5, 110, 9);
        loadLine(12,-2.5, 110, 9);
        loadLine(13,-2.5, 110, 9);

    } else if (index=== 0) {//HA
        loadLine(index,-30,40.84,-10.1);
        all_line=0;
    }else if (index=== 1) {//HB
        loadLine(index,-20, 40.84, -10.1);
        all_line=1;
    } else if (index=== 2) {//PD
        loadLine(index,-10, 40.84, -10.1);
        all_line=2;
    }else if (index=== 3) {//HC
        loadLine(index,0,40.84,-10.1);
        all_line=3;
    }else if (index=== 4) {//PE
        loadLine(index,10, 40.84, -10.1);
        all_line=4;
    }else if (index=== 5) {//AA
        loadLine(index,20, 40.84, -10.1);
        all_line=5;
    }else if (index=== 6) {//AB
        loadLine(index,32, 40.84, -10.1);
        all_line=6;
    }else if (index=== 7) {//HD
        loadLine(index,-40, 43, 7.5);
        all_line=7;
    }else if (index=== 8) {//IB
        loadLine(index,-30, 43, 7.5);
        all_line=8;
    }else if (index=== 9) {//IA
        loadLine(index,-20, 43, 7.5);
        all_line=9;
    }else if (index=== 10) {//PA
        loadLine(index,-10, 43, 7.5);
        all_line=10;
    }else if (index=== 11) {//PB
        loadLine(index,0, 43, 7.5);
        all_line=11;
    }else if (index=== 12) {//PC
        loadLine(index,10, 43, 7.5);
        all_line=12;
    }else if (index=== 13) {//VA
        loadLine13(index,25, 43, 7.5);
        all_line=13;
    }

    var line = $("#scenes_list").val();
    if (line === 'IB') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllSNew, eetAllBNew);
    } else if (line === 'HC') {
        process.findMStateByLineAndStartTimeAndEndTime(eetAllS, eetAllB);
    }else if (line === '모든 라인') {
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

//TODO SetInterval Color Change

/*setInterval(changeColorHC_LINE,1);
setInterval(changeColorIB_LINE, 1);*/


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
        name: 'HA', url: '../../static/admin/models/HaLine/%s/HA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-10, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HB', url: '../../static/admin/models/HbLine/%s/HB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(0, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PD', url: '../../static/admin/models/PDLine/%s/PD-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(10, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HC', url: '../../static/admin/models/HcLine/%s/HC-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(20, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PE', url: '../../static/admin/models/PeLine/%s/PE-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(30, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'AA', url: '../../static/admin/models/AaLine/%s/AA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(40, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'AB', url: '../../static/admin/models/AbLine/%s/AB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(51.5, 1, 0),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'HD', url: '../../static/admin/models/HdLine/%s/HD-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-20, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'IB', url: '../../static/admin/models/IbLine/%s/IB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(-9.5, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'IA', url: '../../static/admin/models/IaLine/%s/IA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(0, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PA', url: '../../static/admin/models/PaLine/%s/PA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(10, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PB', url: '../../static/admin/models/PbLine/%s/PB-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(20, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'PC', url: '../../static/admin/models/PcLine/%s/PC-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(29.5, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },
    {
        name: 'VA', url: '../../static/admin/models/VaLine/%s/VA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(45.2, 1, 16),
        addLights: true,
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    },{
        name: '모든 라인', url: '../../static/admin/models/VaLine/%s/VA-LINE.gltf',
        cameraPos: new THREE.Vector3(xc,yc,zc),
        objectRotation: new THREE.Euler(0.75, Math.PI, 0),
        objectPosition: new THREE.Vector3(45.2, 1, 16),
        addLights: true,
        /* objectScale: new THREE.Vector3(0, 0, 0),*/
        extensions: ['glTF', 'glTF-Embedded', 'glTF-MaterialsCommon', 'glTF-pbrSpecularGlossiness', 'glTF-Binary'],
        addEnvMap: true
    }


];

//TODO function load index line gLTF, Cleanup, initScene~~~~~~~~~~~~~~~~~~~~~~
function loadLine(index,xc,yc,zc) {
    cleanup();
    initScene(index,xc,yc,zc);
}
function loadLine13(index,xc,yc,zc) {

    cleanup();
    initScene(index,xc,yc,zc);


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
