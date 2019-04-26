/** 1. end_date가 start_date 이후의 날짜만 선택할 수 있도록 예외조건을 만들어야됨
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
		url:"machine_pressure",
		data:{s_date:start_date, e_date:end_date, mach:machine},
		success:function(responseJson){
		
			
			var dataset = jsonToLineGraph(responseJson);
			console.log(dataset);
			var getQuantile = [];
			for(var i=0; i<dataset.length; i++){
				getQuantile.push(dataset[i][1]);
			}
			getQuantile.sort(d3.ascending);
			var lowerbound = d3.quantile(getQuantile, 0.25)*1/3;
			var upperbound = d3.quantile(getQuantile, 0.75)*3/2;
			var lowerdataset = [];
			var upperdataset = [];
			for(var i=0; i<dataset.length; i++){
				lowerdataset[i] = [];
				upperdataset[i] = [];
				lowerdataset[i].push(dataset[i][0]);
				lowerdataset[i].push(lowerbound);
				upperdataset[i].push(dataset[i][0]);
				upperdataset[i].push(upperbound);
			}
			var chart = Highcharts.chart('CycleTimeGraph', {
				chart:{
					type:'line',
					zoomType:'x'
				},
				title:{
					text: 'Pressure CycleTime'
				},
				xAxis:{

				},
				yAxis:{
					min: 0,
					max: 20,
					endOnTick: false,
					title:{
						text:'cycletime(sec)'
					}
				},
				credits:{
					enabled:false
				},
				tooltip: {
					shared: false,
					formatter: function(){
						var text = '';
						if(this.series.name == 'CycleTime'){
							var pointIndex = this.series.data.indexOf(this.point);	// Hover된 Point의 Index를 구함
							var startTime = chart.series[0].data[pointIndex]['start'];
							var endTime = chart.series[0].data[pointIndex]['end'];
							text = '<b>StartTime :</b> '+ startTime + '<br><b>EndTime :</b> ' + endTime + '<br><b>CycleTime : </b>' + this.y;
						}else{
							return "Boundary : " + this.y;
						}
						return text;
					}
				},
				series:[{
					name:'CycleTime',
					keys:['x', 'y', 'start', 'end'],
					lineWidth:0.5,
					data: dataset
				},{
					name:'UpperBound',
					lineWidth:0.7,
					color:'#FF0000',
					data: upperdataset
				},{
					name:'LowerBound',
					lineWidth:0.7,
					color:'#FF0000',
					data: lowerdataset
				}]
			});
		}
	});
}

function jsonToLineGraph(list){
	var dataset = [];
	var index = 0;
	list.forEach(function(obj){
		dataset[index] = new Array();
		dataset[index].push(obj['p_cnt']);
		dataset[index].push(obj['cycle']);
		dataset[index].push(obj['start']);
		dataset[index].push(obj['end']);

		index++;
	});
	return dataset;
}