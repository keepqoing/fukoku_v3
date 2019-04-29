package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;


public class FailureRateAnalysis {

    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("MTBF")
    private String mtbf;
    @JsonProperty("MTTR")
    private String mttr;
    @JsonProperty("_DATE")
    private String _date;
    @JsonProperty("FAILURE_TIME")
    private String failureTime;
    @JsonProperty("ACTIVETIME")
    private String activetime;
    @JsonProperty("WORKINGTIME")
    private String workingtime;
    @JsonProperty("PLANNONWORKINGTIME")
    private String plannonworkingtime;
    @JsonProperty("FREQMTBF")
    private String freqmtbf;

    public FailureRateAnalysis(String lineName, String machine, String mtbf, String mttr, String _date, String failureTime, String activetime, String workingtime, String plannonworkingtime, String freqmtbf) {
        this.lineName = lineName;
        this.machine = machine;
        this.mtbf = mtbf;
        this.mttr = mttr;
        this._date = _date;
        this.failureTime = failureTime;
        this.activetime = activetime;
        this.workingtime = workingtime;
        this.plannonworkingtime = plannonworkingtime;
        this.freqmtbf = freqmtbf;
    }

    public String getMtbf() {
        return mtbf;
    }

    public void setMtbf(String mtbf) {
        this.mtbf = mtbf;
    }

    public String getMttr() {
        return mttr;
    }

    public void setMttr(String mttr) {
        this.mttr = mttr;
    }

    public FailureRateAnalysis() {
    }


    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }


    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    public String getFailureTime() {
        return failureTime;
    }

    public void setFailureTime(String failureTime) {
        this.failureTime = failureTime;
    }

    public String getActivetime() {
        return activetime;
    }

    public void setActivetime(String activetime) {
        this.activetime = activetime;
    }

    public String getWorkingtime() {
        return workingtime;
    }

    public void setWorkingtime(String workingtime) {
        this.workingtime = workingtime;
    }

    public String getPlannonworkingtime() {
        return plannonworkingtime;
    }

    public void setPlannonworkingtime(String plannonworkingtime) {
        this.plannonworkingtime = plannonworkingtime;
    }

    public String getFreqmtbf() {
        return freqmtbf;
    }

    public void setFreqmtbf(String freqmtbf) {
        this.freqmtbf = freqmtbf;
    }
}
