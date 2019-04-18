package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FaultState {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("PRODUCT")
    private String product;
    @JsonProperty("MSTATE")
    private String mState;
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
    @JsonProperty("ITEM")
    private String item;
    @JsonProperty("SUB_ITEM")
    private String subItem;
    @JsonProperty("ERROR")
    private String error;
    @JsonProperty("TREATMENT")
    private String treatment;
    @JsonProperty("DEPARTMENT")
    private String department;
    @JsonProperty("IDENTIFIER")
    private String identifier;

    public FaultState(){}

    public FaultState(String line, String machine, String product, String mState, String workDate, String startTime, String endTime, String duration, String alarmCode, String alarmName, String item, String subItem, String error, String treatment, String department, String identifier) {
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mState = mState;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.alarmCode = alarmCode;
        this.alarmName = alarmName;
        this.item = item;
        this.subItem = subItem;
        this.error = error;
        this.treatment = treatment;
        this.department = department;
        this.identifier = identifier;
    }

    public FaultState(int id, String line, String machine, String product, String mState, String workDate, String startTime, String endTime, String duration, String alarmCode, String alarmName, String item, String subItem, String error, String treatment, String department, String identifier) {
        this.id = id;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mState = mState;
        this.workDate = workDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.alarmCode = alarmCode;
        this.alarmName = alarmName;
        this.item = item;
        this.subItem = subItem;
        this.error = error;
        this.treatment = treatment;
        this.department = department;
        this.identifier = identifier;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
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

    public String getmState() {
        return mState;
    }

    public void setmState(String mState) {
        this.mState = mState;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
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

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getSubItem() {
        return subItem;
    }

    public void setSubItem(String subItem) {
        this.subItem = subItem;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
