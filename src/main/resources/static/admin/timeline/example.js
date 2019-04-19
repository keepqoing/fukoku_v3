
$(document).ready(function() {

    var m_state_time_line;
    var machines;
    var alarmNames;
    var alarmLength=0;



    function getLines(){
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/workpiece/line-list",
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log(response);
                for(var i=0;i<response.lines.length;i++){
                    //console.log(response.lines[i].LINE_NAME);
                    window.parent.$("#lineName").append("<option value="+ response.lines[i].LINE_NAME +">"+ response.lines[i].LINE_NAME +"</option>");
                }
                window.parent.$('#lineName').find('option[value=IB]').attr('selected','selected');
                getTimeLine();


            }, error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });

    }

    function timeLineHbase(tasks, taskNames) {
        console.log("timeLineHbase",tasks);
        //console.log("tasks",tasks);

        var taskStatus = {
            "AUTO" : "bar-running",
            "WAIT" : "bar-waiting",
            "STOP" : "bar-stop",
            "OFFLINE" : "bar-offline",
            "MANUAL" : "bar-manual",
            "BLANK" :'bar-blank',
        };

        //console.log("taskNames",taskNames);

        tasks.sort(function (a, b) {
            return a.endDate - b.endDate;
        });

        console.log("startDate", tasks[0].startDate);
        var maxDate = tasks[tasks.length - 1].endDate;

        tasks.sort(function (a, b) {
            return a.startDate - b.startDate;
        });
        var minDate = tasks[0].startDate;


        var format = "%H:%M";

        var gantt = d3.gantt("#time-line-hbase").taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
        gantt(tasks);

    }

    function getWorkingTimeAnalysis(tasks) {
        console.log("data",tasks);
        var taskStatus = {
            "WORK_PLAN": "bar-work-plan",
            "STOP_PLAN": "bar-stop",
            "WORKING_TIME": "bar-work-plan",
            "BLANK":"bar-blank"
            // "RUNNING" : "bar-running",
            // "WAITING" : "bar-waiting",
            // "STOP" : "bar-stop",
            // "OFFLINE" : "bar-offline",
            // "MANUAL" : "bar-manual"
        };

        var taskNames = [/*"조업시간"*/ "작업계획", "계획정지시간", "부하시간"];

        if(tasks.length != 0){
            tasks.sort(function (a, b) {
                return a.endDate - b.endDate;
            });
            var maxDate = tasks[tasks.length - 1].endDate;
            tasks.sort(function (a, b) {
                return a.startDate - b.startDate;
            });
            var minDate = tasks[0].startDate;
        }

        var format = "%H:%M";

        var gantt = d3.gantt("#time-line").taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
        gantt(tasks);

    }


    function alarmTimeLines(tasks, taskNames) {
        console.log("alarmTimeLines",tasks);
        //console.log("tasks",tasks);

        var taskStatus = {
            "AUTO" : "bar-running",
            "WAIT" : "bar-waiting",
            "STOP" : "bar-stop",
            "OFFLINE" : "bar-offline",
            "MANUAL" : "bar-manual",
            "BLANK" :'bar-blank',
        };

        //console.log("taskNames",taskNames);

        tasks.sort(function (a, b) {
            return a.endDate - b.endDate;
        });

        console.log("startDate", tasks[0].startDate);
        var maxDate = tasks[tasks.length - 1].endDate;

        tasks.sort(function (a, b) {
            return a.startDate - b.startDate;
        });
        var minDate = tasks[0].startDate;


        var format = "%H:%M";

        var gantt = d3.gantt("#alarm-time-lines",alarmLength).taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
        gantt(tasks);

    }

    function getTimeLine() {
        window.parent.openLoading();
        $("#time-line,#time-line-hbase,#alarm-time-lines").empty();
        $.ajax({
            url: "http://113.198.137.142:8080/v1/api/fukoku/time-line/workPlanByCurrentTime?line="+window.parent.$("#lineName").val()+"&crossDate="+window.parent.$("#crossedDate").find("input").val(),
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("response",response);

                if(response.workPlanByCurrentTime.length != 0){
                    for(var i=0;i<response.workPlanByCurrentTime.length;i++){
                        //console.log(response.workPlanByCurrentTime[i].startDate);
                        response.workPlanByCurrentTime[i].startDate = new Date(response.workPlanByCurrentTime[i].startDate);
                        response.workPlanByCurrentTime[i].endDate = new Date(response.workPlanByCurrentTime[i].endDate);
                    }
                    getWorkingTimeAnalysis(response.workPlanByCurrentTime);
                }
               // console.log("getTimeLine",response.m_state_time_line);

                if(response.m_state_time_line.length != 0){
                    for(var i=0;i<response.m_state_time_line.length;i++){
                        response.m_state_time_line[i].startDate = new Date(response.m_state_time_line[i].startDate);
                        response.m_state_time_line[i].endDate = new Date(response.m_state_time_line[i].endDate);
                    }
                    timeLineHbase(response.m_state_time_line,response.machines);
                }

                if(response.alarm_names.length != 0){
                    alarmLength = response.alarm_names.length;
                    for(var i=0;i<response.alarm_time_lines.length;i++){
                        response.alarm_time_lines[i].startDate = new Date(response.alarm_time_lines[i].startDate);
                        response.alarm_time_lines[i].endDate = new Date(response.alarm_time_lines[i].endDate);
                    }
                    if(response.alarm_time_lines.length != 0){
                        alarmTimeLines(response.alarm_time_lines,response.alarm_names);
                        $("#noAlarm").hide();
                    }else{
                        $("#noAlarm").show();
                    }
                }

                window.parent.closeLoading();
            }, error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
                window.parent.closeLoading();
            }
        });
    }

    /*
    function getTimeLinePhoenixIndex() {
        $.ajax({
            url: "http://localhost:9091/fukoku/api/v1/mstate/timeline?line="+window.parent.$("#lineName").val()+"&start-date="+window.parent.$("#crossedDate").find("input").val(),
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                console.log("getTimeLinePhoenixIndex",response.m_state_time_line);
                for(var i=0;i<response.m_state_time_line.length;i++){
                    response.m_state_time_line[i].startDate = new Date(response.m_state_time_line[i].startDate);
                    response.m_state_time_line[i].endDate = new Date(response.m_state_time_line[i].endDate);
                }
                timeLineHbase(response.m_state_time_line,machines);

                $("#showData").show();
                $('#dataTable').DataTable({
                    "paging": true,
                    "lengthChange": true,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": true,
                    "data": response.m_state_time_line,
                    "destroy": true,
                    "columns": [{
                        "title": "Machine",
                        "data": "taskName"
                    },{
                        "title": "Start Time",
                        "data": "startDateFrm"
                    },{
                        "title": "Status",
                        "data": "taskName"
                    },{
                        "title": "End Time",
                        "data": "endDateFrm"
                    }
                    ]
                });

            }, error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }*/

    window.parent.$("#btnQuerys").click(function(){
        var line = window.parent.$("#lineName").val();
        var crossDate = window.parent.$("#crossedDate").find("input").val();
        console.log(line + " "+  crossDate);
        getTimeLine();

    });





    getLines();
    //getTimeLine();


});