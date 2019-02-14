package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OperatingTime {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("WORKING_CODE")
    private String workingCode;
    @JsonProperty("WORKING_TYPE_NAME")
    private String workingTypeName;
    @JsonProperty("WORK_TYPE_NAME")
    private String workTypeName;
    @JsonProperty("TIME_TAG")
    private String timeTag;
    @JsonProperty("ACTION_TYPE")
    private String actionType;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("DURATION")
    private double duration;
    @JsonProperty("ITEM")
    private int item;
    @JsonProperty("START_DAY")
    private String startDay;
    @JsonProperty("END_DAY")
    private String endDay;
    @JsonProperty("START_DATE")
    private String startDate;
    @JsonProperty("END_DATE")
    private String endDate;
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("DAY_TYPE")
    private String datType;

    public OperatingTime(){}

    public OperatingTime(String workingCode, String workingTypeName,
                         String workTypeName, String timeTag, String actionType,
                         String startTime, String endTime, int item, String startDay,
                         String endDay, String startDate, String endDate) {
        this.workingCode = workingCode;
        this.workingTypeName = workingTypeName;
        this.workTypeName = workTypeName;
        this.timeTag = timeTag;
        this.actionType = actionType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.item = item;
        this.startDay = startDay;
        this.endDay = endDay;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public OperatingTime(int id, String workingCode, String workingTypeName,
                         String workTypeName, String timeTag,
                         String actionType, String startTime, String endTime,
                         int item, String startDay, String endDay,
                         String startDate, String endDate) {
        this.id = id;
        this.workingCode = workingCode;
        this.workingTypeName = workingTypeName;
        this.workTypeName = workTypeName;
        this.timeTag = timeTag;
        this.actionType = actionType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.item = item;
        this.startDay = startDay;
        this.endDay = endDay;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkingCode() {
        return workingCode;
    }

    public void setWorkingCode(String workingCode) {
        this.workingCode = workingCode;
    }

    public String getWorkingTypeName() {
        return workingTypeName;
    }

    public void setWorkingTypeName(String type) {
        this.workingTypeName = workingTypeName;
    }

    public String getWorkTypeName() {
        return workTypeName;
    }

    public void setWorkTypeName(String worktypeName) {
        this.workTypeName = workTypeName;
    }

    public String getTimeTag() {
        return timeTag;
    }

    public void setTimeTag(String timeTag) {
        this.timeTag = timeTag;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public int getItem() {
        return item;
    }

    public void setItem(int item) {
        this.item = item;
    }

    public String getStartDay() {
        return startDay;
    }

    public void setStartDay(String startDay) {
        this.startDay = startDay;
    }

    public String getEndDay() {
        return endDay;
    }

    public void setEndDay(String endDay) {
        this.endDay = endDay;
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

    public void setDatType(String datType) {
        this.datType = datType;
    }
}
