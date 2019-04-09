package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductStatusGraphNew {
    @JsonProperty("year")
    private String day;
    @JsonProperty("bar")
    private int totalProduct;
    @JsonProperty("line1")
    private double timeOperationRate;
    @JsonProperty("line2")
    private double okProductRate;
    @JsonProperty("line3")
    private double processCycleTime;
    @JsonProperty("line4")
    private double theoreticalCycleTime;
    @JsonProperty("line5")
    private double uph;
    @JsonProperty("line6")
    private double byPassedProductRate;

    public ProductStatusGraphNew(){}

    public ProductStatusGraphNew(String day, int totalProduct, double timeOperationRate, double okProductRate, double processCycleTime, double theoreticalCycleTime, double uph, double byPassedProductRate) {
        this.day = day;
        this.totalProduct = totalProduct;
        this.timeOperationRate = timeOperationRate;
        this.okProductRate = okProductRate;
        this.processCycleTime = processCycleTime;
        this.theoreticalCycleTime = theoreticalCycleTime;
        this.uph = uph;
        this.byPassedProductRate = byPassedProductRate;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getTotalProduct() {
        return totalProduct;
    }

    public void setTotalProduct(int totalProduct) {
        this.totalProduct = totalProduct;
    }

    public double getTimeOperationRate() {
        return timeOperationRate;
    }

    public void setTimeOperationRate(double timeOperationRate) {
        this.timeOperationRate = timeOperationRate;
    }

    public double getOkProductRate() {
        return okProductRate;
    }

    public void setOkProductRate(double okProductRate) {
        this.okProductRate = okProductRate;
    }

    public double getProcessCycleTime() {
        return processCycleTime;
    }

    public void setProcessCycleTime(double processCycleTime) {
        this.processCycleTime = processCycleTime;
    }

    public double getTheoreticalCycleTime() {
        return theoreticalCycleTime;
    }

    public void setTheoreticalCycleTime(double theoreticalCycleTime) {
        this.theoreticalCycleTime = theoreticalCycleTime;
    }

    public double getUph() {
        return uph;
    }

    public void setUph(double uph) {
        this.uph = uph;
    }

    public double getByPassedProductRate() {
        return byPassedProductRate;
    }

    public void setByPassedProductRate(double byPassedProductRate) {
        this.byPassedProductRate = byPassedProductRate;
    }
}
