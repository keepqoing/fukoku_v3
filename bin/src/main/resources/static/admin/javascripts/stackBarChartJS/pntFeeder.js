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
	var work = $("#machine").val();
	
	$.ajax({
		type:"POST",
		url:"pntFeederSpeed",
		data:{s_date:start_date, e_date:end_date, mach:work},
		success:function(responseJson){
			var dataset = jsonToValueGraph(responseJson);
			var settingdataset = [];
			
			for(var i=0; i<dataset.length; i++){
				settingdataset[i] = [];
				settingdataset[i].push(dataset[i][0]);
				if(work==1){
					settingdataset[i].push(1000);
				}else if(work==2){
					settingdataset[i].push(2500);
				}
			}
									
			var chart = Highcharts.chart('FeederSpeedGraph', {
				chart:{
					type:'line',
					zoomType: 'x',
				},
				title:{
					text: 'Speed Value'
				},
				xAxis:{
					type: 'datetime',
					endOnTick:false
				},
				yAxis:{
					min: 0,
					max: 2700,
					endOnTick:false
				},
				tooltip:{
					shared: false,
					formatter:function(){
						var text='';
						if(this.series.name == 'SpeedValues'){
							text='<b>Time : </b>'+Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x)+'<br><b>SpeedValue : </b>'+this.y;
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
					name:'SpeedValues',
					pointStart:dataset[0][0],
					data: dataset,
					lineWidth:0.5
				},{
					name: 'SettingSpeed',
					data: settingdataset,
					lineWidth: 0.7,
					color: '#FF0000'
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
		var value = obj['speedValue']/100;
		dataset[index].push(time);
		dataset[index].push(value);
		index++;
	});
	return dataset;
}