package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;



public class ProcessMachineFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("ref_process_id")
	private long refProcessId;
	@JsonProperty("ref_machine_id")
	private long refMachineId;
	@JsonProperty("ref_process_chain_element_id")
	private long refProcessChainElementId;
	@JsonProperty("next_sequence")
	private String nextSequence;
	
	@JsonProperty("order_by")
	private String orderBy;
	
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	public String getOrderBy() {
		return orderBy;
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
	public long getRefProcessId() {
		return refProcessId;
	}
	public void setRefProcessId(long refProcessId) {
		this.refProcessId = refProcessId;
	}
	public long getRefMachineId() {
		return refMachineId;
	}
	public void setRefMachineId(long refMachineId) {
		this.refMachineId = refMachineId;
	}
	public long getRefProcessChainElementId() {
		return refProcessChainElementId;
	}
	public void setRefProcessChainElementId(long refProcessChainElementId) {
		this.refProcessChainElementId = refProcessChainElementId;
	}
	public String getNextSequence() {
		return nextSequence;
	}
	public void setNextSequence(String nextSequence) {
		this.nextSequence = nextSequence;
	}
	@Override
	public String toString() {
		return "ProcessMachineFrm [id=" + id + ", seq=" + seq + ", refProcessId=" + refProcessId + ", refMachineId="
				+ refMachineId + ", refProcessChainElementId=" + refProcessChainElementId + ", nextSequence="
				+ nextSequence + "]";
	}
	
	
	
	
	
	
	
	
	
}
