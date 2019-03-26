$(function () {

    // ============== Server Side ============================================

    //TODO: SERVER SIDE REQUEST
    // Get factory name
    // Get all Factory name from new database
    // =========================== Factories ======================================
    design.getAllFactories = function () {
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
                        option.setAttribute("value","0"); // store Process name
                        option.text = "공장"; // show Process name
                        sel.appendChild(option);

                        for(i = 0; i < response.data.length; i++){
                            var option = document.createElement("option");
                            option.setAttribute("value", response.data[i].id); // store factory id
                            option.text = response.data[i].name; // show factory name
                            sel.appendChild(option);
                        }
                        $("#selFactory").prop("selectedIndex",1).change();
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // First load, call this function
    design.getAllFactories();


    design.getAllDepartments = function () {
        $.ajax({
            url: "/v3/api/fukoku/department/department",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        var sel = document.getElementById("selDepartment");
                        var option = document.createElement("option");
                        option.setAttribute("value","0");
                        option.text = "부서";
                        sel.appendChild(option);

                        for(i = 0; i < response.data.length; i++){
                            var option = document.createElement("option");
                            option.setAttribute("value", response.data[i].name); // store factory id
                            option.text = response.data[i].name; // show factory name
                            sel.appendChild(option);
                        }
                        $("#selDepartment").prop("selectedIndex",1).change();
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
    // First load, call this function
    design.getAllDepartments();


    // Get all line name from new database by Factory ID
    // =========================== LINE ======================================
    design.getAllLinesByFactory = function (fid) {
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
                            lineArr.push(response.data[i].name);
                        }

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
        // console.log($("#"+this.id + " option:selected").text());
        design.getAllLinesByFactory($("#"+this.id + " option:selected").val());

    });
    
    
    // MAPPING TABLE
    //TODO: SERVER SIDE REQUEST
    design.getAllErrorAndErrorDetail = function (id) {
        openLoading();
        $.ajax({
            url: "/v3/api/fukoku/error/table/"+id,
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {



                    $("#SUMMARY_MAPPING").html("");
                    if (response.DATA.length > 0) {
                        $("#SUMMARY_MAPPING_TEMPLATE").tmpl(response).appendTo("tbody#SUMMARY_MAPPING");
                    } else {
                        $("#SUMMARY_MAPPING").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
                    }
                } else {
                    $("#SUMMARY_MAPPING").html("<tr style='text-align:center;'><td colspan='6'>콘텐츠 없음</td></tr>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };



});


// Client Side
// When the search line button is clicked
$("#btnSearchLine").click(function () {
    console.log("btnLine");
    createLine();
});

// -- Step 1. Start create one set of Line
function addNewLine(btnObj){
    var divParent = $(btnObj).parent()[0];
    var rndNum = Math.floor(Math.random()*1000);

    var div = document.createElement("div");
    div.className = "subDivLine";
    div.setAttribute("style","clear:both");

    var _br = document.createElement("br");
    _br.setAttribute("style", "clear:both");

    var btnRemoveLine = removeLineBtn();

    var sel = newLineList();

    div.appendChild(btnRemoveLine);
    div.appendChild(sel);
    div.appendChild(_br);

    divParent.appendChild(div);
}

// === Step 1 - create Line
function createLine(){

    if(!isExisted("lineHeader")) {
        var theader = document.getElementById("tableHeader");

        var th1 = document.createElement("th");
        th1.innerText = "라인";
        th1.id = "lineHeader";

        var th2 = document.createElement("th");
        th2.innerText = "단계추가";
        th2.id = "stepHeader";

        theader.appendChild(th1);
        theader.appendChild(th2);

        var tbody = document.getElementById("abnormalTable");

        var tr = document.createElement("tr");
        tr.id = "trLine";

        var td1 = document.createElement("td");
        var btnLine1 = createLineButton("라인추가","btnLine", "primary", "addNewLine");

        var td2 = document.createElement("td");
        var btnLine2 = createLineButton("단계추가","btnLine", "success", "addNewStep");

        td1.appendChild(btnLine1);
        td2.appendChild(btnLine2);

        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }
}

function createLineButton(btnName, btnClassName, btnType,  nextCalledFunction){

    var butt = document.createElement('input'); // create a button
    butt.setAttribute('type','button'); // set attributes ...
    butt.setAttribute("style","float:left; width:68px; font-size:11px; margin-top:5px; margin-bottom:5px; margin-right:5px; padding:0px;");

    butt.setAttribute('class',"btn btn-" + btnType + " " + btnClassName);
    butt.setAttribute('value',btnName);
    butt.setAttribute('onclick', nextCalledFunction + "(this)");
    return butt;
}

// ---------------- Helping Functions -----------------------------
// This function is used to know whether the html element is existed
function isExisted(id){

    var item = document.getElementById(id);

    if(item){
        return true;
    }else{
        return false;
    }
}



// -- Step 1-2. Create remove Line item
function removeLineBtn(){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left; margin-right:5px;');
    buttMinus.setAttribute("onclick","removeLine(this)");

    return buttMinus;
}

// Remove Line
function removeLine(btnObj){
    var z = "";
    z = confirm("삭제하시겠습니까?");

    if( z == true){
        $(btnObj).parent().remove();
    }
}

// -- Step 1-3. Create Line Select Item List
function newLineList(){
    // select box
    var sel = document.createElement('select');
    sel.setAttribute('style','margin-bottom:5px; width:45px;height:24px; float:left;');
    sel.className = "selProduct"; // className = selProduct. This will be useful when we insert into DB

    // Append options to select box
    for (var i = 0; i < lineArr.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", lineArr[i]);
        option.text = lineArr[i];
        sel.appendChild(option);
    }
    return sel;
}


// Step 2 - Create a new step
// Create a new step
function addNewStep(btnObj){
    var txtValue = "";
    swal({
            title: "이상조치단계",
            // text: "공정이름이 뭐예요?",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "이상조치단계 (보기: 1)",
            confirmButtonText: '저장',
            confirmButtonColor: "#00a65a",
            cancelButtonText: "취소"
        },
        function(inputValue){
            if (inputValue === false || inputValue === "" ) {
                swal.showInputError("텍스트를 입력하십시오!");
                return false
            }else {

                txtValue = inputValue;

                createStepAfterMainProcess(txtValue, btnObj);
                return true;
            }
        });
}


// This function is used to create step after entering the main process title
function createStepAfterMainProcess(txtValue, btnObj) {

    // Get the row Id which the user wants to move the TD
    var rowID = $(btnObj).parent().parent().attr("id");


    // check the desired TD is available or not.
    var newTd = $("#" + rowID + " > " + "td[data-id='" + txtValue + "']" )[0];

    if(newTd != undefined && newTd.innerHTML != ""){
        displayDialog(txtValue, "있었어요!" );
        return;
    }

    for (let i = 1; i <= txtValue; i++) {
        if (!isExisted("headerStep_" + i)){
            var theader = document.getElementById("tableHeader");
            var th = document.createElement("th");
            th.innerText = "이상조치단계" + i;
            th.id = "headerStep_" + i;
            th.setAttribute("data-id", i);


            var btn = buttonDeleteStepHeader(th.getAttribute("data-id"));
            th.appendChild(btn);
            theader.appendChild(th);
        }
    }
    // Row
    var row = $(btnObj).parent().parent()[0];

    let i = 0;

    var nextTd = $(btnObj).parent().closest("td").next();

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
    var nextTd = $(btnObj).parent().closest("td").next();
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
            var buttPlus = mainPlusButton();

            // Minus button
            // var buttMinus = mainMinusButton(lineName, rowNum, txt);
            var buttMinus = mainMinusButton();


            // Move button
            var buttShow = mainShowAllButton();


            // Textbox
            var txtBox = document.createElement("input");
            txtBox.setAttribute("type","text");
            txtBox.setAttribute("style", "width:100px");

            // Column
            var td = document.createElement("td");

            divColor.appendChild(buttMinus);
            divColor.appendChild(txtBox);
            divColor.appendChild(buttPlus);
            var _br = document.createElement("br");
            _br.setAttribute("class","clear:both");
            divColor.appendChild(_br);
            divColor.appendChild(buttShow);

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
function buttonDeleteStepHeader(dataID){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...

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
            inputPlaceholder: "이상단계단계 (보기: 1)",
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

// This function is used to create main plus button
function mainPlusButton(){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.setAttribute("value", "이상조치추가");
    buttPlus.innerText =  "이상조치추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:right');
    buttPlus.setAttribute('onclick', "createSubStepItem(this)" );

    return buttPlus;
}

// This function is used to craete main Minus button
function mainMinusButton(){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left');
    buttMinus.setAttribute('onclick', "removeStepTd(this)");

    return buttMinus;
}

// Remove Main Td Item
function removeStepTd(btnObj){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        // document.getElementById("td" + lineName + "_" + rowNum + "_s_" + txtValue).remove();
        var td = $(btnObj).parent().parent()[0];
        td.innerHTML = "";
    }
}

// -- Step 6 - Add Sub Step of Each main step
function createSubStepItem(btnObj){

    // Textbox
    var txtSeq = createSubStepTextBox("txtSeq", "20px");

    // Textbox
    var txtCode = createSubStepTextBox("txtCode", "50px");

    // Textbox
    var txtName = createSubStepTextBox("txtName", "100px");

    // Popup button
    var buttPopUp = createSubStepPlusButton("연결","showPopUp");

    // Relationship button
    var buttRelationship = createSubStepPlusButton("연결보기","showRelationship");

    // Div for one sub step
    var div = createDivSubStep();


    // Minus button
    var buttMinus = createSubStepMinusButton();

    div.appendChild(buttMinus);
    div.appendChild(txtSeq);
    div.appendChild(txtCode);
    div.appendChild(txtName);
    div.appendChild(buttPopUp);
    div.appendChild(buttRelationship);

    div.setAttribute("class","subStep");
    // var td = document.getElementById("td" + lineName + "_" + rowNum + "_s_" + tValue);

    var td = $(btnObj).parent().parent()[0];

    // td.className = "tdProcess";
    td.appendChild(div);
}

// -- Creating Textbox for Sub Step Item
function createSubStepTextBox(className, width){
    var txt = document.createElement('input'); // create a button
    txt.setAttribute('type','text'); // set attributes ...
    txt.setAttribute("class", className);
    txt.setAttribute('style','float:left; margin-left: 5px; margin-top:5px; width:'+ width + '; height:24px;');

    return txt;
}

// This function is used to div element to wrap up the sub step
function createDivSubStep(){
    var div = document.createElement("div");
    // div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + txt.value);
    div.setAttribute("style","clear:both");
    return div;
}

// This function is used to create Sub Step Minus Button
function createSubStepMinusButton(){

    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    // buttMinus.setAttribute('id','subMinus' + lineName + "_" + rowNum + "_s_" + txtId.value);  // subMinusIB_1_s_1
    buttMinus.setAttribute('class',"add-house btn btn-danger  btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left;  margin-left:5px; margin-top:5px;');
    buttMinus.setAttribute('onclick', "removeSubStepItem(this)");

    return buttMinus;
}

// Remove Sub Step Item
function removeSubStepItem(btnObject){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        // document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue).remove();
        $(btnObject).parent().remove();
    }
}

// -- Creating plus button for Sub Step Item
function createSubStepPlusButton(btnName, functionName){
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    buttPlus.innerText = btnName;
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:left; margin-left:5px; margin-top:5px;');
    buttPlus.setAttribute('onclick', functionName + "(this) " );

    return buttPlus;
}

// This function is used to create show all button
function mainShowAllButton(){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    // buttPlus.setAttribute('id','mainMove' + lineName + '_' + rowNum + '_s_' + txtNum); // mainPlusIB_1_s_1
    buttPlus.setAttribute("value", "전체보기");
    buttPlus.innerText =  "전체보기";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','clear:both; margin-top:5px; float:right; font-size:11px;');
    buttPlus.setAttribute('onclick', "showAll(this)" );

    return buttPlus;
}

function importFile(){
    $.ajax({
        url: "/v3/api/fukoku/abnormal/import",
        type: "POST",
        data: new FormData($("#fileUploadForm")[0]),
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
            $scope.findAll($scope.data);
            swal({position: 'top-end',type: 'success',title: '데이터를 가져 왔습니다.',showConfirmButton: false,timer: 1500})
        },
        error: function () {
            swal({position: 'top-end',type: 'error',title: '데이터를 가져 오지 않았습니다.',showConfirmButton: false,timer: 1500})
        }
    });
}