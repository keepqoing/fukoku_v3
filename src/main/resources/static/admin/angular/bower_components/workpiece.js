var app = angular.module('fukoku', ['nvd3','ngSanitize']);

app.controller('MainCtrl', function($scope, $http) {

    $scope.products;
    $scope.machines;

    $scope.listLinesMachinesProducts = function(line,  machine){

        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/lmp",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {

            if(response.code == "200"){
                $scope.products = response.products;
                console.log("products" , $scope.products);
            }else{
                alert("No data");
            }
            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);

        });

    }

    $scope.machineList = function(line,  machine){
        openLoading();
        var post = $http({
            method: "GET",
            url: "/v1/api/fukoku/lmp/machines",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (response, status) {
            if(response.code == "200"){
                $scope.machines = response.machines;
                $scope.listLinesMachinesProducts();
                console.log($scope.machines);
            }else{
                alert("No data");
            }

            closeLoading();
        });
        post.error(function (data, status) {
            console.log(data);
            closeLoading();
        });

    }

    $scope.check = function(classname){
        console.log(classname);
        $('input').not("."+classname).prop('checked', false);
    }


    $scope.machineList();




    $scope.filterData = [];
    //$scope.line = "";
    //$scope.machine ="";
    //$scope.process = [];

    $scope.search =  function(){

        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
       // $scope.processHTML = "";
        console.log($scope.filterData);
        /*
        for(i=0;i<$scope.filterData.length;i++){
            var splitData = $scope.filterData[i].split("*");
            $scope.line = splitData[0];
            $scope.machine = splitData[1];
            $scope.process[i] = splitData[2];

            $scope.processHTML += '<p class="label label-warning">'+splitData[2]+"</p> ";
        }*/
        //$("#line").text($scope.line);
        //$("#machine").text($scope.machine);
        //$("#process").html($scope.processHTML);
        window.location.href = '/admin/workpiece-detail?data='+$scope.filterData;
    };

    $scope.btSearchV3 =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-detail-v3?data='+$scope.filterData;
    };

    $scope.searchCycleTime =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-cycle-time-detail?data='+$scope.filterData;
    };

    $scope.searchCycleTimeMariaDB =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-cycle-time-mariadb?data='+$scope.filterData;
    };


    $scope.searchWorkpieceQuality =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-status-process-quality-detail?data='+$scope.filterData;
    };


    $scope.searchWorkpieceXRchart =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-xchart-rchart-detail?data='+$scope.filterData;
    };

    $scope.btSearchV5 =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-detail-mt?data='+$scope.filterData;
    };

    $scope.btSearchV6 =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-detail-v6?data='+$scope.filterData;
    };



    $scope.btSearchV5HB =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-detail-hb?data='+$scope.filterData;
    };

    $scope.workpieceLineBadType =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/workpiece-line-bad-type-detail?data='+$scope.filterData;
    };



    $scope.btSearchV9 =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/process-quality-management-by-line?data='+$scope.filterData;
    };


    $scope.chProductStatusInfo =  function(){
        $('input[type=checkbox]:checked').each(function(i){
            $scope.filterData[i] = $(this).val().replace(","," ");
        });
        console.log($scope.filterData);
        window.location.href = '/admin/ch-product-status-detail?data='+$scope.filterData;
    };





});