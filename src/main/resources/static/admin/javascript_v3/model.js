$(function () {
    var lineArr = []; // for Line
    var productArr = []; // for product
    var processArr = []; // for process
    var machineArr = []; // for machine

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

// ============== Server Side ============================================

    //TODO: SERVER SIDE REQUEST
    // Get factory name
    // Get all Factory name from new database
    // =========================== Factories ======================================
    lines.getAllFactories = function () {
        $.ajax({
            url: "/v3/api/fukoku/factory",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        var sel = document.getElementById("selFactory");
                        var option = document.createElement("option");
                        option.value = "0"; // store Process name
                        option.text = "공장"; // show Process name
                        sel.appendChild(option);

                        for(i = 0; i < response.data.length; i++){
                            var option = document.createElement("option");
                            option.value = response.data[i].id; // store factory id
                            option.text = response.data[i].name; // show factory name
                            sel.appendChild(option);
                        }
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // First load, call this function
    lines.getAllFactories();

    // Get all line name from new database by Factory ID
    // =========================== LINE ======================================
    lines.getAllLinesByFactory = function (fid) {
        $.ajax({
            url: "/v3/api/fukoku/line/factory/" +  fid,
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        lineArr = [];
                        for(i = 0; i < response.data.length; i++){
                            var arr = [response.data[i].id, response.data[i].name];
                            lineArr.push(arr);
                        }
                        lines.createLineCheckBox();
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };


    // When the factory select box is changed, so we need to query the lines
    $(document).on('change','select.selFactory',function(){
        console.log($("#"+this.id + " option:selected").text());
        lines.getAllLinesByFactory($("#"+this.id + " option:selected").val());
    });

    // Create check box based on the data from database
    lines.createLineCheckBox = function(){
        var divLine = document.getElementById("lineCheckboxes");
        divLine.innerHTML = "";

        for(i=0; i< lineArr.length; i++){
            divLine.appendChild(lines.createCheckBox(lineArr[i][0], lineArr[i][1]));
        }
    }

    lines.createCheckBox = function(lineId, lineName){
        var label = document.createElement("label");
        label.setAttribute("class", "line-label");
        label.innerText = lineName;

        var option = document.createElement("input");
        option.setAttribute("class", "select_line");
        option.setAttribute("name", "m_option");
        option.setAttribute("type", "checkbox");
        option.setAttribute("value", lineName );

        label.appendChild(option);

        return label;
    }


    // ============= Product ===================================
    lines.getAllProducts = function () {
        $.ajax({
            url: "/v3/api/fukoku/product",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        for(i = 0; i < response.data.length; i++){
                            var arr = [response.data[i].id, response.data[i].name];
                            productArr[i] = arr;
                        }
                        product_Array = productArr;
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // call this function to get all products
    lines.getAllProducts();

    // ================== Process ======================================
    // Get All Processes
    lines.getAllProcesses = function () {
        $.ajax({
            url: "/v3/api/fukoku/process",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        for(i = 0; i < response.data.length; i++){
                            var arr = [response.data[i].id, response.data[i].name];
                            processArr[i] = arr;
                        }
                        process_Array = processArr;
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // call to get all the process --- MUST CHECK AGAIN
    lines.getAllProcesses();

    // ================== Machine ======================================
    // Get All Machines
    lines.getAllMachines = function (process_name, selObject) {
        $.ajax({
            url: "/v3/api/fukoku/machine/by_process/" + process_name,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        for(i = 0; i < response.data.length; i++){
                            machineArr[i] = [response.data[i].id, response.data[i].name];
                        }
                        machine_Array = machineArr;

                        var sel = document.getElementById((selObject.id).replace("Process","Machine"));
                        $("#"+(selObject.id).replace("Process","Machine")).find("option").remove();
                        for (i = 0; i < machine_Array.length; i++) {
                            // console.log("Machine Array [" + i + "] = " + machine_Array[i]);
                            var option = document.createElement("option");
                            option.value = machine_Array[i][1]; // store machine ID
                            option.text = machine_Array[i][1]; // machine name
                            sel.appendChild(option);
                        }
                    }
                } else{
                    $("#"+(selObject.id).replace("Process","Machine")).find("option").remove();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    // This function is called when the selectbox of process has been changed --- MUCH CHECK AGAIN
    lines.processChange = function(selObj){
        lines.getAllMachines($("#"+selObj.id + " option:selected").text(), selObj);
    }

    /// insert all the process model to DATABASE
    lines.insertData = function () {
        console.log("DATAs==> ",datas);
        $.ajax({
            url: "/v3/api/fukoku/process_model",
            type: 'POST',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data : JSON.stringify(datas),
            success: function (response) {}
        });
    };


    // This function reads all the process model from the database
    lines.getProcessModelData = function () {
        $.ajax({
            url: "/v3/api/fukoku/process_model",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if(response.code == 200){
                    if(response.data.length > 0){
                        loadDataToTable(response.data);
                    }
                } else{
                    console.log("Data cannot be read");
                }
            },
            error: function(data, status, err){
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
}); // END Ajax block
// =============== END Server Side ======================================

// 1 - Variable to store counting LineButton is clicked
var _countClickLineIB = 0;
var _countClickLineHA = 0;
var _countClickLineHB = 0;
var _countClickLineHC = 0;
var _countClickLineHD = 0;
var _countClickLinePD = 0;

// ========== 0. Helping Functions ====================================================================
// Checkbox for filtering lines
function checkAllLines(ele) {
    var checkboxes = document.getElementsByTagName('input');
    if (ele.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            // console.log("Class name = " + checkboxes[i].className);
            if ((checkboxes[i].type == 'checkbox') && (checkboxes[i].className == 'select_line')){
                checkboxes[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            if ((checkboxes[i].type == 'checkbox') && (checkboxes[i].className == 'select_line')) {
                checkboxes[i].checked = false;
            }
        }
    }
}

// Get values from the checkboxes which are checked
function getCheckBoxValues(){
    m_option = "";
    checkPaginationMain = true;
    $.each($("input[name='m_option']:checked"), function(){
        m_option += $(this).val()+",";
    });
    if(m_option == ""){
        m_option = "0"; // ALL
    }else{
        m_option = m_option.slice(0,-1);
    }

    if(m_option=="0"){
        swal({
                title: "라인을 선택하십시오!",
                // text: "공정단계" + newStage + " 있었어요!",
                type: "error",
                closeOnConfirm: true,
                animation: "slide-from-top",
                confirmButtonText: '네, 알겠어요',
                confirmButtonColor: "#00a65a"
            },
            function(){
                var theader = document.getElementById("tableHeader");
                theader.innerHTML = "";

                var tbody = document.getElementById("processTable");
                tbody.innerHTML = "";

                return;
            });
    }else {
        createLine(m_option);
    }
}

// When the search line button is clicked
$("#btnSearchLine").click(function () {
    getCheckBoxValues();
    resetCountClick();
});

// This function is used to reset all countClick
function resetCountClick(){
    _countClickLineIB = 0;
    _countClickLineHA = 0;
    _countClickLineHB = 0;
    _countClickLineHC = 0;
    _countClickLineHD = 0;
    _countClickLinePD = 0;
}

// function up count click
function upCountClick(lineName){
    if(lineName == "IB") {
        _countClickLineIB += 1;
        return _countClickLineIB;
    }
    else if(lineName == "HA") {
        _countClickLineHA += 1;
        return _countClickLineHA;
    }
    else if(lineName == "HB") {
        _countClickLineHB += 1;
        return _countClickLineHB;
    }
    else if(lineName == "HC") {
        _countClickLineHC += 1;
        return _countClickLineHC;
    }
    else if(lineName == "HD") {
        _countClickLineHD += 1;
        return _countClickLineHD;
    }
    else if(lineName == "PD") {
        _countClickLinePD += 1;
        return _countClickLinePD;
    }
}
// ========= End 0.- Helping Functions ================================================

// === Step 1 - create Line
function createLine(arrLine){
    var index = arrLine.indexOf("0");
    if (index !== -1)
        arrLine = arrLine.slice(0, -2);

    var theader = document.getElementById("tableHeader");
    theader.innerHTML = "";
    var th = document.createElement("th");
    th.innerText = "라인";
    theader.appendChild(th);

    var tbody = document.getElementById("processTable");
    tbody.innerHTML = "";
    arrLine = arrLine.split(",");
    for(i=0; i < arrLine.length; i++){
        var tr = document.createElement("tr");
        tr.id = "tr" + arrLine[i] + "_1";
        tr.className = "tr" + arrLine[i];
        var td = document.createElement("td");
        td.id = "td" + arrLine[i];
        td.className = "td" + arrLine[i];
        td.setAttribute("rowspan","1");

        var span = document.createElement("span");
        span.setAttribute("id", "span" + arrLine[i]);
        span.setAttribute("class", "span" + "LineName" );
        span.innerText = arrLine[i];

        td.appendChild(span);
        var _br = document.createElement("br");
        td.appendChild(_br);
        var btn = createLineButton(arrLine[i]);

        td.appendChild(btn);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

// Create line button after clicking on 검색​ button
function createLineButton(lineName){
    var btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("class","btn btn-primary");
    btn.innerText = "제품추가" + "\n" + "(체인)";
    btn.setAttribute("id","btnLine_" + lineName);
    btn.setAttribute("onclick","addNewProduct('"+lineName+"')");
    return btn;
}

//========== Step 2 - Create Adding Product Button
function addNewProduct(lineName){
    var countClick = upCountClick(lineName);

    // Create a new Column Header
    if(!isExisted("productHeader")){
        var theader = document.getElementById("tableHeader");
        var th = document.createElement("th");
        th.innerText = "제품";
        th.id = "productHeader";
        theader.appendChild(th);
    }

    if(countClick > 1){
        // var cell = addProductFamily();
        var row = addRowAfter("tr"+lineName + "_" + (countClick-1), lineName, (countClick-1));
        row.insertCell(0);
        // console.log("row ======= " + row.id);

        var cell = row.cells[0];
        var td = createProductTd(lineName, countClick);
        td.setAttribute("style","border:none;");
        // cell.appendChild(td); -- We don't need to add sub TD to current TD
        cell.innerHTML = td.innerHTML; // we can overwrite the content of the new TD to current TD
        // cell.className = "tdProduct" + lineName;
        cell.className = "tdProduct" ;
        cell.setAttribute("data-id",lineName);
        cell.id = "tdProduct" + lineName + "_" + countClick;
        var rowspan = parseInt($('#td'+lineName).attr('rowSpan'));
        $('#td'+lineName).attr('rowSpan', (rowspan + 1));

    }else {
        var td = createProductTd(lineName, countClick);
        // td.className = "tdProduct" + lineName;
        td.className = "tdProduct";
        td.setAttribute("data-id",lineName);

        var tr = document.getElementById("tr" + lineName + "_"+ countClick);
        tr.appendChild(td);
    }
}

// This function is used to create td for one product
function createProductTd(lineName, countClick){
    // Create a new row
    var td = document.createElement("td");
    td.className = "tdProduct" + lineName;
    td.id = "tdProduct" + lineName + "_" + countClick;
    var _br = document.createElement("br");
    _br.setAttribute("style","clear:both");
    // call selectBox Function
    var sel = createProductList(lineName, countClick);

    // call product radio buttons
    var rdoName = "radio" + lineName + "_" + countClick;
    // active button
    var rdoActive = createProductRadioButton(rdoName, "1");
    // non active button
    var rdoNonActive = createProductRadioButton(rdoName, "0");

    // call product button function
    var btnClassName = "btnProduct" + lineName;
    var btnId = "btnProduct" + lineName + "_" + countClick;
    // var btnProduct = createProductButton(btnClassName, btnId);

    var btnProduct = createProductButton(btnClassName, btnId, lineName, countClick);

    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','btnMinusProduct' + lineName + "_" + countClick);
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left; margin-right:5px;');
    buttMinus.setAttribute("onclick","removeRow('" + lineName + "', " + countClick + ", this)");

    // Merge all controls to td
    td.appendChild(buttMinus);
    td.appendChild(sel); // selectBox
    td.appendChild(btnProduct);
    td.appendChild(_br);
    td.appendChild(rdoActive); // active radio button
    td.appendChild(rdoNonActive); // non active radio button

    return td;
}


function addRowAfter(rowId, lineName, countClick){
    // console.log("rowId = " + rowId);
    var refElement = document.getElementById(rowId);

    var newRow= document.createElement('tr');
    newRow.id = "tr" + lineName + "_" + (countClick + 1);
    newRow.className = "tr" + lineName;

    // refElement.parentNode.insertBefore(newRow, refElement.nextSibling );
    // //$("<td/>").insertBefore($("#btnMinusProductHC_1").parent().parent().next().children().first());
    if(refElement == null){
        console.log("null neng");
        console.log("last id = " + $(".tr"+lineName).last().attr("id"));
        var refEle = document.getElementById($(".tr"+lineName).last().attr("id"));


        refEle.parentNode.insertBefore(newRow, refEle.nextSibling);
    }else {
        refElement.parentNode.insertBefore(newRow, refElement.nextSibling);
    }
    return newRow;
}

// This function is used to know whether the html element is existed
function isExisted(id){
    var item = document.getElementById(id);
    if(item){
        return true;
    }else{
        return false;
    }
}


// This function is for creating product list with dropdown
function createProductList(lineName, countClick){
    // select box
    var sel = document.createElement('select');
    sel.setAttribute('style','margin-bottom:5px; margin-right:5px; width:150px;height:34px; float:left;');
    sel.id = "selProduct" + lineName + "_" + countClick; // selProductIB_1
    sel.className = "selProduct"; // className = selProduct. This will be useful when we insert into DB

    // array to store value
    // var array = ["CM5E", "DS7E", "GAMMA", "H4MK", "JX6E", "SEG-3PK", "SP", "T/SHARK", "THETA/GDI", "THETA-??(VVL)", "THETA-GDI(YF)", "THETA-HEV", "THETA-개선(VVL)", "TIGER SHARK", "Unknown", "X100"];
    // option of select box
    //Create and append the options
    for (var i = 0; i < product_Array.length; i++) {
        var option = document.createElement("option");
        // option.value = product_Array[i][0];
        option.value = product_Array[i][1];
        option.text = product_Array[i][1];
        sel.appendChild(option);
    }
    return sel;
}

// This function is for creating radio button in product cell
function createProductRadioButton(rdoName,  rdoValue){
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = rdoName;
    // radio.checked = (rdoValue == "1")?  true:false;
    if(rdoValue == "1"){
        radio.setAttribute("checked","checked");
    }
    radio.value = rdoValue;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(rdoValue == "1"?"Active":"Non Active"));
    label.setAttribute("style","float:left; margin-left: 5px; margin-right: 5px;")
    return label;
}

// This function is for creating button in product cell to add process step
function createProductButton(btnClassName, btnId, lineName, countClick){
    var btnName = "공정 단계 추가";
    var butt = document.createElement('input'); // create a button
    butt.setAttribute('type','button'); // set attributes ...
    butt.setAttribute('id',btnId);
    butt.setAttribute('class',"btn btn-primary "+btnClassName);
    butt.setAttribute('value',btnName);
    butt.setAttribute('onclick', "createStepForProduct('" + lineName + "',"+ countClick + ", this)");
    return butt;
}

// function to store the arrayLineName
function createLineGlobalArray(arrayName, countClick, inputValue){
    if(!isExisted("lineArray" + arrayName + "_" + countClick)){
        var txtBox = document.createElement("input");
        txtBox.setAttribute("id", "lineArray" + arrayName + "_" + countClick);
        txtBox.value = inputValue;
        txtBox.setAttribute("style", "display:none");
        document.body.appendChild(txtBox);
    }
}

// == Step 4 -- Create Step of each product
function createStepForProduct(lineName, rowNum, btnObject){
    var txtValue = "";
    swal({
            title: "공정단계",
            // text: "공정이름이 뭐예요?",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "공정단계 (보기: 1)",
            confirmButtonText: '저장',
            confirmButtonColor: "#00a65a",
            cancelButtonText: "취소"
        },
        function(inputValue){
            if (inputValue === false || inputValue === "" ) {
                swal.showInputError("텍스트를 입력하십시오!");
                return false
            }else {
                // swal("Nice!", "You wrote: " + inputValue, "success");
                txtValue = inputValue;
                createLineGlobalArray(lineName, rowNum, inputValue);

                createStepAfterMainProcess(lineName, rowNum, txtValue, btnObject);
                return true;
            }
        });
}
// This function is used to create step after entering the main process title
function createStepAfterMainProcess(lineName, rowNum, txtValue, btnObject) {

    // Get the row Id which the user wants to move the TD
    var rowID = $(btnObject).parent().parent().attr("id");

    // check the desired TD is available or not.
    var newTd = $("#" + rowID + " > " + "td[data-id='" + txtValue + "']" )[0];
    if(newTd != undefined && newTd.innerHTML != ""){
       displayDialog(txtValue, "있었어요!" );
       return;
    }

    // create a textbox to store step value for each line and each product
    if (isExisted("txtStep" + lineName + "_" + rowNum)) {
        var txt = document.getElementById("txtStep" + lineName + "_" + rowNum);
        txt.value = parseInt(txt.value) + 1;
        // console.log("Txt value of " + txt.id + "= " + txt.value);
    } else {
        var txt = document.createElement("input");
        txt.value = 1;
        txt.id = "txtStep" + lineName + "_" + rowNum;
        txt.setAttribute("style", "display:none;");
        document.body.appendChild(txt);
        // console.log("Txt value of " + txt.id + "= " + txt.value);
    }

    var txt = document.getElementById("txtStep" + lineName + "_" + rowNum);
    // Create a new Column Header for Each Step

    for (let i = 1; i <= txtValue; i++) {
        if (!isExisted("headerStep_" + i)){
            var theader = document.getElementById("tableHeader");
            var th = document.createElement("th");
            th.innerText = "공정단계" + i;
            th.id = "headerStep_" + i;
            th.setAttribute("data-id", i);

            var btn = buttonDeleteStepHeader(lineName, th.getAttribute("data-id"));
            th.appendChild(btn);
            theader.appendChild(th);
        }
    }
    // Row
    // var row = document.getElementById("tr" + lineName + "_" + rowNum);
    var row = $(btnObject).parent().parent()[0];

    var size = parseInt(document.getElementById("lineArray" + lineName + "_" + rowNum).value);

    let i = 0;
    let rId = row.id.split("_");

    var nextTd = $(btnObject).parent().closest("td").next();

    for(i; i < txtValue; i++) {
        // check if the next td is empty. If so, create blank td for it
        if(nextTd[0] == undefined) {
            var blank_td = document.createElement("td");
            blank_td.setAttribute("data-id",(i+1));
            blank_td.setAttribute("class","mainProcess");
            row.appendChild(blank_td);
        }

        // move to next td by assigning the next td
        nextTd = nextTd.next();
    }

    // reset the next element of current button because last time the next elements are null
    var nextTd = $(btnObject).parent().closest("td").next();
    // reset i = 1 in order to compare if the user want to insert into which column
    // we need to use loop again because it is not working when we use only one loop. I have no idea.
    i = 1;
    for(i; i <= txtValue; i++) {

        if (i == txtValue) {
            // console.log("i = " + i);

            var divColor = document.createElement("div");
            divColor.setAttribute("style", "background-color: #B7C9EF; padding: 3px;");

            // Plus button
            // var buttPlus = mainPlusButton(lineName, rowNum, txt);
            var buttPlus = mainPlusButton(lineName, rowNum, txtValue);

            // Move button
            var buttMove = mainMoveButton(lineName, rowNum, txtValue);

            // Minus button
            // var buttMinus = mainMinusButton(lineName, rowNum, txt);
            var buttMinus = mainMinusButton(lineName, rowNum, txtValue);

            // Select Box
            // var sel = mainStepSelectBox(lineName, rowNum, txt, txtValue);

            var txtMain = document.createElement("input");
            txtMain.type = "text";
            txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px");
            txtMain.id = "txtMainTitle" + lineName + "_" + rowNum + "_s_" + txtValue; // spanMainTitleIB_1_s_1
            txtMain.className = "txtMainTitle";
            txtMain.setAttribute("required", "required");
            txtMain.placeholder = "공정명을 입력하세요";
            txtMain.size = "15";
            // txtMain.value = txtValue;

            // Column
            var td = document.createElement("td");
            // td.id = "td" + lineName + "_" + rowNum + "_s_" + txt.value; // tdIB_1_s_1
            td.id = "td" + lineName + "_" + rowNum + "_s_" + txtValue; // tdIB_1_s_1

            divColor.appendChild(buttMinus);
            // td.appendChild(sel);
            divColor.appendChild(txtMain);
            divColor.appendChild(buttPlus);
            var _br = document.createElement("br");
            _br.setAttribute("class","clear:both");
            divColor.appendChild(_br);
            divColor.appendChild(buttMove);
            td.appendChild(divColor);
            td.setAttribute("data-id", txtValue);
            // td.setAttribute("class","mainProcess");

            //  assign the td to the td based on the stage number that the user has inputted.
            nextTd[0].innerHTML = td.innerHTML;
        }
        // move to next td by assigning the next td
        nextTd = nextTd.next();
    }
}


// function is used to delete step header
// This function is used to craete main Minus button
function buttonDeleteStepHeader(lineName, dataID){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','deleteHeader' + lineName + '_' + dataID); // mainMinusIB_1_s_1
    buttMinus.setAttribute('data-id', dataID);
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left');
    buttMinus.setAttribute('onclick', "removeStage(this)");

    return buttMinus;
}

function removeStage(btnObj){

    swal({
            title: "삭제하시겠습니까?",
            // text: "공정이름이 뭐예요?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "공정단계 (보기: 1)",
            confirmButtonText: '저장',
            confirmButtonColor: "#00a65a",
            cancelButtonText: "취소"
        },
        function(isConfirm){
            if (isConfirm ) {
                // Remove the whole column
                // $(this).attr("data-id")
                $("[data-id='" + $(btnObj).attr("data-id") + "']").remove();
                return true;
            }else {
                return false;
            }
        });
}

// == This function is used to move all element in td to the other stage after completing pop-up value
function moveTd(lineName, rowNum, stageNum, btnObj){

    var txtValue = "";

    swal({
            title: "<= 단계이동 =>",
            // text: "공정이름이 뭐예요?",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "공정단계 (보기: 1)",
            confirmButtonText: '저장',
            confirmButtonColor: "#00a65a",
            cancelButtonText: "취소"
        },
        function(inputValue){
            if (inputValue === false || inputValue === "" ) {
                swal.showInputError("텍스트를 입력하십시오!");
                return false;
            }else {
                // swal("Nice!", "You wrote: " + inputValue, "success");
                newStage = inputValue;

                startMovingTd(lineName, rowNum, stageNum , newStage, btnObj);
                return true;
            }
        });
}

// This function is used to move TD after confirmation
function startMovingTd(lineName, rowNum, currentStage, newStage, btnObj){

    // Get the row Id which the user wants to move the TD
    var rowID = $(btnObj).parent().parent().parent().attr("id");

    // Get the current TD
    var oldTd = $(btnObj).parent().parent();

    // Check the element of new TD that the user want to move to
    // $("#trHC_1 > td[data-id='1']")[0] -- Format to find the td by data-id
    var newTd = $("#" + rowID + " > " + "td[data-id='" + newStage + "']" )[0];


    if(newTd == undefined){
        displayDialog(newStage, "없었어요!" );

    }else if(newTd.innerHTML == ""){
        // console.log("Not existed");
        console.table(oldTd);
        newTd.innerHTML = oldTd.html();
        oldTd.html("");
        return true;
    }else{
        displayDialog(newStage, "있었어요!" );
    }
}

function displayDialog(newStage, txtStatus){
    setTimeout(function(){
        swal({
                title: "단계이동 안 되요!",
                text: "공정단계" + newStage + " " + txtStatus,
                type: "warning",
                closeOnConfirm: true,
                animation: "slide-from-top",
                confirmButtonText: '네 알겠어요',
                confirmButtonColor: "#00a65a"
            },
            function(isConfirm){
                if (isConfirm === true) {
                    return true;
                }else {
                    return false;
                }
            });
    }, 300);
}

// This function is used to create main plus button
function mainMoveButton(lineName, rowNum, txtNum){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.setAttribute('id','mainMove' + lineName + '_' + rowNum + '_s_' + txtNum); // mainPlusIB_1_s_1
    buttPlus.setAttribute("value", "단계이동");
    buttPlus.innerText =  "단계이동";
    buttPlus.setAttribute('class',"add-house btn btn-primary btn-xs");
    buttPlus.setAttribute('style','clear:both');
    buttPlus.setAttribute('onclick', "moveTd('" + lineName + "', " + rowNum + "," + txtNum + ", this)" );
    var spn = document.createElement('span');
    spn.setAttribute('class','glyphicon glyphicon-transfer');
    buttPlus.appendChild(spn);

    return buttPlus;
}

// This function is used to create main plus button
function mainPlusButton(lineName, rowNum, txt){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.setAttribute('id','mainPlus' + lineName + '_' + rowNum + '_s_' + txt); // mainPlusIB_1_s_1
    buttPlus.setAttribute("value", "설비추가");
    buttPlus.innerText =  "설비추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:right');
    buttPlus.setAttribute('onclick', "createSubStepItem('" + lineName + "', " + rowNum + "," + txt + ", this)" );

    return buttPlus;
}

// This function is used to craete main Minus button
function mainMinusButton(lineName, rowNum, txt){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','mainMinus' + lineName + '_' + rowNum + '_s_' + txt); // mainMinusIB_1_s_1
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left');
    buttMinus.setAttribute('onclick', "removeProcessTd('" + lineName + "', " + rowNum + ", " + txt  + ", this)");

    return buttMinus;
}

// This function is used to create main step selectbox
function mainStepSelectBox(lineName, rowNum, txt, txtValue){
    // select box
    var sel = document.createElement('select');
    sel.setAttribute("id","processTitle" + lineName + "_" + rowNum + "_s_" + txt.value); // processTitleIB_1_s_1

    var varStepLabel = "";
    var option = document.createElement("option");
    option.value = txtValue;
    option.text = txtValue;
    option.setAttribute("id","optionProcessTitle" + lineName + "_" + rowNum + "_s_" + txt.value);
    sel.appendChild(option);

    return sel;
}

// -- Step 6 - Add Sub Step of Each main step
function createSubStepItem(lineName, rowNum, tValue, btnObj){
    // create a textbox to store SUB step value for each STEP OF EACH LINE
    if(isExisted("txtSubStep" + lineName + "_" + rowNum)){  // txtSubStepIB_1
        var txt = document.getElementById("txtSubStep" + lineName + "_" + rowNum);
        txt.value = parseInt(txt.value) + 1;
        // console.log("Sub Txt value of " + txt.id + "= " + txt.value);
    }else{
        var txt = document.createElement("input");
        txt.value = 1;
        txt.id = "txtSubStep" + lineName + "_" + rowNum;
        txt.setAttribute("style","display:none;");
        document.body.appendChild(txt);
        // console.log("Sub Txt value of " + txt.id + "= " + txt.value);
    }

    // Textbox
    var textBox = createSubStepTextBox(lineName, rowNum, txt);

    // Plus button
    var buttPlus = createSubStepPlusButton(lineName, rowNum, txt);

    // Div for one sub step
    var div = createDivSubStep(lineName, rowNum, txt);

    // Select for process select box
    // var arrProcess = ["공정","1차V홈높이",	"1차V홈높이최대",	"1차V홈높이최소",	"1차드릴수",	"1차불균형량",	"1차압입하중",	"2차압입하중",	"3차압입하중"];
    var selProcess = createSelectBox(lineName, rowNum, txt, process_Array, "subProcess", "mod_select");

    // Select for process select box
    // var arrMachine = ["설비","1차압입하중-압입기 1","2차압입하중-압입기 2","3차압입하중-압입기 3"];
    var selMachine = createSelectBox(lineName, rowNum, txt, machine_Array, "subMachine", "machine_select");

    // Minus button
    var buttMinus = createSubStepMinusButton(lineName, rowNum, txt);

    div.appendChild(buttMinus);
    div.appendChild(textBox);
    div.appendChild(selProcess);
    div.appendChild(selMachine);
    div.appendChild(buttPlus);
    div.setAttribute("class","subProcess");
    // var td = document.getElementById("td" + lineName + "_" + rowNum + "_s_" + tValue);

    var td = $(btnObj).parent().parent()[0];

    // td.className = "tdProcess";
    td.appendChild(div);
}

// This function is used to create process select box
function createSelectBox(lineName, rowNum, txtID, process_Array, prefixSel, className){
    // select box for process
    var sel = document.createElement('select');
    sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:50px;height:34px;');
    sel.setAttribute('id', prefixSel + lineName + "_" + rowNum + "_s_" + txtID.value); // subProcessIB_1_s_1
    sel.setAttribute('class',className);
    sel.width = "auto";
    if(prefixSel == "subProcess") {
        sel.setAttribute('onchange', 'lines.processChange(this)');
        var option = document.createElement("option");
        option.value = 0; // store Process ID
        option.text = "공정"; // show Process name
        sel.appendChild(option);
    }else{
        var option = document.createElement("option");
        option.value = 0; // store Process ID
        option.text = "설비"; // show Process name
        sel.appendChild(option);
    }

    //Create and append the options
    for (var i = 0; i < process_Array.length; i++) {
        var option = document.createElement("option");
        option.value = process_Array[i][1]; // store Process ID
        option.text = process_Array[i][1]; // show Process name
        sel.appendChild(option);
    }
    return sel;
}

// This function is used to div element to wrap up the sub step
function createDivSubStep(lineName, rowNum, txt){
    var div = document.createElement("div");
    div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + txt.value);
    div.setAttribute("style","clear:both");
    return div;
}

// -- Creating Textbox for Sub Step Item
function createSubStepTextBox(lineName, rowNum, txtId){
    var txt = document.createElement('input'); // create a button
    txt.setAttribute('type','text'); // set attributes ...
    txt.setAttribute('id','subTextBox'+lineName+"_"+rowNum+"_s_"+txtId.value);  // subTextBoxIB_1_s_1
    txt.setAttribute("class", "txtSeq");
    txt.setAttribute('style','float:left; margin-left: 5px; margin-top:5px; width:30px; height:34px;');

    return txt;
}

// -- Creating plus button for Sub Step Item
function createSubStepPlusButton(lineName, rowNum, txtId){
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.setAttribute('id','subPlus'+lineName+"_"+rowNum+"_s_"+txtId.value);  // subPlusIB_1_s_1
    buttPlus.innerText = "연결추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:left; margin-left:5px; margin-top:5px;');
    buttPlus.setAttribute('onclick', "addLinkSubItem('"+ lineName + "', " + rowNum + ", " + txtId.value + ") " );
    //addLinkSubItem(lineName, rowNum, txtId, txtLink)
    // var spn = document.createElement('span');
    // spn.setAttribute('class','fa fa-plus');
    // buttPlus.appendChild(spn);

    return buttPlus;
}

// This function is used to create Sub Step Minus Button
function createSubStepMinusButton(lineName, rowNum, txtId){

    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','subMinus' + lineName + "_" + rowNum + "_s_" + txtId.value);  // subMinusIB_1_s_1
    buttMinus.setAttribute('class',"add-house btn btn-danger  btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left;  margin-left:5px; margin-top:5px;');
    buttMinus.setAttribute('onclick', "removeSubStepItem('" + lineName + "', " + rowNum + ", " + txtId.value + ")");

    return buttMinus;
}

// This function is used to create a link text of each sub step item
function addLinkSubItem(lineName, rowNum, txtValue){
    // create a textbox to store Link SUB step value for each Sub Step
    if(isExisted("txtLink" + lineName + "_" + rowNum + "_s_" + txtValue)){  // txtLinkIB_1_s_1
        var txt = document.getElementById("txtLink" + lineName + "_" + rowNum + "_s_" + txtValue);
        txt.value = parseInt(txt.value) + 1;
        // console.log("Link Sub Txt value of " + txt.id + "= " + txt.value);
    }else{
        var txt = document.createElement("input");
        txt.value = 1;
        txt.id = "txtLink" + lineName + "_" + rowNum + "_s_" + txtValue;
        txt.setAttribute("style","display:none;");
        document.body.appendChild(txt);
        // console.log("Link Sub Txt value of " + txt.id + "= " + txt.value);
    }

    // Link Textbox
    var linkTxt = createTextLink(lineName, rowNum, txtValue, txt.value);

    // Link Minus Button
    var linkButton = createMinusLinkButton(lineName, rowNum, txtValue, txt.value);

    // Link Div
    var div = createLinkDivSubStep(lineName, rowNum, txtValue, txt.value);
    div.appendChild(linkTxt);
    div.appendChild(linkButton);

    var outerDiv = document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue);
    outerDiv.appendChild(div);
}

// This function is used to create div for link sub step item
function createLinkDivSubStep(lineName, rowNum, txtValue, txtLink){
    var div = document.createElement("div");
    div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + txtValue + "_" + txtLink); // divIB_1_1_1
    div.setAttribute("style","clear:both;");
    return div;
}


// This function is used to create a textbok of link for each sub stem item
function createTextLink(lineName, rowNum, txtValue, txtLink){
    // text box
    var txt = document.createElement('input');
    txt.setAttribute('type','text');
    txt.setAttribute('id', 'link'  + lineName + "_" + rowNum + "_s_" + txtValue + "_" + txtLink); // linkIB_1_s_1_1
    txt.setAttribute("class","linkTxtClass");
    txt.setAttribute('style','float:right; margin-left: 5px; margin-top:5px; width:30px; height:34px;');

    return txt;
}

// This function is used to create a sub link minus button for each sub step item
function createMinusLinkButton(lineName, rowNum, txtValue, txtLink){
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','linkMinus'  + lineName + "_" + rowNum + "_s_" + txtValue + "_" + txtLink);  // linkMinusIB_1_s_1_1
    buttMinus.setAttribute('class',"add-house btn btn-danger  btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:right;  margin-left:5px; margin-top:5px;');
    buttMinus.setAttribute('onclick', "removeLinkSubStepItem('" + lineName + "', " + rowNum + ", " + txtValue + ", " + txtLink + ")");

    return buttMinus;
}

// Remove Link Sub Step Item
function removeLinkSubStepItem(lineName, rowNum, txtValue, txtLink){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue + "_" + txtLink).remove();

    }
}

// Remove Sub Step Item
function removeSubStepItem(lineName, rowNum, txtValue){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue).remove();
    }
}
// "removeProcessTd('" + lineName + "', " + rowNum + ", " + txt.value  + ")");
// Remove Main Td Item
function removeProcessTd(lineName, rowNum, txtValue, btnObj){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        // document.getElementById("td" + lineName + "_" + rowNum + "_s_" + txtValue).remove();
        var td = $(btnObj).parent().parent()[0];
        td.innerHTML = "";
    }
}

// This function is used to remove row when clicks on minusProduct
function removeRow(lineName, rowNum, btnObject){
    console.log("rowNum = " +  rowNum);

    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        var rowspan = parseInt($("#td"+lineName).attr("rowSpan"));
        // test
        var td = $('#td'+lineName);
        $('#td'+lineName).attr('rowSpan', (rowspan - 1));

        //$("<td/>").insertBefore($("#btnMinusProductHC_1").parent().parent().next().children().first());
        var btnClassName = $(btnObject).parent().parent().attr("class");
        var btnRowId = $(btnObject).parent().parent().attr("id");

        console.log("class[0] = " + $("."+btnClassName)[0].id);

        console.log("row id = " + btnRowId);

        if($("."+btnClassName)[0].id == btnRowId && rowspan != 1){
            $(td).insertBefore($("#btnMinusProduct"+lineName+"_"+rowNum).parent().parent().next().children().first());
        }

        document.getElementById("tr" + lineName + "_" + rowNum ).remove();

        checkIfNoMoreRow();
    }
}

// function checks if there is no more row left
function checkIfNoMoreRow(){
    var theader = document.getElementById("tableHeader");
    if($('#processTable tr').length == 0){
        theader.innerHTML = "";
    }
}

// ============= INSERT INTO DATABASE =========================================
$("#btnSaveAll").click(function () {
    DBInsertion();
});

//======= Start inserting to Database
// STANDARD FORMAT
var data = [{
    "ID" : 1,
    "SEQ" : 1,
    "NAME" : "PD_CM5E",
    "REF_LINE" : "PD",
    "REF_PRODUCT" : "CM5E",
    "STATUS" : "1",
    "PROCESS_CHAIN_ELEMENT" : [{
        "ID" : 1,
        "STAGE" : 1,
        "NAME" : "PROCESS_1",
        "REF_PROCESS_CHAIN_ID" : 1,
        "PROCESS_MACHINE" : [{
            "ID" : 1,
            "SEQ" : 1,
            "REF_PROCESS" : "",
            "REF_MACHINE" : "",
            "REF_PROCESS_CHAIN_ELEMENT" : 1,
            "NEXT_SEQUENCE" : ""
        }]
    }]
}];


function DBInsertion(){
    datas = [];
    $('#processTable tr').each(function(row, tr){
        var data = {};
        // data["ID"] = 1;
        data["SEQ"] = $(this).find(".tdProduct").attr("id").split("_")[1];
        data["NAME"] = $(this).find(".tdProduct").attr("data-id") + "_" + $(this).find("td .selProduct").val();
        data["REF_LINE"] = $(this).find(".tdProduct").attr("data-id");
        data["REF_PRODUCT"] = $(this).find("td .selProduct").val();

        $(':radio', $(this).find("td.tdProduct")).each(function(){
            if($(this).is(":checked")){
                data["STATUS"] = $(this).val();
            }
        });

        var PROCESS_CHAIN_ELEMENTS = [];
        $.each($(this).find("td.mainProcess"), function(keyProcess, process){
            // console.log(process);
            var PROCESS_CHAIN_ELEMENT = {
                "ID" : 0,
                "STAGE" : $(process).attr("data-id"),
                "NAME" : $(process).find(".txtMainTitle").val(),
                "REF_PROCESS_CHAIN_ID" : 0
            };
            var PROCESS_MACHINES = [];
            $.each($(process).find("div.subProcess"), function(keySubProcess, subProcess){
                var PROCESS_MACHINE = {
                    "ID" : 0,
                    "SEQ" : $(subProcess).find(".txtSeq").val(),
                    "REF_PROCESS" : $(subProcess).find(".mod_select").val(),
                    "REF_MACHINE" : $(subProcess).find(".machine_select").val(),
                    "REF_PROCESS_CHAIN_ELEMENT" : 0
                };

                var NEXT_SEQUENCES = [];
                $.each($(subProcess).find(".linkTxtClass"), function(keyLinkText, linkText){
                    NEXT_SEQUENCES.push($(linkText).val());
                });
                PROCESS_MACHINE["NEXT_SEQUENCE"] = NEXT_SEQUENCES.join(",");
                PROCESS_MACHINES.push(PROCESS_MACHINE);
            });
            PROCESS_CHAIN_ELEMENT["PROCESS_MACHINE"] = PROCESS_MACHINES;
            PROCESS_CHAIN_ELEMENTS.push(PROCESS_CHAIN_ELEMENT);
        });
        data["PROCESS_CHAIN_ELEMENT"] = PROCESS_CHAIN_ELEMENTS;
        //
        datas.push(data);
    });
    console.log(datas);
    lines.insertData();
}

$("#btnTest").click(function () {

    var theader = document.getElementById("tableHeader");
    theader.innerHTML = "";

    var tbody = document.getElementById("processTable");
    tbody.innerHTML = "";

    resetCountClick();

    lines.getProcessModelData();

});


// ============= get Data from DB ===============
function loadDataToTable(result){
    console.log(result);
    for(var i = 0; i < result.length; i++){
        createOneLine(result[i].REF_LINE);
        addNewProduct(result[i].REF_LINE);
        var subResult = result[i].PROCESS_CHAIN_ELEMENT;
        for(var j = 0; j < subResult.length; j++ ){
            createStepAfterMainProcessFromDB(result[i].REF_LINE, subResult[j].STAGE, result[i].SEQ, result[i], subResult[j]);
        }
    }
}


// 1.1 - Read Data and Create One line for once
function createOneLine(lineName){

    if(!isExisted("lineHeader")) {
        var theader = document.getElementById("tableHeader");

        var th = document.createElement("th");
        th.innerText = "라인";
        th.id = "lineHeader";
        theader.appendChild(th);
    }

    if(!isExisted("tr"+lineName+"_1")) {
        var tbody = document.getElementById("processTable");

        var tr = document.createElement("tr");

        tr.id = "tr" + lineName + "_1";
        tr.className = "tr" + lineName;
        var td = document.createElement("td");
        td.id = "td" + lineName;
        td.className = "td" + lineName;
        td.setAttribute("rowspan", "1");

        var span = document.createElement("span");
        span.setAttribute("id", "span" + lineName);
        // span.setAttribute("class", "span" + arrLine[i]);
        span.setAttribute("class", "span" + "LineName");
        span.innerText = lineName;

        td.appendChild(span);
        var _br = document.createElement("br");
        td.appendChild(_br);
        var btn = createLineButton(lineName);

        td.appendChild(btn);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function createStepAfterMainProcessFromDB(lineName, stage, rowNum, result, subResult) {

    if (!isExisted("headerStep_" + stage)) {
        var theader = document.getElementById("tableHeader");
        var th = document.createElement("th");
        th.innerText = "공정단계" + stage;
        th.id = "headerStep_" + stage;
        th.setAttribute("data-id", stage);

        var btn = buttonDeleteStepHeader(lineName, th.getAttribute("data-id"));
        th.appendChild(btn);
        theader.appendChild(th);
    }

    // Row
    var row = document.getElementById("tr" + lineName + "_" + rowNum);

    // if no sub step or blank
    if(subResult.NAME == null) {
        var blank_td = document.createElement("td");
        blank_td.setAttribute("data-id", (stage));
        blank_td.setAttribute("class", "mainProcess");

        row.appendChild(blank_td);
    } else{
        var divColor = document.createElement("div");
        divColor.setAttribute("style", "background-color: #B7C9EF; padding: 3px;");

        // Plus button
        // var buttPlus = mainPlusButton(lineName, rowNum, txt);
        var buttPlus = mainPlusButton(lineName, rowNum, stage); // mainPlusIB_1_s_1

        // Move button
        var buttMove = mainMoveButton(lineName, rowNum, stage);

        // Minus button
        // var buttMinus = mainMinusButton(lineName, rowNum, txt);
        var buttMinus = mainMinusButton(lineName, rowNum, stage);

        // Select Box
        // var sel = mainStepSelectBox(lineName, rowNum, txt, txtValue);

        var txtMain = document.createElement("input");
        txtMain.type = "text";
        txtMain.value = subResult.NAME;
        txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px");
        txtMain.id = "txtMainTitle" + lineName + "_" + rowNum + "_s_" + stage; // spanMainTitleIB_1_s_1
        txtMain.className = "txtMainTitle";
        txtMain.placeholder = "공정명을 입력하세요";
        txtMain.size = "15";

        // Column
        var td = document.createElement("td");
        // td.id = "td" + lineName + "_" + rowNum + "_s_" + txt.value; // tdIB_1_s_1
        td.id = "td" + lineName + "_" + rowNum + "_s_" + stage; // tdIB_1_s_1

        divColor.appendChild(buttMinus);
        // td.appendChild(sel);
        divColor.appendChild(txtMain);
        divColor.appendChild(buttPlus);
        var _br = document.createElement("br");
        _br.setAttribute("class","clear:both");
        divColor.appendChild(_br);
        divColor.appendChild(buttMove);
        td.appendChild(divColor);
        td.setAttribute("data-id", stage);
        // td.setAttribute("class","mainProcess");

        row.appendChild(td);
        if(subResult.PROCESS_MACHINE != null) {
            createSubStepItemFromDB(lineName, rowNum, stage, td, subResult);
        }
    }
}

// -- Step 6 - Add Sub Step of Each main step
function createSubStepItemFromDB(lineName, rowNum, stage, td, subResult){

    for(var i=0; i < subResult.PROCESS_MACHINE.length; i++) {
        var pmResult = subResult.PROCESS_MACHINE[i];
        // Textbox
        var textBox = createSubStepTextBoxFromDB(lineName, stage, i + 1, pmResult.SEQ); // subTextBoxIB_1_s_1

        // Plus button
        var buttPlus = createSubStepPlusButtonFromDB(lineName, rowNum, i + 1);

        // Div for one sub step
        var div = createDivSubStepFromDB(lineName, rowNum, i + 1);

        // Select for process select box
        // var arrProcess = ["공정","1차V홈높이",	"1차V홈높이최대",	"1차V홈높이최소",	"1차드릴수",	"1차불균형량",	"1차압입하중",	"2차압입하중",	"3차압입하중"];
        var selProcess = createSelectBoxFromDB(lineName, stage, i + 1, process_Array, "subProcess", "mod_select", pmResult.REF_PROCESS);

        // Select for process select box
        // var arrMachine = ["설비","1차압입하중-압입기 1","2차압입하중-압입기 2","3차압입하중-압입기 3"];

        var selMachine = createSelectBoxFromDB(lineName, stage, i + 1, machine_Array, "subMachine", "machine_select", pmResult.REF_MACHINE);

        // Minus button
        var buttMinus = createSubStepMinusButtonFromDB(lineName, rowNum, i + 1);

        div.appendChild(buttMinus);
        div.appendChild(textBox);
        div.appendChild(selProcess);
        div.appendChild(selMachine);
        div.appendChild(buttPlus);
        div.setAttribute("class", "subProcess");
        // var td = document.getElementById("td" + lineName + "_" + rowNum + "_s_" + tValue);

        // var td = $(btnObj).parent().parent()[0];

        // td.className = "tdProcess";
        td.appendChild(div);

        // link div
        var nextSeq = pmResult.NEXT_SEQUENCE;
        if(nextSeq != null) {
            var linkArr = nextSeq.split(",");
            for (var k = 0; k < linkArr.length; k++) {
                addLinkSubItemFromDB(lineName,  rowNum , k + 1, linkArr[k]);
            }
        }
    }
}

// -- Creating Textbox for Sub Step Item
function createSubStepTextBoxFromDB(lineName, rowNum, stage, txtValue){
    var txt = document.createElement('input'); // create a button
    txt.setAttribute('type','text'); // set attributes ...
    txt.setAttribute('id','subTextBox'+lineName+"_"+rowNum+"_s_"+stage);  // subTextBoxIB_1_s_1
    txt.setAttribute("class", "txtSeq");
    txt.setAttribute('style','float:left; margin-left: 5px; margin-top:5px; width:30px; height:34px;');
    txt.value = txtValue;
    return txt;
}

// -- Creating plus button for Sub Step Item
function createSubStepPlusButtonFromDB(lineName, rowNum, stage){
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.setAttribute('id','subPlus'+lineName+"_"+rowNum+"_s_"+stage);  // subPlusIB_1_s_1
    buttPlus.innerText = "연결추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:left; margin-left:5px; margin-top:5px;');
    buttPlus.setAttribute('onclick', "addLinkSubItem('"+ lineName + "', " + rowNum + ", " + stage + ") " );

    return buttPlus;
}

// This function is used to div element to wrap up the sub step
function createDivSubStepFromDB(lineName, rowNum, stage){
    var div = document.createElement("div");
    div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + stage);
    div.setAttribute("style","clear:both");
    return div;
}


// This function is used to create process select box
function createSelectBoxFromDB(lineName, rowNum, stage, process_Array, prefixSel, className, selectedID){
    // select box for process
    var sel = document.createElement('select');
    sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:50px;height:34px;');
    sel.setAttribute('id', prefixSel + lineName + "_" + rowNum + "_s_" + stage); // subProcessIB_1_s_1
    sel.setAttribute('class',className);

    sel.width = "auto";
    if(prefixSel == "subProcess") {
        sel.setAttribute('onchange', 'lines.processChange(this)');
    }else{
        var option = document.createElement("option");
        option.value = selectedID; // store Process name
        option.text = selectedID; // show Process name

        if( option.value == selectedID){
            option.setAttribute("selected", "selected");
        }
        sel.appendChild(option);
    }

    //Create and append the options
    for (var i = 0; i < process_Array.length; i++) {
        var option = document.createElement("option");
        option.value = process_Array[i][1]; // store Process name
        option.text = process_Array[i][1]; // show Process name

        if( option.value == selectedID){
            option.setAttribute("selected", "selected");
        }
        sel.appendChild(option);
    }
    return sel;
}

// This function is used to create Sub Step Minus Button
function createSubStepMinusButtonFromDB(lineName, rowNum, stage){

    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('id','subMinus' + lineName + "_" + rowNum + "_s_" + stage);  // subMinusIB_1_s_1
    buttMinus.setAttribute('class',"add-house btn btn-danger  btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left;  margin-left:5px; margin-top:5px;');
    buttMinus.setAttribute('onclick', "removeSubStepItem('" + lineName + "', " + rowNum + ", " + stage + ")");

    return buttMinus;
}

// This function is used to create a link text of each sub step item
function addLinkSubItemFromDB(lineName, rowNum, txtValue, itemValue){

    // Link Textbox
    var linkTxt = createTextLink(lineName, rowNum, txtValue, itemValue);
    linkTxt.value = itemValue;

    // Link Minus Button
    var linkButton = createMinusLinkButton(lineName, rowNum, txtValue, itemValue);

    // Link Div
    var div = createLinkDivSubStep(lineName, rowNum, txtValue, itemValue);
    div.appendChild(linkTxt);
    div.appendChild(linkButton);

    var outerDiv = document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue);
    outerDiv.appendChild(div);
}


// Update value attribute when input controls change
$(document).on('change','input',function(){
    $("#"+this.id).attr("value",$("#"+this.id).val());
});


// set selected = selected when the option is chosen
$(document).on('change','select',function(){
    var value = $("#"+this.id).val();
    $('option', $(this)).each(function(){
        if($(this).val() == value){
            $(this).attr("selected", "selected");
        }
    });
});


