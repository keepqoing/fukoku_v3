package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmProduct {
    @JsonProperty("REF_PRODUCT")
    private String refProduct;

    @JsonProperty("TOTAL")
    private int total;

    @JsonProperty("ALARM_PRODUCT_YEAR")
    private List<AlarmProductYear> alarmProductYears;

    public AlarmProduct() {
    }

    public AlarmProduct(String refProduct, int total, List<AlarmProductYear> alarmProductYears) {
        this.refProduct = refProduct;
        this.total = total;
        this.alarmProductYears = alarmProductYears;
    }

    public String getRefProduct() {
        return refProduct;
    }

    public void setRefProduct(String refProduct) {
        this.refProduct = refProduct;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<AlarmProductYear> getAlarmProductYears() {
        return alarmProductYears;
    }

    public void setAlarmProductYears(List<AlarmProductYear> alarmProductYears) {
        this.alarmProductYears = alarmProductYears;
    }
}
