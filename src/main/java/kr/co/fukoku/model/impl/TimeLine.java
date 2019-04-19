package kr.co.fukoku.model.impl;


public class TimeLine{

    private  String startDate;
    private  String endDate;
    private  String taskName;
    private  String status;
    private  String startDateFrm;
    private  String endDateFrm;
    private long  id;

    public TimeLine(){}

    public TimeLine(String startDate, String endDate, String taskName, String status, String startDateFrm, String endDateFrm) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.taskName = taskName;
        this.status = status;
        this.startDateFrm = startDateFrm;
        this.endDateFrm = endDateFrm;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartDateFrm() {
        return startDateFrm;
    }

    public void setStartDateFrm(String startDateFrm) {
        this.startDateFrm = startDateFrm;
    }

    public String getEndDateFrm() {
        return endDateFrm;
    }

    public void setEndDateFrm(String endDateFrm) {
        this.endDateFrm = endDateFrm;
    }
}