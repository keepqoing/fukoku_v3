package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainElementFrm {
	
	@JsonProperty("id")
	private long  id;
	@JsonProperty("stage")
	private long  stage;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_process_chain_id")
	private long refProcessChainId;
	
	public ProcessChainElementFrm(long id, long stage, String name, long refProcessChainId) {
		super();
		this.id = id;
		this.stage = stage;
		this.name = name;
		this.refProcessChainId = refProcessChainId;
	}
	public ProcessChainElementFrm(String name) {
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
	public long getRefProcessChainId() {
		return refProcessChainId;
	}
	public void setRefProcessChainId(long refProcessChainId) {
		this.refProcessChainId = refProcessChainId;
	}

	
	
	

}
