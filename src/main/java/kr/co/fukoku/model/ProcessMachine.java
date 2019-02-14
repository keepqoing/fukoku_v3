package kr.co.fukoku.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessMachine {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("process")
	private Process process;
	@JsonProperty("machine")
	private Machine machine;
	@JsonProperty("process_chain_element")
	private ProcessChainElement processChainElement;
	@JsonProperty("next_sequence")
	private String nextSequence;
	
	
	
	
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
	public ProcessChainElement getProcessChainElement() {
		return processChainElement;
	}
	public void setProcessChainElement(ProcessChainElement processChainElement) {
		this.processChainElement = processChainElement;
	}
	public String getNextSequence() {
		return nextSequence;
	}
	public void setNextSequence(String nextSequence) {
		this.nextSequence = nextSequence;
	}
	
	
	
	
	
	
	
	
	
	
}
