var app = angular.module('fukoku', ['nvd3','ngSanitize']);

//app.config(['$locationProvider', function($locationProvider) {
//	   $locationProvider.html5Mode(true);
//	}]);


app.controller('MainCtrl', function($scope, $http,$rootScope, $location) {
	
	/**
	 * Variable
	 */
	 $scope.totalFound = "0";
	 $scope.colorChart = ['MediumSlateBlue','DarkTurquoise','DarkOrange','DeepPink','Fuchsia','Blue','IndianRed'];
	
	 $scope.dataX;
	 $scope.dataR;
	 $scope.workpieceForceY = [];
	 
	 $scope.dayBetween = [] ;
	 $scope.dayIndexBetween = 0 ;
	 
	 $scope.processesSelected = [];
	 $scope.seletedDate ="";
	 
	 $scope.processControls;

	
	 $scope.dataTable = {};
	 
	 $scope.controlLimitX;
	 $scope.controlLimitR;
	
	 $scope.singleData = {};
	 
	 $scope.labelLine = $location.search().l;
	 $scope.labelMachine = $location.search().m;
	 $scope.labelProduct = $location.search().p;
	 $scope.labelProcess = $location.search().pr;
	 $scope.labelUsl = $location.search().usl;
	 $scope.labelLsl = $location.search().lsl;
	 
	/***
	* Function()
	*/
	  $scope.findWorkpieces = function(line, product, machine, processes, startDate, endDate){
		  openLoading();
		  params = {
				  "line": line,
				  "product": product,
				  "machine": machine,
				  "processes": processes,
				  "startTime": startDate,
				  "stopTime": endDate,
				  "lsl":$location.search().lsl,
				  "usl":$location.search().usl
		};
			console.log(params);
			var post = $http({
	            method: "POST",
	            url:  "/v3/api/fukoku/workpiece-spc/real-time",
	            dataType: 'json',
	            data: JSON.stringify(params),
	            headers: { "Content-Type": "application/json" }
	        });
			post.success(function (response, status) {
				var t0 = performance.now();
				
				console.log(response);
				$scope.processControls = null;
				
				$(".blockDisplay").show();
				
				if(response.code == 200){
					
					
					
					$("#totalFound").html(
							" <span class='label label-success' style='font-size:14px'>검색결과: "+response.data.length+"건 </span>&ensp; " +
							" <span class='label label-success' style='font-size:14px'>Query Time: "+response.query_time_second+" second(s)</span>&ensp; " +
							" <span class='label label-success' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+" second(s)</span>"							
					);
					
					
					$scope.controlLimitX  = response.xbar_line;
					$scope.controlLimitR  = response.range_line;
					
					workpieces = [];
					$scope.workpieceForceY = [response.single_data.min_bar,response.single_data.max_bar];
					console.log("workpieceForceY" , $scope.workpieceForceY);
					
					$scope.singleData = response.single_data;
					
					
					/*****
					 *  Range Chart
					 */
	            	var rang_val = [];
	            	var x_bar_val = [];
	            	
	                
	            	var arrRange = [];
	            	var arrAverage= [];
	            	
	            	var x_lcl = []; 
	            	var x_ucl = [];
	            	var x_cl = [];
	            	
	            	var r_lcl = []; 
	            	var r_ucl = [];
	            	var r_cl = [];
	            	
	            	
	                for (i = 0; i < response.data.length; i++) {
	                	 if(response.data[i].rang_val != null || response.data[i].x_bar_val != null){
	                         for (j = 0; j < response.data[i].rang_val.length; j++) {
	                        	 rang_val.push(response.data[i].rang_val[j]);
	                        	 x_bar_val.push(response.data[i].x_bar_val[j]);
	                        	 
	                        	 arrRange.push(response.data[i].rang_val[j][1]);
	                        	 arrAverage.push(response.data[i].x_bar_val[j][1]);
	                        	 
	                        	 /** X-Bar **/
	                        	 var lcl_arr = [];
	                        	 lcl_arr.push(response.data[i].x_bar_val[j][0]);
	                        	 lcl_arr.push(response.xbar_line.lcl);
	                        	 lcl_arr.push(response.data[i].x_bar_val[j][2]);
	                        	 
	                        	 var ucl_arr = [];
	                        	 ucl_arr.push(response.data[i].x_bar_val[j][0]);
	                        	 ucl_arr.push(response.xbar_line.ucl);
	                        	 ucl_arr.push(response.data[i].x_bar_val[j][2]);
	                        	 
	                        	 var cl_arr = [];
	                        	 cl_arr.push(response.data[i].x_bar_val[j][0]);
	                        	 cl_arr.push(response.xbar_line.centerLine);
	                        	 cl_arr.push(response.data[i].x_bar_val[j][2]);
	                        	 
	                        	 x_lcl.push(lcl_arr);
	                        	 x_ucl.push(ucl_arr);
	                        	 x_cl.push(cl_arr);
	                        	 
	                        	 /********* R-Chart **********/
	                        	 var lcl_arrR = [];
	                        	 lcl_arrR.push(response.data[i].rang_val[j][0]);
	                        	 lcl_arrR.push(response.range_line.lcl);
	                        	 lcl_arrR.push(response.data[i].rang_val[j][2]);
	                        	 
	                        	 var ucl_arrR = [];
	                        	 ucl_arrR.push(response.data[i].rang_val[j][0]);
	                        	 ucl_arrR.push(response.range_line.ucl);
	                        	 ucl_arrR.push(response.data[i].rang_val[j][2]);
	                        	 
	                        	 var cl_arrR = [];
	                        	 cl_arrR.push(response.data[i].rang_val[j][0]);
	                        	 cl_arrR.push(response.range_line.centerLine);
	                        	 cl_arrR.push(response.data[i].rang_val[j][2]);
	                        	 
	                        	 r_lcl.push(lcl_arrR);
	                        	 r_ucl.push(ucl_arrR);
	                        	 r_cl.push(cl_arrR);
	                        	 
	                         }
	                     }
	                }
					
	                var dataArrObj = [];
	                
	                var dataValueObj1 = {};
	                dataValueObj1.key = "Range";
	                dataValueObj1.bar = false;
	                dataValueObj1.values = rang_val;
	                dataValueObj1.color = "MediumSlateBlue"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);
	                
	                var dataValueObj2 = {};
	                dataValueObj2.key = "UCL";
	                dataValueObj2.bar = false;
	                dataValueObj2.values = r_ucl;
	                dataValueObj2.color = "red"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);
	                
	                var dataValueObj3 = {};
	                dataValueObj3.key = "LCL";
	                dataValueObj3.bar = false;
	                dataValueObj3.values = r_lcl;
	                dataValueObj3.color = "red"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
	                
	                var dataValueObj3 = {};
	                dataValueObj3.key = "CL";
	                dataValueObj3.bar = false;
	                dataValueObj3.values = r_cl;
	                dataValueObj3.color = "#62b3e2"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
	                
	                $scope.dataR = null
	                $scope.dataR = dataArrObj.map(function(series) {
	                    series.values = series.values.map(function(d) {
	                        return {
	                            x: 			d[0],
	                            y: 			d[1],
	                            date: 	d[2],
	                        }
	                    });
	                    return series;
	                });
	                
	                console.log($scope.dataR);
	                
	                $scope.generateGraph($scope.dataR);
	                
	                
	                
					/**********
					 * X-Bar 
					 */
	                
	                var dataArrObj = [];
	                
	                
	                var dataValueObj1 = {};
	                dataValueObj1.key = "X-Bar";
	                dataValueObj1.bar = false;
	                dataValueObj1.values = x_bar_val;
	                dataValueObj1.color = "#00a65a"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj1);
	                
	                var dataValueObj2 = {};
	                dataValueObj2.key = "UCL";
	                dataValueObj2.bar = false;
	                dataValueObj2.values = x_ucl;
	                dataValueObj2.color = "red"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj2);
	                
	                var dataValueObj3 = {};
	                dataValueObj3.key = "LCL";
	                dataValueObj3.bar = false;
	                dataValueObj3.values = x_lcl;
	                dataValueObj3.color = "red"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
	                
	                var dataValueObj3 = {};
	                dataValueObj3.key = "CL";
	                dataValueObj3.bar = false;
	                dataValueObj3.values = x_cl;
	                dataValueObj3.color = "#62b3e2"
	                dataArrObj = $scope.appendObjTo(dataArrObj, dataValueObj3);
	                
	                
	            	
	                $scope.dataX = null
	                $scope.dataX = dataArrObj.map(function(series) {
	                    series.values = series.values.map(function(d) {
	                        return {
	                            x: 			d[0],
	                            y: 			d[1],
	                            date: 	d[2],
	                        }
	                    });
	                    return series;
	                });
	                
	                console.log($scope.dataX);
	                
	                $scope.generateGraph($scope.dataX);
					
					
	                $("#histogramR, #histogramX").empty()
	                $scope.histogramGraph("histogramR" , arrRange, response.range_line);
	                $scope.histogramGraph("histogramX" , arrAverage , response.xbar_line); 
	                
	                
					
					$scope.processControls = response.data;
					console.log("processControls",$scope.processControls);
					$scope.displayDataInTable($scope.processControls);
					
				
					
				   
					 
				}else{
					
					
					$("#totalFound").html(
							" <span class='label label-warning' style='font-size:14px'>검색결과: "+0+"건 </span>&ensp; " +
							" <span class='label label-warning' style='font-size:14px'>Query Time: "+response.query_time_second+"</span>&ensp; " +
							" <span class='label label-warning' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+"</span>&ensp;"							
					);
					 $scope.workpieceForceY =[0,0];
					 $scope.dataX  = [];
					 $scope.dataR = [];
					 $scope.generateGraph($scope.dataX);
					 $scope.generateGraph($scope.dataR);
					 
					 if ( $.fn.DataTable.isDataTable('#dataTable') ) {
						 $scope.dataTable.destroy(); 
					 }
					 $("#dataTable tbody").empty();
					 $("#histogramR, #histogramX").empty()
					 
				}
				 
				var t1 = performance.now();
				console.log("Call to doSomething took " + (t1 - t0) / 1000 + " Second(s)")
				$("#totalFound").append(" <span class='label label-warning' style='font-size:14px'>Javascript: "+(t1 - t0) / 1000 + " Second(s)</span>" );
			
				 closeLoading();
			});
		    post.error(function (data, status) {
		            console.log(data);
		            closeLoading();
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
//				$('input[name="ckProcess"]:checked').each(function() {
//					   console.log(this.value);
//					   $scope.processesSelected.push(this.value);
//				});
				
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

	
        
	 $scope.generateGraph = function (data) {
		 console.log("generateGraph");
		 
		 $scope.optionsX = {
		            chart: {
		                type: 'lineChart',
		                height: 400,
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
		                focusEnable:false,
		                yDomain:  $scope.workpieceForceY,
		                color: ["red" , "green" , "blue","Orange","Fuchsia","Aqua"],
		                x: function(d,i) { return i },
		                xAxis: {
		                    axisLabel: 'Time',
		                    tickFormat: function(d) {
		                        var dx = data[0].values[d] && data[0].values[d].x || 0;
		                        if (dx > 0) {
		                            return d3.time.format('%Y-%m-%d %H:%M')(new Date(dx))
		                        }
		                        return null;
		                    },
		                    rotateLabels: 30,
		                },
		                x2Axis: {
		                    tickFormat: function(d) {
		                    	var dx = data[0].values[d] && data[0].values[d].x || 0;
		                        //return d3.time.format('%b-%Y')(new Date(dx))
		                    },
		                    showMaxMin: false
		                },
		                yAxis: {
		                    axisLabel: 'Average',
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    },
		                    axisLabelDistance: -10
		                },
		                y1Axis: {
		                    axisLabel: "Average",
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    },
		                    axisLabelDistance: 12
		                },
		                y2Axis: {
		                    axisLabel: '',
		                    tickFormat: function(d) {
		                    	// return  d3.format(',.f')(d)
		                    }
		                },
		                y3Axis: {
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    }
		                },
		                y4Axis: {
		                    tickFormat: function(d) {
		                    	 return '$' + d3.format(',.2f')(d)
		                    }
		                },
		                callback: function(chart) {  
		                	
		                },tooltip: {
		                    contentGenerator: function (graph) { //return html content
		                        var data = null;
		                        if(graph.data != null){
		                            data = graph.data;
		                            // console.log("graph.data" , graph.data);
		                        }else if(graph.point != null){
		                            data = graph.point;
		                            // console.log("graph.point" , graph.point);
		                        }
		                        
		                        var color = "GREEN"
		                        if(data.y < $scope.controlLimitX.lcl || data.y > $scope.controlLimitX.ucl){
		                        	color = "RED"
		                        }

		                        var rows =
		                            "<tr>" +
		                            "<td class='key'>" + 'Time: ' + "</td>" +
		                            "<td class='x-value'>" +  d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(data.date)) + "</td>" +
		                            "</tr>";
		                            
		                        var header =
		                            "<thead>" +
		                            "<tr>" +
		                            "<td class='legend-color-guide'><div style='background-color:"+color+";'></div></td>" +
		                            "<td class='key'><strong>"+data.y+"</strong></td>" +
		                            "</tr>" +
		                            "</thead>";

		                        return "<table>" +
		                             header +
		                            "<tbody>" +
		                            rows +
		                            "</tbody>" +
		                            "</table>";

		                        return '<h1></h1>';
		                    }
		                }
		            }
		        };
		 
		   $scope.optionsR = {
		            chart: {
		                type: 'lineChart',
		                height: 400,
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
		                focusEnable:false,
		                yDomain:  $scope.workpieceForceY,
		                color: ["red" , "green" , "blue","Orange","Fuchsia","Aqua"],
		                x: function(d,i) { return i },
		                xAxis: {
		                    axisLabel: 'Time',
		                    tickFormat: function(d) {
		                        var dx = data[0].values[d] && data[0].values[d].x || 0;
		                        if (dx > 0) {
		                            return d3.time.format('%Y-%m-%d %H:%M')(new Date(dx))
		                        }
		                        return null;
		                    },
		                    rotateLabels: 30,
		                },
		                x2Axis: {
		                    tickFormat: function(d) {
		                    	var dx = data[0].values[d] && data[0].values[d].x || 0;
		                        //return d3.time.format('%b-%Y')(new Date(dx))
		                    },
		                    showMaxMin: false
		                },
		                yAxis: {
		                    axisLabel: 'Range',
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    },
		                    axisLabelDistance: -10
		                },
		                y1Axis: {
		                    axisLabel: "Range",
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    },
		                    axisLabelDistance: 12
		                },
		                y2Axis: {
		                    axisLabel: '',
		                    tickFormat: function(d) {
		                    	// return  d3.format(',.f')(d)
		                    }
		                },
		                y3Axis: {
		                    tickFormat: function(d){
		                    	return d3.format(',f')(d)
		                    }
		                },
		                y4Axis: {
		                    tickFormat: function(d) {
		                    	 return '$' + d3.format(',.2f')(d)
		                    }
		                },
		                callback: function(chart) {
		                	
		                },tooltip: {
		                    contentGenerator: function (graph) { //return html content
		                        var data = null;
		                        if(graph.data != null){
		                            data = graph.data;
		                            // console.log("graph.data" , graph.data);
		                        }else if(graph.point != null){
		                            data = graph.point;
		                            // console.log("graph.point" , graph.point);
		                        }
		                        
		                        var color = "mediumslateblue"
		                        if(data.y < $scope.controlLimitR.lcl || data.y > $scope.controlLimitR.ucl){
		                        	color = "RED"
		                        }

		                        var rows =
		                            "<tr>" +
		                            "<td class='key'>" + 'Time: ' + "</td>" +
		                            "<td class='x-value'>" +  d3.time.format('%Y/%m/%d %H:%M:%S')(new Date(data.date)) + "</td>" +
		                            "</tr>";
		                            
		                        var header =
		                            "<thead>" +
		                            "<tr>" +
		                            "<td class='legend-color-guide'><div style='background-color:"+color+";'></div></td>" +
		                            "<td class='key'><strong>"+data.y+"</strong></td>" +
		                            "</tr>" +
		                            "</thead>";

		                        return "<table>" +
		                             header +
		                            "<tbody>" +
		                            rows +
		                            "</tbody>" +
		                            "</table>";

		                        return '<h1></h1>';
		                    }
		                }
		            }
		        };

		       	
		 
		 
	 }
	 
	 
		 $scope.distinctColor = function(chart){
//			 d3.selectAll('.nvd3 g.nv-scatter g.nv-series-0 path.nv-point')
//     	  	.style('fill', "red");
			 console.log('chart: ',chart);
		            d3.selectAll('.nvd3 g.nv-scatter g.nv-series-0 path.nv-point')
		                .style('fill', function(data, index) {
		                	console.log('data.y: ',data);
		                	if(data.y > 0){
		                            return "RED";
		                      }
		                });
		            
		           var nvd =  d3.selectAll('.nvd3 g.nv-scatter g.nv-series-0 path.nv-point');
		           nvd.style("fill", function(data, index) {
		            //	nv-point nv-point-0
		 		   });
		            
		            
		            
		       

//		            var newBarColor = getBarColor.map(JSON.stringify).reverse().filter(function (e, i, a) {
//		                return a.indexOf(e, i+1) === -1;
//		            }).reverse().map(JSON.parse);
		            //console.log(newBarColor);
		            
		            

		    }
		 
		 
		$scope.displayDataInTable = function(workpieces){ 
		 try{
             $scope.dataTable = $('#dataTable').DataTable({
                 "paging": true,
                 "lengthChange": true,
                 "searching": false,
                 "ordering": true,
                 "info": true,
                 "autoWidth": true,
                 "data": workpieces,
                 "destroy": true,
                 "columns": [
                {
                	"title" : "Work Date",
                	"data" :"productDate"
                } ,
                {
                     "title": "Start Time",
                     "data": "startTime"
                 }, {
                     "title": "Stop Time",
                     "data": "endTime"

                 }, {
                     "title": "Cp",
                     "data": "cp"

                 }, {
                     "title": "Cpk",
                     "data": "cpk"

                 },{
                     "title": "X-Bar",
                     "data": "xBar"
                 },{
                     "title": "R-Chart",
                     "data": "rang"
                 },{
                     "title": "생산수량",
                     "data": "dailySeq"
                 },{
                     "title": "양품수량",
                     "data": "okProduct"
                 },{
                     "title": "불량수량",
                     "data": "ngProduct"
                 }
                 ]
             });

         }catch(err) {
             console.log(err);
         }
	};
	
	
	
	$scope.histogramGraph = function(hmtlId, arrData, controlLimit){
		
		
		// Generate a Bates distribution of 10 random variables.
//		var values = d3.range(1000).map(d3.random.bates(10));
		var values = arrData;
//		console.log("values", values);
		
		
		// A formatter for counts.
		var formatCount = d3.format(",.0f");

		var margin = {top: 10, right: 30, bottom: 30, left: 30},
		    width = 700 - margin.left - margin.right,
		    height = 350 - margin.top - margin.bottom;

		var x = d3.scale.linear()
		    .domain($scope.workpieceForceY)
		    .range([0, width]);

		// Generate a histogram using twenty uniformly-spaced bins.
		var data = d3.layout.histogram()
		    .bins(x.ticks(20))
		    (values);
		// Adding a cum property to the histogram data    
		data.forEach(function(d,i){
			if(i == 0){
		  	d.cum = d.y
		  }else{
		  	d.cum = d.y + data[i-1].cum
		  }
		})

		var y = d3.scale.linear()
		    .domain([0, d3.max(data, function(d) { return d.y; })])
		    .range([height, 0]);
		    
		var yc = d3.scale.linear()
		    .domain([0, d3.max(data, function(d) { return d.cum; })])
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");
		    
		var line = d3.svg.line()
		    .x(function(d) { return x(d.x); })
		    .y(function(d) { return yc(d.cum); });

		var svg = d3.select("#"+hmtlId).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var bar = svg.selectAll(".bar")
		    .data(data)
		  .enter().append("g")
		    .attr("class", "bar")
		    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

		bar.append("rect")
		    .attr("x", 1)
		    .attr("width", x(data[0].dx) - 1)
		    .attr("height", function(d) { return height - y(d.y); });

		bar.append("text")
		    .attr("dy", ".75em")
		    .attr("y", 6)
		    .attr("x", x(data[0].dx) / 2)
		    .attr("text-anchor", "middle")
		    .text(function(d) { return formatCount(d.y); });
		   
//		svg.append("path")
//		      .datum(data)
//		      .attr("class", "line")
//		      .attr("d", line);

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis);
		
	
		
	
		
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