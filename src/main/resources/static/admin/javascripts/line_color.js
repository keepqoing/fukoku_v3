
var color = {

    "gray": 0x666666,
    "red": 0xFF0000,
    "green": 0x336600,
    "blue": 0x0000FF,
    "yellow": 0xFFD800,
}
//TODO Change color PD_LINE
var colorPDPre, colorPDOven, colorPDBalancer, colorPDPaka, colorPDPnt;
var material;
function changeColorPD_LINE() {
    if (colorPDPre === 'auto') {
        PD_LINE.material.color = new THREE.Color(color["green"]);
        PD_LINE.material.needsUpdate = true;

    } else if (colorPDPre === 'wait') {
        PD_LINE.material.color = new THREE.Color(color["yellow"]);
        PD_LINE.material.needsUpdate = true;

    }
    else if (colorPDPre === 'stop') {
        PD_LINE.material.color = new THREE.Color(color["red"]);
        PD_LINE.material.needsUpdate = true;

    } else if (colorPDPre === 'offline') {
        PD_LINE.material.color = new THREE.Color(color["gray"]);
        PD_LINE.material.needsUpdate = true;

    } else if (colorPDPre === 'manual') {
        PD_LINE.material.color = new THREE.Color(color["blue"]);
        PD_LINE.material.needsUpdate = true;

    }

    if (colorPDOven === 'auto') {
        PD_LINE2.material.color = new THREE.Color(color["green"]);
        PD_LINE2.material.needsUpdate = true;

    } else if (colorPDOven === 'wait') {
        PD_LINE2.material.color = new THREE.Color(color["yellow"]);
        PD_LINE2.material.needsUpdate = true;

    }
    else if (colorPDOven === 'stop') {
        PD_LINE2.material.color = new THREE.Color(color["red"]);
        PD_LINE2.material.needsUpdate = true;

    } else if (colorPDOven === 'offline') {
        PD_LINE2.material.color = new THREE.Color(color["gray"]);
        PD_LINE2.material.needsUpdate = true;

    } else if (colorPDOven === 'manual') {
        PD_LINE2.material.color = new THREE.Color(color["blue"]);
        PD_LINE2.material.needsUpdate = true;

    }

    if (colorPDBalancer === 'auto') {
        PD_LINE3.material.color = new THREE.Color(color["green"]);
        PD_LINE3.material.needsUpdate = true;

    } else if (colorPDBalancer === 'wait') {
        PD_LINE3.material.color = new THREE.Color(color["yellow"]);
        PD_LINE3.material.needsUpdate = true;

    }
    else if (colorPDBalancer === 'stop') {
        PD_LINE3.material.color = new THREE.Color(color["red"]);
        PD_LINE3.material.needsUpdate = true;

    } else if (colorPDBalancer === 'offline') {
        PD_LINE3.material.color = new THREE.Color(color["gray"]);
        PD_LINE3.material.needsUpdate = true;

    } else if (colorPDBalancer === 'manual') {
        PD_LINE3.material.color = new THREE.Color(color["blue"]);
        PD_LINE3.material.needsUpdate = true;

    }

    if (colorPDPaka === 'auto') {
        PD_LINE4.material.color = new THREE.Color(color["green"]);
        PD_LINE4.material.needsUpdate = true;

    } else if (colorPDPaka === 'wait') {
        PD_LINE4.material.color = new THREE.Color(color["yellow"]);
        PD_LINE4.material.needsUpdate = true;

    }
    else if (colorPDPaka === 'stop') {
        PD_LINE4.material.color = new THREE.Color(color["red"]);
        PD_LINE4.material.needsUpdate = true;

    } else if (colorPDPaka === 'offline') {
        PD_LINE4.material.color = new THREE.Color(color["gray"]);
        PD_LINE4.material.needsUpdate = true;

    } else if (colorPDPaka === 'manual') {
        PD_LINE4.material.color = new THREE.Color(color["blue"]);
        PD_LINE4.material.needsUpdate = true;

    }

    if (colorPDPnt === 'auto') {
        PD_LINE5.material.color = new THREE.Color(color["green"]);
        PD_LINE5.material.needsUpdate = true;

    } else if (colorPDPnt === 'wait') {
        PD_LINE5.material.color = new THREE.Color(color["yellow"]);
        PD_LINE5.material.needsUpdate = true;

    }
    else if (colorPDPnt === 'stop') {
        PD_LINE5.material.color = new THREE.Color(color["red"]);
        PD_LINE5.material.needsUpdate = true;

    } else if (colorPDPnt === 'offline') {
        PD_LINE5.material.color = new THREE.Color(color["gray"]);
        PD_LINE5.material.needsUpdate = true;

    } else if (colorPDPnt === 'manual') {
        PD_LINE5.material.color = new THREE.Color(color["blue"]);
        PD_LINE5.material.needsUpdate = true;

    }

}

