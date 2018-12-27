package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class Factory {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("product")
	private Product prodcut;
	@JsonProperty("address")
	private String address;
	@JsonProperty("product_type")
	private String productType;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	
	public Factory() {
		super();
	}
	public Factory(long id, long seq, String name, Product prodcut, String address, String productType,
			String startDate, String endDate, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.prodcut = prodcut;
		this.address = address;
		this.productType = productType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.remark = remark;
		this.status = status;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getSeq() {
		return seq;
	}
	public void setSeq(long seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Product getProdcut() {
		return prodcut;
	}
	public void setProdcut(Product prodcut) {
		this.prodcut = prodcut;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Factory [id=" + id + ", seq=" + seq + ", name=" + name + ", prodcut=" + prodcut + ", address=" + address
				+ ", productType=" + productType + ", startDate=" + startDate + ", endDate=" + endDate + ", remark="
				+ remark + ", status=" + status + "]";
	}
	
	
	
	
	
	
	
	
}
