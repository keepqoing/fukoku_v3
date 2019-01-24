package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessVar {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("process")
	private Process process;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("item_type")
	private String itemType;
	
	
	
	public ProcessVar(String name) {
		super();
		this.name = name;
	}
	public ProcessVar(long id, long seq, String name, Process process, String remark, String status, String itemType) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.process = process;
		this.remark = remark;
		this.status = status;
		this.itemType = itemType;
	}
	public ProcessVar() {
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
	public Process getProcess() {
		return process;
	}
	public void setProcess(Process process) {
		this.process = process;
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
		return "Process [id=" + id + ", seq=" + seq + ", name=" + name + ", process=" + process + ", remark=" + remark
				+ ", status=" + status + "]";
	}
	
	
	
	
	
	
}
