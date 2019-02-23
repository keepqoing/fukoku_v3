$(function () {
    var lineArr = []; // for Line

    var productArr = []; // for product
    var processArr = []; // for process
    var machineArr = []; // for machine
    var machineSpecificArr = []; // for machine


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
        // console.log($("#"+this.id + " option:selected").text());
        lines.getAllLinesByFactory($("#"+this.id + " option:selected").val());
        $( "#btnTest" ).trigger( "click" );

    });


    $(document).on('change','select.selProduct',function(){
        // console.log($("#"+this.id + " option:selected").text());
        checkProductDuplicated(this);

    });


    // Create check box based on the data from database
    lines.createLineCheckBox = function(){
        var divLine = document.getElementById("lineCheckboxes");
        divLine.innerHTML = "";
        console.log("Line checkbox length = " + lineArr.length);
        for(i=0; i< lineArr.length; i++){
            divLine.appendChild(lines.createCheckBox(lineArr[i][0], lineArr[i][1]));
        }

        // console.log(lineFromDB.length);
        for(var i=0; i < lineFromDB.length; i++){
            // console.log(lineFromDB[i]);
            var chk = document.getElementById("chk"+lineFromDB[i]);
            if(chk != null) {
                chk.checked = true;
                isChecked();
            }
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
        option.setAttribute("id", "chk"+lineName);
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
        // var sel = $(selObject).closest("select").next()[0];

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
                    machine_Array = [];
                    machineArr = [];
                    if (response.data.length > 0) {
                        for(i = 0; i < response.data.length; i++){
                            machineArr[i] = [response.data[i].id, response.data[i].name];
                        }
                        machine_Array = machineArr;

                        $.each($(selObject).parent().parent().find(".subProcess .machine_select"), function(keySubProcess, subProcess) {
                            $(subProcess).find("option").remove();
                            for (i = 0; i < machine_Array.length; i++) {
                                var option = document.createElement("option");
                                option.setAttribute("value", machine_Array[i][1]); // store machine ID
                                option.text = machine_Array[i][1]; // machine name
                                $(subProcess).append(option);
                            }
                        });
                    }
                } else{
                    $.each($(selObject).parent().parent().find(".subProcess .machine_select"), function(keySubProcess, subProcess) {
                        $(subProcess).find("option").remove();

                    });
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };


    // =============== -- GET SPECIFIC MACHINE =================================
    // Get All Machines
    lines.getSpecificMachine = function (process_name, selectedValue, machineObj) {
        // var sel = $(selObject).closest("select").next()[0];

        $.ajax({
            url: "/v3/api/fukoku/machine/by_process/" + process_name,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                machineSpecificArr = [];
                if (response.code == 200) {
                    if (response.data.length > 0) {
                        console.log("oh : "+ response.data.length);
                        for(i = 0; i < response.data.length; i++){
                            machineSpecificArr[i] = response.data[i].name;
                        }


                        // $.each($(selObject).parent().parent().find(".subProcess .machine_select"), function(keySubProcess, subProcess) {
                            $(machineObj).find("option").remove();
                            console.log(machineSpecificArr);
                            for (i = 0; i < machineSpecificArr.length; i++) {
                                var option = document.createElement("option");
                                option.setAttribute("value", machineSpecificArr[i]); // store machine ID
                                option.text = machineSpecificArr[i]; // machine name
                                if(machineSpecificArr[i] ==  selectedValue){
                                    option.setAttribute("selected", "selected");
                                }
                                $(machineObj).append(option);
                            }
                        // });
                    }
                } else{
                    $(machineObj).find("option").remove();
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    // =============== END -- GET SPECIFIC MACHINE =============================

    // This function is called when the selectbox of process has been changed --- MUCH CHECK AGAIN
    lines.processChange = function(selObj){
        lines.getAllMachines($(selObj).val(), selObj);
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
            success: function (response) {
                swal("데이터가 성공적으로 저장되었습니다!");
            }
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


    // Get Process Model by Checking the Line Checkboxes
    // This function reads all the process model from the database
    lines.getProcessModelDataByLine = function (strLines) {
        $.ajax({
            url: "/v3/api/fukoku/process_model/lines/" + strLines,
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
                    $("#btnSearchLine").trigger("click");
                }
            },
            error: function(data, status, err){
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    // This function reads all LINES in process model
    lines.getLineInProcessModel = function () {

        $.ajax({
            url: "/v3/api/fukoku/process_model/lines",
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if(response.code == 200){

                    if(response.data.length > 0){

                        for(var i=0; i<response.data.length; i++){
                            lineFromDB.push(response.data[i].name);
                        }
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
    lines.getLineInProcessModel();


    // Remove Data
    lines.deleteProcessModelByLine = function (p_line, callback) {
        $.ajax({
            url: "/v3/api/fukoku/process_model/remove/" +  p_line,
            type: 'GET',
            dataType: 'JSON',

            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
                // console.log("response = " + response.code);
                // if(response.code == 200) {
                //     delSucceess = 1;
                // }else if(response.code == 404){
                //     delSucceess = 1;
                // }else{
                //     delSucceess = 0;
                //
                // }
            },
            error: function (data, status, err) {

                console.log("error: " + data + " status: " + status + " err:" + err);

            }
        });
    };

}); // END Ajax block
// =============== END Server Side ======================================

// When the search line button is clicked
$("#btnSearchLine").click(function () {
    getCheckBoxValues();
});


// === Step 1 - create Line
function createLine(arrLine){
    var index = arrLine.indexOf("0");
    if (index !== -1)
        arrLine = arrLine.slice(0, -2);


    if(!isExisted("lineHeader")) {
        var theader = document.getElementById("tableHeader");

        var th = document.createElement("th");
        th.innerText = "라인";
        th.id = "lineHeader";

        theader.appendChild(th);
    }
    var tbody = document.getElementById("processTable");

    arrLine = arrLine.split(",");
    for(i=0; i < arrLine.length; i++){
        if(!isExisted("tr"+arrLine[i]+"_1")) {
            var tr = document.createElement("tr");
            tr.id = "tr" + arrLine[i] + "_1";
            tr.setAttribute("data-id", arrLine[i] + "_1");
            tr.className = "tr" + arrLine[i];
            var td = document.createElement("td");
            td.id = "td" + arrLine[i];
            td.className = "td" + arrLine[i];
            td.setAttribute("rowspan", "1");

            var span = document.createElement("span");
            span.setAttribute("id", "span" + arrLine[i]);
            span.setAttribute("class", "span" + "LineName");
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

}

// Create line button after clicking on 검색​ button
function createLineButton(lineName){
    var btn = document.createElement("button");
    btn.setAttribute("type","button");
    btn.setAttribute("class","btn btn-primary");
    btn.innerText = "공정흐름"+ "\n" + "추가";
    btn.setAttribute("id","btnLine_" + lineName);
    btn.setAttribute("onclick","newProduct_2_1('"+lineName+"', this)");
    btn.setAttribute("style","font-size:11px;");
    return btn;
}

//========== Step 2 - Create Adding Product Button
// Step 2.1 -- Create Product Td
function newProduct_2_1(lineName, btnObj){

    // Create a new Column Header
    if(!isExisted("productHeader")){
        var theader = document.getElementById("tableHeader");
        var th = document.createElement("th");
        th.innerText = "제품";
        th.id = "productHeader";
        theader.appendChild(th);
    }

    // get final class name of current tr which obtains the clicked button
    var finalClassName = $(btnObj).parent().parent().attr("class");
    // count the class name of current tr which obtains the clicked button
    var countClassName = $("."+finalClassName).length;
    // select the last tr with the class name that we selected above
    var refElement = $("tr"+"."+finalClassName+":last")[0];

    // New Process Product
    var div = newProduct_2_2(lineName, countClassName);

    var newTd = $("tr" + " > " + "td[data-id='" + lineName + "']" )[0];

    if(newTd == undefined) {
        // Add default product

        var td = document.createElement("td");
        td.appendChild(div);
        td.setAttribute("data-id", lineName);
        td.className = "tdProduct";
        var tr = $(btnObj).parent().parent()[0];
        tr.appendChild(td);

    }

    if(countClassName >= 1  && newTd != undefined){
        // console.log("Wow");
        // var cell = addProductFamily();
        var row = addRowAfter(btnObj);
        row.insertCell(0);

        var cell = row.cells[0];
        cell.className = "tdProduct" ;
        cell.setAttribute("data-id",lineName);
        cell.id = "tdProduct" + lineName + "_" + countClassName;
        cell.appendChild(div);
        var rowspan = parseInt($('#td'+lineName).attr('rowSpan'));
        $('#td'+lineName).attr('rowSpan', (rowspan + 1));
    }
}

// -- Step 2-2. Create Div to store elements of New Process Product
// This function is used to create div for default process product
function newProduct_2_2(lineName, countClassName){
    // Create a new row
    var div = document.createElement("div");
    div.className = "divProduct";
    div.id = "divProduct" + lineName + "_" + countClassName;


    // Create Remove Product Button
    var btnRemoveProcessProduct = newProduct_2_3_addProductBtn("공정흐름삭제","btnRemoveProcessProduct", "danger", "newProduct_2_9_removeRow");

    // Create Process Product Button
    var btnProcessProduct = newProduct_2_3_addProductBtn("제품추가","btnProcessProduct", "success", "newProduct_2_8_productSet");

    // Create Add Step Button
    var btnAddStep = newProduct_2_3_addProductBtn("공정단계추가","btnAddStep", "primary", "newProduct_2_10_addStep");

    div.appendChild(btnRemoveProcessProduct);
    div.appendChild(btnProcessProduct);
    div.appendChild(btnAddStep);

    return div;
}


// -- Step 2-3. Create new button for adding new product when there are the same process items
function newProduct_2_3_addProductBtn(btnName, btnClassName, btnType,  nextCalledFunction){

    var butt = document.createElement('input'); // create a button
    butt.setAttribute('type','button'); // set attributes ...
    butt.setAttribute("style","float:left; width:68px; font-size:11px; margin-top:5px; margin-bottom:5px; margin-right:5px; padding:0px;");

    butt.setAttribute('class',"btn btn-" + btnType + " " + btnClassName);
    butt.setAttribute('value',btnName);
    butt.setAttribute('onclick', nextCalledFunction + "(this)");
    return butt;
}

// -- Step 2-4. Create div to store all the new product controls
function newProduct_2_4_productControls(){
    var div = document.createElement("div");

    // var btnRemoveProduct = newProduct_2_3_addProductBtn(btnName="")
}

// -- Step 2-5. Create remove product item
function newProduct_2_5_removeProductBtn(){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left; margin-right:5px;');
    buttMinus.setAttribute("onclick","removeProduct(this)");

    return buttMinus;
}

// -- Step 2-6. Create Product Select Item List
function newProduct_2_6_productSelList(){
    // select box
    var sel = document.createElement('select');
    sel.setAttribute('style','margin-bottom:5px; width:110px;height:24px; float:left;');
    sel.className = "selProduct"; // className = selProduct. This will be useful when we insert into DB

    // Append options to select box
    for (var i = 0; i < product_Array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", product_Array[i][1]);
        option.text = product_Array[i][1];
        sel.appendChild(option);
    }
    return sel;
}

// -- Step 2-7. Create radio button for new product
function newProduct_2_7_radioBtn(rdoName, rdoValue, checked){
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = rdoName;
    // radio.checked = (rdoValue == "1")?  true:false;
    if(checked){
        radio.setAttribute("checked","checked");
    }
    radio.setAttribute("value",rdoValue);
    label.appendChild(radio);
    label.appendChild(document.createTextNode(rdoValue == "1"?"Active":"Inactive"));
    label.setAttribute("style","float:left; margin-left: 5px; margin-right: 5px;")
    return label;
}

// -- Step 2-8. Start create one set of product
function newProduct_2_8_productSet(btnObj){
    var divParent = $(btnObj).parent()[0];
    var rndNum = Math.floor(Math.random()*1000);

    var div = document.createElement("div");
    div.className = "subDivProduct";
    div.setAttribute("style","clear:both");

    var _br = document.createElement("br");
    _br.setAttribute("style", "clear:both");

    var btnRemoveProduct = newProduct_2_5_removeProductBtn();

    var sel = newProduct_2_6_productSelList();

    var rdoName = "radio" + rndNum;
    var rdoActive = newProduct_2_7_radioBtn(rdoName, "1", true);
    var rdoInActive = newProduct_2_7_radioBtn(rdoName, "0", false);

    div.appendChild(btnRemoveProduct);
    div.appendChild(sel);
    div.appendChild(_br);
    div.appendChild(rdoActive);
    div.appendChild(rdoInActive);

    divParent.appendChild(div);
}

// -- Step 2-9. Remove the whole row of Process Product

function newProduct_2_9_removeRow(btnObj){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){

        deleteRow = $(btnObj).parent().parent().parent().attr("data-id");

        lines.deleteProcessModelByLine(deleteRow, function(response){

            if(response.code == 200 || response.code == 404) {
                lineName = $(btnObj).parent().parent().attr("data-id");
                // console.log(lineName);

                var rowspan = parseInt($("#td" + lineName).attr("rowSpan"));
                // test
                var td = $('#td' + lineName);
                $('#td' + lineName).attr('rowSpan', (rowspan - 1));

                //$("<td/>").insertBefore($("#btnMinusProductHC_1").parent().parent().next().children().first());
                var btnClassName = $(btnObj).parent().parent().parent().attr("class");
                var btnRowId = $(btnObj).parent().parent().parent().attr("id");

                // console.log("class[0] = " + $("."+btnClassName)[0].id);

                // console.log("row id = " + btnRowId);

                if ($("." + btnClassName)[0].id == btnRowId && rowspan != 1) {
                    $(td).insertBefore($(btnObj).parent().parent().parent().next().children().first());
                }

                $(btnObj).parent().parent().parent().first().remove();


                // uncheck the deleted line
                document.getElementById("chk" + lineName).checked = false;

                checkIfNoMoreRow();

                swal("성공적으로 삭제되었습니다!");
            }else{
                swal("다른 메뉴가 이것을 사용하기 때문에 삭제할 수 없습니다!");

            }
        });


    }
}

// Create a new step
function newProduct_2_10_addStep(btnObj){
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

                txtValue = inputValue;

                createStepAfterMainProcess(txtValue, btnObj);
                return true;
            }
        });
}

//====================== START: Helping Functions ===================================================

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
    var m_option = "";

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




// This function is used to know whether the html element is existed
function isExisted(id){
    var item = document.getElementById(id);
    if(item){
        return true;
    }else{
        return false;
    }
}

function addRowAfter(btnObj){
    // get final class name of current tr which obtains the clicked button
    var finalClassName = $(btnObj).parent().parent().attr("class");
    // count the class name of current tr which obtains the clicked button
    var countClassName = $("."+finalClassName).length;

    // select the last tr with the class name that we selected above
    var refElement = $("tr"+"."+finalClassName+":last")[0];

    var newRow= document.createElement('tr');
    newRow.id = finalClassName+ "_" + (countClassName + 1); // plus one because of new element
    newRow.setAttribute("data-id", finalClassName.substr(2)+ "_" + (countClassName + 1)); // substring
    newRow.className = finalClassName;

    refElement.parentNode.insertBefore(newRow, refElement.nextSibling);
    return newRow;
}

// Remove Product
function removeProduct(btnObj){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        // document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue + "_" + txtLink).remove();
        $(btnObj).parent().remove();
    }

}

// function checks if there is no more row left
function checkIfNoMoreRow(){
    var theader = document.getElementById("tableHeader");
    if($('#processTable tr').length == 0){
        theader.innerHTML = "";
    }
}

// This function is used to create step after entering the main process title
function createStepAfterMainProcess(txtValue, btnObj) {

    // Get the row Id which the user wants to move the TD
    var rowID = $(btnObj).parent().parent().parent().attr("id");
    var lineName = $(btnObj).parent().parent().attr("data-id");

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
            th.innerText = "공정단계" + i;
            th.id = "headerStep_" + i;
            th.setAttribute("data-id", i);
            th.setAttribute("style","width:237px;");

            var btn = buttonDeleteStepHeader(lineName, th.getAttribute("data-id"));
            th.appendChild(btn);
            theader.appendChild(th);
        }
    }
    // Row
    var row = $(btnObj).parent().parent().parent()[0];


    let i = 0;

    var nextTd = $(btnObj).parent().parent().closest("td").next();

    for(i; i < txtValue; i++) {
        // check if the next td is empty. If so, create blank td for it
        if(nextTd[0] == undefined) {
            var blank_td = document.createElement("td");
            blank_td.setAttribute("data-id",(i+1));
            blank_td.setAttribute("class","mainProcess");
            blank_td.setAttribute("style", "width:970px");
            row.appendChild(blank_td);
        }

        // move to next td by assigning the next td
        nextTd = nextTd.next();
    }

    // reset the next element of current button because last time the next elements are null
    var nextTd = $(btnObj).parent().parent().closest("td").next();
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
            var buttPlus = mainPlusButton(lineName);

            // Move button
            var buttMove = mainMoveButton(lineName);

            // Minus button
            // var buttMinus = mainMinusButton(lineName, rowNum, txt);
            var buttMinus = mainMinusButton(lineName);

            var txtMain = mainTextBox();

            // Column
            var td = document.createElement("td");

            divColor.appendChild(buttMinus);
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

// This function is used to create main plus button
function mainPlusButton(lineName){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    // buttPlus.setAttribute('id','mainPlus' + lineName + '_' + rowNum + '_s_' + txt); // mainPlusIB_1_s_1
    buttPlus.setAttribute("value", "설비추가");
    buttPlus.innerText =  "설비"+"\n"+"추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:right');
    buttPlus.setAttribute('onclick', "createSubStepItem(this)" );

    return buttPlus;
}

// This function is used to craete main Minus button
function mainMinusButton(lineName){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    // buttMinus.setAttribute('id','mainMinus' + lineName + '_' + rowNum + '_s_' + txt); // mainMinusIB_1_s_1
    buttMinus.setAttribute('class',"add-house btn btn-danger btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:left');
    buttMinus.setAttribute('onclick', "removeProcessTd(this)");

    return buttMinus;
}


// This function is used to create main plus button
function mainMoveButton(lineName){
    // Plus button
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    // buttPlus.setAttribute('id','mainMove' + lineName + '_' + rowNum + '_s_' + txtNum); // mainPlusIB_1_s_1
    buttPlus.setAttribute("value", "단계이동");
    buttPlus.innerText =  "단계이동";
    buttPlus.setAttribute('class',"add-house btn btn-primary btn-xs");
    buttPlus.setAttribute('style','clear:both; font-size:11px;');
    buttPlus.setAttribute('onclick', "moveTd(this)" );
    var spn = document.createElement('span');
    spn.setAttribute('class','glyphicon glyphicon-transfer');
    buttPlus.appendChild(spn);

    return buttPlus;
}

function mainTextBox(){
    // var txtMain = document.createElement("input");
    // txtMain.type = "text";
    // txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px");
    // txtMain.className = "txtMainTitle";
    // txtMain.setAttribute("required", "required");
    // txtMain.placeholder = "공정명을 입력하세요";
    // txtMain.size = "15";

    var txtMain = createSelectBox(process_Array, "subProcess", "mod_select");
    txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px; width:100px;height:24px; ");
    txtMain.className = "txtMainTitle";

    return txtMain;
}

// function is used to delete step header
// This function is used to craete main Minus button
function buttonDeleteStepHeader(lineName, dataID){
    // Minus button
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    // buttMinus.setAttribute('id','deleteHeader' + lineName + '_' + dataID); // mainMinusIB_1_s_1
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

// == This function is used to move all element in td to the other stage after completing pop-up value
function moveTd(btnObj){

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

                startMovingTd(newStage, btnObj);
                return true;
            }
        });
}

// This function is used to move TD after confirmation
function startMovingTd(newStage, btnObj){

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
        // console.table(oldTd);
        newTd.innerHTML = oldTd.html();
        oldTd.html("");
        return true;
    }else{
        displayDialog(newStage, "있었어요!" );
    }
}

// Remove Main Td Item
function removeProcessTd(btnObj){
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
    var textBox = createSubStepTextBox();

    // Div for one sub step
    var div = createDivSubStep();

    // Select for process select box
    // var arrProcess = ["공정","1차V홈높이",	"1차V홈높이최대",	"1차V홈높이최소",	"1차드릴수",	"1차불균형량",	"1차압입하중",	"2차압입하중",	"3차압입하중"];
    // var selProcess = createSelectBox(process_Array, "subProcess", "mod_select");

    // Select for process select box
    // var arrMachine = ["설비","1차압입하중-압입기 1","2차압입하중-압입기 2","3차압입하중-압입기 3"];
    /*
    var selMachine = createSelectBox(machine_Array, "subMachine", "machine_select");
    */
    var selMachine = createSelectedMachine("machine_select");
    var selectedProcess = $(btnObj).parent().find(".txtMainTitle")[0].value;
    lines.getSpecificMachine(selectedProcess, "", selMachine);



    // Minus button
    var buttMinus = createSubStepMinusButton();

    // Plus button
    var buttPlus = createSubStepPlusButton();

    div.appendChild(buttMinus);
    div.appendChild(textBox);
    // div.appendChild(selProcess);
    div.appendChild(selMachine);
    div.appendChild(buttPlus);
    div.setAttribute("class","subProcess");
    // var td = document.getElementById("td" + lineName + "_" + rowNum + "_s_" + tValue);

    var td = $(btnObj).parent().parent()[0];

    // td.className = "tdProcess";
    td.appendChild(div);
}

// -- Creating Textbox for Sub Step Item
function createSubStepTextBox(){
    var txt = document.createElement('input'); // create a button
    txt.setAttribute('type','text'); // set attributes ...
    // txt.setAttribute('id','subTextBox'+lineName+"_"+rowNum+"_s_"+txtId.value);  // subTextBoxIB_1_s_1
    txt.setAttribute("class", "txtSeq");
    txt.setAttribute('style','float:left; margin-left: 5px; margin-top:5px; width:20px; height:24px;');

    return txt;
}

// This function is used to div element to wrap up the sub step
function createDivSubStep(){
    var div = document.createElement("div");
    // div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + txt.value);
    div.setAttribute("style","clear:both");
    return div;
}

// This function is used to create process select box
function createSelectBox(process_Array, prefixSel, className){
    // select box for process
    var sel = document.createElement('select');


    // sel.setAttribute('id', prefixSel + lineName + "_" + rowNum + "_s_" + txtID.value); // subProcessIB_1_s_1
    sel.setAttribute('class',className);

    if(prefixSel == "subProcess") {
        sel.setAttribute('onchange', 'lines.processChange(this)');
        var option = document.createElement("option");
        option.setAttribute("value", 0); // store Process ID
        option.text = "공정"; // show Process name
        sel.appendChild(option);
        sel.width = "auto";
    }else{
        var option = document.createElement("option");
        option.setAttribute("value", 0); // store Process ID
        option.text = "설비"; // show Process name
        sel.appendChild(option);
        sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:105px;height:24px;');
        sel.width = "auto";
    }

    //Create and append the options
    for (var i = 0; i < process_Array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", process_Array[i][1]); // store Process ID
        option.text = process_Array[i][1]; // show Process name
        sel.appendChild(option);
    }
    return sel;
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

// -- Creating plus button for Sub Step Item
function createSubStepPlusButton(){
    var buttPlus = document.createElement('button'); // create a button
    buttPlus.setAttribute('type','button'); // set attributes ...
    // buttPlus.setAttribute('id','subPlus'+lineName+"_"+rowNum+"_s_"+txtId.value);  // subPlusIB_1_s_1
    buttPlus.innerText = "연결"+"\n" + "추가";
    buttPlus.setAttribute('class',"add-house btn btn-success btn-xs");
    buttPlus.setAttribute('style','float:left; margin-left:5px; margin-top:5px;');
    buttPlus.setAttribute('onclick', "addLinkSubItem(this) " );

    return buttPlus;
}

// This function is used to create a link text of each sub step item
function addLinkSubItem(btnObject){

    // Link Textbox
    var linkTxt = createTextLink();

    // Link Minus Button
    var linkButton = createMinusLinkButton();

    // Link Div
    var div = createLinkDivSubStep();
    div.appendChild(linkTxt);
    div.appendChild(linkButton);

    var outerDiv = $(btnObject).parent()[0];
    outerDiv.appendChild(div);
}

// This function is used to create a textbok of link for each sub stem item
function createTextLink(){
    // text box
    var txt = document.createElement('input');
    txt.setAttribute('type','text');
    // txt.setAttribute('id', 'link'  + lineName + "_" + rowNum + "_s_" + txtValue + "_" + txtLink); // linkIB_1_s_1_1
    txt.setAttribute("class","linkTxtClass");
    txt.setAttribute('style','float:right; margin-left: 5px; margin-top:5px; width:30px; height:24px;');

    return txt;
}

// This function is used to create a sub link minus button for each sub step item
function createMinusLinkButton(){
    var buttMinus = document.createElement('button'); // create a button
    buttMinus.setAttribute('type','button'); // set attributes ...
    // buttMinus.setAttribute('id','linkMinus'  + lineName + "_" + rowNum + "_s_" + txtValue + "_" + txtLink);  // linkMinusIB_1_s_1_1
    buttMinus.setAttribute('class',"add-house btn btn-danger  btn-xs fa fa-trash");
    buttMinus.setAttribute('style','float:right;  margin-left:5px; margin-top:5px;');
    buttMinus.setAttribute('onclick', "removeLinkSubStepItem(this)");

    return buttMinus;
}

// This function is used to create div for link sub step item
function createLinkDivSubStep(){
    var div = document.createElement("div");
    // div.setAttribute("id","div" + lineName + "_" + rowNum + "_" + txtValue + "_" + txtLink); // divIB_1_1_1
    div.setAttribute("style","clear:both;");
    return div;
}

// Remove Link Sub Step Item
function removeLinkSubStepItem(btnObject){
    var z = "";
    z = confirm("삭제하시겠습니까?");
    if( z == true){
        // document.getElementById("div" + lineName + "_" + rowNum + "_" + txtValue + "_" + txtLink).remove();
        $(btnObject).parent().remove();
    }
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

// Update value attribute when input controls change
$(document).on('change','input',function(){
    $(this).attr("value",$(this).val());
});

// set selected = selected when the option is chosen
$(document).on('change','select',function(){
    var value = $(this).val();
    $('option', $(this)).each(function(){
        if($(this).val() == value){
            $(this).attr("selected", "selected");
        }
    });
});


// Check if the user enters the txtMainTitle or not because this field is vital for getting the link textbox
function checkValidation(){
    $('input[class="txtMainTitle"]').each(function() {
        if ($.trim($(this).val()) == '') {
            alert('Please fill out all required fields.');
            return false;
        }
        else {
            // alert('Everything has a value.');
            return true;
        }
    });
}

function checkLineBox(lineName){
    $('input[class="select_line"]').each(function() {
        // console.log("value ", $(this).val());
        // console.log("lineName ", lineName.trim());
        if ($.trim($(this).val()) == lineName.trim()) {
            $(this).prop('checked', true);
        }
    });
}

// set selected = selected when the option is chosen
$(document).on('change','input:checkbox',function(){
    if($(this).is(":checked"))
    {
        // isChecked();
        lines.getProcessModelDataByLine($(this).val());
    }else{
        $("tr.tr"+$(this).val()).remove();
        checkIfNoMoreRow();
    }

});

function isChecked(){

    var array = [];
    let options = document.getElementsByClassName("select_line");
    for (let option of options){
        if($(option).is(":checked")) {
            // array.push(option.value);
            // console.log(option.value);
            lines.getProcessModelDataByLine(option.value);
        }
    }


    // if(array.length > 0){
    //     lines.getProcessModelDataByLine(array.join());
    // }



    // console.log(array);
}
//====================== END: Helping Functions ===================================================


// ===================== START: SAVE TO DATABASE =========================================================
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
    "PROCESS_PRODUCT" : [{
        "ID" : 0,
        "REF_PRODUCT" : "A",
        "REF_PROCESS_CHAIN_ID" : 0,
        "STATUS" : "1"
    }],

    "PROCESS_CHAIN_ELEMENT" : [{
        "ID" : 1,
        "STAGE" : 1,
        "NAME" : "PROCESS_1",
        "REF_PROCESS_CHAIN_ID" : 1,
        "PROCESS_MACHINE" : [{
            "ID" : 1,
            "SEQ" : 1,
            // "REF_PROCESS" : "",
            "REF_MACHINE" : "",
            "REF_PROCESS_CHAIN_ELEMENT" : 1,
            "NEXT_SEQUENCE" : ""
        }]
    }]
}];


function DBInsertion(){
    datas = [];
    $('#processTable tr').each(function(row, tr){
        console.log("product = " + $(this).find(".tdProduct").attr("data-id"));
        if($(this).find(".tdProduct").attr("data-id") == null ||
            $(this).find(".tdProduct").attr("data-id") == "" ||
            $(this).find(".tdProduct").attr("data-id") == undefined ){
            return;
        }
        var data = {};
        // data["ID"] = 1;
        data["SEQ"] = $(this).attr("id").split("_")[1];
        data["NAME"] = $(this).find(".tdProduct").attr("data-id") + "_" + $(this).attr("id").split("_")[1];
        data["REF_LINE"] = $(this).find(".tdProduct").attr("data-id");


        // PROCESS PRODUCT
        var PROCESS_PRODUCTS = [];
        $.each($(this).find("div.subDivProduct"), function(keyProcessProduct, processProduct) {

            var PROCESS_PRODUCT = {
                "ID" : 0,
                "REF_PRODUCT" : $(processProduct).find(".selProduct").val(),
                "REF_PROCESS_CHAIN_ID" : 0
            };
            $(':radio', $(processProduct)).each(function(){
                if($(this).is(":checked")){
                    PROCESS_PRODUCT["STATUS"] = $(this).val();
                }
            });

            PROCESS_PRODUCTS.push(PROCESS_PRODUCT);
        });

        //=========================================



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
                    "REF_PROCESS" : $(process).find(".txtMainTitle").val(),
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

        data["PROCESS_PRODUCT"] = PROCESS_PRODUCTS;
        data["PROCESS_CHAIN_ELEMENT"] = PROCESS_CHAIN_ELEMENTS;
        //
        datas.push(data);
    });
    console.log(datas);
    lines.insertData();
}

$("#btnTest").click(function () {


    removeHiddenControls("hiddenTextBox");
    lines.getLineInProcessModel();




});

// function is used to delete all the helping textbox that we created and hid
function removeHiddenControls(class_name) {

    // resetCountClick();
    var theader = document.getElementById("tableHeader");
    theader.innerHTML = "";

    var tbody = document.getElementById("processTable");
    tbody.innerHTML = "";

    let txtSeq = document.getElementsByClassName(class_name);
    for (let txt of txtSeq){
        console.log(txt);
        txt.remove();
    }
}


// ======================= START READING DATA FROM DATABASE ================================================
function loadDataToTable(result){
    console.log(result);
    for(var i = 0; i < result.length; i++){
        if(getLineName().indexOf(result[i].REF_LINE) == -1) {
            var btnObj = createOneLine(result[i].REF_LINE);

            // console.log("Line = " + result[i].REF_LINE);

            for(var v = 0; v < result[i].PROCESS_CHAIN.length; v++) {
                // Process Product
                var processProducts = result[i].PROCESS_CHAIN[v].PROCESS_PRODUCT;

                if (processProducts != null) {
                    newProduct_2_1_FromDB(result[i].REF_LINE, processProducts, result[i].PROCESS_CHAIN[v], btnObj);
                }
            }
        }
    }
    // isChecked();
}

var numberProcess = 0;
// 1.1 - Read Data and Create One line for once
function createOneLine(lineName){
    numberProcess = 0;


    if(!isExisted("lineHeader")) {
        var theader = document.getElementById("tableHeader");

        var th = document.createElement("th");
        th.innerText = "라인";
        th.id = "lineHeader";
        th.setAttribute("style","width:100px");
        theader.appendChild(th);
    }

    if(!isExisted("tr"+lineName+"_1")) {
        var tbody = document.getElementById("processTable");

        var tr = document.createElement("tr");

        tr.id = "tr" + lineName + "_1";
        tr.className = "tr" + lineName;
        tr.setAttribute("data-id", lineName + "_1");
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
        btn = createLineButton(lineName);
        td.appendChild(btn);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    checkLineBox(lineName);
    return btn;
}

// Step 2.1 -- Create Product Td From Database
function newProduct_2_1_FromDB(lineName, processProducts, result, btnObj){

    // Create a new Column Header
    if(!isExisted("productHeader")){
        var theader = document.getElementById("tableHeader");
        var th = document.createElement("th");
        th.innerText = "제품";
        th.id = "productHeader";
        theader.appendChild(th);
    }

    // get final class name of current tr which obtains the clicked button
    var finalClassName = $(btnObj).parent().parent().attr("class");
    // count the class name of current tr which obtains the clicked button
    var countClassName = $("."+finalClassName).length;
    // select the last tr with the class name that we selected above
    var refElement = $("tr"+"."+finalClassName+":last")[0];

    // New Process Product
    var div = newProduct_2_2(lineName, countClassName);

    var newTd = $("tr" + " > " + "td[data-id='" + lineName + "']" )[0];

    if(newTd == undefined) {
        // Add default product

        var td = document.createElement("td");
        td.appendChild(div);
        td.setAttribute("data-id", lineName);
        td.className = "tdProduct";
        var tr = $(btnObj).parent().parent()[0];
        tr.appendChild(td);
    }

    if(countClassName >= 1  && newTd != undefined){
        console.log("Wow");
        // var cell = addProductFamily();
        var row = addRowAfter(btnObj);
        row.insertCell(0);

        var cell = row.cells[0];
        cell.className = "tdProduct" ;
        cell.setAttribute("data-id",lineName);
        cell.id = "tdProduct" + lineName + "_" + countClassName;
        cell.appendChild(div);
        var rowspan = parseInt($('#td'+lineName).attr('rowSpan'));
        $('#td'+lineName).attr('rowSpan', (rowspan + 1));
    }

    for(var m=0; m < processProducts.length; m++) {
        if (processProducts[m].REF_PRODUCT != null) {
            newProduct_2_8_productSet_FromDB(div, processProducts[m].REF_PRODUCT, processProducts[m].STATUS);
        }
    }

    var subResult = result.PROCESS_CHAIN_ELEMENT;
    for(var j = 0; j < subResult.length; j++ ){
        createStepAfterMainProcessFromDB(lineName, subResult[j].STAGE, div, subResult[j])
    }


}


// -- Step 2-2. Create Div to store elements of New Process Product
// This function is used to create div for default process product
function newProduct_2_2_FromDB(lineName, countClassName,Product, Status){
    // Create a new row
    var div = document.createElement("div");
    div.className = "divProduct";
    div.id = "divProduct" + lineName + "_" + countClassName;


    // Create Remove Product Button
    var btnRemoveProcessProduct = newProduct_2_3_addProductBtn("공정흐름삭제","btnRemoveProcessProduct", "danger", "newProduct_2_9_removeRow");

    // Create Process Product Button
    var btnProcessProduct = newProduct_2_3_addProductBtn("제품추가","btnProcessProduct", "success", "newProduct_2_8_productSet");

    // Create Add Step Button
    var btnAddStep = newProduct_2_3_addProductBtn("공정단계추가","btnAddStep", "primary", "newProduct_2_10_addStep");

    div.appendChild(btnRemoveProcessProduct);
    div.appendChild(btnProcessProduct);
    div.appendChild(btnAddStep);

    return div;
}

// -- Step 2-8. Start create one set of product
function newProduct_2_8_productSet_FromDB(div, Product, Status){
    var divParent = div;
    var rndNum = Math.floor(Math.random()*1000);

    var div = document.createElement("div");
    div.className = "subDivProduct";
    div.setAttribute("style","clear:both");

    var _br = document.createElement("br");
    _br.setAttribute("style", "clear:both");

    var btnRemoveProduct = newProduct_2_5_removeProductBtn();

    var sel = newProduct_2_6_productSelList_FromDB(Product);


    var rdoName = "radio" + rndNum;
    var rdoActive = newProduct_2_7_radioBtn(rdoName, "1", Status == "1"? true : false);
    var rdoInActive = newProduct_2_7_radioBtn(rdoName, "0", Status == "0"? true : false);

    div.appendChild(btnRemoveProduct);
    div.appendChild(sel);
    div.appendChild(_br);
    div.appendChild(rdoActive);
    div.appendChild(rdoInActive);

    divParent.appendChild(div);
}
// -- Step 2-6. Create Product Select Item List
function newProduct_2_6_productSelList_FromDB(value){
    // select box
    var sel = document.createElement('select');
    sel.setAttribute('style','margin-bottom:5px; width:110px;height:24px; float:left;');
    sel.className = "selProduct"; // className = selProduct. This will be useful when we insert into DB


    // Append options to select box
    for (var i = 0; i < product_Array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", product_Array[i][1]);
        option.text = product_Array[i][1];

        if( option.value == value){
            option.setAttribute("selected", "selected");
        }

        sel.appendChild(option);
    }
    return sel;
}

// This function is used to create step after entering the main process title
function createStepAfterMainProcessFromDB(lineName, stage, div, subResult) {

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
    var row = $(div).parent().parent()[0];

    // if no sub step or blank
    if(subResult.NAME == null) {
        var blank_td = document.createElement("td");
        blank_td.setAttribute("data-id", (stage));
        blank_td.setAttribute("class", "mainProcess");
        blank_td.setAttribute("style", "width:970px");
        row.appendChild(blank_td);
    }else{
        var divColor = document.createElement("div");
        divColor.setAttribute("style", "background-color: #B7C9EF; padding: 3px;");

        // Plus button
        // var buttPlus = mainPlusButton(lineName, rowNum, txt);
        var buttPlus = mainPlusButton(lineName); // mainPlusIB_1_s_1

        // Move button
        var buttMove = mainMoveButton(lineName);

        // Minus button
        // var buttMinus = mainMinusButton(lineName, rowNum, txt);
        var buttMinus = mainMinusButton(lineName);

        // Select Box
        // var sel = mainStepSelectBox(lineName, rowNum, txt, txtValue);

        var txtMain = mainTextBoxFromDB(subResult.NAME);
        // $(txtMain).change();



        // txtMain.setAttribute("value", subResult.NAME);

        // Column
        var td = document.createElement("td");

        divColor.appendChild(buttMinus);
        divColor.appendChild(txtMain);
        divColor.appendChild(buttPlus);
        var _br = document.createElement("br");
        _br.setAttribute("class","clear:both");
        divColor.appendChild(_br);
        divColor.appendChild(buttMove);
        td.appendChild(divColor);
        td.setAttribute("data-id", stage);
        td.setAttribute("class","mainProcess");
        // td.setAttribute("style", "width:970px");

        row.appendChild(td);
        if(subResult.PROCESS_MACHINE != null) {
            for(var k=0; k < subResult.PROCESS_MACHINE.length; k++) {
                createSubStepItemFromDB(buttPlus, subResult.PROCESS_MACHINE[k], subResult.NAME, txtMain);
            }
        }
    }
}

// -- Step 6 - Add Sub Step of Each main step
function createSubStepItemFromDB(btnObj, subResult, selectedProcess, selObj){

    // Textbox
    var textBox = createSubStepTextBox();
    textBox.setAttribute("value", subResult.SEQ);
    // Div for one sub step
    var div = createDivSubStep();

    // Select for process select box
    // var arrProcess = ["공정","1차V홈높이",	"1차V홈높이최대",	"1차V홈높이최소",	"1차드릴수",	"1차불균형량",	"1차압입하중",	"2차압입하중",	"3차압입하중"];
    // var selProcess = createSelectBoxFromDB(process_Array, "subProcess", "mod_select", subResult.REF_PROCESS);

    // Select for process select box
    // var arrMachine = ["설비","1차압입하중-압입기 1","2차압입하중-압입기 2","3차압입하중-압입기 3"];
    // var selMachine = createSelectBoxFromDB(machine_Array, "subMachine", "machine_select", subResult.REF_MACHINE);

    // $(selMachine).find("option:contains('" + subResult.REF_MACHINE + "')").prop("selected", true);

    // $(selMachine).val("");

    var selMachine = createSelectedMachine("machine_select");
    lines.getSpecificMachine(selectedProcess, subResult.REF_MACHINE, selMachine);




    // Minus button
    var buttMinus = createSubStepMinusButton();

    // Plus button
    var buttPlus = createSubStepPlusButton();

    div.appendChild(buttMinus);
    div.appendChild(textBox);
    // div.appendChild(selProcess);
    div.appendChild(selMachine);
    div.appendChild(buttPlus);
    div.setAttribute("class","subProcess");
    // var td = document.getElementById("td" + lineName + "_" + rowNum + "_s_" + tValue);

    var td = $(btnObj).parent().parent()[0];


    // link div
    var nextSeq = subResult.NEXT_SEQUENCE;
    if (nextSeq != null) {

        var linkArr = nextSeq.split(",");
        for (var z = 0; z < linkArr.length; z++) {
            if(linkArr[z] != "") {
                // console.log("arr = "+linkArr[z]);
                addLinkSubItemFromDB(buttPlus, linkArr[z]);
            }
        }
    }

    // td.className = "tdProcess";
    td.appendChild(div);
}



// This function is used to create process select box
function createSelectedMachine(className){
    // select box for process
    var sel = document.createElement('select');
    sel.setAttribute('class',className);
    sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:105px;height:24px;');
    return sel;
}




// This function is used to create process select box
function createSelectBoxFromDB(process_Array, prefixSel, className, selectedValue){
    // select box for process
    var sel = document.createElement('select');

    sel.setAttribute('class',className);

    if(prefixSel == "subProcess") {
        sel.setAttribute('onchange', 'lines.processChange(this)');
        var option = document.createElement("option");
        option.setAttribute("value", 0); // store Process ID
        option.text = "공정"; // show Process name
        sel.appendChild(option);
        sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:55px;height:24px;');
        sel.width = "auto";
    }else{
        var option = document.createElement("option");
        option.setAttribute("value", selectedValue); // store Process ID
        option.text = selectedValue; // show Process name
        sel.appendChild(option);
        sel.setAttribute('style','float:left; margin-top:5px; margin-left:5px; width:105px;height:24px;');
        sel.width = "auto";
    }

    //Create and append the options
    for (var i = 0; i < process_Array.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", process_Array[i][1]); // store Process ID
        option.text = process_Array[i][1]; // show Process name

        if( option.value == selectedValue){
            option.setAttribute("selected", "selected");
        }

        sel.appendChild(option);
    }
    return sel;
}

// This function is used to create a link text of each sub step item
function addLinkSubItemFromDB(btnObject, linkValue){

    // Link Textbox
    var linkTxt = createTextLink();
    linkTxt.setAttribute("value", linkValue);

    // Link Minus Button
    var linkButton = createMinusLinkButton();

    // Link Div
    var div = createLinkDivSubStep();
    div.appendChild(linkTxt);
    div.appendChild(linkButton);

    var outerDiv = $(btnObject).parent()[0];
    outerDiv.appendChild(div);
}

// function to get existed lineName in the table
function getLineName(){
    var array = [];
    var lineNames = document.getElementsByClassName("spanLineName");
    for(let ln of lineNames){
        array.push(ln.innerText);
    }
    return array;
}

function mainTextBoxFromDB(value){
    // var txtMain = document.createElement("input");
    // txtMain.type = "text";
    // txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px");
    // txtMain.className = "txtMainTitle";
    // txtMain.setAttribute("required", "required");
    // txtMain.placeholder = "공정명을 입력하세요";
    // txtMain.size = "15";

    var txtMain = createSelectBoxFromDB(process_Array, "subProcess", "mod_select", value);
    txtMain.setAttribute("style", "margin-left: 5px; margin-right: 5px; width:100px;height:24px; ");
    txtMain.className = "txtMainTitle";

    return txtMain;
}


function checkProductDuplicated(btnObj){
    var ele = $(btnObj).parent().parent().find(".selProduct");
    // var duplicate = false;
    // for(var i = 0; i<ele.length; i++){
    //     for(var j = i + 1; j < ele.length; j++){
    //         console.log("ele[" + i + "] = " + ele[i].val());
    //         console.log("ele[" + j + "] =: " + ele[j].val());
    //         if(ele[i].val() == ele[j].val())
    //             duplicate = true;
    //     }
    // }

    // for(let p of ele){
    //     console.log(p.val());
    // }
    // if(duplicate){
    //     console.log("duplicate");
    // }else{
    //     console.log("okay");
    // }
    var array = [];
    var count = $(btnObj).parent().parent().find(".selProduct").length;
    $.each($(btnObj).parent().parent().find(".selProduct"), function(keyProcess, process) {
        array.push($(process).val());

    });

    array = $.unique(array);
    console.log("array = " + array.length);
    console.log("count = " + count);
    if(array.length != count){
        swal("복제!");
    }else{
        console.log("okay");
    }

}
// ===================== END: READ FROM DATABASE =====================================================