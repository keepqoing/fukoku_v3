package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StatusFreq {
    @JsonProperty("value")
    private int value;
    @JsonProperty("rate")
    private String rate;

    public StatusFreq(){}

    public StatusFreq(int value, String rate) {
        this.value = value;
        this.rate = rate;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }
}
