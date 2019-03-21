package kr.co.fukoku.model.form.AlarmJSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmMachine {
    @JsonProperty("MACHINE")
    private String machine;

    @JsonProperty("ALARMS")
    private List<AlarmValue> alarms;

    public AlarmMachine() {
    }

    public AlarmMachine(String machine, List<AlarmValue> alarms) {
        this.machine = machine;
        this.alarms = alarms;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public List<AlarmValue> getAlarms() {
        return alarms;
    }

    public void setAlarms(List<AlarmValue> alarms) {
        this.alarms = alarms;
    }
}
