var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http, $filter) {

    /**
     * Variable
     */

    $scope.abnormals;
    $scope.factory;
    $scope.department;
    $scope.data = {
        "name" : "",
        "order by" : ""
    };

    $scope.abnormalID;

    $scope.selectCtrl = this;
    // $scope.selectCtrl.selectedValue = "2";

    $scope.statusLineCheckOpt= this;
    $scope.statusLineCheckOpt.selected="0";


    $scope.findAll = function(){
        var post = $http({
            method: "POST",
            url: "/v3/api/fukoku/abnormal-mgt/find",
            dataType: 'json',
            data : JSON.stringify($scope.data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            // Reset values
            $scope.abnormals = null;
            $scope.factory = null;
            $scope.department = null;
            $scope.checkBoxLines = null;

            if(response.code == 200){
                $scope.abnormals = response.data;
            }else{
                $scope.message = response.message;
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }
    /*******************************************************************************
     * Onload()
     *******************************************************************************/
    $scope.findAll($scope.data);


    /*******************************************************************************
     * Event()
     *******************************************************************************/
    $scope.selectByAbnormal = function(){
        $scope.abnormalID = parseInt($scope.selectCtrl.selectedValue);
        $scope.factory = $filter('filter')($scope.abnormals, {"id": $scope.abnormalID})[0].factory.name;
        $scope.department = $filter('filter')($scope.abnormals, {"id": $scope.abnormalID})[0].department.name;
        $scope.checkBoxLines = $filter('filter')($scope.abnormals, {"id": $scope.abnormalID})[0].lst_line;

        $scope.createFirstColumn();

    }

    //========== Step 1 -  Create the first column to add button for starting the new step
    $scope.createFirstColumn = function(){
        if(!isExisted("stepHeader")) {
            var theader = document.getElementById("tableHeader");

            var th = document.createElement("th");
            th.innerText = "다계추가";
            th.id = "stepHeader";

            theader.appendChild(th);

            var tboday = document.getElementById("abnormalTable");

            var stepName = "step0";
            var tr = document.createElement("tr");
            tr.id = "tr" + stepName;
            tr.className = "tr" + stepName;
            tr.setAttribute("data-id", "0");

            var td = document.createElement("td");
            td.id = "td" + stepName;
            td.className = "td" + stepName;

            var btn = createButton("다계추가", "btnStep");
            td.appendChild(btn);
            tr.appendChild(td);
            tboday.appendChild(tr);


        }
    }

    $(document).on('click', '#btnStep', function() {

        var txtValue = "";

        swal({
                title: "이상조치단계",
                // text: "이름이 뭐예요?",
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
                    createStepAfterEnteringTitle(txtValue, this);
                    return true;
                }
            });
    });

    function isExisted(id){
        var item = document.getElementById(id);
        if(item){
            return true;
        }else{
            return false;
        }
    }





    /*
    $("#btnStep0").click(function(){

    });
    */

    // Step 1.1 - Create step button after selecting abnormal selectbox
    function createButton(btnName, btnId){
        var btn = document.createElement("button");
        btn.setAttribute("type","button");
        btn.setAttribute("class","btn btn-primary");
        btn.innerText = btnName;
        btn.setAttribute("id",btnId);

        return btn;
    }




    // Step 2.2 - This function is used to create step after entering the title
    function createStepAfterEnteringTitle(txtValue, btnObj) {

        // Get the row Id which the user wants to move the TD
        var rowID = $(btnObj).parent().parent().parent().attr("id");
        var stepName = $(btnObj).parent().parent().attr("data-id");

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
                th.innerText = "이상단계" + i;
                th.id = "headerStep_" + i;
                th.setAttribute("data-id", i);
                th.setAttribute("style","width:237px;");

                var btn = buttonDeleteStepHeader(th.getAttribute("data-id"));
                th.appendChild(btn);
                theader.appendChild(th);
            }
        }

    }


    /*******************************************************************************
     * Help Functions
     *******************************************************************************/

    function displayDialog(newStage, txtStatus){
        setTimeout(function(){
            swal({
                    title: "단계이동 안 되요!",
                    text: "이상조치단계" + newStage + " " + txtStatus,
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

});

