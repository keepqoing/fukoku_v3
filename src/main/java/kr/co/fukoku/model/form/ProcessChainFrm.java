package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainFrm {
	
	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_line_id")
	private long refLineId;
	@JsonProperty("ref_product_id")
	private long ref_product_id;
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
	
	public ProcessChainFrm(String name) {
		super();
		this.name = name;
	}
	public ProcessChainFrm(long id, long seq, String name, long refLineId, long ref_product_id, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refLineId = refLineId;
		this.ref_product_id = ref_product_id;
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
	public long getRefLineId() {
		return refLineId;
	}
	public void setRefLineId(long refLineId) {
		this.refLineId = refLineId;
	}
	public long getRef_product_id() {
		return ref_product_id;
	}
	public void setRef_product_id(long ref_product_id) {
		this.ref_product_id = ref_product_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	

}
