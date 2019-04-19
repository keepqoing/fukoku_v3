package kr.co.fukoku.model.visualization;

import com.fasterxml.jackson.annotation.JsonProperty;


public class ArrayCycleTimesVisualization {
	
	
	public Object[][] getMachineCycleTime() {
		return machineCycleTime;
	}
	public void setMachineCycleTime(Object[][] machineCycleTime) {
		this.machineCycleTime = machineCycleTime;
	}
	public Object[][] getProcessCycleTime() {
		return processCycleTime;
	}
	public void setProcessCycleTime(Object[][] processCycleTime) {
		this.processCycleTime = processCycleTime;
	}
	public Object[][] getProcessIntervalCycleTime() {
		return processIntervalCycleTime;
	}
	public void setProcessIntervalCycleTime(Object[][] processIntervalCycleTime) {
		this.processIntervalCycleTime = processIntervalCycleTime;
	}
	public Object[][] getProductionCycleTime() {
		return productionCycleTime;
	}
	public void setProductionCycleTime(Object[][] productionCycleTime) {
		this.productionCycleTime = productionCycleTime;
	}
	@JsonProperty("machine_cycle_time")
    private Object[][] machineCycleTime;
    @JsonProperty("process_cycle_time")
    private Object[][] processCycleTime;
    @JsonProperty("process_interval_cycle_time")
    private Object[][] processIntervalCycleTime;
    @JsonProperty("production_cycle_time")
    private Object[][] productionCycleTime;
    
    private String processName;
    private String dailySeq;
    private String okProduct;
    private String ngProduct;
    private String readData;
    private String readPoints;
    private String productStartTime;
    private String productEndTime;
    private String productDetailQuality;
    private String productDate;
    
	
	
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getDailySeq() {
		return dailySeq;
	}
	public void setDailySeq(String dailySeq) {
		this.dailySeq = dailySeq;
	}
	public String getOkProduct() {
		return okProduct;
	}
	public void setOkProduct(String okProduct) {
		this.okProduct = okProduct;
	}
	public String getNgProduct() {
		return ngProduct;
	}
	public void setNgProduct(String ngProduct) {
		this.ngProduct = ngProduct;
	}
	public String getProductStartTime() {
		return productStartTime;
	}
	public void setProductStartTime(String productStartTime) {
		this.productStartTime = productStartTime;
	}
	public String getProductEndTime() {
		return productEndTime;
	}
	public void setProductEndTime(String productEndTime) {
		this.productEndTime = productEndTime;
	}
	public String getProductDetailQuality() {
		return productDetailQuality;
	}
	public void setProductDetailQuality(String productDetailQuality) {
		this.productDetailQuality = productDetailQuality;
	}
	public String getReadData() {
		return readData;
	}
	public void setReadData(String readData) {
		this.readData = readData;
	}
	public String getReadPoints() {
		return readPoints;
	}
	public void setReadPoints(String readPoints) {
		this.readPoints = readPoints;
	}
	public String getProductDate() {
		return productDate;
	}
	public void setProductDate(String productDate) {
		this.productDate = productDate;
	}
	
	
	
	
	
    
    
	
	

}
