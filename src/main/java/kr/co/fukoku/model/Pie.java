package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Pie {
    @JsonProperty("value")
    private int value;
    @JsonProperty("label")
    private String label;

    public Pie(){}

    public Pie(int value, String label) {
        this.value = value;
        this.label = label;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
