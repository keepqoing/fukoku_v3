

var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    var limit = 500;
    var jsonWorkpiecesData = {};
    var workpieces = [];
    $scope.dataTable = {};
    $scope.data = [];
    $scope.workpieceForceY = [];

    $scope.product;
    $scope.lstModel = [];


    $scope.workpieces_group;


    $scope.selectedProcess;


    $scope.responseWorkpiece;


    $scope.colorChart = ['MediumSlateBlue','DarkTurquoise','DarkOrange','DeepPink'];




    $scope.appendObjTo = function (thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend));
    }

    $scope.toTimestamp = function(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }


    $scope.formatDateTime = function date2str(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    $scope.findAllProducts = function(){
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/find-all-product",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.products.length > 0){
                $scope.product = response.products;
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });
    }

    $scope.findProductByLineAndMachine = function(line,  machine){
        console.log("l", line+"/"+machine);
        openLoading();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/find-product/"+line+"/"+machine,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            $('#lineList').empty();
            if(response.products.length > 0){
                console.log("response > 0" , response.products )
                $scope.product = response.products;
                for(i=0;i<response.products.length;i++){
                    $scope.lstModel.push(response.products[i].NAME);
                }


            }else{
                $scope.findAllProducts();
                //console.log("response 0" , tempData);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }



    $scope.findProductByLineAndMachine($("#line").text() , $("#machine").text() );

    /*
    $scope.limitWorkpiece = 50;

    $scope.btNext = function () {
        workpieces = [];
        $("#dataTable").find("tr:not(:first)").remove();
        //$("#chart").empty();
        $scope.limitWorkpiece += 50
        $scope.getData($scope.limitWorkpiece);
    }
    */

    $scope.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.getData = function (limitWorkpiece) {

        $scope.selectedProcess = $('input[name=optionsRadios]:checked').val();

        var selectedProcessArr = [];

        if( $scope.selectedProcess == null){
            alert("Please select 공정: !");
            return;
        }else{
            selectedProcessArr.push($scope.selectedProcess);
        }

        if( $("#selectProduct").val() == ""){
            alert("Please select 품종!");
            return;
        }

        openLoading();

        /*
        startTime = $scope.toTimestamp($("#startTime").find("input").val())    ;
        endTime =  $scope.toTimestamp($("#endTime").find("input").val());

        startDateFormat = $scope.formatDateTime($("#startTime").find("input").val() )    ;
        endDateFormat = $scope.formatDateTime($("#endTime").find("input").val())    ;
        */
        //startTime = $("#startTime").find("input").val()   ;
        //endTime =  $("#endTime").find("input").val();

        startDateFormat = $scope.formatDateTime($("#startTime").find("input").val() )    ;
        endDateFormat = $scope.formatDateTime($("#endTime").find("input").val())    ;

        startTime = $("#startTime").find("input").val();
        endTime =  $("#endTime").find("input").val();

        var pr =  $("#selectProduct").val();
        var models = [];
        if(pr == "ALL"){
            pr = "ALL";
            models = $scope.lstModel;
        }else{
            models.push(pr);
        }

        $scope.totalFound = "";


        data = {
            "END_TIME":   endTime,
            "LINE_NAME": $("#line").text(),
            "PROCESS_NAME" : $scope.selectedProcess,
            //"LIST_PROCESS_NAME": selectedProcessArr,//process,
            "MACHINE_NAME": $("#machine").text(),
            "MODEL":  pr,
            "START_TIME": startTime,
            "lst_model" : models,
            //"startDateFormat" : startDateFormat,
            //"endDateFormat" :  endDateFormat
            //"LIMIT": limitWorkpiece
        };

        console.log(data);


        var post = $http({
            method: "POST",
            //url: "/v1/api/fukoku/workpiece/mybatis-find-workpiece-or-process-model-group",
            url : "/v1/api/fukoku/maria-db/workpiece/find",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (response, status) {

            console.log(response);


            if(response.code == "200" ){

                if(response.workpieces.length == 0){
                    $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                        "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                        "              </div>";
                    closeLoading();
                    return;
                }
                $scope.workpieces_group = response.workpieces_group;
                angular.element( document.querySelector( '#filteringMessage' ) ).empty();
                //$scope.totalFound = "<h3>검색결과: "+response.workpieces.length+" 건</h3>";

                var arrCp = [];
                var arrCpk = [];
                for(var i=0;i<response.workpieces_group.length;i++){
                    var objCp = {};
                    var objCpk = {};

                    objCp["label"] = response.workpieces_group[i].model;
                    objCp["value"] = response.workpieces_group[i].cp;

                    objCpk["label"] = response.workpieces_group[i].model;
                    objCpk["value"] = response.workpieces_group[i].cpk;

                    arrCp.push(objCp);
                    arrCpk.push(objCpk);
                }


                $scope.generateGraph(arrCp , arrCpk );
                closeLoading();
                $("#filteringResult").show();
            }else{
                $scope.filteringMessage = "<div class=\"callout callout-warning\">\n" +
                    "                <h4><i class=\"icon fa fa-warning\"></i> 검색결과: 0 건</h4>\n" +
                    "              </div>";
                //$scope.totalFound = "<h3>검색결과: 0 건</h3>";
                closeLoading();
            }

        });

        post.error(function (data, status) {
            console.log(data);
        });
    }


















    $scope.generateGraph = function (arrCp , arrCpk) {
        $scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 100,
                    left: 100
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                xAxis: {
                    tickFormat: function(d){
                        return d
                    },
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'CP/CPK',
                    tickFormat: function(d){
                        return d
                    }
                }
            }
        };

        $scope.data = [

            {
                "key": "CP",
                "color": "#d62728",
                "values":arrCp
            },
            {
                "key": "CPK",
                "color": "#1f77b4",
                "values":arrCpk
            }



        ]

        console.log(  $scope.data);
    }









});
