package kr.co.fukoku.model.visualization;

import com.fasterxml.jackson.annotation.JsonProperty;


public class ArraySpcPcVisualization {
	
	
	
	@JsonProperty("rang_val")
    private Object[][] rangVal;
    @JsonProperty("x_bar_val")
    private Object[][] xBarVal;
    @JsonProperty("ucl_val")
    private Object[][] uclVal;
    @JsonProperty("lcl_val")
    private Object[][] lclVal;
    @JsonProperty("lsl_val")
    private Object[][] lslVal;
    @JsonProperty("usl_val")
    private Object[][] uslVal;
    
    
    private String processName;
    private long dailySeq;
    private long okProduct;
    private long ngProduct;
    private String startTime;
    private String endTime;
    private String productStartTime;
    private String productEndTime;
    private String machineStartTime;
    private String machineEndTime;
    
    private double rang;
    private double xBar;
    private double cp;
    private double  cpk;
    private String productDate;
    
	public Object[][] getRangVal() {
		return rangVal;
	}
	public void setRangVal(Object[][] rangVal) {
		this.rangVal = rangVal;
	}
	public Object[][] getxBarVal() {
		return xBarVal;
	}
	public void setxBarVal(Object[][] xBarVal) {
		this.xBarVal = xBarVal;
	}
	public Object[][] getUclVal() {
		return uclVal;
	}
	public void setUclVal(Object[][] uclVal) {
		this.uclVal = uclVal;
	}
	public Object[][] getLclVal() {
		return lclVal;
	}
	public void setLclVal(Object[][] lclVal) {
		this.lclVal = lclVal;
	}
	public Object[][] getLslVal() {
		return lslVal;
	}
	public void setLslVal(Object[][] lslVal) {
		this.lslVal = lslVal;
	}
	public Object[][] getUslVal() {
		return uslVal;
	}
	public void setUslVal(Object[][] uslVal) {
		this.uslVal = uslVal;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public long getDailySeq() {
		return dailySeq;
	}
	public void setDailySeq(long dailySeq) {
		this.dailySeq = dailySeq;
	}
	public long getOkProduct() {
		return okProduct;
	}
	public void setOkProduct(long okProduct) {
		this.okProduct = okProduct;
	}
	public long getNgProduct() {
		return ngProduct;
	}
	public void setNgProduct(long ngProduct) {
		this.ngProduct = ngProduct;
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
	public double getCp() {
		return cp;
	}
	public void setCp(double cp) {
		this.cp = cp;
	}
	public double getCpk() {
		return cpk;
	}
	public void setCpk(double cpk) {
		this.cpk = cpk;
	}
	public String getProductDate() {
		return productDate;
	}
	public void setProductDate(String productDate) {
		this.productDate = productDate;
	}
	public double getRang() {
		return rang;
	}
	public void setRang(double rang) {
		this.rang = rang;
	}
	public double getxBar() {
		return xBar;
	}
	public void setxBar(double xBar) {
		this.xBar = xBar;
	}
	public String getMachineStartTime() {
		return machineStartTime;
	}
	public void setMachineStartTime(String machineStartTime) {
		this.machineStartTime = machineStartTime;
	}
	public String getMachineEndTime() {
		return machineEndTime;
	}
	public void setMachineEndTime(String machineEndTime) {
		this.machineEndTime = machineEndTime;
	}
	
    
	
	
	
	
	
    
    
	
	

}
