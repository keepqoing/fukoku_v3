package kr.co.fukoku.model.visualization;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SingleDataMultiLinesVisualization {
	
	@JsonProperty("min_bar")
	private double minBar;
	@JsonProperty("max_bar")
	private double maxBar;
	
	@JsonProperty("min_product_data")
	private double minProductData;
	@JsonProperty("max_product_data")
	private double maxProductData;
	@JsonProperty("total_product")
	private long totalProduct;
	@JsonProperty("ng_product")
	private long ngProduct;
	@JsonProperty("ok_product")
	private long okProduct;
	
	@JsonProperty("cp")
	private double cp;
	
	@JsonProperty("cpk")
	private double cpk;
	
	private String startTime;
	private String endTime;
	
	private double meanR;
	private double meanX;
	
	private double pp;
	private double ppk;
	
	private double stdv;
	
	public double getMinBar() {
		return minBar;
	}
	public void setMinBar(double minBar) {
		this.minBar = minBar;
	}
	public double getMaxBar() {
		return maxBar;
	}
	public void setMaxBar(double maxBar) {
		this.maxBar = maxBar;
	}
	public long getTotalProduct() {
		return totalProduct;
	}
	public void setTotalProduct(long totalProduct) {
		this.totalProduct = totalProduct;
	}
	public long getNgProduct() {
		return ngProduct;
	}
	public void setNgProduct(long ngProduct) {
		this.ngProduct = ngProduct;
	}
	public long getOkProduct() {
		return okProduct;
	}
	public void setOkProduct(long okProduct) {
		this.okProduct = okProduct;
	}
	public double getMinProductData() {
		return minProductData;
	}
	public void setMinProductData(double minProductData) {
		this.minProductData = minProductData;
	}
	public double getMaxProductData() {
		return maxProductData;
	}
	public void setMaxProductData(double maxProductData) {
		this.maxProductData = maxProductData;
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
	public double getMeanR() {
		return meanR;
	}
	public void setMeanR(double meanR) {
		this.meanR = meanR;
	}
	public double getMeanX() {
		return meanX;
	}
	public void setMeanX(double meanX) {
		this.meanX = meanX;
	}
	public double getPp() {
		return pp;
	}
	public void setPp(double pp) {
		this.pp = pp;
	}
	public double getPpk() {
		return ppk;
	}
	public void setPpk(double ppk) {
		this.ppk = ppk;
	}
	public double getStdv() {
		return stdv;
	}
	public void setStdv(double stdv) {
		this.stdv = stdv;
	}
	
	

}
