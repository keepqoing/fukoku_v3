
//TODO Colors%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

var IB_LINE, IB_LINE2, IB_LINE3, IB_LINE4, IB_LINE5, IB_LINE6;
IB_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
IB_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

//TODO Add object to scene
function addIbLine() {

    IB_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0x808080, transparent: 10.8});
    IB_LINE.material.color.setHex(0xC6C6C6);
    var line = $("#scenes_list").val();

    IB_LINE.position.x = -31.38;
    IB_LINE.position.y = 1.71;
    IB_LINE.position.z = -3.16;

    IB_LINE.rotation.x = 0.17;
    IB_LINE.name = "IB_LINE: pre1";
    IB_LINE.scale.x = 0.88;
    IB_LINE.scale.y = -0.59;
    IB_LINE.scale.z = -0.98;
    scene.add(IB_LINE);
    targetList.push(IB_LINE);


    IB_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE2.material.color.setHex(0xC6C6C6);
    IB_LINE2.position.x = -31.39;
    IB_LINE2.position.y = 1.84;
    IB_LINE2.position.z = -4.07;
    IB_LINE2.rotation.x = 0.17;
    IB_LINE2.scale.x = 0.88;
    IB_LINE2.scale.y = 0.1;
    IB_LINE2.scale.z = 0.95;
    IB_LINE2.name = "IB_LINE: pre2";
    scene.add(IB_LINE2);
    targetList.push(IB_LINE2);


    IB_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE3.material.color.setHex(0xC6C6C6);

    IB_LINE3.position.x = -31.39;
    IB_LINE3.position.y = 2.03;
    IB_LINE3.position.z = -5.47;

    IB_LINE3.rotation.x = 0.17;
    IB_LINE3.scale.x = 0.9;
    IB_LINE3.scale.y = -0.59;
    IB_LINE3.scale.z = -0.98;
    IB_LINE3.name = "IB_LINE: pre3";
    scene.add(IB_LINE3);
    targetList.push(IB_LINE3);


    IB_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE4.material.color.setHex(0xC6C6C6);
    IB_LINE4.position.x = -28.14;
    IB_LINE4.position.y = 1.99;
    IB_LINE4.position.z = -4.83;
    IB_LINE4.rotation.x = 0.17;
    IB_LINE4.scale.x = 1.29;
    IB_LINE4.scale.y = 0.39;
    IB_LINE4.scale.z = 1.52;
    IB_LINE4.name = "IB_LINE: Pnt";
    scene.add(IB_LINE4);
    targetList.push(IB_LINE4);


    IB_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE5.material.color.setHex(0xC6C6C6);
    IB_LINE5.position.x = -27.98;
    IB_LINE5.position.y = 1.55;
    IB_LINE5.position.z = -2.21;
    IB_LINE5.rotation.x = 0.17;
    IB_LINE5.scale.x = 1.53;
    IB_LINE5.scale.y = 0.11;
    IB_LINE5.scale.z = 1.54;
    IB_LINE5.name = "IB_LINE: Balancer";
    scene.add(IB_LINE5);
    targetList.push(IB_LINE5);

    IB_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    IB_LINE6.material.color.setHex(0xC6C6C6);
    IB_LINE6.position.x = -27.3;
    IB_LINE6.position.y = 0.82;
    IB_LINE6.position.z = 1.87;
    IB_LINE6.rotation.x = 0.17;
    IB_LINE6.scale.x = 2.36;
    IB_LINE6.scale.y = 0.39;
    IB_LINE6.scale.z = -1.32;
    IB_LINE6.name = "IB_LINE: Runout";
    scene.add(IB_LINE6);
    targetList.push(IB_LINE6);
}

//TODO HA Line Function Add Object
var HA_LINE, HA_LINE2, HA_LINE3, HA_LINE4, HA_LINE5;
HA_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HA_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HA_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HA_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HA_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

