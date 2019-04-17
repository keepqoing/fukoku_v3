package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FreqValue {
    @JsonProperty("FREQUENCY")
    private int freqency;
    @JsonProperty("ALARM_NAME")
    private String alarm;
    @JsonProperty("ALARM_CODE")
    private String alarmCode;
    @JsonProperty("MACHINE")
    private String machine;



    public FreqValue(int freqency, String alarm) {
        this.freqency = freqency;
        this.alarm = alarm;
    }

    public FreqValue(int freqency, String alarm, String machine, String alarmCode) {
        this.freqency = freqency;
        this.alarm = alarm;
        this.machine = machine;
        this.alarmCode = alarmCode;
    }

    public void setAlarmCode(String alarmCode) {
        this.alarmCode = alarmCode;
    }

    public String getAlarmCode() {
        return alarmCode;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public int getFreqency() {
        return freqency;
    }

    public void setFreqency(int freqency) {
        this.freqency = freqency;
    }

    public String getAlarm() {
        return alarm;
    }

    public void setAlarm(String alarm) {
        this.alarm = alarm;
    }
}
