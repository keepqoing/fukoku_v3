package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainElement {
	
	@JsonProperty("id")
	private long  id;
	@JsonProperty("stage")
	private long  stage;
	@JsonProperty("name")
	private String name;
	@JsonProperty("process_chain")
	private ProcessChain processChain;
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
	
	
	

}
