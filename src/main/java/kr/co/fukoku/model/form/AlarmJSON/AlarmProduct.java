package kr.co.fukoku.model.form.AlarmJSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AlarmProduct {
    @JsonProperty("PRODUCT")
    private String product;

    @JsonProperty("A_YEAR")
    private String a_year;

    @JsonProperty("TOTAL_ALARM_YEAR")
    private String total_alarm_year;

    @JsonProperty("TOTAL_PRODUCT_YEAR")
    private String total_product_year;

    @JsonProperty("TOTAL_MONTH")
    private int[] total_month;

    @JsonProperty("TOTAL_DAY")
    private int[][] total_day;

    public AlarmProduct() {
    }

    public AlarmProduct(String product, String a_year, String total_alarm_year, String total_product_year, int[] total_month, int[][] total_day) {
        this.product = product;
        this.a_year = a_year;
        this.total_alarm_year = total_alarm_year;
        this.total_product_year = total_product_year;
        this.total_month = total_month;
        this.total_day = total_day;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getA_year() {
        return a_year;
    }

    public void setA_year(String a_year) {
        this.a_year = a_year;
    }

    public String getTotal_alarm_year() {
        return total_alarm_year;
    }

    public void setTotal_alarm_year(String total_alarm_year) {
        this.total_alarm_year = total_alarm_year;
    }

    public String getTotal_product_year() {
        return total_product_year;
    }

    public void setTotal_product_year(String total_product_year) {
        this.total_product_year = total_product_year;
    }

    public int[] getTotal_month() {
        return total_month;
    }

    public void setTotal_month(int[] total_month) {
        this.total_month = total_month;
    }

    public int[][] getTotal_day() {
        return total_day;
    }

    public void setTotal_day(int[][] total_day) {
        this.total_day = total_day;
    }
}
