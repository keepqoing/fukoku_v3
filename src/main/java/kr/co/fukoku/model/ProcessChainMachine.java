package kr.co.fukoku.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainMachine {
	
	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long seq;
	@JsonProperty("ref_process")
	private String refProcess;
	@JsonProperty("ref_machine")
	private String refMachine;
	@JsonProperty("ref_process_chain_element")
	private  long refProcessChainElement;
	@JsonProperty("next_sequence")
	private long nextSequence;
	@JsonProperty("process_id")
	private long processId;
	
	
	private List<ProductProcessVar> productProcessVars;
	
	
	
	public ProcessChainMachine() {
		super();
	}
	public ProcessChainMachine(long id, long seq, String refProcess, String refMachine, long refProcessChainElement,
			long nextSequence, List<ProductProcessVar> productProcessVars) {
		super();
		this.id = id;
		this.seq = seq;
		this.refProcess = refProcess;
		this.refMachine = refMachine;
		this.refProcessChainElement = refProcessChainElement;
		this.nextSequence = nextSequence;
		this.productProcessVars = productProcessVars;
	}
	public List<ProductProcessVar> getProductProcessVars() {
		return productProcessVars;
	}
	public void setProductProcessVars(List<ProductProcessVar> productProcessVars) {
		this.productProcessVars = productProcessVars;
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
	public long getNextSequence() {
		return nextSequence;
	}
	public void setNextSequence(long nextSequence) {
		this.nextSequence = nextSequence;
	}
	public long getProcessId() {
		return processId;
	}
	public void setProcessId(long processId) {
		this.processId = processId;
	}
	
	

}
