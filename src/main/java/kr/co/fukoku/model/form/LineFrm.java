package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;


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
	@JsonProperty("ref_product_id")
	private long refProductId;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("order_by")
	private String orderBy;
	
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	public String getOrderBy() {
		return orderBy;
	}
	
	public LineFrm() {
		super();
	}
	
	public LineFrm(String name) {
		super();
		this.name = name;
	}

	public LineFrm(long id, long seq, String name, long refFactoryId, String layoutName, long refProductId,
			String startDate, String endDate, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refFactoryId = refFactoryId;
		this.layoutName = layoutName;
		this.refProductId = refProductId;
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

	public long getRefProductId() {
		return refProductId;
	}

	public void setRefProductId(long refProductId) {
		this.refProductId = refProductId;
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
		
	
	
	
	
	
	
	
	
	
}
