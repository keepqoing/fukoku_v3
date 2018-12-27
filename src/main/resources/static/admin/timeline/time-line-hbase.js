
$(document).ready(function() {

    function timeLineHbase(tasks, taskNames) {

        /*
        var tasks = [
            //IB_Pre1
            {
                "startDate": new Date("2018-09-04 08:00"),
                "endDate": new Date("2018-09-04 12:00"),
                "taskName": "IB_Pre1",
                "status": "RUNNING",
                "startDateFrm": "2018-09-04 08:00",
                "endDateFrm": "2018-09-04 12:00"
            },
            {
                "startDate": new Date("2018-09-04 13:00"),
                "endDate": new Date("2018-09-04 17:00"),
                "taskName": "IB_Pre1",
                "status": "RUNNING",
                "startDateFrm": "2018-09-04 13:00",
                "endDateFrm": "2018-09-04 17:00"
            },
            {
                "startDate": new Date("2018-09-04 17:20"),
                "endDate": new Date("2018-09-04 19:20"),
                "taskName": "IB_Pre1",
                "status": "STOP",
                "startDateFrm": "2018-09-04 17:20",
                "endDateFrm": "2018-09-04 19:20"
            },
            {
                "startDate": new Date("2018-09-04 19:20"),
                "endDate": new Date("2018-09-04 23:20"),
                "taskName": "IB_Pre1",
                "status": "RUNNING",
                "startDateFrm": "2018-09-04 19:20",
                "endDateFrm": "2018-09-04 23:20"
            },


            // IB_Pre2
            {
                "startDate": new Date("2018-09-05 00:00"),
                "endDate": new Date("2018-09-05 04:00"),
                "taskName": "IB_Pre2",
                "status": "RUNNING",
                "startDateFrm": "2018-09-05 00:00",
                "endDateFrm": "2018-09-05 04:00"
            },
            {
                "startDate": new Date("2018-09-05 04:00"),
                "endDate": new Date("2018-09-05 06:00"),
                "taskName": "IB_Pre2",
                "status": "WAITING",
                "startDateFrm": "2018-09-05 04:00",
                "endDateFrm": "2018-09-05 06:00"
            },


        ];
        */

        console.log("tasks",tasks);


        var taskStatus = {
            "RUNNING" : "bar-running",
            "WAITING" : "bar-waiting",
            "STOP" : "bar-stop",
            "OFFLINE" : "bar-offline",
            "MANUAL" : "bar-manual"
        };

       // var taskNames = ["IB_Pre1", "IB_Pre2", "IB_Pre3"];
        console.log("taskNames",taskNames);

        tasks.sort(function (a, b) {
            return a.endDate - b.endDate;
        });
        var maxDate = tasks[tasks.length - 1].endDate;
        tasks.sort(function (a, b) {
            return a.startDate - b.startDate;
        });
        var minDate = tasks[0].startDate;

        var format = "%H:%M";

        var gantt = d3.gantt("#time-line-hbase").taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
        gantt(tasks);

    }

    /*
    window.parent.$("#btnQuerys").click(function(){
        var line = window.parent.$("#lineName").val();
        var crossDate = window.parent.$("#crossedDate").find("input").val();
        console.log(line + " "+  crossDate);
        timeLineHbase();

    });*/




});