var app = angular.module('fukoku', ['nvd3']);

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
				
				$(".blockDisplay, #filteringResult").show();
				
				if(response.code == 200){
					
					
					
					$("#totalFound").html(
							" <span class='label label-success' style='font-size:14px'>검색결과: "+response.data.length+"건 </span>&ensp; " +
							" <span class='label label-success' style='font-size:14px'>Query Time: "+response.query_time_second+" second(s)</span>&ensp; " +
							" <span class='label label-success' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+" second(s)</span>"							
					);
					
				
					
	              
	                var arrCp = [];
	                var arrCpk = [];
	                
	                var objCp = {};
                    var objCpk = {};

                    objCp["label"] =  $location.search().p;
                    objCp["value"] =  response.single_data.cp;

                    objCpk["label"] =  $location.search().p;
                    objCpk["value"] =  response.single_data.cpk;

                    arrCp.push(objCp);
                    arrCpk.push(objCpk);
	                
					
                    $scope.generateGraph(arrCp , arrCpk );
					
				
					
				   
					 
				}else{
					
					
					$("#totalFound").html(
							" <span class='label label-warning' style='font-size:14px'>검색결과: "+0+"건 </span>&ensp; " +
							" <span class='label label-warning' style='font-size:14px'>Query Time: "+response.query_time_second+"</span>&ensp; " +
							" <span class='label label-warning' style='font-size:14px'>Analyzing Time: "+response.analyzing_time_second+"</span>&ensp;"							
					);
					
					 
			
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
							$("#selectMachine option:selected").html()  , $scope.processesSelected,start,end);
					
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
	            url: "/v3/api/fukoku/workpiece-params/lines",
	            dataType: 'json',
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {
	            if(response.code == "200"){
	                $scope.lines = response.data;
	            }else{
	            	console.log( "No data ");
	            }
	            console.log( $scope.lines);
	        });
	        post.error(function (data, status) {
	            console.log(data);
	        });
	    }
	    
	    $scope.findMachineAndProductByLineNaME = function(lineName){  
	        var post = $http({
	            method: "GET",
	            url: "/v3/api/fukoku/workpiece-params/product-machine/"+lineName,
	            dataType: 'json',
	            headers: { "Content-Type": "application/json" }
	        });
	        post.success(function (response, status) {
	        	$("#selectMachine").empty();
	            if(response.code == "200"){
	                $scope.machines = response.data.process_chain_element;
	                $("#selectMachine").append("<option value=''>설비</option>");
	                for(i = 0;i  < $scope.machines.length ; i++){
	                	for(j = 0; j  < $scope.machines[i].process_chain_machine.length ; j++){
	                		$("#selectMachine").append("<option value='"+$scope.machines[i].process_chain_machine[j].id+"'>"+$scope.machines[i].process_chain_machine[j].ref_machine+"</option>");
	                	}
	                }
	                $scope.products = response.data.process_chain_product;
	            }else{
	            	
	            }
	            console.log( "machine" , $scope.machines);
	            
	            console.log( "products" , $scope.products);
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
		
	    $scope.findProcessVar = function(process_chain_machine_id){  
	        var post = $http({
	            method: "GET",
	            url: "/v3/api/fukoku/workpiece-params/process-var/"+process_chain_machine_id,
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
	    
	    
		
		
		/*******************************************************************************
		 * Onload()
		 *******************************************************************************/
	    
	    $scope.findLineByLineName("NA");
	    
		
		
		
		
		/*******************************************************************************
		 * Event()
		 *******************************************************************************/
	     $("#selectLine").change(function(){
	    	// $scope.findMachineByLineName($("#selectLine").val());
	    	// $scope.findProductByLine($("#selectLine").val());
	    	 
	    	 $scope.findMachineAndProductByLineNaME($("#selectLine").val());
	     });
	     
	     $("#selectMachine").change(function(){  //alert($("#selectMachine option:selected").html());
	    	 $scope.findProcessVar($("#selectMachine").val());
	     });
	     
	     /***
	      * End Params
	      */

	 
	
});