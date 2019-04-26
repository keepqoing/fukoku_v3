
var equipment_Status={};

$(function () {
    var intervals;
    function timeInterval() {
        console.log("Run 1");
        intervals = setInterval(function () {
            equipment_Status.findDataEquipStatus();
        }, 10000);
    }



    $(document).ready(function () {
        equipment_Status.getLineName();
        // timeInterval();
        //equipment_Status.findDataEquipStatus();
    });

    $(document).on('click',"#btnQuerys" , function(){
        equipment_Status.findDataEquipStatus();


    });

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    equipment_Status.findDataEquipStatus = function () {
        clearInterval(intervals);
        var line = $("#lineName").val();
        console.log("dddddddddd "+line)
        $.ajax({
            url: "/v1/api/fukoku/equipStatus",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "lineName": line,
                "machineName": "IB_Pre"/*,
                "startTime": start,
                "endTime": end*/

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response.Data);
                console.log(response.MachineName);
                var test=new Date();
                console.log("@@@@@@@@@ "+test.getTime()+" "+parseInt(test.getTime()-1800000));
                $(function () {
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });

                    var chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container',
                            zoomType: 'x',
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: '실시간작동현황 '
                        },
                        xAxis: {// TODO Color three type
                            type: 'datetime',
                            dateTimeLabelFormats : {
                                month: '%e. %b',
                                year: '%b'
                            }
                        }, legend: {
                            reversed: true
                        },
                        yAxis: [, ,
                            {

                                title: {
                                    text: ''

                                }
                                ,

                            }
                        ],

                        plotOptions: {
                            series: {
                                turboThreshold: 100000
                            }
                        },

                        tooltip: {
                            enabled: true,
                            snap: 50,
                            formatter: function () {

                                var yname = this.series.yAxis.categories[this.point.y];
                                var dfrom = Highcharts.dateFormat('%H:%M:%S',new Date(this.point.x));
                                var dto = Highcharts.dateFormat('%H:%M:%S',new Date(this.point.x2));
                                var yearFull=moment(this.point.x).format('YYYY-MM-DD');
                                return this.series.name +' '+yname + '<br>' +yearFull+'<br>'+'StartTime: '+dfrom + ' to ' +'EndTime:'+ dto;
                            }
                        },
                        series: [

                            {
                                name: '시간',
                                type: 'xrange',
                                yAxis: 2,
                                color: Highcharts.getOptions().colors[2],// TODO Line color
                                //borderRadius: 5,
                                linecap: 'square',
                                marker: {enabled: false},
                                pointWidth: 20,
                                data:JSON.parse(response.Data)

                            }
                        ]

                    });
                    chart.xAxis[0].setExtremes(
                        parseInt(test.getTime()-1800000),test.getTime()
                    );
                    chart.yAxis[0].setCategories(response.MachineName, true, true);
                    chart.yAxis[0].update({
                        max: 0,
                        max:response.MachineName.length-1
                    });
                });

                timeInterval();
            }
            ,
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }


    equipment_Status.getLineName = function () {

        $.ajax({
            url: "/v1/api/fukoku/faultime/lineName",
            type: 'GET',
            dataType: 'JSON',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
                var elt = document.getElementById('lineName');

                while (elt.hasChildNodes()) {
                    elt.removeChild(elt.lastChild);
                }

                var i, len = response.DATA.length;

                for (i = 0; i < len; i++) {
                    var option = document.createElement("option");
                    option.text = response.DATA[i].LINE_NAME;
                    elt.add(option);
                }

            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        })
    }

});