var colorHcPre, colorHcPnt, colorHcPaka, colorHcRunout, colorHcBalancer, colorHcTp;
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

    } else if (colorHcPre === 'manual') {
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

    } else if (colorHcBalancer === 'manual') {
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

    } else if (colorHcPaka === 'manual') {
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

    } else if (colorHcPnt === 'manual') {
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

    } else if (colorHcRunout === 'manual') {
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

    } else if (colorHcTp === 'manual') {
        HC_LINE6.material.color = new THREE.Color(color["blue"]);
        HC_LINE6.material.needsUpdate = true;

    }

}

//============================= HA Color Change locate==============================================
var colorHaPre, colorHaPnt, colorHaPaka, colorHaRunout, colorHaBalancer;

function changeColorHA_LINE() {


    if (colorHaPre === 'auto') {
        HA_LINE.material.color = new THREE.Color(color["green"]);
        HA_LINE.material.needsUpdate = true;

    } else if (colorHaPre === 'wait') {
        HA_LINE.material.color = new THREE.Color(color["yellow"]);
        HA_LINE.material.needsUpdate = true;

    }
    else if (colorHaPre === 'stop') {
        HA_LINE.material.color = new THREE.Color(color["red"]);
        HA_LINE.material.needsUpdate = true;

    } else if (colorHaPre === 'offline') {
        HA_LINE.material.color = new THREE.Color(color["gray"]);
        HA_LINE.material.needsUpdate = true;

    } else if (colorHaPre === 'manual') {
        HA_LINE.material.color = new THREE.Color(color["blue"]);
        HA_LINE.material.needsUpdate = true;

    }

    if (colorHaBalancer === 'auto') {
        HA_LINE2.material.color = new THREE.Color(color["green"]);
        HA_LINE2.material.needsUpdate = true;

    } else if (colorHaBalancer === 'wait') {
        HA_LINE2.material.color = new THREE.Color(color["yellow"]);
        HA_LINE2.material.needsUpdate = true;

    }
    else if (colorHaBalancer === 'stop') {
        HA_LINE2.material.color = new THREE.Color(color["red"]);
        HA_LINE2.material.needsUpdate = true;

    } else if (colorHaBalancer === 'offline') {
        HA_LINE2.material.color = new THREE.Color(color["gray"]);
        HA_LINE2.material.needsUpdate = true;

    } else if (colorHaBalancer === 'manual') {
        HA_LINE2.material.color = new THREE.Color(color["blue"]);
        HA_LINE2.material.needsUpdate = true;

    }

    if (colorHaPaka === 'auto') {
        HA_LINE3.material.color = new THREE.Color(color["green"]);
        HA_LINE3.material.needsUpdate = true;

    } else if (colorHaPaka === 'wait') {
        HA_LINE3.material.color = new THREE.Color(color["yellow"]);
        HA_LINE3.material.needsUpdate = true;

    }
    else if (colorHaPaka === 'stop') {
        HA_LINE3.material.color = new THREE.Color(color["red"]);
        HA_LINE3.material.needsUpdate = true;

    } else if (colorHaPaka === 'offline') {
        HA_LINE3.material.color = new THREE.Color(color["gray"]);
        HA_LINE3.material.needsUpdate = true;

    } else if (colorHaPaka === 'manual') {
        HA_LINE3.material.color = new THREE.Color(color["blue"]);
        HA_LINE3.material.needsUpdate = true;

    }


    if (colorHaPnt === 'auto') {
        HA_LINE4.material.color = new THREE.Color(color["green"]);
        HA_LINE4.material.needsUpdate = true;

    } else if (colorHaPnt === 'wait') {
        HA_LINE4.material.color = new THREE.Color(color["yellow"]);
        HA_LINE4.material.needsUpdate = true;

    }
    else if (colorHaPnt === 'stop') {
        HA_LINE4.material.color = new THREE.Color(color["red"]);
        HA_LINE4.material.needsUpdate = true;

    } else if (colorHaPnt === 'offline') {
        HA_LINE4.material.color = new THREE.Color(color["gray"]);
        HA_LINE4.material.needsUpdate = true;

    } else if (colorHaPnt === 'manual') {
        HA_LINE4.material.color = new THREE.Color(color["blue"]);
        HA_LINE4.material.needsUpdate = true;

    }

    if (colorHaRunout === 'auto') {
        HA_LINE5.material.color = new THREE.Color(color["green"]);
        HA_LINE5.material.needsUpdate = true;

    } else if (colorHaRunout === 'wait') {
        HA_LINE5.material.color = new THREE.Color(color["yellow"]);
        HA_LINE5.material.needsUpdate = true;

    }
    else if (colorHaRunout === 'stop') {
        HA_LINE5.material.color = new THREE.Color(color["red"]);
        HA_LINE5.material.needsUpdate = true;

    } else if (colorHaRunout === 'offline') {
        HA_LINE5.material.color = new THREE.Color(color["gray"]);
        HA_LINE5.material.needsUpdate = true;

    } else if (colorHaRunout === 'manual') {
        HA_LINE5.material.color = new THREE.Color(color["blue"]);
        HA_LINE5.material.needsUpdate = true;

    }

}

