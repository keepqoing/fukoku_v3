package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NGProduct {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("PRODUCT")
    private String product;
    @JsonProperty("MSTATE")
    private String mstate;
    @JsonProperty("START_TIME")
    private String startTime;
    @JsonProperty("END_TIME")
    private String endTime;
    @JsonProperty("PRODUCTION_DATE")
    private String productionDate;
    @JsonProperty("STATUS")
    private String status;
    @JsonProperty("QUALITY")
    private String quality;
    @JsonProperty("PRODUCT_CYCLE")
    private int productCycle;
    @JsonProperty("ITEM")
    private String item;
    @JsonProperty("SUB_ITEM")
    private String subItem;
    @JsonProperty("ERROR")
    private String error;
    @JsonProperty("TREATMENT")
    private String treatment;

    public NGProduct(){}

    public NGProduct(int id, String line, String machine, String product, String mstate, String startTime, String endTime, String productionDate, String status) {
        this.id = id;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.productionDate = productionDate;
        this.status = status;
    }

    public NGProduct(int id, String line, String machine, String product, String mstate, String startTime, String endTime, String productionDate, String quality, int productCycle) {
        this.id = id;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.productionDate = productionDate;
        this.quality = quality;
        this.productCycle = productCycle;
    }

    public NGProduct(String line, String machine, String product, String mstate, String startTime, String endTime, String productionDate) {
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.mstate = mstate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.productionDate = productionDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getMstate() {
        return mstate;
    }

    public void setMstate(String mstate) {
        this.mstate = mstate;
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

    public String getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(String productionDate) {
        this.productionDate = productionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public int getProductCycle() {
        return productCycle;
    }

    public void setProductCycle(int productCycle) {
        this.productCycle = productCycle;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getSubItem() {
        return subItem;
    }

    public void setSubItem(String subItem) {
        this.subItem = subItem;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
}
