package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WorkTimeCalendar {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("OPERATING_TIME")
    private int refOperatingTime;
    @JsonProperty("TOTAL")
    private int total;
    @JsonProperty("LINE")
    private String refLine;
    @JsonProperty("PRODUCT")
    private String refProduct;
    @JsonProperty("DATE")
    private String date;
    @JsonProperty("SHORT_DATE")
    private String shortDate;
    @JsonProperty("WORKING_TYPE_NAME")
    private String workingTypeName;
    @JsonProperty("TIME_TAG")
    private String timeTag;
    @JsonProperty("START_DATE")
    private String startDate;
    @JsonProperty("END_DATE")
    private String endDate;
    @JsonProperty("START_DAY")
    private String startDay;
    @JsonProperty("END_DAY")
    private String endDay;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("CROSS_DATE")
    private String crossDate;
    @JsonProperty("CROSS_DATE_LABEL")
    private String crossDateLabel;
    @JsonProperty("DURATION")
    private int duration;

    public WorkTimeCalendar(){}

    public WorkTimeCalendar(int refOperatingTime, int total, String refLine, String refProduct, String date, String shortDate) {
        this.refOperatingTime = refOperatingTime;
        this.total = total;
        this.refLine = refLine;
        this.refProduct = refProduct;
        this.date = date;
        this.shortDate = shortDate;
    }

    public WorkTimeCalendar(int id, int refOperatingTime, int total, String refLine, String refProduct, String date, String shortDate) {
        this.id = id;
        this.refOperatingTime = refOperatingTime;
        this.total = total;
        this.refLine = refLine;
        this.refProduct = refProduct;
        this.date = date;
        this.shortDate = shortDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRefOperatingTime() {
        return refOperatingTime;
    }

    public void setRefOperatingTime(int refOperatingTime) {
        this.refOperatingTime = refOperatingTime;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getRefLine() {
        return refLine;
    }

    public void setRefLine(String refLine) {
        this.refLine = refLine;
    }

    public String getRefProduct() {
        return refProduct;
    }

    public void setRefProduct(String refProduct) {
        this.refProduct = refProduct;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String _date) {
        this.date = _date;
    }

    public String getShortDate() {
        return shortDate;
    }

    public void setShortDate(String shortDate) {
        this.shortDate = shortDate;
    }

    public String getWorkingTypeName() {
        return workingTypeName;
    }

    public void setWorkingTypeName(String workingTypeName) {
        this.workingTypeName = workingTypeName;
    }

    public String getTimeTag() {
        return timeTag;
    }

    public void setTimeTag(String timeTag) {
        this.timeTag = timeTag;
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

    public String getCrossDate() {
        return crossDate;
    }

    public void setCrossDate(String crossDate) {
        this.crossDate = crossDate;
    }

    public String getCrossDateLabel() {
        return crossDateLabel;
    }

    public void setCrossDateLabel(String crossDateLabel) {
        this.crossDateLabel = crossDateLabel;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "WorkTimeCalendar{" +
                "id=" + id +
                ", refOperatingTime=" + refOperatingTime +
                ", total=" + total +
                ", refLine='" + refLine + '\'' +
                ", refProduct='" + refProduct + '\'' +
                ", date='" + date + '\'' +
                ", shortDate='" + shortDate + '\'' +
                ", workingTypeName='" + workingTypeName + '\'' +
                ", timeTag='" + timeTag + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", startDay='" + startDay + '\'' +
                ", endDay='" + endDay + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", crossDate='" + crossDate + '\'' +
                ", crossDateLabel='" + crossDateLabel + '\'' +
                ", duration=" + duration +
                '}';
    }
}