//TODO ============================= HB Color Change locate==============================================
var colorHBPre, colorHBBalancer, colorHBPnt, colorHBTmarker;
var material;

//============================= HD Color Change locate==============================================
var colorHDPre, colorHDPnt, colorHDPaka, colorHDRunout, colorHDBalancer, colorHDTmarker;
var material;

function changeColorHB_LINE() {
    if (colorHBPre === 'auto') {
        HB_LINE.material.color = new THREE.Color(color["green"]);
        HB_LINE.material.needsUpdate = true;

    } else if (colorHDPre === 'wait') {
        HB_LINE.material.color = new THREE.Color(color["yellow"]);
        HB_LINE.material.needsUpdate = true;

    }
    else if (colorHBPre === 'stop') {
        HB_LINE.material.color = new THREE.Color(color["red"]);
        HB_LINE.material.needsUpdate = true;

    } else if (colorHBPre === 'offline') {
        HB_LINE.material.color = new THREE.Color(color["gray"]);
        HB_LINE.material.needsUpdate = true;

    } else if (colorHBPre === 'manual') {
        HB_LINE.material.color = new THREE.Color(color["blue"]);
        HB_LINE.material.needsUpdate = true;

    }

    if (colorHBBalancer === 'auto') {
        HB_LINE2.material.color = new THREE.Color(color["green"]);
        HB_LINE2.material.needsUpdate = true;

    } else if (colorHBBalancer === 'wait') {
        HB_LINE2.material.color = new THREE.Color(color["yellow"]);
        HB_LINE2.material.needsUpdate = true;

    }
    else if (colorHBBalancer === 'stop') {
        HB_LINE2.material.color = new THREE.Color(color["red"]);
        HB_LINE2.material.needsUpdate = true;

    } else if (colorHBBalancer === 'offline') {
        HB_LINE2.material.color = new THREE.Color(color["gray"]);
        HB_LINE2.material.needsUpdate = true;

    } else if (colorHBBalancer === 'manual') {
        HB_LINE2.material.color = new THREE.Color(color["blue"]);
        HB_LINE2.material.needsUpdate = true;

    }

    if (colorHBPnt === 'auto') {
        HB_LINE3.material.color = new THREE.Color(color["green"]);
        HB_LINE3.material.needsUpdate = true;

    } else if (colorHBPnt === 'wait') {
        HB_LINE3.material.color = new THREE.Color(color["yellow"]);
        HB_LINE3.material.needsUpdate = true;

    }
    else if (colorHBPnt === 'stop') {
        HB_LINE3.material.color = new THREE.Color(color["red"]);
        HB_LINE3.material.needsUpdate = true;

    } else if (colorHBPnt === 'offline') {
        HB_LINE3.material.color = new THREE.Color(color["gray"]);
        HB_LINE3.material.needsUpdate = true;

    } else if (colorHBPnt === 'manual') {
        HB_LINE3.material.color = new THREE.Color(color["blue"]);
        HB_LINE3.material.needsUpdate = true;

    }

    if (colorHBTmarker === 'auto') {
        HB_LINE4.material.color = new THREE.Color(color["green"]);
        HB_LINE4.material.needsUpdate = true;

    } else if (colorHBTmarker === 'wait') {
        HB_LINE4.material.color = new THREE.Color(color["yellow"]);
        HB_LINE4.material.needsUpdate = true;

    }
    else if (colorHBTmarker === 'stop') {
        HB_LINE4.material.color = new THREE.Color(color["red"]);
        HB_LINE4.material.needsUpdate = true;

    } else if (colorHBTmarker === 'offline') {
        HB_LINE4.material.color = new THREE.Color(color["gray"]);
        HB_LINE4.material.needsUpdate = true;

    } else if (colorHBTmarker === 'manual') {
        HB_LINE4.material.color = new THREE.Color(color["blue"]);
        HB_LINE4.material.needsUpdate = true;

    }
}

