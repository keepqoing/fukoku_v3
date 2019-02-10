package kr.co.fukoku.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Counting {
    @JsonProperty("ATTRIBUTE")
    private String attribute;
    @JsonProperty("NUMBER")
    private int number;

    public Counting(){}

    public Counting(String attribute, int number) {
        this.attribute = attribute;
        this.number = number;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
