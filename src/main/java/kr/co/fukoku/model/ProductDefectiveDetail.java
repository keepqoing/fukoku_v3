package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductDefectiveDetail {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty
    private String machineName;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("DAILY_SEQ")
    private int dailySeq;
    @JsonProperty("DAILY_SEQ_OK")
    private String dailySeqOK;
    @JsonProperty("PRODUCT_DATE")
    private String prdDate;
    @JsonProperty("PRODUCT_START_TIME")
    private String prdStTime;
    @JsonProperty("PRODUCT_END_TIME")
    private String prdEndTime;


    @JsonProperty("PRODUCT_QUANTITY")
    private double productQuantity;
    @JsonProperty("PRODUCT_DEFECTIVE_RATE")
    private double productDefectiveRate;
    @JsonProperty("PRODUCT_DEFECTIVE_QUANTITY")
    private double productDefectQuantity;





    public ProductDefectiveDetail(){}

    public ProductDefectiveDetail(String lineName, double productQuantity, double productDefectiveRate, double productDefectQuantity) {
        this.lineName = lineName;
        this.productQuantity = productQuantity;
        this.productDefectiveRate = productDefectiveRate;
        this.productDefectQuantity = productDefectQuantity;
    }

    public double getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(double productQuantity) {
        this.productQuantity = productQuantity;
    }

    public double getProductDefectiveRate() {
        return productDefectiveRate;
    }

    public void setProductDefectiveRate(double productDefectiveRate) {
        this.productDefectiveRate = productDefectiveRate;
    }

    public double getProductDefectQuantity() {
        return productDefectQuantity;
    }

    public void setProductDefectQuantity(double productDefectQuantity) {
        this.productDefectQuantity = productDefectQuantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getDailySeq() {
        return dailySeq;
    }

    public void setDailySeq(int dailySeq) {
        this.dailySeq = dailySeq;
    }

    public String getDailySeqOK() {
        return dailySeqOK;
    }

    public void setDailySeqOK(String dailySeqOK) {
        this.dailySeqOK = dailySeqOK;
    }

    public String getPrdDate() {
        return prdDate;
    }

    public void setPrdDate(String prdDate) {
        this.prdDate = prdDate;
    }

    public String getPrdStTime() {
        return prdStTime;
    }

    public void setPrdStTime(String prdStTime) {
        this.prdStTime = prdStTime;
    }

    public String getPrdEndTime() {
        return prdEndTime;
    }

    public void setPrdEndTime(String prdEndTime) {
        this.prdEndTime = prdEndTime;
    }

    @Override
    public String toString() {
        return "ProductDefectiveDetail{" +
                "id=" + id +
                ", lineName='" + lineName + '\'' +
                ", machineName='" + machineName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", dailySeq=" + dailySeq +
                ", dailySeqOK='" + dailySeqOK + '\'' +
                ", prdDate='" + prdDate + '\'' +
                ", prdStTime='" + prdStTime + '\'' +
                ", prdEndTime='" + prdEndTime + '\'' +
                ", productQuantity=" + productQuantity +
                ", productDefectiveRate=" + productDefectiveRate +
                ", productDefectQuantity=" + productDefectQuantity +
                '}';
    }
}
