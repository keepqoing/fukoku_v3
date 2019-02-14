package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlarmHistory {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("PRODUCT")
    private String product;
    @JsonProperty("MSTATE")
    private String mstate;
    @JsonProperty("WORK_DATE")
    private String workDate;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("DURATION")
    private String duration;
    @JsonProperty("ALARM_CODE")
    private String alarmCode;
    @JsonProperty("ALARM_NAME")
    private String alarmName;
    @JsonProperty("ALARM_ID")
    private String alarmId;

    public AlarmHistory(){}

    public AlarmHistory(String line, String machine, String product, String mstate, String workDate, String startTime, String endTime, String duration, String alarmCode, String alarmName) {
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.alarmCode = alarmCode;
        this.alarmName = alarmName;
    }

    public AlarmHistory(String line, String machine, String product, String mstate, String workDate, String startTime, String endTime, String duration, String alarmCode, String alarmName, String alarmId) {
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.alarmCode = alarmCode;
        this.alarmName = alarmName;
        this.alarmId = alarmId;
    }

    public AlarmHistory(int id, String line, String machine, String product, String mstate, String workDate, String startTime, String endTime, String duration, String alarmCode, String alarmName) {
        this.id = id;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.alarmCode = alarmCode;
        this.alarmName = alarmName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }

    public String getMstate() {
        return mstate;
    }

    public void setMstate(String mstate) {
        this.mstate = mstate;
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

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getAlarmCode() {
        return alarmCode;
    }

    public void setAlarmCode(String alarmCode) {
        this.alarmCode = alarmCode;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(String alarmName) {
        this.alarmName = alarmName;
    }

    public String getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(String alarmId) {
        this.alarmId = alarmId;
    }
}
