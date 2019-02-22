package kr.co.fukoku.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainElement {
	
	public ProcessChainElement() {
		super();
	}
	public ProcessChainElement(long id, long stage, String name, String refProcessChainId, ProcessChain processChain,
			List<ProcessChainMachine> processChainMachine) {
		super();
		this.id = id;
		this.stage = stage;
		this.name = name;
		this.refProcessChainId = refProcessChainId;
		this.processChain = processChain;
		this.processChainMachine = processChainMachine;
	}
	@JsonProperty("id")
	private long  id;
	@JsonProperty("stage")
	private long  stage;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_process_chain_id")
	private String refProcessChainId;
	
	@JsonProperty("process_chain")
	private ProcessChain processChain;
	
	@JsonProperty("process_chain_machine")
	private List<ProcessChainMachine> processChainMachine;
	
	public ProcessChainElement(long id, long stage, String name, ProcessChain processChain) {
		super();
		this.id = id;
		this.stage = stage;
		this.name = name;
		this.processChain = processChain;
	}
	public ProcessChainElement(String name) {
		super();
		this.name = name;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getStage() {
		return stage;
	}
	public void setStage(long stage) {
		this.stage = stage;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ProcessChain getProcessChain() {
		return processChain;
	}
	public void setProcessChain(ProcessChain processChain) {
		this.processChain = processChain;
	}
	public List<ProcessChainMachine> getProcessChainMachine() {
		return processChainMachine;
	}
	public void setProcessChainMachine(List<ProcessChainMachine> processChainMachine) {
		this.processChainMachine = processChainMachine;
	}
	public String getRefProcessChainId() {
		return refProcessChainId;
	}
	public void setRefProcessChainId(String refProcessChainId) {
		this.refProcessChainId = refProcessChainId;
	}
	
	
	
	

}
