package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductStatusGraph {
    @JsonProperty("year")
    private String day;
    @JsonProperty("bar")
    private int totalAmount;
    @JsonProperty("line1")
    private double percentageNonRunningTime;
    @JsonProperty("line2")
    private double percentageDefectiveProduct;
    @JsonProperty("line3")
    private double percentageProductEfficiency;

    public ProductStatusGraph(){}

    public ProductStatusGraph(String day, int totalAmount, double percentageNonRunningTime, double percentageDefectiveProduct, double percentageProductEfficiency) {
        this.day = day;
        this.totalAmount = totalAmount;
        this.percentageNonRunningTime = percentageNonRunningTime;
        this.percentageDefectiveProduct = percentageDefectiveProduct;
        this.percentageProductEfficiency = percentageProductEfficiency;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getPercentageNonRunningTime() {
        return percentageNonRunningTime;
    }

    public void setPercentageNonRunningTime(double percentageNonRunningTime) {
        this.percentageNonRunningTime = percentageNonRunningTime;
    }

    public double getPercentageDefectiveProduct() {
        return percentageDefectiveProduct;
    }

    public void setPercentageDefectiveProduct(double percentageDefectiveProduct) {
        this.percentageDefectiveProduct = percentageDefectiveProduct;
    }

    public double getPercentageProductEfficiency() {
        return percentageProductEfficiency;
    }

    public void setPercentageProductEfficiency(double percentageProductEfficiency) {
        this.percentageProductEfficiency = percentageProductEfficiency;
    }
}
