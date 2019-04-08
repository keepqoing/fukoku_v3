package kr.co.fukoku.model.form.AlarmAppearance;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlarmAppearanceGraph {
    @JsonProperty("dates")
    private String time;

    @JsonProperty("y")
    private String hasAlarm;

    public AlarmAppearanceGraph() {
    }

    public AlarmAppearanceGraph(String time, String hasAlarm) {
        this.time = time;
        this.hasAlarm = hasAlarm;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getHasAlarm() {
        return hasAlarm;
    }

    public void setHasAlarm(String hasAlarm) {
        this.hasAlarm = hasAlarm;
    }
}
