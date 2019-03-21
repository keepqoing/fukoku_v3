package kr.co.fukoku.model.form.AlarmJSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmLine {
    @JsonProperty("LINE")
    private String line;

    @JsonProperty("MACHINES")
    private List<AlarmMachine> machines;

    public AlarmLine() {
    }

    public AlarmLine(String line, List<AlarmMachine> machines) {
        this.line = line;
        this.machines = machines;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public List<AlarmMachine> getMachines() {
        return machines;
    }

    public void setMachines(List<AlarmMachine> machines) {
        this.machines = machines;
    }
}