function addHaLine() {

    HA_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HA_LINE.material.color.setHex(0xC6C6C6);
    HA_LINE.position.x = -32.07;
    HA_LINE.position.y = 1.01;
    HA_LINE.position.z = -15.29;
    HA_LINE.rotation.x = 0.17;
    HA_LINE.scale.x = 1.78;
    HA_LINE.scale.z = 1.9;
    HA_LINE.name = "HA_LINE: Pre";
    scene.add(HA_LINE);
    targetList.push(HA_LINE);

    HA_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HA_LINE2.material.color.setHex(0xC6C6C6);
    HA_LINE2.position.x = -32.14;
    HA_LINE2.position.y = 1.84;
    HA_LINE2.position.z = -20.31;
    HA_LINE2.rotation.x = 0.17;
    HA_LINE2.scale.x = 1.83;
    HA_LINE2.scale.z = 3.34;
    scene.add(HA_LINE2);
    targetList.push(HA_LINE2);

    HA_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HA_LINE3.material.color.setHex(0xC6C6C6);
    HA_LINE3.position.x = -27.97;
    HA_LINE3.position.y = 1.944;
    HA_LINE3.position.z = -20.55;
    HA_LINE3.rotation.x = 0.17;
    HA_LINE3.scale.x = 1.45;
    HA_LINE3.scale.z = 1.35;
    scene.add(HA_LINE3);
    targetList.push(HA_LINE3);

    HA_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HA_LINE4.material.color.setHex(0xC6C6C6);
    HA_LINE4.position.x = -27.49;
    HA_LINE4.position.y = 1.6;
    HA_LINE4.position.z = -18.84;
    HA_LINE4.rotation.x = 0.17;
    HA_LINE4.scale.x = 2;
    HA_LINE4.scale.z = 1.51;
    scene.add(HA_LINE4);
    targetList.push(HA_LINE4);

    HA_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HA_LINE5.material.color.setHex(0xC6C6C6);
    HA_LINE5.position.x = -27.75;
    HA_LINE5.position.y = 1.07;
    HA_LINE5.position.z = -15.5;
    HA_LINE5.rotation.x = 0.17;
    HA_LINE5.scale.x = 1.68;
    HA_LINE5.scale.z = 1.3;
    scene.add(HA_LINE5);
    targetList.push(HA_LINE5);
}



//TODO The PD Line Function Add Object
var PD_LINE, PD_LINE2, PD_LINE3, PD_LINE4, PD_LINE5;
PD_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
PD_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
PD_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
PD_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
PD_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
function addPDLine() {
    PD_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    PD_LINE.material.color.setHex(0xC6C6C6);
    PD_LINE.position.x = -11.84;
    PD_LINE.position.y = 0.28;
    PD_LINE.position.z = -11.31;
    PD_LINE.rotation.x = 0.17;
    PD_LINE.scale.x = 1.51;
    PD_LINE.scale.z = 2.12;
    scene.add(PD_LINE);
    targetList.push(PD_LINE);

    PD_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    PD_LINE2.material.color.setHex(0xC6C6C6);
    PD_LINE2.position.x = -8.68;
    PD_LINE2.position.y = 0.19;
    PD_LINE2.position.z = -19.86;
    PD_LINE2.rotation.x = 0.17;
    PD_LINE2.scale.x = 1.25;
    PD_LINE2.scale.z = 1.2;
    scene.add(PD_LINE2);
    targetList.push(PD_LINE2);

    PD_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    PD_LINE3.material.color.setHex(0xC6C6C6);
    PD_LINE3.position.x = -8.7;
    PD_LINE3.position.y = 1.87;
    PD_LINE3.position.z = -20.53;
    PD_LINE3.rotation.x = 0.17;
    PD_LINE3.scale.x = 1.51;
    PD_LINE3.scale.z = 1.25;
    scene.add(PD_LINE3);
    targetList.push(PD_LINE3);

    PD_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    PD_LINE4.material.color.setHex(0xC6C6C6);
    PD_LINE4.position.x = -11.75;
    PD_LINE4.position.y = 0.7;
    PD_LINE4.position.z = -13.62;
    PD_LINE4.rotation.x = 0.17;
    PD_LINE4.scale.x = 1.51;
    PD_LINE4.scale.z = 2.75;
    scene.add(PD_LINE4);
    targetList.push(PD_LINE4);

    PD_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    PD_LINE5.material.color.setHex(0xC6C6C6);
    PD_LINE5.position.x = -8.09;
    PD_LINE5.position.y = 0.7;
    PD_LINE5.position.z = -18.53;
    PD_LINE5.rotation.x = 0.17;
    PD_LINE5.scale.x = 1.51;
    PD_LINE5.scale.z = 1.34;
    scene.add(PD_LINE5);
    targetList.push(PD_LINE5);
}
//TODO The end HA Line Function Add Object

