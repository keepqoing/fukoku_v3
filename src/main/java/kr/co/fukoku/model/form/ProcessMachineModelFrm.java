package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessMachineModelFrm {

	@JsonProperty("ID")
	private long  id;
	@JsonProperty("SEQ")
	private int  seq;
	@JsonProperty("REF_PROCESS_ID")
	private long refProcessId;
	@JsonProperty("REF_MACHINE_ID")
	private long refMachineId;
	@JsonProperty("REF_PROCESS_CHAIN_ELEMENT")
	private long refProcessChainElement;
	@JsonProperty("NEXT_SEQUENCE")
	private String next_sequence;

	public ProcessMachineModelFrm() {
	}

	public ProcessMachineModelFrm(long id, int seq, long refProcessId, long refMachineId, long refProcessChainElement, String next_sequence) {
		this.id = id;
		this.seq = seq;
		this.refProcessId = refProcessId;
		this.refMachineId = refMachineId;
		this.refProcessChainElement = refProcessChainElement;
		this.next_sequence = next_sequence;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
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

	public long getRefProcessChainElement() {
		return refProcessChainElement;
	}

	public void setRefProcessChainElement(long refProcessChainElement) {
		this.refProcessChainElement = refProcessChainElement;
	}

	public String getNext_sequence() {
		return next_sequence;
	}

	public void setNext_sequence(String next_sequence) {
		this.next_sequence = next_sequence;
	}
}
