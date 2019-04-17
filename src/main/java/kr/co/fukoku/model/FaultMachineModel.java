package kr.co.fukoku.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import kr.co.fukoku.utils.Helper;

public class FaultMachineModel {
    @JsonProperty("ALARM_CODE")
    private String alarmCode;
    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty("MACHINE_NAME")
    private String machineName;
    @JsonProperty("DURATION")
    private double duration;
    @JsonProperty("ALARM_NAME")
    private String alarmName;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String end_time;
    @JsonProperty("MONTHLY")
    private int monthly;
    @JsonProperty("DISPLAY_NAME")
    private String displayName;
    @JsonProperty("FAULT_RATE")
    private double faultRate;
    @JsonProperty("TOTAL_STOP_TIME")
    private double totalStopTime;
    @JsonProperty("MONTHS")
    private double []monthStopTime;
    @JsonProperty("FREQUENCY")
    private String frequency;
    @JsonProperty("ERROR_NAME")
    private String errorName;
    @JsonProperty("MSTATE")
    private String mState;
    @JsonProperty("ERROR_COUNT")
    private int errorCount;
    @JsonProperty("ITEM")
    private String itemName;
    @JsonProperty("ITEM_COUNT")
    private int itemCount;
    @JsonProperty("SUB_ITEM")
    private String subItemNamet;
    @JsonProperty("SUB_ITEM_COUNT")
    private int subItemCount;
    @JsonProperty("TREATMENT")
    private String treatment;
    @JsonProperty("TREATMENT_COUNT")
    private int treatmentCount;

    public FaultMachineModel(){
        lineName = "";
        startTime = Helper.getCurrentDate();
        end_time = Helper.getCurrentDate();
    }


    public void setMonthStopTime(double[] monthStopTime) {
        this.monthStopTime = monthStopTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getAlarmCode() {
        return alarmCode;
    }

    public void setAlarmCode(String alarmCode) {
        this.alarmCode = alarmCode;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(String alarmName) {
        this.alarmName = alarmName;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public int getMonthly() {
        return monthly;
    }

    public void setMonthly(int monthly) {
        this.monthly = monthly;
    }

    public double getFaultRate() {
        return faultRate;
    }

    public void setFaultRate(double faultRate) {
        this.faultRate = faultRate;
    }

    public double getTotalStopTime() {
        return totalStopTime;
    }

    public void setTotalStopTime(double totalStopTime) {
        this.totalStopTime = totalStopTime;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getErrorName() {
        return errorName;
    }

    public void setErrorName(String errorName) {
        this.errorName = errorName;
    }

    public String getmState() {
        return mState;
    }

    public void setmState(String mState) {
        this.mState = mState;
    }


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }


    public String getSubItemNamet() {
        return subItemNamet;
    }

    public void setSubItemNamet(String subItemNamet) {
        this.subItemNamet = subItemNamet;
    }


    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public int getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(int errorCount) {
        this.errorCount = errorCount;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public int getSubItemCount() {
        return subItemCount;
    }

    public void setSubItemCount(int subItemCount) {
        this.subItemCount = subItemCount;
    }

    public int getTreatmentCount() {
        return treatmentCount;
    }

    public void setTreatmentCount(int treatmentCount) {
        this.treatmentCount = treatmentCount;
    }

    @Override
    public String toString() {
        return "FaultMachineModel{" +
                "alarmCode='" + alarmCode + '\'' +
                ", lineName='" + lineName + '\'' +
                ", machineName='" + machineName + '\'' +
                ", duration=" + duration +
                ", alarmName='" + alarmName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", end_time='" + end_time + '\'' +
                ", monthly=" + monthly +
                ", displayName='" + displayName + '\'' +
                ", faultRate=" + faultRate +
                ", totalStopTime=" + totalStopTime +
                ", frequency='" + frequency + '\'' +
                ", errorName='" + errorName + '\'' +
                ", mState='" + mState + '\'' +
                ", errorCount='" + errorCount + '\'' +
                ", itemName='" + itemName + '\'' +
                ", itemCount='" + itemCount + '\'' +
                ", subItemNamet='" + subItemNamet + '\'' +
                ", subItemCount='" + subItemCount + '\'' +
                ", treament='" + treatment + '\'' +
                ", treatmentCount='" + treatmentCount + '\'' +
                '}';
    }
}
