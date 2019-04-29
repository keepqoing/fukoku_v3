function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;

    if ( el.classList.contains(className) ) {
        return el;
    } else {
        while ( el = el.parentNode ) {
            if ( el.classList && el.classList.contains(className) ) {
                return el;
            }
        }
    }
    return false;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//
// C O R E    F U N C T I O N S
//
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Variables.
 */
var contextMenuItemClassName = "context-menu-ddwv__item";
var contextMenuLinkClassName = "context-menu-ddwv__link";
var contextMenuActive = "context-menu-ddwv--active";

var taskItemInContext;

var clickCoords;
var clickCoordsX;
var clickCoordsY;

var menu = null;
var menuItems = [];
var menuState = 0;
var menuWidth;
var menuHeight;
var menuPosition;
var menuPositionX;
var menuPositionY;

var windowWidth;
var windowHeight;

/**
 * Initialise our application's code.
 * Initialise our application's code.
 */
$(document).ready(function(){
    menu = document.querySelector("#context-menu-ddwv");
    menuItems = menu.querySelectorAll(".context-menu-ddwv__item");
    clickListener();
    keyupListener();
    resizeListener();
});

/**
 * Listens for contextmenu events.
 */
function boxContextMenuWasCalled(pageX, pageY, fullBarLabels){
    toggleMenuOn();
    positionMenu(pageX, pageY);
    console.log(fullBarLabels);
    let line = fullBarLabels.graph.lineLabel;
    let machine = fullBarLabels.graph.machineLabel;
    let state = fullBarLabels.graph.stateLabel;
    if (fullBarLabels.graph.xAxis == '라인' || fullBarLabels.graph.yAxis == '라인'){
        line = fullBarLabels.info['라인'];
    };
    if (fullBarLabels.graph.xAxis == '설비' || fullBarLabels.graph.yAxis == '설비'){
        machine = fullBarLabels.info['설비'];
    };

    $("ul.context-menu-ddwv__items").attr("data-item",encodeURIComponent(JSON.stringify({
        line: line,
        machine: machine,
        state: state
    })));
}

/**
 * Listens for click events.
 */
function clickListener() {
    document.addEventListener( "click", function(e) {
        var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

        if ( clickeElIsLink ) {
            e.preventDefault();
            menuItemListener( clickeElIsLink );
        } else {
            var button = e.which || e.button;
            if ( button === 1 ) {
                toggleMenuOff();
            }
        }
    });
}

/**
 * Listens for keyup events.
 */
function keyupListener() {
    window.onkeyup = function(e) {
        if ( e.keyCode === 27 ) {
            toggleMenuOff();
        }
    }
}

/**
 * Window resize event listener
 */
function resizeListener() {
    window.onresize = function(e) {
        toggleMenuOff();
    };
}

/**
 * Turns the custom context menu on.
 */
function toggleMenuOn() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menu.classList.add( contextMenuActive );
    }
}

/**
 * Turns the custom context menu off.
 */
function toggleMenuOff() {
    if ( menuState !== 0 ) {
        menuState = 0;
        menu.classList.remove( contextMenuActive );
    }
}

/**
 * Positions the menu properly.
 *
 * @param {Object} e The event
 */
function positionMenu(clickCoordsX, clickCoordsY) {
    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }
}

/**
 * Dummy action function that logs an action when a menu item link is clicked
 *
 * @param {HTMLElement} link The link that was clicked
 */
function menuItemListener( link ) {
    console.log( link.getAttribute("data-action"));
    toggleMenuOff();
}
