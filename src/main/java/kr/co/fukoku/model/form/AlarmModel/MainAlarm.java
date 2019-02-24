package kr.co.fukoku.model.form.AlarmModel;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MainAlarm {
    @JsonProperty("ALARM")
    private String alarm;

    @JsonProperty("LINE")
    private String line;

    @JsonProperty("MACHINE")
    private String machine;

    @JsonProperty("PRODUCT")
    private String product;

    @JsonProperty("YEAR")
    private String year;


    public MainAlarm() {
    }

    public MainAlarm(String alarm, String line, String machine, String product, String year) {
        this.alarm = alarm;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.year = year;
    }

    public String getAlarm() {
        return alarm;
    }

    public void setAlarm(String alarm) {
        this.alarm = alarm;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
