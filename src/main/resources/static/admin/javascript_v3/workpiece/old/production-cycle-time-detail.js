var app = angular.module('fukoku', ['nvd3','ngSanitize']);

//app.config(['$locationProvider', function($locationProvider) {
//	   $locationProvider.html5Mode(true);
//	}]);

app.controller('MainCtrl', function($scope, $http,$location) {
	
	/**
	 * Variable
	 */
	 $scope.totalFound = "0";
	 $scope.colorChart = ['MediumSlateBlue','DarkTurquoise','DarkOrange','DeepPink','Fuchsia','Blue','IndianRed'];
	
	 $scope.data;
	 $scope.workpieceForceY = [];
	 
	 $scope.dayBetween = [] ;
	 $scope.dayIndexBetween = 0 ;
	 
	 $scope.processesSelected = [];
	 $scope.seletedDate ="";
	
	 
	 $scope.labelLine = $location.search().l;
	 $scope.labelMachine = $location.search().m;
	 $scope.labelProduct = $location.search().p;
	 $scope.labelProcess = $location.search().pr;
	 $scope.labelUsl = $location.search().usl;
	 $scope.labelLsl = $location.search().lsl;

	
	/***
	 * Function()
	 */
	 $scope.generateGraph = function () {
		 console.log("generateGraph");
		 $scope.options = {
		            chart: {
		                type: 'linePlusBarChart',
		                height: 500,
		                margin: {
		                    top: 30,
		                    right: 75,
		                    bottom: 100,
		                    left: 75
		                },
		                bars: {
		                    //forceY: 0
		                    forceY: $scope.workpieceForceY
		                },
		                bars2: {
		                    forceY: [0]
		                },
		                yDomain:  $scope.workpieceForceY,
		                color: ['MediumSlateBlue','DarkTurquoise','DarkOrange','DeepPink','Fuchsia','Blue','IndianRed'],
		                x: function(d,i) { return i },
		                xAxis: {
		                    axisLabel: 'X Axis',
		                    tickFormat: function(d) {
		                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
		                        if (dx > 0) {
		                            return d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(dx))
		                        }
		                        return null;
		                    },
		                    rotateLabels: 30,
		                },
		                x2Axis: {
		                    tickFormat: function(d) {
		                    	var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
		                        //return d3.time.format('%b-%Y')(new Date(dx))
		                    },
		                    showMaxMin: false
		                },
		                y1Axis: {
		                    axisLabel: 'Y1 Axis',
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    },
		                    axisLabelDistance: 12
		                },
		                y2Axis: {
		                    axisLabel: 'Y2 Axis',
		                    tickFormat: function(d) {
		                    	return d3.format(',f')(d)
		                    }
		                },
		                y3Axis: {
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    }
		                },
		                y4Axis: {
		                    tickFormat: function(d) {
		                    	return d3.format(',f')(d)
		                    }
		                },
		                callback: function(chart) {
		                   
		                }
		            }
		        };

		       	
		 
		 
	 }
	
        
	
        /***
    	* Function()
    	*/
    	  $scope.findWorkpieces = function(line, product, machine, processes, startDate, endDate){
    		  	
    		  params = {
					  "line": line,
					  "product": product,
					  "machine": machine,
					  "processes": processes,
					  "startTime": startDate,
					  "stopTime": endDate
			};
    			console.log(params);
    			var post = $http({
    	            method: "POST",
    	            url:  "/v3/api/fukoku/workpiece-process-cycle-time/real-time",
    	            dataType: 'json',
    	            data: JSON.stringify(params),
    	            headers: { "Content-Type": "application/json" }
    	        });
    			post.success(function (response, status) {
    				
    				$(".blockDisplay").show();
    				var t0 = performance.now();
    				
    				console.log(response);
    				if(response.code == 200){
    					$("#totalFound").html(
    							" <span class='label label-success' style='font-size:14px'>검색결과: "+response.data.length+"건 </span>&ensp; " +
    							" <span class='label label-success' style='font-size:14px'>Query Time: "+response.query_time_second+" second(s)</span>&ensp; " +
    							" <span class='label label-success' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+" second(s)</span>"							
    					);
    					
    					workpieces = [];
    					$scope.workpieceForceY = [response.single_data.min_bar,response.single_data.max_bar];
    					var machine_cycle_time = [];
    	                var process_cycle_time = [];
    	                var process_interval_cycle_time = [];
    	                var production_cycle_time = [];
    	                for (i = 0; i < response.data.length; i++) {
    	                	 if(response.data[i].machine_cycle_time != null || 
    	                			 response.data[i].process_cycle_time != null || 
    	                			 response.data[i].process_interval_cycle_time != null || 
    	                			 response.data[i].production_cycle_time != null){
    	                		 
    	                         for (j = 0; j < response.data[i].machine_cycle_time.length; j++) {
    	                        	 machine_cycle_time.push(response.data[i].machine_cycle_time[j]);
    	                        	 process_cycle_time.push(response.data[i].process_cycle_time[j]);
    	                        	 process_interval_cycle_time.push(response.data[i].process_interval_cycle_time[j]);
    	                        	 production_cycle_time.push(response.data[i].production_cycle_time[j]);
    	                         }
    	                     }
    	                }
    	                
    	                var dataArrObj = [];
    	                
    	                var dataValueObj1 = {};
    	                dataValueObj1.key = "machine_cycle_time";
    	                dataValueObj1.bar = true;
    	                dataValueObj1.values = machine_cycle_time;
    	                dataValueObj1.color = "MediumSlateBlue"
    	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);

    	                // Fuchsia","Aqua"
    	                var dataValueObj2 = {};
    	                dataValueObj2.key = "process_cycle_time";
    	                dataValueObj2.values = process_cycle_time;
    	                dataValueObj2.bar = false;
    	                dataValueObj2.color = "Lime"
    	                //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);

    	                var dataValueObj3 = {};
    	                dataValueObj3.key = "process_interval_cycle_time";
    	                dataValueObj3.values = process_interval_cycle_time;
    	                dataValueObj3.bar = false;
    	                dataValueObj3.color = "Red"
    	                //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
    	                
    	                var dataValueObj4 = {};
    	                dataValueObj4.key = "production_cycle_time";
    	                dataValueObj4.values = production_cycle_time;
    	                dataValueObj4.bar = false;
    	                dataValueObj4.color = "DeepPink"
    	                //dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj4);
    					
    	                $scope.data = null
    	                $scope.data = dataArrObj.map(function(series) {
    	                    series.values = series.values.map(function(d) {
    	                        return {
    	                            x: 			d[0],
    	                            y: 			d[1],
    	                            process: 	d[2],
    	                            product: 	d[3],
    	                            seq: 		d[4],
    	                            usl: 		d[5],
    	                            lsl: 		d[6],
    	                            date: 		d[7],
    	                            seq: 		d[8],
    	                            quality: 	d[9]
    	                        }
    	                    });
    	                    return series;
    	                });
    	                
    	                console.log($scope.data);
    	                
    	                $scope.generateGraph();
    	                
    				}else{
    					$("#totalFound").html(
    							" <span class='label label-warning' style='font-size:14px'>검색결과: "+0+"건 </span>&ensp; " +
    							" <span class='label label-warning' style='font-size:14px'>Query Time: "+response.query_time_second+"</span>&ensp; " +
    							" <span class='label label-warning' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+"</span>&ensp;"							
    					);
    					 $scope.workpieceForceY =[0,0];
    					 $scope.data = [];
    					 $scope.generateGraph();
    				}
    				 
    				var t1 = performance.now();
    				console.log("Call to doSomething took " + (t1 - t0) / 1000 + " Second(s)")
    				$("#totalFound").append(" <span class='label label-warning' style='font-size:14px'>Javascript: "+(t1 - t0) / 1000 + " Second(s)</span>" );
    			});
    		    post.error(function (data, status) {
    		            console.log(data);
    		    });
    			
    					
    					
    		};
	
	
	
	
	/*******************************************************************************
	 * Onload()
	 *******************************************************************************/
	
	
	
	
	
	
	/*******************************************************************************
	 * Event()
	 *******************************************************************************/
    		/** New Process Design ****/
    		 /*
    		 $scope.btSearch = function(){
    			 
    			  var start = $("#startTime").find("input").val();
    		      var end = $("#endTime").find("input").val();
    		      var currentDate = new Date(start);
    		      var newEnd = new Date(end);
    		      $scope.dayBetween = [];
    		 	  $scope.dayIndexBetween = 0 ;
    		      while (currentDate <= newEnd) {
    		    	  $scope.dayBetween.push($scope.formatDateTime(new Date(currentDate)));
    		          currentDate.setDate(currentDate.getDate() + 1);
    		      }
    		      console.log($scope.dayBetween);
    		      
    			 	$scope.processesSelected = [];
    			 	$scope.processesSelected.push($location.search().pr);
//    				$('input[name="ckProcess"]:checked').each(function() {
//    					   console.log(this.value);
//    					   $scope.processesSelected.push(this.value);
//    				});
    				
    				$scope.findWorkpieces( $location.search().l , $location.search().p ,
    						$location.search().m  , $scope.processesSelected  ,$scope.dayBetween[0],$scope.dayBetween[0]);
    				
    				$scope.seletedDate = $scope.dayBetween[0];
    				
    				if($scope.dayIndexBetween == 0 ){
    					 $("#previous").prop('disabled', true);
    				 }else{
    					 $("#previous").prop('disabled', false);
    				 }
    		 };
    		
    		 $scope.all = function(){
    			 $scope.dayIndexBetween=0;
    			 $scope.findWorkpieces( $location.search().l , $location.search().p ,
    						$location.search().m  , $scope.processesSelected,
    						$scope.dayBetween[0],
    						$scope.dayBetween[$scope.dayBetween.length-1]);
    			 $scope.seletedDate = "All: "+ $scope.dayBetween[0] +" to "+ $scope.dayBetween[$scope.dayBetween.length-1];
    			 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    				 $("#next").prop('disabled', true);
    			 }else{
    				 $("#next").prop('disabled', false);
    			 }
    			 if($scope.dayIndexBetween == 0 ){
    				 $("#previous").prop('disabled', true);
    			 }else{
    				 $("#previous").prop('disabled', false);
    			 }
    		 }
    		 $scope.previous = function(){
    			 $scope.dayIndexBetween-=1 ;
    			 $scope.findWorkpieces( $location.search().l , $location.search().p ,
    						$location.search().m  , $scope.processesSelected, 
    						$scope.dayBetween[$scope.dayIndexBetween],
    						$scope.dayBetween[ $scope.dayIndexBetween]);
    			 $scope.seletedDate = $scope.dayBetween[$scope.dayIndexBetween];
    			 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    				 $("#next").prop('disabled', true);
    			 }else{
    				 $("#next").prop('disabled', false);
    			 }
    			 if($scope.dayIndexBetween == 0 ){
    				 $("#previous").prop('disabled', true);
    			 }else{
    				 $("#previous").prop('disabled', false);
    			 }
    		 }
    		 $scope.next = function(){
    			 $scope.dayIndexBetween+=1 ;
    			 $scope.findWorkpieces( $location.search().l , $location.search().p ,
    						$location.search().m  , $scope.processesSelected,
    						$scope.dayBetween[ $scope.dayIndexBetween],
    						$scope.dayBetween[ $scope.dayIndexBetween]);
    			 $scope.seletedDate = $scope.dayBetween[$scope.dayIndexBetween];
    			 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    				 $("#next").prop('disabled', true);
    			 }else{
    				 $("#next").prop('disabled', false);
    			 }
    			 if($scope.dayIndexBetween == 0 ){
    				 $("#previous").prop('disabled', true);
    			 }else{
    				 $("#previous").prop('disabled', false);
    			 }
    		 }
    		 */
    			
    			/*** Old Process design ***/
    			$scope.btSearch = function(){
    				  
    				  var start = $("#startTime").find("input").val();
    			      var end = $("#endTime").find("input").val();
    			      var currentDate = new Date(start);
    			      var newEnd = new Date(end);
    			      $scope.dayBetween = [];
    			 	  $scope.dayIndexBetween = 0 ;
    			      while (currentDate <= newEnd) {
    			    	  $scope.dayBetween.push($scope.formatDateTime(new Date(currentDate)));
    			          currentDate.setDate(currentDate.getDate() + 1);
    			      }
    			      console.log($scope.dayBetween);
    			      
    				 	$scope.processesSelected = [];
    					$('input[name="ckProcess"]:checked').each(function() {
    						   console.log(this.value);
    						   $scope.processesSelected.push(this.value);
    					});
    					
    					$scope.findWorkpieces($("#selectLine").val() , $("#selectProduct").val() ,
    							$("#selectMachine").val()  , $scope.processesSelected,$scope.dayBetween[0],$scope.dayBetween[0]);
    					
    					$scope.seletedDate = $scope.dayBetween[0];
    					
    					if($scope.dayIndexBetween == 0 ){
    						 $("#previous").prop('disabled', true);
    					 }else{
    						 $("#previous").prop('disabled', false);
    					 }
    			 };
    			
    			 $scope.all = function(){
    				 $scope.dayIndexBetween=0;
    				 $scope.findWorkpieces($("#selectLine").val() , $("#selectProduct").val() ,
    							$("#selectMachine").val()  , $scope.processesSelected,
    							$scope.dayBetween[0],
    							$scope.dayBetween[$scope.dayBetween.length-1]);
    				 $scope.seletedDate = "All: "+ $scope.dayBetween[0] +" to "+ $scope.dayBetween[$scope.dayBetween.length-1];
    				 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    					 $("#next").prop('disabled', true);
    				 }else{
    					 $("#next").prop('disabled', false);
    				 }
    				 if($scope.dayIndexBetween == 0 ){
    					 $("#previous").prop('disabled', true);
    				 }else{
    					 $("#previous").prop('disabled', false);
    				 }
    			 }
    			 $scope.previous = function(){
    				 $scope.dayIndexBetween-=1 ;
    				 $scope.findWorkpieces($("#selectLine").val() , $("#selectProduct").val() ,
    							$("#selectMachine").val()  , $scope.processesSelected, 
    							$scope.dayBetween[$scope.dayIndexBetween],
    							$scope.dayBetween[ $scope.dayIndexBetween]);
    				 $scope.seletedDate = $scope.dayBetween[$scope.dayIndexBetween];
    				 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    					 $("#next").prop('disabled', true);
    				 }else{
    					 $("#next").prop('disabled', false);
    				 }
    				 if($scope.dayIndexBetween == 0 ){
    					 $("#previous").prop('disabled', true);
    				 }else{
    					 $("#previous").prop('disabled', false);
    				 }
    			 }
    			 $scope.next = function(){
    				 $scope.dayIndexBetween+=1 ;
    				 $scope.findWorkpieces($("#selectLine").val() , $("#selectProduct").val() ,
    							$("#selectMachine").val()  , $scope.processesSelected,
    							$scope.dayBetween[ $scope.dayIndexBetween],
    							$scope.dayBetween[ $scope.dayIndexBetween]);
    				 $scope.seletedDate = $scope.dayBetween[$scope.dayIndexBetween];
    				 if($scope.dayIndexBetween == $scope.dayBetween.length-1 ){
    					 $("#next").prop('disabled', true);
    				 }else{
    					 $("#next").prop('disabled', false);
    				 }
    				 if($scope.dayIndexBetween == 0 ){
    					 $("#previous").prop('disabled', true);
    				 }else{
    					 $("#previous").prop('disabled', false);
    				 }
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

    		 $scope.msToTime = function (duration) {
    		        var myDate = new Date( duration*1000);
    		        return myDate;
    		  }
    		 
    		 $scope.appendObjTo = function (thatArray, objToAppend) {
    		        return Object.freeze(thatArray.concat(objToAppend));
    		  }
    		 
     
    		 /***********************************************************
    		  *  Params
    		  ************************************************************/
    		 /**
    			 * Variable
    			 */
    			$scope.lines;
    			$scope.machines;
    			$scope.processes;
    			$scope.products;
    		    
    		    
    		       

    			
    			/***
    			 * Function()
    			 */
    			

    		    $scope.findLineByLineName = function(lineName){  
    		        var post = $http({
    		            method: "GET",
    		            url: "/v1/api/fukoku/line/"+lineName,
    		            dataType: 'json',
    		            headers: { "Content-Type": "application/json" }
    		        });
    		        post.success(function (response, status) {
    		            if(response.code == "200"){
    		                $scope.lines = response.data;
    		            }else{
    		            	
    		            }
    		            console.log( $scope.lines);
    		        });
    		        post.error(function (data, status) {
    		            console.log(data);
    		        });
    		    }
    		    
    		    $scope.findMachineByLineName = function(lineName){  
    		        var post = $http({
    		            method: "GET",
    		            url: "/v1/api/fukoku/machine/"+lineName,
    		            dataType: 'json',
    		            headers: { "Content-Type": "application/json" }
    		        });
    		        post.success(function (response, status) {
    		            if(response.code == "200"){
    		                $scope.machines = response.data;
    		            }else{
    		            	
    		            }
    		            console.log( $scope.machines);
    		        });
    		        post.error(function (data, status) {
    		            console.log(data);
    		        });
    		    }
    			
    		    $scope.findProcessByLineNameAndMachineName = function(lineName, machineName){  
    		    	console.log(lineName +" - "+ machineName);
    		        var post = $http({
    		            method: "GET",
    		            url: "/v1/api/fukoku/process/"+lineName+"/"+machineName,
    		            dataType: 'json',
    		            headers: { "Content-Type": "application/json" }
    		        });
    		        post.success(function (response, status) {
    		            if(response.code == "200"){
    		                $scope.processes = response.data;
    		            }else{
    		            	
    		            }
    		            console.log( $scope.processes);
    		        });
    		        post.error(function (data, status) {
    		            console.log(data);
    		        });
    		    }
    		    
    		    $scope.findProductByLine = function(lineName){  
    		        var post = $http({
    		            method: "GET",
    		            url: "/v1/api/fukoku/product/"+lineName,
    		            dataType: 'json',
    		            headers: { "Content-Type": "application/json" }
    		        });
    		        post.success(function (response, status) {
    		            if(response.code == "200"){
    		                $scope.products = response.data;
    		            }else{
    		            	
    		            }
    		            console.log( $scope.products);
    		        });
    		        post.error(function (data, status) {
    		            console.log(data);
    		        });
    		    }
    			
    			
    			/*******************************************************************************
    			 * Onload()
    			 *******************************************************************************/
    		    
    		    $scope.findLineByLineName("NA");
    		    
    			
    			
    			
    			
    			/*******************************************************************************
    			 * Event()
    			 *******************************************************************************/
    		     $("#selectLine").change(function(){
    		    	 $scope.findMachineByLineName($("#selectLine").val());
    		    	 $scope.findProductByLine($("#selectLine").val());
    		     });
    		     
    		     $("#selectMachine").change(function(){ 
    		    	 $scope.findProcessByLineNameAndMachineName($("#selectLine").val(),$("#selectMachine option:selected").html());
    		     });
    		     
    		     /***
    		      * End Params
    		      */
	
	
	
});