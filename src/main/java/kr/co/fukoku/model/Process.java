package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Process {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("rep_variable_name")
	private String repVariableName;
	
	@JsonProperty("desp_picture")
	private String despPicture;
	
	
	@JsonProperty("type")
	private String type;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("product")
	private Product product;
	
	
	@JsonProperty("acronym")
	private String acronym;
	
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	public Process(long id, long seq, String name, String repVariableName, String despPicture, String type,
			String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.repVariableName = repVariableName;
		this.despPicture = despPicture;
		this.type = type;
		this.remark = remark;
		this.status = status;
	}
	public Process() {
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
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
	public String getRepVariableName() {
		return repVariableName;
	}
	public void setRepVariableName(String repVariableName) {
		this.repVariableName = repVariableName;
	}
	public String getDespPicture() {
		return despPicture;
	}
	public void setDespPicture(String despPicture) {
		this.despPicture = despPicture;
	}
	
	
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	@Override
	public String toString() {
		return "Process [id=" + id + ", seq=" + seq + ", name=" + name + ", repVariableName=" + repVariableName
				+ ", despPicture=" + despPicture + ", type=" + type + ", remark=" + remark + ", status=" + status
				+ ", getId()=" + getId() + ", getSeq()=" + getSeq() + ", getName()=" + getName() + ", getType()="
				+ getType() + ", getRemark()=" + getRemark() + ", getStatus()=" + getStatus()
				+ ", getRepVariableName()=" + getRepVariableName() + ", getDespPicture()=" + getDespPicture()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
	
	
	
	
	
	
}
