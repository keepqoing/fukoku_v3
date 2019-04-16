package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewCorrelationModel {
    @JsonProperty("xValue")
    private double xValue;
    @JsonProperty("yValue")
    private double yValue;

    public NewCorrelationModel(){}

    public NewCorrelationModel(double xValue, double yValue) {
        this.xValue = xValue;
        this.yValue = yValue;
    }

    public double getxValue() {
        return xValue;
    }

    public void setxValue(double xValue) {
        this.xValue = xValue;
    }

    public double getyValue() {
        return yValue;
    }

    public void setyValue(double yValue) {
        this.yValue = yValue;
    }

    @Override
    public String toString() {
        return "NewCorrelationModel{" +
                "xValue=" + xValue +
                ", yValue=" + yValue +
                '}';
    }
}
