package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OperatingTimeForm {
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
    private int duration;
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

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
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

    public void setWorkingTypeName(String workingTypeName) {
        this.workingTypeName = workingTypeName;
    }

    public String getWorkTypeName() {
        return workTypeName;
    }

    public void setWorkTypeName(String workTypeName) {
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
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

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public static class OperatingTImeUpdateForm extends OperatingTimeForm{
        @JsonProperty("ID")
        private int id;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }
    }
}
