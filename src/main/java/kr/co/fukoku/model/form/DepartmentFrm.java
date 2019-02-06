package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class DepartmentFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("code")
	private String code;
	@JsonProperty("parent")
	private long  parent;
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
	
	public DepartmentFrm(long id, long seq, String name, String code, long parent , String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.code = code;
		this.parent = parent;
		this.remark = remark;
		this.status = status;
	}


	public DepartmentFrm() {
		super();
	}

	

	public DepartmentFrm(String name) {
		super();
		this.name = name;
	}

	public long getParent() {
		return parent;
	}


	public void setParent(long parent) {
		this.parent = parent;
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


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
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
