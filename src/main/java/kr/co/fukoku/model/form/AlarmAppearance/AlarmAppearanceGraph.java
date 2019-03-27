package kr.co.fukoku.model.form.AlarmAppearance;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlarmAppearanceGraph {
    @JsonProperty("date")
    private String time;

    @JsonProperty("close")
    private double hasAlarm;

    public AlarmAppearanceGraph() {
    }

    public AlarmAppearanceGraph(String time, double hasAlarm) {
        this.time = time;
        this.hasAlarm = hasAlarm;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getHasAlarm() {
        return hasAlarm;
    }

    public void setHasAlarm(double hasAlarm) {
        this.hasAlarm = hasAlarm;
    }
}
