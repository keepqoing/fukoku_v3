package kr.co.fukoku.model.form.AlarmJSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmValue {
    @JsonProperty("ALARM")
    private String alarm;

    @JsonProperty("PRODUCTS")
    private List<AlarmProduct> products;

    public AlarmValue() {
    }

    public AlarmValue(String alarm, List<AlarmProduct> products) {
        this.alarm = alarm;
        this.products = products;
    }

    public String getAlarm() {
        return alarm;
    }

    public void setAlarm(String alarm) {
        this.alarm = alarm;
    }

    public List<AlarmProduct> getProducts() {
        return products;
    }

    public void setProducts(List<AlarmProduct> products) {
        this.products = products;
    }


}
