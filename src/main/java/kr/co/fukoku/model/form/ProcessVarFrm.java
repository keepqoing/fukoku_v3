package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessVarFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_process_id")
	private long refProcessId;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	@JsonProperty("item_type")
	private String itemType;
	
	@JsonProperty("order_by")
	private String orderBy;
	
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	public String getOrderBy() {
		return orderBy;
	}
	
	public ProcessVarFrm(String name) {
		super();
		this.name = name;
	}
	
	public ProcessVarFrm(long id, long seq, String name, long refProcessId, String remark, String status, String itemType) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refProcessId = refProcessId;
		this.remark = remark;
		this.status = status;
		this.itemType = itemType;
	}
	public ProcessVarFrm() {
		super();
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
	public long getRefProcessId() {
		return refProcessId;
	}
	public void setRefProcessId(long refProcessId) {
		this.refProcessId = refProcessId;
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
	
	public String getItemType() {
		return itemType;
	}
	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
	@Override
	public String toString() {
		return "Process [id=" + id + ", seq=" + seq + ", name=" + name + ", refProcessId=" + refProcessId + ", remark=" + remark
				+ ", status=" + status + "]";
	}
	
	
	
	
	
	
}