function changeColorHD_LINE() {

    if (colorHDPre === 'auto') {
        HD_LINE.material.color = new THREE.Color(color["green"]);
        HD_LINE.material.needsUpdate = true;

    } else if (colorHDPre === 'wait') {
        HD_LINE.material.color = new THREE.Color(color["yellow"]);
        HD_LINE.material.needsUpdate = true;

    }
    else if (colorHDPre === 'stop') {
        HD_LINE.material.color = new THREE.Color(color["red"]);
        HD_LINE.material.needsUpdate = true;

    } else if (colorHDPre === 'offline') {
        HD_LINE.material.color = new THREE.Color(color["gray"]);
        HD_LINE.material.needsUpdate = true;

    } else if (colorHDPre === 'manual') {
        HD_LINE.material.color = new THREE.Color(color["blue"]);
        HD_LINE.material.needsUpdate = true;

    }

    if (colorHDBalancer === 'auto') {
        HD_LINE2.material.color = new THREE.Color(color["green"]);
        HD_LINE2.material.needsUpdate = true;

    } else if (colorHDBalancer === 'wait') {
        HD_LINE2.material.color = new THREE.Color(color["yellow"]);
        HD_LINE2.material.needsUpdate = true;

    }
    else if (colorHDBalancer === 'stop') {
        HD_LINE2.material.color = new THREE.Color(color["red"]);
        HD_LINE2.material.needsUpdate = true;

    } else if (colorHDBalancer === 'offline') {
        HD_LINE2.material.color = new THREE.Color(color["gray"]);
        HD_LINE2.material.needsUpdate = true;

    } else if (colorHDBalancer === 'manual') {
        HD_LINE2.material.color = new THREE.Color(color["blue"]);
        HD_LINE2.material.needsUpdate = true;

    }

    if (colorHDPaka === 'auto') {
        HD_LINE3.material.color = new THREE.Color(color["green"]);
        HD_LINE3.material.needsUpdate = true;

    } else if (colorHDPaka === 'wait') {
        HD_LINE3.material.color = new THREE.Color(color["yellow"]);
        HD_LINE3.material.needsUpdate = true;

    }
    else if (colorHDPaka === 'stop') {
        HD_LINE3.material.color = new THREE.Color(color["red"]);
        HD_LINE3.material.needsUpdate = true;

    } else if (colorHDPaka === 'offline') {
        HD_LINE3.material.color = new THREE.Color(color["gray"]);
        HD_LINE3.material.needsUpdate = true;

    } else if (colorHDPaka === 'manual') {
        HD_LINE3.material.color = new THREE.Color(color["blue"]);
        HD_LINE3.material.needsUpdate = true;

    }


    if (colorHDPnt === 'auto') {
        HD_LINE4.material.color = new THREE.Color(color["green"]);
        HD_LINE4.material.needsUpdate = true;

    } else if (colorHDPnt === 'wait') {
        HD_LINE4.material.color = new THREE.Color(color["yellow"]);
        HD_LINE4.material.needsUpdate = true;

    }
    else if (colorHDPnt === 'stop') {
        HD_LINE4.material.color = new THREE.Color(color["red"]);
        HD_LINE4.material.needsUpdate = true;

    } else if (colorHDPnt === 'offline') {
        HD_LINE4.material.color = new THREE.Color(color["gray"]);
        HD_LINE4.material.needsUpdate = true;

    } else if (colorHDPnt === 'manual') {
        HD_LINE4.material.color = new THREE.Color(color["blue"]);
        HD_LINE4.material.needsUpdate = true;

    }

    if (colorHDRunout === 'auto') {
        HD_LINE5.material.color = new THREE.Color(color["green"]);
        HD_LINE5.material.needsUpdate = true;

    } else if (colorHDRunout === 'wait') {
        HD_LINE5.material.color = new THREE.Color(color["yellow"]);
        HD_LINE5.material.needsUpdate = true;

    }
    else if (colorHDRunout === 'stop') {
        HD_LINE5.material.color = new THREE.Color(color["red"]);
        HD_LINE5.material.needsUpdate = true;

    } else if (colorHDRunout === 'offline') {
        HD_LINE5.material.color = new THREE.Color(color["gray"]);
        HD_LINE5.material.needsUpdate = true;

    } else if (colorHDRunout === 'manual') {
        HD_LINE5.material.color = new THREE.Color(color["blue"]);
        HD_LINE5.material.needsUpdate = true;

    }

    if (colorHDTmarker === 'auto') {
        HD_LINE6.material.color = new THREE.Color(color["green"]);
        HD_LINE6.material.needsUpdate = true;

    } else if (colorHDTmarker === 'wait') {
        HD_LINE6.material.color = new THREE.Color(color["yellow"]);
        HD_LINE6.material.needsUpdate = true;

    }
    else if (colorHDTmarker === 'stop') {
        HD_LINE6.material.color = new THREE.Color(color["red"]);
        HD_LINE6.material.needsUpdate = true;

    } else if (colorHDTmarker === 'offline') {
        HD_LINE6.material.color = new THREE.Color(color["gray"]);
        HD_LINE6.material.needsUpdate = true;

    } else if (colorHDTmarker === 'manual') {
        HD_LINE6.material.color = new THREE.Color(color["blue"]);
        HD_LINE6.material.needsUpdate = true;

    }

}

//============================= IB Color Change locate==============================================
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

    } else if (colorIbPre1 === 'manual') {
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

    } else if (colorIbPre2 === 'manual') {
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

    } else if (colorIbPre3 === 'manual') {
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

    } else if (colorIbPnt === 'manual') {
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

    } else if (colorIbBalancer === 'manual') {
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

    } else if (colorIbRunout === 'manual') {
        IB_LINE6.material.color = new THREE.Color(color["blue"]);
        IB_LINE6.material.needsUpdate = true;

    }


}