package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessMachine {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("process")
	private Process process;
	@JsonProperty("machine")
	private Machine machine;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	public ProcessMachine(long id, long seq, String name, Process process, Machine machine, String remark,
			String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.process = process;
		this.machine = machine;
		this.remark = remark;
		this.status = status;
	}
	public ProcessMachine() {
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
	public Machine getMachine() {
		return machine;
	}
	public void setMachine(Machine machine) {
		this.machine = machine;
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
		return "ProcessMachine [id=" + id + ", seq=" + seq + ", name=" + name + ", process=" + process + ", machine="
				+ machine + ", remark=" + remark + ", status=" + status + "]";
	}
	
	
	
	
	
	
	
	
}
