package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class LineFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_factory_id")
	private long refFactoryId;
	@JsonProperty("layout_name")
	private String layoutName;
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
	
	public LineFrm() {
		super();
	}
	public LineFrm(long id, long seq, String name, long refFactoryId, String layoutName, String productType,
			String startDate, String endDate, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refFactoryId = refFactoryId;
		this.layoutName = layoutName;
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
	public long getRefFactoryId() {
		return refFactoryId;
	}
	public void setRefFactoryId(long refFactoryId) {
		this.refFactoryId = refFactoryId;
	}
	public String getLayoutName() {
		return layoutName;
	}
	public void setLayoutName(String layoutName) {
		this.layoutName = layoutName;
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
		return "Line [id=" + id + ", seq=" + seq + ", name=" + name + ", refFactoryId=" + refFactoryId + ", layoutName="
				+ layoutName + ", productType=" + productType + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", remark=" + remark + ", status=" + status + "]";
	}
	
	
	
	
	
	
	
	
	
	
}
