package kr.co.fukoku.model.visualization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


public class ArrayMultiLinesVisualization {
	
	@JsonProperty("product_values")
    private Object[][] productValues;
    @JsonProperty("lsl_values")
    private Object[][] lslValues;
    @JsonProperty("usl_values")
    private Object[][] uslValues;
    
    private String processName;
    private double usl;
    private double lsl;
    private String dailySeq;
    private String okProduct;
    private String ngProduct;
    private String readData;
    private String readPoints;
    private String productStartTime;
    private String productEndTime;
    private String productDetailQuality;
    private String productDate;
    
	public Object[][] getProductValues() {
		return productValues;
	}
	public void setProductValues(Object[][] productValues) {
		this.productValues = productValues;
	}
	public Object[][] getLslValues() {
		return lslValues;
	}
	public void setLslValues(Object[][] lslValues) {
		this.lslValues = lslValues;
	}
	public Object[][] getUslValues() {
		return uslValues;
	}
	public void setUslValues(Object[][] uslValues) {
		this.uslValues = uslValues;
	}
	public double getUsl() {
		return usl;
	}
	public void setUsl(double usl) {
		this.usl = usl;
	}
	public double getLsl() {
		return lsl;
	}
	public void setLsl(double lsl) {
		this.lsl = lsl;
	}
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
