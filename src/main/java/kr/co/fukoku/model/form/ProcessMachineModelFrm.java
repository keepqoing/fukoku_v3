package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessMachineModelFrm {

	@JsonProperty("ID")
	private long  id;
	@JsonProperty("SEQ")
	private int  seq;
	@JsonProperty("REF_PROCESS")
	private String refProcess;
	@JsonProperty("REF_MACHINE")
	private String refMachine;
	@JsonProperty("REF_PROCESS_CHAIN_ELEMENT")
	private long refProcessChainElement;
	@JsonProperty("NEXT_SEQUENCE")
	private String next_sequence;

	public ProcessMachineModelFrm() {
	}

	public ProcessMachineModelFrm(long id, int seq, String refProcess, String refMachine, long refProcessChainElement, String next_sequence) {
		this.id = id;
		this.seq = seq;
		this.refProcess = refProcess;
		this.refMachine = refMachine;
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

	public String getRefProcess() {
		return refProcess;
	}

	public void setRefProcess(String refProcess) {
		this.refProcess = refProcess;
	}

	public String getRefMachine() {
		return refMachine;
	}

	public void setRefMachine(String refMachine) {
		this.refMachine = refMachine;
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
