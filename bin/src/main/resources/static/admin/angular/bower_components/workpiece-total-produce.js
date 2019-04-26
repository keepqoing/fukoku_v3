var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http , $compile,$interval) {

    $scope.lines;
    $scope.total_assign_product;

    $scope.line1;
    $scope.line2;
    $scope.line3;
    $scope.line4;

    $scope.target1;
    $scope.target2;
    $scope.target3;
    $scope.target4;

    $scope.producedProductByLine=[6];


    $scope.lineList = function(){
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/line-list",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response" , response )
                $scope.lines = response.lines;
            }else{
                $scope.lines = "Error!";
            }

            $scope.findAssignedProducedProductList();

        });
        post.error(function (data, status) {
            console.log(data);
        });

    }

    $scope.findAssignedProducedProduct = function(){
        //openLoading();
        data = {
            "LINE_NAME": $("#selectLine").val(),
            "START_TIME": $("#startTime").find("input").val()
        };
        console.log(data);
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/findTargetAndProducedProduct",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response" , response )
                //$scope.generateGraph(response);
                var lineNamePlusModel = [6];var lineNamePlusModelBlue = [6];var lineNamePlusModelBlueTarget = [6];
                lineNamePlusModel[0]= ""; lineNamePlusModel[1]= "";lineNamePlusModel[2]= ""; lineNamePlusModel[3]= "";lineNamePlusModel[4]= "";lineNamePlusModel[5]= "";lineNamePlusModel[6]= "";
                lineNamePlusModelBlue[0]= ""; lineNamePlusModelBlue[1]= "";lineNamePlusModelBlue[2]= ""; lineNamePlusModelBlue[3]= "";lineNamePlusModelBlue[4]= "";lineNamePlusModelBlue[5]= "";

                var lineArr = ["IB","HC","HD","PD","HA","HB"];
                for(l=0; lineArr.length  >  l ; l++) {
                    for (j = 0; response.getWorkPlanGroupByModel.length > j; j++) {
                        if (response.getWorkPlanGroupByModel[j].ref_line == lineArr[l]) {
                            lineNamePlusModelBlueTarget[l] = response.getWorkPlanGroupByModel[j].target;
                            lineNamePlusModelBlue[l] += "" +
                                ((response.getWorkPlanGroupByModel[j].target == null || response.getWorkPlanGroupByModel[j].target == 0) ? "작업계획없음" : response.getWorkPlanGroupByModel[j].ref_product + " : " + response.getWorkPlanGroupByModel[j].target) + " ,";
                        }
                    }
                }


                $scope.producedProductByLine[0]=0;$scope.producedProductByLine[1]=0;$scope.producedProductByLine[2]=0;$scope.producedProductByLine[3]=0;$scope.producedProductByLine[4]=0;$scope.producedProductByLine[5]=0;$scope.producedProductByLine[6]=0;

                for(m=0;response.getMaxDsAndTargetByModelFromLastMachine.length > m;m++){
                   if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "IB"){
                       // lineNamePlusModel[0] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                       $scope.producedProductByLine[0] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                    }
                    if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HC"){
                       // lineNamePlusModel[1] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                        $scope.producedProductByLine[1] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                   }
                    if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HD"){
                       // lineNamePlusModel[2] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                        $scope.producedProductByLine[2] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                    }
                    if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HA"){
                       // lineNamePlusModel[3] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                        $scope.producedProductByLine[3] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                    }
                    if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "PD"){
                       // lineNamePlusModel[4] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                        $scope.producedProductByLine[4] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                    }
                    if(response.getMaxDsAndTargetByModelFromLastMachine[m].ref_line == "HB"){
                       // lineNamePlusModel[5] += ""+response.getMaxDsAndTargetByModelFromLastMachine[m].model + ":"+ response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds+",";
                        $scope.producedProductByLine[5] += response.getMaxDsAndTargetByModelFromLastMachine[m].max_ds;
                    }

                }

                for(let p = 0; lineArr.length > p  ; p++){
                    console.log(p , p+ " --- "+ lineNamePlusModelBlue[p]);
                    if(lineNamePlusModelBlue[p] == ""){
                        lineNamePlusModelBlue[p] = "작업계흭없음";
                    }
                }

                $scope.line1 = "("+lineNamePlusModelBlue[0].slice(0, -1)+") "  + response.TargetAndProducedProduct[0].line_name ;
                $scope.line2 = "("+lineNamePlusModelBlue[1].slice(0, -1)+") "  +response.TargetAndProducedProduct[1].line_name ;
                $scope.line3 = "("+lineNamePlusModelBlue[2].slice(0, -1)+") "  +response.TargetAndProducedProduct[2].line_name ;
                $scope.line4 = "("+lineNamePlusModelBlue[3].slice(0, -1)+") "  +response.TargetAndProducedProduct[3].line_name ;
                $scope.line5 = "("+lineNamePlusModelBlue[4].slice(0, -1)+") "  +response.TargetAndProducedProduct[4].line_name ;
                $scope.line6 = "("+lineNamePlusModelBlue[5].slice(0, -1)+") "  +response.TargetAndProducedProduct[5].line_name ;

                $scope.target1 = lineNamePlusModelBlueTarget[0];
                $scope.target2 = lineNamePlusModelBlueTarget[1];
                $scope.target3 = lineNamePlusModelBlueTarget[2];
                $scope.target4 = lineNamePlusModelBlueTarget[3];
                $scope.target5 = lineNamePlusModelBlueTarget[4];
                $scope.target6 = lineNamePlusModelBlueTarget[5];

                $scope.generateGraph(response);
                //$scope.findAssignedProducedProductHbase();

            }else{

                $scope.generateGraph(response);

                //$scope.generateGraph(response);
               // $scope.lines = "Error!";
               // alert(response.message);
            }
           // closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
           // closeLoading();
        });

    };


    $scope.findAssignedProducedProductHbase = function(){
        console.log(data);
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/workpiece/findTargetAndProducedProductHbase",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response2" , response )
                $scope.generateGraph(response);
            }else{
                $scope.generateGraph(response);
            }
        });
        post.error(function (data, status) {
            console.log(data);
        });

    };



    $scope.findAssignedProducedProduct();


    var i=0;
    $interval(function(){
        //$scope.findAssignedProducedProduct();
        //console.log(i++)
    },10000);



    
    $scope.generateGraph = function (response) {
        $scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 0,
                    left: 400
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',f')(d)
                    }
                }
            }
        };

        if( $("#selectLine").val() != ""){
            $scope.data = [

                {
                    "key": "생산제품수" , //"Produced Product",
                    "color": "#d62728",
                    "values": [
                        {
                            "label" : response.TargetAndProducedProduct[0].line_name ,
                            "value" : response.TargetAndProducedProduct[0].products
                        }
                    ]
                },
                {
                    "key": "생산계획제품수",///"Target Product",
                    "color": "#1f77b4",
                    "values": [
                        {
                            "label" : response.TargetAndProducedProduct[0].line_name ,
                            "value" : response.TargetAndProducedProduct[0].target
                        }
                    ]
                }
            ]

        }else{
            $scope.data = [

                {
                    "key": "생산제품수" , //"Produced Product",
                    "color": "#d62728",
                    "values": [
                        {
                            "label" : $scope.line1 ,
                            //"value" : response.TargetAndProducedProduct[0].products == null ? 0 :response.TargetAndProducedProduct[0].products
                            "value" : $scope.producedProductByLine[0] == null ? 0 : $scope.producedProductByLine[0]
                        },
                        {
                            "label" : $scope.line2 ,
                            //"value" : response.TargetAndProducedProduct[1].products == null ? 0 :response.TargetAndProducedProduct[1].products
                            "value" : $scope.producedProductByLine[1] == null ? 0 : $scope.producedProductByLine[1]
                        },
                        {
                            "label" : $scope.line3 ,
                            //"value" : response.TargetAndProducedProduct[2].products == null ? 0 :response.TargetAndProducedProduct[2].products
                            "value" : $scope.producedProductByLine[2] == null ? 0 : $scope.producedProductByLine[2]
                        },
                        {
                            "label" : $scope.line4 ,
                            //"value" : response.TargetAndProducedProduct[3].products == null ? 0 :response.TargetAndProducedProduct[3].products
                            "value" : $scope.producedProductByLine[3] == null ? 0 : $scope.producedProductByLine[3]
                        },
                        {
                            "label" : $scope.line5 ,
                            //"value" : response.TargetAndProducedProduct[4].products == null ? 0 :response.TargetAndProducedProduct[4].products
                            "value" : $scope.producedProductByLine[4] == null ? 0 : $scope.producedProductByLine[4]
                        },{
                            "label" : $scope.line6 ,
                            //"value" : response.TargetAndProducedProduct[5].products == null ? 0 :response.TargetAndProducedProduct[5].products
                            "value" : $scope.producedProductByLine[5] == null ? 0 : $scope.producedProductByLine[5]
                        }
                    ]
                },
                {
                    "key": "생산계획제품수",///"Target Product",
                    "color": "#1f77b4",
                    "values": [
                        {
                            "label" : $scope.line1,
                            "value" : $scope.target1 == null ? 0 : $scope.target1
                        },
                        {
                            "label" : $scope.line2,
                            "value" : $scope.target2 == null ? 0 : $scope.target2
                        },
                        {
                            "label" : $scope.line3,
                            "value" : $scope.target3 == null ? 0 : $scope.target3
                        },
                        {
                            "label" : $scope.line4,
                            "value" : $scope.target4 == null ? 0 : $scope.target4
                        },
                        {
                            "label" : $scope.line5,
                            "value" : $scope.target5 == null ? 0 : $scope.target5
                        },
                        {
                            "label" : $scope.line6,
                            "value" : $scope.target6 == null ? 0 : $scope.target6
                        }
                    ]
                }



            ]
        }


    }


    $scope.findAssignedProducedProductList = function(){
        openLoading();
        data = {
            "LINE_NAME": "",
            "START_TIME": $("#startTime").find("input").val()
        };
        console.log(data);
        var post = $http({
            method: "POST",
            url: "/v1/api/fukoku/workpiece/findTargetAndProducedProduct",
            dataType: 'json',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "7777"){
                console.log("response" , response )
                $scope.generateGraph(response);
            }else{
                $scope.generateGraph(response);
                $scope.lines = "Error!";
                alert(response.message);
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    };


    //$scope.lineList();


});