package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("name")
	private String name;
	@JsonProperty("type")
	private String type;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;
	@JsonProperty("customer_name")
	private String customerName;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	private long  usl;
	private long lsl;
	
	@JsonProperty("acronym")
	private String acronym;
	
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	public Product(long id, String name, String type, String startDate, String endDate, String customerName,
			String remark, String status) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.startDate = startDate;
		this.endDate = endDate;
		this.customerName = customerName;
		this.remark = remark;
		this.status = status;
	}
	public Product() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
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
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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
		return "Product [id=" + id + ", name=" + name + ", type=" + type + ", startDate=" + startDate + ", endDate="
				+ endDate + ", customerName=" + customerName + ", remark=" + remark + ", status=" + status + "]";
	}

	public long getUsl() {
		return usl;
	}

	public void setUsl(long usl) {
		this.usl = usl;
	}

	public long getLsl() {
		return lsl;
	}

	public void setLsl(long lsl) {
		this.lsl = lsl;
	}
	
	
	
	
	
}
