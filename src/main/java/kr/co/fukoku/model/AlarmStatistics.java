package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlarmStatistics {
    @JsonProperty("ALARM_NAME")
    private String alarm_name;
    @JsonProperty("ALARM_COUNT")
    private long alarm_count;

    public AlarmStatistics() {
    }

    public AlarmStatistics(String alarm_name, long alarm_count) {
        this.alarm_name = alarm_name;
        this.alarm_count = alarm_count;
    }

    public String getAlarm_name() {
        return alarm_name;
    }

    public void setAlarm_name(String alarm_name) {
        this.alarm_name = alarm_name;
    }

    public long getAlarm_count() {
        return alarm_count;
    }

    public void setAlarm_count(long alarm_count) {
        this.alarm_count = alarm_count;
    }
}
