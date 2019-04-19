package kr.co.fukoku.model.impl;

public class ProductionStatus{

    private long  id;
    private String lineName;
    private String machineName;
    private String model;
    private String productDate;
    private String crossDate;
    private long workingTime; // 부하시간(h)
    private long activeTime; // 가동시간(h)
    private long  nonActiveTime; // 비가동시간(h)
    private float  nonActiveRatio;//비가동욜 (%)
    private long workingNonActiveTime;  // 부하비가동시간
    private long totalProduct;//생산수량
    private long goodProduct;//양폼수(EA)
    private long ngProduct;//불량수량(EA)
    private float ngProductPercentage; //불량율(%)
    private long  theoreticalProductQty;//이론수량(EA)
    private long  processCycleTime;//공정사이클타임 공정 CYCLE TIME(초)
    private long uph;

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getProductDate() {
        return productDate;
    }

    public void setProductDate(String productDate) {
        this.productDate = productDate;
    }

    public long getWorkingTime() {
        return workingTime;
    }

    public void setWorkingTime(long workingTime) {
        this.workingTime = workingTime;
    }

    public long getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(long activeTime) {
        this.activeTime = activeTime;
    }

    public long getNonActiveTime() {
        return nonActiveTime;
    }

    public void setNonActiveTime(long nonActiveTime) {
        this.nonActiveTime = nonActiveTime;
    }

    public float getNonActiveRatio() {
        return nonActiveRatio;
    }

    public void setNonActiveRatio(float nonActiveRatio) {
        this.nonActiveRatio = nonActiveRatio;
    }

    public long getTotalProduct() {
        return totalProduct;
    }

    public void setTotalProduct(long totalProduct) {
        this.totalProduct = totalProduct;
    }

    public long getGoodProduct() {
        return goodProduct;
    }

    public void setGoodProduct(long goodProduct) {
        this.goodProduct = goodProduct;
    }

    public long getNgProduct() {
        return ngProduct;
    }

    public void setNgProduct(long ngProduct) {
        this.ngProduct = ngProduct;
    }

    public float getNgProductPercentage() {
        return ngProductPercentage;
    }

    public void setNgProductPercentage(float ngProductPercentage) {
        this.ngProductPercentage = ngProductPercentage;
    }

    public long getTheoreticalProductQty() {
        return theoreticalProductQty;
    }

    public void setTheoreticalProductQty(long theoreticalProductQty) {
        this.theoreticalProductQty = theoreticalProductQty;
    }

    public long getProcessCycleTime() {
        return processCycleTime;
    }

    public void setProcessCycleTime(long processCycleTime) {
        this.processCycleTime = processCycleTime;
    }

    public long getWorkingNonActiveTime() {
        return workingNonActiveTime;
    }

    public void setWorkingNonActiveTime(long workingNonActiveTime) {
        this.workingNonActiveTime = workingNonActiveTime;
    }

    public void setCrossDate(String crossDate) {
        this.crossDate = crossDate;
    }

    public String getCrossDate() {
        return crossDate;
    }

    public long getUph() {
        return uph;
    }

    public void setUph(long uph) {
        this.uph = uph;
    }
}
