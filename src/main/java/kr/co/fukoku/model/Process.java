package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Process {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("type")
	private String type;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	public Process(long id, long seq, String name, String type, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
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
	@Override
	public String toString() {
		return "Process [id=" + id + ", seq=" + seq + ", name=" + name + ", type=" + type + ", remark=" + remark
				+ ", status=" + status + "]";
	}
	
	
	
	
	
	
}
