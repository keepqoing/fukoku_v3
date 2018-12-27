/**
 * 
 */

$(document).ready(function(){
	$(function(){
		$("#start_Datepicker").datepicker({
			dateFormat: "yy-mm-dd",
			onSelect:function(dateText){
				if($("#end_Datepicker").val() != ""){
					readChoosingData();
				}
			}
		});
		$("#end_Datepicker").datepicker({
			dateFormat: "yy-mm-dd",
			onSelect:function(dateText){
				if($("#start_Datepicker").val() != ""){
					readChoosingData();
				}
			}
		});
		$("#machine").change(function(){
			if($("#end_Datepicker").val() != "" && $("#start_Datepicker").val() != ""){
				readChoosingData();
			}
		});
	});
});

function readChoosingData(){
	var start_date = $("#start_Datepicker").val();
	var end_date = $("#end_Datepicker").val();
	var machine = $("#machine").val();
	
	$.ajax({
		type:"POST",
		url:"runratioTimeseries",
		data:{s_date:start_date, e_date:end_date, mach:machine},
		success:function(responseJson){
			var dataset = jsonToValueGraph(responseJson);
			var chart = Highcharts.chart('RunratioTimeGraph', {
				chart:{
					type:'line',
					zoomType:'x'
				},
				title:{
					text: 'Machine RunRatio'
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
				}]
			});
		}
	});
}

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