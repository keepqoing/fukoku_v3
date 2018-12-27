package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessMachineFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_process_id")
	private long refProcessId;
	@JsonProperty("ref_machine_id")
	private long refMachineId;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	public ProcessMachineFrm(long id, long seq, String name, long refProcessId,long refMachineId, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refProcessId = refProcessId;
		this.refMachineId = refMachineId;
		this.remark = remark;
		this.status = status;
	}
	public long getRefMachineId() {
		return refMachineId;
	}
	public void setRefMachineId(long refMachineId) {
		this.refMachineId = refMachineId;
	}
	public ProcessMachineFrm() {
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
	@Override
	public String toString() {
		return "Process [id=" + id + ", seq=" + seq + ", name=" + name + ", refProcessId=" + refProcessId + ", remark=" + remark
				+ ", status=" + status + "]";
	}
	
	
	
	
	
	
}
