package kr.co.fukoku.filters;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;


public class WorkpieceFilter implements Serializable {

    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("MACHINE_NAME")
    private String machineName;
    @JsonProperty("MODEL")
    private String model;
    @JsonProperty("PROCESS_NAME")
    private String processName;
    @JsonProperty("LIMIT")
    private int limit;
    @JsonProperty("TIME")
    private String time;

    @JsonProperty("WORK_DATE")
    private String workDate;

    @JsonProperty("startDateFormat")
    private String startDateFormat;

    @JsonProperty("endDateFormat")
    private String endDateFormat;

    @JsonProperty("LIST_PROCESS_NAME")
    private List<String> lstProcessName;

    @JsonProperty("lst_model")
    private List<String> lstModel;

    public WorkpieceFilter(){
        //lineName = "HC";
        //startTime = "1515424974000";
        //endTime = "1515425002000";
        //machineName = "HC_Runout";
        //model = "Model-1";
        //processName = "2차 V홈 흔들림 값";
    }

    public WorkpieceFilter(String lineName, String machineName, String startTime, String endTime, String model ) {
        this.lineName = lineName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.machineName = machineName;
        this.model = model;
    }

    public WorkpieceFilter(String lineName, String machineName, String startTime, String endTime, String model , List<String> lstProcessName) {
        this.lineName = lineName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.machineName = machineName;
        this.model = model;
        this.lstProcessName = lstProcessName;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
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

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public void setLstProcessName(List<String> lstProcessName) {
        this.lstProcessName = lstProcessName;
    }

    public List<String> getLstProcessName() {
        return lstProcessName;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public List<String> getLstModel() {
        return lstModel;
    }

    public void setLstModel(List<String> lstModel) {
        this.lstModel = lstModel;
    }

    public String getStartDateFormat() {
        return startDateFormat;
    }

    public void setStartDateFormat(String startDateFormat) {
        this.startDateFormat = startDateFormat;
    }

    public String getEndDateFormat() {
        return endDateFormat;
    }

    public void setEndDateFormat(String endDateFormat) {
        this.endDateFormat = endDateFormat;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }

    @Override
    public String toString() {
        return "WorkpieceFilter{" +
                "lineName='" + lineName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", model='" + model + '\'' +
                ", processName='" + processName + '\'' +
                ", lstModel=" + lstModel +
                '}';
    }
}
