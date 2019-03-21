package kr.co.fukoku.model.form.AlarmJSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmFactory {
    @JsonProperty("FACTORY")
    private String factory;

    @JsonProperty("LINES")
    private List<AlarmLine> lines;

    public AlarmFactory() {
    }

    public AlarmFactory(String factory, List<AlarmLine> lines) {
        this.factory = factory;
        this.lines = lines;
    }

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public List<AlarmLine> getLines() {
        return lines;
    }

    public void setLines(List<AlarmLine> lines) {
        this.lines = lines;
    }
}
