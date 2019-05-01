package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FaultLink {
    @JsonProperty("source")
    private int source;
    @JsonProperty("target")
    private int target;
    @JsonProperty("SUPPORT")
    private String support;
    @JsonProperty("value")
    private double value;

    public FaultLink(){}

    public FaultLink(int source, int target, String support, double value) {
        this.source = source;
        this.target = target;
        this.support = support;
        this.value = value;
    }

    public int getSource() {
        return source;
    }

    public void setSource(int source) {
        this.source = source;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getSupport() {
        return support;
    }

    public void setSupport(String support) {
        this.support = support;
    }

}