var HC_LINE, HC_LINE2, HC_LINE3, HC_LINE4, HC_LINE5, HC_LINE6;
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
    HC_LINE.position.x = -2.74;
    HC_LINE.position.y = 1.66;
    HC_LINE.position.z = -18.93;
    HC_LINE.rotation.x = 0.17;
    HC_LINE.scale.x = 1.38;
    HC_LINE.scale.z = 1.92;
    HC_LINE.name = "HC_LINE: Pre";
    scene.add(HC_LINE);
    targetList.push(HC_LINE);

    HC_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE2.material.color.setHex(0xC6C6C6);
    HC_LINE2.position.x = 1.98;
    HC_LINE2.position.y = 1.98;
    HC_LINE2.position.z = -20.92;
    HC_LINE2.rotation.x = 0.17;
    HC_LINE2.scale.x = 1.52;
    HC_LINE2.scale.z = 1.29;
    HC_LINE2.name = "HC_LINE: Balancer";
    scene.add(HC_LINE2);
    targetList.push(HC_LINE2);

    HC_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE3.material.color.setHex(0xC6C6C6);
    HC_LINE3.position.x = 1.84;
    HC_LINE3.position.y = 1.58;
    HC_LINE3.position.z = -18.61;
    HC_LINE3.rotation.x = 0.17;
    HC_LINE3.scale.x = 1.41;
    HC_LINE3.scale.z = 2.63;
    HC_LINE3.name = "HC_LINE: Paka";
    scene.add(HC_LINE3);
    targetList.push(HC_LINE3);

    HC_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE4.material.color.setHex(0xC6C6C6);
    HC_LINE4.position.x = 1.92;
    HC_LINE4.position.y = 1.09;
    HC_LINE4.position.z = -16.63;
    HC_LINE4.rotation.x = 0.17;
    HC_LINE4.scale.x = 1.55;
    HC_LINE4.scale.z = 1.62;
    HC_LINE4.name = "HC_LINE: Pnt";
    scene.add(HC_LINE4);
    targetList.push(HC_LINE4);

    HC_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE5.material.color.setHex(0xC6C6C6);
    HC_LINE5.position.x = 1.05;
    HC_LINE5.position.y = 0.73;
    HC_LINE5.position.z = -13.43;
    HC_LINE5.rotation.x = 0.17;
    HC_LINE5.scale.x = -0.48;
    HC_LINE5.scale.z = 1.86;
    HC_LINE5.name = "HC_LINE: Runout";
    scene.add(HC_LINE5);
    targetList.push(HC_LINE5);

    HC_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HC_LINE6.material.color.setHex(0xC6C6C6);
    HC_LINE6.position.x = 2.43;
    HC_LINE6.position.y = 0.49;
    HC_LINE6.position.z = -12.27;
    HC_LINE6.rotation.x = 0.17;
    HC_LINE6.scale.x = 2.14;
    HC_LINE6.scale.z = 1.11;
    HC_LINE6.name = "HC_LINE: Tp";
    scene.add(HC_LINE6);
    targetList.push(HC_LINE6);
}


var HB_LINE, HB_LINE2, HB_LINE3, HB_LINE4;
HB_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HB_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HB_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HB_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

function addHBLine() {

    HB_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HB_LINE.material.color.setHex(0xC6C6C6);
    HB_LINE.position.x = -22.42;
    HB_LINE.position.y = 0.7;
    HB_LINE.position.z = -14.14;
    HB_LINE.rotation.x = 0.17;
    HB_LINE.scale.x = 1.51;
    HB_LINE.scale.z = 2.12;
    scene.add(HB_LINE);
    targetList.push(HB_LINE);

    HB_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HB_LINE2.material.color.setHex(0xC6C6C6);
    HB_LINE2.position.x = -17.53;
    HB_LINE2.position.y = 0.98;
    HB_LINE2.position.z = -21.4;
    HB_LINE2.rotation.x = 0.17;
    HB_LINE2.scale.x = 1.41;
    HB_LINE2.scale.z = 0.76;
    scene.add(HB_LINE2);
    targetList.push(HB_LINE2);

    HB_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HB_LINE3.material.color.setHex(0xC6C6C6);
    HB_LINE3.position.x = -17.97;
    HB_LINE3.position.y = 0.98;
    HB_LINE3.position.z = -20.3;
    HB_LINE3.rotation.x = 0.17;
    HB_LINE3.scale.x = 1.12;
    HB_LINE3.scale.z = 1.17;
    scene.add(HB_LINE3);
    targetList.push(HB_LINE3);

    HB_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HB_LINE4.material.color.setHex(0xC6C6C6);
    HB_LINE4.position.x = -19.11;
    HB_LINE4.position.y = 0.25;
    HB_LINE4.position.z = -14.39;
    HB_LINE4.rotation.x = 0.17;
    HB_LINE4.scale.x = 1.51;
    HB_LINE4.scale.z = 2.12;
    scene.add(HB_LINE4);
    targetList.push(HB_LINE4);
}

