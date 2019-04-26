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
	var min = 0;
	var max = 0;
	
	$.ajax({
		type:"POST",
		url:"graph_pressure_values",
		data:{s_date:start_date, e_date:end_date, mach:machine},
		success:function(responseJson){
			var dataset = jsonToValueGraph(responseJson);
            console.log("%%%%%%%%%% "+dataset)
			var upperdataset = [];
			var lowerdataset = [];
			
			if(machine==1){
				min = 200;
				max = 500;
			}else if(machine==2){
				min = 1200;
				max = 3000;
			}else if(machine==3){
				min = 250;
				max = 1100;
			}
			
			for(var i=0; i<dataset.length; i++){
				upperdataset[i] = [];
				lowerdataset[i] = [];
				lowerdataset[i].push(dataset[i][0]);
				lowerdataset[i].push(min);
				upperdataset[i].push(dataset[i][0]);
				upperdataset[i].push(max);
			}

			var chart = Highcharts.chart('PressureValuesGraph', {
				chart:{
					type:'line',
					zoomType: 'x',
				},
				title:{
					text: 'Pressure Value'
				},
				xAxis:{
					type: 'datetime',
					endOnTick:false
				},
				yAxis:{
					min: 0,
					max: 3000,
					endOnTick:false
				},
				tooltip:{
					shared: false,
					formatter:function(){
						var text='';
						if(this.series.name == 'PressureValues'){
							text='<b>Time : </b>'+Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x)+'<br><b>PressureValue : </b>'+this.y;
						}else{
							return false;
						}
						return text;
					}
				},
				credits:{
					enabled:false
				},
				series:[{
					name:'PressureValues',
					pointStart:dataset[0][0],
					data: dataset,
					lineWidth:0.5
				},{
					name:'upperBound',
					data: upperdataset,
					color:'#FF0000',
					lineWidth:0.7
				},{
					name:'lowerBound',
					data: lowerdataset,
					color:'#FF0000',
					lineWidth:0.7
				}]
			});
		}
	});
}

function jsonToValueGraph(list){
	var dataset = [];
	var index = 0;
	var temp=null;
	list.forEach(function(obj){
		dataset[index] = [];
		var time = obj['time'];

		var value = parseInt(obj['PressureValue'])/1000;
		dataset[index].push(time);
		dataset[index].push(value);
		index++;
	});
	return dataset;
}