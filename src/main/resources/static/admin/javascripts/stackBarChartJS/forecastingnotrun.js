/**
 * 
 */
$(document).ready(function(){
	//readChoosingData();
	readRealData();
	/*$(function(){
		$("#machine").change(function(){
			readChoosingData();
		});
	});*/
});

/*function readChoosingData(){
	var machine = $("#machine").val();
	
	$.ajax({
		type:"POST",
		url:"forecastnotrun",
		data:{mach:machine, type:"1"},
		success:function(responseJson){
			var dataset = jsonToValueGraph(responseJson);
			var predictdataset = readPredictData();
			var chart = Highcharts.chart('ForecastingGraph', {
				chart:{
					type:'line',
					zoomType:'x'
				},
				title:{
					text: 'Forecasting RunRatio'
				},
				xAxis:{
					type: 'datetime',
					endOnTick:false
				},
				yAxis:{
					min:0,
					max:120,
					endOnTick:false
				},
				credits:{
					enabled:false
				},
				series:[{
					name:'runRatio',
					data: dataset
				},{
					name:'predictRatio',
					data: predictdataset
				}]
			});
		}
	});
}*/

function jsonToValueGraph(list){
	var dataset = [];
	var index = 0;
	list.forEach(function(obj){
		dataset[index] = [];
		var time = obj['time'];
		var ratio = obj['runRatio'];
		dataset[index].push(time);
		dataset[index].push(ratio);
		index++;
	});
	return dataset;
}

function readBeforeData(end_date){
	var start_dt = end_date - 86400000*7;
	var start = new Date(start_dt);
	alert(start);
	$.ajax({
		type:"POST",
		url:"forecastnotrun",
		data:{end:end_date},
		success:function(responseJson){
			alert(123);
		}
	});
}

function readRealData(){
	var machine = $("#machine").val();
	
	$.ajax({
		type:"POST",
		url:"forecastnotrun",
		data:{mach:machine, type:"1"},
		success:function(responseJson){
			var Realdata = jsonToValueGraph(responseJson);
			readPredictData(Realdata);
		}
	});
}

function readPredictData(Realdata){
	var machine = $("#machine").val();
	
	$.ajax({
		type:"POST",
		url:"forecastnotrun",
		data:{mach:machine, type:"2"},
		success:function(responseJson){
			var Predictdata = jsonToValueGraph(responseJson);
			
			var chart = Highcharts.chart('ForecastingGraph', {
				chart:{
					type:'line',
					zoomType:'x'
				},
				title:{
					text: 'Forecasting RunRatio'
				},
				xAxis:{
					type: 'datetime',
					endOnTick:false
				},
				yAxis:{
					min:0,
					max:120,
					endOnTick:false
				},
				credits:{
					enabled:false
				},
				series:[{
					name:'runRatio',
					data: Realdata
				},{
					name:'Forecast',
					data: Predictdata,
					color: '#FF0000'
				}]
			});
		}
	});
}