var HD_LINE, HD_LINE2, HD_LINE3, HD_LINE4, HD_LINE5, HD_LINE6;
HD_LINE = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HD_LINE2 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HD_LINE3 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HD_LINE4 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HD_LINE5 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);
HD_LINE6 = new THREE.Mesh(new THREE.CubeGeometry(1.66, 0.01, 0.78)/*, new THREE.MeshNormalMaterial()*/);

function addHDLine() {

    HD_LINE.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE.material.color.setHex(0xC6C6C6);
    HD_LINE.position.x = -42.51;
    HD_LINE.position.y = 0.98;
    HD_LINE.position.z = 0.86;
    HD_LINE.rotation.x = 0.17;
    HD_LINE.scale.x = 1.51;
    HD_LINE.scale.z = 2.12;
    HD_LINE.name = "HD_LINE: Pre";
    scene.add(HD_LINE);
    targetList.push(HD_LINE);

    HD_LINE2.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE2.material.color.setHex(0xC6C6C6);
    HD_LINE2.position.x = -37.99;
    HD_LINE2.position.y = 1.99;
    HD_LINE2.position.z = -4.92;
    HD_LINE2.rotation.x = 0.17;
    HD_LINE2.scale.x = -1.52;
    HD_LINE2.scale.z = -1.55;
    HD_LINE2.name = "HD_LINE: Balancer";
    scene.add(HD_LINE2);
    targetList.push(HD_LINE2);

    HD_LINE3.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE3.material.color.setHex(0xC6C6C6);
    HD_LINE3.position.x = -42.44;
    HD_LINE3.position.y = 1.85;
    HD_LINE3.position.z = -4.03;
    HD_LINE3.rotation.x = 0.17;
    HD_LINE3.scale.x = 1.38;
    HD_LINE3.scale.z = -2.34;
    HD_LINE3.name = "HD_LINE: Paka";
    scene.add(HD_LINE3);
    targetList.push(HD_LINE3);

    HD_LINE4.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE4.material.color.setHex(0xC6C6C6);
    HD_LINE4.position.x = -38.02;
    HD_LINE4.position.y = 1.52;
    HD_LINE4.position.z = -2.13;
    HD_LINE4.rotation.x = 0.17;
    HD_LINE4.scale.x = 1.52;
    HD_LINE4.scale.z = 1.6;
    HD_LINE4.name = "HD_LINE: Pnt";
    scene.add(HD_LINE4);
    targetList.push(HD_LINE4);

    HD_LINE5.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE5.material.color.setHex(0xC6C6C6);
    HD_LINE5.position.x = -38.72;
    HD_LINE5.position.y = 0.88;
    HD_LINE5.position.z = 1.52;
    HD_LINE5.rotation.x = 0.17;
    HD_LINE5.scale.x = -0.61;
    HD_LINE5.scale.z = -2.19;
    HD_LINE5.name = "HD_LINE: Runout";
    scene.add(HD_LINE5);
    targetList.push(HD_LINE5);

    HD_LINE6.material.transparent = true;
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    HD_LINE6.material.color.setHex(0xC6C6C6);
    HD_LINE6.position.x = -37.82;
    HD_LINE6.position.y = 0.64;
    HD_LINE6.position.z = 3.04;
    HD_LINE6.rotation.x = 0.17;
    HD_LINE6.scale.x = -1.7;
    HD_LINE6.scale.z = -1.38;
    HD_LINE6.name = "HD_LINE: Tp";
    scene.add(HD_LINE6);
    targetList.push(HD_LINE6);
}

